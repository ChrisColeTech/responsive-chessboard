// Puzzle API specific types
export interface PuzzleResponse {
  readonly puzzle: {
    readonly id: string;
    readonly fen: string;
    readonly themes: string[];
    readonly rating: number;
    readonly description: string;
  };
}

export interface PuzzleSolutionRequest {
  readonly moves: string[];
  readonly timeTaken: number;
  readonly hintsUsed: number;
}

export interface PuzzleSolutionResponse {
  readonly correct: boolean;
  readonly newRating: number;
  readonly ratingChange: number;
  readonly solution: string[];
}

export interface PuzzleHintRequest {
  // Empty - just POST to endpoint
}

export interface PuzzleHintResponse {
  readonly hint: string;
  readonly hintsUsed: number;
  readonly maxHints: number;
}

export interface PuzzleStatsResponse {
  readonly totalSolved: number;
  readonly correctRate: number;
  readonly averageTime: number;
  readonly currentStreak: number;
  readonly bestStreak: number;
  readonly rating: number;
  readonly ratingChange: number;
  readonly todaysSolved: number;
}

// Additional puzzle types for React Query hooks
export interface PuzzleTheme {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly puzzleCount: number;
}

export interface PuzzleData {
  readonly id: string;
  readonly fen: string;
  readonly themes: string[];
  readonly rating: number;
  readonly description: string;
  readonly solution?: string[];
}

// Type alias for solution to match existing patterns
export type PuzzleSolution = PuzzleSolutionRequest;
export type SolutionResult = PuzzleSolutionResponse;