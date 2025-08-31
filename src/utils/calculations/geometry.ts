/**
 * Geometry and positioning calculations
 */

import type { CellPos, ChessBoardConfig } from '../../types'

/**
 * Calculate angle between two points in degrees
 */
export const degrees = (a: number, b: number): number => 
  (Math.atan(a / b) * 180) / Math.PI

/**
 * Calculate angle for arrow between start and end positions
 */
export const calcAngle = (start: number[], end: number[]): number => {
  const x = end[0] - start[0]
  const y = end[1] - start[1]

  if (x > 0 && y > 0) return degrees(y, x) - 90
  if (x < 0 && y < 0) return degrees(y, x) + 90
  if (x < 0 && y > 0) return degrees(y, x) + 90
  if (x > 0 && y < 0) return degrees(y, x) - 90
  if (y === 0 && x > 0) return -90
  if (y === 0 && x < 0) return 90
  if (x === 0 && y < 0) return 180

  return 0
}

/**
 * Correct grabbing position by scroll offset
 */
export const correctGrabbingPosByScroll = (pos: CellPos): CellPos => {
  if (typeof window === 'undefined') return pos

  return [
    pos[0] - window.scrollX,
    pos[1] - window.scrollY,
  ] as CellPos
}

/**
 * Correct grabbing position for arrow rendering
 */
export const correctGrabbingPosForArrow = (
  pos: CellPos, 
  boardConfig: ChessBoardConfig
): CellPos => [
  (pos[0] * boardConfig.cellSize) + (boardConfig.cellSize / 2 - 10), 
  (pos[1] * boardConfig.cellSize) + (boardConfig.cellSize / 2)
] as CellPos