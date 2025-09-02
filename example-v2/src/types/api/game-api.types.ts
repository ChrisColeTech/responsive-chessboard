// Game API specific types
import { GameConfig, GameResult, MoveResult } from '../chess/game.types';
import { ChessMoveInput } from '../chess/chess.types';

export interface GameCreateRequest {
  readonly aiLevel: number;
  readonly color: 'white' | 'black' | 'random';
  readonly timeControl?: string;
}

export interface GameCreateResponse {
  readonly gameId: string;
  readonly currentFen: string;
  readonly playerColor: 'white' | 'black';
  readonly aiLevel: number;
  readonly timeControl: string;
}

export interface GameMoveRequest {
  readonly move: {
    readonly from: string;
    readonly to: string;
    readonly promotion?: string;
  };
  readonly timeSpent: number;
}

export interface GameMoveResponse {
  readonly playerMove: {
    readonly from: string;
    readonly to: string;
    readonly san: string;
    readonly fen: string;
  };
  readonly aiMove?: {
    readonly from: string;
    readonly to: string;
    readonly san: string;
    readonly fen: string;
  };
  readonly newFen: string;
  readonly gameStatus: 'active' | 'checkmate' | 'stalemate' | 'draw' | 'timeout';
}

export interface GameHistoryResponse {
  readonly games: Array<{
    readonly id: string;
    readonly playerColor: 'white' | 'black';
    readonly aiLevel: number;
    readonly result: string;
    readonly startedAt: string;
    readonly endedAt?: string;
    readonly moves: number;
  }>;
}

export interface GameStatsResponse {
  readonly totalGames: number;
  readonly wins: number;
  readonly draws: number;
  readonly losses: number;
  readonly currentRating: number;
  readonly ratingChange: number;
}

// Additional types for detailed game information
export interface GameDetails {
  readonly id: string;
  readonly playerColor: 'white' | 'black';
  readonly aiLevel: number;
  readonly status: 'active' | 'checkmate' | 'stalemate' | 'draw' | 'timeout';
  readonly result?: string;
  readonly moves: Array<{
    readonly from: string;
    readonly to: string;
    readonly san: string;
    readonly fen: string;
    readonly timestamp: string;
  }>;
  readonly startTime: string;
  readonly endTime?: string;
  readonly timeControl: string;
  readonly initialFen: string;
  readonly finalFen?: string;
}

export interface GameEndRequest {
  readonly gameId: string;
  readonly reason: 'resignation' | 'draw_offer' | 'timeout' | 'abandon';
}

export interface GameEndResult {
  readonly success: boolean;
  readonly finalStatus: 'active' | 'checkmate' | 'stalemate' | 'draw' | 'timeout';
  readonly result: string;
}