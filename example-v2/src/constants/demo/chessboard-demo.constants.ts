// SRP: Demo configuration constants
import type { 
  BoardTheme, 
  PieceSet, 
  ContainerSize, 
  ThemeOption, 
  PieceSetOption, 
  ContainerSizeOption,
  AnimationOption,
  ChessboardSettings,
  ContainerConfig
} from '@/types/demo/demo.types';

/**
 * Available board themes with UI information
 */
export const THEME_OPTIONS: ThemeOption[] = [
  {
    value: 'classic',
    label: 'Classic',
    description: 'Traditional brown wood board',
    colors: {
      light: '#f0d9b5',
      dark: '#b58863',
      border: '#8b4513'
    }
  },
  {
    value: 'modern',
    label: 'Modern',
    description: 'Clean green and white board',
    colors: {
      light: '#eeeed2',
      dark: '#769656',
      border: '#4a4a4a'
    }
  },
  {
    value: 'blue',
    label: 'Ocean Blue',
    description: 'Blue themed professional board',
    colors: {
      light: '#e6f3ff',
      dark: '#4a90b8',
      border: '#2c5282'
    }
  },
  {
    value: 'wood',
    label: 'Dark Wood',
    description: 'Rich wooden appearance',
    colors: {
      light: '#f4e4bc',
      dark: '#8b6914',
      border: '#654321'
    }
  }
] as const;

/**
 * Available piece sets with UI information
 */
export const PIECE_SET_OPTIONS: PieceSetOption[] = [
  {
    value: 'classic',
    label: 'Classic',
    description: 'Traditional Staunton chess pieces',
  },
  {
    value: 'modern',
    label: 'Modern',
    description: 'Contemporary minimalist design',
  },
  {
    value: 'tournament',
    label: 'Tournament',
    description: 'Professional tournament style',
  },
  {
    value: 'executive',
    label: 'Executive',
    description: 'Elegant business style',
  },
  {
    value: 'conqueror',
    label: 'Conqueror',
    description: 'Medieval warrior theme',
  }
] as const;

/**
 * Container size presets for responsive testing
 */
export const CONTAINER_SIZE_OPTIONS: ContainerSizeOption[] = [
  {
    value: 'small',
    label: 'Small (320px)',
    width: 320,
    height: 320,
    description: 'Mobile phone size'
  },
  {
    value: 'medium',
    label: 'Medium (480px)',
    width: 480,
    height: 480,
    description: 'Large phone / small tablet'
  },
  {
    value: 'large',
    label: 'Large (640px)',
    width: 640,
    height: 640,
    description: 'Tablet / small desktop'
  },
  {
    value: 'xlarge',
    label: 'Extra Large (800px)',
    width: 800,
    height: 800,
    description: 'Desktop size'
  },
  {
    value: 'custom',
    label: 'Custom',
    width: 400,
    height: 400,
    description: 'User-defined size'
  }
] as const;

/**
 * Animation duration options
 */
export const ANIMATION_OPTIONS: AnimationOption[] = [
  {
    duration: 0,
    label: 'Instant',
    description: 'No animation'
  },
  {
    duration: 150,
    label: 'Fast',
    description: 'Quick animations'
  },
  {
    duration: 300,
    label: 'Normal',
    description: 'Standard speed'
  },
  {
    duration: 500,
    label: 'Slow',
    description: 'Deliberate animations'
  },
  {
    duration: 1000,
    label: 'Very Slow',
    description: 'For detailed observation'
  }
] as const;

/**
 * Default chessboard settings
 */
export const DEFAULT_CHESSBOARD_SETTINGS: ChessboardSettings = {
  theme: 'classic',
  pieceSet: 'classic',
  showCoordinates: true,
  allowDragAndDrop: true,
  animationsEnabled: true,
  animationDuration: 300,
  boardOrientation: 'white'
};

/**
 * Default container configuration
 */
export const DEFAULT_CONTAINER_CONFIG: ContainerConfig = {
  size: 'large',
  width: 640,
  height: 640,
  aspectRatio: 1,
  minSize: 200,
  maxSize: 1000
};

/**
 * Initial FEN position for new games
 */
export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/**
 * Demo configuration limits
 */
export const DEMO_LIMITS = {
  MIN_BOARD_SIZE: 200,
  MAX_BOARD_SIZE: 1000,
  MIN_ANIMATION_DURATION: 0,
  MAX_ANIMATION_DURATION: 2000,
  MAX_MOVE_HISTORY: 100,
  AUTO_SAVE_INTERVAL: 30000, // 30 seconds
} as const;

/**
 * Local storage keys for demo persistence
 */
export const DEMO_STORAGE_KEYS = {
  SETTINGS: 'freeplay-settings',
  CONTAINER_CONFIG: 'freeplay-container',
  GAME_STATE: 'freeplay-game',
  STATISTICS: 'freeplay-stats'
} as const;

/**
 * Demo feature flags
 */
export const DEMO_FEATURES = {
  SAVE_GAME_STATE: true,
  MOVE_HISTORY: true,
  STATISTICS_TRACKING: true,
  SOUND_EFFECTS: false, // Phase 9.9
  POSITION_ANALYSIS: false, // Future feature
  GAME_EXPORT: false // Future feature
} as const;

/**
 * Control panel section configuration
 */
export const CONTROL_SECTIONS = [
  { id: 'appearance', label: 'Appearance', expanded: true },
  { id: 'behavior', label: 'Behavior', expanded: true },
  { id: 'container', label: 'Container', expanded: false },
  { id: 'game', label: 'Game Controls', expanded: true }
] as const;

/**
 * Error messages for demo
 */
export const DEMO_ERROR_MESSAGES = {
  invalid_move: 'Invalid move. Please try again.',
  game_over: 'Game is already finished.',
  invalid_fen: 'Invalid board position.',
  settings_error: 'Unable to update settings.',
  save_error: 'Could not save game state.',
  load_error: 'Could not load game state.'
} as const;