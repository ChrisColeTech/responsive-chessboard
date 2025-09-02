/**
 * Chess utility functions
 * Pure functions for chess-related calculations
 */

import type {
  ChessPosition,
  SquareNotation,
  FileNotation,
  RankNotation,
  ChessPiece,
  PieceColor
} from '../types/chess.types';

// File and rank mappings
const FILES: readonly FileNotation[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS: readonly RankNotation[] = [1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Convert position object to square notation
 */
export function positionToSquareNotation(position: ChessPosition): SquareNotation {
  return `${position.file}${position.rank}`;
}

/**
 * Convert square notation to position object
 */
export function squareNotationToPosition(square: SquareNotation): ChessPosition {
  if (!isValidSquareNotation(square)) {
    throw new Error(`Invalid square notation: ${square}`);
  }
  
  const file = square.charAt(0) as FileNotation;
  const rank = parseInt(square.charAt(1), 10) as RankNotation;
  
  return { file, rank };
}

/**
 * Validate square notation format
 */
export function isValidSquareNotation(square: string): square is SquareNotation {
  if (square.length !== 2) return false;
  
  const file = square.charAt(0);
  const rank = square.charAt(1);
  
  return FILES.includes(file as FileNotation) && 
         RANKS.includes(parseInt(rank, 10) as RankNotation);
}

/**
 * Get all valid squares on the board in visual grid order
 * For white orientation: rank 8 to 1, files a to h (top-left to bottom-right)
 * For black orientation: rank 1 to 8, files h to a
 */
export function getAllSquares(boardOrientation: 'white' | 'black' = 'white'): SquareNotation[] {
  const squares: SquareNotation[] = [];
  
  if (boardOrientation === 'white') {
    // White on bottom: start from rank 8 (top row) down to rank 1 (bottom row)
    for (let rank = 8; rank >= 1; rank--) {
      for (const file of FILES) {
        squares.push(`${file}${rank}` as SquareNotation);
      }
    }
  } else {
    // Black on bottom: start from rank 1 (top row) up to rank 8 (bottom row)  
    for (let rank = 1; rank <= 8; rank++) {
      for (const file of FILES.slice().reverse()) {
        squares.push(`${file}${rank}` as SquareNotation);
      }
    }
  }
  
  return squares;
}

/**
 * Calculate distance between two squares
 */
export function getSquareDistance(from: SquareNotation, to: SquareNotation): number {
  const fromPos = squareNotationToPosition(from);
  const toPos = squareNotationToPosition(to);
  
  const fileDistance = Math.abs(FILES.indexOf(fromPos.file) - FILES.indexOf(toPos.file));
  const rankDistance = Math.abs(fromPos.rank - toPos.rank);
  
  return Math.max(fileDistance, rankDistance);
}

/**
 * Check if two squares are on the same rank
 */
export function isSameRank(square1: SquareNotation, square2: SquareNotation): boolean {
  return squareNotationToPosition(square1).rank === squareNotationToPosition(square2).rank;
}

/**
 * Check if two squares are on the same file
 */
export function isSameFile(square1: SquareNotation, square2: SquareNotation): boolean {
  return squareNotationToPosition(square1).file === squareNotationToPosition(square2).file;
}

/**
 * Check if two squares are on the same diagonal
 */
export function isSameDiagonal(square1: SquareNotation, square2: SquareNotation): boolean {
  const pos1 = squareNotationToPosition(square1);
  const pos2 = squareNotationToPosition(square2);
  
  const fileDistance = Math.abs(FILES.indexOf(pos1.file) - FILES.indexOf(pos2.file));
  const rankDistance = Math.abs(pos1.rank - pos2.rank);
  
  return fileDistance === rankDistance && fileDistance > 0;
}

/**
 * Get squares between two squares (not including endpoints)
 */
export function getSquaresBetween(from: SquareNotation, to: SquareNotation): SquareNotation[] {
  const fromPos = squareNotationToPosition(from);
  const toPos = squareNotationToPosition(to);
  
  const fromFileIndex = FILES.indexOf(fromPos.file);
  const toFileIndex = FILES.indexOf(toPos.file);
  const fromRank = fromPos.rank;
  const toRank = toPos.rank;
  
  const squares: SquareNotation[] = [];
  
  // Determine direction
  const fileStep = toFileIndex === fromFileIndex ? 0 : (toFileIndex > fromFileIndex ? 1 : -1);
  const rankStep = toRank === fromRank ? 0 : (toRank > fromRank ? 1 : -1);
  
  // Must be straight line or diagonal
  if (fileStep !== 0 && rankStep !== 0 && Math.abs(toFileIndex - fromFileIndex) !== Math.abs(toRank - fromRank)) {
    return [];
  }
  
  let currentFileIndex = fromFileIndex + fileStep;
  let currentRank = fromRank + rankStep;
  
  while (currentFileIndex !== toFileIndex || currentRank !== toRank) {
    squares.push(`${FILES[currentFileIndex]}${currentRank}` as SquareNotation);
    currentFileIndex += fileStep;
    currentRank += rankStep;
  }
  
  return squares;
}

/**
 * Get opposite color
 */
export function getOppositeColor(color: PieceColor): PieceColor {
  return color === 'white' ? 'black' : 'white';
}

/**
 * Create initial chess position
 */
export function createInitialPosition(): Record<SquareNotation, ChessPiece | null> {
  const position: Record<SquareNotation, ChessPiece | null> = {} as Record<SquareNotation, ChessPiece | null>;
  
  // Initialize all squares to null
  for (const square of getAllSquares()) {
    position[square] = null;
  }
  
  // Place white pieces
  position['a1'] = { id: 'white-rook-1', type: 'rook', color: 'white' };
  position['b1'] = { id: 'white-knight-1', type: 'knight', color: 'white' };
  position['c1'] = { id: 'white-bishop-1', type: 'bishop', color: 'white' };
  position['d1'] = { id: 'white-queen', type: 'queen', color: 'white' };
  position['e1'] = { id: 'white-king', type: 'king', color: 'white' };
  position['f1'] = { id: 'white-bishop-2', type: 'bishop', color: 'white' };
  position['g1'] = { id: 'white-knight-2', type: 'knight', color: 'white' };
  position['h1'] = { id: 'white-rook-2', type: 'rook', color: 'white' };
  
  // White pawns
  for (let i = 0; i < 8; i++) {
    const file = FILES[i];
    position[`${file}2` as SquareNotation] = { id: `white-pawn-${i + 1}`, type: 'pawn', color: 'white' };
  }
  
  // Place black pieces
  position['a8'] = { id: 'black-rook-1', type: 'rook', color: 'black' };
  position['b8'] = { id: 'black-knight-1', type: 'knight', color: 'black' };
  position['c8'] = { id: 'black-bishop-1', type: 'bishop', color: 'black' };
  position['d8'] = { id: 'black-queen', type: 'queen', color: 'black' };
  position['e8'] = { id: 'black-king', type: 'king', color: 'black' };
  position['f8'] = { id: 'black-bishop-2', type: 'bishop', color: 'black' };
  position['g8'] = { id: 'black-knight-2', type: 'knight', color: 'black' };
  position['h8'] = { id: 'black-rook-2', type: 'rook', color: 'black' };
  
  // Black pawns
  for (let i = 0; i < 8; i++) {
    const file = FILES[i];
    position[`${file}7` as SquareNotation] = { id: `black-pawn-${i + 1}`, type: 'pawn', color: 'black' };
  }
  
  return position;
}

/**
 * Check if square is light colored
 */
export function isLightSquare(square: SquareNotation): boolean {
  const position = squareNotationToPosition(square);
  const fileIndex = FILES.indexOf(position.file);
  const rankIndex = position.rank - 1; // Convert to 0-based
  
  return (fileIndex + rankIndex) % 2 === 0;
}