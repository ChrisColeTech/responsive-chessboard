/**
 * Drag and Drop Hook
 * POC-style simple drag implementation without @dnd-kit
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type {
  DragDropConfig,
  DragDropHook,
  DragState,
  ChessPiece,
  ChessPosition,
  SquareNotation
} from '../../types';
import { positionToSquareNotation } from '../../utils';

/**
 * Hook for managing drag and drop interactions
 * Uses POC-style simple mouse events instead of @dnd-kit
 */
export function useDragAndDrop(config: DragDropConfig): DragDropHook {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPiece, setDraggedPiece] = useState<ChessPiece | null>(null);
  const [fromPosition, setFromPosition] = useState<ChessPosition | null>(null);
  const [validMoves, setValidMoves] = useState<readonly SquareNotation[]>([]);
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number } | null>(null);
  
  const mouseMoveHandlerRef = useRef<((event: MouseEvent) => void) | null>(null);
  const mouseUpHandlerRef = useRef<((event: MouseEvent) => void) | null>(null);
  
  // Drag state object
  const dragState: DragState = {
    isDragging,
    draggedPiece,
    fromPosition,
    validMoves,
    cursorPosition
  };
  
  /**
   * Start drag operation
   */
  const startDrag = useCallback((piece: ChessPiece, position: ChessPosition, moves: SquareNotation[]) => {
    if (config.disabled) return;
    
    setIsDragging(true);
    setDraggedPiece(piece);
    setFromPosition(position);
    setValidMoves(moves);
    
    // Create mouse move handler
    mouseMoveHandlerRef.current = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    
    // Create mouse up handler
    mouseUpHandlerRef.current = (event: MouseEvent) => {
      endDrag();
    };
    
    // Add global event listeners
    document.addEventListener('mousemove', mouseMoveHandlerRef.current);
    document.addEventListener('mouseup', mouseUpHandlerRef.current);
    document.addEventListener('mouseleave', mouseUpHandlerRef.current);
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
  }, [config.disabled]);
  
  /**
   * Update drag position
   */
  const updateDrag = useCallback((x: number, y: number) => {
    if (isDragging) {
      setCursorPosition({ x, y });
    }
  }, [isDragging]);
  
  /**
   * End drag operation
   */
  const endDrag = useCallback(async (targetPosition?: ChessPosition) => {
    // Clean up event listeners
    if (mouseMoveHandlerRef.current) {
      document.removeEventListener('mousemove', mouseMoveHandlerRef.current);
      mouseMoveHandlerRef.current = null;
    }
    if (mouseUpHandlerRef.current) {
      document.removeEventListener('mouseup', mouseUpHandlerRef.current);
      document.removeEventListener('mouseleave', mouseUpHandlerRef.current);
      mouseUpHandlerRef.current = null;
    }
    
    // Restore body styles
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    
    // Attempt move if we have valid target
    if (targetPosition && fromPosition && draggedPiece) {
      const fromSquare = positionToSquareNotation(fromPosition);
      const toSquare = positionToSquareNotation(targetPosition);
      
      // Check if move is valid
      if (validMoves.includes(toSquare)) {
        const move = {
          from: fromSquare,
          to: toSquare
        };
        
        try {
          await config.onMove(move);
        } catch (error) {
          console.warn('Drag and drop move failed:', error);
        }
      }
    }
    
    // Reset drag state
    setIsDragging(false);
    setDraggedPiece(null);
    setFromPosition(null);
    setValidMoves([]);
    setCursorPosition(null);
  }, [fromPosition, draggedPiece, validMoves, config.onMove]);
  
  /**
   * Cancel drag operation
   */
  const cancelDrag = useCallback(() => {
    endDrag(); // End without target position
  }, [endDrag]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mouseMoveHandlerRef.current) {
        document.removeEventListener('mousemove', mouseMoveHandlerRef.current);
      }
      if (mouseUpHandlerRef.current) {
        document.removeEventListener('mouseup', mouseUpHandlerRef.current);
        document.removeEventListener('mouseleave', mouseUpHandlerRef.current);
      }
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, []);
  
  return {
    dragState,
    startDrag,
    updateDrag,
    endDrag,
    cancelDrag
  };
}