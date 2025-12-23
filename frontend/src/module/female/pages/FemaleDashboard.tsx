import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../core/context/AuthContext';
import { ProfileHeader } from '../components/ProfileHeader';
import { EarningsCard } from '../components/EarningsCard';
import { FemaleStatsGrid } from '../components/FemaleStatsGrid';
import { ActiveChatsList } from '../components/ActiveChatsList';
import { FemaleBottomNavigation } from '../components/FemaleBottomNavigation';
import { FemaleTopNavbar } from '../components/FemaleTopNavbar';
import { FemaleSidebar } from '../components/FemaleSidebar';
import { QuickActionsGrid } from '../components/QuickActionsGrid';
import { useFemaleNavigation } from '../hooks/useFemaleNavigation';
import { LocationPromptModal } from '../../../shared/components/LocationPromptModal';
import userService from '../../../core/services/user.service';
import type { FemaleDashboardData } from '../types/female.types';



const quickActions = [
  { id: 'earnings', icon: 'trending_up', label: 'View Earnings' },
  { id: 'withdraw', icon: 'payments', label: 'Withdraw' },
  { id: 'trade-gifts', icon: 'redeem', label: 'Trade Gifts' },
  { id: 'auto-messages', icon: 'auto_awesome', label: 'Auto Messages' },
];

export const FemaleDashboard = () => {
  const [dashboardData, setDashboardData] = useState<FemaleDashboardData | null>(null);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { isSidebarOpen, setIsSidebarOpen, navigationItems, handleNavigationClick } = useFemaleNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getFemaleDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch female dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Protect route: Redirect if not approved
    if (user && user.role === 'female' && user.approvalStatus !== 'approved') {
      navigate('/verification-pending');
    }

    // Check if user needs to set location (only for approved females)
    if (user && user.role === 'female' && user.approvalStatus === 'approved' && (!user.location || user.location.trim() === '')) {
      setShowLocationPrompt(true);
    }
  }, [user, navigate]);

  const handleNotificationClick = () => {
    navigate('/female/notifications');
  };

  const handleViewEarningsClick = () => {
    navigate('/female/earnings');
  };

  const handleWithdrawClick = () => {
    navigate('/female/withdrawal');
  };

  const handleChatClick = (chatId: string) => {
    navigate(`/female/chat/${chatId}`);
  };

  const handleSeeAllChatsClick = () => {
    navigate('/female/chats');
  };


  const handleQuickActionClick = (actionId: string) => {
    switch (actionId) {
      case 'earnings':
        navigate('/female/earnings');
        break;
      case 'withdraw':
        navigate('/female/withdrawal');
        break;
      case 'trade-gifts':
        navigate('/female/trade-gifts');
        break;
      case 'auto-messages':
        navigate('/female/auto-messages');
        break;
      default:
        break;
    }
  };

  const handleLocationSave = (location: string) => {
    // Update user context
    if (updateUser) {
      updateUser({ location });
    }
    setShowLocationPrompt(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden pb-20">
      {/* Location Prompt Modal */}
      {showLocationPrompt && (
        <LocationPromptModal
          onSave={handleLocationSave}
          onClose={() => setShowLocationPrompt(false)}
        />
      )}
      {/* Top Navbar */}
      <FemaleTopNavbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Sidebar */}
      <FemaleSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />

      {/* Profile Header Section */}
      <div className="flex p-4 pt-4 @container">
        <div className="flex w-full flex-col gap-4">
          <ProfileHeader
            user={dashboardData?.user || { name: 'Loading...', avatar: '', isPremium: false, isOnline: false }}
            onNotificationClick={handleNotificationClick}
          />
          {/* Earnings Card */}
          <EarningsCard
            totalEarnings={dashboardData?.earnings.totalEarnings || 0}
            availableBalance={dashboardData?.earnings.availableBalance || 0}
            pendingWithdrawals={dashboardData?.earnings.pendingWithdrawals || 0}
            onViewEarningsClick={handleViewEarningsClick}
            onWithdrawClick={handleWithdrawClick}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <FemaleStatsGrid stats={dashboardData?.stats || { messagesReceived: 0, activeConversations: 0, profileViews: 0 }} />

      {/* Quick Actions Grid */}
      <QuickActionsGrid actions={quickActions.map(action => ({
        ...action,
        onClick: () => handleQuickActionClick(action.id),
      }))} />

      {/* Active Chats List */}
      <ActiveChatsList
        chats={dashboardData?.activeChats || []}
        onChatClick={handleChatClick}
        onSeeAllClick={handleSeeAllChatsClick}
      />

      {/* Bottom Navigation Bar */}
      <FemaleBottomNavigation
        items={navigationItems}
        onItemClick={handleNavigationClick}
      />
    </div>
  );
};

