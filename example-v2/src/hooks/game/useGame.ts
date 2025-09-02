// Game hooks - provide chess game state and actions to components
import { useGameStore } from '@/stores/gameStore';
import { useCallback } from 'react';
import type { GameConfig, ChessMoveInput } from '@/types';

/**
 * Main game hook - provides complete game state and actions
 */
export const useGame = () => {
  const gameState = useGameStore();

  return {
    // Game state
    game: gameState.game,
    currentFen: gameState.currentFen,
    gameId: gameState.gameId,
    gameResult: gameState.gameResult,
    gameStatus: gameState.gameStatus,
    playerColor: gameState.playerColor,
    isPlayerTurn: gameState.isPlayerTurn,
    
    // Move state
    moves: gameState.moves,
    moveHistory: gameState.moveHistory,
    currentMoveIndex: gameState.currentMoveIndex,
    lastMove: gameState.lastMove,
    
    // Configuration
    aiLevel: gameState.aiLevel,
    timeControl: gameState.timeControl,
    
    // UI state
    isThinking: gameState.isThinking,
    isLoading: gameState.isLoading,
    error: gameState.error,
    
    // Statistics
    totalGames: gameState.totalGames,
    wins: gameState.wins,
    losses: gameState.losses,
    draws: gameState.draws,
    
    // Actions
    createGame: gameState.createGame,
    makeMove: gameState.makeMove,
    resetGame: gameState.resetGame,
    resignGame: gameState.resignGame,
    offerDraw: gameState.offerDraw,
    clearError: gameState.clearError,
    updateGameStats: gameState.updateGameStats
  };
};

/**
 * Game creation hook - focused on game setup
 */
export const useGameCreation = () => {
  const { createGame, isLoading, error, clearError, gameStatus } = useGameStore();

  const createNewGame = useCallback(async (config: GameConfig) => {
    return await createGame(config);
  }, [createGame]);

  return {
    createGame: createNewGame,
    isLoading,
    error,
    clearError,
    gameStatus,
    isGameActive: gameStatus === 'active'
  };
};

/**
 * Move handling hook - focused on move operations
 */
export const useGameMoves = () => {
  const {
    makeMove,
    undoMove,
    redoMove,
    goToMove,
    goToStart,
    goToEnd,
    currentMoveIndex,
    moves,
    moveHistory,
    lastMove,
    isPlayerTurn,
    isThinking,
    error,
    clearError
  } = useGameStore();

  const handleMove = useCallback(async (move: ChessMoveInput) => {
    return await makeMove(move);
  }, [makeMove]);

  return {
    // Move actions
    makeMove: handleMove,
    undoMove,
    redoMove,
    goToMove,
    goToStart,
    goToEnd,
    
    // Move state
    currentMoveIndex,
    moves,
    moveHistory,
    lastMove,
    canUndo: currentMoveIndex >= 0,
    canRedo: currentMoveIndex < moves.length - 1,
    
    // Turn state
    isPlayerTurn,
    isThinking,
    
    // Error handling
    error,
    clearError
  };
};

/**
 * Game navigation hook - for move history navigation
 */
export const useGameNavigation = () => {
  const {
    goToMove,
    goToStart,
    goToEnd,
    currentMoveIndex,
    moves,
    moveHistory
  } = useGameStore();

  return {
    goToMove,
    goToStart,
    goToEnd,
    currentMoveIndex,
    totalMoves: moves.length,
    moveHistory,
    canGoBack: currentMoveIndex >= 0,
    canGoForward: currentMoveIndex < moves.length - 1,
    isAtStart: currentMoveIndex === -1,
    isAtEnd: currentMoveIndex === moves.length - 1
  };
};

/**
 * Game analysis hook - for position analysis features
 */
export const useGameAnalysis = () => {
  const {
    analyzePosition,
    getBestMove,
    currentFen,
    game
  } = useGameStore();

  const analyze = useCallback(async () => {
    return await analyzePosition();
  }, [analyzePosition]);

  const getBest = useCallback(async () => {
    return await getBestMove();
  }, [getBestMove]);

  return {
    analyzePosition: analyze,
    getBestMove: getBest,
    currentFen,
    canAnalyze: !!game && game.moves().length > 0
  };
};

/**
 * Game statistics hook - for player stats
 */
export const useGameStats = () => {
  const {
    totalGames,
    wins,
    losses,
    draws,
    updateGameStats
  } = useGameStore();

  const winRate = totalGames > 0 ? (wins / totalGames * 100).toFixed(1) : '0.0';
  const drawRate = totalGames > 0 ? (draws / totalGames * 100).toFixed(1) : '0.0';

  return {
    totalGames,
    wins,
    losses,
    draws,
    winRate: `${winRate}%`,
    drawRate: `${drawRate}%`,
    updateStats: updateGameStats
  };
};

/**
 * Game status hook - for game state information
 */
export const useGameStatus = () => {
  const {
    gameStatus,
    gameResult,
    playerColor,
    isPlayerTurn,
    gameId
  } = useGameStore();

  return {
    gameStatus,
    gameResult,
    playerColor,
    isPlayerTurn,
    gameId,
    isGameActive: gameStatus === 'active',
    isGameSetup: gameStatus === 'setup',
    isGameFinished: ['checkmate', 'stalemate', 'draw', 'resigned', 'timeout'].includes(gameStatus)
  };
};