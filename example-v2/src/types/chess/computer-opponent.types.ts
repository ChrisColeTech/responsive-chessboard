/**
 * Computer Opponent Types
 * Domain: Chess - Computer opponent functionality
 * Architecture: Foundation layer types for AI chess opponent
 */

export type ComputerDifficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface ComputerMoveRequest {
  readonly fen: string;
  readonly difficulty: ComputerDifficulty;
  readonly timeLimit: number;
}

export interface ComputerMoveResult {
  readonly success: boolean;
  readonly move?: string;
  readonly error?: string;
  readonly thinkingTime: number;
  readonly evaluation?: number;
  readonly depth?: number;
}

export interface ComputerOpponentConfig {
  readonly difficulty: ComputerDifficulty;
  readonly thinkingDelay: number;
  readonly depth: number;
  readonly timeLimit: number;
}

export interface ComputerPlayerInfo {
  readonly name: string;
  readonly difficulty: ComputerDifficulty;
  readonly isThinking: boolean;
  readonly thinkingTime: number;
  readonly lastEvaluation?: number;
  readonly searchDepth?: number;
}

export interface EngineAnalysis {
  readonly evaluation: number;
  readonly depth: number;
  readonly principalVariation: string[];
  readonly nodesSearched?: number;
  readonly timeSpent: number;
}

export type ComputerMoveStatus = 
  | 'idle'
  | 'thinking' 
  | 'moving'
  | 'error';

export interface TimerState {
  readonly whiteTime: number; // milliseconds remaining
  readonly blackTime: number; // milliseconds remaining
  readonly increment: number; // increment per move in milliseconds
  readonly isRunning: boolean;
  readonly activeColor: 'white' | 'black';
}