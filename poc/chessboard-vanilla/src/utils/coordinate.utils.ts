// coordinate.utils.ts - Board coordinate system utilities
import type { File, Rank } from '../types/chess.types';

export const fileToIndex = (file: File): number => {
  return file.charCodeAt(0) - 'a'.charCodeAt(0);
};

export const rankToIndex = (rank: Rank): number => {
  return rank - 1;
};

export const indexToFile = (index: number): File => {
  if (index < 0 || index > 7) {
    throw new Error(`Invalid file index: ${index}`);
  }
  return String.fromCharCode('a'.charCodeAt(0) + index) as File;
};

export const indexToRank = (index: number): Rank => {
  if (index < 0 || index > 7) {
    throw new Error(`Invalid rank index: ${index}`);
  }
  return (index + 1) as Rank;
};

export const getSquareIndex = (file: File, rank: Rank, orientation: 'white' | 'black' = 'white'): number => {
  const fileIndex = fileToIndex(file);
  const rankIndex = rankToIndex(rank);
  
  if (orientation === 'white') {
    return (7 - rankIndex) * 8 + fileIndex;
  } else {
    return rankIndex * 8 + (7 - fileIndex);
  }
};

export const indexToSquare = (index: number, orientation: 'white' | 'black' = 'white'): { file: File; rank: Rank } => {
  if (index < 0 || index > 63) {
    throw new Error(`Invalid square index: ${index}`);
  }
  
  let fileIndex: number;
  let rankIndex: number;
  
  if (orientation === 'white') {
    rankIndex = 7 - Math.floor(index / 8);
    fileIndex = index % 8;
  } else {
    rankIndex = Math.floor(index / 8);
    fileIndex = 7 - (index % 8);
  }
  
  return {
    file: indexToFile(fileIndex),
    rank: indexToRank(rankIndex)
  };
};