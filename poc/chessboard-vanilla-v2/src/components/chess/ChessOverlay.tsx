import React from 'react';
import { generateChessGridCells } from '../../utils/grid-generator.utils';

interface ChessOverlayProps {
  gridSize: number;
  selectedCell: string | null;
  hoveredCell: string | null;
  isFlipped?: boolean;
}

export const ChessOverlay: React.FC<ChessOverlayProps> = ({ 
  gridSize, 
  selectedCell, 
  hoveredCell,
  isFlipped = false 
}) => {
  const numCells = gridSize * gridSize;
  
  // Use the existing grid generator in overlay mode
  const overlayCells = generateChessGridCells(numCells, undefined, undefined, {
    overlayMode: true,
    showCoordinates: false
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        gap: '0px',
        pointerEvents: 'none', // Don't interfere with chess interactions
        zIndex: 1, // Above board, below pieces
        transform: isFlipped ? 'rotate(180deg)' : undefined,
      }}
    >
      {overlayCells.map((cell) => {
        const isSelected = selectedCell === cell.id;
        const isHovered = hoveredCell === cell.id && hoveredCell !== selectedCell;
        
        const elementProps = cell.element.props as { className?: string; style?: React.CSSProperties };
        const selectedClass = isSelected ? 'selected' : '';
        const hoveredClass = isHovered ? 'hovered' : '';
        
        
        return React.cloneElement(cell.element as React.ReactElement<{ 
          className?: string;
          style?: React.CSSProperties;
        }>, {
          key: cell.id,
          className: `${elementProps.className || ''} ${selectedClass} ${hoveredClass}`.trim(),
          style: {
            ...elementProps.style,
            // Ensure overlay positioning
            position: 'relative',
            zIndex: isSelected || isHovered ? 10 : 1,
          }
        });
      })}
    </div>
  );
};