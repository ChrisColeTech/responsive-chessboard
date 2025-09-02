// Chess game utilities
import type { PieceType, PieceColor, ChessPosition } from '@/types';

export const parsePosition = (square: string): ChessPosition => {
  const file = square.charAt(0);
  const rank = parseInt(square.charAt(1), 10);
  return { rank, file };
};

export const positionToSquare = (position: ChessPosition): string => {
  return `${position.file}${position.rank}`;
};

export const isValidSquare = (square: string): boolean => {
  if (square.length !== 2) return false;
  const file = square.charAt(0);
  const rank = square.charAt(1);
  return /^[a-h]$/.test(file) && /^[1-8]$/.test(rank);
};

export const getPieceValue = (pieceType: PieceType): number => {
  const values: Record<PieceType, number> = {
    pawn: 1,
    rook: 5,
    knight: 3,
    bishop: 3,
    queen: 9,
    king: 0,
  };
  return values[pieceType];
};

export const getOppositeColor = (color: PieceColor): PieceColor => {
  return color === 'white' ? 'black' : 'white';
};

export const isLightSquare = (square: string): boolean => {
  const { rank, file } = parsePosition(square);
  const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
  return (fileIndex + rank) % 2 === 0;
};

export const getSquareColor = (square: string): 'light' | 'dark' => {
  return isLightSquare(square) ? 'light' : 'dark';
};