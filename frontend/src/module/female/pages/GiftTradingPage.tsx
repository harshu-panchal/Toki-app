import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialSymbol } from '../../../shared/components/MaterialSymbol';
import { FemaleBottomNavigation } from '../components/FemaleBottomNavigation';
import { FemaleTopNavbar } from '../components/FemaleTopNavbar';
import { FemaleSidebar } from '../components/FemaleSidebar';
import { useFemaleNavigation } from '../hooks/useFemaleNavigation';
import { getGiftTheme } from '../utils/giftThemes';
import type { Gift, GiftTrade } from '../types/female.types';

// Mock data - replace with actual API calls
const mockReceivedGifts: Gift[] = [
  {
    id: 'gift-1',
    name: 'Rose',
    icon: 'local_florist',
    cost: 50,
    tradeValue: 25,
    description: 'A beautiful rose',
    category: 'romantic',
    receivedAt: new Date(Date.now() - 86400000),
    senderId: '1',
    senderName: 'Alex',
    quantity: 4, // 4 roses - ₹25 × 4 = ₹100
  },
  {
    id: 'gift-2',
    name: 'Chocolate',
    icon: 'cake',
    cost: 100,
    tradeValue: 50,
    description: 'Sweet chocolate',
    category: 'romantic',
    receivedAt: new Date(Date.now() - 172800000),
    senderId: '2',
    senderName: 'Michael',
    quantity: 3, // 3 chocolates - ₹50 × 3 = ₹150
  },
  {
    id: 'gift-3',
    name: 'Diamond',
    icon: 'diamond',
    cost: 500,
    tradeValue: 250,
    description: 'Precious diamond',
    category: 'luxury',
    receivedAt: new Date(Date.now() - 259200000),
    senderId: '1',
    senderName: 'Alex',
    quantity: 1, // Single diamond
  },
  {
    id: 'gift-4',
    name: 'Heart',
    icon: 'favorite',
    cost: 200,
    tradeValue: 100,
    description: 'Show your love',
    category: 'romantic',
    receivedAt: new Date(Date.now() - 345600000),
    senderId: '3',
    senderName: 'David',
    quantity: 3, // 3 hearts - ₹100 × 3 = ₹300
  },
  {
    id: 'gift-5',
    name: 'Star',
    icon: 'star',
    cost: 150,
    tradeValue: 75,
    description: 'Make them feel special',
    category: 'special',
    receivedAt: new Date(Date.now() - 432000000),
    senderId: '2',
    senderName: 'Michael',
    quantity: 4, // 4 stars - ₹75 × 4 = ₹300
  },
];

const mockTradeHistory: GiftTrade[] = [
  {
    id: 'trade-1',
    giftId: 'gift-old-1',
    giftName: 'Rose',
    giftIcon: 'local_florist',
    tradeValue: 25,
    tradedAt: new Date(Date.now() - 604800000),
    status: 'completed',
  },
  {
    id: 'trade-2',
    giftId: 'gift-old-2',
    giftName: 'Chocolate',
    giftIcon: 'cake',
    tradeValue: 50,
    tradedAt: new Date(Date.now() - 1209600000),
    status: 'completed',
  },
];

export const GiftTradingPage = () => {
  const navigate = useNavigate();
  const { isSidebarOpen, setIsSidebarOpen, navigationItems, handleNavigationClick } = useFemaleNavigation();
  const [selectedGifts, setSelectedGifts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'available' | 'history'>('available');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleGiftSelection = (giftId: string) => {
    setSelectedGifts((prev) =>
      prev.includes(giftId) ? prev.filter((id) => id !== giftId) : [...prev, giftId]
    );
  };

  const selectedGiftsData = useMemo(() => {
    return mockReceivedGifts.filter((gift) => selectedGifts.includes(gift.id));
  }, [selectedGifts]);

  const totalTradeValue = useMemo(() => {
    return selectedGiftsData.reduce((sum, gift) => sum + (gift.tradeValue * (gift.quantity || 1)), 0);
  }, [selectedGiftsData]);

  const handleTrade = () => {
    if (selectedGifts.length === 0) return;
    
    // Navigate to trade flow page with selected gifts
    navigate('/female/trade-gifts/flow', {
      state: {
        selectedGifts: selectedGiftsData,
        totalValue: totalTradeValue,
      },
    });
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-20">
      {/* Top Navbar */}
      <FemaleTopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar */}
      <FemaleSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />

      {/* Header */}
      <div className="sticky top-[57px] z-10 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-[#342d18] transition-colors"
          >
            <MaterialSymbol name="arrow_back" size={24} />
          </button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Trade Gifts</h1>
          <div className="size-10" /> {/* Spacer */}
        </div>

        {/* Tabs */}
        <div className="flex border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('available')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'available'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            Available ({mockReceivedGifts.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-center font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            History ({mockTradeHistory.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 min-h-0">
        {activeTab === 'available' ? (
          <>
            {/* Info Banner */}
            <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <MaterialSymbol name="info" className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Trade your received gifts for money
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    Select gifts to trade. The trade value will be added to your earnings balance.
                  </p>
                </div>
              </div>
            </div>

            {/* Gifts Grid */}
            {mockReceivedGifts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {mockReceivedGifts.map((gift) => {
                  const theme = getGiftTheme(gift);
                  const isSelected = selectedGifts.includes(gift.id);
                  
                  return (
                    <button
                      key={gift.id}
                      onClick={() => toggleGiftSelection(gift.id)}
                      className={`relative p-4 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? `bg-gradient-to-br ${theme.primary} border-primary shadow-lg scale-105`
                          : 'bg-white dark:bg-[#342d18] border-gray-200 dark:border-gray-700 hover:border-primary/50'
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <div className={`absolute top-2 right-2 size-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-white border-white'
                          : 'bg-white/80 dark:bg-black/40 border-gray-300 dark:border-gray-600'
                      }`}>
                        {isSelected && (
                          <MaterialSymbol name="check" size={16} className="text-primary" />
                        )}
                      </div>

                      {/* Quantity Badge */}
                      {gift.quantity && gift.quantity > 1 && (
                        <div className={`absolute top-2 left-2 rounded-full px-2 py-1 text-xs font-bold shadow-md ${
                          isSelected ? 'bg-white/90 text-primary' : 'bg-primary text-white'
                        }`}>
                          ×{gift.quantity}
                        </div>
                      )}

                      {/* Gift Icon */}
                      <div className={`flex items-center justify-center mb-3 p-4 rounded-xl bg-gradient-to-br ${
                        isSelected ? 'bg-white/20' : theme.secondary
                      }`}>
                        <MaterialSymbol
                          name={gift.icon as any}
                          size={40}
                          className={isSelected ? 'text-white' : theme.iconColor}
                        />
                      </div>

                      {/* Gift Name */}
                      <h3 className={`font-bold text-sm mb-1 text-center ${
                        isSelected ? 'text-white' : 'text-gray-900 dark:text-white'
                      }`}>
                        {gift.name}
                      </h3>

                      {/* Trade Value */}
                      <div className={`flex flex-col items-center gap-1 mt-2 ${
                        isSelected ? 'text-white/90' : 'text-green-600 dark:text-green-400'
                      }`}>
                        <div className="flex items-center gap-1">
                          <MaterialSymbol name="monetization_on" size={14} />
                          <span className="text-xs font-semibold">
                            ₹{gift.tradeValue}
                            {gift.quantity && gift.quantity > 1 && ` × ${gift.quantity}`}
                          </span>
                        </div>
                        {gift.quantity && gift.quantity > 1 && (
                          <span className="text-xs font-bold">
                            = ₹{gift.tradeValue * gift.quantity}
                          </span>
                        )}
                      </div>

                      {/* Sender Info */}
                      {gift.senderName && (
                        <p className={`text-[10px] mt-1 text-center ${
                          isSelected ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          From {gift.senderName}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <MaterialSymbol name="redeem" size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No gifts available to trade
                </p>
              </div>
            )}

            {/* Trade Summary */}
            {selectedGifts.length > 0 && (
              <div className="sticky bottom-0 mt-4 p-4 bg-white dark:bg-[#342d18] rounded-2xl border-2 border-primary shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Selected: {selectedGifts.length} gift(s)
                  </span>
                  <div className="flex items-center gap-1">
                    <MaterialSymbol name="monetization_on" size={18} className="text-green-600 dark:text-green-400" />
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      ₹{totalTradeValue}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleTrade}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg active:scale-95"
                >
                  Trade Now
                </button>
              </div>
            )}
          </>
        ) : (
          /* Trade History */
          <div className="space-y-3">
            {mockTradeHistory.length > 0 ? (
              mockTradeHistory.map((trade) => {
                const theme = getGiftTheme({
                  name: trade.giftName,
                  icon: trade.giftIcon,
                } as Gift);
                
                return (
                  <div
                    key={trade.id}
                    className="p-4 bg-white dark:bg-[#342d18] rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${theme.secondary}`}>
                        <MaterialSymbol
                          name={trade.giftIcon as any}
                          size={32}
                          className={theme.iconColor}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {trade.giftName}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(trade.tradedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <MaterialSymbol name="monetization_on" size={18} className="text-green-600 dark:text-green-400" />
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          ₹{trade.tradeValue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <MaterialSymbol name="history" size={64} className="text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  No trade history yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <FemaleBottomNavigation items={navigationItems} onItemClick={handleNavigationClick} />
    </div>
  );
};

