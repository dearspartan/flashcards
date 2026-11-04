import React from 'react';
import type { ViewMode, UnitNumber, FilterState, DailyProgress } from '../types';
import {
  IconMenu,
  IconSidebar,
  IconSearch,
  IconPlus,
  IconSun,
  IconMoon,
  IconX,
  IconVolume,
} from './Icons';

interface TopHeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  onOpenMobileSidebar: () => void;
  viewMode: ViewMode;
  currentUnit: 'all' | UnitNumber;
  filterState: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  dailyProgress: DailyProgress;
  onOpenNewCard: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const VIEW_TITLES: Record<ViewMode, string> = {
  study: 'Flashcards',
  decks: 'Deck Management',
  mcq: 'MCQ Practice',
  quiz: 'Exam Test',
  sheet: 'Cram Sheet',
  stats: 'Study Stats',
};

export const TopHeader: React.FC<TopHeaderProps> = ({
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  onOpenMobileSidebar,
  viewMode,
  currentUnit,
  filterState,
  onFilterChange,
  dailyProgress,
  onOpenNewCard,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md px-3 sm:px-6 h-13 flex items-center justify-between transition-colors">
      {/* Left side: Toggle button & Breadcrumbs */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileSidebar}
          title="Open Menu"
          className="md:hidden p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          <IconMenu size={18} />
        </button>

        {/* Desktop sidebar collapse toggle */}
        <button
          onClick={onToggleSidebarCollapse}
          title={isSidebarCollapsed ? 'Expand sidebar ([)' : 'Collapse sidebar ([)'}
          className="hidden md:flex p-2 rounded-xl text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition items-center justify-center"
        >
          <IconSidebar size={18} />
        </button>

        {/* Breadcrumb Info */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100 hidden sm:inline">
            CN Recall
          </span>
          <span className="text-neutral-300 dark:text-neutral-700 hidden sm:inline">/</span>
          <span className="font-medium text-neutral-800 dark:text-neutral-200">
            {VIEW_TITLES[viewMode]}
          </span>
          {filterState.status === 'unknown' ? (
            <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-[10px] font-mono font-medium">
              ⚡ Review Unknown
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 text-[10px] font-mono">
              {currentUnit === 'all' ? 'All Units' : `Unit ${currentUnit}`}
            </span>
          )}
        </div>
      </div>

      {/* Right side: Quick Search, Streak, Goal, Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Search when sidebar is collapsed on desktop */}
        {isSidebarCollapsed && (
          <div className="relative hidden md:block w-48 lg:w-64">
            <IconSearch
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              size={14}
            />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search cards..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-8 pr-7 py-1 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 transition"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <IconX size={12} />
              </button>
            )}
          </div>
        )}

        {/* Streak Counter */}
        <div
          title={`${dailyProgress.streak} day learning streak!`}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 text-xs font-mono font-medium"
        >
          <span>🔥</span>
          <span>{dailyProgress.streak}d</span>
        </div>

        {/* Daily Goal Badge */}
        <div
          title={`Daily Goal: ${dailyProgress.cardsStudiedToday}/${dailyProgress.dailyGoal} cards studied today`}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-mono"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>
            {dailyProgress.cardsStudiedToday}/{dailyProgress.dailyGoal}
          </span>
        </div>

        {/* Add Card Quick Button */}
        <button
          onClick={onOpenNewCard}
          title="Add New Question Card"
          className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center gap-1"
        >
          <IconPlus size={14} />
          <span className="hidden sm:inline">Add Card</span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
          className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition hidden sm:flex items-center justify-center"
        >
          <IconVolume size={15} />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          title="Toggle Theme"
          className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center justify-center"
        >
          {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
        </button>
      </div>
    </header>
  );
};
