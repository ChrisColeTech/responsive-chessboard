// Direct Stockfish test - simple script to test engine loading
console.log('🧪 [DIRECT TEST] Starting direct Stockfish test');

const testStockfish = () => {
  try {
    console.log('🔧 [DIRECT TEST] Creating worker...');
    
    const worker = new Worker(
      new URL('./stockfish-worker.js', import.meta.url)
    );
    
    console.log('✅ [DIRECT TEST] Worker created successfully');
    
    worker.addEventListener('message', (event) => {
      const message = event.data;
      console.log('📨 [DIRECT TEST] Worker message:', message);
      
      // Look for successful initialization
      if (typeof message === 'object' && message.type === 'log' && 
          message.message.includes('Stockfish engine initialized successfully')) {
        console.log('🎉 [DIRECT TEST] SUCCESS: Stockfish loaded and ready!');
      }
      
      // Look for UCI protocol response
      if (message === 'uciok') {
        console.log('🎉 [DIRECT TEST] SUCCESS: UCI protocol working!');
      }
    });
    
    worker.addEventListener('error', (error) => {
      console.error('❌ [DIRECT TEST] Worker error:', error);
    });
    
    // Test basic communication after a delay
    setTimeout(() => {
      console.log('📤 [DIRECT TEST] Testing UCI command...');
      worker.postMessage('uci');
    }, 2000);
    
    // Cleanup after test
    setTimeout(() => {
      console.log('🧹 [DIRECT TEST] Cleaning up test worker');
      worker.terminate();
    }, 10000);
    
  } catch (error) {
    console.error('💥 [DIRECT TEST] Failed to create worker:', error);
  }
};

// Export for use in App.tsx
window.testStockfish = testStockfish;

export { testStockfish };