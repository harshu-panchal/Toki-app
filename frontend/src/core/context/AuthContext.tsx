
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types/global';
import {
    getAuthToken,
    getUser,
    setAuthToken,
    setUser as setStorageUser,
    clearAuth,
    fetchUserProfile,
} from '../utils/auth';

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: UserProfile) => void;
    logout: () => void;
    updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Initialize from local storage
        // Initialize from local storage
        const initAuth = async () => {
            const storedToken = getAuthToken();
            const storedUser = getUser();

            if (storedToken) {
                setToken(storedToken);
                // Optimistically set user from storage
                if (storedUser) {
                    setUserState(storedUser);
                    setIsAuthenticated(true);
                }

                try {
                    const user = await fetchUserProfile();
                    console.log('Fetched profile from backend:', user);
                    const profile: UserProfile = {
                        id: user._id || user.id,
                        phoneNumber: user.phoneNumber,
                        role: user.role,
                        name: user.profile?.name || 'User',
                        avatarUrl: user.profile?.photos?.find((p: any) => p.isPrimary)?.url || user.profile?.photos?.[0]?.url || '',
                        photos: user.profile?.photos?.map((p: any) => p.url) || [],
                        age: user.profile?.age,
                        bio: user.profile?.bio,
                        city: user.profile?.location?.city,
                        location: user.profile?.location ? `${user.profile.location.city || ''}, ${user.profile.location.country || ''}`.replace(/^, |, $/g, '') : undefined,
                        interests: user.profile?.interests || [],
                        occupation: user.profile?.occupation,
                        isVerified: user.isVerified,
                        approvalStatus: user.approvalStatus,
                        rejectionReason: user.rejectionReason,
                    };
                    setUserState(profile);
                    setStorageUser(profile);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Failed to refresh profile', error);
                    // Optional: If error is 401, clear auth
                }
            } else {
                clearAuth();
                setToken(null);
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (newToken: string, newUser: UserProfile) => {
        setAuthToken(newToken);
        setStorageUser(newUser);
        setToken(newToken);
        setUserState(newUser);
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearAuth();
        setToken(null);
        setUserState(null);
        setIsAuthenticated(false);
    };

    const updateUser = (updates: Partial<UserProfile>) => {
        setUserState((prev) => {
            if (!prev) return null;
            const updated = { ...prev, ...updates };
            setStorageUser(updated);
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
