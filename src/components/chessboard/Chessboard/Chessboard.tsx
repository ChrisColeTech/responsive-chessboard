/**
 * Main Chessboard Component
 * Integrates all chess functionality following architecture guide
 */

import React, { useMemo } from 'react';
import type { ChessboardProps } from '../../../types';
import { useChessGame, useResponsiveBoard } from '../../../hooks/chess';
import { DragProvider } from '../../../providers/DragProvider';
import { Board } from '../Board';
import { cn } from '../../../utils';

/**
 * Main chessboard container component
 */
export function Chessboard(props: ChessboardProps) {
  const {
    initialFen,
    onMove,
    onGameChange,
    boardOrientation = 'white',
    showCoordinates = true,
    coordinatePosition = 'bottom-right',
    pieceSet = 'classic',
    boardTheme = 'brown',
    allowDragAndDrop = true,
    allowKeyboardNavigation = true,
    disabled = false,
    animationsEnabled = true,
    animationDuration = 300,
    width = 400,
    height,
    aspectRatio = 1,
    minSize = 200,
    maxSize = 800,
    responsive = true,
    className,
    style,
    testId = 'chessboard',
    onSquareClick,
    onSquareHover,
    onPieceClick,
    onRightClick,
    onError
  } = props;

  // Chess game state management
  const gameHook = useChessGame({
    initialFen,
    validateMoves: true,
    trackHistory: true,
    enableUndo: true,
    onMove,
    onGameChange,
    onError
  });

  // Responsive board management
  const responsiveHook = useResponsiveBoard({
    width,
    height,
    minSize,
    maxSize,
    aspectRatio,
    responsive
  });

  // Create simple theme object
  const theme = useMemo(() => {
    if (typeof boardTheme === 'object') return boardTheme;
    
    // Default theme
    return {
      lightSquareColor: '#f0d9b5',
      darkSquareColor: '#b58863',
      highlightColors: {
        selected: 'rgba(255, 255, 0, 0.5)',
        'valid-move': 'rgba(0, 255, 0, 0.3)',
        'last-move': 'rgba(255, 255, 0, 0.3)',
        check: 'rgba(255, 0, 0, 0.5)',
        capture: 'rgba(255, 0, 0, 0.3)'
      }
    };
  }, [boardTheme]);

  // Handle move execution
  const handleMove = async (move: any) => {
    try {
      return await gameHook.makeMove(move);
    } catch (error) {
      console.warn('Move execution failed:', error);
      onError?.(error as Error);
      return false;
    }
  };

  // Main chessboard styles
  const chessboardStyles = {
    width: responsiveHook.dimensions.width,
    height: responsiveHook.dimensions.height,
    ...style
  };

  // Error state
  if (gameHook.error) {
    return (
      <div className="chessboard-error" data-testid={`${testId}-error`}>
        <p>Chess board error: {gameHook.error}</p>
      </div>
    );
  }

  // Loading state
  if (gameHook.isLoading || responsiveHook.isResizing) {
    return (
      <div className="chessboard-loading" data-testid={`${testId}-loading`} style={chessboardStyles}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={responsiveHook.containerRef}
      className={cn(
        'chessboard',
        `chessboard--${boardOrientation}`,
        {
          'chessboard--disabled': disabled,
          'chessboard--draggable': allowDragAndDrop && !disabled,
        },
        className
      )}
      style={chessboardStyles}
      data-testid={testId}
      data-orientation={boardOrientation}
    >
      <DragProvider
        onMove={handleMove}
        disabled={!allowDragAndDrop || disabled}
        pieceSet={pieceSet}
      >
        <Board 
          gameState={gameHook.gameState!}
          boardOrientation={boardOrientation}
          boardTheme={theme}
          pieceSet={pieceSet}
          showCoordinates={showCoordinates}
          coordinatePosition={coordinatePosition}
          allowDragAndDrop={allowDragAndDrop && !disabled}
          disabled={disabled}
          size={Math.min(responsiveHook.dimensions.width, responsiveHook.dimensions.height)}
          onSquareClick={onSquareClick || (() => {})}
          onSquareHover={onSquareHover}
          onPieceClick={onPieceClick}
          onRightClick={onRightClick}
          onValidMovesRequest={gameHook.getValidMovesForPiece}
        />
      </DragProvider>
    </div>
  );
}

Chessboard.displayName = 'Chessboard';