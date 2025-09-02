// SRP: Provides auth state to components only
import { useAuthStore } from '@/stores/authStore';

interface UseAuthGuardReturn {
  readonly isAuthenticated: boolean;
  readonly user: any;
  readonly isLoading: boolean;
  readonly login: (credentials?: any) => void;
  readonly logout: () => void;
}

export const useAuthGuard = (): UseAuthGuardReturn => {
  const { 
    isAuthenticated, 
    user, 
    isLoading,
    login,
    logout 
  } = useAuthStore();

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};