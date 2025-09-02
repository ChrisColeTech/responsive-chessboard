// Puzzle API client - handles puzzle data, solutions, and hints
import type {
  PuzzleData,
  PuzzleSolution,
  SolutionResult,
  PuzzleResponse,
  PuzzleSolutionRequest,
  PuzzleSolutionResponse,
  PuzzleHintResponse,
  PuzzleStatsResponse
} from '@/types';
import { ChessTrainingAPIError } from '@/types';
import { PUZZLE_ENDPOINTS } from '@/constants';
import { HttpClient } from './HttpClient';

export class PuzzleAPIClient {
  constructor(private readonly httpClient: HttpClient) {}

  public async getNextPuzzle(): Promise<PuzzleData> {
    try {
      const response = await this.httpClient.get<PuzzleResponse>(PUZZLE_ENDPOINTS.NEXT);
      
      if (!response.success || !response.data?.puzzle) {
        throw new ChessTrainingAPIError('No puzzle data received');
      }

      return {
        id: response.data.puzzle.id,
        fen: response.data.puzzle.fen,
        themes: response.data.puzzle.themes,
        rating: response.data.puzzle.rating,
        description: response.data.puzzle.description
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to load puzzle', 500, error);
    }
  }

  public async submitSolution(puzzleId: string, solution: PuzzleSolution): Promise<SolutionResult> {
    try {
      const request: PuzzleSolutionRequest = {
        moves: solution.moves,
        timeTaken: solution.timeTaken,
        hintsUsed: solution.hintsUsed
      };

      const response = await this.httpClient.post<PuzzleSolutionResponse>(
        PUZZLE_ENDPOINTS.SOLVE(puzzleId),
        request
      );

      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to submit puzzle solution');
      }

      return {
        correct: response.data.correct,
        newRating: response.data.newRating,
        ratingChange: response.data.ratingChange,
        solution: response.data.solution
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to submit puzzle solution', 400, error);
    }
  }

  public async requestHint(puzzleId: string): Promise<{ hint: string; hintsUsed: number; maxHints: number }> {
    try {
      const response = await this.httpClient.post<PuzzleHintResponse>(
        PUZZLE_ENDPOINTS.HINT(puzzleId)
      );

      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to get puzzle hint');
      }

      return {
        hint: response.data.hint,
        hintsUsed: response.data.hintsUsed,
        maxHints: response.data.maxHints
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get puzzle hint', 400, error);
    }
  }

  public async getPuzzleStats(): Promise<{
    totalSolved: number;
    correctRate: number;
    averageTime: number;
    currentStreak: number;
    bestStreak: number;
    rating: number;
    ratingChange: number;
    todaysSolved: number;
  }> {
    try {
      const response = await this.httpClient.get<PuzzleStatsResponse>(PUZZLE_ENDPOINTS.STATS);
      
      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to get puzzle statistics');
      }

      return {
        totalSolved: response.data.totalSolved,
        correctRate: response.data.correctRate,
        averageTime: response.data.averageTime,
        currentStreak: response.data.currentStreak,
        bestStreak: response.data.bestStreak,
        rating: response.data.rating,
        ratingChange: response.data.ratingChange,
        todaysSolved: response.data.todaysSolved
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get puzzle statistics', 500, error);
    }
  }

  public async validateMoves(puzzleId: string, moves: string[]): Promise<{ isCorrect: boolean; explanation?: string }> {
    // This would be used for real-time move validation during puzzle solving
    try {
      const response = await this.httpClient.post(`/puzzles/${puzzleId}/validate`, {
        moves
      });

      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to validate moves');
      }

      return {
        isCorrect: response.data?.isCorrect || false,
        explanation: response.data?.explanation
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to validate moves', 400, error);
    }
  }

  public async getPuzzlesByCategory(category: string): Promise<PuzzleData[]> {
    try {
      const response = await this.httpClient.get(`/puzzles/category/${category}`);

      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to get puzzles by category');
      }

      // Transform API response to match our PuzzleData interface
      return response.data.map((puzzle: any) => ({
        id: puzzle.id,
        fen: puzzle.fen,
        themes: puzzle.themes || [category],
        rating: puzzle.rating,
        description: puzzle.description || '',
        solution: puzzle.solution
      }));
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get puzzles by category', undefined, error);
    }
  }

  public async skipPuzzle(puzzleId: string, reason?: string): Promise<void> {
    try {
      const response = await this.httpClient.post(`/puzzles/${puzzleId}/skip`, {
        reason: reason || 'user_skip'
      });

      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to skip puzzle');
      }
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to skip puzzle', 400, error);
    }
  }

  public async reportPuzzle(puzzleId: string, report: { issue: string; description?: string }): Promise<void> {
    try {
      const response = await this.httpClient.post(`/puzzles/${puzzleId}/report`, {
        issue: report.issue,
        description: report.description
      });

      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to report puzzle');
      }
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to report puzzle', 400, error);
    }
  }
}