/**
 * Chess Piece Component
 * Pure presentation component for rendering chess pieces
 */

import React from 'react';
import type { PieceProps, ChessPiece, ChessPosition } from '../../../types';
import { cn } from '../../../utils';

/**
 * Chess piece display component
 * Responsibility: Render piece with appropriate styling
 */
export function Piece({
  piece,
  position,
  size,
  pieceSet,
  isDragging = false,
  isAnimating = false,
  animationProgress = 0,
  disabled = false,
  allowDragAndDrop = true,
  className,
  style,
  testId
}: PieceProps) {
  const pieceStyles = {
    width: size,
    height: size,
    cursor: !disabled && allowDragAndDrop ? (isDragging ? 'grabbing' : 'grab') : 'default',
    opacity: isDragging ? 0.4 : 1, // Dimmed when being dragged
    transition: isAnimating ? 'all 0.3s ease-out' : 'none',
    ...style
  };

  return (
    <div
      className={cn(
        'chess-piece',
        `chess-piece--${piece.color}`,
        `chess-piece--${piece.type}`,
        `chess-piece--${pieceSet}`,
        {
          'chess-piece--dragging': isDragging,
          'chess-piece--disabled': disabled,
          'chess-piece--draggable': !disabled && allowDragAndDrop,
          'chess-piece--animating': isAnimating
        },
        className
      )}
      style={pieceStyles}
      data-testid={testId}
      data-piece-id={piece.id}
      data-piece-type={piece.type}
      data-piece-color={piece.color}
      role="img"
      aria-label={`${piece.color} ${piece.type}`}
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

      {/* Hidden description for screen readers */}
      <div id={`piece-${piece.id}`} className="sr-only">
        {piece.color} {piece.type} on square {position.file}{position.rank}
      </div>
    </div>
  );
}

function getPieceSvgPath(piece: ChessPiece, pieceSet: string, position?: ChessPosition): string {
  const colorPrefix = piece.color === 'white' ? 'w' : 'b';
  
  // Handle knight orientation for sets that have -left/-right variants
  if (piece.type === 'knight' && position && pieceSet !== 'classic') {
    const isLeftKnight = position.file === 'b'; // b1, b8 are left knights
    const isRightKnight = position.file === 'g'; // g1, g8 are right knights
    
    if (isLeftKnight) {
      return `/assets/sets/${pieceSet}/${colorPrefix}N-left.svg`; // Left knight faces left
    } else if (isRightKnight) {
      return `/assets/sets/${pieceSet}/${colorPrefix}N-right.svg`; // Right knight faces right
    } else {
      // Fallback to left for other positions (shouldn't happen in normal chess)
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

Piece.displayName = 'ChessPiece';