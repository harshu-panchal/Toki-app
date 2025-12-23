import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = () => {
    const token = localStorage.getItem('matchmint_auth_token');
    return {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
};

export const getDashboardStats = async () => {
    const response = await axios.get(`${API_URL}/admin/dashboard/stats`, getHeaders());
    return response.data.data;
};

export const listUsers = async (filters: any = {}, page = 1, limit = 20) => {
    const params = { ...filters, page, limit };
    const response = await axios.get(`${API_URL}/admin/users`, { ...getHeaders(), params });
    return response.data.data;
};

export const listTransactions = async (filters: any = {}, page = 1, limit = 20) => {
    const params = { ...filters, page, limit };
    const response = await axios.get(`${API_URL}/admin/transactions`, { ...getHeaders(), params });
    return response.data.data;
};

export const getAuditLogs = async (filters: any = {}, page = 1, limit = 50) => {
    const params = { ...filters, page, limit };
    const response = await axios.get(`${API_URL}/admin/audit-logs`, { ...getHeaders(), params });
    return response.data.data;
};

export const getAppSettings = async () => {
    const response = await axios.get(`${API_URL}/admin/settings`, getHeaders());
    return response.data.data.settings;
};

export const updateAppSettings = async (settings: any) => {
    const response = await axios.patch(`${API_URL}/admin/settings`, settings, getHeaders());
    return response.data.data.settings;
};

export const listGifts = async () => {
    const response = await axios.get(`${API_URL}/admin/gifts`, getHeaders());
    return response.data.data.gifts;
};

export const updateGiftCost = async (giftId: string, cost: number) => {
    const response = await axios.patch(`${API_URL}/admin/gifts/${giftId}/cost`, { cost }, getHeaders());
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
