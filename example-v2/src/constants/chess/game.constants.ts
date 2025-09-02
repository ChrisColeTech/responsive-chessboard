// Chess game configuration constants
export const GAME_CONFIG = {
  DEFAULT_AI_LEVEL: 2,
  DEFAULT_TIME_CONTROL: '10+0',
  MOVE_ANIMATION_DURATION: 300, // milliseconds
  AI_MOVE_DELAY: 500, // milliseconds - delay before showing AI move
  GAME_CREATION_TIMEOUT: 5000, // 5 seconds
  MOVE_SUBMISSION_TIMEOUT: 3000, // 3 seconds
} as const;

export const GAME_STATUSES = {
  ACTIVE: 'active',
  CHECKMATE: 'checkmate',
  STALEMATE: 'stalemate',
  DRAW: 'draw',
  TIMEOUT: 'timeout',
  RESIGNED: 'resigned',
} as const;

export const PLAYER_COLORS = {
  WHITE: 'white',
  BLACK: 'black',
  RANDOM: 'random',
} as const;