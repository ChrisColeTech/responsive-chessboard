/**
 * VS Computer Demo Types
 * Domain: Demo - VS Computer page functionality
 * Architecture: Foundation layer types for computer opponent demo
 */

import { Chess, Square } from 'chess.js';
import type { ComputerDifficulty, ComputerPlayerInfo, TimerState, ComputerMoveStatus } from '../chess/computer-opponent.types';

// Re-export for convenience
export type { ComputerDifficulty };

export interface VSComputerGameState {
  readonly chess: Chess;
  readonly playerColor: 'white' | 'black';
  readonly computerDifficulty: ComputerDifficulty;
  readonly computerMoveStatus: ComputerMoveStatus;
  readonly isComputerThinking: boolean;
  readonly computerThinkingTime: number;
  
  // Game status
  readonly gameStatus: 'playing' | 'checkmate' | 'stalemate' | 'draw' | 'resigned' | 'timeout';
  readonly currentPlayer: 'white' | 'black';
  readonly isGameOver: boolean;
  readonly winner?: 'human' | 'computer' | 'draw';
  readonly gameResult?: string;
  
  // UI state
  readonly selectedSquare: string | null;
  readonly validMoves: string[];
  readonly lastMove: { from: string; to: string; promotion?: string } | null;
  readonly moveHistory: string[];
  
  // Chess-specific state
  readonly isCheck: boolean;
  readonly isCheckmate: boolean;
  readonly isStalemate: boolean;
  readonly isDraw: boolean;
  
  // Timer state
  readonly timer: TimerState;
  
  // Computer player info
  readonly computerPlayer: ComputerPlayerInfo;
}

export interface VSComputerSettings {
  readonly difficulty: ComputerDifficulty;
  readonly playerColor: 'white' | 'black';
  readonly timeControl: {
    readonly minutes: number;
    readonly increment: number; // seconds per move
  };
  readonly soundEnabled: boolean;
  readonly showCoordinates: boolean;
  readonly animationsEnabled: boolean;
}

export interface VSComputerPageProps {
  readonly onError?: (error: VSComputerError) => void;
  readonly initialSettings?: Partial<VSComputerSettings>;
}

export type VSComputerError = 
  | { type: 'engine_init_failed'; message: string; context?: unknown }
  | { type: 'move_generation_failed'; message: string; context?: { fen: string } }
  | { type: 'invalid_move'; message: string; context?: { move: string } }
  | { type: 'timer_error'; message: string; context?: unknown }
  | { type: 'game_state_error'; message: string; context?: unknown };

export interface UseVSComputerStateOptions {
  readonly onError?: (error: VSComputerError) => void;
  readonly initialSettings?: Partial<VSComputerSettings>;
  readonly onGameEnd?: (result: { winner: 'human' | 'computer' | 'draw'; reason: string }) => void;
  readonly onMove?: (move: { from: string; to: string; san: string }) => void;
}

export interface UseVSComputerStateReturn {
  // Game state
  readonly gameState: VSComputerGameState;
  readonly settings: VSComputerSettings;
  readonly isLoading: boolean;
  readonly error: VSComputerError | null;
  
  // Game actions  
  readonly makeMove: (from: string, to: string, promotion?: string) => Promise<boolean>;
  readonly newGame: (playerColor?: 'white' | 'black') => void;
  readonly resignGame: () => void;
  readonly offerDraw: () => void;
  readonly flipBoard: () => void;
  
  // Settings actions
  readonly setDifficulty: (difficulty: ComputerDifficulty) => void;
  readonly setPlayerColor: (color: 'white' | 'black') => void;
  readonly updateSettings: (settings: Partial<VSComputerSettings>) => void;
  
  // UI helpers
  readonly selectSquare: (square: Square) => void;
  readonly getSquareHighlights: () => { [square: string]: 'selected' | 'valid' | 'lastMove' };
  readonly isPlayerTurn: boolean;
  readonly canMakeMove: boolean;
  
  // Display utilities
  readonly formatTime: (timeMs: number) => string;
  readonly getComputerStatus: () => string;
  readonly getHumanStatus: () => string;
  readonly getOpeningName: () => string;
  readonly getRecentMoves: () => string;
}

export interface PlayerCardProps {
  readonly playerType: 'human' | 'computer';
  readonly playerColor: 'white' | 'black';
  readonly timeRemaining: number;
  readonly isCurrentTurn: boolean;
  readonly isThinking?: boolean;
  readonly thinkingTime?: number;
  readonly playerName?: string;
  readonly evaluation?: number;
  readonly depth?: number;
  readonly className?: string;
}

export interface ComputerThinkingProps {
  readonly isVisible: boolean;
  readonly thinkingTime: number;
  readonly evaluation?: number;
  readonly depth?: number;
  readonly principalVariation?: string[];
  readonly progress?: number; // 0-100
  readonly className?: string;
}

export interface DifficultyLevel {
  readonly level: ComputerDifficulty;
  readonly name: string;
  readonly description: string;
  readonly depth: number;
  readonly thinkingTime: number;
}

export interface PlayerColorSelectorProps {
  readonly selectedColor: 'white' | 'black';
  readonly onColorChange: (color: 'white' | 'black') => void;
  readonly disabled?: boolean;
  readonly className?: string;
}

export interface GameTimerProps {
  readonly timeRemaining: number;
  readonly isActive: boolean;
  readonly playerColor: 'white' | 'black';
  readonly format?: 'mm:ss' | 'hh:mm:ss';
  readonly className?: string;
}