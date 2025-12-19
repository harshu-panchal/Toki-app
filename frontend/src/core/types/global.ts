export type UserRole = 'male' | 'female' | 'admin';

export interface UserProfile {
  id: string;
  phoneNumber: string;
  role: UserRole;
  name?: string;
  avatarUrl?: string; // Primary photo
  photos?: string[]; // All photos
  age?: number;
  bio?: string;
  location?: string;
  city?: string;
  interests?: string[];
  occupation?: string;
  isVerified: boolean;
  approvalStatus?: 'pending' | 'approved' | 'rejected' | 'resubmit_requested' | 'banned';
  rejectionReason?: string;
  coinBalance?: number;
  memberTier?: 'basic' | 'silver' | 'gold' | 'platinum';
}

export interface WalletState {
  balance: number;
  isVip: boolean;
  currency: string;
}

export interface UnreadCounts {
  messages: number;
  notifications: number;
}

export interface GlobalState {
  user: UserProfile | null;
  wallet: WalletState;
  counts: UnreadCounts;
  isAuthenticated: boolean;
  isSocketConnected: boolean;
  isLoading: boolean;
}

// Socket Event Payloads
export interface BalanceUpdatePayload {
  newBalance: number;
  delta: number;
  reason: 'message_sent' | 'gift_sent' | 'call_spent' | 'deposit' | 'withdrawal' | 'bonus' | 'message_earned' | 'gift_earned' | 'call_earned';
  timestamp: string;
}

export interface NotificationPayload {
  id: string;
  type: string;
  title: string;
  message: string;
  data?: any;
}
