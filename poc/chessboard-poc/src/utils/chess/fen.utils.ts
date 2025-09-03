/**
 * FEN Utilities
 * Following Document 02 Architecture Guide - Pure utility functions
 */

import type { ChessPiece, SquareNotation, PieceType, PieceColor } from '../../types';

/**
 * Parse FEN position string into piece map
 * @param fen - FEN string
 * @returns Map of squares to pieces
 */
export function parseFenPosition(fen: string): Map<SquareNotation, ChessPiece> {
  const position = new Map<SquareNotation, ChessPiece>();
  const boardPart = fen.split(' ')[0];
  
  if (!boardPart) {
    throw new Error(`Invalid FEN: ${fen}`);
  }
  
  const ranks = boardPart.split('/');
  
  for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
    const rankString = ranks[rankIndex];
    if (!rankString) continue;
    
    let fileIndex = 0;
    
    for (const char of rankString) {
      if (char >= '1' && char <= '8') {
        // Empty squares
        fileIndex += parseInt(char, 10);
      } else {
        // Piece
        const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
        const rank = 8 - rankIndex;
        const square = `${file}${rank}` as SquareNotation;
        
        const color: PieceColor = char === char.toUpperCase() ? 'w' : 'b';
        const type = char.toLowerCase() as PieceType;
        
        position.set(square, { type, color });
        fileIndex++;
      }
    }
  }
  
  return position;
}

/**
 * Create initial chess position
 * @returns Map of squares to pieces for starting position
 */
export function createInitialPosition(): Map<SquareNotation, ChessPiece> {
  const position = new Map<SquareNotation, ChessPiece>();
  
  // White pieces
  position.set('a1', { type: 'r', color: 'w' });
  position.set('b1', { type: 'n', color: 'w' });
  position.set('c1', { type: 'b', color: 'w' });
  position.set('d1', { type: 'q', color: 'w' });
  position.set('e1', { type: 'k', color: 'w' });
  position.set('f1', { type: 'b', color: 'w' });
  position.set('g1', { type: 'n', color: 'w' });
  position.set('h1', { type: 'r', color: 'w' });
  
  // White pawns
  for (const file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
    position.set(`${file}2` as SquareNotation, { type: 'p', color: 'w' });
  }
  
  // Black pieces
  position.set('a8', { type: 'r', color: 'b' });
  position.set('b8', { type: 'n', color: 'b' });
  position.set('c8', { type: 'b', color: 'b' });
  position.set('d8', { type: 'q', color: 'b' });
  position.set('e8', { type: 'k', color: 'b' });
  position.set('f8', { type: 'b', color: 'b' });
  position.set('g8', { type: 'n', color: 'b' });
  position.set('h8', { type: 'r', color: 'b' });
  
  // Black pawns
  for (const file of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
    position.set(`${file}7` as SquareNotation, { type: 'p', color: 'b' });
  }
  
  return position;
}