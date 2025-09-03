/**
 * Piece Component
 * Following Document 18 Research #13 - SVG integration with Tailwind
 */

import React from 'react';
import type { PieceProps } from '../../../types';

export const Piece: React.FC<PieceProps> = ({
  piece,
  square,
  pieceSet,
  isDragging = false,
  className = '',
  testId
}) => {
  // Document 18 Research #13: SVG piece path construction
  const getPiecePath = (): string => {
    const colorPrefix = piece.color === 'w' ? 'w' : 'b';
    const pieceChar = piece.type.toUpperCase();
    return `/pieces/${pieceSet}/${colorPrefix}${pieceChar}.svg`;
  };

  const pieceDescription = `${piece.color === 'w' ? 'White' : 'Black'} ${getPieceNameFromType(piece.type)}`;

  return (
    <div
      className={`chess-piece w-full h-full flex items-center justify-center ${
        isDragging ? 'opacity-40 scale-105' : ''
      } ${className}`}
      data-testid={testId || `piece-${square}`}
    >
      {/* Document 18 Research #13: Proper SVG integration */}
      <img
        src={getPiecePath()}
        alt={pieceDescription}
        className="w-full h-full object-contain pointer-events-none"
        draggable={false}
        style={{ 
          shapeRendering: 'crispEdges',
          imageRendering: 'crisp-edges'
        }}
      />
      <span className="sr-only">
        {pieceDescription} on {square}
      </span>
    </div>
  );
};

function getPieceNameFromType(type: string): string {
  const names: Record<string, string> = {
    'p': 'Pawn',
    'n': 'Knight',
    'b': 'Bishop',
    'r': 'Rook',
    'q': 'Queen',
    'k': 'King'
  };
  return names[type] || type;
}