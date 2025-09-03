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

import { validateUCIMove } from '../../utils/chess/computer-chess.utils';

interface StockfishEngine {
  send: (command: string, callback?: (response: string) => void, stream?: (line: string) => void) => void;
  quit: () => void;
  ready: boolean;
  loaded: boolean;
}

export class StockfishClient {
  private engine: StockfishEngine | null = null;
  private isReady = false;
  private pendingMoveRequest: {
    resolve: (result: ComputerMoveResult) => void;
    reject: (error: Error) => void;
    startTime: number;
  } | null = null;
  private currentEvaluation?: number;
  private currentDepth?: number;

  constructor() {
    this.initializeEngine().catch(error => {
      console.error('Failed to initialize engine in constructor:', error);
    });
  }

  /**
   * Initialize the Stockfish engine using proper loadEngine pattern
   */
  private async initializeEngine(): Promise<void> {
    try {
      console.log('🏗️ Initializing Stockfish engine...');
      
      // Use direct Worker approach with the copied files
      const wasmSupported = typeof WebAssembly === 'object' && 
                          WebAssembly.validate(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
      
      console.log('WASM supported:', wasmSupported);
      
      // Choose engine variant based on WASM support and requirements
      let enginePath: string;
      if (wasmSupported) {
        // Use lite single-threaded WASM for better compatibility
        enginePath = '/stockfish/stockfish-17.1-lite-single-03e3232.js';
      } else {
        // Fallback to ASM.js version
        enginePath = '/stockfish/stockfish-17.1-asm-341ff22.js';
      }
      
      console.log('Loading engine from:', enginePath);
      
      // Create engine using simple Worker approach
      this.engine = await this.createEngineWorker(enginePath);
      
      // Initialize UCI protocol
      await this.initializeUCI();
      
      console.log('✅ Stockfish engine initialized successfully');
      this.isReady = true;
      
    } catch (error) {
      console.error('❌ Failed to initialize Stockfish engine:', error);
      throw new Error('Failed to initialize chess engine');
    }
  }
  
  /**
   * Create engine worker and set up communication
   */
  private async createEngineWorker(enginePath: string): Promise<StockfishEngine> {
    return new Promise((resolve, reject) => {
      try {
        const worker = new Worker(enginePath);
        let isLoaded = false;
        let isReady = false;
        const messageQueue: Array<{command: string, callback?: (response: string) => void}> = [];
        
        const engine: StockfishEngine = {
          send: (command: string, callback?: (response: string) => void) => {
            if (!isReady && command !== 'uci' && command !== 'isready') {
              messageQueue.push({command, callback});
              return;
            }
            
            worker.postMessage(command);
            if (callback) {
              // Store callback for when response comes back
              this.pendingCallbacks.set(command, callback);
            }
          },
          quit: () => {
            worker.terminate();
          },
          ready: isReady,
          loaded: isLoaded
        };
        
        worker.onmessage = (event) => {
          const message = event.data.trim();
          console.log('🔄 Stockfish:', message);
          
          if (message === 'uciok') {
            isLoaded = true;
            console.log('✅ UCI protocol loaded');
          } else if (message === 'readyok') {
            isReady = true;
            engine.ready = true;
            console.log('✅ Engine ready');
            
            // Process queued messages
            messageQueue.forEach(({command, callback}) => {
              engine.send(command, callback);
            });
            messageQueue.length = 0;
            
            resolve(engine);
          } else if (message.startsWith('bestmove')) {
            console.log('🎯 Received bestmove, calling handleBestMove...');
            this.handleBestMove(message);
          } else if (message.startsWith('info')) {
            this.handleEngineInfo(message);
          }
          
          // Handle any pending callbacks
          this.processPendingCallbacks(message);
        };
        
        worker.onerror = (error) => {
          console.error('❌ Worker error:', error);
          reject(error);
        };
        
        // Resolve immediately with the engine interface
        // The ready state will be updated asynchronously
        setTimeout(() => {
          if (!isLoaded) {
            resolve(engine); // Return engine even if not ready yet
          }
        }, 1000);
        
      } catch (error) {
        reject(error);
      }
    });
  }
  
  private pendingCallbacks = new Map<string, (response: string) => void>();
  
  private processPendingCallbacks(message: string): void {
    // Simple callback processing - in a real implementation this would be more sophisticated
    for (const [command, callback] of this.pendingCallbacks.entries()) {
      if (message.includes(command) || message === 'uciok' || message === 'readyok') {
        callback(message);
        this.pendingCallbacks.delete(command);
        break;
      }
    }
  }
  
  /**
   * Initialize UCI protocol
   */
  private async initializeUCI(): Promise<void> {
    if (!this.engine) throw new Error('Engine not created');
    
    return new Promise((resolve) => {
      let uciReceived = false;
      let readyReceived = false;
      
      const checkReady = () => {
        if (uciReceived && readyReceived) {
          resolve();
        }
      };
      
      if (this.engine) {
        this.engine.send('uci', (response) => {
          if (response === 'uciok') {
            uciReceived = true;
            checkReady();
          }
        });
      }
      
      // Wait a bit then send isready
      setTimeout(() => {
        if (this.engine) {
          this.engine.send('isready', (response) => {
            if (response === 'readyok') {
              readyReceived = true;
              checkReady();
            }
          });
        }
      }, 500);
      
      // Fallback timeout
      setTimeout(() => {
        if (!uciReceived || !readyReceived) {
          console.warn('⚠️ UCI initialization timeout, proceeding anyway');
          resolve();
        }
      }, 5000);
    });
  }

  /**
   * Wait for engine to be ready
   */
  private async waitForEngine(maxWaitMs: number = 10000): Promise<void> {
    const startTime = Date.now();
    
    while (!this.isReady && (Date.now() - startTime) < maxWaitMs) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    if (!this.isReady) {
      throw new Error('Engine initialization timeout');
    }
  }

  /**
   * Send command to Stockfish engine
   */
  private sendCommand(command: string, callback?: (response: string) => void): void {
    if (!this.engine) {
      console.error('Engine not initialized');
      return;
    }
    this.engine.send(command, callback);
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
      
      console.log('✅ Stockfish returning successful move result:', result);
      this.pendingMoveRequest.resolve(result);
    } else {
      const result: ComputerMoveResult = {
        success: false,
        error: 'Invalid move returned by engine',
        thinkingTime
      };
      
      console.log('❌ Stockfish returning failed move result:', result);
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
    // Wait for engine to be ready if it's still initializing
    if (!this.isReady || !this.engine) {
      console.log('⏳ Engine not ready, waiting for initialization...');
      await this.waitForEngine();
    }
    
    if (!this.isReady || !this.engine) {
      return {
        success: false,
        error: 'Engine failed to initialize',
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

    console.log('🎯 Requesting move for position:', request.fen.substring(0, 30) + '...');

    return new Promise((resolve) => {
      this.pendingMoveRequest = {
        resolve,
        reject: (error: Error) => resolve({
          success: false,
          error: error.message,
          thinkingTime: 0
        }),
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
        console.log('🔍 Starting analysis with', timeMs, 'ms time limit');
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
    return this.isReady && !!this.engine;
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
   * Dispose of the engine
   */
  dispose(): void {
    if (this.engine) {
      this.engine.quit();
      this.engine = null;
    }
    
    this.isReady = false;
    this.pendingMoveRequest = null;
    this.pendingCallbacks.clear();
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