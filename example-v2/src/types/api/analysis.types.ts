// Chess analysis and position evaluation types
export interface PositionAnalysis {
  readonly fen: string;
  readonly evaluation: {
    readonly centipawns: number;
    readonly mate?: number;
    readonly type: 'cp' | 'mate';
  };
  readonly bestMove: string;
  readonly principalVariation: string[];
  readonly depth: number;
  readonly nodes: number;
  readonly time: number;
  readonly multipv: Array<{
    readonly move: string;
    readonly evaluation: {
      readonly centipawns: number;
      readonly mate?: number;
    };
    readonly pv: string[];
  }>;
}

export interface BestMoveResponse {
  readonly bestMove: string;
  readonly evaluation: {
    readonly centipawns: number;
    readonly mate?: number;
  };
  readonly pv: string[];
  readonly depth: number;
}

export interface OpeningInfo {
  readonly name: string;
  readonly eco: string;
  readonly moves: string[];
  readonly fen: string;
  readonly popularity: number;
  readonly whiteWinRate: number;
  readonly blackWinRate: number;
  readonly drawRate: number;
  readonly continuations: Array<{
    readonly move: string;
    readonly popularity: number;
    readonly results: {
      readonly white: number;
      readonly black: number;
      readonly draw: number;
    };
  }>;
}

export interface AnalysisRequest {
  readonly fen: string;
  readonly depth: number;
  readonly multiPv: number;
  readonly timeout?: number;
}

// Auth-related missing types
export interface RefreshTokenRequest {
  readonly refreshToken: string;
}

export interface UpdateProfileRequest {
  readonly username?: string;
  readonly displayName?: string;
  readonly email?: string;
  readonly preferences?: {
    readonly boardTheme?: string;
    readonly pieceSet?: string;
    readonly soundEnabled?: boolean;
  };
}

export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}