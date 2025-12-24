import apiClient from '../api/client';

export const getDashboardStats = async () => {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data.data;
};

export const listUsers = async (filters: any = {}, page = 1, limit = 20) => {
    const response = await apiClient.get('/admin/users', { params: { ...filters, page, limit } });
    return response.data.data;
};

export const listTransactions = async (filters: any = {}, page = 1, limit = 20) => {
    const response = await apiClient.get('/admin/transactions', { params: { ...filters, page, limit } });
    return response.data.data;
};

export const getAuditLogs = async (filters: any = {}, page = 1, limit = 50) => {
    const response = await apiClient.get('/admin/audit-logs', { params: { ...filters, page, limit } });
    return response.data.data;
};

export const getAppSettings = async () => {
    const response = await apiClient.get('/admin/settings');
    return response.data.data.settings;
};

export const updateAppSettings = async (settings: any) => {
    const response = await apiClient.patch('/admin/settings', settings);
    return response.data.data.settings;
};

export const listGifts = async () => {
    const response = await apiClient.get('/admin/gifts');
    return response.data.data.gifts;
};

export const updateGiftCost = async (giftId: string, cost: number) => {
    const response = await apiClient.patch(`/admin/gifts/${giftId}/cost`, { cost });
    return response.data.data.gift;
};

export const adminService = {
    getDashboardStats,
    listUsers,
    listTransactions,
    getAuditLogs,
    getAppSettings,
    updateAppSettings,
    listGifts,
    updateGiftCost
};

export default adminService;
