import { MaterialSymbol } from '../types/material-symbol';

export const TrustFooter = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 gap-3 opacity-60">
      <div className="flex items-center gap-2 text-xs">
        <MaterialSymbol name="lock" size={16} />
        <span>Payments processed securely</span>
      </div>
      <p className="text-[10px] text-center max-w-[200px] leading-relaxed">
        Purchases are final. By continuing, you agree to our Terms of Service.
      </p>
    </div>
  );
};

