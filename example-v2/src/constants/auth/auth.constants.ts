// Authentication constants
export const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
} as const;

export const DEMO_USER_CREDENTIALS = {
  EMAIL: 'chessdemo@example.com',
  PASSWORD: 'ChessDemo2024',
} as const;

export const AUTH_CONFIG = {
  TOKEN_REFRESH_THRESHOLD: 5 * 60 * 1000, // 5 minutes before expiry
  MAX_RETRY_ATTEMPTS: 3,
  LOGIN_REDIRECT: '/dashboard',
  LOGOUT_REDIRECT: '/login',
} as const;