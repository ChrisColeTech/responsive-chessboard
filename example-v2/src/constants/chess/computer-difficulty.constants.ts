/**
 * Computer Difficulty Constants
 * Domain: Chess - Computer opponent difficulty configurations
 * Architecture: Foundation layer constants
 */

import type { ComputerDifficulty, DifficultyLevel } from '../../types/demo/vs-computer.types';

/**
 * Default computer difficulty level
 */
export const DEFAULT_COMPUTER_DIFFICULTY: ComputerDifficulty = 5;

/**
 * Minimum and maximum difficulty levels
 */
export const MIN_DIFFICULTY: ComputerDifficulty = 1;
export const MAX_DIFFICULTY: ComputerDifficulty = 10;

/**
 * Complete difficulty level configurations
 */
export const DIFFICULTY_LEVELS: Record<ComputerDifficulty, DifficultyLevel> = {
  1: {
    level: 1,
    name: 'Beginner',
    description: 'Perfect for absolute beginners - makes occasional blunders',
    depth: 1,
    thinkingTime: 500
  },
  2: {
    level: 2,
    name: 'Beginner+',
    description: 'Still beginner-friendly with some tactical awareness',
    depth: 2,
    thinkingTime: 700
  },
  3: {
    level: 3,
    name: 'Easy',
    description: 'Good for learning players - plays basic tactics',
    depth: 3,
    thinkingTime: 900
  },
  4: {
    level: 4,
    name: 'Easy-Medium',
    description: 'Intermediate level with solid tactical play',
    depth: 4,
    thinkingTime: 1100
  },
  5: {
    level: 5,
    name: 'Medium',
    description: 'Balanced opponent for casual players',
    depth: 6,
    thinkingTime: 1300
  },
  6: {
    level: 6,
    name: 'Medium-Hard',
    description: 'Strong tactical and positional understanding',
    depth: 8,
    thinkingTime: 1500
  },
  7: {
    level: 7,
    name: 'Hard',
    description: 'Advanced level - challenging for experienced players',
    depth: 10,
    thinkingTime: 1700
  },
  8: {
    level: 8,
    name: 'Hard+',
    description: 'Very strong play with deep calculations',
    depth: 12,
    thinkingTime: 1900
  },
  9: {
    level: 9,
    name: 'Expert',
    description: 'Expert level - tournament strength',
    depth: 15,
    thinkingTime: 2100
  },
  10: {
    level: 10,
    name: 'Master',
    description: 'Master level - extremely difficult to beat',
    depth: 18,
    thinkingTime: 2300
  }
} as const;

/**
 * Default time controls for VS Computer games
 */
export const DEFAULT_TIME_CONTROLS = {
  BLITZ_3_2: { minutes: 3, increment: 2 },    // 3 minutes + 2 seconds increment
  BLITZ_5_3: { minutes: 5, increment: 3 },    // 5 minutes + 3 seconds increment
  RAPID_10_0: { minutes: 10, increment: 0 },  // 10 minutes, no increment
  RAPID_15_10: { minutes: 15, increment: 10 }, // 15 minutes + 10 seconds increment
  CLASSICAL_30_0: { minutes: 30, increment: 0 }, // 30 minutes, no increment
  UNLIMITED: { minutes: 999, increment: 0 }    // Unlimited time
} as const;

/**
 * Default settings for VS Computer games
 */
export const DEFAULT_VS_COMPUTER_SETTINGS = {
  difficulty: DEFAULT_COMPUTER_DIFFICULTY,
  playerColor: 'white' as const,
  timeControl: DEFAULT_TIME_CONTROLS.BLITZ_5_3,
  soundEnabled: true,
  showCoordinates: true,
  animationsEnabled: true
} as const;

/**
 * Stockfish UCI engine options
 */
export const STOCKFISH_UCI_OPTIONS = {
  // Hash table size in MB (adjust based on available memory)
  Hash: 64,
  
  // Number of threads (1 for web worker compatibility)
  Threads: 1,
  
  // Ponder (think on opponent's time) - disabled for demo
  Ponder: false,
  
  // Skill level (0-20, where 20 is maximum strength)
  // Note: This will be dynamically set based on difficulty
  'Skill Level': 20,
  
  // MultiPV - number of principal variations to calculate
  MultiPV: 1
} as const;

/**
 * Engine analysis thresholds
 */
export const ANALYSIS_THRESHOLDS = {
  // Evaluation thresholds in centipawns
  SLIGHT_ADVANTAGE: 25,
  CLEAR_ADVANTAGE: 100,
  WINNING_ADVANTAGE: 300,
  DECISIVE_ADVANTAGE: 500,
  
  // Time thresholds
  QUICK_MOVE_TIME: 500,      // ms - moves made faster than this are considered quick
  LONG_THINK_TIME: 5000,     // ms - moves taking longer than this show thinking indicator
  
  // Depth thresholds
  MIN_ANALYSIS_DEPTH: 1,
  MAX_ANALYSIS_DEPTH: 20
} as const;

/**
 * Game result messages
 */
export const GAME_RESULT_MESSAGES = {
  HUMAN_WINS_CHECKMATE: 'Congratulations! You won by checkmate!',
  COMPUTER_WINS_CHECKMATE: 'Computer wins by checkmate. Better luck next time!',
  HUMAN_WINS_RESIGNATION: 'Computer resigned. You win!',
  COMPUTER_WINS_RESIGNATION: 'You resigned. Computer wins.',
  HUMAN_WINS_TIMEOUT: 'Computer ran out of time. You win!',
  COMPUTER_WINS_TIMEOUT: 'You ran out of time. Computer wins.',
  DRAW_STALEMATE: 'Game drawn by stalemate.',
  DRAW_REPETITION: 'Game drawn by threefold repetition.',
  DRAW_FIFTY_MOVES: 'Game drawn by fifty-move rule.',
  DRAW_INSUFFICIENT_MATERIAL: 'Game drawn by insufficient material.',
  DRAW_AGREEMENT: 'Game drawn by agreement.'
} as const;

/**
 * Computer personality messages (optional feature for engagement)
 */
export const COMPUTER_MESSAGES = {
  GAME_START: [
    'Good luck! I hope you\'re ready for a challenge.',
    'Let\'s play some chess!',
    'May the best player win!',
    'Ready when you are!'
  ],
  GOOD_MOVE: [
    'Nice move!',
    'Well played!',
    'Good thinking!',
    'I didn\'t see that coming!'
  ],
  BLUNDER: [
    'Are you sure about that move?',
    'That might not be the best choice...',
    'Interesting strategy!',
    'Let\'s see how this plays out.'
  ],
  WINNING: [
    'I\'m feeling confident!',
    'This position looks good for me.',
    'I like my chances here.',
    'Things are going well!'
  ],
  LOSING: [
    'You\'re playing very well!',
    'This is getting difficult for me.',
    'Nice pressure!',
    'You have the advantage.'
  ]
} as const;