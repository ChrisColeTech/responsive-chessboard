/**
 * Default board dimensions and sizing
 */
export const DEFAULT_CELL_SIZE = 92
export const DEFAULT_BOARD_SIZE = DEFAULT_CELL_SIZE * 8
export const FACTOR_FOR_SIZE_CIRCLE_MARK = 4.6

/**
 * Default color scheme
 */
export const DEFAULT_COLORS = {
  CIRCLE_MARK: '#3697ce',
  WHITE_CELL: '#fafafc',
  BLACK_CELL: '#d8d9e6',
  SELECTED_CELL: '#e3f1fe',
  SELECTED_CELL_BORDER: '3px solid #6ac2fd',
  ARROW: '#6ac2fd',
  MARKED_CELL: '#3697ce',
  CHECKED_CELL: '#e95b5c'
} as const

/**
 * Responsive sizing constraints
 */
export const RESPONSIVE_LIMITS = {
  MIN_CELL_SIZE: 20,
  MAX_CELL_SIZE: 120,
  MIN_BOARD_SIZE: 160, // 20 * 8
  MAX_BOARD_SIZE: 960, // 120 * 8
  DEFAULT_MIN_SIZE: 200,
  DEFAULT_MAX_SIZE: 800
} as const