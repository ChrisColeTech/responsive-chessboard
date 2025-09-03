// pieces.constants.ts - Piece set definitions
export const PIECE_SETS = {
  classic: 'classic',
  modern: 'modern',
  tournament: 'tournament',
  executive: 'executive',
  conqueror: 'conqueror'
} as const;

export const PIECE_UNICODE = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟'
} as const;

export const PIECE_NAMES = {
  king: 'King',
  queen: 'Queen', 
  rook: 'Rook',
  bishop: 'Bishop',
  knight: 'Knight',
  pawn: 'Pawn'
} as const;