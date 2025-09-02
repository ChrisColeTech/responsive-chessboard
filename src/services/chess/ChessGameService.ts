/**
 * Chess Game Service
 * Handles chess game logic using Chess.js
 */

import { Chess } from 'chess.js';
import type {
  ChessGameState,
  ChessMoveInput,
  ChessMove,
  ChessPiece,
  ChessPosition,
  SquareNotation,
  PieceColor,
  GameStatus,
  MoveValidationResult
} from '../../types/chess.types';
import {
  squareNotationToPosition,
  positionToSquareNotation,
  createInitialPosition
} from '../../utils/chess.utils';

/**
 * Service for managing chess game state and operations
 */
export class ChessGameService {
  private chess: Chess;
  
  constructor(initialFen?: string) {
    this.chess = new Chess(initialFen);
  }
  
  /**
   * Get current game state
   */
  getGameState(): ChessGameState {
    const fen = this.chess.fen();
    const position = this.createPositionFromBoard();
    const lastMove = this.getLastMove();
    const moveHistory = this.getMoveHistory();
    const currentPlayer = this.chess.turn() === 'w' ? 'white' : 'black';
    
    const gameStatus = this.getGameStatus();
    const isCheck = this.chess.isCheck();
    const isCheckmate = this.chess.isCheckmate();
    const isStalemate = this.chess.isStalemate();
    const isDraw = this.chess.isDraw();
    
    return {
      position,
      currentPlayer,
      gameStatus,
      lastMove,
      moveHistory,
      fen,
      isCheck,
      isCheckmate,
      isStalemate,
      isDraw,
      halfMoveClock: 0, // Will be implemented when available
      fullMoveNumber: this.chess.moveNumber(),
      castlingRights: {
        whiteKingSide: true, // Will be implemented when available
        whiteQueenSide: true,
        blackKingSide: true,
        blackQueenSide: true
      },
      enPassantSquare: null // Will be implemented when available
    };
  }
  
  /**
   * Make a move
   */
  makeMove(moveInput: ChessMoveInput): MoveValidationResult {
    try {
      const move = this.chess.move({
        from: moveInput.from,
        to: moveInput.to,
        promotion: moveInput.promotion || 'q'
      });
      
      if (!move) {
        return {
          isValid: false,
          error: 'Invalid move'
        };
      }
      
      const chessMove = this.convertToChessMove(move);
      
      return {
        isValid: true,
        move: chessMove
      };
    } catch (error) {
      return {
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  /**
   * Undo last move
   */
  undoMove(): boolean {
    const undoResult = this.chess.undo();
    return undoResult !== null;
  }
  
  /**
   * Reset game to initial position or specific FEN
   */
  reset(fen?: string): void {
    if (fen) {
      this.chess.load(fen);
    } else {
      this.chess.reset();
    }
  }
  
  /**
   * Get valid moves for a square
   */
  getValidMoves(square: SquareNotation): SquareNotation[] {
    const moves = this.chess.moves({ square, verbose: true });
    return moves.map(move => move.to as SquareNotation);
  }
  
  /**
   * Get all valid moves for current player
   */
  getAllValidMoves(): SquareNotation[] {
    const moves = this.chess.moves({ verbose: true });
    return moves.map(move => move.to as SquareNotation);
  }
  
  /**
   * Check if a square is under attack
   */
  isSquareAttacked(square: SquareNotation, byColor: PieceColor): boolean {
    return this.chess.isAttacked(square, byColor === 'white' ? 'w' : 'b');
  }
  
  /**
   * Get piece at square
   */
  getPiece(square: SquareNotation): ChessPiece | null {
    const piece = this.chess.get(square);
    if (!piece) return null;
    
    return this.convertToChessPiece(piece, square);
  }
  
  /**
   * Load position from FEN
   */
  loadFen(fen: string): boolean {
    try {
      this.chess.load(fen);
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Get current FEN
   */
  getFen(): string {
    return this.chess.fen();
  }
  
  /**
   * Get PGN of the game
   */
  getPgn(): string {
    return this.chess.pgn();
  }
  
  private getGameStatus(): GameStatus {
    if (this.chess.isCheckmate()) return 'checkmate';
    if (this.chess.isStalemate()) return 'stalemate';
    if (this.chess.isDraw()) return 'draw';
    if (this.chess.isCheck()) return 'check';
    return 'playing';
  }
  
  private getLastMove(): ChessMove | null {
    const history = this.chess.history({ verbose: true });
    if (history.length === 0) return null;
    
    const lastMove = history[history.length - 1];
    return this.convertToChessMove(lastMove);
  }
  
  private getMoveHistory(): readonly ChessMove[] {
    const history = this.chess.history({ verbose: true });
    return history.map(move => this.convertToChessMove(move));
  }
  
  private convertToChessMove(move: any): ChessMove {
    const piece = this.convertToChessPiece(move.piece, move.from);
    
    return {
      piece,
      from: move.from as SquareNotation,
      to: move.to as SquareNotation,
      captured: move.captured ? this.convertToChessPiece({ type: move.captured, color: move.color === 'w' ? 'b' : 'w' }, move.to) : undefined,
      promotion: move.promotion as any,
      isCheck: move.flags.includes('+'),
      isCheckmate: move.flags.includes('#'),
      isStalemate: false,
      san: move.san,
      fen: this.chess.fen()
    };
  }
  
  private convertToChessPiece(piece: any, square: SquareNotation): ChessPiece {
    const color = piece.color === 'w' ? 'white' : 'black';
    const type = piece.type === 'p' ? 'pawn' :
                 piece.type === 'r' ? 'rook' :
                 piece.type === 'n' ? 'knight' :
                 piece.type === 'b' ? 'bishop' :
                 piece.type === 'q' ? 'queen' :
                 'king';
    
    return {
      id: `${color}-${type}-${square}`,
      type,
      color
    };
  }
  
  private createPositionFromBoard(): Record<SquareNotation, ChessPiece | null> {
    const position = createInitialPosition();
    
    // Clear all squares first
    for (const square in position) {
      position[square as SquareNotation] = null;
    }
    
    // Populate with current pieces
    // For now, use get() method to check each square
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    
    for (const file of files) {
      for (const rank of ranks) {
        const square = `${file}${rank}` as SquareNotation;
        const piece = this.chess.get(square);
        if (piece) {
          position[square] = this.convertToChessPiece(piece, square);
        }
      }
    }
    
    return position;
  }
}