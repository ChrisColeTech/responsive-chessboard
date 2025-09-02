/**
 * Chess-specific type definitions
 * Core domain types for chess game mechanics
 */

// Basic chess piece types
export type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
export type PieceColor = 'white' | 'black';

// Square notation (e.g., 'e4', 'a1')
export type FileNotation = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
export type RankNotation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type SquareNotation = `${FileNotation}${RankNotation}`;

// Chess piece definition
export interface ChessPiece {
  readonly id: string;
  readonly type: PieceType;
  readonly color: PieceColor;
}

// Board position (file/rank coordinates)
export interface ChessPosition {
  readonly file: FileNotation;
  readonly rank: RankNotation;
}

// Chess move input
export interface ChessMoveInput {
  readonly from: SquareNotation;
  readonly to: SquareNotation;
  readonly promotion?: PieceType;
}

// Chess move result
export interface ChessMove {
  readonly piece: ChessPiece;
  readonly from: SquareNotation;
  readonly to: SquareNotation;
  readonly captured?: ChessPiece;
  readonly promotion?: PieceType;
  readonly isCheck?: boolean;
  readonly isCheckmate?: boolean;
  readonly isStalemate?: boolean;
  readonly san: string; // Standard Algebraic Notation
  readonly fen: string; // Position after move
}

// Game state
export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';

export interface ChessGameState {
  readonly position: Record<SquareNotation, ChessPiece | null>;
  readonly currentPlayer: PieceColor;
  readonly gameStatus: GameStatus;
  readonly lastMove: ChessMove | null;
  readonly moveHistory: readonly ChessMove[];
  readonly fen: string;
  readonly isCheck: boolean;
  readonly isCheckmate: boolean;
  readonly isStalemate: boolean;
  readonly isDraw: boolean;
  readonly halfMoveClock: number;
  readonly fullMoveNumber: number;
  readonly castlingRights: {
    readonly whiteKingSide: boolean;
    readonly whiteQueenSide: boolean;
    readonly blackKingSide: boolean;
    readonly blackQueenSide: boolean;
  };
  readonly enPassantSquare: SquareNotation | null;
}

// Move validation result
export interface MoveValidationResult {
  readonly isValid: boolean;
  readonly error?: string;
  readonly move?: ChessMove;
}