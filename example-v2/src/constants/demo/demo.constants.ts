// Demo configuration constants
export const DEMO_PAGES = {
  FREE_PLAY: 'free-play',
  CONNECTED_GAMES: 'connected-games',
  PUZZLES: 'puzzles',
} as const;

export const DEMO_CONFIG = {
  DEFAULT_BOARD_WIDTH: 600,
  MIN_BOARD_WIDTH: 200,
  MAX_BOARD_WIDTH: 1200,
  DEFAULT_ANIMATION_DURATION: 300,
  CONTAINER_SIZES: [
    { name: 'Mobile', width: 320, height: 568 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1200, height: 800 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ],
} as const;

export const DEMO_THEMES = {
  SHADOW_KNIGHT: 'shadow-knight',
  ROYAL_BLUE: 'royal-blue',
  EMERALD_FOREST: 'emerald-forest',
  SUNSET_ORANGE: 'sunset-orange',
  MINIMALIST: 'minimalist',
} as const;

export const CHESSBOARD_THEMES = [
  'classic',
  'wood', 
  'marble',
  'neon',
  'minimalist',
] as const;

export const DEFAULT_CONFIG = {
  initialFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  boardTheme: 'classic',
  pieceSet: 'classic', 
  boardOrientation: 'white',
  showCoordinates: true,
  boardWidth: 600,
  animationsEnabled: true,
  animationDuration: 300,
} as const;