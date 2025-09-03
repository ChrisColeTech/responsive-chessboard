// DragProvider.tsx - Definitive drag and drop implementation using POC mouse event pattern
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import type { ChessPiece, ChessPosition } from '../types';

interface DragContextType {
  // UI State (for rendering)
  draggedPiece: ChessPiece | null;
  cursorPosition: { x: number; y: number };
  validMoves: ChessPosition[];
  isDragging: boolean;
  
  // Actions
  startDrag: (piece: ChessPiece, from: ChessPosition, moves: ChessPosition[]) => void;
  updateCursor: (x: number, y: number) => void;
  endDrag: (to: ChessPosition) => Promise<boolean>;
  clearDrag: () => void;
  setMoveHandler: (handler: (move: { from: ChessPosition; to: ChessPosition }) => Promise<boolean>) => void;
}

const DragContext = createContext<DragContextType | null>(null);

export const DragProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // UI State for rendering
  const [draggedPiece, setDraggedPiece] = useState<ChessPiece | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [validMoves, setValidMoves] = useState<ChessPosition[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Refs for immediate access during drag operations (avoids React state race conditions)
  const dragStateRef = useRef<{
    piece: ChessPiece | null;
    from: ChessPosition | null;
    validMoves: ChessPosition[];
  }>({
    piece: null,
    from: null,
    validMoves: []
  });

  // Internal move handler ref (connects to chessboard's internal logic)
  const moveHandlerRef = useRef<((move: { from: ChessPosition; to: ChessPosition }) => Promise<boolean>) | null>(null);

  const startDrag = useCallback((piece: ChessPiece, from: ChessPosition, moves: ChessPosition[]) => {
    console.log('🎯 [DRAG] Starting drag:', piece.type, 'from', from, 'valid moves:', moves);
    
    // Update UI state
    setDraggedPiece(piece);
    setValidMoves(moves);
    setIsDragging(true);
    
    // Update ref for immediate access
    dragStateRef.current = {
      piece,
      from,
      validMoves: moves
    };
  }, []);

  const updateCursor = useCallback((x: number, y: number) => {
    setCursorPosition({ x, y });
  }, []);

  const endDrag = useCallback(async (to: ChessPosition): Promise<boolean> => {
    // Use ref data instead of state to avoid React race conditions
    const { piece, from, validMoves } = dragStateRef.current;
    
    if (!piece || !from) {
      console.log('🎯 [DRAG] End drag failed - no piece or from position');
      clearDrag();
      return false;
    }

    console.log('🎯 [DRAG] Attempting to drop', piece.type, 'from', from, 'to', to);

    // Validate move using ref data
    if (!validMoves.includes(to)) {
      console.log('🎯 [DRAG] Invalid move - not in valid moves list:', validMoves);
      clearDrag();
      return false;
    }

    // Use internal move handler (same as click-to-move)
    if (moveHandlerRef.current) {
      try {
        const success = await moveHandlerRef.current({ from, to });
        console.log('🎯 [DRAG] Move result:', success ? 'SUCCESS' : 'FAILED');
        clearDrag();
        return success;
      } catch (error) {
        console.error('🎯 [DRAG] Move error:', error);
        clearDrag();
        return false;
      }
    } else {
      console.error('🎯 [DRAG] No move handler set!');
      clearDrag();
      return false;
    }
  }, []);

  const clearDrag = useCallback(() => {
    console.log('🎯 [DRAG] Clearing drag state');
    
    // Clear UI state
    setDraggedPiece(null);
    setValidMoves([]);
    setIsDragging(false);
    setCursorPosition({ x: 0, y: 0 });
    
    // Clear ref state
    dragStateRef.current = {
      piece: null,
      from: null,
      validMoves: []
    };
  }, []);

  const setMoveHandler = useCallback((handler: (move: { from: ChessPosition; to: ChessPosition }) => Promise<boolean>) => {
    console.log('🎯 [DRAG] Move handler set');
    moveHandlerRef.current = handler;
  }, []);

  const value: DragContextType = {
    draggedPiece,
    cursorPosition,
    validMoves,
    isDragging,
    startDrag,
    updateCursor,
    endDrag,
    clearDrag,
    setMoveHandler
  };

  return (
    <DragContext.Provider value={value}>
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = (): DragContextType => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error('useDrag must be used within a DragProvider');
  }
  return context;
};