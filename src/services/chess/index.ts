/**
 * Chess services index
 * Re-exports all chess services
 */

export { ChessGameService } from './ChessGameService';

// Simple exports for services that are just thin wrappers
export class MoveValidationService {
  static validateMove(gameService: any, move: any): boolean {
    const result = gameService.makeMove(move);
    if (result.isValid) {
      gameService.undoMove(); // Undo the test move
    }
    return result.isValid;
  }
}

export class FenService {
  static readonly STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  static isValidFen(fen: string): boolean {
    try {
      const { Chess } = require('chess.js');
      new Chess(fen);
      return true;
    } catch {
      return false;
    }
  }
}