// TestWorkerService.ts - Test service for basic worker communication
export class TestWorkerService {
  private worker: Worker | null = null;
  private isReady: boolean = false;

  constructor() {
    this.initializeWorker();
  }

  private initializeWorker(): void {
    try {
      console.log('🔧 [TEST] Creating test worker...');
      
      // Research-based worker creation pattern
      this.worker = new Worker(
        new URL('../test-worker.js', import.meta.url),
        { type: 'module' }
      );
      
      console.log('🔧 [TEST] Test worker created, adding listeners...');
      
      this.worker.addEventListener('message', this.handleMessage.bind(this));
      this.worker.addEventListener('error', this.handleError.bind(this));
      
      // Test communication
      this.sendMessage({ type: 'ping' });
      
    } catch (error) {
      console.error('❌ [TEST] Failed to create test worker:', error);
    }
  }

  private handleMessage(event: MessageEvent): void {
    const message = event.data;
    
    switch (message.type) {
      case 'log':
        console.log('📝 [TEST]', message.message);
        break;
        
      case 'error':
        console.error('❌ [TEST]', message.message);
        break;
        
      case 'pong':
        console.log('🏓 [TEST] Received pong:', message.data);
        this.isReady = true;
        break;
        
      default:
        console.log('🔧 [TEST] Unknown message:', message);
    }
  }

  private handleError(error: ErrorEvent): void {
    console.error('💥 [TEST] Worker error:', error.message);
  }

  private sendMessage(message: any): void {
    if (this.worker) {
      console.log('📤 [TEST] Sending:', message.type);
      this.worker.postMessage(message);
    }
  }

  public testErrorHandling(): void {
    this.sendMessage({ type: 'test-error' });
  }

  public getStatus(): boolean {
    return this.isReady;
  }

  public destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}