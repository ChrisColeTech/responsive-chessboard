// StockfishService.ts - Robust Stockfish Web Worker integration
export interface StockfishHandlers {
  onBestMove?: (move: string) => void;
  onInfo?: (info: string) => void;
  onError?: (error: string) => void;
}

export class StockfishService {
  private stockfish: Worker | null = null;
  private isReady: boolean = false;
  private pendingCommands: Map<string, (response: string) => void> = new Map();
  private messageQueue: string[] = [];
  private workerState: 'initializing' | 'ready' | 'error' | 'destroyed' = 'initializing';
  private handlers: StockfishHandlers = {};
  
  // Service-level single-flight guard for 'go' commands
  private currentSearch?: {
    promise: Promise<string>;
    resolve: (result: string) => void;
    reject: (error: unknown) => void;
    timeoutId?: NodeJS.Timeout;
  };

  constructor() {
    this.initializeEngine();
  }

  private initializeEngine(): void {
    try {
      console.log('🔧 [STOCKFISH] Creating worker...');
      this.workerState = 'initializing';
      
      // Use improved Stockfish worker with proper error handling
      const workerUrl = new URL('../stockfish-worker.js', import.meta.url);
      console.log('🔧 [STOCKFISH] Worker URL:', workerUrl.href);
      
      // Use classic worker (not ES module) to support importScripts()
      this.stockfish = new Worker(workerUrl);
      console.log('🔧 [STOCKFISH] Stockfish worker created successfully');
      
      console.log('🔧 [STOCKFISH] Worker created, adding listeners...');
      this.stockfish.addEventListener('message', this.handleMessage.bind(this));
      this.stockfish.addEventListener('error', this.handleError.bind(this));

      // Initialize UCI protocol (no response expected)
      this.sendCommand('uci', false);
      
      // Wait for UCI initialization before checking readiness
      let uciInitialized = false;
      
      const checkReadiness = () => {
        if (!uciInitialized) {
          console.log('⏳ [STOCKFISH] Waiting for UCI initialization...');
          return;
        }
        
        console.log('🔍 [STOCKFISH] UCI initialized, checking engine readiness...');
        this.sendCommand('isready').then(() => {
          clearTimeout(initTimeout);
          this.isReady = true;
          this.workerState = 'ready';
          console.log('🚀 [STOCKFISH] Engine ready for commands');
          this.processMessageQueue();
        }).catch(error => {
          clearTimeout(initTimeout);
          console.error('❌ [STOCKFISH] Failed to initialize:', error);
          this.workerState = 'error';
        });
      };
      
      // Set up a flag to track UCI initialization
      this.pendingCommands.set('uci_init', (response: string) => {
        if (response === 'uciok') {
          console.log('✅ [STOCKFISH] UCI initialization complete');
          uciInitialized = true;
          this.pendingCommands.delete('uci_init');
          // Small delay to ensure engine is fully ready
          setTimeout(checkReadiness, 100);
        }
      });
      
      // Wait for readiness with timeout
      const initTimeout = setTimeout(() => {
        if (this.workerState === 'initializing') {
          console.error('⏰ [STOCKFISH] Worker initialization timeout - no response after 10 seconds');
          this.workerState = 'error';
        }
      }, 10000); // Increased timeout

    } catch (error) {
      console.error('💥 [STOCKFISH] Failed to create worker:', error);
      this.workerState = 'error';
      this.isReady = false;
    }
  }

  private processMessageQueue(): void {
    while (this.messageQueue.length > 0 && this.workerState === 'ready') {
      const command = this.messageQueue.shift();
      if (command && this.stockfish) {
        console.log('📤 [STOCKFISH] Processing queued:', command);
        this.stockfish.postMessage(command);
      }
    }
  }

  private handleMessage(event: MessageEvent): void {
    const message = event.data;
    
    // Handle structured messages from our improved worker
    if (typeof message === 'object' && message.type) {
      switch (message.type) {
        case 'log':
          console.log('🔧 [WORKER]', message.message);
          return;
        case 'error':
          console.error('❌ [WORKER]', message.message);
          this.workerState = 'error';
          this.isReady = false;
          return;
      }
    }
    
    // Handle string messages (UCI protocol)
    const messageStr = typeof message === 'string' ? message : message.toString();
    
    // Filter out verbose engine analysis spam
    if (messageStr.startsWith('info depth') || 
        messageStr.startsWith('option name') || 
        messageStr.trim() === '') {
      return; // Skip noisy analysis output
    }
    
    console.log('🔧 [STOCKFISH]', messageStr);

    // Handle worker errors (legacy format)
    if (messageStr.startsWith('error:')) {
      console.error('❌ [STOCKFISH] Worker error:', messageStr);
      this.workerState = 'error';
      this.isReady = false;
      return;
    }

    // Handle UCI protocol responses
    if (message === 'uciok') {
      console.log('✅ [STOCKFISH] UCI protocol initialized');
      const uciInitCommand = this.pendingCommands.get('uci_init');
      if (uciInitCommand) {
        uciInitCommand(message);
      }
      return;
    }

    if (message === 'readyok') {
      const readyCommand = this.pendingCommands.get('isready');
      if (readyCommand) {
        readyCommand(message);
        this.pendingCommands.delete('isready');
      }
      return;
    }

    // Handle bestmove responses
    if (messageStr.startsWith('bestmove')) {
      console.log('♟️ [STOCKFISH] Received bestmove:', messageStr);
      
      // Service-level single-flight: resolve current search if active
      if (this.currentSearch) {
        console.log('✅ [STOCKFISH] Resolving current search promise');
        
        // Clean up timeout
        if (this.currentSearch.timeoutId) {
          clearTimeout(this.currentSearch.timeoutId);
        }
        
        this.currentSearch.resolve(messageStr);
        this.currentSearch = undefined;
      }
      
      // Legacy promise system (for compatibility)
      const bestMoveCommand = this.pendingCommands.get('bestmove');
      if (bestMoveCommand) {
        console.log('✅ [STOCKFISH] Resolving legacy bestmove promise');
        bestMoveCommand(messageStr);
        this.pendingCommands.delete('bestmove');
      }
      
      if (!this.currentSearch && !bestMoveCommand) {
        console.warn('⚠️ [STOCKFISH] Bestmove received but no handlers found');
      }
      return;
    }

    // Handle evaluation responses
    if (message.includes('cp ')) {
      const evalCommand = this.pendingCommands.get('evaluation');
      if (evalCommand) {
        evalCommand(message);
        this.pendingCommands.delete('evaluation');
      }
    }
  }

  private handleError(error: ErrorEvent): void {
    console.error('💥 [STOCKFISH] Worker error event:', error);
    console.error('💥 [STOCKFISH] Error details:', {
      message: error.message,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno,
      error: error.error
    });
    this.workerState = 'error';
    this.isReady = false;
  }

  private sendCommand(command: string, expectResponse: boolean = true): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.stockfish) {
        reject(new Error('Stockfish not initialized'));
        return;
      }

      if (!expectResponse) {
        this.stockfish.postMessage(command);
        resolve('');
        return;
      }

      const commandType = command.startsWith('go') ? 'bestmove' : 
                         command.startsWith('isready') ? 'isready' :
                         command.startsWith('position') ? 'position' :
                         command.split(' ')[0];
      
      // Clear any existing pending command of the same type to prevent conflicts
      if (this.pendingCommands.has(commandType)) {
        console.log(`⚠️ [STOCKFISH] Replacing existing pending command: ${commandType}`);
        this.pendingCommands.delete(commandType);
      }
      
      this.pendingCommands.set(commandType, resolve);
      console.log(`🔍 [STOCKFISH] Command '${command}' registered with key '${commandType}'`);
      console.log(`📊 [STOCKFISH] Pending commands:`, Array.from(this.pendingCommands.keys()));

      // Only log important commands, not routine ones
      if (!command.startsWith('setoption') && !command.startsWith('position')) {
        console.log('📤 [STOCKFISH] Sending:', command);
      }
      
      // Allow isready command during initialization (needed for two-stage init)
      if (this.workerState === 'ready' || (this.workerState === 'initializing' && command === 'isready')) {
        this.stockfish.postMessage(command);
      } else if (this.workerState === 'initializing') {
        console.log('📦 [STOCKFISH] Queuing command until ready:', command);
        this.messageQueue.push(command);
      } else {
        reject(new Error(`Cannot send command - worker state: ${this.workerState}`));
        return;
      }

      // Set timeout for commands
      setTimeout(() => {
        if (this.pendingCommands.has(commandType)) {
          console.error(`⏰ [STOCKFISH] TIMEOUT: Command '${command}' never resolved`);
          console.error(`🔍 [STOCKFISH] Final pending commands:`, Array.from(this.pendingCommands.keys()));
          this.pendingCommands.delete(commandType);
          reject(new Error(`Command timeout: ${command}`));
        }
      }, 15000); // 15 second timeout
    });
  }

  public async getBestMove(fen: string, skillLevel: number = 8, timeLimit: number = 1000): Promise<string | null> {
    if (!this.isReady || !this.stockfish) {
      console.warn('Stockfish not ready');
      return null;
    }

    try {
      // Set skill level (0-20, where 20 is strongest)
      await this.sendCommand(`setoption name Skill Level value ${Math.max(0, Math.min(20, skillLevel))}`, false);
      
      // Set position (no response expected)
      await this.sendCommand(`position fen ${fen}`, false);
      
      // Request best move with time limit (this will wait for bestmove response)
      const response = await this.sendCommand(`go movetime ${timeLimit}`);
      
      // Parse bestmove response: "bestmove e2e4 ponder e7e5"
      const match = response.match(/bestmove\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
      if (match) {
        return match[1];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting best move:', error);
      return null;
    }
  }

  public async evaluatePosition(fen: string, depth: number = 15): Promise<number> {
    if (!this.isReady || !this.stockfish) {
      console.warn('Stockfish not ready');
      return 0;
    }

    try {
      // Set position
      await this.sendCommand(`position fen ${fen}`);
      
      // Request evaluation
      const response = await this.sendCommand(`go depth ${depth}`);
      
      // Parse evaluation from info messages
      // Look for "info depth X score cp Y" pattern
      const cpMatch = response.match(/score cp (-?\d+)/);
      if (cpMatch) {
        return parseInt(cpMatch[1]) / 100; // Convert centipawns to pawns
      }

      // Look for mate scores "info depth X score mate Y"
      const mateMatch = response.match(/score mate (-?\d+)/);
      if (mateMatch) {
        const mateIn = parseInt(mateMatch[1]);
        return mateIn > 0 ? 999 : -999; // Large positive/negative for mate
      }
      
      return 0;
    } catch (error) {
      console.error('Error evaluating position:', error);
      return 0;
    }
  }

  public async setSkillLevel(level: number): Promise<void> {
    if (!this.isReady) {
      return;
    }

    const clampedLevel = Math.max(0, Math.min(20, level));
    await this.sendCommand(`setoption name Skill Level value ${clampedLevel}`);
  }

  public async setDepth(depth: number): Promise<void> {
    if (!this.isReady) {
      return;
    }

    const clampedDepth = Math.max(1, Math.min(20, depth));
    await this.sendCommand(`setoption name Depth value ${clampedDepth}`);
  }

  public destroy(): void {
    console.log('🔥 [STOCKFISH] Destroying service');
    this.workerState = 'destroyed';
    if (this.stockfish) {
      this.stockfish.terminate();
      this.stockfish = null;
    }
    this.isReady = false;
    this.pendingCommands.clear();
  }

  public isEngineReady(): boolean {
    return this.isReady;
  }

  public getWorkerState(): string {
    return this.workerState;
  }

  public getQueueLength(): number {
    return this.messageQueue.length;
  }

  public setHandlers(handlers: StockfishHandlers): void {
    console.log('🔗 [STOCKFISH] Setting/updating handlers atomically');
    // Atomic handler update to prevent race conditions
    this.handlers = { ...handlers };
    
    // Verify handlers are properly set
    console.log('🔍 [STOCKFISH] Handler verification:', {
      onBestMove: !!this.handlers.onBestMove,
      onInfo: !!this.handlers.onInfo,
      onError: !!this.handlers.onError
    });
  }

  public clearHandlers(): void {
    console.log('🔌 [STOCKFISH] Clearing handlers atomically');
    this.handlers = {};
  }

  // Service-level single-flight 'go' command
  private async goSingleFlight(opts: { movetime: number }): Promise<string> {
    if (this.currentSearch) {
      console.log('🔄 [STOCKFISH] Search already in progress - returning existing promise');
      return this.currentSearch.promise;
    }

    console.log('🎯 [STOCKFISH] Starting new single-flight search');
    
    // Create new search promise with timeout protection
    let resolveFunction: (result: string) => void;
    let rejectFunction: (error: unknown) => void;
    let timeoutId: NodeJS.Timeout | undefined;
    
    const promise = new Promise<string>((resolve, reject) => {
      resolveFunction = resolve;
      rejectFunction = reject;
      
      // Add timeout protection (3x the movetime + buffer)
      const timeoutMs = opts.movetime * 3 + 2000;
      timeoutId = setTimeout(() => {
        console.error('⏰ [STOCKFISH] Single-flight search timeout after', timeoutMs, 'ms');
        this.currentSearch = undefined;
        reject(new Error(`Search timeout after ${timeoutMs}ms`));
      }, timeoutMs);
    });
    
    this.currentSearch = {
      promise,
      resolve: resolveFunction!,
      reject: rejectFunction!,
      timeoutId
    };

    try {
      // Send the go command
      if (!this.stockfish) {
        throw new Error('Worker not available');
      }
      this.stockfish.postMessage(`go movetime ${opts.movetime}`);
      console.log('📤 [STOCKFISH] Single-flight go command sent');
      
      const result = await this.currentSearch!.promise;
      
      // Clean up timeout on success
      if (this.currentSearch?.timeoutId) {
        clearTimeout(this.currentSearch.timeoutId);
      }
      this.currentSearch = undefined;
      
      return result;
    } catch (error) {
      // Clean up on error
      if (this.currentSearch?.timeoutId) {
        clearTimeout(this.currentSearch.timeoutId);
      }
      this.currentSearch = undefined;
      throw error;
    }
  }

  // Always send position before go commands for HMR safety
  public async getBestMoveWithPosition(fen: string, skillLevel: number = 8, timeLimit: number = 1000): Promise<string | null> {
    if (!this.isReady || !this.stockfish) {
      console.warn('Stockfish not ready');
      return null;
    }

    try {
      // Always resync position before requesting move (HMR safety)
      console.log('🔄 [STOCKFISH] Resyncing position for HMR safety');
      await this.sendCommand('ucinewgame', false); // Clear internal state
      await this.sendCommand(`setoption name Skill Level value ${Math.max(0, Math.min(20, skillLevel))}`, false);
      await this.sendCommand(`position fen ${fen}`, false);
      
      // Use service-level single-flight go command
      const response = await this.goSingleFlight({ movetime: timeLimit });
      
      // Parse bestmove response
      const match = response.match(/bestmove\s+([a-h][1-8][a-h][1-8][qrbn]?)/);
      if (match) {
        const move = match[1];
        // Atomic handler invocation with verification
        console.log('🎯 [STOCKFISH] About to invoke onBestMove handler:', !!this.handlers.onBestMove);
        if (this.handlers.onBestMove) {
          this.handlers.onBestMove(move);
          console.log('✅ [STOCKFISH] onBestMove handler invoked successfully');
        } else {
          console.warn('⚠️ [STOCKFISH] onBestMove handler missing at invocation time');
        }
        return move;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting best move:', error);
      // Atomic error handler invocation
      if (this.handlers.onError) {
        this.handlers.onError(error instanceof Error ? error.message : 'Unknown error');
        console.log('✅ [STOCKFISH] onError handler invoked successfully');
      } else {
        console.warn('⚠️ [STOCKFISH] onError handler missing at error time');
      }
      return null;
    }
  }
}