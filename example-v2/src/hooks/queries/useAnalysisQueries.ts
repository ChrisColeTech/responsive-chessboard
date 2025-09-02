// React Query hooks for chess analysis and position evaluation
// Following SRP - only handles analysis data queries, no business logic
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ChessTrainingAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { useAuthStore } from '@/stores/authStore';
import type { 
  PositionAnalysis, 
  OpeningInfo, 
  BestMoveResponse,
  AnalysisRequest 
} from '@/types';

// Query keys for cache management and invalidation
export const analysisQueryKeys = {
  all: ['analysis'] as const,
  position: (fen: string) => [...analysisQueryKeys.all, 'position', fen] as const,
  bestMove: (fen: string) => [...analysisQueryKeys.all, 'best-move', fen] as const,
  opening: (moves: string[]) => [...analysisQueryKeys.all, 'opening', moves.join('-')] as const,
} as const;

// Initialize API client
const apiClient = new ChessTrainingAPIClient(httpClient);

/**
 * Hook to get Stockfish analysis for a chess position
 * Provides evaluation, best moves, and principal variation
 */
export const usePositionAnalysis = (
  fen: string | undefined,
  options?: {
    depth?: number;
    multiPv?: number;
  }
): UseQueryResult<PositionAnalysis, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: [...analysisQueryKeys.position(fen || ''), options],
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      if (!fen) throw new Error('FEN string is required');
      
      const analysisRequest: AnalysisRequest = {
        fen,
        depth: options?.depth ?? 15,
        multiPv: options?.multiPv ?? 3
      };
      
      return await apiClient.analyzePosition(analysisRequest);
    },
    enabled: !!token && !!fen,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - position analysis doesn't change
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to get the best move recommendation for a position
 * Optimized for quick move suggestions during gameplay
 */
export const useBestMove = (
  fen: string | undefined,
  depth?: number
): UseQueryResult<BestMoveResponse, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: [...analysisQueryKeys.bestMove(fen || ''), { depth }],
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      if (!fen) throw new Error('FEN string is required');
      
      return await apiClient.getBestMove(fen, depth ?? 12);
    },
    enabled: !!token && !!fen,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - best move doesn't change
    refetchOnWindowFocus: false
  });
};

/**
 * Hook to identify chess opening from move sequence
 * Provides opening name, ECO code, and common continuations
 */
export const useOpeningIdentification = (
  moves: string[] | undefined
): UseQueryResult<OpeningInfo, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: analysisQueryKeys.opening(moves || []),
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      if (!moves || moves.length === 0) throw new Error('Moves are required');
      
      return await apiClient.identifyOpening(moves);
    },
    enabled: !!token && !!moves && moves.length > 0,
    staleTime: 30 * 60 * 1000, // 30 minutes - opening info rarely changes
    refetchOnWindowFocus: false
  });
};

/**
 * Hook for cached analysis lookup
 * Checks if analysis already exists before requesting new computation
 */
export const useCachedAnalysis = (
  fen: string | undefined
): UseQueryResult<PositionAnalysis | null, Error> => {
  const { token } = useAuthStore();
  
  return useQuery({
    queryKey: [...analysisQueryKeys.position(fen || ''), 'cached'],
    queryFn: async () => {
      if (!token) throw new Error('Not authenticated');
      if (!fen) throw new Error('FEN string is required');
      
      return await apiClient.getCachedAnalysis(fen);
    },
    enabled: !!token && !!fen,
    staleTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false
  });
};