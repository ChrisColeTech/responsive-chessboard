// Square.tsx - Individual chessboard square
import React, { useCallback, useMemo } from 'react';
import type { SquareProps } from '../../types';
import { getSquareColor, positionToFileRank } from '../../utils';
import { describePiece, describeSquare } from '../../utils/a11y.utils';
import { Piece } from './Piece';

export const Square: React.FC<SquareProps> = React.memo(({
  position,
  piece,
  isSelected,
  isValidDropTarget,
  isInCheck,
  showCoordinates,
  pieceSet,
  onClick,
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
  ariaLabels,
  isKeyboardNavigationEnabled
}) => {
  const squareColor = getSquareColor(position);
  const { file, rank } = positionToFileRank(position);
  const isCornerSquare = (file === 'a' || file === 'h') &&
                        (rank === 1 || rank === 8);
  const squareNotation = position;
  
  // Generate accessibility descriptions
  const ariaLabel = useMemo(() => {
    if (ariaLabels?.square && typeof ariaLabels.square === 'function') {
      return ariaLabels.square(position, piece);
    }
    return describeSquare(squareNotation, piece, {
      isSelected,
      isValidMove: isValidDropTarget,
      isInCheck,
      isCaptureTarget: piece && isValidDropTarget
    });
  }, [ariaLabels, position, piece, isSelected, isValidDropTarget, isInCheck, squareNotation]);
  
  // Generate enhanced class names
  const squareClasses = useMemo(() => {
    const classes = ['chessboard-square', squareColor];
    
    if (isSelected) classes.push('selected');
    if (isValidDropTarget) classes.push('valid-move');
    if (piece && isValidDropTarget) classes.push('capture-target');
    if (isInCheck) classes.push('in-check');
    
    // Enhancement classes
    if (theme) classes.push(`theme-${theme}`);
    if (boardMaterial) classes.push(`material-${boardMaterial}`);
    if (focusMode) classes.push(`focus-${focusMode}`);
    
    // Highlight classes
    if (highlights?.size) {
      for (const [highlightSquare, highlightData] of highlights) {
        if (highlightSquare === squareNotation) {
          classes.push(`highlight-${highlightData.type || 'default'}`);
          if (highlightData.intensity) {
            classes.push(`highlight-${highlightData.intensity}`);
          }
        }
      }
    }
    
    return classes.join(' ');
  }, [squareColor, isSelected, isValidDropTarget, piece, isInCheck, theme, boardMaterial, focusMode, highlights, squareNotation]);
  
  // Generate enhanced styles
  const squareStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    // Apply CSS variables
    if (cssVariables) {
      Object.assign(style, cssVariables);
    }
    
    // Apply highlight styles
    if (highlights?.size) {
      for (const [highlightSquare, highlightData] of highlights) {
        if (highlightSquare === squareNotation && highlightData.style) {
          Object.assign(style, highlightData.style);
        }
      }
    }
    
    return style;
  }, [cssVariables, highlights, squareNotation]);

  const handleClick = useCallback(() => {
    onClick?.(position);
  }, [onClick, position]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    if (isValidDropTarget) {
      e.preventDefault();
    }
  }, [isValidDropTarget]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    onDrop?.(position);
  }, [onDrop, position]);

  return (
    <div
      className={squareClasses}
      style={squareStyle}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      
      // Accessibility attributes
      role="gridcell"
      aria-label={ariaLabel}
      aria-selected={isSelected}
      aria-describedby={isValidDropTarget ? `${squareNotation}-moves` : undefined}
      tabIndex={isKeyboardNavigationEnabled ? (isSelected ? 0 : -1) : undefined}
      data-position={squareNotation}
      data-square-color={squareColor}
      data-theme={theme}
      data-material={boardMaterial}
      data-focus-mode={focusMode}
    >
      {/* Piece component */}
      {piece && (
        <Piece
          piece={piece}
          pieceSet={pieceSet}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          
          // Enhancement props
          theme={theme}
          boardMaterial={boardMaterial}
          animationConfig={animationConfig}
          focusMode={focusMode}
          audioProfile={audioProfile}
          accessibilityConfig={accessibilityConfig}
          cssVariables={cssVariables}
          ariaLabels={ariaLabels}
        />
      )}
      
      {/* Enhanced coordinate display */}
      {showCoordinates && isCornerSquare && (
        <>
          {(file === 'a') && (
            <div 
              className={`chessboard-coordinates coordinate-rank ${coordinateStyle ? `style-${coordinateStyle}` : ''}`}
              aria-hidden="true"
            >
              {rank}
            </div>
          )}
          {(rank === 1) && (
            <div 
              className={`chessboard-coordinates coordinate-file ${coordinateStyle ? `style-${coordinateStyle}` : ''}`}
              aria-hidden="true"
            >
              {file}
            </div>
          )}
        </>
      )}
      
      {/* Accessibility helpers */}
      {isKeyboardNavigationEnabled && (
        <div className="keyboard-nav-helper" aria-hidden="true">
          {squareNotation}
          {piece && ` - ${describePiece(piece)}`}
        </div>
      )}
      
      {/* Hidden move announcements for screen readers */}
      {isValidDropTarget && (
        <div id={`${squareNotation}-moves`} className="sr-only">
          Valid move target{piece ? ' - capture available' : ''}
        </div>
      )}
    </div>
  );
});