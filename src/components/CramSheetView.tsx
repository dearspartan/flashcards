import React, { useState } from 'react';
import type { Flashcard, UnitNumber } from '../types';
import { UNIT_DETAILS } from '../data/defaultCards';
import {
  IconChevronDown,
  IconChevronUp,
  IconStar,
  IconCheck,
  IconEdit,
  IconCopy,
} from './Icons';

interface CramSheetViewProps {
  cards: Flashcard[];
  onToggleStar: (id: string) => void;
  onEditCard: (card: Flashcard) => void;
}

export const CramSheetView: React.FC<CramSheetViewProps> = ({
  cards,
  onToggleStar,
  onEditCard,
}) => {
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    cards.forEach((c) => (all[c.id] = true));
    setExpandedCards(all);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  const copyToClipboard = (card: Flashcard) => {
    const text = `Q: ${card.question}\nA: ${card.answer}${
      card.keyPoints ? '\nKey Points:\n- ' + card.keyPoints.join('\n- ') : ''
    }`;
    navigator.clipboard.writeText(text);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Group cards by unit
  const groupedByUnit: Record<number, Flashcard[]> = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  cards.forEach((c) => {
    if (groupedByUnit[c.unit]) {
      groupedByUnit[c.unit].push(c);
    } else {
      groupedByUnit[c.unit] = [c];
    }
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Cram Sheet & Rapid Review
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Expand cards to inspect answers, or collapse to test active recall unit by unit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Expand All Answers
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            Collapse All (Test Mode)
          </button>
        </div>
      </div>

      {/* Units List */}
      <div className="space-y-8">
        {([1, 2, 3, 4, 5] as UnitNumber[]).map((unitNum) => {
          const unitCards = groupedByUnit[unitNum] || [];
          if (unitCards.length === 0) return null;

          const unitInfo = UNIT_DETAILS[unitNum];

          return (
            <section key={unitNum} className="space-y-3">
              {/* Unit Title Banner */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs flex items-center justify-center font-bold">
                      {unitNum}
                    </span>
                    {unitInfo?.title || `Unit ${unitNum}`}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{unitInfo?.desc}</p>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {unitCards.length} Questions
                </span>
              </div>

              {/* Cards in this unit */}
              <div className="space-y-2">
                {unitCards.map((card, idx) => {
                  const isOpen = !!expandedCards[card.id];
                  return (
                    <div
                      key={card.id}
                      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden transition hover:border-neutral-300 dark:hover:border-neutral-700"
                    >
                      {/* Question Row */}
                      <div
                        onClick={() => toggleExpand(card.id)}
                        className="p-4 flex items-start justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-xs font-mono text-neutral-400 mt-0.5 shrink-0">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                {card.topic}
                              </span>
                              {card.repetitions > 0 && (
                                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                                  ✓ Mastered ({card.repetitions} reps)
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                              {card.question}
                            </h4>
                          </div>
                        </div>

                        {/* Controls */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 shrink-0"
                        >
                          <button
                            onClick={() => onToggleStar(card.id)}
                            className={`p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition ${
                              card.isStarred ? 'text-amber-500' : 'text-neutral-400'
                            }`}
                          >
                            <IconStar size={14} filled={card.isStarred} />
                          </button>

                          <button
                            onClick={() => copyToClipboard(card)}
                            title="Copy Question & Answer"
                            className="p-1.5 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                          >
                            {copiedId === card.id ? (
                              <IconCheck size={14} className="text-emerald-500" />
                            ) : (
                              <IconCopy size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => onEditCard(card)}
                            className="p-1.5 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                          >
                            <IconEdit size={14} />
                          </button>

                          <button
                            onClick={() => toggleExpand(card.id)}
                            className="p-1.5 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition"
                          >
                            {isOpen ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Answer Area */}
                      {isOpen && (
                        <div className="px-4 pb-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/40 space-y-3">
                          <p className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed">
                            {card.answer}
                          </p>

                          {card.diagram && (
                            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                                📊 Concept / Topology Diagram:
                              </span>
                              <pre className="font-mono text-[11px] leading-tight whitespace-pre overflow-x-auto text-neutral-800 dark:text-neutral-200 py-1">
                                {card.diagram}
                              </pre>
                            </div>
                          )}

                          {card.keyPoints && card.keyPoints.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
                                Key Exam Points:
                              </span>
                              <ul className="text-xs text-neutral-700 dark:text-neutral-300 space-y-1 pl-4 list-disc marker:text-neutral-400">
                                {card.keyPoints.map((kp, kIdx) => (
                                  <li key={kIdx}>{kp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {card.formula && (
                            <div className="p-2 rounded bg-neutral-100 dark:bg-neutral-900 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                              <span className="text-neutral-400 mr-2">Formula:</span>
                              {card.formula}
                            </div>
                          )}

                          {card.mnemonic && (
                            <div className="p-2 rounded bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200">
                              <span className="font-semibold mr-1">Mnemonic:</span>
                              {card.mnemonic}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
