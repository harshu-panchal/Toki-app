import { MaterialSymbol } from '../types/material-symbol';

interface TopAppBarProps {
  title: string;
  icon?: string;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
}

export const TopAppBar = ({ 
  title, 
  icon = 'favorite', 
  onSearchClick, 
  onFilterClick 
}: TopAppBarProps) => {
  return (
    <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 text-white shadow-lg shadow-primary/30">
            <MaterialSymbol name={icon} size={24} />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
            {title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchClick}
            className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-[#342d18] text-slate-600 dark:text-white hover:bg-gray-100 dark:hover:bg-[#4b202e] transition-colors active:scale-95"
            aria-label="Search"
          >
            <MaterialSymbol name="search" size={24} />
          </button>
          <button
            onClick={onFilterClick}
            className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-[#342d18] text-slate-600 dark:text-white hover:bg-gray-100 dark:hover:bg-[#4b202e] transition-colors active:scale-95"
            aria-label="Filter"
          >
            <MaterialSymbol name="tune" size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

