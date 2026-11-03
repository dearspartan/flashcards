import React, { useState, useEffect, useMemo } from 'react';
import type {
  Flashcard,
  UnitNumber,
  ViewMode,
  FilterState,
  CardDifficulty,
} from './types';
import {
  loadFlashcards,
  saveFlashcards,
  loadSettings,
  saveSettings,
  updateCardRepetition,
} from './utils/storage';
import type { UserSettings } from './utils/storage';
import { DEFAULT_FLASHCARDS } from './data/defaultCards';
import { Navbar } from './components/Navbar';
import { FlashcardView } from './components/FlashcardView';
import { CramSheetView } from './components/CramSheetView';
import { QuizModeView } from './components/QuizModeView';
import { StatsView } from './components/StatsView';
import { ImportExportModal } from './components/ImportExportModal';
import { CardEditorModal } from './components/CardEditorModal';
import { IconLayers } from './components/Icons';

export const App: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [currentUnit, setCurrentUnit] = useState<'all' | UnitNumber>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('study');
  const [filterState, setFilterState] = useState<FilterState>({
    unit: 'all',
    status: 'all',
    searchQuery: '',
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<Flashcard | null>(null);

  // Initialize cards from storage
  useEffect(() => {
    const loaded = loadFlashcards();
    setCards(loaded);
  }, []);

  // Sync dark class on document element
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveSettings(settings);
  }, [settings]);

  // Save cards to storage whenever updated
  const updateCardsState = (newCards: Flashcard[]) => {
    setCards(newCards);
    saveFlashcards(newCards);
  };

  // Filtered cards based on selected unit, status, and search query
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // Unit filter
    if (currentUnit !== 'all') {
      result = result.filter((c) => c.unit === currentUnit);
    }

    // Status filter
    if (filterState.status === 'starred') {
      result = result.filter((c) => c.isStarred);
    } else if (filterState.status === 'mastered') {
      result = result.filter((c) => c.repetitions >= 2);
    } else if (filterState.status === 'learning') {
      result = result.filter((c) => c.repetitions === 1);
    } else if (filterState.status === 'unlearned') {
      result = result.filter((c) => c.repetitions === 0);
    }

    // Search query filter
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.question.toLowerCase().includes(q) ||
          c.answer.toLowerCase().includes(q) ||
          c.topic.toLowerCase().includes(q) ||
          (c.tags && c.tags.some((t) => t.toLowerCase().includes(q))) ||
          (c.keyPoints && c.keyPoints.some((kp) => kp.toLowerCase().includes(q))) ||
          (c.formula && c.formula.toLowerCase().includes(q))
      );
    }

    // Shuffle if enabled
    if (settings.shuffle) {
      result = [...result].sort(() => 0.5 - Math.random());
    }

    return result;
  }, [cards, currentUnit, filterState, settings.shuffle]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [currentUnit, filterState.status, filterState.searchQuery]);

  // Unit count badges
  const unitCounts = useMemo(() => {
    const counts: Record<string, number> = { all: cards.length };
    [1, 2, 3, 4, 5].forEach((u) => {
      counts[String(u)] = cards.filter((c) => c.unit === u).length;
    });
    return counts;
  }, [cards]);

  // Navigation handlers
  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  // Card Spaced Repetition Rating
  const handleRateCard = (rating: CardDifficulty) => {
    if (filteredCards.length === 0) return;
    const currentCard = filteredCards[currentIndex];
    const updated = updateCardRepetition(currentCard, rating);

    const newCards = cards.map((c) => (c.id === updated.id ? updated : c));
    updateCardsState(newCards);

    // If "Again", re-insert at end of session for immediate reinforcement
    if (settings.autoFlipOnRating) {
      handleNext();
    }
  };

  // Toggle star / bookmark
  const handleToggleStar = (cardId: string) => {
    const newCards = cards.map((c) => (c.id === cardId ? { ...c, isStarred: !c.isStarred } : c));
    updateCardsState(newCards);
  };

  // Card edit & creation
  const handleOpenNewCard = () => {
    setCardToEdit(null);
    setIsEditorModalOpen(true);
  };

  const handleEditCard = (card: Flashcard) => {
    setCardToEdit(card);
    setIsEditorModalOpen(true);
  };

  const handleSaveCard = (cardData: Partial<Flashcard>) => {
    if (cardData.id) {
      // Edit existing
      const newCards = cards.map((c) =>
        c.id === cardData.id
          ? ({
              ...c,
              ...cardData,
              unitTitle: `Unit ${cardData.unit || c.unit}`,
            } as Flashcard)
          : c
      );
      updateCardsState(newCards);
    } else {
      // Create new
      const newCard: Flashcard = {
        id: `card-${Date.now()}`,
        unit: (cardData.unit || 1) as UnitNumber,
        unitTitle: `Unit ${cardData.unit || 1}`,
        topic: cardData.topic || 'General',
        question: cardData.question || '',
        answer: cardData.answer || '',
        keyPoints: cardData.keyPoints,
        formula: cardData.formula,
        mnemonic: cardData.mnemonic,
        diagram: cardData.diagram,
        difficulty: 'new',
        repetitions: 0,
        tags: cardData.tags || [],
      };
      updateCardsState([newCard, ...cards]);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    const newCards = cards.filter((c) => c.id !== cardId);
    updateCardsState(newCards);
  };

  // Bulk Import
  const handleImportCards = (imported: Flashcard[], mode: 'append' | 'replace') => {
    if (mode === 'replace') {
      updateCardsState(imported);
    } else {
      // Append unique questions
      const existingQuestions = new Set(cards.map((c) => c.question.trim().toLowerCase()));
      const filteredNew = imported.filter(
        (c) => !existingQuestions.has(c.question.trim().toLowerCase())
      );
      updateCardsState([...cards, ...filteredNew]);
    }
    setCurrentIndex(0);
  };

  const handleResetDefaults = () => {
    updateCardsState(DEFAULT_FLASHCARDS);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors">
      {/* Top App Navbar */}
      <Navbar
        currentUnit={currentUnit}
        onSelectUnit={(u) => {
          setCurrentUnit(u);
          setFilterState((prev) => ({ ...prev, unit: u }));
        }}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        filterState={filterState}
        onFilterChange={(newFilters) => setFilterState((prev) => ({ ...prev, ...newFilters }))}
        unitCounts={unitCounts}
        totalCount={cards.length}
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenNewCard={handleOpenNewCard}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
        theme={settings.theme}
        onToggleTheme={() =>
          setSettings((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }))
        }
      />

      {/* Main Body Content based on View Mode */}
      <main className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto p-4 sm:p-6">
        {viewMode === 'study' && (
          <>
            {filteredCards.length > 0 ? (
              <FlashcardView
                card={filteredCards[currentIndex] || filteredCards[0]}
                currentIndex={currentIndex}
                totalCards={filteredCards.length}
                onNext={handleNext}
                onPrev={handlePrev}
                onRate={handleRateCard}
                onToggleStar={handleToggleStar}
                onEditCard={handleEditCard}
                isShuffled={settings.shuffle}
                onToggleShuffle={() => setSettings((s) => ({ ...s, shuffle: !s.shuffle }))}
                soundEnabled={settings.soundEnabled}
                blurtingEnabled={settings.blurtingMode}
                onToggleBlurting={() =>
                  setSettings((s) => ({ ...s, blurtingMode: !s.blurtingMode }))
                }
              />
            ) : (
              <div className="text-center py-16 px-4 max-w-md mx-auto space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                  <IconLayers size={24} />
                </div>
                <h3 className="text-lg font-semibold">No questions match your filter</h3>
                <p className="text-xs text-neutral-500">
                  Try changing your search term, select "All Units", or import your Computer Networks questions.
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentUnit('all');
                      setFilterState({ unit: 'all', status: 'all', searchQuery: '' });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={() => setIsImportModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700"
                  >
                    Import Questions
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {viewMode === 'quiz' && (
          <QuizModeView
            cards={filteredCards.length > 0 ? filteredCards : cards}
            currentUnit={currentUnit}
            soundEnabled={settings.soundEnabled}
            onExitQuiz={() => setViewMode('study')}
            onToggleStar={handleToggleStar}
          />
        )}

        {viewMode === 'sheet' && (
          <CramSheetView
            cards={filteredCards}
            onToggleStar={handleToggleStar}
            onEditCard={handleEditCard}
          />
        )}

        {viewMode === 'stats' && (
          <StatsView
            cards={cards}
            onSelectUnitAndStudy={(unit) => {
              setCurrentUnit(unit);
              setViewMode('study');
            }}
            onStudyStarred={() => {
              setFilterState((prev) => ({ ...prev, status: 'starred' }));
              setViewMode('study');
            }}
          />
        )}
      </main>

      {/* Footer Minimalist Status */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-3 px-4 text-center text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CN Memorization Engine • Ready to accumulate 200+ questions</span>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Flip: Space</span>
            <span>Next: →</span>
            <span>Prev: ←</span>
            <span>Score: 1-4</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ImportExportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        cards={cards}
        onImportCards={handleImportCards}
        onResetDefaults={handleResetDefaults}
      />

      <CardEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => setIsEditorModalOpen(false)}
        cardToEdit={cardToEdit}
        onSave={handleSaveCard}
        onDelete={handleDeleteCard}
      />
    </div>
  );
};

export default App;
