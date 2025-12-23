/**
 * Global State Context - Centralized state management with Socket.IO sync
 * @purpose: Cache user data, balance, and sync via WebSocket for real-time updates
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserProfile } from '../types/global';
import socketService from '../services/socket.service';
import walletService from '../services/wallet.service';
import { useAuth } from './AuthContext';
import { mapUserToProfile } from '../utils/auth';

interface GlobalState {
    user: UserProfile | null;
    coinBalance: number;
    isConnected: boolean;

    // Actions
    setUser: (user: any | null) => void;
    updateBalance: (balance: number) => void;
    refreshBalance: () => Promise<void>;
    logout: () => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

// Local storage keys
const STORAGE_KEYS = {
    USER: 'matchmint_user',
    TOKEN: 'matchmint_auth_token',
    BALANCE_CACHE: 'matchmint_balance_cache',
};

interface GlobalStateProviderProps {
    children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
    const { user, updateUser } = useAuth();

    const [coinBalance, setCoinBalance] = useState<number>(() => {
        // Initialize from cache
        try {
            const cached = localStorage.getItem(STORAGE_KEYS.BALANCE_CACHE);
            return cached ? parseInt(cached, 10) : 0;
        } catch {
            return 0;
        }
    });

    const [isConnected, setIsConnected] = useState(false);

    // Update user and persist to localStorage
    // setUser mapping
    const setUser = useCallback((newUser: any | null) => {
        if (newUser) {
            updateUser(mapUserToProfile(newUser));
        }
    }, [updateUser]);

    // Update balance and cache
    const updateBalance = useCallback((balance: number) => {
        setCoinBalance(balance);
        localStorage.setItem(STORAGE_KEYS.BALANCE_CACHE, String(balance));
    }, []);

    // Fetch fresh balance from API
    const refreshBalance = useCallback(async () => {
        try {
            const data = await walletService.getBalance();
            // Backend returns { balance: number }, not { coinBalance }
            updateBalance(data.balance || data.coinBalance || 0);
        } catch (error) {
            console.error('Failed to refresh balance:', error);
        }
    }, [updateBalance]);

    // Logout
    const logoutAction = useCallback(() => {
        socketService.disconnect();
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.BALANCE_CACHE);
        setCoinBalance(0);
        // AuthContext.logout will be handled by the logout button in components
    }, []);

    // Socket.IO event listeners
    useEffect(() => {
        if (!user) return;

        // Connect to socket
        socketService.connect();

        // Handle connection status
        const handleConnect = () => setIsConnected(true);
        const handleDisconnect = () => setIsConnected(false);

        // Handle balance updates - backend sends { balance: number }
        const handleBalanceUpdate = (data: { balance: number }) => {
            updateBalance(data.balance);
        };

        // Handle user updates (profile changes, online status, etc.)
        // Handle user updates (profile changes, online status, etc.)
        const handleUserUpdate = (data: any) => {
            if (data.userId === user?.id) {
                updateUser(mapUserToProfile(data));
            }
        };

        // Register listeners
        socketService.on('connect', handleConnect);
        socketService.on('disconnect', handleDisconnect);
        socketService.on('balance:update', handleBalanceUpdate);
        socketService.on('user:update', handleUserUpdate);

        // Initial balance fetch
        refreshBalance();

        return () => {
            socketService.off('connect', handleConnect);
            socketService.off('disconnect', handleDisconnect);
            socketService.off('balance:update', handleBalanceUpdate);
            socketService.off('user:update', handleUserUpdate);
        };
    }, [user?.id, updateBalance, refreshBalance, updateUser]);

    const value: GlobalState = {
        user,
        coinBalance,
        isConnected,
        setUser,
        updateBalance,
        refreshBalance,
        logout: logoutAction,
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = (): GlobalState => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};

export default GlobalStateContext;
