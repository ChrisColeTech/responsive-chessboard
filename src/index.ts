/**
 * Responsive Chessboard Component Library
 * Main entry point for the library
 */

// Import styles
import './styles/index.css';

// Main chessboard component
export { Chessboard } from './components/chessboard';

// Types for consumers
export type {
  ChessboardProps,
  ChessPiece,
  ChessPosition,
  ChessMoveInput,
  ChessGameState,
  PieceType,
  PieceColor,
  SquareNotation,
  ChessTheme,
  PieceSet
} from './types';

// Utility functions that might be useful for consumers
export {
  positionToSquareNotation,
  squareNotationToPosition,
  isValidSquareNotation,
  createInitialPosition
} from './utils';

// Services for advanced usage
export {
  ChessGameService,
  MoveValidationService,
  FenService
} from './services/chess';