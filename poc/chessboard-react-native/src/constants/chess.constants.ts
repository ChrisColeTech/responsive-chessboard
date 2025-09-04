// chess.constants.ts - Chess game constants
export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const RANKS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export const PIECE_TYPES = ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'] as const;
export const PIECE_COLORS = ['white', 'black'] as const;

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

export const DEFAULT_BOARD_SIZE = 600;
export const MIN_BOARD_SIZE = 200;
export const MAX_BOARD_SIZE = 800;