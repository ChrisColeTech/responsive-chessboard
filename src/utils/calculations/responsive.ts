/**
 * Responsive sizing calculations
 */

import type { ResponsiveSizing } from '../../types'
import { RESPONSIVE_LIMITS } from '../../constants'

/**
 * Calculate dynamic board size based on responsive sizing props
 */
export const calculateBoardSize = (sizing: ResponsiveSizing): number => {
  if (sizing.boardSize) return sizing.boardSize
  if (sizing.width) return sizing.width
  if (sizing.height) return sizing.height
  return RESPONSIVE_LIMITS.DEFAULT_MIN_SIZE
}

/**
 * Apply size constraints (min/max) to a given size
 */
export const constrainSize = (
  size: number, 
  minSize?: number, 
  maxSize?: number
): number => {
  if (minSize && maxSize) {
    return Math.min(Math.max(size, minSize), maxSize)
  }
  if (minSize) {
    return Math.max(size, minSize)
  }
  if (maxSize) {
    return Math.min(size, maxSize)
  }
  return size
}

/**
 * Calculate cell size from board size
 */
export const calculateCellSize = (boardSize: number): number => {
  return boardSize / 8
}

/**
 * Generate CSS custom properties for responsive sizing
 */
export const generateCSSProperties = (boardSize: number) => ({
  '--board-size': `${boardSize}px`,
  '--cell-size': `${boardSize / 8}px`,
  '--piece-size': `${(boardSize / 8) * 0.8}px`,
} as React.CSSProperties)