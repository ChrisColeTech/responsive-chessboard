/**
 * Temporary type declarations for responsive-chessboard
 * This resolves compilation issues during development
 */

declare module 'responsive-chessboard' {
  import React from 'react';

  export interface ChessboardProps {
    position?: string;
    orientation?: 'white' | 'black';
    onDrop?: (sourceSquare: string, targetSquare: string) => boolean;
    onPieceClick?: (square: string) => void;
    onSquareClick?: (square: string) => void;
    showCoordinates?: boolean;
    animationDuration?: number;
    width?: number;
    height?: number;
    pieceSet?: string;
    theme?: string;
    [key: string]: any;
  }

  export const Chessboard: React.FC<ChessboardProps>;
}

declare module 'responsive-chessboard/styles' {
  // No exports, just CSS imports
}