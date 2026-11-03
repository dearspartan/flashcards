import React from 'react';
import type { UnitNumber, ViewMode, FilterState } from '../types';
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
  onOpenImport,
  onOpenNewCard,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Top Tier: Logo, Search, Main Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold shadow-sm">
              <IconBrain size={19} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                  CN Recall
                </span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                  5 Units • {totalCount} Cards
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 hidden sm:block">
                Computer Networks High-Yield Memorization Engine
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md mx-auto md:mx-4 w-full">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search 200+ CN questions, protocols, formulas..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-9 pr-8 py-1.5 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <IconX size={14} />
              </button>
            )}
          </div>

          {/* Controls: Mode buttons & Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 self-end md:self-auto">
            <button
              onClick={onOpenNewCard}
              title="Add New Card"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
            >
              <IconPlus size={14} />
              <span className="hidden sm:inline">Add Card</span>
            </button>

            <button
              onClick={onOpenImport}
              title="Bulk Import / Export 200+ Questions"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            >
              <IconDownload size={14} />
              <span className="hidden sm:inline">Import/Export</span>
            </button>

            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute Sounds' : 'Enable Audio Feedback'}
              className={`p-1.5 rounded-lg border transition ${
                soundEnabled
                  ? 'border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200'
                  : 'border-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300'
              }`}
            >
              <IconVolume size={16} />
            </button>

            <button
              onClick={onToggleTheme}
              title="Toggle Theme"
              className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
            </button>
          </div>
        </div>

        {/* Bottom Tier: Mode Switcher & Unit Pills */}
        <div className="mt-3 pt-2.5 border-t border-neutral-150 dark:border-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          {/* View Modes */}
          <div className="flex items-center p-0.5 rounded-lg bg-neutral-150 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => onSelectViewMode('study')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                viewMode === 'study'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconZap size={13} />
              Flashcards
            </button>
            <button
              onClick={() => onSelectViewMode('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                viewMode === 'quiz'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconLayers size={13} />
              Exam Test
            </button>
            <button
              onClick={() => onSelectViewMode('sheet')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
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
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition ${
                viewMode === 'stats'
                  ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <IconActivity size={13} />
              Stats
            </button>
          </div>

          {/* Unit selector pills */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectUnit('all')}
              className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 transition ${
                currentUnit === 'all'
                  ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              All ({unitCounts['all'] || 0})
            </button>
            {([1, 2, 3, 4, 5] as UnitNumber[]).map((u) => {
              const count = unitCounts[String(u)] || 0;
              const isSelected = currentUnit === u;
              return (
                <button
                  key={u}
                  onClick={() => onSelectUnit(u)}
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
