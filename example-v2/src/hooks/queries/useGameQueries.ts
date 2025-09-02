// React Query hooks for game-related server data
// Following SRP - only handles game data queries, no business logic
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ChessTrainingAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { useAuthStore } from '@/stores/authStore';
import type { GameHistoryResponse, GameStatsResponse, GameDetails } from '@/types';

// Query keys for cache management and invalidation
export const gameQueryKeys = {
  all: ['games'] as const,
  history: () => [...gameQueryKeys.all, 'history'] as const,
  stats: () => [...gameQueryKeys.all, 'stats'] as const,
  detail: (gameId: string) => [...gameQueryKeys.all, 'detail', gameId] as const,
} as const;

// Initialize API client
const apiClient = new ChessTrainingAPIClient(httpClient);

/**
 * Hook to fetch user's game history
 * Includes pagination and filtering options
 */
export const useGameHistory = (options?: {
  limit?: number;
  status?: 'completed' | 'ongoing' | 'all';
}): UseQueryResult<GameHistoryResponse, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: [...gameQueryKeys.history(), options],
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      return await apiClient.getGameHistory(options?.limit ?? 10);
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to fetch user's game statistics
 * Includes wins, losses, draws, rating, etc.
 */
export const useGameStats = (): UseQueryResult<GameStatsResponse, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: gameQueryKeys.stats(),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      return await apiClient.getDashboardStats();
    },
    enabled: !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes - stats change less frequently
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to fetch detailed information about a specific game
 * Uses the games/:gameId endpoint for full game details
 */
export const useGameDetails = (gameId: string | undefined): UseQueryResult<GameDetails, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: gameQueryKeys.detail(gameId || ''),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      if (!gameId) throw new Error('Game ID is required');
      return await apiClient.getGameDetails(gameId);
    },
    enabled: !!token && !!gameId,
    staleTime: 15 * 60 * 1000, // 15 minutes - game details are historical
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to fetch recent games for dashboard display
 * Pre-configured with sensible defaults for dashboard use
 */
export const useRecentGames = (): UseQueryResult<GameHistoryResponse, Error> => {
  return useGameHistory({ 
    limit: 5, 
    status: 'completed' 
  });
};