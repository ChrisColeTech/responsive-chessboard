/**
 * Stockfish Engine Client
 * Domain: Chess - External engine communication
 * Architecture: Infrastructure layer - handles UCI protocol communication
 */

import type { 
  ComputerMoveRequest, 
  ComputerMoveResult, 
  ComputerDifficulty,
  EngineAnalysis
} from '../../types/chess/computer-opponent.types';

import { STOCKFISH_UCI_OPTIONS } from '../../constants/chess/computer-difficulty.constants';
import { validateUCIMove } from '../../utils/chess/computer-chess.utils';

export interface StockfishWorkerMessage {
  readonly type: 'ready' | 'bestmove' | 'info' | 'error';
  readonly data: string;
  readonly evaluation?: number;
  readonly depth?: number;
  readonly pv?: string[];
  readonly error?: string;
}

export class StockfishClient {
  private worker: Worker | null = null;
  private isReady = false;
  private messageQueue: string[] = [];
  private pendingMoveRequest: {
    resolve: (result: ComputerMoveResult) => void;
    reject: (error: Error) => void;
    startTime: number;
  } | null = null;
  private currentEvaluation?: number;
  private currentDepth?: number;

  constructor() {
    this.initializeEngine();
  }

  /**
   * Initialize the Stockfish engine worker
   */
  private async initializeEngine(): Promise<void> {
    try {
      // Use placeholder for now - focus on drag and drop testing first
      this.worker = new Worker('/stockfish/stockfish.js');
      
      this.worker.onmessage = (event: MessageEvent<string>) => {
        this.handleWorkerMessage(event.data);
      };

      this.worker.onerror = (error) => {
        console.error('Stockfish worker error:', error);
        this.isReady = false;
      };

      // Send initial UCI commands
      this.sendCommand('uci');
    } catch (error) {
      console.error('Failed to initialize Stockfish worker:', error);
      throw new Error('Failed to initialize chess engine');
    }
  }

  /**
   * Handle messages from the Stockfish worker
   */
  private handleWorkerMessage(data: string): void {
    const message = data.trim();

    if (message === 'uciok') {
      this.setupEngine();
    } else if (message === 'readyok') {
      this.isReady = true;
      this.processMessageQueue();
    } else if (message.startsWith('bestmove')) {
      this.handleBestMove(message);
    } else if (message.startsWith('info')) {
      this.handleEngineInfo(message);
    }
  }

  /**
   * Setup engine options after UCI initialization
   */
  private setupEngine(): void {
    // Set UCI options
    Object.entries(STOCKFISH_UCI_OPTIONS).forEach(([option, value]) => {
      this.sendCommand(`setoption name ${option} value ${value}`);
    });

    // Signal ready
    this.sendCommand('isready');
  }

  /**
   * Process queued messages when engine is ready
   */
  private processMessageQueue(): void {
    while (this.messageQueue.length > 0 && this.isReady) {
      const command = this.messageQueue.shift();
      if (command) {
        this.worker?.postMessage(command);
      }
    }
  }

  /**
   * Send command to Stockfish engine
   */
  private sendCommand(command: string): void {
    if (this.isReady && this.worker) {
      this.worker.postMessage(command);
    } else {
      this.messageQueue.push(command);
    }
  }

  /**
   * Handle best move response from engine
   */
  private handleBestMove(message: string): void {
    if (!this.pendingMoveRequest) return;

    const moveMatch = message.match(/bestmove\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
    const move = moveMatch?.[1];

    const thinkingTime = Date.now() - this.pendingMoveRequest.startTime;

    if (move && validateUCIMove(move)) {
      const result: ComputerMoveResult = {
        success: true,
        move,
        thinkingTime,
        evaluation: this.currentEvaluation,
        depth: this.currentDepth
      };
      
      this.pendingMoveRequest.resolve(result);
    } else {
      const result: ComputerMoveResult = {
        success: false,
        error: 'Invalid move returned by engine',
        thinkingTime
      };
      
      this.pendingMoveRequest.resolve(result);
    }

    // Reset state
    this.pendingMoveRequest = null;
    this.currentEvaluation = undefined;
    this.currentDepth = undefined;
  }

  /**
   * Handle engine analysis info
   */
  private handleEngineInfo(message: string): void {
    // Parse evaluation
    const scoreMatch = message.match(/score cp (-?\d+)/);
    if (scoreMatch) {
      this.currentEvaluation = parseInt(scoreMatch[1], 10);
    }

    // Parse search depth
    const depthMatch = message.match(/depth (\d+)/);
    if (depthMatch) {
      this.currentDepth = parseInt(depthMatch[1], 10);
    }
  }

  /**
   * Calculate skill level based on difficulty
   */
  private getSkillLevel(difficulty: ComputerDifficulty): number {
    // Map difficulty 1-10 to skill level 0-20
    return Math.floor((difficulty - 1) * 2.2);
  }

  /**
   * Request computer move
   */
  async requestMove(request: ComputerMoveRequest): Promise<ComputerMoveResult> {
    if (!this.isReady) {
      return {
        success: false,
        error: 'Engine not ready',
        thinkingTime: 0
      };
    }

    if (this.pendingMoveRequest) {
      return {
        success: false,
        error: 'Engine busy with another request',
        thinkingTime: 0
      };
    }

    return new Promise((resolve, reject) => {
      this.pendingMoveRequest = {
        resolve,
        reject,
        startTime: Date.now()
      };

      try {
        // Set skill level for this difficulty
        const skillLevel = this.getSkillLevel(request.difficulty);
        this.sendCommand(`setoption name Skill Level value ${skillLevel}`);

        // Set position
        this.sendCommand(`position fen ${request.fen}`);

        // Start search with time limit
        const timeMs = Math.min(request.timeLimit, 10000); // Max 10 seconds
        this.sendCommand(`go movetime ${timeMs}`);

      } catch (error) {
        this.pendingMoveRequest = null;
        resolve({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          thinkingTime: 0
        });
      }
    });
  }

  /**
   * Get current engine analysis
   */
  getCurrentAnalysis(): EngineAnalysis | null {
    if (this.currentEvaluation === undefined || this.currentDepth === undefined) {
      return null;
    }

    return {
      evaluation: this.currentEvaluation / 100, // Convert from centipawns
      depth: this.currentDepth,
      principalVariation: [],
      timeSpent: 0,
      nodesSearched: undefined
    };
  }

  /**
   * Stop current engine calculation
   */
  stop(): void {
    if (this.pendingMoveRequest) {
      this.sendCommand('stop');
    }
  }

  /**
   * Check if engine is ready
   */
  isEngineReady(): boolean {
    return this.isReady;
  }

  /**
   * Reset engine to initial state
   */
  reset(): void {
    this.sendCommand('ucinewgame');
    this.currentEvaluation = undefined;
    this.currentDepth = undefined;
  }

  /**
   * Dispose of the engine worker
   */
  dispose(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    
    this.isReady = false;
    this.messageQueue.length = 0;
    this.pendingMoveRequest = null;
  }
}

// Singleton instance for global access
let stockfishInstance: StockfishClient | null = null;

/**
 * Get or create the global Stockfish instance
 */
export function getStockfishClient(): StockfishClient {
  if (!stockfishInstance) {
    stockfishInstance = new StockfishClient();
  }
  return stockfishInstance;
}

/**
 * Dispose of the global Stockfish instance
 */
export function disposeStockfishClient(): void {
  if (stockfishInstance) {
    stockfishInstance.dispose();
    stockfishInstance = null;
  }
}