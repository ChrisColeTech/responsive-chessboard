/**
 * Drag Provider
 * Provides drag and drop context using POC-style approach
 */

import React, { createContext, useContext } from 'react';
import type {
  DragDropHook,
  ChessMoveInput,
  ChessPiece,
  ChessPosition,
  SquareNotation,
  PieceSet
} from '../types';
import { useDragAndDrop } from '../hooks/chess/useDragAndDrop';
import { HoldedFigure } from '../components/chessboard/HoldedFigure';

interface DragProviderProps {
  children: React.ReactNode;
  onMove: (move: ChessMoveInput) => Promise<boolean> | boolean;
  disabled?: boolean;
  pieceSet?: PieceSet;
}

// Create context with the drag hook interface
const DragContext = createContext<DragDropHook | null>(null);

/**
 * Drag provider component
 * Wraps components with drag and drop functionality
 */
export function DragProvider({ 
  children, 
  onMove, 
  disabled = false,
  pieceSet = 'classic' 
}: DragProviderProps) {
  const dragHook = useDragAndDrop({ 
    onMove, 
    disabled 
  });
  
  return (
    <DragContext.Provider value={dragHook}>
      {children}
      
      {/* POC-style cursor-following piece */}
      {dragHook.dragState.isDragging && 
       dragHook.dragState.draggedPiece && 
       dragHook.dragState.cursorPosition && (
        <HoldedFigure
          piece={dragHook.dragState.draggedPiece}
          cursorPosition={dragHook.dragState.cursorPosition}
          size={60}
          pieceSet={pieceSet}
          position={dragHook.dragState.fromPosition || undefined}
        />
      )}
    </DragContext.Provider>
  );
}

/**
 * Hook to access drag context
 */
export function useDragContext(): DragDropHook {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDragContext must be used within a DragProvider');
  }
  return context;
}