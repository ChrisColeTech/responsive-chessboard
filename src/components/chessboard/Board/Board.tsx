/**
 * Chess Board Component
 * Renders the 8x8 grid of squares
 */

import React from 'react';
import type { BoardProps } from '../../../types';
import { Square } from '../Square';
import { getAllSquares, squareNotationToPosition, isLightSquare } from '../../../utils';

/**
 * Chess board grid component
 */
export function Board({
  gameState,
  boardOrientation,
  boardTheme,
  pieceSet,
  showCoordinates,
  coordinatePosition,
  allowDragAndDrop,
  disabled,
  size = 400,
  onSquareClick,
  onSquareHover,
  onPieceClick,
  onRightClick,
  onValidMovesRequest,
  customSquareRenderer,
  className,
  style,
  testId
}: BoardProps) {
  // Get squares in correct visual order based on orientation
  const squares = getAllSquares(boardOrientation);

  // Calculate square size based on board size
  const squareSize = size / 8;

  return (
    <div
      className={`chess-board chess-board--${boardOrientation} ${className || ''}`}
      style={{
        display: 'grid',
        gridTemplate: 'repeat(8, 1fr) / repeat(8, 1fr)',
        width: '100%',
        height: '100%',
        ...style
      }}
      data-testid={testId}
    >
      {squares.map((squareNotation) => {
        const position = squareNotationToPosition(squareNotation);
        const piece = gameState.position[squareNotation];
        const isLight = isLightSquare(squareNotation);
        
        if (customSquareRenderer) {
          return customSquareRenderer({
            position,
            squareNotation,
            piece,
            isLight,
            onClick: onSquareClick,
            onHover: onSquareHover,
            onRightClick,
            theme: boardTheme,
            size: squareSize,
            pieceSet,
            showCoordinate: showCoordinates,
            coordinatePosition,
            disabled,
            allowDragAndDrop
          });
        }

        // Show coordinates on visual bottom and right edges based on orientation
        let isBottomEdge = false;
        let isRightEdge = false;
        
        if (boardOrientation === 'white') {
          isBottomEdge = position.rank === 1; // Bottom visual row for white
          isRightEdge = position.file === 'h'; // Right visual column for white
        } else {
          isBottomEdge = position.rank === 8; // Bottom visual row for black
          isRightEdge = position.file === 'a'; // Right visual column for black
        }
        
        const shouldShowCoordinate = showCoordinates && (isBottomEdge || isRightEdge);

        return (
          <Square
            key={squareNotation}
            position={position}
            squareNotation={squareNotation}
            piece={piece}
            isLight={isLight}
            onClick={onSquareClick}
            onHover={onSquareHover}
            onRightClick={onRightClick}
            theme={boardTheme}
            size={squareSize}
            pieceSet={pieceSet}
            showCoordinate={shouldShowCoordinate}
            coordinatePosition={coordinatePosition}
            disabled={disabled}
            allowDragAndDrop={allowDragAndDrop}
            onValidMovesRequest={onValidMovesRequest}
          />
        );
      })}
    </div>
  );
}

Board.displayName = 'ChessBoard';