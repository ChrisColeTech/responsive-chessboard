// component.types.ts - React component prop types
import type { ChessGameState, ChessPiece, ChessPosition, ChessMove, PieceColor, GameResult } from './chess.types';
import type { ChessboardEnhancements, FocusModeType, AnimationConfig, AccessibilityConfig, HighlightData } from './enhancement.types';

// AriaLabels type definition
export interface AriaLabelsType {
  chessboard: string;
  square: (position: ChessPosition, piece?: ChessPiece) => string;
  piece: (piece: ChessPiece) => string;
  gameStatus: (gameState: ChessGameState) => string;
}

// Piece set type (avoiding circular dependency)
type PieceSetType = 'classic' | 'modern' | 'tournament' | 'executive' | 'conqueror';

export interface ChessboardProps extends ChessboardEnhancements {
  // Core existing props
  pieceSet?: PieceSetType;
  showCoordinates?: boolean;
  allowDragAndDrop?: boolean;
  orientation?: PieceColor;
  onMove?: (move: ChessMove) => void;
  onGameEnd?: (result: GameResult) => void;
  makeMoveRef?: React.MutableRefObject<((from: string, to: string) => Promise<boolean>) | null>;
  maxWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  
  // Enhancement bundle (alternative to individual props)
  enhancements?: ChessboardEnhancements;
  
  // Enhancement event handlers
  onThemeChange?: (theme: string, material?: string) => void;
  onFocusModeChange?: (mode: string) => void;
  onAnimationComplete?: () => void;
  onAudioEvent?: (event: string) => void;
  onAccessibilityChange?: (config: AccessibilityConfig) => void;
}

export interface BoardProps extends Partial<ChessboardEnhancements> {
  gameState: ChessGameState | null;
  orientation: PieceColor;
  pieceSet: string;
  showCoordinates: boolean;
  selectedSquare: ChessPosition | null;
  validDropTargets: readonly ChessPosition[];
  isInCheck: boolean;
  onSquareClick?: (position: ChessPosition) => void;
  onDragStart?: (piece: ChessPiece, position: ChessPosition) => void;
  onDragEnd?: () => void;
  onDrop?: (targetPosition: ChessPosition) => Promise<boolean>;
  
  // Enhancement props
  highlights?: Map<string, HighlightData>;
  cssVariables?: Record<string, string>;
  ariaLabels?: AriaLabelsType;
}

export interface SquareProps extends Partial<ChessboardEnhancements> {
  position: ChessPosition;
  piece?: ChessPiece;
  isSelected?: boolean;
  isValidDropTarget: boolean;
  isInCheck?: boolean;
  showCoordinates: boolean;
  pieceSet: string;
  onClick?: (position: ChessPosition) => void;
  onDragStart?: (piece: ChessPiece, position: ChessPosition) => void;
  onDragEnd?: () => void;
  onDrop?: (position: ChessPosition) => Promise<boolean>;
  
  // Enhancement props
  highlights?: Map<string, HighlightData>;
  cssVariables?: Record<string, string>;
  ariaLabels?: AriaLabelsType;
  focusMode?: FocusModeType;
  isKeyboardNavigationEnabled?: boolean;
}

export interface PieceProps extends Partial<ChessboardEnhancements> {
  piece: ChessPiece;
  pieceSet: string;
  onDragStart?: (piece: ChessPiece, position: ChessPosition) => void;
  onDragEnd?: () => void;
  
  // Enhancement props
  animationConfig?: AnimationConfig;
  audioEnabled?: boolean;
  cssVariables?: Record<string, string>;
  ariaLabels?: AriaLabelsType;
}

export interface DraggedPieceProps extends Partial<ChessboardEnhancements> {
  piece: ChessPiece;
  pieceSet: string;
  
  // Enhancement props
  animationConfig?: AnimationConfig;
  cssVariables?: Record<string, string>;
}