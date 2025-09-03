// useChessGame.ts - Main chess game state management
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChessGameService } from '../services/ChessGameService';
import type { ChessGameState, ChessMoveInput, PieceType } from '../types';

export interface UseChessGameHook {
  gameState: ChessGameState | null;
  isLoading: boolean;
  makeMove: (from: string, to: string, promotion?: PieceType, onMoveCallback?: (move: any) => void) => Promise<boolean>;
  undoMove: () => boolean;
  resetGame: (fen?: string) => void;
  getValidMoves: (square?: string) => string[];
  getValidTargetSquares: (square: string) => string[];
  isGameOver: boolean;
  error: string | null;
}

export const useChessGame = (initialFen?: string): UseChessGameHook => {
  const [gameState, setGameState] = useState<ChessGameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const gameServiceRef = useRef<ChessGameService | undefined>(undefined);

  // Initialize game service
  useEffect(() => {
    try {
      gameServiceRef.current = new ChessGameService(initialFen);
      setGameState(gameServiceRef.current.getCurrentState());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize game');
    } finally {
      setIsLoading(false);
    }
  }, [initialFen]);

  const makeMove = useCallback(async (
    from: string, 
    to: string, 
    promotion?: PieceType,
    onMoveCallback?: (move: any) => void
  ): Promise<boolean> => {
    if (!gameServiceRef.current) {
      setError('Game not initialized');
      return false;
    }

    try {
      setError(null);
      const moveInput: ChessMoveInput = { from, to, promotion };
      const result = gameServiceRef.current.makeMove(moveInput);
      
      if (result.success) {
        setGameState(result.gameState);
        // Call the onMove callback with the move data and game state
        if (result.move && onMoveCallback) {
          // Pass an enhanced move object that includes the current FEN
          onMoveCallback({
            ...result.move,
            fen: result.gameState.fen,
            gameState: result.gameState
          });
        }
        return true;
      } else {
        console.log('❌ [CHESS_GAME] Move failed:', result.error);
        setError(result.error || 'Invalid move');
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Move failed';
      console.error('💥 [CHESS_GAME] Exception in makeMove:', errorMessage);
      setError(errorMessage);
      return false;
    }
  }, []);

  const undoMove = useCallback((): boolean => {
    if (!gameServiceRef.current) {
      setError('Game not initialized');
      return false;
    }

    try {
      setError(null);
      const success = gameServiceRef.current.undoLastMove();
      
      if (success) {
        setGameState(gameServiceRef.current.getCurrentState());
        return true;
      }
      
      return false;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Undo failed');
      return false;
    }
  }, []);

  const resetGame = useCallback((fen?: string): void => {
    if (!gameServiceRef.current) {
      return;
    }

    try {
      setError(null);
      gameServiceRef.current.resetGame(fen);
      setGameState(gameServiceRef.current.getCurrentState());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Reset failed');
    }
  }, []);

  const getValidMoves = useCallback((square?: string): string[] => {
    if (!gameServiceRef.current) {
      return [];
    }

    try {
      return gameServiceRef.current.getValidMoves(square);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get valid moves');
      return [];
    }
  }, []);

  const getValidTargetSquares = useCallback((square: string): string[] => {
    if (!gameServiceRef.current) {
      return [];
    }

    try {
      return gameServiceRef.current.getValidTargetSquares(square);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get valid target squares');
      return [];
    }
  }, []);

  return {
    gameState,
    isLoading,
    makeMove,
    undoMove,
    resetGame,
    getValidMoves,
    getValidTargetSquares,
    isGameOver: gameState?.isGameOver || false,
    error
  };
};