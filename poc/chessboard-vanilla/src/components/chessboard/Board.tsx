// Board.tsx - 8x8 chessboard grid
import React, { useMemo } from 'react';
import type { BoardProps } from '../../types';
import { generateSquareList } from '../../utils';
import { Square } from './Square';

export const Board: React.FC<BoardProps> = React.memo(({
  gameState,
  orientation,
  pieceSet,
  showCoordinates,
  selectedSquare,
  validDropTargets,
  isInCheck,
  onSquareClick,
  onDragStart,
  onDragEnd,
  onDrop,
  
  // Enhancement props
  theme,
  boardMaterial,
  animationConfig,
  focusMode,
  coordinateStyle,
  audioProfile,
  accessibilityConfig,
  highlights,
  cssVariables,
  ariaLabels
}) => {
  const squares = useMemo(() => 
    generateSquareList(orientation), 
    [orientation]
  );

  // Find the king's position if in check
  const checkedKingSquare = useMemo(() => {
    if (!isInCheck || !gameState) return null;
    
    for (const [square, piece] of gameState.position) {
      if (piece.type === 'king' && piece.color === gameState.activeColor) {
        return square;
      }
    }
    return null;
  }, [isInCheck, gameState]);

  return (
    <>
      {squares.map(({ file, rank, square }) => {
        const piece = gameState?.position.get(square);
        const isKingInCheck = checkedKingSquare === square;
        
        // Check if this square has any highlights
        const squareHighlights = highlights?.get(square);
        
        return (
          <Square
            key={`${file}${rank}`} // Stable key to prevent reshuffling
            position={square}
            piece={piece}
            isSelected={selectedSquare === square}
            isValidDropTarget={validDropTargets.includes(square)}
            isInCheck={isKingInCheck}
            showCoordinates={showCoordinates}
            pieceSet={pieceSet}
            onClick={onSquareClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            
            // Enhancement props
            theme={theme}
            boardMaterial={boardMaterial}
            animationConfig={animationConfig}
            focusMode={focusMode}
            coordinateStyle={coordinateStyle}
            audioProfile={audioProfile}
            accessibilityConfig={accessibilityConfig}
            highlights={squareHighlights ? new Map([[square, squareHighlights]]) : undefined}
            cssVariables={cssVariables}
            ariaLabels={ariaLabels}
            isKeyboardNavigationEnabled={accessibilityConfig?.keyboardNavigationEnabled}
          />
        );
      })}
    </>
  );
});