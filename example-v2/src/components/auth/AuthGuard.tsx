// SRP: Renders children if authenticated, otherwise shows fallback or redirects
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthGuardProps } from '@/types/auth/auth.types';
import { useAuthGuard } from '@/hooks/layout/useAuthGuard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback,
  redirectTo = '/login',
}) => {
  const { isAuthenticated, isLoading } = useAuthGuard();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show fallback or redirect
  if (!isAuthenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // For Phase 9.4, show a nice login prompt instead of immediate redirect
    return (
      <Card className="max-w-md mx-auto mt-8">
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access this feature.
          </p>
          <Button
            variant="primary"
            onClick={() => window.location.href = `${redirectTo}?returnTo=${encodeURIComponent(location.pathname)}`}
          >
            Sign In to Continue
          </Button>
        </div>
      </Card>
    );
  }

  // User is authenticated, render children
  return <>{children}</>;
};