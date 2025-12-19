
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import { initializeSocket, disconnectSocket } from '../socket/client';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        let socketInstance: Socket | null = null;

        if (isAuthenticated) {
            // Initialize connection
            socketInstance = initializeSocket();
            setSocket(socketInstance);

            // Listen for connection events
            const onConnect = () => setIsConnected(true);
            const onDisconnect = () => setIsConnected(false);

            socketInstance.on('connect', onConnect);
            socketInstance.on('disconnect', onDisconnect);

            // Check initial state
            if (socketInstance.connected) setIsConnected(true);

            return () => {
                // Cleanup listeners
                socketInstance?.off('connect', onConnect);
                socketInstance?.off('disconnect', onDisconnect);
            };
        } else {
            // Cleanup connection on logout
            disconnectSocket();
            setSocket(null);
            setIsConnected(false);
        }
    }, [isAuthenticated]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
