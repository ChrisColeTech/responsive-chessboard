/**
 * Component Domain Types  
 * Following Document 02 Architecture Guide - Domain organization
 */

import type { ChessPiece, SquareNotation, ChessGameState, BoardOrientation, ChessMoveInput } from '../chess/chess.types';
import type { ChessboardTheme, PieceSet } from '../ui/theme.types';

export interface BaseComponentProps {
  readonly className?: string;
  readonly testId?: string;
}

export interface SquareProps extends BaseComponentProps {
  readonly square: SquareNotation;
  readonly piece?: ChessPiece;
  readonly isLight: boolean;
  readonly isSelected?: boolean;
  readonly isValidTarget?: boolean;
  readonly isHighlighted?: 'lastMove' | 'check' | 'selected';
  readonly onClick?: (square: SquareNotation) => void;
  readonly onDragStart?: (square: SquareNotation, piece: ChessPiece) => void;
  readonly onDrop?: (square: SquareNotation) => void;
}

export interface PieceProps extends BaseComponentProps {
  readonly piece: ChessPiece;
  readonly square: SquareNotation;
  readonly pieceSet: PieceSet;
  readonly isDragging?: boolean;
}

export interface BoardProps extends BaseComponentProps {
  readonly gameState: ChessGameState;
  readonly boardOrientation: BoardOrientation;
  readonly pieceSet: PieceSet;
  readonly boardTheme: ChessboardTheme;
  readonly showCoordinates?: boolean;
  readonly allowDragAndDrop?: boolean;
  readonly onSquareClick?: (square: SquareNotation) => void;
  readonly onMove?: (move: ChessMoveInput) => Promise<boolean> | boolean;
  readonly selectedSquare?: SquareNotation;
  readonly validMoves?: SquareNotation[];
  readonly highlights?: Record<SquareNotation, 'lastMove' | 'check' | 'selected'>;
}

export interface ChessboardProps extends BaseComponentProps {
  readonly initialFen?: string;
  readonly boardOrientation?: BoardOrientation;
  readonly pieceSet?: PieceSet;
  readonly boardTheme?: ChessboardTheme;
  readonly showCoordinates?: boolean;
  readonly allowDragAndDrop?: boolean;
  readonly onMove?: (move: ChessMoveInput) => Promise<boolean> | boolean;
  readonly onSquareClick?: (square: SquareNotation) => void;
  readonly selectedSquare?: SquareNotation;
  readonly validMoves?: SquareNotation[];
  readonly highlights?: Record<SquareNotation, 'lastMove' | 'check' | 'selected'>;
}