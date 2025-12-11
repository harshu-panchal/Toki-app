import { useState } from 'react';
import { MaterialSymbol } from '../types/material-symbol';
import type { Gift } from '../types/male.types';

interface ChatGiftSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendGifts: (gifts: Gift[], note?: string) => void;
  availableGifts: number; // Free gifts from VIP
  coinBalance: number;
}

const mockGifts: Gift[] = [
  { id: '1', name: 'Rose', icon: 'local_florist', cost: 50, description: 'A beautiful rose', category: 'romantic' },
  { id: '2', name: 'Chocolate', icon: 'cake', cost: 100, description: 'Sweet chocolate', category: 'romantic' },
  { id: '3', name: 'Diamond', icon: 'diamond', cost: 500, description: 'Precious diamond', category: 'luxury' },
  { id: '4', name: 'Heart', icon: 'favorite', cost: 200, description: 'Show your love', category: 'romantic' },
  { id: '5', name: 'Star', icon: 'star', cost: 150, description: 'Make them feel special', category: 'special' },
  { id: '6', name: 'Crown', icon: 'workspace_premium', cost: 1000, description: 'Royal treatment', category: 'luxury' },
  { id: '7', name: 'Balloon', icon: 'celebration', cost: 75, description: 'Celebrate together', category: 'fun' },
  { id: '8', name: 'Ring', icon: 'favorite', cost: 800, description: 'A special ring', category: 'luxury' },
];

export const ChatGiftSelectorModal = ({
  isOpen,
  onClose,
  onSendGifts,
  availableGifts,
  coinBalance,
}: ChatGiftSelectorModalProps) => {
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
  const [giftNote, setGiftNote] = useState('');

  if (!isOpen) return null;

  const toggleGift = (giftId: string) => {
    setSelectedGifts((prev) =>
      prev.includes(giftId) ? prev.filter((id) => id !== giftId) : [...prev, giftId]
    );
  };

  const getSelectedGiftsData = (): Gift[] => {
    return mockGifts.filter((gift) => selectedGifts.includes(gift.id));
  };

  const calculateTotalCost = (): number => {
    const selected = getSelectedGiftsData();
    if (availableGifts > 0) {
      // First N gifts are free
      const freeCount = Math.min(availableGifts, selected.length);
      const paidGifts = selected.slice(freeCount);
      return paidGifts.reduce((sum, gift) => sum + gift.cost, 0);
    }
    return selected.reduce((sum, gift) => sum + gift.cost, 0);
  };

  const canSend = selectedGifts.length > 0 && (availableGifts > 0 || coinBalance >= calculateTotalCost());

  const handleSend = () => {
    if (canSend) {
      const gifts = getSelectedGiftsData();
      onSendGifts(gifts, giftNote.trim() || undefined);
      // Reset
      setSelectedGifts([]);
      setGiftNote('');
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#2f151e] rounded-t-3xl shadow-2xl safe-area-inset-bottom max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#2f151e] border-b border-gray-200 dark:border-gray-700 z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Send Gift</h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-[#342d18] text-slate-600 dark:text-white hover:bg-gray-200 dark:hover:bg-[#4b202e] transition-colors active:scale-95"
              aria-label="Close"
            >
              <MaterialSymbol name="close" size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Available Gifts Badge */}
          {availableGifts > 0 && (
            <div className="p-3 bg-gradient-to-r from-primary/20 to-pink-500/20 rounded-xl border border-primary/30">
              <div className="flex items-center gap-2">
                <MaterialSymbol name="redeem" className="text-primary" />
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  You have {availableGifts} free gift{availableGifts > 1 ? 's' : ''} from VIP membership
                </span>
              </div>
            </div>
          )}

          {/* Coin Balance */}
          <div className="bg-gray-50 dark:bg-[#342d18] rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Coin Balance</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">{coinBalance} coins</span>
            </div>
          </div>

          {/* Gift Selection */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Select Gift{selectedGifts.length > 1 ? 's' : ''} ({selectedGifts.length} selected)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {mockGifts.map((gift) => {
                const isSelected = selectedGifts.includes(gift.id);
                const isFree = availableGifts > 0 && selectedGifts.indexOf(gift.id) < availableGifts;
                return (
                  <button
                    key={gift.id}
                    onClick={() => toggleGift(gift.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-[#342d18]'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <MaterialSymbol
                        name={gift.icon as any}
                        size={32}
                        className={isSelected ? 'text-primary' : 'text-gray-400'}
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{gift.name}</span>
                      <div className="flex items-center gap-1">
                        {isFree ? (
                          <span className="text-xs font-medium text-green-600">Free</span>
                        ) : (
                          <>
                            <MaterialSymbol name="monetization_on" size={14} className="text-primary" />
                            <span className="text-xs font-medium text-slate-900 dark:text-white">{gift.cost}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gift Note */}
          {selectedGifts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Add Note (Optional)
              </h3>
              <textarea
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Write a message to go with your gift..."
                rows={3}
                className="w-full px-4 py-3 bg-white dark:bg-[#342d18] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                maxLength={200}
              />
              <p className="mt-1 text-xs text-gray-500">{giftNote.length}/200</p>
            </div>
          )}

          {/* Total Cost */}
          {selectedGifts.length > 0 && (
            <div className="bg-gray-50 dark:bg-[#342d18] rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Cost</span>
                <div className="flex items-center gap-1">
                  {calculateTotalCost() === 0 ? (
                    <span className="text-lg font-bold text-green-600">Free</span>
                  ) : (
                    <>
                      <MaterialSymbol name="monetization_on" size={18} className="text-primary" />
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        {calculateTotalCost()} coins
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!canSend}
            className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-xl hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="flex items-center justify-center gap-2">
              <MaterialSymbol name="send" />
              <span>
                Send {selectedGifts.length > 0 ? `${selectedGifts.length} Gift${selectedGifts.length > 1 ? 's' : ''}` : 'Gift'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

