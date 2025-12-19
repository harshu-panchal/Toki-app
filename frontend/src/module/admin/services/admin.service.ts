import axios from 'axios';
import type { FemaleApproval } from '../types/admin.types';
import { getAuthToken } from '../../../core/utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = (token?: string) => ({
    headers: {
        Authorization: `Bearer ${token || getAuthToken()}`
    }
});

export const getPendingFemales = async (status = 'pending', page = 1, limit = 20, token?: string): Promise<{ users: FemaleApproval[], total: number }> => {
    const response = await axios.get(`${API_URL}/admin/females/pending?status=${status}&page=${page}&limit=${limit}`, getAuthHeader(token));

    // Transform backend user format to FemaleApproval format
    const users = response.data.data.users.map((u: any) => ({
        userId: u._id,
        user: {
            id: u._id,
            phoneNumber: u.phoneNumber,
            name: u.profile.name,
            role: u.role,
            isBlocked: u.isBlocked,
            isVerified: u.isVerified,
            createdAt: u.createdAt,
            lastLoginAt: u.lastSeen // Using lastSeen as lastLoginAt for now
        },
        profile: {
            age: u.profile.age,
            city: u.profile.location?.city || '',
            bio: u.profile.bio || '',
            photos: u.profile.photos?.map((p: any) => p.url) || [],
            location: u.profile.location?.coordinates ? {
                lat: u.profile.location.coordinates[1],
                lng: u.profile.location.coordinates[0]
            } : undefined
        },
        verificationDocuments: u.verificationDocuments,
        approvalStatus: u.approvalStatus,
        submittedAt: u.createdAt
    }));

    return { users, total: response.data.data.total };
};

export const approveFemale = async (userId: string) => {
    const response = await axios.patch(`${API_URL}/admin/females/${userId}/approve`, {}, getAuthHeader());
    return response.data;
};

export const rejectFemale = async (userId: string, reason: string) => {
    const response = await axios.patch(`${API_URL}/admin/females/${userId}/reject`, { reason }, getAuthHeader());
    return response.data;
};

export const requestResubmit = async (userId: string, reason: string) => {
    const response = await axios.patch(`${API_URL}/admin/females/${userId}/request-resubmit`, { reason }, getAuthHeader());
    return response.data;
};
