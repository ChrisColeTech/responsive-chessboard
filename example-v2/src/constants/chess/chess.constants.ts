// Chess game constants
export const STARTING_POSITION_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const PIECE_VALUES = {
  pawn: 1,
  rook: 5,
  knight: 3,
  bishop: 3,
  queen: 9,
  king: 0,
} as const;

export const AI_LEVELS = {
  BEGINNER: 1,
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  EXPERT: 5,
} as const;

export const TIME_CONTROLS = [
  '1+0',   // 1 minute
  '3+0',   // 3 minutes
  '5+0',   // 5 minutes
  '10+0',  // 10 minutes
  '15+10', // 15 minutes + 10 second increment
  '30+0',  // 30 minutes
] as const;

export const PIECE_SETS = [
  'classic',
  'modern',
  'tournament',
  'conqueror',
  'executive',
] as const;

export const BOARD_THEMES = [
  'classic',
  'wood',
  'marble',
  'neon',
  'minimalist',
] as const;