// Chess game and backend integration types
import { ChessMove, ChessGameState, ChessMoveInput, GameStatus, PieceColor } from './chess.types';

export interface GameConfig {
  readonly difficulty: number; // 1-5 AI level
  readonly playerColor: PieceColor | 'random';
  readonly timeControl?: string; // e.g., '10+0'
}

export interface GameResult {
  readonly id: string;
  readonly initialFen: string;
  readonly playerColor: PieceColor;
  readonly aiLevel: number;
  readonly timeControl: string;
  readonly status: GameStatus;
}

export interface MoveResult {
  readonly success: boolean;
  readonly playerMove: ChessMove;
  readonly aiMove?: ChessMove;
  readonly newFen: string;
  readonly gameStatus: GameStatus;
}

export interface ChessTrainingGameState extends ChessGameState {
  readonly id: string;
  readonly playerColor: PieceColor;
  readonly aiLevel: number;
  readonly status: GameStatus;
  readonly timeControl?: string;
  readonly lastMoveTime?: number;
}

export interface ChessTrainingGameHook {
  readonly gameState: ChessTrainingGameState | null;
  readonly createGame: (config: GameConfig) => Promise<{ success: boolean; gameId?: string; error?: string }>;
  readonly makeMove: (move: ChessMoveInput) => Promise<{ success: boolean; result?: MoveResult; error?: string }>;
}

export interface LocalPuzzleData {
  readonly id: string;
  readonly fen: string;
  readonly themes: string[];
  readonly rating: number;
  readonly description: string;
}

export interface LocalPuzzleSolution {
  readonly moves: string[];
  readonly timeTaken: number;
  readonly hintsUsed: number;
}

export interface LocalSolutionResult {
  readonly correct: boolean;
  readonly newRating: number;
  readonly ratingChange: number;
  readonly solution: string[];
}