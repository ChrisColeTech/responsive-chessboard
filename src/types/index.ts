/**
 * Type definitions index
 * Re-exports all types for easy consumption
 */

// Chess-specific types
export type {
  PieceType,
  PieceColor,
  FileNotation,
  RankNotation,
  SquareNotation,
  ChessPiece,
  ChessPosition,
  ChessMoveInput,
  ChessMove,
  GameStatus,
  ChessGameState,
  MoveValidationResult
} from './chess.types';

// Component types
export type {
  PieceSet,
  BoardOrientation,
  CoordinatePosition,
  ChessTheme,
  HighlightType,
  ChessboardProps,
  BoardProps,
  SquareProps,
  PieceProps,
  HoldedFigureProps
} from './component.types';

// Hook types
export type {
  ChessGameConfig,
  ChessGameHook,
  ResponsiveBoardHook,
  DragDropConfig,
  DragState,
  DragDropHook,
  AnimationConfig,
  PieceAnimation,
  ChessAnimationHook
} from './hooks.types';