import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useFemaleNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { 
      id: 'dashboard', 
      icon: 'home', 
      label: 'Home', 
      isActive: location.pathname === '/female/dashboard' 
    },
    { 
      id: 'chats', 
      icon: 'chat_bubble', 
      label: 'Chats', 
      hasBadge: true,
      isActive: location.pathname.startsWith('/female/chats') || location.pathname.startsWith('/female/chat/')
    },
    { 
      id: 'earnings', 
      icon: 'account_balance_wallet', 
      label: 'Earnings',
      isActive: location.pathname === '/female/earnings' || location.pathname === '/female/withdrawal'
    },
    { 
      id: 'profile', 
      icon: 'person', 
      label: 'Profile',
      isActive: location.pathname === '/female/my-profile' || location.pathname.startsWith('/female/profile/')
    },
  ];

  const handleNavigationClick = (itemId: string) => {
    switch (itemId) {
      case 'dashboard':
        navigate('/female/dashboard');
        break;
      case 'chats':
        navigate('/female/chats');
        break;
      case 'earnings':
        navigate('/female/earnings');
        break;
      case 'profile':
        navigate('/female/my-profile');
        break;
      default:
        break;
    }
  };

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    navigationItems,
    handleNavigationClick,
  };
};

