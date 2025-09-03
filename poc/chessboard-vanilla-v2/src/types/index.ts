// index.ts - Type exports barrel
export type {
  // Chess types
  PieceColor,
  PieceType,
  File,
  Rank,
  ChessPosition,
  ChessPiece,
  ChessMove,
  CastlingRights,
  ChessGameState,
  ChessMoveInput,
  ChessMoveResult,
  GameResult
} from './chess.types';

export type {
  // Component types
  ChessboardProps,
  BoardProps,
  SquareProps,
  PieceProps,
  DraggedPieceProps
} from './component.types';