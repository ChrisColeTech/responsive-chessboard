/**
 * VS Computer State Hook
 * Domain: Demo - VS Computer game state management
 * Architecture: Data layer - manages complete game state and interactions
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { Chess, Square } from 'chess.js';

import type { 
  VSComputerGameState, 
  VSComputerSettings,
  VSComputerError,
  UseVSComputerStateOptions,
  UseVSComputerStateReturn 
} from '../../types/demo/vs-computer.types';

import type { ComputerDifficulty } from '../../types/chess/computer-opponent.types';

import { ComputerChessService } from '../../services/chess/ComputerChessService';
import { getStockfishClient } from '../../services/clients/StockfishClient';

export function useVSComputerState(
  options: UseVSComputerStateOptions = {}
): UseVSComputerStateReturn {
  const { onError, initialSettings, onGameEnd, onMove } = options;

  // Core game state
  const [chess] = useState(() => new Chess());
  const [settings, setSettings] = useState<VSComputerSettings>(() => 
    ComputerChessService.validateSettings(initialSettings || {}) as VSComputerSettings
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<VSComputerError | null>(null);

  // UI state
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<{ from: string; to: string; promotion?: string } | null>(null);

  // Computer opponent state
  const [isComputerThinking, setIsComputerThinking] = useState(false);
  const [computerThinkingTime, setComputerThinkingTime] = useState(0);
  const [computerPlayer, setComputerPlayer] = useState(() =>
    ComputerChessService.createComputerPlayer(settings.difficulty)
  );

  // Timer state
  const [timer, setTimer] = useState(() =>
    ComputerChessService.createTimerState(
      settings.timeControl.minutes,
      settings.timeControl.increment
    )
  );

  // Game status
  const [gameStatus, setGameStatus] = useState<VSComputerGameState['gameStatus']>('playing');
  const [winner, setWinner] = useState<'human' | 'computer' | 'draw' | undefined>(undefined);
  const [gameResult, setGameResult] = useState<string | undefined>(undefined);

  // Refs for intervals and async operations
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const computerMoveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const thinkingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Derived state
  const currentPlayer = chess.turn() === 'w' ? 'white' : 'black';
  const isGameOver = chess.isGameOver();
  const isPlayerTurn = currentPlayer === settings.playerColor && !isGameOver;
  const canMakeMove = isPlayerTurn && !isComputerThinking && !isLoading;
  const validMoves = selectedSquare ? chess.moves({ square: selectedSquare as Square, verbose: true }).map(m => m.to) : [];

  // Create complete game state
  const gameState: VSComputerGameState = {
    chess,
    playerColor: settings.playerColor,
    computerDifficulty: settings.difficulty,
    computerMoveStatus: isComputerThinking ? 'thinking' : 'idle',
    isComputerThinking,
    computerThinkingTime,
    gameStatus,
    currentPlayer,
    isGameOver,
    winner,
    gameResult,
    selectedSquare,
    validMoves,
    lastMove,
    moveHistory: chess.history(),
    isCheck: chess.inCheck(),
    isCheckmate: chess.isCheckmate(),
    isStalemate: chess.isStalemate(),
    isDraw: chess.isDraw(),
    timer,
    computerPlayer
  };

  /**
   * Handle errors with optional user callback
   */
  const handleError = useCallback((errorData: VSComputerError) => {
    setError(errorData);
    onError?.(errorData);
    console.error('VS Computer error:', errorData);
  }, [onError]);

  /**
   * Update timer every second when active
   */
  useEffect(() => {
    if (timer.isRunning && !isGameOver) {
      timerIntervalRef.current = setInterval(() => {
        setTimer(prevTimer => {
          const timeSpent = 1000; // 1 second
          const newTimer = ComputerChessService.updateTimerForMove(
            prevTimer,
            prevTimer.activeColor,
            timeSpent
          );

          // Check for timeout
          if (ComputerChessService.isTimeExpired(newTimer, newTimer.activeColor)) {
            endGameByTimeout(newTimer.activeColor);
          }

          return newTimer;
        });
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [timer.isRunning, isGameOver]);

  /**
   * End game due to timeout
   */
  const endGameByTimeout = useCallback((timeoutColor: 'white' | 'black') => {
    const humanWins = timeoutColor !== settings.playerColor;
    const winner = humanWins ? 'human' : 'computer';
    const result = ComputerChessService.getGameResultMessage(winner, 'timeout');
    
    setGameStatus('timeout');
    setWinner(winner);
    setGameResult(result);
    setTimer(prev => ({ ...prev, isRunning: false }));
    
    onGameEnd?.({ winner, reason: result });
  }, [settings.playerColor, onGameEnd]);

  /**
   * Start computer thinking animation
   */
  const startComputerThinking = useCallback(() => {
    setIsComputerThinking(true);
    setComputerThinkingTime(0);
    setComputerPlayer(prev => ({ ...prev, isThinking: true }));

    // Update thinking time every 100ms
    thinkingIntervalRef.current = setInterval(() => {
      setComputerThinkingTime(prev => prev + 100);
      setComputerPlayer(prev => ({ ...prev, thinkingTime: prev.thinkingTime + 100 }));
    }, 100);
  }, []);

  /**
   * Stop computer thinking animation
   */
  const stopComputerThinking = useCallback(() => {
    setIsComputerThinking(false);
    setComputerPlayer(prev => ({ ...prev, isThinking: false }));

    if (thinkingIntervalRef.current) {
      clearInterval(thinkingIntervalRef.current);
    }
  }, []);

  /**
   * Make a move on the board
   */
  const makeMove = useCallback(async (from: string, to: string, promotion?: string): Promise<boolean> => {
    if (!canMakeMove) return false;

    try {
      const moveOptions: any = { from, to };
      if (promotion) {
        moveOptions.promotion = promotion;
      }

      const move = chess.move(moveOptions);
      if (!move) return false;

      // Update UI state
      setLastMove({ from, to, promotion });
      setSelectedSquare(null);

      // Update timer
      setTimer(prev => ComputerChessService.updateTimerForMove(prev, settings.playerColor, 0));

      // Check for game end
      if (chess.isGameOver()) {
        handleGameEnd();
        return true;
      }

      // Trigger move callback
      onMove?.({ from, to, san: move.san });

      // If it's now computer's turn, make computer move
      // Check whose turn it is AFTER the move was made
      const newCurrentPlayer = chess.turn() === 'w' ? 'white' : 'black';
      console.log('After move - newCurrentPlayer:', newCurrentPlayer, 'settings.playerColor:', settings.playerColor);
      if (newCurrentPlayer !== settings.playerColor) {
        console.log('Triggering computer move...');
        await makeComputerMove();
      } else {
        console.log('Still player turn, not triggering computer move');
      }

      return true;
    } catch (error) {
      handleError({
        type: 'invalid_move',
        message: `Invalid move: ${from} to ${to}`,
        context: { move: `${from}${to}${promotion || ''}` }
      });
      return false;
    }
  }, [canMakeMove, chess, settings.playerColor, currentPlayer, onMove]);

  /**
   * Make computer move
   */
  const makeComputerMove = useCallback(async () => {
    if (isComputerThinking || isGameOver) return;

    try {
      startComputerThinking();
      
      // Calculate thinking time
      const thinkingTime = ComputerChessService.calculateComputerThinkingTime(
        settings.difficulty,
        chess.fen(),
        chess.history().length
      );

      // Request move from Stockfish
      const stockfish = getStockfishClient();
      const moveResult = await stockfish.requestMove({
        fen: chess.fen(),
        difficulty: settings.difficulty,
        timeLimit: thinkingTime
      });

      if (!moveResult.success || !moveResult.move) {
        throw new Error(moveResult.error || 'Failed to get computer move');
      }

      // Wait for minimum thinking time for better UX
      const actualThinkingTime = Date.now() - computerThinkingTime;
      const remainingTime = Math.max(0, thinkingTime - actualThinkingTime);
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      stopComputerThinking();

      // Parse and make the move
      const { from, to, promotion } = require('../../utils/chess/computer-chess.utils').parseUCIMove(moveResult.move);
      
      const moveOptions: any = { from, to };
      if (promotion) {
        moveOptions.promotion = promotion;
      }

      const move = chess.move(moveOptions);
      if (!move) {
        throw new Error('Invalid move returned by computer');
      }

      // Update state
      setLastMove({ from, to, promotion });
      setComputerPlayer(prev => ({
        ...prev,
        lastEvaluation: moveResult.evaluation,
        searchDepth: moveResult.depth
      }));

      // Update timer
      setTimer(prev => ComputerChessService.updateTimerForMove(prev, 
        settings.playerColor === 'white' ? 'black' : 'white', 
        moveResult.thinkingTime
      ));

      // Check for game end
      if (chess.isGameOver()) {
        handleGameEnd();
      }

      // Trigger move callback
      onMove?.({ from, to, san: move.san });

    } catch (error) {
      stopComputerThinking();
      handleError({
        type: 'move_generation_failed',
        message: error instanceof Error ? error.message : 'Computer move failed',
        context: { fen: chess.fen() }
      });
    }
  }, [isComputerThinking, isGameOver, settings.difficulty, settings.playerColor, chess, computerThinkingTime, startComputerThinking, stopComputerThinking, onMove]);

  /**
   * Handle game end scenarios
   */
  const handleGameEnd = useCallback(() => {
    let winner: 'human' | 'computer' | 'draw';
    let reason: 'checkmate' | 'stalemate' | 'repetition' | 'fifty_moves' | 'insufficient_material';

    if (chess.isCheckmate()) {
      winner = currentPlayer === settings.playerColor ? 'computer' : 'human';
      reason = 'checkmate';
      setGameStatus('checkmate');
    } else if (chess.isStalemate()) {
      winner = 'draw';
      reason = 'stalemate';
      setGameStatus('stalemate');
    } else if (chess.isThreefoldRepetition()) {
      winner = 'draw';
      reason = 'repetition';
      setGameStatus('draw');
    } else if (chess.isDraw()) {
      winner = 'draw';
      reason = chess.isInsufficientMaterial() ? 'insufficient_material' : 'fifty_moves';
      setGameStatus('draw');
    } else {
      return; // Game is not actually over
    }

    const result = ComputerChessService.getGameResultMessage(winner, reason);
    
    setWinner(winner);
    setGameResult(result);
    setTimer(prev => ({ ...prev, isRunning: false }));
    
    onGameEnd?.({ winner, reason: result });
  }, [chess, currentPlayer, settings.playerColor, onGameEnd]);

  /**
   * Start a new game
   */
  const newGame = useCallback((playerColor?: 'white' | 'black') => {
    chess.reset();
    
    const newSettings = playerColor ? { ...settings, playerColor } : settings;
    setSettings(newSettings);
    
    // Reset state
    setSelectedSquare(null);
    setLastMove(null);
    setGameStatus('playing');
    setWinner(undefined);
    setGameResult(undefined);
    setError(null);
    
    // Reset computer player
    setComputerPlayer(ComputerChessService.createComputerPlayer(newSettings.difficulty));
    
    // Reset and start timer
    const newTimer = ComputerChessService.createTimerState(
      newSettings.timeControl.minutes,
      newSettings.timeControl.increment
    );
    setTimer({ ...newTimer, isRunning: true });
    
    // If computer goes first, make computer move
    if (newSettings.playerColor === 'black') {
      setTimeout(() => makeComputerMove(), 500);
    }
  }, [chess, settings, makeComputerMove]);

  /**
   * Resign the game
   */
  const resignGame = useCallback(() => {
    const result = ComputerChessService.getGameResultMessage('computer', 'resignation');
    setGameStatus('resigned');
    setWinner('computer');
    setGameResult(result);
    setTimer(prev => ({ ...prev, isRunning: false }));
    onGameEnd?.({ winner: 'computer', reason: result });
  }, [onGameEnd]);

  /**
   * Offer a draw (auto-accepted for demo)
   */
  const offerDraw = useCallback(() => {
    const result = ComputerChessService.getGameResultMessage('draw', 'agreement');
    setGameStatus('draw');
    setWinner('draw');
    setGameResult(result);
    setTimer(prev => ({ ...prev, isRunning: false }));
    onGameEnd?.({ winner: 'draw', reason: result });
  }, [onGameEnd]);

  /**
   * Flip the board (change player color)
   */
  const flipBoard = useCallback(() => {
    const newColor = settings.playerColor === 'white' ? 'black' : 'white';
    newGame(newColor);
  }, [settings.playerColor, newGame]);

  /**
   * Select a square on the board
   */
  const selectSquare = useCallback((square: Square) => {
    if (!canMakeMove) return;

    // If clicking on selected square, deselect
    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    // If we have a selected square and this is a valid move, make the move
    if (selectedSquare && validMoves.includes(square)) {
      makeMove(selectedSquare, square);
      return;
    }

    // Select the square if it has a piece we can move
    const piece = chess.get(square as Square);
    if (piece && ((piece.color === 'w' && settings.playerColor === 'white') || 
                  (piece.color === 'b' && settings.playerColor === 'black'))) {
      setSelectedSquare(square);
    } else {
      setSelectedSquare(null);
    }
  }, [canMakeMove, selectedSquare, validMoves, makeMove, chess, settings.playerColor]);

  /**
   * Get square highlights for the board
   */
  const getSquareHighlights = useCallback(() => {
    const highlights: { [square: string]: 'selected' | 'valid' | 'lastMove' } = {};

    if (selectedSquare) {
      highlights[selectedSquare] = 'selected';
      validMoves.forEach(square => {
        highlights[square] = 'valid';
      });
    }

    if (lastMove) {
      highlights[lastMove.from] = 'lastMove';
      highlights[lastMove.to] = 'lastMove';
    }

    return highlights;
  }, [selectedSquare, validMoves, lastMove]);

  /**
   * Set difficulty level
   */
  const setDifficulty = useCallback((difficulty: ComputerDifficulty) => {
    const newSettings = { ...settings, difficulty };
    setSettings(newSettings);
    setComputerPlayer(ComputerChessService.createComputerPlayer(difficulty));
  }, [settings]);

  /**
   * Set player color
   */
  const setPlayerColor = useCallback((color: 'white' | 'black') => {
    newGame(color);
  }, [newGame]);

  /**
   * Update settings
   */
  const updateSettings = useCallback((newSettings: Partial<VSComputerSettings>) => {
    const validatedSettings = ComputerChessService.validateSettings({ ...settings, ...newSettings }) as VSComputerSettings;
    setSettings(validatedSettings);
    
    // Update computer player if difficulty changed
    if (newSettings.difficulty && newSettings.difficulty !== settings.difficulty) {
      setComputerPlayer(ComputerChessService.createComputerPlayer(validatedSettings.difficulty));
    }
  }, [settings]);

  /**
   * Display utilities for UI
   */
  const formatTime = useCallback((timeMs: number): string => {
    const minutes = Math.floor(timeMs / 60000);
    const seconds = Math.floor((timeMs % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getComputerStatus = useCallback(() => {
    if (gameState.isComputerThinking) return 'Thinking...';
    if (gameState.currentPlayer !== settings.playerColor && gameState.gameStatus === 'playing') return 'Ready to move';
    return 'Ready';
  }, [gameState.isComputerThinking, gameState.currentPlayer, gameState.gameStatus, settings.playerColor]);

  const getHumanStatus = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return 'Game Over';
    if (isPlayerTurn) return 'Your Turn';
    return 'Waiting';
  }, [gameState.gameStatus, isPlayerTurn]);

  const getOpeningName = useCallback(() => {
    const moveCount = Math.ceil(gameState.moveHistory.length / 2);
    if (moveCount < 3) return 'Opening';
    // Simple opening detection based on first few moves
    const history = gameState.moveHistory.slice(0, 6).join(' ');
    if (history.includes('e4 e5 Nf3 Nc6 Bb5')) return 'Ruy Lopez';
    if (history.includes('d4 d5')) return "Queen's Gambit";
    if (history.includes('e4 c5')) return 'Sicilian Defense';
    if (history.includes('e4 e6')) return 'French Defense';
    return 'Opening';
  }, [gameState.moveHistory]);

  const getRecentMoves = useCallback(() => {
    const recent = gameState.moveHistory.slice(-6);
    if (recent.length === 0) return 'No moves yet';
    
    let moveString = '';
    for (let i = 0; i < recent.length; i += 2) {
      const moveNum = Math.ceil((gameState.moveHistory.length - recent.length + i) / 2) + 1;
      moveString += `${moveNum}. ${recent[i]}`;
      if (recent[i + 1]) moveString += ` ${recent[i + 1]} `;
    }
    return moveString.trim();
  }, [gameState.moveHistory]);

  // Initialize game on mount
  useEffect(() => {
    newGame();
    
    return () => {
      // Cleanup intervals
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (thinkingIntervalRef.current) clearInterval(thinkingIntervalRef.current);
      if (computerMoveTimeoutRef.current) clearTimeout(computerMoveTimeoutRef.current);
    };
  }, []);

  return {
    gameState,
    settings,
    isLoading,
    error,
    makeMove,
    newGame,
    resignGame,
    offerDraw,
    flipBoard,
    setDifficulty,
    setPlayerColor,
    updateSettings,
    selectSquare,
    getSquareHighlights,
    isPlayerTurn,
    canMakeMove,
    // Display utilities
    formatTime,
    getComputerStatus,
    getHumanStatus,
    getOpeningName,
    getRecentMoves
  };
}