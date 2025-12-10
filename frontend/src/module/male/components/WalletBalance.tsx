import { MaterialSymbol } from '../types/material-symbol';

interface WalletBalanceProps {
  balance: number;
  onTopUpClick?: () => void;
}

export const WalletBalance = ({ balance, onTopUpClick }: WalletBalanceProps) => {
  const formattedBalance = balance.toLocaleString();

  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-slate-900 dark:bg-[#342d18] p-1 pr-1.5 shadow-lg">
      <div className="flex items-center gap-3 pl-4 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
          <MaterialSymbol name="monetization_on" filled />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-400 dark:text-[#cbbc90]">Balance</span>
          <span className="text-lg font-bold text-white leading-none">{formattedBalance}</span>
        </div>
      </div>
      <button
        onClick={onTopUpClick}
        className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-slate-900 transition-all hover:bg-yellow-400 hover:shadow-lg active:scale-95 duration-200"
      >
        <MaterialSymbol name="add" size={18} />
        Top Up
      </button>
    </div>
  );
};

