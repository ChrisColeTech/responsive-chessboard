// Calculations
export {
  degrees,
  calcAngle,
  correctGrabbingPosByScroll,
  correctGrabbingPosForArrow
} from './calculations/geometry'

export {
  calculateBoardSize,
  constrainSize,
  calculateCellSize,
  generateCSSProperties
} from './calculations/responsive'

// Layout utilities
export {
  getIsLightCell,
  getFilledArrayBySize,
  getFigureCSS,
  mapCellsToFiguresArray,
  checkIsPossibleMove,
  checkPositionsHas,
  checkIsCastlingMove,
  hasCheck,
  getFiguresByColor
} from './layout/board'

export {
  DEFAULT_CHESSBOARD_CONFIG,
  getChessBoardConfig
} from './layout/config'

// Pieces
export { CHESS_PIECES_MAP } from './pieces'