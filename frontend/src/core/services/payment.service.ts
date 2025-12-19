/**
 * Payment Service - Frontend API Client for Razorpay Payments
 * @purpose: Handle coin purchase flow with Razorpay integration
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('matchmint_auth_token');
    return {
        Authorization: `Bearer ${token}`,
    };
};

// Razorpay Key ID (public key, safe to expose)
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

/**
 * Load Razorpay SDK script dynamically
 */
export const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if ((window as any).Razorpay) {
            resolve(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

/**
 * Create a Razorpay order for coin purchase
 */
export const createOrder = async (planId: string) => {
    const response = await axios.post(
        `${API_URL}/payment/create-order`,
        { planId },
        { headers: getAuthHeaders() }
    );
    return response.data.data;
};

/**
 * Verify payment after Razorpay checkout
 */
export const verifyPayment = async (data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    transactionId: string;
}) => {
    const response = await axios.post(
        `${API_URL}/payment/verify`,
        data,
        { headers: getAuthHeaders() }
    );
    return response.data.data;
};

/**
 * Get payment/purchase history
 */
export const getPaymentHistory = async (params?: {
    page?: number;
    limit?: number;
}) => {
    const response = await axios.get(`${API_URL}/payment/history`, {
        headers: getAuthHeaders(),
        params,
    });
    return response.data.data;
};

/**
 * Complete payment flow with Razorpay checkout
 * @param planId - The coin plan ID to purchase
 * @param userInfo - User info for Razorpay prefill
 * @returns Promise with payment result
 */
export const initiatePayment = async (
    planId: string,
    userInfo: {
        name?: string;
        email?: string;
        phone?: string;
    } = {}
): Promise<{
    success: boolean;
    message: string;
    coinsAdded?: number;
    newBalance?: number;
    error?: string;
}> => {
    try {
        // Step 1: Load Razorpay SDK
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
            return {
                success: false,
                message: 'Failed to load payment gateway',
                error: 'SCRIPT_LOAD_FAILED',
            };
        }

        // Step 2: Create order on backend
        const orderData = await createOrder(planId);

        // Step 3: Open Razorpay checkout
        return new Promise((resolve) => {
            const options = {
                key: orderData.keyId || RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'MatchMint',
                description: `Purchase ${orderData.plan.coins} Coins`,
                order_id: orderData.orderId,
                prefill: {
                    name: userInfo.name || '',
                    email: userInfo.email || '',
                    contact: userInfo.phone || '',
                },
                theme: {
                    color: '#F5A623', // Primary color
                },
                handler: async (response: any) => {
                    try {
                        // Step 4: Verify payment on backend
                        const result = await verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            transactionId: orderData.transactionId,
                        });

                        resolve({
                            success: true,
                            message: result.message,
                            coinsAdded: result.coinsAdded,
                            newBalance: result.newBalance,
                        });
                    } catch (error: any) {
                        resolve({
                            success: false,
                            message: 'Payment verification failed',
                            error: error.response?.data?.message || error.message,
                        });
                    }
                },
                modal: {
                    ondismiss: () => {
                        resolve({
                            success: false,
                            message: 'Payment cancelled',
                            error: 'USER_CANCELLED',
                        });
                    },
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        });
    } catch (error: any) {
        return {
            success: false,
            message: 'Failed to initiate payment',
            error: error.response?.data?.message || error.message,
        };
    }
};

export default {
    loadRazorpayScript,
    createOrder,
    verifyPayment,
    getPaymentHistory,
    initiatePayment,
};
