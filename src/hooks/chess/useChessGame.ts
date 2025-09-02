/**
 * Chess Game Hook
 * Main hook for managing chess game state
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  ChessGameConfig,
  ChessGameHook,
  ChessGameState,
  ChessMoveInput,
  ChessPiece,
  ChessPosition,
  SquareNotation
} from '../../types';
import { ChessGameService } from '../../services/chess';
import { positionToSquareNotation } from '../../utils';

/**
 * Hook for managing chess game state and operations
 */
export function useChessGame(config: ChessGameConfig = {}): ChessGameHook {
  const [gameService] = useState(() => new ChessGameService(config.initialFen));
  const [gameState, setGameState] = useState<ChessGameState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize game state
  useEffect(() => {
    try {
      const state = gameService.getGameState();
      setGameState(state);
      setIsLoading(false);
      config.onGameChange?.(state);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize game';
      setError(errorMessage);
      setIsLoading(false);
      config.onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [config.initialFen]);
  
  /**
   * Make a move
   */
  const makeMove = useCallback(async (move: ChessMoveInput): Promise<boolean> => {
    if (!gameState) return false;
    
    try {
      setError(null);
      
      // Call external onMove handler first if provided
      if (config.onMove) {
        const allowed = await config.onMove(move);
        if (!allowed) return false;
      }
      
      // Validate and make the move
      const result = gameService.makeMove(move);
      
      if (!result.isValid) {
        if (config.validateMoves !== false) {
          setError(result.error || 'Invalid move');
          return false;
        }
      }
      
      // Update game state
      const newState = gameService.getGameState();
      setGameState(newState);
      config.onGameChange?.(newState);
      
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Move failed';
      setError(errorMessage);
      config.onError?.(err instanceof Error ? err : new Error(errorMessage));
      return false;
    }
  }, [gameState, config]);
  
  /**
   * Undo last move
   */
  const undoMove = useCallback((): boolean => {
    if (!gameState || !config.enableUndo) return false;
    
    try {
      const success = gameService.undoMove();
      if (success) {
        const newState = gameService.getGameState();
        setGameState(newState);
        config.onGameChange?.(newState);
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Undo failed';
      setError(errorMessage);
      config.onError?.(err instanceof Error ? err : new Error(errorMessage));
      return false;
    }
  }, [gameState, config]);
  
  /**
   * Reset game
   */
  const resetGame = useCallback((fen?: string): void => {
    try {
      gameService.reset(fen);
      const newState = gameService.getGameState();
      setGameState(newState);
      setError(null);
      config.onGameChange?.(newState);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Reset failed';
      setError(errorMessage);
      config.onError?.(err instanceof Error ? err : new Error(errorMessage));
    }
  }, [config]);
  
  /**
   * Get valid moves for a square
   */
  const getValidMoves = useCallback((square: SquareNotation): SquareNotation[] => {
    try {
      return gameService.getValidMoves(square);
    } catch {
      return [];
    }
  }, [gameService]);
  
  /**
   * Get valid moves for a piece at a position
   */
  const getValidMovesForPiece = useCallback((piece: ChessPiece, position: ChessPosition): SquareNotation[] => {
    const square = positionToSquareNotation(position);
    return getValidMoves(square);
  }, [getValidMoves]);
  
  /**
   * Check if square is under attack
   */
  const isSquareAttacked = useCallback((square: SquareNotation, byColor: 'white' | 'black'): boolean => {
    try {
      return gameService.isSquareAttacked(square, byColor);
    } catch {
      return false;
    }
  }, [gameService]);
  
  return {
    gameState,
    isLoading,
    error,
    makeMove,
    undoMove,
    resetGame,
    getValidMoves,
    getValidMovesForPiece,
    isSquareAttacked
  };
}