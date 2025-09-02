// React Query mutations for authentication operations
// Following SRP - handles auth mutations with store integration
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { ChessTrainingAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/providers';
import type { 
  LoginCredentials, 
  AuthResult,
  RefreshTokenRequest,
  UpdateProfileRequest,
  ChangePasswordRequest
} from '@/types';

// Initialize API client
const apiClient = new ChessTrainingAPIClient(httpClient);

/**
 * Mutation for user login
 * Integrates with auth store for state management
 */
export const useLogin = (): UseMutationResult<
  { success: boolean; error?: string },
  Error,
  LoginCredentials
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return await login(credentials);
    },
    onSuccess: (result) => {
      if (result.success) {
        // Clear all cached data from previous session
        queryClient.clear();

        // Get current user from store for success message
        const { user } = useAuthStore.getState();
        addToast({
          type: 'success',
          title: 'Login Successful',
          message: `Welcome back, ${user?.username || 'user'}!`,
        });
      }
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Login Failed',
        message: error.message || 'Invalid credentials',
      });
    }
  });
};

/**
 * Mutation for demo user login
 * Pre-configured credentials for demonstration
 */
export const useDemoLogin = (): UseMutationResult<
  AuthResult,
  Error,
  void
> => {
  const { loginDemo } = useAuthStore();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const result = await loginDemo();
      if (!result.success) {
        throw new Error(result.error);
      }
      // Return a dummy AuthResult since loginDemo doesn't return the full result
      return { success: true, user: { id: 'demo', username: 'Demo User' } } as AuthResult;
    },
    onSuccess: () => {
      // Clear all cached data from previous session
      queryClient.clear();

      addToast({
        type: 'success',
        title: 'Demo Login',
        message: 'Logged in as demo user',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Demo Login Failed',
        message: error.message || 'Unable to login as demo user',
      });
    }
  });
};

/**
 * Mutation for user logout
 * Clears all cached data and auth state
 */
export const useLogout = (): UseMutationResult<
  void,
  Error,
  void
> => {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      // Logout from auth store (clears tokens)
      logout();
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();

      addToast({
        type: 'info',
        title: 'Logged Out',
        message: 'You have been successfully logged out',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Logout Error',
        message: error.message || 'Error during logout',
      });
    }
  });
};

/**
 * Mutation for refreshing authentication token
 * Used automatically by auth store but can be triggered manually
 */
export const useRefreshToken = (): UseMutationResult<
  boolean,
  Error,
  void
> => {
  const { refreshToken } = useAuthStore();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const success = await refreshToken();
      if (!success) {
        throw new Error('Token refresh failed');
      }
      return success;
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Session Expired',
        message: 'Please log in again',
      });
    }
  });
};

/**
 * Mutation to update user profile
 * Updates user information like display name, preferences, etc.
 */
export const useUpdateProfile = (): UseMutationResult<
  void,
  Error,
  UpdateProfileRequest
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (profileUpdate: UpdateProfileRequest) => {
      await apiClient.updateProfile(profileUpdate);
    },
    onSuccess: () => {
      // Invalidate user data to refresh profile
      queryClient.invalidateQueries({ queryKey: ['user'] });

      addToast({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been updated successfully',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: error.message || 'Unable to update profile',
      });
    }
  });
};

/**
 * Mutation to change user password
 * Requires current password for security
 */
export const useChangePassword = (): UseMutationResult<
  void,
  Error,
  ChangePasswordRequest
> => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (passwordChange: ChangePasswordRequest) => {
      await apiClient.changePassword(passwordChange);
    },
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Password Changed',
        message: 'Your password has been updated successfully',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Password Change Failed',
        message: error.message || 'Unable to change password',
      });
    }
  });
};