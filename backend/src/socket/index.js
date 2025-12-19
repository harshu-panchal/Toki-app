/**
 * Socket.IO Setup and Event Handlers
 * @owner: Harsh (Chat Domain)
 * @purpose: Initialize Socket.IO and handle real-time chat events
 */

import logger from '../utils/logger.js';
import { authenticateSocket, setupChatHandlers } from './chatHandlers.js';

/**
 * Setup Socket.IO handlers
 * @param {Server} io - Socket.IO server instance
 */
export const setupSocketIO = (io) => {
  // Authentication middleware for Socket.IO
  io.use(authenticateSocket);

  // Setup chat handlers
  setupChatHandlers(io);

  logger.info('✅ Socket.IO handlers initialized');
};

// Export helper functions for emitting events
export { emitBalanceUpdate, emitNewMessage } from './chatHandlers.js';
