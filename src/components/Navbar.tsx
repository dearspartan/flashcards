import React from 'react';
import type { UnitNumber, ViewMode, FilterState, DailyProgress } from '../types';
import {
  IconSearch,
  IconBrain,
  IconLayers,
  IconBookOpen,
  IconActivity,
  IconZap,
  IconPlus,
  IconDownload,
  IconVolume,
  IconMoon,
  IconSun,
  IconX,
  IconCheckCircle,
} from './Icons';

interface NavbarProps {
  currentUnit: 'all' | UnitNumber;
  onSelectUnit: (unit: 'all' | UnitNumber) => void;
  viewMode: ViewMode;
  onSelectViewMode: (mode: ViewMode) => void;
  filterState: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  unitCounts: Record<string, number>;
  totalCount: number;
  unknownCount: number;
  dailyProgress: DailyProgress;
  onOpenImport: () => void;
  onOpenNewCard: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUnit,
  onSelectUnit,
  viewMode,
  onSelectViewMode,
  filterState,
  onFilterChange,
  unitCounts,
  totalCount,
  unknownCount,
  dailyProgress,
  onOpenImport,
  onOpenNewCard,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
}) => {
  const goalPercentage = Math.min(
    100,
    Math.round((dailyProgress.cardsStudiedToday / (dailyProgress.dailyGoal || 20)) * 100)
  );

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Top Tier: Logo, Search & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3">
          {/* Row 1 on mobile: Logo + quick mobile actions */}
          <div className="flex items-center justify-between w-full md:w-auto gap-2">
            {/* Logo & Slogan */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold shadow-sm shrink-0">
                <IconBrain size={18} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-semibold text-sm sm:text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                    CN Recall
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    {totalCount} Qs
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  5 Units Computer Networks Viva Engine
                </p>
              </div>
            </div>

            {/* Mobile-only action toolbar */}
            <div className="flex md:hidden items-center gap-1.5">
              {/* Streak */}
              <div
                title={`${dailyProgress.streak} day learning streak!`}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-xs font-mono font-medium"
              >
                <span>🔥</span>
                <span>{dailyProgress.streak}d</span>
              </div>

              <button
                onClick={onOpenNewCard}
                title="Add New Card"
                className="p-1.5 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              >
                <IconPlus size={15} />
              </button>

              <button
                onClick={onToggleSound}
                title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
                className={`p-1.5 rounded-lg border ${
                  soundEnabled
                    ? 'border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                    : 'border-transparent text-neutral-400'
                }`}
              >
                <IconVolume size={15} />
              </button>

              <button
                onClick={onToggleTheme}
                title="Toggle Theme"
                className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300"
              >
                {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm mx-auto md:mx-4 w-full">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={15} />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search 204 questions, protocols, RFCs..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-8 pr-8 py-1.5 text-base sm:text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-0.5"
              >
                <IconX size={14} />
              </button>
            )}
          </div>

          {/* Desktop Streak & Daily Goal + Action buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Streak Indicator */}
            <div
              title={`${dailyProgress.streak} day learning streak!`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-xs font-mono font-medium"
            >
              <span>🔥</span>
              <span>{dailyProgress.streak}d</span>
            </div>

            {/* Daily Goal Badge */}
            <div
              title={`Daily Goal: ${dailyProgress.cardsStudiedToday}/${dailyProgress.dailyGoal} cards studied today (${goalPercentage}%)`}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-mono"
            >
              <div className="w-2.5 h-2.5 rounded-full border border-emerald-500 flex items-center justify-center p-0.5">
                <div
                  className="w-full h-full rounded-full bg-emerald-500"
                  style={{ opacity: goalPercentage >= 100 ? 1 : goalPercentage / 100 }}
                />
              </div>
              <span>
                {dailyProgress.cardsStudiedToday}/{dailyProgress.dailyGoal}
              </span>
            </div>

            <button
              onClick={onOpenNewCard}
              title="Add New Card"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
            >
              <IconPlus size={14} />
              <span>Add Card</span>
            </button>

            <button
              onClick={onOpenImport}
              title="Import or Export Flashcards"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            >
              <IconDownload size={14} />
              <span>Import</span>
            </button>

            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
              className={`p-1.5 rounded-lg border transition ${
                soundEnabled
                  ? 'border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <IconVolume size={16} />
            </button>

            <button
              onClick={onToggleTheme}
              title="Toggle Dark / Light"
              className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
            </button>
          </div>
        </div>

        {/* Bottom Tier: View Modes & Unit Filters */}
        <div className="mt-2.5 pt-2 border-t border-neutral-150 dark:border-neutral-900 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2">
          {/* View Modes */}
          <div className="flex items-center p-0.5 rounded-xl bg-neutral-150 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-x-auto w-full lg:w-auto no-scrollbar py-0.5">
            <button
              onClick={() => onSelectViewMode('decks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                viewMode === 'decks'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconLayers size={13} />
              Decks
            </button>

            <button
              onClick={() => onSelectViewMode('study')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                viewMode === 'study'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconZap size={13} />
              Flashcards
            </button>

            <button
              onClick={() => onSelectViewMode('mcq')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                viewMode === 'mcq'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconCheckCircle size={13} />
              MCQ Quiz
            </button>

            <button
              onClick={() => onSelectViewMode('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                viewMode === 'quiz'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconActivity size={13} />
              Exam Test
            </button>

            <button
              onClick={() => onSelectViewMode('sheet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                viewMode === 'sheet'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconBookOpen size={13} />
              Cram Sheet
            </button>

            <button
              onClick={() => onSelectViewMode('stats')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition shrink-0 ${
                viewMode === 'stats'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconActivity size={13} />
              Stats
            </button>
          </div>

          {/* Unit selector pills & Smart Revision */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 no-scrollbar py-0.5">
            {/* Smart Revision Filter Pill */}
            {unknownCount > 0 && (
              <button
                onClick={() =>
                  onFilterChange({
                    status: filterState.status === 'unknown' ? 'all' : 'unknown',
                  })
                }
                title="Review Unknown & Difficult Cards"
                className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition flex items-center gap-1.5 border ${
                  filterState.status === 'unknown'
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60 hover:bg-rose-100'
                }`}
              >
                <span>⚡ Review Unknown</span>
                <span className="font-mono text-[10px] px-1 rounded-full bg-rose-200 dark:bg-rose-900">
                  {unknownCount}
                </span>
              </button>
            )}

            <button
              onClick={() => onSelectUnit('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition ${
                currentUnit === 'all' && filterState.status !== 'unknown'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              All ({unitCounts['all'] || 0})
            </button>

            {([1, 2, 3, 4, 5] as UnitNumber[]).map((u) => {
              const count = unitCounts[String(u)] || 0;
              const isSelected = currentUnit === u && filterState.status !== 'unknown';
              return (
                <button
                  key={u}
                  onClick={() => {
                    onSelectUnit(u);
                    if (filterState.status === 'unknown') {
                      onFilterChange({ status: 'all' });
                    }
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  <span>Unit {u}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-neutral-700 dark:bg-neutral-300 text-white dark:text-neutral-900'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
