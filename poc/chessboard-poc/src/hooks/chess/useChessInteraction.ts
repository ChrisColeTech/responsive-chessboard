/**
 * useChessInteraction Hook
 * Following Document 02 Architecture Guide - Interaction state management
 */

import { useState, useCallback } from 'react';
import type { SquareNotation } from '../../types';

export interface ChessInteractionHook {
  selectedSquare: SquareNotation | null;
  validMoves: SquareNotation[];
  selectSquare: (square: SquareNotation) => void;
  clearSelection: () => void;
  isSquareSelected: (square: SquareNotation) => boolean;
}

/**
 * Manage chess interaction state (selection, valid moves)
 * Hook only manages React state - business logic delegated to services
 */
export function useChessInteraction(): ChessInteractionHook {
  const [selectedSquare, setSelectedSquare] = useState<SquareNotation | null>(null);
  const [validMoves, setValidMoves] = useState<SquareNotation[]>([]);

  const selectSquare = useCallback((square: SquareNotation) => {
    setSelectedSquare(square);
    
    // POC: Simple valid moves - in full implementation would use MoveValidationService
    // For now, just highlight a few squares as examples
    const mockValidMoves: SquareNotation[] = [];
    if (square === 'e2') mockValidMoves.push('e3', 'e4');
    if (square === 'g1') mockValidMoves.push('f3', 'h3');
    if (square === 'b1') mockValidMoves.push('a3', 'c3');
    
    setValidMoves(mockValidMoves);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedSquare(null);
    setValidMoves([]);
  }, []);

  const isSquareSelected = useCallback((square: SquareNotation) => {
    return selectedSquare === square;
  }, [selectedSquare]);

  return {
    selectedSquare,
    validMoves,
    selectSquare,
    clearSelection,
    isSquareSelected
  };
}