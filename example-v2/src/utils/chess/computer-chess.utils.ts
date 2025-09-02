/**
 * Computer Chess Utilities
 * Domain: Chess - Computer opponent utility functions
 * Architecture: Foundation layer pure utility functions
 */

import type { ComputerDifficulty, ComputerOpponentConfig } from '../../types/chess/computer-opponent.types';

/**
 * Validate UCI move format (e.g., "e2e4", "e7e8q")
 */
export function validateUCIMove(move: string): boolean {
  if (!move || typeof move !== 'string') return false;
  
  // UCI format: [a-h][1-8][a-h][1-8][qrbn]?
  const uciMoveRegex = /^[a-h][1-8][a-h][1-8][qrbn]?$/;
  return uciMoveRegex.test(move);
}

/**
 * Parse UCI move to from/to/promotion format
 */
export function parseUCIMove(uciMove: string): { from: string; to: string; promotion?: string } {
  if (!validateUCIMove(uciMove)) {
    throw new Error(`Invalid UCI move format: ${uciMove}`);
  }
  
  const from = uciMove.substring(0, 2);
  const to = uciMove.substring(2, 4);
  const promotion = uciMove.length > 4 ? uciMove.substring(4) : undefined;
  
  return { from, to, promotion };
}

/**
 * Convert from/to/promotion to UCI move format
 */
export function toUCIMove(from: string, to: string, promotion?: string): string {
  if (!from || !to) {
    throw new Error('Invalid move: from and to squares are required');
  }
  
  const uciMove = from + to + (promotion || '');
  
  if (!validateUCIMove(uciMove)) {
    throw new Error(`Generated invalid UCI move: ${uciMove}`);
  }
  
  return uciMove;
}

/**
 * Get difficulty configuration
 */
export function getDifficultyConfig(difficulty: ComputerDifficulty): ComputerOpponentConfig {
  const configs: Record<ComputerDifficulty, ComputerOpponentConfig> = {
    1: { difficulty: 1, thinkingDelay: 500, depth: 1, timeLimit: 1000 },    // Beginner
    2: { difficulty: 2, thinkingDelay: 700, depth: 2, timeLimit: 1500 },    // Beginner+
    3: { difficulty: 3, thinkingDelay: 900, depth: 3, timeLimit: 2000 },    // Easy
    4: { difficulty: 4, thinkingDelay: 1100, depth: 4, timeLimit: 2500 },   // Easy-Medium
    5: { difficulty: 5, thinkingDelay: 1300, depth: 6, timeLimit: 3000 },   // Medium
    6: { difficulty: 6, thinkingDelay: 1500, depth: 8, timeLimit: 4000 },   // Medium-Hard
    7: { difficulty: 7, thinkingDelay: 1700, depth: 10, timeLimit: 5000 },  // Hard
    8: { difficulty: 8, thinkingDelay: 1900, depth: 12, timeLimit: 6000 },  // Hard+
    9: { difficulty: 9, thinkingDelay: 2100, depth: 15, timeLimit: 8000 },  // Expert
    10: { difficulty: 10, thinkingDelay: 2300, depth: 18, timeLimit: 10000 } // Master
  };
  
  return configs[difficulty];
}

/**
 * Get human-readable difficulty name
 */
export function getDifficultyName(difficulty: ComputerDifficulty): string {
  const names: Record<ComputerDifficulty, string> = {
    1: 'Beginner',
    2: 'Beginner+', 
    3: 'Easy',
    4: 'Easy-Medium',
    5: 'Medium',
    6: 'Medium-Hard',
    7: 'Hard',
    8: 'Hard+',
    9: 'Expert',
    10: 'Master'
  };
  
  return names[difficulty];
}

/**
 * Get difficulty description
 */
export function getDifficultyDescription(difficulty: ComputerDifficulty): string {
  const descriptions: Record<ComputerDifficulty, string> = {
    1: 'Perfect for absolute beginners - makes occasional blunders',
    2: 'Still beginner-friendly with some tactical awareness',
    3: 'Good for learning players - plays basic tactics',
    4: 'Intermediate level with solid tactical play',
    5: 'Balanced opponent for casual players',
    6: 'Strong tactical and positional understanding',
    7: 'Advanced level - challenging for experienced players',
    8: 'Very strong play with deep calculations',
    9: 'Expert level - tournament strength',
    10: 'Master level - extremely difficult to beat'
  };
  
  return descriptions[difficulty];
}

/**
 * Calculate realistic thinking time based on difficulty and position complexity
 */
export function calculateThinkingTime(
  difficulty: ComputerDifficulty, 
  positionComplexity: 'opening' | 'middlegame' | 'endgame' = 'middlegame'
): number {
  const baseConfig = getDifficultyConfig(difficulty);
  const complexityMultiplier = {
    opening: 0.7,    // Faster in opening
    middlegame: 1.0, // Normal time
    endgame: 1.3     // More time for precise endgame calculation
  };
  
  return Math.round(baseConfig.thinkingDelay * complexityMultiplier[positionComplexity]);
}

/**
 * Parse engine evaluation (centipawns to readable format)
 */
export function parseEvaluation(centipawns: number): { 
  value: number; 
  display: string; 
  advantage: 'white' | 'black' | 'equal' 
} {
  // Convert centipawns to pawns
  const pawns = centipawns / 100;
  
  let advantage: 'white' | 'black' | 'equal';
  if (Math.abs(pawns) < 0.15) {
    advantage = 'equal';
  } else {
    advantage = pawns > 0 ? 'white' : 'black';
  }
  
  // Format display
  let display: string;
  if (Math.abs(pawns) < 0.1) {
    display = '0.00';
  } else if (Math.abs(pawns) >= 10) {
    display = `${pawns > 0 ? '+' : ''}${Math.round(pawns)}`;
  } else {
    display = `${pawns > 0 ? '+' : ''}${pawns.toFixed(2)}`;
  }
  
  return { value: pawns, display, advantage };
}

/**
 * Format time in mm:ss or hh:mm:ss format
 */
export function formatTime(milliseconds: number, format: 'mm:ss' | 'hh:mm:ss' = 'mm:ss'): string {
  if (milliseconds <= 0) return format === 'mm:ss' ? '00:00' : '00:00:00';
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  if (format === 'hh:mm:ss' || hours > 0) {
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  
  return `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Determine position phase based on material
 */
export function getPositionPhase(fen: string): 'opening' | 'middlegame' | 'endgame' {
  // Simple heuristic based on material count
  const pieces = fen.split(' ')[0];
  
  // Count major pieces (Q, R) and minor pieces (B, N)
  const queens = (pieces.match(/[qQ]/g) || []).length;
  const rooks = (pieces.match(/[rR]/g) || []).length;
  const bishops = (pieces.match(/[bB]/g) || []).length;
  const knights = (pieces.match(/[nN]/g) || []).length;
  
  const majorPieces = queens + rooks;
  const minorPieces = bishops + knights;
  const totalPieces = majorPieces + minorPieces;
  
  // Opening: Most pieces on board
  if (totalPieces >= 12) return 'opening';
  
  // Endgame: Few pieces left
  if (totalPieces <= 6 || (majorPieces <= 2 && minorPieces <= 2)) return 'endgame';
  
  // Middlegame: Everything else
  return 'middlegame';
}

/**
 * Validate if a difficulty level is supported
 */
export function isSupportedDifficulty(difficulty: number): difficulty is ComputerDifficulty {
  return Number.isInteger(difficulty) && difficulty >= 1 && difficulty <= 10;
}

/**
 * Get next/previous difficulty level with bounds checking
 */
export function getAdjacentDifficulty(
  current: ComputerDifficulty, 
  direction: 'next' | 'previous'
): ComputerDifficulty {
  if (direction === 'next') {
    return Math.min(10, current + 1) as ComputerDifficulty;
  } else {
    return Math.max(1, current - 1) as ComputerDifficulty;
  }
}