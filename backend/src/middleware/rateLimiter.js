/**
 * Rate Limiting Middleware
 * @owner: Sujal (Shared - Both review)
 * @purpose: Prevent abuse and DDoS attacks
 */

import rateLimit from 'express-rate-limit';
import { getEnvConfig } from '../config/env.js';

const { rateLimitWindowMs, rateLimitMaxRequests } = getEnvConfig();

/**
 * General API rate limiter
 */
export const apiLimiter = rateLimit({
  windowMs: rateLimitWindowMs, // 15 minutes
  max: rateLimitMaxRequests, // 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Strict rate limiter for auth endpoints
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts, please try again after 15 minutes.',
  skipSuccessfulRequests: true,
});

/**
 * Rate limiter for message sending (prevent spam)
 */
export const messageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 messages per minute
  message: 'Too many messages sent, please slow down.',
  keyGenerator: (req) => {
    return req.userId?.toString() || req.ip;
  },
});

