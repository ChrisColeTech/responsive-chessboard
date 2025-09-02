// Authentication hooks - provide auth state and actions to components
import { useAuthStore } from '@/stores/authStore';
import { useEffect } from 'react';

/**
 * Main authentication hook - provides auth state and core actions
 */
export const useAuth = () => {
  const authState = useAuthStore();

  // Check auth status on mount
  useEffect(() => {
    authState.checkAuthStatus();
  }, []);

  return {
    // State
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    token: authState.token,
    isLoading: authState.isLoading,
    error: authState.error,
    
    // Actions
    login: authState.login,
    loginDemo: authState.loginDemo,
    logout: authState.logout,
    refreshToken: authState.refreshToken,
    clearError: authState.clearError,
    checkAuthStatus: authState.checkAuthStatus
  };
};

/**
 * Login hook - focused on login functionality
 */
export const useLogin = () => {
  const { login, loginDemo, isLoading, error, clearError } = useAuthStore();

  return {
    login,
    loginDemo,
    isLoading,
    error,
    clearError
  };
};

/**
 * User hook - provides user information
 */
export const useUser = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  return {
    user,
    isAuthenticated,
    logout
  };
};

/**
 * Demo login hook - specifically for demo user functionality
 */
export const useDemoLogin = () => {
  const { loginDemo, isLoading, error, isAuthenticated } = useAuthStore();

  const handleDemoLogin = async () => {
    const result = await loginDemo();
    return result;
  };

  return {
    loginDemo: handleDemoLogin,
    isLoading,
    error,
    isAuthenticated
  };
};

/**
 * Auth guard hook - for protecting routes
 */
export const useAuthGuard = (redirectTo: string = '/login') => {
  const { isAuthenticated, isLoading, user } = useAuthStore();

  const isAuthorized = isAuthenticated && user;
  const shouldRedirect = !isLoading && !isAuthorized;

  return {
    isAuthorized,
    shouldRedirect,
    redirectTo,
    isLoading,
    user
  };
};