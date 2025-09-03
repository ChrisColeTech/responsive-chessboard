/* eslint-disable no-restricted-globals */

let messageCount = 0;

// Debug logging function
function log(message) {
  self.postMessage({
    type: 'log',
    message: `[WORKER] ${message}`,
    timestamp: new Date().toISOString()
  });
}

// Error reporting function  
function reportError(error) {
  self.postMessage({
    type: 'error',
    message: error.message || error,
    timestamp: new Date().toISOString()
  });
}

// Initialize worker
try {
  log('Test worker initialized successfully');
  
  self.onmessage = function(e) {
    messageCount++;
    log(`Received message #${messageCount}: ${e.data.type}`);
    
    try {
      switch (e.data.type) {
        case 'ping':
          log('Responding to ping');
          self.postMessage({
            type: 'pong',
            data: `Pong response #${messageCount}`,
            timestamp: new Date().toISOString()
          });
          break;
          
        case 'test-error':
          log('Testing error handling');
          throw new Error('Test error from worker');
          
        default:
          log(`Unknown message type: ${e.data.type}`);
      }
    } catch (error) {
      reportError(error);
    }
  };
  
  self.onerror = function(error) {
    reportError(`Worker error: ${error.message}`);
  };
  
} catch (error) {
  reportError(`Worker initialization failed: ${error.message}`);
}