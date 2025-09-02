/**
 * Chess Square Component
 * Individual board square with drag and drop support
 */

import React, { useCallback } from 'react';
import type { SquareProps } from '../../../types';
import { cn, positionToSquareNotation } from '../../../utils';
import { Piece } from '../Piece';
import { useDragContext } from '../../../providers/DragProvider';

/**
 * Individual chess board square component
 */
export function Square({
  position,
  squareNotation,
  piece,
  isLight,
  isHighlighted = false,
  highlightType = 'selected',
  onClick,
  onHover,
  onRightClick,
  validMoves = [],
  onValidMovesRequest,
  customStyle,
  theme,
  size,
  pieceSet,
  showCoordinate = false,
  coordinatePosition,
  disabled = false,
  allowDragAndDrop = true,
  className,
  style,
  testId
}: SquareProps) {
  const dragContext = useDragContext();
  
  // Determine if this square is being dragged from
  const isDragSource = dragContext.dragState.fromPosition?.file === position.file && 
                      dragContext.dragState.fromPosition?.rank === position.rank;
  
  // Determine if this square is a valid drop target
  const isValidDropTarget = dragContext.dragState.isDragging && 
                           dragContext.dragState.validMoves.includes(squareNotation);

  // Handle click events
  const handleClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;
    
    // If currently dragging, handle drop
    if (dragContext.dragState.isDragging) {
      dragContext.endDrag(position);
      return;
    }
    
    onClick(position);
  }, [disabled, dragContext, position, onClick]);

  // Handle mouse down to start drag
  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    if (disabled || !piece || !allowDragAndDrop) return;
    
    // Get valid moves
    let moves = [...validMoves];
    if (onValidMovesRequest && moves.length === 0) {
      moves = onValidMovesRequest(piece, position);
    }
    
    // Start drag operation
    dragContext.startDrag(piece, position, moves);
  }, [disabled, piece, allowDragAndDrop, validMoves, onValidMovesRequest, position, dragContext]);

  // Handle mouse enter for drop targets
  const handleMouseEnter = useCallback(() => {
    if (dragContext.dragState.isDragging) {
      onHover?.(position);
    }
  }, [dragContext.dragState.isDragging, onHover, position]);

  // Handle mouse up for drop
  const handleMouseUp = useCallback(() => {
    if (dragContext.dragState.isDragging) {
      dragContext.endDrag(position);
    }
  }, [dragContext, position]);

  // Handle right click
  const handleRightClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    onRightClick?.(position);
  }, [onRightClick, position]);

  // Square styles
  const squareStyles = {
    width: size,
    height: size,
    backgroundColor: isLight ? theme.lightSquareColor : theme.darkSquareColor,
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'default' : 'pointer',
    ...customStyle,
    ...style
  };

  return (
    <div
      className={cn(
        'chess-square',
        {
          'chess-square--light': isLight,
          'chess-square--dark': !isLight,
          'chess-square--highlighted': isHighlighted,
          'chess-square--disabled': disabled,
          'chess-square--has-piece': !!piece,
          'chess-square--draggable': allowDragAndDrop && !!piece,
          'chess-square--drag-source': isDragSource,
          'chess-square--valid-drop': isValidDropTarget
        },
        className
      )}
      style={squareStyles}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      onContextMenu={handleRightClick}
      data-testid={testId}
      data-square={squareNotation}
      role="gridcell"
      aria-label={`Square ${squareNotation}${piece ? `, ${piece.color} ${piece.type}` : ', empty'}`}
    >
      {/* Valid move indicator */}
      {isValidDropTarget && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '25%',
            height: '25%',
            backgroundColor: theme.highlightColors['valid-move'],
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}

      {/* Piece on this square */}
      {piece && (
        <div
          style={{
            opacity: isDragSource && dragContext.dragState.isDragging ? 0.4 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          <Piece
            piece={piece}
            position={position}
            size={size * 0.85}
            pieceSet={pieceSet}
            isDragging={isDragSource && dragContext.dragState.isDragging}
            disabled={disabled}
            allowDragAndDrop={allowDragAndDrop}
          />
        </div>
      )}

      {/* Coordinate labels */}
      {showCoordinate && (
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            fontSize: '10px',
            color: isLight ? theme.darkSquareColor : theme.lightSquareColor,
            pointerEvents: 'none'
          }}
        >
          {squareNotation}
        </div>
      )}
    </div>
  );
}

Square.displayName = 'ChessSquare';