/**
 * Admin Service - User Management Logic
 * @owner: Sujal
 */

import User from '../../models/User.js';
import relationshipManager from '../../core/relationships/relationshipManager.js';
import { NotFoundError, BadRequestError } from '../../utils/errors.js';

/**
 * Get pending female approvals
 */
export const getPendingFemales = async (pagination = {}, status = 'pending') => {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const users = await User.find({
        role: 'female',
        approvalStatus: status
    })
        .select('phoneNumber profile verificationDocuments createdAt approvalStatus')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments({
        role: 'female',
        approvalStatus: status
    });

    return { users, total, page, totalPages: Math.ceil(total / limit) };
};

/**
 * Approve a female user
 */
export const approveFemale = async (userId, adminId) => {
    // Use relationship manager for consistent update (handles user status + notifications)
    try {
        const user = await relationshipManager.handleFemaleApproval(userId, adminId);
        return user;
    } catch (error) {
        if (error.message.includes('Invalid user')) {
            throw new BadRequestError(error.message);
        }
        throw error;
    }
};

/**
 * Reject a female user
 */
export const rejectFemale = async (userId, adminId, reason) => {
    const user = await User.findById(userId);

    if (!user || user.role !== 'female') {
        throw new NotFoundError('Female user not found');
    }

    if (user.approvalStatus !== 'pending') {
        throw new BadRequestError('User is not in pending state');
    }

    user.approvalStatus = 'rejected';
    user.approvalReviewedBy = adminId;
    user.approvalReviewedAt = new Date();
    user.rejectionReason = reason;

    await user.save();
    return user;
};

/**
 * Request resubmission of verification document
 */
export const requestResubmitFemale = async (userId, adminId, reason) => {
    const user = await User.findById(userId);

    if (!user || user.role !== 'female') {
        throw new NotFoundError('Female user not found');
    }

    if (user.approvalStatus !== 'pending') {
        throw new BadRequestError('User is not in pending state');
    }

    user.approvalStatus = 'resubmit_requested';
    user.approvalReviewedBy = adminId;
    user.approvalReviewedAt = new Date();
    user.rejectionReason = reason;

    await user.save();
    return user;
};
