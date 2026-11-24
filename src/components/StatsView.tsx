import React from 'react';
import type { Flashcard, UnitNumber, SubjectConfig } from '../types';
import { SUBJECTS } from '../data/subjects';

interface StatsViewProps {
  cards: Flashcard[];
  subjectConfig?: SubjectConfig;
  onSelectUnitAndStudy: (unit: 'all' | UnitNumber) => void;
  onStudyStarred: () => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  cards,
  subjectConfig = SUBJECTS.cn,
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
      title: subjectConfig.unitNames[u] || `Unit ${u}`,
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
          <p className="text-[11px] text-neutral-500 mt-1">Ready for first recall review</p>
        </div>

        <div className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xs">
          <span className="text-xs font-mono text-neutral-400 uppercase">Starred for Exam</span>
          <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-2">
            {starredCards}
          </div>
          <p className="text-[11px] text-neutral-500 mt-1">High-yield priority cards</p>
        </div>
      </div>

      {/* Progress by Unit */}
      <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Unit-wise Mastery ({subjectConfig.name})
            </h3>
            <p className="text-xs text-neutral-500">
              Breakdown of questions answered correctly in 2 or more spaced repetitions.
            </p>
          </div>
          <button
            onClick={() => onSelectUnitAndStudy('all')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:opacity-90 transition cursor-pointer"
          >
            Study All Units
          </button>
        </div>

        <div className="space-y-4">
          {unitStats.map((st) => (
            <div key={st.unit} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="flex items-center gap-2">
                  <span className="font-mono text-neutral-400">Unit {st.unit}:</span>
                  <span className="text-neutral-800 dark:text-neutral-200">{st.title}</span>
                </span>
                <span className="font-mono text-neutral-500">
                  {st.mastered}/{st.total} ({st.pct}%)
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${st.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <div>
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            Targeted Exam Preparation
          </h4>
          <p className="text-xs text-neutral-500">
            Focus purely on cards you marked as important or difficult.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {starredCards > 0 && (
            <button
              onClick={onStudyStarred}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition cursor-pointer shadow-xs"
            >
              Study {starredCards} Starred Cards
            </button>
          )}
          <button
            onClick={() => onSelectUnitAndStudy(1)}
            className="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition cursor-pointer"
          >
            Start Unit 1
          </button>
        </div>
      </div>
    </div>
  );
};
