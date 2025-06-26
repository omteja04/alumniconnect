
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'alumni' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  console.log('ProtectedRoute - Loading:', loading, 'User:', user?.id, 'Role:', user?.role, 'Required:', requiredRole);

  // Show loading while auth is being determined
  if (loading) {
    console.log('ProtectedRoute - Showing loading screen');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if not authenticated
  if (!user) {
    console.log('ProtectedRoute - No user, redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Check role requirement
  if (requiredRole && user.role !== requiredRole) {
    console.log(`ProtectedRoute - Role mismatch. Required: ${requiredRole}, User has: ${user.role}`);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute - Access granted');
  return <>{children}</>;
};
