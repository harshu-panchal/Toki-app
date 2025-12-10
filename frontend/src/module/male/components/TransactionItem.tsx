import { MaterialSymbol } from '../types/material-symbol';

export type TransactionType = 'purchase' | 'spent' | 'bonus' | 'gift' | 'other';

interface TransactionItemProps {
  id: string;
  type: TransactionType;
  title: string;
  timestamp: string;
  amount: number;
  isPositive: boolean;
}

export const TransactionItem = ({
  type,
  title,
  timestamp,
  amount,
  isPositive,
}: TransactionItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'purchase':
        return 'add';
      case 'spent':
        return 'favorite';
      case 'bonus':
        return 'event_available';
      case 'gift':
        return 'redeem';
      default:
        return 'monetization_on';
    }
  };

  const getIconStyles = () => {
    switch (type) {
      case 'purchase':
        return 'bg-primary/20 text-primary';
      case 'bonus':
        return 'bg-green-500/20 text-green-600 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-[#2c2415] text-gray-500 dark:text-gray-400';
    }
  };

  const getAmountColor = () => {
    if (isPositive) {
      return type === 'bonus'
        ? 'text-green-600 dark:text-green-400'
        : 'text-primary';
    }
    return 'text-gray-900 dark:text-white';
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-[#342b1a]">
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center size-10 rounded-full shrink-0 ${getIconStyles()}`}
        >
          <MaterialSymbol name={getIcon()} size={20} />
        </div>
        <div className="flex flex-col">
          <p className="text-[#111418] dark:text-white text-sm font-semibold">{title}</p>
          <p className="text-gray-500 dark:text-[#9ca3af] text-xs">{timestamp}</p>
        </div>
      </div>
      <p className={`font-bold text-sm ${getAmountColor()}`}>
        {isPositive ? '+' : '-'}
        {Math.abs(amount).toLocaleString()}
      </p>
    </div>
  );
};

