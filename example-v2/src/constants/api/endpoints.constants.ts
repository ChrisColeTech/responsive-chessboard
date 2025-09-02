// API endpoints constants
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  ME: '/api/user/profile', // Updated to use correct backend endpoint (singular 'user')
  REFRESH: '/api/auth/refresh',
  LOGOUT: '/api/auth/logout',
} as const;

export const GAME_ENDPOINTS = {
  CREATE: '/api/games/create',
  MOVE: (gameId: string) => `/api/games/${gameId}/move`,
  HISTORY: '/api/games',
  ANALYSIS: (gameId: string) => `/api/games/${gameId}/analysis`,
} as const;

export const PUZZLE_ENDPOINTS = {
  NEXT: '/api/puzzles/next',
  SOLVE: (puzzleId: string) => `/api/puzzles/${puzzleId}/solve`,
  HINT: (puzzleId: string) => `/api/puzzles/${puzzleId}/hint`,
  STATS: '/api/puzzles/stats',
} as const;

export const ANALYSIS_ENDPOINTS = {
  ANALYZE: '/api/analysis/analyze',
  BEST_MOVE: '/api/analysis/best-move',
  OPENING: '/api/analysis/opening',
  STORED: (fen: string) => `/api/analysis/stored/${encodeURIComponent(fen)}`,
} as const;

export const USER_ENDPOINTS = {
  DASHBOARD_STATS: '/api/user/dashboard-stats',
  PROGRESS: '/api/user/progress',
  PREFERENCES: '/api/user/preferences',
} as const;

export const ACHIEVEMENT_ENDPOINTS = {
  CHECK: '/achievements/check',
  LIST: '/achievements',
} as const;

export const GAME_REVIEW_ENDPOINTS = {
  LIST: '/game-reviews',
  GET: (gameId: string) => `/game-reviews/${gameId}`,
  MOVES: (gameId: string) => `/game-reviews/${gameId}/moves`,
} as const;