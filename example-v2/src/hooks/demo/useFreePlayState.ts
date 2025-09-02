/**
 * Free Play State Hook
 * SRP: Manages chess.js game state for free play demo
 * Provides chess game functionality without backend dependencies
 */

import { useState, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import type { FreePlayGameState, DemoError } from '@/types/demo/freeplay.types';
import { INITIAL_FEN } from '@/constants/demo/chessboard-demo.constants';

/**
 * Hook options interface
 */
export interface UseFreePlayStateOptions {
  initialFen?: string;
  onGameChange?: (gameState: FreePlayGameState) => void;
  onError?: (error: DemoError) => void;
}

/**
 * Hook return interface
 */
export interface UseFreePlayStateReturn {
  gameState: FreePlayGameState;
  makeMove: (move: string) => boolean;
  resetGame: () => void;
  flipBoard: () => void;
  newGame: () => void;
  loadPosition: (fen: string) => boolean;
  isLoading: boolean;
  error: DemoError | null;
}

/**
 * Creates a game state object from Chess instance
 */
function createGameState(chess: Chess): FreePlayGameState {
  const history = chess.history({ verbose: true });
  const lastMove = history.length > 0 ? history[history.length - 1] : null;
  
  return {
    chess,
    currentFen: chess.fen(),
    isGameOver: chess.isGameOver(),
    isCheck: chess.isCheck(),
    isCheckmate: chess.isCheckmate(),
    isStalemate: chess.isStalemate(),
    isDraw: chess.isDraw(),
    turn: chess.turn() === 'w' ? 'white' : 'black',
    moveCount: Math.floor(chess.moveNumber()),
    capturedPieces: {
      white: [], // TODO: Calculate from history if needed
      black: []  // TODO: Calculate from history if needed
    },
    lastMove: lastMove ? `${lastMove.from}${lastMove.to}` : null,
    gameResult: chess.isGameOver() ? 
      (chess.isCheckmate() ? `${chess.turn() === 'w' ? 'Black' : 'White'} wins by checkmate` :
       chess.isStalemate() ? 'Draw by stalemate' :
       chess.isDraw() ? 'Draw' : 'Game over') : null
  };
}

/**
 * Creates a demo error
 */
function createDemoError(type: DemoError['type'], message: string, context?: Record<string, any>): DemoError {
  return {
    type,
    message,
    timestamp: Date.now(),
    context
  };
}

/**
 * Free Play State Hook
 * Manages chess game state using chess.js for frontend-only gameplay
 */
export function useFreePlayState(options: UseFreePlayStateOptions = {}): UseFreePlayStateReturn {
  const {
    initialFen = INITIAL_FEN,
    onGameChange,
    onError
  } = options;

  // Initialize chess instance
  const [chess] = useState(() => {
    try {
      const instance = new Chess(initialFen);
      return instance;
    } catch (error) {
      const instance = new Chess(INITIAL_FEN);
      onError?.(createDemoError('invalid_fen', `Invalid initial FEN: ${initialFen}`, { initialFen, error }));
      return instance;
    }
  });

  const [boardOrientation, setBoardOrientation] = useState<'white' | 'black'>('white');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<DemoError | null>(null);

  // Create current game state
  const gameState = useMemo(() => createGameState(chess), [chess]);

  // Clear error helper
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Handle errors
  const handleError = useCallback((newError: DemoError) => {
    setError(newError);
    onError?.(newError);
  }, [onError]);

  // Make a move
  const makeMove = useCallback((move: string) => {
    clearError();
    
    if (chess.isGameOver()) {
      handleError(createDemoError('game_over', 'Cannot make move: game is already finished'));
      return false;
    }

    try {
      const result = chess.move(move);
      if (result) {
        const newGameState = createGameState(chess);
        onGameChange?.(newGameState);
        return true;
      } else {
        handleError(createDemoError('invalid_move', `Invalid move: ${move}`, { move }));
        return false;
      }
    } catch (error) {
      handleError(createDemoError('invalid_move', `Move error: ${error instanceof Error ? error.message : 'Unknown error'}`, { move, error }));
      return false;
    }
  }, [chess, onGameChange, clearError, handleError]);

  // Reset to initial position
  const resetGame = useCallback(() => {
    clearError();
    setIsLoading(true);
    
    try {
      chess.reset();
      const newGameState = createGameState(chess);
      onGameChange?.(newGameState);
    } catch (error) {
      handleError(createDemoError('invalid_fen', `Reset error: ${error instanceof Error ? error.message : 'Unknown error'}`, { error }));
    } finally {
      setIsLoading(false);
    }
  }, [chess, onGameChange, clearError, handleError]);

  // Start new game (same as reset for free play)
  const newGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  // Flip board orientation
  const flipBoard = useCallback(() => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white');
  }, []);

  // Load specific position from FEN
  const loadPosition = useCallback((fen: string) => {
    clearError();
    setIsLoading(true);
    
    try {
      // chess.load() returns void but throws on invalid FEN
      chess.load(fen);
      const newGameState = createGameState(chess);
      onGameChange?.(newGameState);
      return true;
    } catch (error) {
      handleError(createDemoError('invalid_fen', `FEN load error: ${error instanceof Error ? error.message : 'Unknown error'}`, { fen, error }));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [chess, onGameChange, clearError, handleError]);

  return {
    gameState: {
      ...gameState,
      // Override board orientation from state
      turn: gameState.turn
    },
    makeMove,
    resetGame,
    flipBoard,
    newGame,
    loadPosition,
    isLoading,
    error
  };
}