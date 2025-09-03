/**
 * Board Component
 * Following Document 18 Research #1, #4 - Container-responsive CSS Grid
 */

import React from 'react';
import { Square } from '../Square/Square';
import type { BoardProps } from '../../../types';
import { getBoardSquares, isLightSquare } from '../../../utils';

export const Board: React.FC<BoardProps> = ({
  gameState,
  boardOrientation,
  boardTheme,
  showCoordinates = false,
  onSquareClick,
  onMove,
  selectedSquare,
  validMoves = [],
  highlights = {},
  className = '',
  testId
}) => {
  // Get squares in correct orientation
  const squares = getBoardSquares(boardOrientation);

  const handleSquareClick = (square: string) => {
    onSquareClick?.(square as any);
  };

  const handleDragStart = (square: string, piece: any) => {
    // For POC: simple drag start logging
    console.log('Drag start:', square, piece);
  };

  const handleDrop = async (targetSquare: string) => {
    // For POC: simple move attempt
    if (selectedSquare && onMove) {
      const success = await onMove({
        from: selectedSquare,
        to: targetSquare as any
      });
      console.log('Move result:', success);
    }
  };

  return (
    <div
      className={`
        grid gap-0 w-full h-full max-w-full max-h-full
        grid-cols-8 grid-rows-8
        theme-${boardTheme}
        chessboard
        ${className}
      `}
      style={{
        minWidth: 0,
        minHeight: 0
      }}
      data-testid={testId || 'chess-board'}
    >
      {squares.map((square) => {
        const piece = gameState.position.get(square);
        const isLight = isLightSquare(square);
        const isSelected = selectedSquare === square;
        const isValidTarget = validMoves.includes(square as any);
        const highlight = (highlights as any)[square];

        return (
          <Square
            key={square}
            square={square}
            piece={piece}
            isLight={isLight}
            isSelected={isSelected}
            isValidTarget={isValidTarget}
            isHighlighted={highlight}
            onClick={handleSquareClick}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        );
      })}

      {/* Document 18 Research #10: Coordinate labels for accessibility */}
      {showCoordinates && (
        <>
          {/* File labels (a-h) */}
          {boardOrientation === 'white' ? (
            ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
          ) : (
            ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a']
          ).map((file, index) => (
            <div
              key={`file-${file}`}
              className="absolute bottom-0.5 text-xs font-semibold opacity-70 pointer-events-none"
              style={{ left: `${(index + 0.8) * 12.5}%` }}
            >
              {file.toUpperCase()}
            </div>
          ))}

          {/* Rank labels (1-8) */}
          {boardOrientation === 'white' ? (
            [8, 7, 6, 5, 4, 3, 2, 1]
          ) : (
            [1, 2, 3, 4, 5, 6, 7, 8]
          ).map((rank, index) => (
            <div
              key={`rank-${rank}`}
              className="absolute left-0.5 top-0.5 text-xs font-semibold opacity-70 pointer-events-none"
              style={{ top: `${(index + 0.1) * 12.5}%` }}
            >
              {rank}
            </div>
          ))}
        </>
      )}
    </div>
  );
};