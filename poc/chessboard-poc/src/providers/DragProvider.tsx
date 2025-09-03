/**
 * Drag Provider - Document 20 Definitive Implementation
 * POC mouse event pattern with fixed positioning
 */

import React, { createContext, useContext, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import type { ChessPiece, SquareNotation } from '../types';

interface DragContextType {
  draggedPiece: ChessPiece | null;
  draggedFrom: SquareNotation | null;
  cursorPosition: { x: number; y: number };
  validMoves: SquareNotation[];
  isDragging: boolean;
  startDrag: (piece: ChessPiece, from: SquareNotation, moves: SquareNotation[]) => void;
  updateCursor: (x: number, y: number) => void;
  endDrag: (to: SquareNotation) => boolean;
  clearDrag: () => void;
  setMoveHandler: (handler: (move: { from: SquareNotation; to: SquareNotation }) => Promise<boolean> | boolean) => void;
}

const DragContext = createContext<DragContextType | null>(null);

interface DragProviderProps {
  children: ReactNode;
}

export const DragProvider: React.FC<DragProviderProps> = ({ children }) => {
  console.log('DragProvider render');
  
  const [draggedPiece, setDraggedPiece] = useState<ChessPiece | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<SquareNotation | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: -1, y: -1 });
  const [validMoves, setValidMoves] = useState<SquareNotation[]>([]);
  
  // Store move handler from the chessboard component
  const moveHandlerRef = useRef<((move: { from: SquareNotation; to: SquareNotation }) => Promise<boolean> | boolean) | null>(null);
  
  // Use refs to store current drag state for immediate access
  const dragStateRef = useRef<{
    piece: ChessPiece | null;
    from: SquareNotation | null;
    validMoves: SquareNotation[];
  }>({
    piece: null,
    from: null,
    validMoves: []
  });
  
  const isDragging = draggedPiece !== null;

  const startDrag = (piece: ChessPiece, from: SquareNotation, moves: SquareNotation[]) => {
    console.log('startDrag called:', { piece, from, moves: moves.length });
    
    // Update both state and ref
    setDraggedPiece(piece);
    setDraggedFrom(from);
    setValidMoves(moves);
    
    dragStateRef.current = {
      piece,
      from,
      validMoves: moves
    };
  };

  const updateCursor = (x: number, y: number) => {
    setCursorPosition({ x, y });
  };

  const setMoveHandler = (handler: (move: { from: SquareNotation; to: SquareNotation }) => Promise<boolean> | boolean) => {
    moveHandlerRef.current = handler;
  };

  const endDrag = (to: SquareNotation): boolean => {
    console.log('endDrag called state:', { draggedPiece, draggedFrom, to, validMoves });
    console.log('endDrag called ref:', { dragStateRef: dragStateRef.current });
    
    // Use ref data instead of state
    const { piece: currentPiece, from: currentFrom, validMoves: currentValidMoves } = dragStateRef.current;
    
    if (!currentPiece || !currentFrom) {
      console.log('No dragged piece or from square in ref');
      clearDrag();
      return false;
    }

    // Check if move is valid
    if (!currentValidMoves.includes(to)) {
      console.log('Invalid move - not in valid moves:', currentValidMoves);
      clearDrag();
      return false;
    }

    console.log('Attempting move:', { from: currentFrom, to });
    
    // Use the chessboard's internal move handler instead of external onMove
    const moveResult = moveHandlerRef.current?.({ from: currentFrom, to });
    
    // Clear drag state after attempting move
    clearDrag();
    
    const result = moveResult instanceof Promise ? true : (moveResult ?? false);
    console.log('Move result:', result);
    return result;
  };

  const clearDrag = () => {
    console.log('clearDrag called');
    console.trace('clearDrag stack trace');
    
    // Clear both state and ref
    setDraggedPiece(null);
    setDraggedFrom(null);
    setCursorPosition({ x: -1, y: -1 });
    setValidMoves([]);
    
    dragStateRef.current = {
      piece: null,
      from: null,
      validMoves: []
    };
  };

  const value: DragContextType = {
    draggedPiece,
    draggedFrom,
    cursorPosition,
    validMoves,
    isDragging,
    startDrag,
    updateCursor,
    endDrag,
    clearDrag,
    setMoveHandler,
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