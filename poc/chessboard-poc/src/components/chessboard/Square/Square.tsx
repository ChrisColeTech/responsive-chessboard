/**
 * Square Component
 * Following Document 18 Research #17 - Square highlighting and visual indicators
 */

import React, { useCallback } from 'react';
import { Piece } from '../Piece/Piece';
import { useDrag } from '../../../providers/DragProvider';
import type { SquareProps, SquareNotation } from '../../../types';

export const Square: React.FC<SquareProps> = ({
  square,
  piece,
  isLight,
  isSelected = false,
  isValidTarget = false,
  isHighlighted,
  onClick,
  onDragStart,
  onDrop,
  className = '',
  testId
}) => {
  // For POC: Allow moves to any square for testing - in real implementation would calculate valid moves
  const pieceValidMoves: SquareNotation[] = piece ? [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8',
    'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8',
    'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8',
    'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8',
    'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8',
    'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8',
    'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'
  ] : [];
  const handleClick = useCallback(() => {
    onClick?.(square);
  }, [onClick, square]);

  const { startDrag, updateCursor, endDrag, clearDrag, draggedFrom } = useDrag();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!piece) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Document 20: POC mouse event pattern
    // Start drag with piece, square, and valid moves
    startDrag(piece, square, pieceValidMoves);
    onDragStart?.(square, piece);
    
    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      updateCursor(moveEvent.clientX, moveEvent.clientY);
    };
    
    const handleGlobalMouseUp = (upEvent: MouseEvent) => {
      console.log('handleGlobalMouseUp fired');
      
      // Cleanup listeners
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      
      // Determine target square from cursor position
      const targetElement = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      const targetSquare = targetElement?.getAttribute('data-square') || 
                          targetElement?.closest('[data-square]')?.getAttribute('data-square');
      
      console.log('Drop attempt:', {
        targetElement: targetElement?.tagName,
        targetSquare,
        className: targetElement?.className,
        clientX: upEvent.clientX,
        clientY: upEvent.clientY
      });
      
      if (targetSquare) {
        const success = endDrag(targetSquare as SquareNotation);
        console.log('Drop success:', success);
        if (success) {
          onDrop?.(targetSquare as SquareNotation);
        }
      } else {
        console.log('No target square found, clearing drag');
        clearDrag();
      }
    };
    
    // Document 20: Document-level listeners for global mouse tracking
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  }, [piece, square, pieceValidMoves, onDragStart, onDrop, startDrag, updateCursor, endDrag, clearDrag]);

  // Document 18 Research #17: Layered highlighting approach
  const squareClasses = [
    // Document 18 Research #3: aspect-square for perfect squares
    'aspect-square flex items-center justify-center relative cursor-pointer',
    
    // Document 18 Research #5: CSS variable theme integration
    isLight ? 'bg-light-square' : 'bg-dark-square',
    
    // Document 18 Research #17: ring-inset prevents layout shifts
    isSelected && 'chess-square--selected',
    isValidTarget && 'chess-square--valid-target',
    isHighlighted === 'lastMove' && 'chess-square--last-move',
    isHighlighted === 'check' && 'chess-square--check',
    isHighlighted === 'selected' && 'chess-square--selected',
    
    // Interactive feedback
    'hover:brightness-110 transition-colors duration-150',
    
    // Document 18 Research #15: Drag and drop cursor states
    piece ? 'cursor-grab hover:cursor-grab' : 'cursor-pointer',
    
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={squareClasses}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      data-square={square}
      data-testid={testId || `square-${square}`}
    >
      {/* Document 18 Research #17: Valid move indicator dot */}
      {isValidTarget && !piece && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-green-500 rounded-full opacity-60"></div>
        </div>
      )}
      
      {/* Render piece if present and not being dragged */}
      {piece && draggedFrom !== square && (
        <Piece
          piece={piece}
          square={square}
          pieceSet="classic"
          className="w-full h-full"
        />
      )}
      
      {/* Show semi-transparent piece at drag source */}
      {piece && draggedFrom === square && (
        <Piece
          piece={piece}
          square={square}
          pieceSet="classic"
          className="w-full h-full opacity-30"
        />
      )}
      
      {/* Screen reader description */}
      <span className="sr-only">
        {square} {isLight ? 'light' : 'dark'} square
        {piece && ` with ${piece.color === 'w' ? 'white' : 'black'} ${piece.type}`}
      </span>
    </div>
  );
};