/**
 * Board Utilities
 * Following Document 02 Architecture Guide - Pure utility functions
 */

import type { SquareNotation, BoardOrientation } from '../../types';
import { FILES, RANKS } from '../../constants/chess/chess.constants';

/**
 * Get all squares in correct order for board display
 * @param orientation - Board orientation ('white' or 'black')
 * @returns Array of squares in display order
 */
export function getBoardSquares(orientation: BoardOrientation = 'white'): SquareNotation[] {
  const squares: SquareNotation[] = [];
  
  // Document 18 Research: Proper orientation handling
  const displayRanks = orientation === 'white' ? [...RANKS].reverse() : [...RANKS];
  const displayFiles = orientation === 'black' ? [...FILES].reverse() : [...FILES];
  
  for (const rank of displayRanks) {
    for (const file of displayFiles) {
      squares.push(`${file}${rank}` as SquareNotation);
    }
  }
  
  return squares;
}

/**
 * Get all 64 squares of the board
 * @returns Array of all squares from a1 to h8
 */
export function getAllSquares(): SquareNotation[] {
  const squares: SquareNotation[] = [];
  
  for (const rank of RANKS) {
    for (const file of FILES) {
      squares.push(`${file}${rank}` as SquareNotation);
    }
  }
  
  return squares;
}