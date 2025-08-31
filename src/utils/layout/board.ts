/**
 * Board layout and cell utilities
 */

import type { Cell, CellPos, Figure, FigureColor, MoveData, FigureType } from '../../types'

/**
 * Check if a cell is light colored (white)
 */
export const getIsLightCell = (rowId: number, cellId: number): boolean =>
  (rowId % 2 === 0 && cellId % 2 === 0) ||
  (rowId % 2 > 0 && cellId % 2 > 0)

/**
 * Create filled array of specified size
 */
export const getFilledArrayBySize = (size: number): number[] => {
  return Array.from({ length: size }, (_, i) => i)
}

/**
 * Get CSS class name for chess piece
 */
export const getFigureCSS = (figure: Figure): string =>
  `${figure.type}-${figure.color}`

/**
 * Map board cells to array of figures with positions
 */
export const mapCellsToFiguresArray = (boardState: Cell[][]): Figure[] => {
  const figuresWithPosition: Figure[] = []

  boardState.forEach((row, j) => 
    row.forEach((cell, i) => {
      if (cell.figure) {
        figuresWithPosition.push({
          ...cell.figure,
          position: [i, j],
        })
      }
    })
  )

  return figuresWithPosition
}

/**
 * Check if position is in possible moves array
 */
export const checkIsPossibleMove = (
  possibleMoves: CellPos[], 
  position: CellPos
): boolean => {
  return !!possibleMoves.find(move =>
    move[0] === position[0] && move[1] === position[1]
  )
}

/**
 * Check if position exists in positions array
 */
export const checkPositionsHas = (
  positions: CellPos[] | undefined,
  pos: CellPos
): boolean => {
  if (!positions) return false

  return !!positions.find(
    posItem => posItem[0] === pos[0] && posItem[1] === pos[1]
  )
}

/**
 * Check if move is castling
 */
export const checkIsCastlingMove = (moveData: MoveData): boolean => {
  const { figure, from, to } = moveData
  if (figure.type !== 'king') return false
  if (from[1] !== to[1]) return false
  const horizontalDiff = Math.abs(to[0] - from[0])
  return horizontalDiff > 1
}

/**
 * Check if cell contains king in check
 */
export const hasCheck = (
  cell: Cell, 
  currentColor: FigureColor, 
  linesWithCheck: CellPos[][]
): boolean =>
  !!cell.figure &&
  cell.figure.type === 'king' &&
  cell.figure.color === currentColor &&
  linesWithCheck.length > 0

/**
 * Get figures by color for display/selection
 */
export const getFiguresByColor = (
  color: FigureColor,
  forPawnTransform = false
): Figure[] => {
  const figureTypes: FigureType[] = forPawnTransform 
    ? ['queen', 'rook', 'bishop', 'knight']
    : ['pawn', 'knight', 'bishop', 'rook', 'queen', 'king']

  return figureTypes.map(type => ({
    type,
    color,
    touched: true,
  }))
}