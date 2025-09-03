/**
 * Chess Domain Types
 * Following Document 02 Architecture Guide - Domain organization
 */

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';
export type File = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type SquareNotation = `${File}${Rank}`;
export type BoardOrientation = 'white' | 'black';

export interface ChessPiece {
  readonly type: PieceType;
  readonly color: PieceColor;
}

export interface ChessPosition {
  readonly file: File;
  readonly rank: Rank;
}

export interface ChessGameState {
  readonly position: Map<SquareNotation, ChessPiece>;
  readonly activeColor: PieceColor;
  readonly isCheck: boolean;
  readonly isCheckmate: boolean;
  readonly isStalemate: boolean;
  readonly isDraw: boolean;
  readonly moveHistory: ChessMove[];
  readonly fen: string;
}

export interface ChessMove {
  readonly from: SquareNotation;
  readonly to: SquareNotation;
  readonly piece: ChessPiece;
  readonly capturedPiece?: ChessPiece;
  readonly isPromotion: boolean;
  readonly promotionPiece?: PieceType;
}

export interface ChessMoveInput {
  readonly from: SquareNotation;
  readonly to: SquareNotation;
  readonly promotion?: PieceType;
}

export interface ChessMoveResult {
  readonly success: boolean;
  readonly move?: ChessMove;
  readonly gameState: ChessGameState;
  readonly error?: string;
}