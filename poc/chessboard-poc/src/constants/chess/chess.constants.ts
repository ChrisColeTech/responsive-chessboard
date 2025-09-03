/**
 * Chess Constants
 * Following Document 02 Architecture Guide - Domain organization
 */

import type { File, Rank, PieceType, ChessboardTheme, PieceSet } from '../../types';

export const FILES: readonly File[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const;
export const RANKS: readonly Rank[] = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const PIECE_TYPES: readonly PieceType[] = ['p', 'n', 'b', 'r', 'q', 'k'] as const;

export const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const THEMES: readonly ChessboardTheme[] = ['classic', 'green', 'blue', 'purple', 'wood'] as const;
export const PIECE_SETS: readonly PieceSet[] = ['classic', 'modern', 'tournament'] as const;

export const PIECE_UNICODE = {
  'wK': '♔', 'wQ': '♕', 'wR': '♖', 'wB': '♗', 'wN': '♘', 'wP': '♙',
  'bK': '♚', 'bQ': '♛', 'bR': '♜', 'bB': '♝', 'bN': '♞', 'bP': '♟'
} as const;