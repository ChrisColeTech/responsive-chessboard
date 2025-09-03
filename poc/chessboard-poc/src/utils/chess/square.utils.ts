/**
 * Square Utilities
 * Following Document 02 Architecture Guide - Pure utility functions
 */

import type { SquareNotation, ChessPosition, File, Rank } from '../../types';

/**
 * Convert square notation to position object
 * @param square - Square notation like 'e4'
 * @returns Position object with file and rank
 */
export function squareToPosition(square: SquareNotation): ChessPosition {
  if (!square || square.length < 2) {
    throw new Error(`Invalid square notation: ${square}`);
  }
  
  const file = square[0] as File;
  const rankStr = square[1];
  
  if (!rankStr) {
    throw new Error(`Invalid square notation: ${square}`);
  }
  
  const rank = parseInt(rankStr, 10) as Rank;
  
  return { file, rank };
}

/**
 * Convert position object to square notation
 * @param position - Position object with file and rank
 * @returns Square notation like 'e4'
 */
export function positionToSquare(position: ChessPosition): SquareNotation {
  return `${position.file}${position.rank}` as SquareNotation;
}

/**
 * Document 18 Research #1: Check if square is light colored
 * h1 should be light (verified pattern)
 * @param square - Square notation
 * @returns True if square is light colored
 */
export function isLightSquare(square: SquareNotation): boolean {
  const { file, rank } = squareToPosition(square);
  const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
  // Document 18 research: (fileIndex + rank) % 2 === 0 for light squares
  return (fileIndex + rank) % 2 === 0;
}