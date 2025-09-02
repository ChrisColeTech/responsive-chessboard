// React Query mutations for puzzle operations
// Following SRP - handles puzzle mutations with cache management
import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';
import { PuzzleAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import { useToast } from '@/providers';
import { puzzleQueryKeys } from '@/hooks/queries';
import type { 
  PuzzleSolution, 
  SolutionResult,
  PuzzleHintRequest,
  PuzzleHintResponse
} from '@/types';

// Initialize API client
const apiClient = new PuzzleAPIClient(httpClient);

/**
 * Mutation to submit puzzle solution
 * Includes cache invalidation for stats and next puzzle
 */
export const useSubmitPuzzleSolution = (): UseMutationResult<
  SolutionResult,
  Error,
  { puzzleId: string; solution: PuzzleSolution }
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ puzzleId, solution }) => {
      return await apiClient.submitSolution(puzzleId, solution);
    },
    onSuccess: (result) => {
      // Invalidate puzzle-related queries to get fresh data
      queryClient.invalidateQueries({ queryKey: puzzleQueryKeys.next() });
      queryClient.invalidateQueries({ queryKey: puzzleQueryKeys.stats() });

      // Show success/failure toast based on solution correctness
      addToast({
        type: result.correct ? 'success' : 'error',
        title: result.correct ? 'Correct!' : 'Incorrect',
        message: result.correct 
          ? `Rating: ${result.newRating} (${result.ratingChange > 0 ? '+' : ''}${result.ratingChange})`
          : 'Try again or request a hint',
        duration: result.correct ? 3000 : 5000,
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Submission Failed',
        message: error.message || 'Unable to submit solution',
      });
    }
  });
};

/**
 * Mutation to request a hint for the current puzzle
 * Updates puzzle state with hint information
 */
export const useRequestPuzzleHint = (): UseMutationResult<
  PuzzleHintResponse,
  Error,
  string
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async (puzzleId: string) => {
      return await apiClient.requestHint(puzzleId);
    },
    onSuccess: (hintResponse) => {
      // Don't invalidate queries, just show the hint
      addToast({
        type: 'info',
        title: 'Hint',
        message: hintResponse.hint,
        duration: 8000, // Longer duration for hints
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Hint Unavailable',
        message: error.message || 'Unable to get hint',
      });
    }
  });
};

/**
 * Mutation to skip current puzzle and get a new one
 * Useful when puzzle is too difficult or user wants variety
 */
export const useSkipPuzzle = (): UseMutationResult<
  void,
  Error,
  { puzzleId: string; reason?: string }
> => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ puzzleId, reason }) => {
      await apiClient.skipPuzzle(puzzleId, reason);
    },
    onSuccess: () => {
      // Get new puzzle by invalidating next puzzle query
      queryClient.invalidateQueries({ queryKey: puzzleQueryKeys.next() });

      addToast({
        type: 'info',
        title: 'Puzzle Skipped',
        message: 'Loading next puzzle...',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Skip Failed',
        message: error.message || 'Unable to skip puzzle',
      });
    }
  });
};

/**
 * Mutation to report a puzzle problem
 * For incorrect solutions, unclear instructions, etc.
 */
export const useReportPuzzle = (): UseMutationResult<
  void,
  Error,
  { puzzleId: string; issue: string; description?: string }
> => {
  const { addToast } = useToast();

  return useMutation({
    mutationFn: async ({ puzzleId, issue, description }) => {
      await apiClient.reportPuzzle(puzzleId, { issue, description });
    },
    onSuccess: () => {
      addToast({
        type: 'success',
        title: 'Report Submitted',
        message: 'Thank you for helping improve puzzle quality',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Report Failed',
        message: error.message || 'Unable to submit report',
      });
    }
  });
};