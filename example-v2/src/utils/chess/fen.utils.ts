// FEN string utilities
import type { PieceType, PieceColor, ChessPiece } from '@/types';

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const validateFen = (fen: string): boolean => {
  if (!fen || typeof fen !== 'string') return false;
  
  const parts = fen.split(' ');
  if (parts.length !== 6) return false;
  
  // Validate piece placement
  const ranks = parts[0].split('/');
  if (ranks.length !== 8) return false;
  
  for (const rank of ranks) {
    let squares = 0;
    for (const char of rank) {
      if (/[1-8]/.test(char)) {
        squares += parseInt(char, 10);
      } else if (/[rnbqkpRNBQKP]/.test(char)) {
        squares += 1;
      } else {
        return false;
      }
    }
    if (squares !== 8) return false;
  }
  
  // Validate active color
  if (!['w', 'b'].includes(parts[1])) return false;
  
  // Validate castling rights
  if (!/^[KQkq]*$/.test(parts[2]) && parts[2] !== '-') return false;
  
  // Validate en passant target
  if (parts[3] !== '-' && !/^[a-h][36]$/.test(parts[3])) return false;
  
  // Validate halfmove clock
  if (!/^\d+$/.test(parts[4])) return false;
  
  // Validate fullmove number
  if (!/^\d+$/.test(parts[5]) || parseInt(parts[5], 10) < 1) return false;
  
  return true;
};

export const parseFenPosition = (fen: string): Map<string, ChessPiece> => {
  const position = new Map<string, ChessPiece>();
  
  if (!validateFen(fen)) return position;
  
  const boardState = fen.split(' ')[0];
  const ranks = boardState.split('/');
  
  ranks.forEach((rank, rankIndex) => {
    let fileIndex = 0;
    
    for (const char of rank) {
      if (/[1-8]/.test(char)) {
        fileIndex += parseInt(char, 10);
      } else if (/[rnbqkpRNBQKP]/.test(char)) {
        const file = String.fromCharCode('a'.charCodeAt(0) + fileIndex);
        const rankNumber = 8 - rankIndex;
        const square = `${file}${rankNumber}`;
        
        const piece: ChessPiece = {
          type: getPieceType(char),
          color: char === char.toUpperCase() ? 'white' : 'black',
          id: `${square}-${char}`,
        };
        
        position.set(square, piece);
        fileIndex += 1;
      }
    }
  });
  
  return position;
};

export const getPieceType = (fenChar: string): PieceType => {
  const lowerChar = fenChar.toLowerCase();
  switch (lowerChar) {
    case 'p': return 'pawn';
    case 'r': return 'rook';
    case 'n': return 'knight';
    case 'b': return 'bishop';
    case 'q': return 'queen';
    case 'k': return 'king';
    default: throw new Error(`Invalid FEN piece character: ${fenChar}`);
  }
};

export const getFenActiveColor = (fen: string): PieceColor => {
  if (!validateFen(fen)) return 'white';
  return fen.split(' ')[1] === 'w' ? 'white' : 'black';
};

export const getFenCastlingRights = (fen: string): string => {
  if (!validateFen(fen)) return 'KQkq';
  return fen.split(' ')[2];
};

export const getFenEnPassantTarget = (fen: string): string | null => {
  if (!validateFen(fen)) return null;
  const target = fen.split(' ')[3];
  return target === '-' ? null : target;
};

export const getFenHalfmoveClock = (fen: string): number => {
  if (!validateFen(fen)) return 0;
  return parseInt(fen.split(' ')[4], 10);
};

export const getFenFullmoveNumber = (fen: string): number => {
  if (!validateFen(fen)) return 1;
  return parseInt(fen.split(' ')[5], 10);
};