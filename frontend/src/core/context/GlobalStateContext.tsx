
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useSocket } from './SocketContext';
import { WalletState, UnreadCounts, BalanceUpdatePayload } from '../types/global';

interface GlobalStateContextType {
    wallet: WalletState;
    counts: UnreadCounts;
    refreshWallet: () => Promise<void>;
    refreshCounts: () => Promise<void>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const { socket } = useSocket();

    // State
    const [wallet, setWallet] = useState<WalletState>({
        balance: 0,
        isVip: false,
        currency: 'INR'
    });

    const [counts, setCounts] = useState<UnreadCounts>({
        messages: 0,
        notifications: 0
    });

    // Fetch Logic (Placeholder for API calls)
    const refreshWallet = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            // TODO: Replace with actual API call
            // const res = await api.get('/wallet/balance');
            // setWallet(res.data);
            console.log('Fetching wallet...');
        } catch (err) {
            console.error('Failed to fetch wallet', err);
        }
    }, [isAuthenticated]);

    const refreshCounts = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            // TODO: Replace with actual API call
            // const res = await api.get('/user/stats');
            // setCounts(res.data);
            console.log('Fetching counts...');
        } catch (err) {
            console.error('Failed to fetch counts', err);
        }
    }, [isAuthenticated]);

    // Initial Load
    useEffect(() => {
        if (isAuthenticated) {
            refreshWallet();
            refreshCounts();
        } else {
            // Reset on logout
            setWallet({ balance: 0, isVip: false, currency: 'INR' });
            setCounts({ messages: 0, notifications: 0 });
        }
    }, [isAuthenticated, refreshWallet, refreshCounts]);

    // Socket Event Listeners
    useEffect(() => {
        if (!socket || !isAuthenticated) return;

        // Handle Balance Updates
        const handleBalanceUpdate = (payload: BalanceUpdatePayload) => {
            console.log('💰 Socket: Balance Update', payload);
            if (payload.newBalance !== undefined) {
                setWallet(prev => ({ ...prev, balance: payload.newBalance }));
            } else if (payload.delta !== undefined) {
                setWallet(prev => ({ ...prev, balance: prev.balance + payload.delta }));
            }
        };

        // Handle Notifications
        const handleNotification = () => {
            setCounts(prev => ({ ...prev, notifications: prev.notifications + 1 }));
        };

        // Handle New Messages (Global Counter)
        const handleNewMessage = () => {
            // Ideally, we check if we are already viewing this chat, but for now simple increment
            setCounts(prev => ({ ...prev, messages: prev.messages + 1 }));
        };

        socket.on('balance:update', handleBalanceUpdate);
        socket.on('notification:new', handleNotification);
        socket.on('chat:message', handleNewMessage);

        return () => {
            socket.off('balance:update', handleBalanceUpdate);
            socket.off('notification:new', handleNotification);
            socket.off('chat:message', handleNewMessage);
        };
    }, [socket, isAuthenticated]);

    return (
        <GlobalStateContext.Provider value={{ wallet, counts, refreshWallet, refreshCounts }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
