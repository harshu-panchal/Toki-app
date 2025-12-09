import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MaleDashboard } from '../../features/male/pages/MaleDashboard';
import { NearbyFemalesPage } from '../../features/male/pages/NearbyFemalesPage';
import { ChatListPage } from '../../features/male/pages/ChatListPage';
import { ChatWindowPage } from '../../features/male/pages/ChatWindowPage';
import { WalletPage } from '../../features/male/pages/WalletPage';
import { CoinPurchasePage } from '../../features/male/pages/CoinPurchasePage';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MaleDashboard />} />
        <Route path="/dashboard" element={<MaleDashboard />} />
        <Route path="/discover" element={<NearbyFemalesPage />} />
        <Route path="/chats" element={<ChatListPage />} />
        <Route path="/chat/:chatId" element={<ChatWindowPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/buy-coins" element={<CoinPurchasePage />} />
      </Routes>
    </BrowserRouter>
  );
};

