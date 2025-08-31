import { CellPos, Figure, MoveData } from '../engine'

/**
 * Map of chess piece identifiers to their SVG render functions
 */
export interface ChessPiecesMap {
  [key: string]: (size: string) => JSX.Element
}

/**
 * Configuration object for chess board appearance and behavior
 */
export interface ChessBoardConfig {
  cellSize: number
  whiteCellColor: string
  blackCellColor: string
  selectedCellColor: string
  selectedCellBorder: string
  markedCellColor: string
  circleMarkColor: string
  arrowColor: string
  checkedCellColor: string
  piecesMap: ChessPiecesMap
}

/**
 * Represents a chess move change with optional transition effects
 */
export interface ChangeMove {
  move: MoveData
  withTransition?: boolean
  attackedPos?: CellPos // for en passant captures
  transformTo?: Figure // for pawn promotion
}

/**
 * Arrow coordinates for drawing move arrows
 */
export interface ArrowCoords {
  start: number[]
  end: number[]
}

/**
 * Responsive sizing configuration for the chess board
 */
export interface ResponsiveSizing {
  boardSize?: number
  width?: number
  height?: number
  responsive?: boolean
  minSize?: number
  maxSize?: number
}