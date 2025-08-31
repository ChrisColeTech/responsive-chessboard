/**
 * Configuration utilities
 */

import type { ChessBoardConfig } from '../../types'
import { DEFAULT_COLORS, DEFAULT_CELL_SIZE } from '../../constants'
import { CHESS_PIECES_MAP } from '../pieces'

/**
 * Default chess board configuration
 */
export const DEFAULT_CHESSBOARD_CONFIG: ChessBoardConfig = {
  cellSize: DEFAULT_CELL_SIZE,
  whiteCellColor: DEFAULT_COLORS.WHITE_CELL,
  blackCellColor: DEFAULT_COLORS.BLACK_CELL,
  selectedCellColor: DEFAULT_COLORS.SELECTED_CELL,
  selectedCellBorder: DEFAULT_COLORS.SELECTED_CELL_BORDER,
  markedCellColor: DEFAULT_COLORS.MARKED_CELL,
  circleMarkColor: DEFAULT_COLORS.CIRCLE_MARK,
  arrowColor: DEFAULT_COLORS.ARROW,
  checkedCellColor: DEFAULT_COLORS.CHECKED_CELL,
  piecesMap: CHESS_PIECES_MAP,
}

/**
 * Build complete chess board configuration from partial config
 */
export const getChessBoardConfig = (
  config?: Partial<ChessBoardConfig>
): ChessBoardConfig => {
  if (!config) return DEFAULT_CHESSBOARD_CONFIG

  return {
    ...DEFAULT_CHESSBOARD_CONFIG,
    ...config,
  }
}