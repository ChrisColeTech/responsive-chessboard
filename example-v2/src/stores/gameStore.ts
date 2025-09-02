// Game store - manages chess game state, moves, and AI integration  
import { create } from 'zustand';
import { Chess } from 'chess.js';
import type { 
  GameConfig, 
  GameResult, 
  MoveResult, 
  ChessMoveInput,
  GameStatus,
  User,
  Move
} from '@/types';
import { ChessTrainingAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';

interface GameState {
  // Game state
  game: Chess | null;
  currentFen: string;
  gameId: string | null;
  gameResult: GameResult | null;
  gameStatus: GameStatus;
  playerColor: 'white' | 'black';
  isPlayerTurn: boolean;
  
  // Move history
  moves: Move[];
  moveHistory: string[];
  currentMoveIndex: number;
  
  // Game configuration
  aiLevel: number;
  timeControl: string;
  
  // UI state
  isThinking: boolean;
  isLoading: boolean;
  error: string | null;
  lastMove: { from: string; to: string } | null;
  
  // Statistics
  totalGames: number;
  wins: number;
  losses: number;
  draws: number;
  
  // Actions
  createGame: (config: GameConfig) => Promise<boolean>;
  makeMove: (move: ChessMoveInput) => Promise<boolean>;
  undoMove: () => boolean;
  redoMove: () => boolean;
  resetGame: () => void;
  resignGame: () => Promise<boolean>;
  offerDraw: () => Promise<boolean>;
  
  // Navigation
  goToMove: (moveIndex: number) => void;
  goToStart: () => void;
  goToEnd: () => void;
  
  // Analysis
  analyzePosition: () => Promise<any>;
  getBestMove: () => Promise<{ from: string; to: string; san: string } | null>;
  
  // Game management
  loadGameHistory: () => Promise<void>;
  saveGame: () => Promise<boolean>;
  loadGame: (gameId: string) => Promise<boolean>;
  
  // Utilities
  clearError: () => void;
  updateGameStats: () => Promise<void>;
}

const apiClient = new ChessTrainingAPIClient(httpClient);

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  game: new Chess(),
  currentFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  gameId: null,
  gameResult: null,
  gameStatus: 'setup',
  playerColor: 'white',
  isPlayerTurn: true,
  
  // Move state
  moves: [],
  moveHistory: [],
  currentMoveIndex: -1,
  
  // Configuration
  aiLevel: 1,
  timeControl: '10+0',
  
  // UI state
  isThinking: false,
  isLoading: false,
  error: null,
  lastMove: null,
  
  // Statistics
  totalGames: 0,
  wins: 0,
  losses: 0,
  draws: 0,

  // Game creation
  createGame: async (config: GameConfig) => {
    try {
      set({ isLoading: true, error: null });

      const result = await apiClient.createGame(config);
      
      const newGame = new Chess(result.initialFen);
      
      set({
        game: newGame,
        gameId: result.id,
        gameResult: result,
        currentFen: result.initialFen,
        playerColor: result.playerColor,
        aiLevel: result.aiLevel,
        timeControl: result.timeControl,
        gameStatus: 'active',
        isPlayerTurn: result.playerColor === 'white',
        moves: [],
        moveHistory: [],
        currentMoveIndex: -1,
        lastMove: null,
        isLoading: false
      });

      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create game';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Move handling
  makeMove: async (moveInput: ChessMoveInput) => {
    const { game, gameId, isPlayerTurn, playerColor } = get();
    
    if (!game || !gameId || !isPlayerTurn) {
      return false;
    }

    try {
      set({ isThinking: true, error: null });

      // Validate move locally first
      const move = game.move({
        from: moveInput.from,
        to: moveInput.to,
        promotion: moveInput.promotion
      });

      if (!move) {
        set({ isThinking: false, error: 'Invalid move' });
        return false;
      }

      // Submit move to server
      const result = await apiClient.submitMove(gameId, moveInput);
      
      if (!result.success) {
        // Undo local move if server rejects
        game.undo();
        set({ isThinking: false, error: 'Move rejected by server' });
        return false;
      }

      // Update state with server response
      const newGame = new Chess(result.newFen);
      const newMoves = [...get().moves];
      const newMoveHistory = [...get().moveHistory];
      
      // Add player move
      newMoves.push({
        from: result.playerMove.from,
        to: result.playerMove.to,
        san: result.playerMove.san || '',
        fen: result.playerMove.fen || result.newFen,
        player: playerColor
      });
      newMoveHistory.push(result.playerMove.san || '');

      // Add AI move if present
      if (result.aiMove) {
        newMoves.push({
          from: result.aiMove.from,
          to: result.aiMove.to,
          san: result.aiMove.san || '',
          fen: result.aiMove.fen || result.newFen,
          player: playerColor === 'white' ? 'black' : 'white'
        });
        newMoveHistory.push(result.aiMove.san || '');
      }

      set({
        game: newGame,
        currentFen: result.newFen,
        moves: newMoves,
        moveHistory: newMoveHistory,
        currentMoveIndex: newMoves.length - 1,
        gameStatus: result.gameStatus,
        isPlayerTurn: result.gameStatus === 'active' && !result.aiMove,
        lastMove: result.aiMove ? 
          { from: result.aiMove.from, to: result.aiMove.to } :
          { from: result.playerMove.from, to: result.playerMove.to },
        isThinking: false
      });

      // Update stats if game ended
      if (result.gameStatus !== 'active') {
        get().updateGameStats();
      }

      return true;
    } catch (error) {
      // Undo local move on error
      game.undo();
      const errorMessage = error instanceof Error ? error.message : 'Failed to make move';
      set({ isThinking: false, error: errorMessage });
      return false;
    }
  },

  // Move navigation
  undoMove: () => {
    const { game, moves, currentMoveIndex } = get();
    
    if (!game || currentMoveIndex < 0) {
      return false;
    }

    const newIndex = currentMoveIndex - 1;
    const targetFen = newIndex >= 0 ? moves[newIndex].fen : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    
    const newGame = new Chess(targetFen);
    
    set({
      game: newGame,
      currentFen: targetFen,
      currentMoveIndex: newIndex,
      lastMove: newIndex >= 0 ? 
        { from: moves[newIndex].from, to: moves[newIndex].to } : 
        null
    });

    return true;
  },

  redoMove: () => {
    const { game, moves, currentMoveIndex } = get();
    
    if (!game || currentMoveIndex >= moves.length - 1) {
      return false;
    }

    const newIndex = currentMoveIndex + 1;
    const targetMove = moves[newIndex];
    
    const newGame = new Chess(targetMove.fen);
    
    set({
      game: newGame,
      currentFen: targetMove.fen,
      currentMoveIndex: newIndex,
      lastMove: { from: targetMove.from, to: targetMove.to }
    });

    return true;
  },

  goToMove: (moveIndex: number) => {
    const { moves } = get();
    
    if (moveIndex < -1 || moveIndex >= moves.length) {
      return;
    }

    const targetFen = moveIndex >= 0 ? moves[moveIndex].fen : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    const newGame = new Chess(targetFen);
    
    set({
      game: newGame,
      currentFen: targetFen,
      currentMoveIndex: moveIndex,
      lastMove: moveIndex >= 0 ? 
        { from: moves[moveIndex].from, to: moves[moveIndex].to } : 
        null
    });
  },

  goToStart: () => {
    get().goToMove(-1);
  },

  goToEnd: () => {
    const { moves } = get();
    get().goToMove(moves.length - 1);
  },

  // Game management
  resetGame: () => {
    const newGame = new Chess();
    
    set({
      game: newGame,
      currentFen: newGame.fen(),
      gameId: null,
      gameResult: null,
      gameStatus: 'setup',
      isPlayerTurn: true,
      moves: [],
      moveHistory: [],
      currentMoveIndex: -1,
      lastMove: null,
      error: null,
      isThinking: false
    });
  },

  resignGame: async () => {
    const { gameId } = get();
    
    if (!gameId) return false;

    try {
      // Would call API to resign game
      set({ 
        gameStatus: 'resigned',
        isPlayerTurn: false 
      });
      
      get().updateGameStats();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to resign game';
      set({ error: errorMessage });
      return false;
    }
  },

  offerDraw: async () => {
    const { gameId } = get();
    
    if (!gameId) return false;

    try {
      // Would call API to offer draw
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to offer draw';
      set({ error: errorMessage });
      return false;
    }
  },

  // Analysis
  analyzePosition: async () => {
    const { currentFen } = get();
    
    try {
      // Would call analysis API
      return { evaluation: 0, bestMove: null, principalVariation: [] };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to analyze position';
      set({ error: errorMessage });
      return null;
    }
  },

  getBestMove: async () => {
    const { game } = get();
    
    if (!game) return null;

    try {
      // Simple random move for demo
      const moves = game.moves({ verbose: true });
      if (moves.length === 0) return null;
      
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      return {
        from: randomMove.from,
        to: randomMove.to,
        san: randomMove.san
      };
    } catch (error) {
      return null;
    }
  },

  // Game history
  loadGameHistory: async () => {
    try {
      const history = await apiClient.getGameHistory(10);
      // Would process and store game history
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load game history';
      set({ error: errorMessage });
    }
  },

  saveGame: async () => {
    const { gameId, moves } = get();
    
    if (!gameId) return false;

    try {
      // Would save game to server
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to save game';
      set({ error: errorMessage });
      return false;
    }
  },

  loadGame: async (gameId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Would load game from server
      set({ isLoading: false });
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load game';
      set({ isLoading: false, error: errorMessage });
      return false;
    }
  },

  // Utilities
  clearError: () => {
    set({ error: null });
  },

  updateGameStats: async () => {
    try {
      const stats = await apiClient.getDashboardStats();
      
      set({
        totalGames: stats.totalGames || 0,
        wins: stats.wins || 0,
        losses: stats.losses || 0,
        draws: stats.draws || 0
      });
    } catch (error) {
      // Fail silently for stats
      console.warn('Failed to update game stats:', error);
    }
  }
}));

export type { GameState };