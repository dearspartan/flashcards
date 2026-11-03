import React from 'react';
import type { Flashcard, UnitNumber } from '../types';
import { UNIT_DETAILS } from '../data/defaultCards';

interface StatsViewProps {
  cards: Flashcard[];
  onSelectUnitAndStudy: (unit: 'all' | UnitNumber) => void;
  onStudyStarred: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  cards,
  onSelectUnitAndStudy,
  onStudyStarred,
}) => {
  const totalCards = cards.length;
  const masteredCards = cards.filter((c) => c.repetitions >= 2).length;
  const learningCards = cards.filter((c) => c.repetitions === 1).length;
  const unlearnedCards = cards.filter((c) => c.repetitions === 0).length;
  const starredCards = cards.filter((c) => c.isStarred).length;

  const overallMasteryPct = totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0;

  // Calculate unit statistics
  const unitStats = ([1, 2, 3, 4, 5] as UnitNumber[]).map((u) => {
    const unitCards = cards.filter((c) => c.unit === u);
    const unitMastered = unitCards.filter((c) => c.repetitions >= 2).length;
    const unitPct = unitCards.length > 0 ? Math.round((unitMastered / unitCards.length) * 100) : 0;
    return {
      unit: u,
      title: UNIT_DETAILS[u]?.title || `Unit ${u}`,
      total: unitCards.length,
      mastered: unitMastered,
      pct: unitPct,
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-mono text-neutral-400 uppercase">Overall Retention</span>
          <div className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100 mt-2">
            {overallMasteryPct}%
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">{masteredCards} of {totalCards} mastered</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-mono text-neutral-400 uppercase">In Active Learning</span>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            {learningCards}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Reviewing in spaced intervals</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-mono text-neutral-400 uppercase">Unseen / Fresh</span>
          <div className="text-3xl font-extrabold text-neutral-600 dark:text-neutral-400 mt-2">
            {unlearnedCards}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">Ready for first pass</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-mono text-neutral-400 uppercase">Starred High-Yield</span>
          <div className="text-3xl font-extrabold text-amber-500 mt-2">
            {starredCards}
          </div>
          <button
            onClick={onStudyStarred}
            disabled={starredCards === 0}
            className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline mt-1 font-medium disabled:opacity-50"
          >
            Study Starred Now →
          </button>
        </div>
      </div>

      {/* Unit-Wise Breakdown */}
      <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Unit-by-Unit Mastery Breakdown
            </h3>
            <p className="text-xs text-neutral-500">
              Track which of the 5 Computer Networks units need more cramming time.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {unitStats.map((stat) => (
            <div key={stat.unit} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {stat.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-neutral-500 text-[11px]">
                    {stat.mastered} / {stat.total} cards ({stat.pct}%)
                  </span>
                  <button
                    onClick={() => onSelectUnitAndStudy(stat.unit)}
                    className="text-[11px] font-semibold text-neutral-900 dark:text-neutral-100 hover:underline"
                  >
                    Study Unit →
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-neutral-900 dark:bg-neutral-100 rounded-full transition-all duration-500"
                  style={{ width: `${stat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
