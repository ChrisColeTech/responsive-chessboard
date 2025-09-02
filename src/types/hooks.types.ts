/**
 * Hook-specific type definitions
 * Interfaces for custom React hooks
 */

import type {
  ChessGameState,
  ChessMoveInput,
  ChessMove,
  ChessPiece,
  ChessPosition,
  SquareNotation
} from './chess.types';

// Chess game hook configuration
export interface ChessGameConfig {
  readonly initialFen?: string;
  readonly validateMoves?: boolean;
  readonly trackHistory?: boolean;
  readonly enableUndo?: boolean;
  readonly onMove?: (move: ChessMoveInput) => Promise<boolean> | boolean;
  readonly onGameChange?: (state: ChessGameState) => void;
  readonly onError?: (error: Error) => void;
}

// Chess game hook return value
export interface ChessGameHook {
  readonly gameState: ChessGameState | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly makeMove: (move: ChessMoveInput) => Promise<boolean>;
  readonly undoMove: () => boolean;
  readonly resetGame: (fen?: string) => void;
  readonly getValidMoves: (square: SquareNotation) => SquareNotation[];
  readonly getValidMovesForPiece: (piece: ChessPiece, position: ChessPosition) => SquareNotation[];
  readonly isSquareAttacked: (square: SquareNotation, byColor: 'white' | 'black') => boolean;
}

// Responsive board hook return value
export interface ResponsiveBoardHook {
  readonly dimensions: {
    readonly width: number;
    readonly height: number;
    readonly squareSize: number;
  };
  readonly orientation: 'white' | 'black';
  readonly containerRef: React.RefObject<HTMLDivElement>;
  readonly isResizing: boolean;
  readonly setOrientation: (orientation: 'white' | 'black') => void;
}

// Drag and drop hook configuration
export interface DragDropConfig {
  readonly onMove: (move: ChessMoveInput) => Promise<boolean> | boolean;
  readonly disabled?: boolean;
  readonly allowInvalidMoves?: boolean;
}

// Drag state
export interface DragState {
  readonly isDragging: boolean;
  readonly draggedPiece: ChessPiece | null;
  readonly fromPosition: ChessPosition | null;
  readonly validMoves: readonly SquareNotation[];
  readonly cursorPosition: { x: number; y: number } | null;
}

// Drag and drop hook return value
export interface DragDropHook {
  readonly dragState: DragState;
  readonly startDrag: (piece: ChessPiece, position: ChessPosition, validMoves: SquareNotation[]) => void;
  readonly updateDrag: (x: number, y: number) => void;
  readonly endDrag: (targetPosition?: ChessPosition) => Promise<void>;
  readonly cancelDrag: () => void;
}

// Animation configuration
export interface AnimationConfig {
  readonly duration?: number;
  readonly tension?: number;
  readonly friction?: number;
}

// Piece animation data
export interface PieceAnimation {
  readonly pieceId: string;
  readonly from: SquareNotation;
  readonly to: SquareNotation;
  readonly isAnimating: boolean;
  readonly progress: number;
}

// Animation hook return value
export interface ChessAnimationHook {
  readonly animatedPieces: readonly PieceAnimation[];
  readonly isAnimating: boolean;
  readonly animateMove: (move: ChessMove) => Promise<void>;
  readonly cancelAnimations: () => void;
}