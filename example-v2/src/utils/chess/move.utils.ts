// Move parsing and validation utilities
import type { ChessMove, ChessMoveInput } from '@/types';
import { isValidSquare } from './chess.utils';

export const parseMove = (moveString: string): ChessMoveInput | null => {
  // Handle standard algebraic notation (SAN) to coordinates
  // This is a simplified parser - full implementation would be more complex
  const moveRegex = /^([a-h][1-8])([a-h][1-8])([qrbn])?$/;
  const match = moveString.toLowerCase().match(moveRegex);
  
  if (!match) return null;
  
  const [, from, to, promotion] = match;
  
  if (!isValidSquare(from) || !isValidSquare(to)) return null;
  
  return {
    from,
    to,
    promotion: promotion as any,
  };
};

export const formatMove = (move: ChessMove): string => {
  return move.san || `${move.from}${move.to}`;
};

export const isCastleMove = (move: ChessMoveInput): boolean => {
  // King-side castling
  if ((move.from === 'e1' && move.to === 'g1') || (move.from === 'e8' && move.to === 'g8')) {
    return true;
  }
  // Queen-side castling
  if ((move.from === 'e1' && move.to === 'c1') || (move.from === 'e8' && move.to === 'c8')) {
    return true;
  }
  return false;
};

export const isPromotionMove = (move: ChessMoveInput): boolean => {
  const toRank = parseInt(move.to.charAt(1), 10);
  return (toRank === 1 || toRank === 8) && Boolean(move.promotion);
};

export const getMoveDistance = (from: string, to: string): number => {
  const fromFile = from.charCodeAt(0) - 'a'.charCodeAt(0);
  const fromRank = parseInt(from.charAt(1), 10);
  const toFile = to.charCodeAt(0) - 'a'.charCodeAt(0);
  const toRank = parseInt(to.charAt(1), 10);
  
  const fileDistance = Math.abs(toFile - fromFile);
  const rankDistance = Math.abs(toRank - fromRank);
  
  return Math.max(fileDistance, rankDistance);
};