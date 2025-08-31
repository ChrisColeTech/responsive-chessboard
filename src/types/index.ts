// Board-related types
export type {
  ChessPiecesMap,
  ChessBoardConfig,
  ChangeMove,
  ArrowCoords,
  ResponsiveSizing
} from './board'

// Re-export engine types for convenience
export type {
  CellPos,
  Figure,
  FigureColor,
  FigureType,
  Cell,
  MoveData,
  GameResult
} from '../engine'