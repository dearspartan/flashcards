import React, { useState } from 'react';
import type { Deck, Flashcard, UnitNumber } from '../types';
import {
  IconPlus,
  IconCopy,
  IconTrash,
  IconZap,
  IconLayers,
  IconX,
} from './Icons';

interface DeckManagerViewProps {
  decks: Deck[];
  cards: Flashcard[];
  activeDeckId: string;
  onSelectDeckAndStudy: (deckId: string) => void;
  onSelectDeckAndMCQ: (deckId: string) => void;
  onCreateDeck: (newDeck: Partial<Deck>) => void;
  onDuplicateDeck: (deckId: string) => void;
  onDeleteDeck: (deckId: string) => void;
}

export const DeckManagerView: React.FC<DeckManagerViewProps> = ({
  decks,
  cards,
  activeDeckId,
  onSelectDeckAndStudy,
  onSelectDeckAndMCQ,
  onCreateDeck,
  onDuplicateDeck,
  onDeleteDeck,
}) => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [folder, setFolder] = useState('Custom Decks');
  const [selectedUnit, setSelectedUnit] = useState<'all' | UnitNumber>('all');

  const cardMap = new Map(cards.map((c) => [c.id, c]));

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Pick card IDs based on unit filter or all
    const cardIds = selectedUnit === 'all'
      ? cards.map((c) => c.id)
      : cards.filter((c) => c.unit === selectedUnit).map((c) => c.id);

    onCreateDeck({
      name: name.trim(),
      description: description.trim() || `Custom deck with ${cardIds.length} cards.`,
      folder: folder.trim() || 'Custom Decks',
      unit: selectedUnit,
      cardIds,
      color: '#6366f1',
    });

    setName('');
    setDescription('');
    setIsCreateOpen(false);
  };

  // Group decks by folder
  const folders = Array.from(new Set(decks.map((d) => d.folder || 'General')));

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Deck Management
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
            Organize the 204 Computer Networks questions into unit-specific or custom cram decks.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-sm"
        >
          <IconPlus size={15} />
          Create New Deck
        </button>
      </div>

      {/* Decks by Folder */}
      {folders.map((folderName) => {
        const folderDecks = decks.filter((d) => (d.folder || 'General') === folderName);
        if (folderDecks.length === 0) return null;

        return (
          <div key={folderName} className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              📁 {folderName} ({folderDecks.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folderDecks.map((deck) => {
                const deckCards = deck.cardIds.map((id) => cardMap.get(id)).filter(Boolean) as Flashcard[];
                const masteredCount = deckCards.filter((c) => c.repetitions >= 2).length;
                const masteryPct = deckCards.length > 0 ? Math.round((masteredCount / deckCards.length) * 100) : 0;
                const isActive = deck.id === activeDeckId;

                return (
                  <div
                    key={deck.id}
                    className={`p-5 rounded-2xl border transition bg-white dark:bg-neutral-900 flex flex-col justify-between shadow-xs hover:border-neutral-300 dark:hover:border-neutral-700 ${
                      isActive ? 'ring-2 ring-neutral-900 dark:ring-neutral-100 border-transparent' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                          {deckCards.length} Cards
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onDuplicateDeck(deck.id)}
                            title="Duplicate Deck"
                            className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
                          >
                            <IconCopy size={13} />
                          </button>
                          {!deck.id.startsWith('deck-') && (
                            <button
                              onClick={() => onDeleteDeck(deck.id)}
                              title="Delete Deck"
                              className="p-1 rounded text-neutral-400 hover:text-rose-600 transition"
                            >
                              <IconTrash size={13} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Deck Info */}
                      <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug mb-1">
                        {deck.name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-2 mb-4">
                        {deck.description}
                      </p>

                      {/* Mastery Progress Bar */}
                      <div className="space-y-1 mb-5">
                        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                          <span>Mastery</span>
                          <span>{masteryPct}% ({masteredCount}/{deckCards.length})</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${masteryPct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                      <button
                        onClick={() => onSelectDeckAndStudy(deck.id)}
                        className="py-2 px-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center justify-center gap-1.5"
                      >
                        <IconZap size={13} />
                        Study Cards
                      </button>
                      <button
                        onClick={() => onSelectDeckAndMCQ(deck.id)}
                        className="py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                      >
                        <IconLayers size={13} />
                        MCQ Quiz
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Create Deck Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Create Custom Study Deck
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <IconX size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Deck Title *
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Last Minute Viva Top 30"
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Folder / Category
                </label>
                <input
                  type="text"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  placeholder="e.g. Exam Cramming"
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Source Unit
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value as 'all' | UnitNumber)}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                >
                  <option value="all">All 5 Units (204 Questions)</option>
                  <option value={1}>Unit 1: Physical Layer & Topologies</option>
                  <option value={2}>Unit 2: Data Link Layer & MAC</option>
                  <option value={3}>Unit 3: Network Layer & Routing</option>
                  <option value={4}>Unit 4: Transport Layer & Congestion</option>
                  <option value={5}>Unit 5: Application Layer & Security</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for this deck..."
                  rows={2}
                  className="w-full text-base sm:text-xs p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-400 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-xs font-semibold border border-neutral-300 dark:border-neutral-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-xl"
                >
                  Create Deck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
