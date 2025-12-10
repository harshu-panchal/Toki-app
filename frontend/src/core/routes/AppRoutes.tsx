import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MaleDashboard } from '../../module/male/pages/MaleDashboard';
import { NearbyFemalesPage } from '../../module/male/pages/NearbyFemalesPage';
import { ChatListPage } from '../../module/male/pages/ChatListPage';
import { ChatWindowPage } from '../../module/male/pages/ChatWindowPage';
import { WalletPage } from '../../module/male/pages/WalletPage';
import { CoinPurchasePage } from '../../module/male/pages/CoinPurchasePage';
import { UserProfilePage } from '../../module/male/pages/UserProfilePage';
import { NotificationsPage } from '../../module/male/pages/NotificationsPage';
import { PurchaseHistoryPage } from '../../module/male/pages/PurchaseHistoryPage';
import { PaymentPage } from '../../module/male/pages/PaymentPage';
import { MyProfilePage } from '../../module/male/pages/MyProfilePage';

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
        <Route path="/profile/:profileId" element={<UserProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/purchase-history" element={<PurchaseHistoryPage />} />
        <Route path="/payment/:planId" element={<PaymentPage />} />
        <Route path="/my-profile" element={<MyProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

