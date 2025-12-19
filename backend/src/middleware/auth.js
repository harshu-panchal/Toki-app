/**
 * Authentication Middleware
 * @owner: Sujal (Shared - Both review)
 * @purpose: JWT authentication and authorization
 */

import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../utils/errors.js';
import User from '../models/User.js';
import { getEnvConfig } from '../config/env.js';

const { jwtSecret } = getEnvConfig();

/**
 * Protect routes - require authentication
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new UnauthorizedError('You are not logged in. Please log in to get access.'));
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (error) {
      return next(new UnauthorizedError('Invalid token. Please log in again.'));
    }

    // Get user from token
    const user = await User.findById(decoded.id).select('+password');

    if (!user) {
      return next(new UnauthorizedError('The user belonging to this token no longer exists.'));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(new UnauthorizedError('Your account has been deactivated.'));
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return next(new ForbiddenError('Your account has been blocked.'));
    }

    // Check if password changed after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(new UnauthorizedError('User recently changed password. Please log in again.'));
    }

    // Grant access to protected route
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Restrict to specific roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ForbiddenError('You do not have permission to perform this action.')
      );
    }
    next();
  };
};

/**
 * Check if user is verified (for female users)
 */
export const requireVerification = (req, res, next) => {
  if (req.user.role === 'female' && !req.user.isVerified) {
    return next(new ForbiddenError('Your account is pending verification.'));
  }
  next();
};

/**
 * Check if female user is approved
 */
export const requireApproval = (req, res, next) => {
  if (req.user.role === 'female' && req.user.approvalStatus !== 'approved') {
    return next(
      new ForbiddenError('Your account is pending admin approval.')
    );
  }
  next();
};

