/**
 * DraggedPiece Component - Document 20 Implementation
 * Fixed positioning cursor-following piece during drag
 */

import React from 'react';
import { Piece } from '../Piece/Piece';
import type { ChessPiece, PieceSet } from '../../../types';

interface DraggedPieceProps {
  piece: ChessPiece;
  position: { x: number; y: number };
  size: number;
  pieceSet: PieceSet;
}

export const DraggedPiece: React.FC<DraggedPieceProps> = ({
  piece,
  position,
  size,
  pieceSet
}) => {
  // Don't render if position is invalid
  if (position.x < 0 || position.y < 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y - size / 2,
        left: position.x - size / 2,
        width: size,
        height: size,
        zIndex: 1000,
        pointerEvents: 'none', // Don't interfere with drop detection
        opacity: 1.0, // Fully opaque dragged piece
      }}
      data-testid="dragged-piece"
    >
      <Piece
        piece={piece}
        square="a1" // Dummy square for dragged piece
        pieceSet={pieceSet}
        className="w-full h-full"
      />
    </div>
  );
};