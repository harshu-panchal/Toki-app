# Chat Feature Module

Real-time messaging functionality.

## Structure

- `components/` - Chat UI components (ChatList, ChatWindow, MessageBubble, MessageInput)
- `hooks/` - Chat hooks (useChat, useSocket, useMessages, etc.)
- `services/` - Chat API calls
- `types/` - Chat types (Message, ChatRoom, etc.)
- `store/` - Zustand store for chat state and socket connection

## Responsibilities

- Real-time messaging via Socket.IO
- Chat list management
- Message sending/receiving
- Read receipts
- Typing indicators
- Message payment flow (for males)
- Auto-message handling

