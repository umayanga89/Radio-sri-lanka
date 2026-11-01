import React from 'react';
import { RadioLanguage } from '../data/sriLankanStations';

export type NavFilterTab = 'All' | RadioLanguage | 'Favorites';

interface TopBarProps {
  activeTab: NavFilterTab;
  onSelectTab: (tab: NavFilterTab) => void;
  onOpenStudioSettings: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  onOpenStudioSettings
}) => {
  const navItems: { id: NavFilterTab; label: string }[] = [
    { id: 'All', label: 'All Channels' },
    { id: 'Sinhala', label: 'Sinhala FM' },
    { id: 'Tamil', label: 'Tamil FM' },
    { id: 'English', label: 'English FM' },
    { id: 'Favorites', label: 'Favorites' }
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-14 bg-stone-50/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-stone-200 dark:border-zinc-800/80">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          onSelectTab('All');
        }}
        className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500 rounded"
      >
        LankaWave
      </a>

      {/* Zone 2: 5 clean single-line text navigation links */}
      <nav
        aria-label="Primary Navigation"
        className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`min-h-[40px] px-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                isActive
                  ? 'text-zinc-900 dark:text-zinc-100 border-amber-500 font-semibold'
                  : 'border-transparent hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenStudioSettings}
          className="min-h-[40px] px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 shadow-sm"
        >
          Add Custom Stream
        </button>
      </div>
    </header>
  );
};
