import React, { useState } from 'react';
import type { Flashcard, UnitNumber, SubjectConfig } from '../types';
import { SUBJECTS } from '../data/subjects';
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
  subjectConfig?: SubjectConfig;
  onToggleStar: (id: string) => void;
  onEditCard: (card: Flashcard) => void;
}

export const CramSheetView: React.FC<CramSheetViewProps> = ({
  cards,
  subjectConfig = SUBJECTS.cn,
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
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
            <span>{subjectConfig.name}</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
              {cards.length} Cards
            </span>
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Cram Sheet & Rapid Review: Expand cards to inspect answers, or collapse to test active recall unit by unit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
          >
            Expand All Answers
          </button>
          <button
            onClick={collapseAll}
            className="px-2.5 py-1 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
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

          const unitInfo = subjectConfig.unitDetails[unitNum];

          return (
            <section key={unitNum} className="space-y-3">
              {/* Unit Title Banner */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs flex items-center justify-center font-bold">
                      {unitNum}
                    </span>
                    {unitInfo?.title || `Unit ${unitNum}: ${subjectConfig.unitNames[unitNum]}`}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{unitInfo?.desc}</p>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  {unitCards.length} Questions
                </span>
              </div>

              {/* Cards in this Unit */}
              <div className="space-y-2">
                {unitCards.map((card, idx) => {
                  const isExpanded = !!expandedCards[card.id];
                  return (
                    <div
                      key={card.id}
                      className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 overflow-hidden transition shadow-2xs hover:border-neutral-300 dark:hover:border-neutral-700"
                    >
                      {/* Card Row Header: Question + Controls */}
                      <div
                        onClick={() => toggleExpand(card.id)}
                        className="p-3.5 flex items-start justify-between gap-3 cursor-pointer select-none"
                      >
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <span className="font-mono text-xs text-neutral-400 font-semibold shrink-0 pt-0.5">
                            Q{idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                              {card.question}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-mono text-neutral-400">
                                {card.topic}
                              </span>
                              {card.isKnown && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-mono">
                                  Known
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions on right */}
                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => onToggleStar(card.id)}
                            title={card.isStarred ? 'Unstar card' : 'Star card'}
                            className={`p-1.5 rounded-lg transition cursor-pointer ${
                              card.isStarred
                                ? 'text-amber-500 hover:text-amber-600'
                                : 'text-neutral-300 hover:text-neutral-500 dark:text-neutral-600'
                            }`}
                          >
                            <IconStar size={14} filled={card.isStarred} />
                          </button>

                          <button
                            onClick={() => copyToClipboard(card)}
                            title="Copy Q&A"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer"
                          >
                            {copiedId === card.id ? (
                              <IconCheck size={14} className="text-emerald-500" />
                            ) : (
                              <IconCopy size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => onEditCard(card)}
                            title="Edit Card"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer"
                          >
                            <IconEdit size={14} />
                          </button>

                          <button
                            onClick={() => toggleExpand(card.id)}
                            title={isExpanded ? 'Collapse' : 'Expand answer'}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition cursor-pointer"
                          >
                            {isExpanded ? <IconChevronUp size={15} /> : <IconChevronDown size={15} />}
                          </button>
                        </div>
                      </div>

                      {/* Expandable Answer Section */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-900/30 text-xs text-neutral-800 dark:text-neutral-200 space-y-3">
                          <div className="leading-relaxed whitespace-pre-line">{card.answer}</div>

                          {card.keyPoints && card.keyPoints.length > 0 && (
                            <div className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-1.5">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
                                Key Points for Viva / Exam:
                              </span>
                              <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
                                {card.keyPoints.map((kp, kIdx) => (
                                  <li key={kIdx}>{kp}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {card.formula && (
                            <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-950 font-mono text-[11px] text-amber-700 dark:text-amber-400 border border-neutral-200 dark:border-neutral-800">
                              <span className="text-[9px] uppercase tracking-wider text-neutral-400 block mb-1">
                                Formula:
                              </span>
                              {card.formula}
                            </div>
                          )}

                          {card.mnemonic && (
                            <div className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-mono text-[11px]">
                              <span className="text-[9px] uppercase tracking-wider text-indigo-400 block mb-1">
                                Mnemonic:
                              </span>
                              {card.mnemonic}
                            </div>
                          )}

                          {card.diagram && (
                            <div className="p-3 rounded-lg bg-neutral-950 text-neutral-200 font-mono text-[10px] whitespace-pre overflow-x-auto leading-tight border border-neutral-800">
                              {card.diagram}
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
