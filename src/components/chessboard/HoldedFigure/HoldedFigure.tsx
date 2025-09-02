/**
 * Held Figure Component
 * POC-style cursor-following piece during drag
 */

import React from 'react';
import type { HoldedFigureProps, ChessPiece, ChessPosition } from '../../../types';
import { cn } from '../../../utils';

/**
 * Component for displaying a piece that follows the cursor during drag
 * Based on POC implementation with simple fixed positioning
 */
export function HoldedFigure({ 
  piece, 
  cursorPosition, 
  size, 
  pieceSet,
  position
}: HoldedFigureProps) {
  return (
    <div
      className={cn(
        'chess-held-figure',
        `chess-held-figure--${piece.color}`,
        `chess-held-figure--${piece.type}`
      )}
      style={{
        position: 'fixed',
        top: cursorPosition.y - size / 2,
        left: cursorPosition.x - size / 2,
        width: size,
        height: size,
        zIndex: 1000,
        pointerEvents: 'none',
        opacity: 1
      }}
    >
      <img
        src={getPieceSvgPath(piece, pieceSet, position)}
        alt={`${piece.color} ${piece.type}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
        draggable={false}
      />
    </div>
  );
}

function getPieceSvgPath(piece: ChessPiece, pieceSet: string, position?: ChessPosition): string {
  const colorPrefix = piece.color === 'white' ? 'w' : 'b';
  
  // Handle knight orientation for sets that have -left/-right variants (same logic as Piece component)
  if (piece.type === 'knight' && position && pieceSet !== 'classic') {
    const isLeftKnight = position.file === 'b'; // b1, b8 are left knights
    const isRightKnight = position.file === 'g'; // g1, g8 are right knights
    
    if (isLeftKnight) {
      return `/assets/sets/${pieceSet}/${colorPrefix}N-left.svg`; // Left knight faces left
    } else if (isRightKnight) {
      return `/assets/sets/${pieceSet}/${colorPrefix}N-right.svg`; // Right knight faces right
    } else {
      // Fallback to left for other positions
      return `/assets/sets/${pieceSet}/${colorPrefix}N-left.svg`;
    }
  }
  
  // Regular piece mapping
  const typeMap = {
    king: 'K',
    queen: 'Q', 
    rook: 'R',
    bishop: 'B',
    knight: 'N',
    pawn: 'P'
  };
  
  const pieceCode = typeMap[piece.type as keyof typeof typeMap] || 'P';
  return `/assets/sets/${pieceSet}/${colorPrefix}${pieceCode}.svg`;
}

HoldedFigure.displayName = 'HoldedFigure';