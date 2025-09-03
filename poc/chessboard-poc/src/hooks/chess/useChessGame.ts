/**
 * useChessGame Hook
 * Following Document 02 Architecture Guide - Hooks manage React state, delegate business logic to services
 */

import { useState, useEffect, useCallback } from 'react';
import type { ChessGameState, ChessMoveInput } from '../../types';
import { parseFenPosition, createInitialPosition } from '../../utils';

export interface ChessGameHook {
  gameState: ChessGameState | null;
  isLoading: boolean;
  makeMove: (move: ChessMoveInput) => Promise<boolean>;
  resetGame: (fen?: string) => void;
  isGameOver: boolean;
}

/**
 * Chess game hook - manages React state only
 * Business logic will be delegated to services layer (not implemented in POC)
 */
export function useChessGame(initialFen?: string): ChessGameHook {
  const [gameState, setGameState] = useState<ChessGameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize game state
  useEffect(() => {
    try {
      const position = initialFen ? parseFenPosition(initialFen) : createInitialPosition();
      setGameState({
        fen: initialFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        position,
        activeColor: 'w',
        isCheck: false,
        isCheckmate: false,
        isStalemate: false,
        isDraw: false,
        moveHistory: []
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to initialize game:', error);
      setIsLoading(false);
    }
  }, [initialFen]);

  // Simple move function - in full implementation this would use ChessGameService
  const makeMove = useCallback(async (move: ChessMoveInput): Promise<boolean> => {
    if (!gameState) return false;
    
    // POC: Simple move simulation - just move the piece if it exists
    const fromPiece = gameState.position.get(move.from);
    if (!fromPiece) return false;

    const newPosition = new Map(gameState.position);
    newPosition.delete(move.from);
    newPosition.set(move.to, fromPiece);

    setGameState(prev => prev ? {
      ...prev,
      position: newPosition,
      activeColor: prev.activeColor === 'w' ? 'b' : 'w',
      moveHistory: [...prev.moveHistory, {
        from: move.from,
        to: move.to,
        piece: fromPiece,
        isPromotion: false
      }]
    } : null);

    return true;
  }, [gameState]);

  const resetGame = useCallback((fen?: string) => {
    const position = fen ? parseFenPosition(fen) : createInitialPosition();
    setGameState({
      fen: fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      position,
      activeColor: 'w',
      isCheck: false,
      isCheckmate: false,
      isStalemate: false,
      isDraw: false,
      moveHistory: []
    });
  }, []);

  return {
    gameState,
    isLoading,
    makeMove,
    resetGame,
    isGameOver: gameState?.isCheckmate || gameState?.isStalemate || false
  };
}