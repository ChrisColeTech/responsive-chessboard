// Authentication store - manages user authentication state and actions
import { create } from 'zustand';
import type { User, LoginCredentials } from '@/types';
import { ChessTrainingAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { AUTH_STORAGE_KEYS, DEMO_USER_CREDENTIALS } from '@/constants';

interface AuthState {
  // State
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  loginDemo: () => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
}

const apiClient = new ChessTrainingAPIClient(httpClient);

export const useAuthStore = create<AuthState>((set, get) => ({
  // State
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN),
  isLoading: false,
  error: null,

  // Actions
  login: async (credentials: LoginCredentials) => {
    try {
      set({ isLoading: true, error: null });

      const result = await apiClient.authenticateUser(credentials);
      
      // Store tokens
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, result.token);
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, result.refreshToken);
      
      // Update state
      set({
        isAuthenticated: true,
        user: result.user,
        token: result.token,
        isLoading: false
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      set({ isLoading: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  },

  loginDemo: async () => {
    const { login } = get();
    return login({
      email: DEMO_USER_CREDENTIALS.EMAIL,
      password: DEMO_USER_CREDENTIALS.PASSWORD
    });
  },

  logout: () => {
    // Clear tokens
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    
    // Reset state
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      error: null
    });
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN);
      if (!refreshToken) return false;

      const result = await apiClient.refreshToken(refreshToken);
      
      // Update tokens
      localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, result.token);
      localStorage.setItem(AUTH_STORAGE_KEYS.REFRESH_TOKEN, result.refreshToken);
      
      // Update state
      set({ token: result.token });
      
      return true;
    } catch {
      get().logout();
      return false;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  checkAuthStatus: async () => {
    const { token, logout } = get();
    
    if (!token) {
      set({ isAuthenticated: false });
      return;
    }

    try {
      set({ isLoading: true });

      const user = await apiClient.getCurrentUser();
      set({
        isAuthenticated: true,
        user,
        isLoading: false
      });
    } catch {
      // Token is invalid
      logout();
    }
  }
}));

// Export type for components to use
export type { AuthState };