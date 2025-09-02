// React Query hooks for puzzle-related server data
// Following SRP - only handles puzzle data queries, no business logic
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { PuzzleAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { useAuthStore } from '@/stores/authStore';
import type { PuzzleData, PuzzleStatsResponse, PuzzleTheme } from '@/types';

// Query keys for cache management and invalidation
export const puzzleQueryKeys = {
  all: ['puzzles'] as const,
  next: () => [...puzzleQueryKeys.all, 'next'] as const,
  stats: () => [...puzzleQueryKeys.all, 'stats'] as const,
  themes: () => [...puzzleQueryKeys.all, 'themes'] as const,
  byTheme: (theme: string) => [...puzzleQueryKeys.all, 'theme', theme] as const,
} as const;

// Initialize API client
const apiClient = new PuzzleAPIClient(httpClient);

/**
 * Hook to fetch the next personalized puzzle for the user
 * Automatically selects puzzle based on user rating and preferences
 */
export const useNextPuzzle = (): UseQueryResult<PuzzleData, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: puzzleQueryKeys.next(),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      return await apiClient.getNextPuzzle();
    },
    enabled: !!token,
    staleTime: 0, // Always get fresh puzzle
    refetchOnMount: true, // Always refetch when component mounts
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to fetch user's puzzle statistics
 * Includes solved count, accuracy, rating progression, etc.
 */
export const usePuzzleStats = (): UseQueryResult<PuzzleStatsResponse, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: puzzleQueryKeys.stats(),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      return await apiClient.getPuzzleStats();
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to fetch available puzzle themes/categories
 * Themes like 'tactics', 'endgame', 'opening', etc.
 */
export const usePuzzleThemes = (): UseQueryResult<PuzzleTheme[], Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: puzzleQueryKeys.themes(),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      // Return static themes based on backend categories
      const themes: PuzzleTheme[] = [
        { id: 'tactics', name: 'Tactics', description: 'Tactical combinations and patterns', puzzleCount: 0 },
        { id: 'endgame', name: 'Endgame', description: 'Endgame theory and technique', puzzleCount: 0 },
        { id: 'opening', name: 'Opening', description: 'Opening principles and traps', puzzleCount: 0 },
        { id: 'middlegame', name: 'Middlegame', description: 'Middlegame strategy and planning', puzzleCount: 0 },
        { id: 'checkmate', name: 'Checkmate', description: 'Checkmate patterns and combinations', puzzleCount: 0 },
      ];
      return themes;
    },
    enabled: !!token,
    staleTime: 30 * 60 * 1000, // 30 minutes - themes rarely change
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to fetch puzzles by specific theme/category
 * Uses the backend's category endpoint
 */
export const usePuzzlesByTheme = (theme: string | undefined): UseQueryResult<PuzzleData[], Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: puzzleQueryKeys.byTheme(theme || ''),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      if (!theme) throw new Error('Theme is required');
      return await apiClient.getPuzzlesByCategory(theme);
    },
    enabled: !!token && !!theme,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false
  });
};

/**
 * Hook specifically for puzzle demo page
 * Pre-configured for demo use case
 */
export const useDemoPuzzle = (): UseQueryResult<PuzzleData, Error> => {
  return useNextPuzzle();
};