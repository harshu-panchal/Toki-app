import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to appropriate login based on requested path
        if (location.pathname.startsWith('/admin')) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        }
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Role mismatch - redirect to their dashboard or unauthorized
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'female') return <Navigate to="/female/dashboard" replace />;
        return <Navigate to="/male/dashboard" replace />;
    }

    // Enforce mandatory location setting for male/female users (but NOT during onboarding or verification)
    if (isAuthenticated && user && (user.role === 'male' || user.role === 'female')) {
        const hasLocation = user.location && user.location.trim() !== '';
        // Note: coordinates might be 0,0 but usually 0,0 is "not set" in our logic (missing)
        const hasCoordinates = user.latitude !== undefined && user.longitude !== undefined &&
            (user.latitude !== 0 || user.longitude !== 0);

        if (!hasLocation || !hasCoordinates) {
            const dashboardPath = user.role === 'male' ? '/male/dashboard' : '/female/dashboard';

            // Allow onboarding and verification screens
            const isOnboarding = location.pathname.startsWith('/onboarding') ||
                location.pathname === '/verification-pending';

            // Only redirect if not already on the dashboard or onboarding
            if (location.pathname !== dashboardPath && !isOnboarding) {
                return <Navigate to={dashboardPath} replace />;
            }
        }
    }

    return <Outlet />;
};
