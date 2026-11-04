import React from 'react';
import type { UnitNumber, ViewMode, FilterState, DailyProgress } from '../types';
import {
  IconBrain,
  IconSearch,
  IconZap,
  IconLayers,
  IconCheckCircle,
  IconActivity,
  IconBookOpen,
  IconPlus,
  IconDownload,
  IconVolume,
  IconMoon,
  IconSun,
  IconX,
  IconSidebar,
} from './Icons';

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
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

const UNIT_SHORT_NAMES: Record<number, string> = {
  1: 'Physical Layer & Topologies',
  2: 'Data Link Layer & MAC',
  3: 'Network Layer & Routing',
  4: 'Transport Layer & Congestion',
  5: 'Application & Security',
};

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
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

  const navModes: { mode: ViewMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'study', label: 'Flashcards', icon: <IconZap size={16} /> },
    { mode: 'decks', label: 'Decks', icon: <IconLayers size={16} /> },
    { mode: 'mcq', label: 'MCQ Practice', icon: <IconCheckCircle size={16} /> },
    { mode: 'quiz', label: 'Exam Test', icon: <IconActivity size={16} /> },
    { mode: 'sheet', label: 'Cram Sheet', icon: <IconBookOpen size={16} /> },
    { mode: 'stats', label: 'Progress Stats', icon: <IconActivity size={16} /> },
  ];

  const handleModeClick = (mode: ViewMode) => {
    onSelectViewMode(mode);
    onCloseMobile();
  };

  const handleUnitClick = (unit: 'all' | UnitNumber) => {
    onSelectUnit(unit);
    if (filterState.status === 'unknown') {
      onFilterChange({ status: 'all' });
    }
    onCloseMobile();
  };

  // Reusable Sidebar Inner Content
  const renderSidebarContent = (collapsedMode: boolean) => (
    <div className="flex flex-col h-full justify-between select-none">
      {/* Top Section: Branding, Collapse button & Search */}
      <div className="space-y-4">
        {/* Header: Logo & Collapse Toggle */}
        <div className={`flex items-center ${collapsedMode ? 'justify-center' : 'justify-between'} pt-1 px-1`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold shadow-xs shrink-0">
              <IconBrain size={18} />
            </div>
            {!collapsedMode && (
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                    CN Recall
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                    {totalCount} Qs
                  </span>
                </div>
                <p className="text-[10px] text-neutral-500 truncate max-w-[140px]">
                  Computer Networks Viva
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            title={collapsedMode ? 'Expand sidebar ([)' : 'Collapse sidebar ([)'}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition hidden md:flex items-center justify-center"
          >
            <IconSidebar size={16} />
          </button>
        </div>

        {/* Search Bar */}
        {!collapsedMode ? (
          <div className="relative w-full">
            <IconSearch
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
              size={14}
            />
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search 204 Qs..."
              className="w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => onFilterChange({ searchQuery: '' })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <IconX size={13} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={onToggleCollapse}
              title="Search Questions"
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            >
              <IconSearch size={16} />
            </button>
          </div>
        )}

        {/* Streak & Daily Goal Widget */}
        {!collapsedMode ? (
          <div className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold">
                <span>🔥</span>
                <span>{dailyProgress.streak} Day Streak</span>
              </span>
              <span className="text-neutral-500 text-[11px]">
                {dailyProgress.cardsStudiedToday}/{dailyProgress.dailyGoal}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 text-center py-1">
            <span
              title={`Streak: ${dailyProgress.streak} days`}
              className="text-xs cursor-default"
            >
              🔥
            </span>
            <span className="font-mono text-[10px] text-neutral-500">
              {dailyProgress.streak}d
            </span>
          </div>
        )}

        {/* Study Navigation Modes */}
        <div className="space-y-1">
          {!collapsedMode && (
            <div className="px-2 pt-1 pb-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Study Modes
            </div>
          )}

          {navModes.map((item) => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => handleModeClick(item.mode)}
                title={item.label}
                className={`w-full flex items-center ${
                  collapsedMode ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                } rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/70 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-inherit' : 'text-neutral-400 dark:text-neutral-500'}>
                    {item.icon}
                  </span>
                  {!collapsedMode && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Unit Filters */}
        <div className="space-y-1 pt-2 border-t border-neutral-150 dark:border-neutral-850">
          {!collapsedMode && (
            <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center justify-between">
              <span>Syllabus Units</span>
              <span>5 Units</span>
            </div>
          )}

          {/* Smart Revision Filter */}
          {unknownCount > 0 && (
            <button
              onClick={() => {
                onFilterChange({
                  status: filterState.status === 'unknown' ? 'all' : 'unknown',
                });
                onCloseMobile();
              }}
              title={`Review ${unknownCount} Unknown & Difficult Cards`}
              className={`w-full flex items-center ${
                collapsedMode ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
              } rounded-xl text-xs font-medium transition border ${
                filterState.status === 'unknown'
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-900/60 hover:bg-rose-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">⚡</span>
                {!collapsedMode && <span>Review Unknown</span>}
              </div>
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                  filterState.status === 'unknown'
                    ? 'bg-rose-700 text-white'
                    : 'bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200'
                }`}
              >
                {unknownCount}
              </span>
            </button>
          )}

          {/* All Units */}
          <button
            onClick={() => handleUnitClick('all')}
            title="All Units (204 Questions)"
            className={`w-full flex items-center ${
              collapsedMode ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
            } rounded-xl text-xs font-medium transition ${
              currentUnit === 'all' && filterState.status !== 'unknown'
                ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              {!collapsedMode && <span>All Units</span>}
            </div>
            {!collapsedMode && (
              <span className="font-mono text-[10px] text-neutral-400">
                {unitCounts['all'] || totalCount}
              </span>
            )}
          </button>

          {/* Individual Units 1 to 5 */}
          {([1, 2, 3, 4, 5] as UnitNumber[]).map((u) => {
            const isSelected = currentUnit === u && filterState.status !== 'unknown';
            const count = unitCounts[String(u)] || 0;
            return (
              <button
                key={u}
                onClick={() => handleUnitClick(u)}
                title={`Unit ${u}: ${UNIT_SHORT_NAMES[u]}`}
                className={`w-full flex items-center ${
                  collapsedMode ? 'justify-center p-2.5' : 'justify-between px-3 py-1.5'
                } rounded-xl text-xs font-medium transition ${
                  isSelected
                    ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[11px] font-semibold text-neutral-400 shrink-0">
                    U{u}
                  </span>
                  {!collapsedMode && (
                    <span className="truncate max-w-[140px] text-left">
                      {UNIT_SHORT_NAMES[u]}
                    </span>
                  )}
                </div>
                {!collapsedMode && (
                  <span className="font-mono text-[10px] text-neutral-400 shrink-0">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2 mt-4">
        {!collapsedMode ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenNewCard();
                  onCloseMobile();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition shadow-2xs"
              >
                <IconPlus size={14} />
                <span>Add Card</span>
              </button>

              <button
                onClick={() => {
                  onOpenImport();
                  onCloseMobile();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <IconDownload size={14} />
                <span>Import</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-neutral-500">
              <button
                onClick={onToggleSound}
                title={soundEnabled ? 'Mute Audio' : 'Unmute Audio'}
                className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                <IconVolume size={15} />
                <span className="text-[11px]">{soundEnabled ? 'Sound On' : 'Muted'}</span>
              </button>

              <button
                onClick={onToggleTheme}
                title="Toggle Theme"
                className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
              >
                {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
                <span className="text-[11px] capitalize">{theme} Mode</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onOpenNewCard}
              title="Add Card"
              className="p-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
            >
              <IconPlus size={15} />
            </button>

            <button
              onClick={onOpenImport}
              title="Import / Export"
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <IconDownload size={15} />
            </button>

            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Sound Enabled' : 'Muted'}
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              <IconVolume size={15} />
            </button>

            <button
              onClick={onToggleTheme}
              title="Toggle Theme"
              className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              {theme === 'dark' ? <IconSun size={15} /> : <IconMoon size={15} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside
        className={`hidden md:flex flex-col shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-300 ease-in-out sticky top-0 h-screen h-[100dvh] overflow-y-auto no-scrollbar z-30 p-3.5 ${
          isCollapsed ? 'w-18' : 'w-64 lg:w-70'
        }`}
      >
        {renderSidebarContent(isCollapsed)}
      </aside>

      {/* ================= MOBILE DRAWER OVERLAY ================= */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex animate-fadeIn">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-4 shadow-2xl flex flex-col justify-between overflow-y-auto no-scrollbar z-10">
            {/* Mobile close button */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold">
                  <IconBrain size={16} />
                </div>
                <span className="font-semibold text-sm">CN Recall</span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              >
                <IconX size={18} />
              </button>
            </div>

            {renderSidebarContent(false)}
          </div>
        </div>
      )}
    </>
  );
};
