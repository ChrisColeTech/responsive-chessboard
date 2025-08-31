// Main component export
export { ChessBoard } from './components/ChessBoard'

// Type exports for consumers
export type {
  ChessBoardConfig,
  ChessPiecesMap,
  ChangeMove,
  ArrowCoords,
  ResponsiveSizing,
  FigureColor,
  MoveData,
  GameResult,
  CellPos,
  Figure,
} from './types'

// Utility exports for advanced usage
export {
  CHESS_PIECES_MAP,
  DEFAULT_CHESSBOARD_CONFIG,
  getChessBoardConfig,
  calculateBoardSize,
  constrainSize,
} from './utils'

// Constants for configuration
export {
  DEFAULT_COLORS,
  RESPONSIVE_LIMITS,
} from './constants'

// Engine exports for chess logic
export * from './engine'