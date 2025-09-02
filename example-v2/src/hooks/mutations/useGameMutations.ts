// React Query mutations for game operations
// Following SRP - handles game mutations with optimistic updates
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { ChessTrainingAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { useToast } from '@/providers';
import { gameQueryKeys } from '@/hooks/queries';
import type { 
  GameConfig, 
  GameResult, 
  ChessMove, 
  MoveResult,
  GameEndRequest,
  GameEndResult 
} from '@/types';

// Initialize API client
const apiClient = new ChessTrainingAPIClient(httpClient);

/**
 * Mutation to create a new game against AI
 * Includes optimistic update to game list
 */
export const useCreateGame = (): UseMutationResult<
  GameResult, 
  Error, 
  GameConfig
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (config: GameConfig) => {
      return await apiClient.createGame(config);
    },
    onSuccess: (newGame) => {
      // Invalidate game history to include new game
      queryClient.invalidateQueries({ queryKey: gameQueryKeys.history() });
      queryClient.invalidateQueries({ queryKey: gameQueryKeys.stats() });

      addToast({
        type: 'success',
        title: 'Game Created',
        message: `New game started against AI level ${newGame.aiLevel}`,
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Failed to Create Game',
        message: error.message || 'Unable to start new game',
      });
    }
  });
};

/**
 * Mutation to submit a move in an active game
 * Includes optimistic updates for responsive UI
 */
export const useSubmitMove = (gameId: string): UseMutationResult<
  MoveResult,
  Error,
  { move: ChessMove; timeSpent?: number }
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ move, timeSpent }: { move: ChessMove; timeSpent?: number }) => {
      return await apiClient.submitMove(gameId, { ...move, timeSpent });
    },
    onMutate: async ({ move }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: gameQueryKeys.detail(gameId) });

      // Optimistically update the game state
      const previousGame = queryClient.getQueryData(gameQueryKeys.detail(gameId));
      
      if (previousGame) {
        queryClient.setQueryData(gameQueryKeys.detail(gameId), {
          ...previousGame,
          // Add optimistic move to history (will be replaced by server response)
          moves: [...(previousGame as any).moves, move],
          isPlayerTurn: false, // Player just moved, so now it's AI's turn
        });
      }

      return { previousGame };
    },
    onSuccess: (moveResult) => {
      // Update game details with server response
      queryClient.setQueryData(gameQueryKeys.detail(gameId), moveResult);
      
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: gameQueryKeys.history() });
      
      if (moveResult.gameStatus === 'checkmate' || moveResult.gameStatus === 'stalemate' || moveResult.gameStatus === 'draw' || moveResult.gameStatus === 'timeout') {
        queryClient.invalidateQueries({ queryKey: gameQueryKeys.stats() });
        
        addToast({
          type: 'info',
          title: 'Game Complete',
          message: `Game ended: ${moveResult.gameStatus}`,
        });
      }
    },
    onError: (error, variables, context) => {
      // Revert optimistic update
      if (context?.previousGame) {
        queryClient.setQueryData(gameQueryKeys.detail(gameId), context.previousGame);
      }

      addToast({
        type: 'error',
        title: 'Move Failed',
        message: error.message || 'Unable to submit move',
      });
    }
  });
};

/**
 * Mutation to end/resign from an active game
 */
export const useEndGame = (): UseMutationResult<
  GameEndResult,
  Error,
  GameEndRequest
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (request: GameEndRequest) => {
      return await apiClient.endGame(request);
    },
    onSuccess: (result, variables) => {
      // Invalidate all game-related queries
      queryClient.invalidateQueries({ queryKey: gameQueryKeys.all });

      addToast({
        type: 'info',
        title: 'Game Ended',
        message: variables.reason === 'resignation' 
          ? 'You resigned from the game'
          : 'Game ended',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Failed to End Game',
        message: error.message || 'Unable to end game',
      });
    }
  });
};