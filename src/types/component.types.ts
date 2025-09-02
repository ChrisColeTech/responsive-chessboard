/**
 * Component-specific type definitions
 * UI component interfaces and props
 */

import type { CSSProperties, ReactNode } from 'react';
import type {
  ChessGameState,
  ChessMoveInput,
  ChessMove,
  ChessPiece,
  ChessPosition,
  SquareNotation
} from './chess.types';

// Visual styling types
export type PieceSet = 'classic' | 'modern' | 'tournament' | 'executive' | 'conqueror';
export type BoardOrientation = 'white' | 'black';
export type CoordinatePosition = 'bottom-right' | 'top-left' | 'all' | 'none';

// Theme colors
export interface ChessTheme {
  readonly lightSquareColor: string;
  readonly darkSquareColor: string;
  readonly coordinateColor?: string;
  readonly borderColor?: string;
  readonly pieceColors?: {
    readonly whiteFill: string;
    readonly whiteStroke: string;
    readonly blackFill: string;
    readonly blackStroke: string;
  };
  readonly highlightColors: {
    readonly selected: string;
    readonly 'valid-move': string;
    readonly 'last-move': string;
    readonly check: string;
    readonly capture: string;
  };
}

// Highlight types
export type HighlightType = 'selected' | 'valid-move' | 'last-move' | 'check' | 'capture';

// Main chessboard component props
export interface ChessboardProps {
  // Game state props
  readonly initialFen?: string;
  readonly position?: ChessGameState;
  readonly onMove?: (move: ChessMoveInput) => Promise<boolean> | boolean;
  readonly onGameChange?: (state: ChessGameState) => void;
  
  // Visual props
  readonly boardOrientation?: BoardOrientation;
  readonly showCoordinates?: boolean;
  readonly coordinatePosition?: CoordinatePosition;
  readonly pieceSet?: PieceSet;
  readonly boardTheme?: string | ChessTheme;
  
  // Interaction props
  readonly allowDragAndDrop?: boolean;
  readonly allowKeyboardNavigation?: boolean;
  readonly disabled?: boolean;
  
  // Animation props
  readonly animationsEnabled?: boolean;
  readonly animationDuration?: number;
  
  // Responsive props
  readonly width?: number;
  readonly height?: number;
  readonly aspectRatio?: number;
  readonly minSize?: number;
  readonly maxSize?: number;
  readonly responsive?: boolean;
  
  // Styling props
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly testId?: string;
  
  // Advanced props
  readonly customSquareRenderer?: (props: SquareProps) => ReactNode;
  readonly customPieceRenderer?: (props: PieceProps) => ReactNode;
  readonly onSquareClick?: (position: ChessPosition) => void;
  readonly onSquareHover?: (position: ChessPosition) => void;
  readonly onPieceClick?: (piece: ChessPiece, position: ChessPosition) => void;
  readonly onRightClick?: (position: ChessPosition) => void;
  readonly onError?: (error: Error) => void;
}

// Board component props
export interface BoardProps {
  readonly gameState: ChessGameState;
  readonly boardOrientation: BoardOrientation;
  readonly boardTheme: ChessTheme;
  readonly pieceSet: PieceSet;
  readonly showCoordinates: boolean;
  readonly coordinatePosition: CoordinatePosition;
  readonly allowDragAndDrop: boolean;
  readonly disabled: boolean;
  readonly size?: number; // Board size for calculating square sizes
  readonly onSquareClick: (position: ChessPosition) => void;
  readonly onSquareHover?: (position: ChessPosition) => void;
  readonly onPieceClick?: (piece: ChessPiece, position: ChessPosition) => void;
  readonly onRightClick?: (position: ChessPosition) => void;
  readonly onValidMovesRequest?: (piece: ChessPiece, position: ChessPosition) => SquareNotation[];
  readonly customSquareRenderer?: (props: SquareProps) => ReactNode;
  readonly customPieceRenderer?: (props: PieceProps) => ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly testId?: string;
}

// Square component props
export interface SquareProps {
  readonly position: ChessPosition;
  readonly squareNotation: SquareNotation;
  readonly piece: ChessPiece | null;
  readonly isLight: boolean;
  readonly isHighlighted?: boolean;
  readonly highlightType?: HighlightType;
  readonly onClick: (position: ChessPosition) => void;
  readonly onHover?: (position: ChessPosition) => void;
  readonly onRightClick?: (position: ChessPosition) => void;
  readonly validMoves?: readonly SquareNotation[];
  readonly onValidMovesRequest?: (piece: ChessPiece, position: ChessPosition) => SquareNotation[];
  readonly customStyle?: CSSProperties;
  readonly theme: ChessTheme;
  readonly size: number;
  readonly pieceSet: PieceSet;
  readonly showCoordinate?: boolean;
  readonly coordinatePosition: CoordinatePosition;
  readonly disabled?: boolean;
  readonly allowDragAndDrop?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly testId?: string;
}

// Piece component props
export interface PieceProps {
  readonly piece: ChessPiece;
  readonly position: ChessPosition;
  readonly size: number;
  readonly pieceSet: PieceSet;
  readonly isDragging?: boolean;
  readonly isAnimating?: boolean;
  readonly animationProgress?: number;
  readonly disabled?: boolean;
  readonly allowDragAndDrop?: boolean;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly testId?: string;
}

// Held figure (ghost piece) props
export interface HoldedFigureProps {
  readonly piece: ChessPiece;
  readonly cursorPosition: { x: number; y: number };
  readonly size: number;
  readonly pieceSet: PieceSet;
  readonly position?: ChessPosition;
}