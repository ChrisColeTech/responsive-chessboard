/**
 * Utilities index
 * Re-exports all utility functions
 */

// Chess utilities
export {
  positionToSquareNotation,
  squareNotationToPosition,
  isValidSquareNotation,
  getAllSquares,
  getSquareDistance,
  isSameRank,
  isSameFile,
  isSameDiagonal,
  getSquaresBetween,
  getOppositeColor,
  createInitialPosition,
  isLightSquare
} from './chess.utils';

// Common utility - class name helper
export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return classes.map(cls => {
    if (typeof cls === 'object' && cls !== null) {
      return Object.entries(cls).filter(([_, condition]) => condition).map(([key, _]) => key).join(' ');
    }
    return cls;
  }).filter(Boolean).join(' ');
}