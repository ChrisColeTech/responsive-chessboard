// Chess Training API client - handles auth, games, and backend integration
import type { 
  LoginCredentials, 
  AuthResult, 
  User, 
  GameConfig, 
  GameResult, 
  MoveResult,
  ChessMoveInput,
  GameCreateRequest,
  GameCreateResponse,
  GameMoveRequest,
  GameMoveResponse,
  GameDetails,
  GameEndRequest,
  GameEndResult,
  AnalysisRequest,
  PositionAnalysis,
  BestMoveResponse,
  OpeningInfo,
  UpdateProfileRequest,
  ChangePasswordRequest
} from '@/types';
import { ChessTrainingAPIError } from '@/types';
import { AUTH_ENDPOINTS, GAME_ENDPOINTS, USER_ENDPOINTS } from '@/constants';
import { HttpClient } from './HttpClient';

export class ChessTrainingAPIClient {
  constructor(private readonly httpClient: HttpClient) {}

  // Authentication methods
  public async authenticateUser(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const response = await this.httpClient.post(AUTH_ENDPOINTS.LOGIN, {
        email: credentials.email,
        password: credentials.password
      });

      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Authentication failed - invalid response');
      }

      // Backend returns: {success: true, data: {user: {...}, tokens: {accessToken, refreshToken}}}
      return {
        success: true,
        token: response.data.tokens.accessToken,
        refreshToken: response.data.tokens.refreshToken,
        user: response.data.user
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Authentication failed', 401, error);
    }
  }

  public async getCurrentUser(): Promise<User> {
    try {
      const response = await this.httpClient.get(AUTH_ENDPOINTS.ME);
      
      if (!response.success || !(response as any).user) {
        throw new ChessTrainingAPIError('Failed to get current user');
      }

      return (response as any).user;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get current user', 401, error);
    }
  }

  public async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const response = await this.httpClient.post(AUTH_ENDPOINTS.REFRESH, {
        refreshToken
      });

      if (!response.success || !(response as any).accessToken) {
        throw new ChessTrainingAPIError('Token refresh failed');
      }

      return {
        token: (response as any).accessToken,
        refreshToken: refreshToken // Backend doesn't return new refresh token, reuse current one
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Token refresh failed', 401, error);
    }
  }

  // Game methods
  public async createGame(gameConfig: GameConfig): Promise<GameResult> {
    try {
      const request: GameCreateRequest = {
        aiLevel: gameConfig.difficulty,
        color: gameConfig.playerColor === 'random' ? 'random' : gameConfig.playerColor,
        timeControl: gameConfig.timeControl || '10+0'
      };

      const response = await this.httpClient.post<GameCreateResponse>(GAME_ENDPOINTS.CREATE, request);

      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Game creation failed');
      }

      return {
        id: response.data.gameId,
        initialFen: response.data.currentFen,
        playerColor: response.data.playerColor,
        aiLevel: response.data.aiLevel,
        timeControl: response.data.timeControl,
        status: 'active'
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Game creation failed', 500, error);
    }
  }

  public async submitMove(gameId: string, move: ChessMoveInput): Promise<MoveResult> {
    try {
      const request: GameMoveRequest = {
        move: {
          from: move.from,
          to: move.to,
          promotion: move.promotion
        },
        timeSpent: move.timeSpent || 0
      };

      const response = await this.httpClient.post<GameMoveResponse>(
        GAME_ENDPOINTS.MOVE(gameId), 
        request
      );

      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Move submission failed');
      }

      return {
        success: true,
        playerMove: {
          from: response.data.playerMove.from,
          to: response.data.playerMove.to,
          san: response.data.playerMove.san,
          fen: response.data.playerMove.fen
        },
        aiMove: response.data.aiMove ? {
          from: response.data.aiMove.from,
          to: response.data.aiMove.to,
          san: response.data.aiMove.san,
          fen: response.data.aiMove.fen
        } : undefined,
        newFen: response.data.newFen,
        gameStatus: response.data.gameStatus
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Move submission failed', 400, error);
    }
  }

  public async getGameHistory(limit: number = 10) {
    try {
      const response = await this.httpClient.get(`${GAME_ENDPOINTS.HISTORY}?limit=${limit}&status=completed`);
      
      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to get game history');
      }

      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get game history', 500, error);
    }
  }

  // User dashboard methods
  public async getDashboardStats() {
    try {
      const response = await this.httpClient.get(USER_ENDPOINTS.DASHBOARD_STATS);
      
      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to get dashboard stats');
      }

      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get dashboard stats', 500, error);
    }
  }

  public async updateUserProgress(progressData: any) {
    try {
      const response = await this.httpClient.put(USER_ENDPOINTS.PROGRESS, progressData);
      
      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to update user progress');
      }

      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to update user progress', 500, error);
    }
  }

  public async getGameDetails(gameId: string): Promise<GameDetails> {
    try {
      const response = await this.httpClient.get(`/games/${gameId}`);
      
      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to get game details');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get game details', 404, error);
    }
  }

  public async endGame(request: GameEndRequest): Promise<GameEndResult> {
    try {
      const response = await this.httpClient.delete(`/games/${request.gameId}`);
      
      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to end game');
      }
      
      return {
        success: true,
        finalStatus: response.data.status,
        result: response.data.result
      };
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to end game', 400, error);
    }
  }

  // Analysis methods
  public async analyzePosition(request: AnalysisRequest): Promise<PositionAnalysis> {
    try {
      const response = await this.httpClient.post('/analysis/analyze', {
        fen: request.fen,
        depth: request.depth,
        multiPv: request.multiPv,
        timeout: request.timeout
      });
      
      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to analyze position');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to analyze position', 500, error);
    }
  }

  public async getBestMove(fen: string, depth: number = 12): Promise<BestMoveResponse> {
    try {
      const response = await this.httpClient.post('/analysis/best-move', {
        fen,
        depth
      });
      
      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to get best move');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to get best move', 500, error);
    }
  }

  public async identifyOpening(moves: string[]): Promise<OpeningInfo> {
    try {
      const response = await this.httpClient.post('/analysis/opening', {
        moves
      });
      
      if (!response.success || !response.data) {
        throw new ChessTrainingAPIError('Failed to identify opening');
      }
      
      return response.data;
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to identify opening', 500, error);
    }
  }

  public async getCachedAnalysis(fen: string): Promise<PositionAnalysis | null> {
    try {
      const response = await this.httpClient.get(`/analysis/stored/${encodeURIComponent(fen)}`);
      
      if (!response.success) {
        return null; // No cached analysis available
      }
      
      return response.data;
    } catch (error) {
      // Return null for missing cached analysis instead of throwing
      return null;
    }
  }

  public async updateProfile(profileUpdate: UpdateProfileRequest): Promise<void> {
    try {
      const response = await this.httpClient.put('/user/profile', profileUpdate);
      
      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to update profile');
      }
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to update profile', 400, error);
    }
  }

  public async changePassword(passwordChange: ChangePasswordRequest): Promise<void> {
    try {
      const response = await this.httpClient.put('/user/password', {
        currentPassword: passwordChange.currentPassword,
        newPassword: passwordChange.newPassword
      });
      
      if (!response.success) {
        throw new ChessTrainingAPIError('Failed to change password');
      }
    } catch (error) {
      if (error instanceof ChessTrainingAPIError) {
        throw error;
      }
      throw new ChessTrainingAPIError('Failed to change password', 400, error);
    }
  }
}