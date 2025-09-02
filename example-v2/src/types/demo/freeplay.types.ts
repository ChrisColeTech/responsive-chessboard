// SRP: Free play demo specific types
import type { Chess } from 'chess.js';

/**
 * Available board themes for demo
 */
export type BoardTheme = 'classic' | 'modern' | 'blue' | 'wood';

/**
 * Available piece sets for demo
 */
export type PieceSet = 'classic' | 'modern' | 'tournament' | 'executive' | 'conqueror';

/**
 * Container size options for responsive testing
 */
export type ContainerSize = 'small' | 'medium' | 'large' | 'xlarge' | 'custom';

/**
 * Chess game state for free play
 */
export interface FreePlayGameState {
  readonly chess: Chess;
  readonly currentFen: string;
  readonly isGameOver: boolean;
  readonly isCheck: boolean;
  readonly isCheckmate: boolean;
  readonly isStalemate: boolean;
  readonly isDraw: boolean;
  readonly turn: 'white' | 'black';
  readonly moveCount: number;
  readonly capturedPieces: {
    readonly white: string[];
    readonly black: string[];
  };
  readonly lastMove: string | null;
  readonly gameResult: string | null;
}

/**
 * Demo settings configuration
 */
export interface ChessboardSettings {
  theme: BoardTheme;
  pieceSet: PieceSet;
  showCoordinates: boolean;
  allowDragAndDrop: boolean;
  animationsEnabled: boolean;
  animationDuration: number;
  boardOrientation: 'white' | 'black';
}

/**
 * Container sizing configuration for responsive testing
 */
export interface ContainerConfig {
  size: ContainerSize;
  width: number;
  height: number;
  aspectRatio: number;
  minSize: number;
  maxSize: number;
}

/**
 * Move history entry for game replay
 */
export interface MoveHistoryEntry {
  readonly moveNumber: number;
  readonly white?: string;
  readonly black?: string;
  readonly fen: string;
  readonly timestamp: number;
}

/**
 * Demo statistics tracking
 */
export interface DemoStats {
  readonly movesPlayed: number;
  readonly gamesCompleted: number;
  readonly averageGameLength: number;
  readonly themeChanges: number;
  readonly pieceSetChanges: number;
  readonly sessionStartTime: number;
}

/**
 * Error types for demo
 */
export type DemoErrorType = 'invalid_move' | 'game_over' | 'invalid_fen' | 'settings_error' | 'save_error' | 'load_error';

/**
 * Demo error interface
 */
export interface DemoError {
  readonly type: DemoErrorType;
  readonly message: string;
  readonly timestamp: number;
  readonly context?: Record<string, any>;
}