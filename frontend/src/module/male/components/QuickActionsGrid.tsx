import { MaterialSymbol } from '../types/material-symbol';

interface QuickAction {
  id: string;
  icon: string;
  label: string;
  iconColor?: string;
  iconBgColor?: string;
}

interface QuickActionsGridProps {
  actions: QuickAction[];
  onActionClick?: (actionId: string) => void;
}

export const QuickActionsGrid = ({ actions, onActionClick }: QuickActionsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onActionClick?.(action.id)}
          className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-[#2c2415] border border-gray-200 dark:border-white/5 shadow-sm active:scale-95 transition-transform hover:shadow-md"
        >
          <div
            className={`p-2 rounded-full ${
              action.iconBgColor || 'bg-primary/10'
            } ${action.iconColor || 'text-primary'}`}
          >
            <MaterialSymbol name={action.icon} size={24} />
          </div>
          <span className="text-sm font-medium text-[#111418] dark:text-[#ede0c9]">
            {action.label}
          </span>
        </button>
      ))}
    </div>
  );
};

