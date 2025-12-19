/**
 * Socket Service - Socket.IO Client for Real-time Chat
 * @purpose: Manage Socket.IO connection and real-time events
 */

import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

class SocketService {
    private socket: Socket | null = null;
    private listeners: Map<string, Set<Function>> = new Map();

    /**
     * Connect to Socket.IO server
     */
    connect() {
        const token = localStorage.getItem('matchmint_auth_token');

        if (!token) {
            console.error('No auth token found');
            return;
        }

        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        this.socket = io(SOCKET_URL, {
            auth: { token },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: 5,
        });

        this.socket.on('connect', () => {
            console.log('✅ Socket connected:', this.socket?.id);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        // Setup event listeners
        this.setupDefaultListeners();
    }

    /**
     * Disconnect from Socket.IO server
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.listeners.clear();
        }
    }

    /**
     * Setup default event listeners
     */
    private setupDefaultListeners() {
        if (!this.socket) return;

        // User online/offline
        this.socket.on('user:online', (data) => {
            this.emit('user:online', data);
        });

        this.socket.on('user:offline', (data) => {
            this.emit('user:offline', data);
        });

        // New message
        this.socket.on('message:new', (data) => {
            this.emit('message:new', data);
        });

        // Message notification
        this.socket.on('message:notification', (data) => {
            this.emit('message:notification', data);
        });

        // Message read
        this.socket.on('message:read', (data) => {
            this.emit('message:read', data);
        });

        // Typing indicator
        this.socket.on('chat:typing', (data) => {
            this.emit('chat:typing', data);
        });

        // Balance update
        this.socket.on('balance:update', (data) => {
            this.emit('balance:update', data);
        });

        // Intimacy level up
        this.socket.on('intimacy:levelup', (data) => {
            this.emit('intimacy:levelup', data);
        });
    }

    /**
     * Join a chat room
     */
    joinChat(chatId: string) {
        this.socket?.emit('chat:join', { chatId });
    }

    /**
     * Leave a chat room
     */
    leaveChat(chatId: string) {
        this.socket?.emit('chat:leave', { chatId });
    }

    /**
     * Send typing indicator
     */
    sendTyping(chatId: string, isTyping: boolean) {
        this.socket?.emit('chat:typing', { chatId, isTyping });
    }

    /**
     * Mark message as read
     */
    markMessageAsRead(messageId: string, chatId: string) {
        this.socket?.emit('message:read', { messageId, chatId });
    }

    /**
     * Request balance update
     */
    requestBalance() {
        this.socket?.emit('balance:request');
    }

    /**
     * Subscribe to an event
     */
    on(event: string, callback: Function) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);
    }

    /**
     * Unsubscribe from an event
     */
    off(event: string, callback: Function) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.delete(callback);
        }
    }

    /**
     * Emit event to listeners
     */
    private emit(event: string, data: any) {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }

    /**
     * Check if socket is connected
     */
    isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

// Singleton instance
const socketService = new SocketService();

export default socketService;
