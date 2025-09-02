// Chess domain types
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';
export type BoardOrientation = 'white' | 'black';
export type GameStatus = 'setup' | 'active' | 'checkmate' | 'stalemate' | 'draw' | 'timeout' | 'resigned';

export interface ChessPosition {
  readonly rank: number;
  readonly file: string;
}

export interface ChessPiece {
  readonly type: PieceType;
  readonly color: PieceColor;
  readonly id: string;
}

export interface ChessMove {
  readonly from: string;
  readonly to: string;
  readonly promotion?: PieceType;
  readonly san?: string;
  readonly fen?: string;
}

export interface ChessMoveInput {
  readonly from: string;
  readonly to: string;
  readonly promotion?: PieceType;
  readonly timeSpent?: number;
}

export interface ChessMoveResult {
  readonly success: boolean;
  readonly move?: ChessMove;
  readonly gameState: ChessGameState;
  readonly error?: string;
}

export interface ChessGameState {
  readonly position: Map<string, ChessPiece>;
  readonly activeColor: PieceColor;
  readonly fen: string;
  readonly isCheck: boolean;
  readonly isCheckmate: boolean;
  readonly isStalemate: boolean;
  readonly lastMove?: ChessMove;
  readonly moves: ChessMove[];
}

export interface Move extends ChessMove {
  readonly player: PieceColor;
}

export interface ChessGameHook {
  readonly gameState: ChessGameState | null;
  readonly isLoading: boolean;
  readonly makeMove: (move: ChessMoveInput) => Promise<boolean>;
  readonly resetGame: (fen?: string) => void;
  readonly isGameOver: boolean;
}