/**
 * Chessboard Component - Main Container  
 * Following Document 02 Architecture Guide - Pure presentation component
 */

import React from 'react';
import { Board } from './Board/Board';
import { DragProvider, useDrag } from '../../providers/DragProvider';
import { DraggedPiece } from './DraggedPiece/DraggedPiece';
import type { ChessboardProps } from '../../types';
import { useChessGame, useChessInteraction } from '../../hooks';
import { INITIAL_FEN } from '../../constants/chess/chess.constants';

const ChessboardInternal: React.FC<ChessboardProps> = ({
  initialFen = INITIAL_FEN,
  boardOrientation = 'white',
  pieceSet = 'classic',
  boardTheme = 'classic',
  showCoordinates = false,
  allowDragAndDrop = true,
  onMove,
  onSquareClick,
  selectedSquare: externalSelectedSquare,
  validMoves: externalValidMoves = [],
  highlights = {},
  className = '',
  testId
}) => {
  // Document 02: Use hooks for state management - no business logic in component
  const { gameState, isLoading, makeMove } = useChessGame(initialFen);
  const { 
    selectedSquare: internalSelectedSquare, 
    validMoves: internalValidMoves, 
    selectSquare, 
    clearSelection 
  } = useChessInteraction();

  // Use external props if provided, otherwise use internal state
  const selectedSquare = externalSelectedSquare ?? internalSelectedSquare;
  const validMoves = externalValidMoves.length > 0 ? externalValidMoves : internalValidMoves;
  
  // Document 20: Use drag context for cursor-following piece
  const { draggedPiece, cursorPosition, isDragging, setMoveHandler } = useDrag();
  
  // Calculate dynamic square size for dragged piece
  const [squareSize, setSquareSize] = React.useState(64);
  const boardRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const updateSquareSize = () => {
      if (boardRef.current) {
        // Find an actual square element and measure its real size
        const firstSquare = boardRef.current.querySelector('[data-square]') as HTMLElement;
        if (firstSquare) {
          const squareRect = firstSquare.getBoundingClientRect();
          const actualSquareSize = Math.min(squareRect.width, squareRect.height);
          console.log('Measured actual square:', actualSquareSize);
          setSquareSize(actualSquareSize);
        }
      }
    };
    
    // Measure after board renders
    setTimeout(updateSquareSize, 100);
    setTimeout(updateSquareSize, 500);
    
    window.addEventListener('resize', updateSquareSize);
    return () => window.removeEventListener('resize', updateSquareSize);
  }, [gameState]);

  // Document 02: Pure event handlers - no business logic
  const handleSquareClick = (square: string) => {
    if (selectedSquare === square) {
      clearSelection();
    } else if (validMoves.includes(square as any) && selectedSquare) {
      // Attempt move
      makeMove({ from: selectedSquare, to: square as any });
      clearSelection();
    } else {
      selectSquare(square as any);
    }
    onSquareClick?.(square as any);
  };

  const handleMove = async (move: any) => {
    const success = await makeMove(move);
    if (success && onMove) {
      onMove(move);
    }
    return success;
  };

  // Connect drag system to internal move handler (after handleMove is defined)
  React.useEffect(() => {
    setMoveHandler(async (move) => {
      const success = await handleMove(move);
      return success;
    });
  }, [handleMove, setMoveHandler]);

  if (isLoading || !gameState) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div
      className={`
        w-full h-full relative
        theme-${boardTheme}
        ${className}
      `}
      data-testid={testId || 'chessboard-container'}
    >
      {/* Responsive chessboard container */}
      <div 
        ref={boardRef} 
        className="w-full h-full flex items-center justify-center"
      >
        <div 
          className="w-full h-full max-w-full max-h-full"
          style={{
            aspectRatio: '1 / 1',
            width: 'min(100%, 100vh - 200px)',
            height: 'min(100%, 100vh - 200px)'
          }}
        >
        <Board
          gameState={gameState}
          boardOrientation={boardOrientation}
          pieceSet={pieceSet}
          boardTheme={boardTheme}
          showCoordinates={showCoordinates}
          allowDragAndDrop={allowDragAndDrop}
          onSquareClick={handleSquareClick}
          onMove={handleMove}
          selectedSquare={selectedSquare || undefined}
          validMoves={validMoves}
          highlights={highlights as any}
        />
        </div>
      </div>
      
      {/* Document 20: Cursor-following dragged piece */}
      {isDragging && draggedPiece && (
        <DraggedPiece
          piece={draggedPiece}
          position={cursorPosition}
          size={squareSize}
          pieceSet={pieceSet}
        />
      )}
    </div>
  );
};

export const Chessboard: React.FC<ChessboardProps> = (props) => {
  return (
    <DragProvider>
      <ChessboardInternal {...props} />
    </DragProvider>
  );
};