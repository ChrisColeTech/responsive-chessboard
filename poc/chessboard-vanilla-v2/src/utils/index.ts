// index.ts - Utils exports barrel
export {
  positionToSquare,
  squareToPosition,
  isValidPosition,
  getSquareColor,
  isValidFile,
  isValidRank,
  fileToIndex,
  rankToIndex,
  indexToFile,
  indexToRank,
  generateSquareList
} from './chess.utils';

export {
  squareToCoordinates,
  coordinatesToSquare,
  isValidSquare,
  getSquareDistance,
  getAdjacentSquares
} from './coordinate.utils';

export type {
  BoardCoordinates
} from './coordinate.utils';