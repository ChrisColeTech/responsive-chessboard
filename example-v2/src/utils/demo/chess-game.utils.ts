// SRP: Chess.js integration utilities for demo
import { Chess } from 'chess.js';
import type { FreePlayGameState, MoveHistoryEntry, DemoError } from '@/types/demo/demo.types';
import { INITIAL_FEN, DEMO_ERROR_MESSAGES } from '@/constants/demo/chessboard-demo.constants';

/**
 * Creates a new chess instance with initial position
 */
export const createNewChessGame = (fen: string = INITIAL_FEN): Chess => {
  try {
    const chess = new Chess(fen);
    return chess;
  } catch (error) {
    console.error('Error creating chess game:', error);
    // Fallback to standard starting position
    return new Chess();
  }
};

/**
 * Converts Chess.js instance to our game state format
 */
export const createGameStateFromChess = (chess: Chess): FreePlayGameState => {
  const history = chess.history({ verbose: true });
  const capturedPieces = getCapturedPieces(chess);
  
  return {
    chess,
    currentFen: chess.fen(),
    isGameOver: chess.isGameOver(),
    isCheck: chess.inCheck(),
    isCheckmate: chess.isCheckmate(),
    isStalemate: chess.isStalemate(),
    isDraw: chess.isDraw(),
    turn: chess.turn() === 'w' ? 'white' : 'black',
    moveCount: Math.floor(chess.history().length / 2) + 1,
    capturedPieces,
    lastMove: history.length > 0 ? formatMove(history[history.length - 1]) : null,
    gameResult: getGameResult(chess)
  };
};

/**
 * Attempts to make a move on the chess instance
 */
export const makeChessMove = (chess: Chess, move: string): { success: boolean; error?: DemoError } => {
  try {
    const result = chess.move(move);
    if (result) {
      return { success: true };
    } else {
      return { 
        success: false, 
        error: {
          type: 'invalid_move',
          message: DEMO_ERROR_MESSAGES.invalid_move,
          timestamp: Date.now(),
          context: { move }
        }
      };
    }
  } catch (error) {
    return { 
      success: false, 
      error: {
        type: 'invalid_move',
        message: DEMO_ERROR_MESSAGES.invalid_move,
        timestamp: Date.now(),
        context: { move, error: error instanceof Error ? error.message : 'Unknown error' }
      }
    };
  }
};

/**
 * Gets captured pieces for both sides
 */
export const getCapturedPieces = (chess: Chess): { white: string[]; black: string[] } => {
  const history = chess.history({ verbose: true });
  const captured: { white: string[]; black: string[] } = { white: [], black: [] };
  
  history.forEach(move => {
    if (move.captured) {
      const capturedPiece = move.captured;
      const capturingColor = move.color === 'w' ? 'white' : 'black';
      captured[capturingColor].push(capturedPiece);
    }
  });
  
  return captured;
};

/**
 * Formats a move object to standard notation
 */
export const formatMove = (move: any): string => {
  if (typeof move === 'string') return move;
  return move.san || `${move.from}-${move.to}`;
};

/**
 * Gets the game result string
 */
export const getGameResult = (chess: Chess): string | null => {
  if (chess.isCheckmate()) {
    return chess.turn() === 'w' ? '0-1' : '1-0'; // Winner is opposite of current turn
  }
  if (chess.isStalemate() || chess.isDraw()) {
    return '1/2-1/2';
  }
  return null;
};

/**
 * Converts move history to our format
 */
export const getMoveHistory = (chess: Chess): MoveHistoryEntry[] => {
  const moves = chess.history();
  const history: MoveHistoryEntry[] = [];
  
  for (let i = 0; i < moves.length; i += 2) {
    const moveNumber = Math.floor(i / 2) + 1;
    const whiteMove = moves[i];
    const blackMove = moves[i + 1];
    
    // Create a chess instance to get the FEN after each move
    const tempChess = new Chess();
    for (let j = 0; j <= i + (blackMove ? 1 : 0); j++) {
      tempChess.move(moves[j]);
    }
    
    history.push({
      moveNumber,
      white: whiteMove,
      black: blackMove,
      fen: tempChess.fen(),
      timestamp: Date.now() - (moves.length - i) * 1000 // Approximate timestamps
    });
  }
  
  return history;
};

/**
 * Validates a FEN string
 */
export const validateFEN = (fen: string): boolean => {
  try {
    new Chess(fen);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets possible moves for a square
 */
export const getPossibleMoves = (chess: Chess, square: string): string[] => {
  const moves = chess.moves({
    square: square as any,
    verbose: true
  });
  return moves.map(move => move.to);
};

/**
 * Checks if a move is legal
 */
export const isMoveLegal = (chess: Chess, from: string, to: string): boolean => {
  const moves = chess.moves({ verbose: true });
  return moves.some(move => move.from === from && move.to === to);
};

/**
 * Undoes the last move
 */
export const undoLastMove = (chess: Chess): boolean => {
  try {
    const undoneMove = chess.undo();
    return undoneMove !== null;
  } catch {
    return false;
  }
};

/**
 * Resets the chess game to initial position
 */
export const resetChessGame = (chess: Chess, fen: string = INITIAL_FEN): boolean => {
  try {
    chess.load(fen);
    return true;
  } catch {
    return false;
  }
};

/**
 * Gets the current turn as a readable string
 */
export const getCurrentTurnText = (chess: Chess): string => {
  const turn = chess.turn() === 'w' ? 'White' : 'Black';
  if (chess.isCheckmate()) {
    const winner = chess.turn() === 'w' ? 'Black' : 'White';
    return `${winner} wins by checkmate!`;
  }
  if (chess.isCheck()) {
    return `${turn} is in check`;
  }
  if (chess.isStalemate()) {
    return 'Stalemate - Draw!';
  }
  if (chess.isDraw()) {
    return 'Draw!';
  }
  return `${turn} to move`;
};

/**
 * Gets piece count for material display
 */
export const getPieceCount = (chess: Chess): Record<string, number> => {
  const board = chess.board();
  const count: Record<string, number> = {
    wK: 0, wQ: 0, wR: 0, wB: 0, wN: 0, wP: 0,
    bK: 0, bQ: 0, bR: 0, bB: 0, bN: 0, bP: 0
  };
  
  board.flat().forEach(square => {
    if (square) {
      const pieceKey = `${square.color}${square.type.toUpperCase()}`;
      count[pieceKey]++;
    }
  });
  
  return count;
};