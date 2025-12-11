import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';

interface FemaleTopNavbarProps {
  onMenuClick: () => void;
}

export const FemaleTopNavbar = ({ onMenuClick }: FemaleTopNavbarProps) => {
  return (
    <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#221e10]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <MaterialSymbol name="favorite" className="text-primary" size={28} filled />
          <span className="text-xl font-bold text-pink-600 dark:text-pink-400">MatchMint</span>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#342d18] transition-colors active:scale-95"
          aria-label="Open menu"
        >
          <MaterialSymbol name="menu" size={24} className="text-gray-900 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

