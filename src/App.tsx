import React, { useState, useEffect, useMemo } from 'react';
import type {
  Flashcard,
  UnitNumber,
  ViewMode,
  FilterState,
  CardDifficulty,
  Deck,
  DailyProgress,
} from './types';
import {
  loadFlashcards,
  saveFlashcards,
  loadSettings,
  saveSettings,
  updateCardRepetition,
  loadDecks,
  saveDecks,
  loadDailyProgress,
  recordStudySession,
} from './utils/storage';
import type { UserSettings } from './utils/storage';
import { DEFAULT_FLASHCARDS } from './data/defaultCards';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { FlashcardView } from './components/FlashcardView';
import { DeckManagerView } from './components/DeckManagerView';
import { MCQModeView } from './components/MCQModeView';
import { CramSheetView } from './components/CramSheetView';
import { QuizModeView } from './components/QuizModeView';
import { StatsView } from './components/StatsView';
import { ImportExportModal } from './components/ImportExportModal';
import { CardEditorModal } from './components/CardEditorModal';
import { IconLayers } from './components/Icons';

export const App: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [activeDeckId, setActiveDeckId] = useState<string>('deck-all');
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>(loadDailyProgress());
  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [currentUnit, setCurrentUnit] = useState<'all' | UnitNumber>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('study');
  const [filterState, setFilterState] = useState<FilterState>({
    deckId: 'deck-all',
    unit: 'all',
    status: 'all',
    searchQuery: '',
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [cardToEdit, setCardToEdit] = useState<Flashcard | null>(null);

  // Sidebar collapse states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('cn_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('cn_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  // Keyboard shortcut to toggle sidebar ([ or \)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      if (e.key === '[' || e.key === '\\') {
        e.preventDefault();
        handleToggleSidebarCollapse();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Initialize cards & decks from storage
  useEffect(() => {
    const loadedCards = loadFlashcards();
    setCards(loadedCards);
    const loadedDecks = loadDecks(loadedCards);
    setDecks(loadedDecks);
  }, []);

  // Theme toggle handler with immediate DOM sync & storage save
  const handleToggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    const nextSettings = { ...settings, theme: nextTheme as 'dark' | 'light' };
    setSettings(nextSettings);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    saveSettings(nextSettings);
  };

  // Sync dark class on document element & body
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    saveSettings(settings);
  }, [settings.theme]);

  // Update cards state helper
  const updateCardsState = (newCards: Flashcard[]) => {
    setCards(newCards);
    saveFlashcards(newCards);
  };

  // Update decks state helper
  const updateDecksState = (newDecks: Deck[]) => {
    setDecks(newDecks);
    saveDecks(newDecks);
  };

  // Record a study interaction for daily goals and streak
  const handleRecordStudy = () => {
    const updated = recordStudySession();
    setDailyProgress(updated);
  };

  // Active deck
  const activeDeck = useMemo(() => {
    return decks.find((d) => d.id === activeDeckId) || decks[0];
  }, [decks, activeDeckId]);

  // Filtered cards based on active deck, unit, status, and search query
  const filteredCards = useMemo(() => {
    let result = [...cards];

    // Restrict to active deck cards if specific deck chosen
    if (activeDeck && activeDeck.id !== 'deck-all' && activeDeck.cardIds.length > 0) {
      const idSet = new Set(activeDeck.cardIds);
      result = result.filter((c) => idSet.has(c.id));
    }

    // Unit filter
    if (currentUnit !== 'all') {
      result = result.filter((c) => c.unit === currentUnit);
    }

    // Status filter
    if (filterState.status === 'unknown') {
      result = result.filter((c) => c.isKnown === false || c.difficulty === 'again');
    } else if (filterState.status === 'known') {
      result = result.filter((c) => c.isKnown === true);
    } else if (filterState.status === 'starred') {
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
  }, [cards, activeDeck, currentUnit, filterState, settings.shuffle]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeDeckId, currentUnit, filterState.status, filterState.searchQuery]);

  // Unit count badges
  const unitCounts = useMemo(() => {
    const counts: Record<string, number> = { all: cards.length };
    [1, 2, 3, 4, 5].forEach((u) => {
      counts[String(u)] = cards.filter((c) => c.unit === u).length;
    });
    return counts;
  }, [cards]);

  // Unknown cards count for Smart Revision
  const unknownCount = useMemo(() => {
    return cards.filter((c) => c.isKnown === false || c.difficulty === 'again').length;
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
    handleRecordStudy();

    if (settings.autoFlipOnRating) {
      handleNext();
    }
  };

  // Mark as Known / Unknown
  const handleMarkKnown = (isKnown: boolean) => {
    if (filteredCards.length === 0) return;
    const currentCard = filteredCards[currentIndex];
    const updated: Flashcard = {
      ...currentCard,
      isKnown,
      difficulty: isKnown ? (currentCard.repetitions > 0 ? 'good' : 'hard') : 'again',
      repetitions: isKnown ? Math.max(1, currentCard.repetitions + 1) : 0,
      lastReviewed: Date.now(),
    };

    const newCards = cards.map((c) => (c.id === updated.id ? updated : c));
    updateCardsState(newCards);
    handleRecordStudy();

    if (settings.autoFlipOnRating) {
      handleNext();
    }
  };

  // Toggle star / bookmark
  const handleToggleStar = (cardId: string) => {
    const newCards = cards.map((c) => (c.id === cardId ? { ...c, isStarred: !c.isStarred } : c));
    updateCardsState(newCards);
  };

  // Deck Management actions
  const handleSelectDeckAndStudy = (deckId: string) => {
    setActiveDeckId(deckId);
    setCurrentUnit('all');
    setFilterState((prev) => ({ ...prev, deckId, status: 'all' }));
    setViewMode('study');
  };

  const handleSelectDeckAndMCQ = (deckId: string) => {
    setActiveDeckId(deckId);
    setCurrentUnit('all');
    setFilterState((prev) => ({ ...prev, deckId, status: 'all' }));
    setViewMode('mcq');
  };

  const handleCreateDeck = (newDeckData: Partial<Deck>) => {
    const newDeck: Deck = {
      id: `custom-deck-${Date.now()}`,
      name: newDeckData.name || 'New Custom Deck',
      description: newDeckData.description || '',
      folder: newDeckData.folder || 'Custom Decks',
      unit: newDeckData.unit || 'all',
      cardIds: newDeckData.cardIds || [],
      color: newDeckData.color || '#6366f1',
      createdAt: Date.now(),
    };
    updateDecksState([...decks, newDeck]);
  };

  const handleDuplicateDeck = (deckId: string) => {
    const target = decks.find((d) => d.id === deckId);
    if (!target) return;
    const duplicated: Deck = {
      ...target,
      id: `copy-${Date.now()}`,
      name: `${target.name} (Copy)`,
      createdAt: Date.now(),
    };
    updateDecksState([...decks, duplicated]);
  };

  const handleDeleteDeck = (deckId: string) => {
    const filtered = decks.filter((d) => d.id !== deckId);
    updateDecksState(filtered);
    if (activeDeckId === deckId) {
      setActiveDeckId('deck-all');
    }
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
    <div className="min-h-screen min-h-[100dvh] bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex font-sans transition-colors">
      {/* Collapsible Left Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleSidebarCollapse}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
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
        unknownCount={unknownCount}
        dailyProgress={dailyProgress}
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenNewCard={handleOpenNewCard}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
        theme={settings.theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen min-h-[100dvh]">
        {/* Slim Top Bar */}
        <TopHeader
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebarCollapse={handleToggleSidebarCollapse}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          viewMode={viewMode}
          currentUnit={currentUnit}
          filterState={filterState}
          onFilterChange={(newFilters) => setFilterState((prev) => ({ ...prev, ...newFilters }))}
          dailyProgress={dailyProgress}
          onOpenNewCard={handleOpenNewCard}
          soundEnabled={settings.soundEnabled}
          onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
          theme={settings.theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Main Body Content based on View Mode */}
        <main className="flex-1 flex flex-col justify-start sm:justify-center max-w-5xl w-full mx-auto px-2.5 sm:px-6 py-4 safe-pb">
          {/* Active Deck Header Indicator */}
          {activeDeck && activeDeck.id !== 'deck-all' && (
            <div className="max-w-3xl mx-auto w-full mb-3 flex items-center justify-between text-xs px-2.5 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  Current Deck:
                </span>
                <span className="font-medium">{activeDeck.name}</span>
                <span className="text-neutral-400">({filteredCards.length} cards)</span>
              </div>
              <button
                onClick={() => setActiveDeckId('deck-all')}
                className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 underline font-medium"
              >
                Reset to All Cards
              </button>
            </div>
          )}

          {viewMode === 'decks' && (
            <DeckManagerView
              decks={decks}
              cards={cards}
              activeDeckId={activeDeckId}
              onSelectDeckAndStudy={handleSelectDeckAndStudy}
              onSelectDeckAndMCQ={handleSelectDeckAndMCQ}
              onCreateDeck={handleCreateDeck}
              onDuplicateDeck={handleDuplicateDeck}
              onDeleteDeck={handleDeleteDeck}
            />
          )}

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
                  onMarkKnown={handleMarkKnown}
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
                    Try changing your search term, select "All Units", or clear the Unknown filter.
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentUnit('all');
                        setActiveDeckId('deck-all');
                        setFilterState({ deckId: 'deck-all', unit: 'all', status: 'all', searchQuery: '' });
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
                    >
                      Reset All Filters
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

          {viewMode === 'mcq' && (
            <MCQModeView
              cards={filteredCards.length >= 4 ? filteredCards : cards}
              soundEnabled={settings.soundEnabled}
              onExitMCQ={() => setViewMode('study')}
              onRecordStudy={handleRecordStudy}
            />
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
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>CN Recall • 204 Comprehensive Questions & Diagrams</span>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="hidden sm:inline">Sidebar: [</span>
              <span>Flip: Space</span>
              <span>Prev / Next: Top buttons or ←/→</span>
              <span>Rate: 1-4</span>
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
    </div>
  );
};

export default App;
