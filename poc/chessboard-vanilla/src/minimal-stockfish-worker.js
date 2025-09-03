/* eslint-disable no-restricted-globals */

// Minimal worker to test Stockfish loading specifically
let engine = null;
let ready = false;

// Send structured messages back to main thread
function log(message) {
  self.postMessage({
    type: 'log',
    message: `[MINIMAL-WORKER] ${message}`,
    timestamp: new Date().toISOString()
  });
}

function reportError(error) {
  self.postMessage({
    type: 'error',
    message: error.message || error,
    timestamp: new Date().toISOString()
  });
}

// Test worker initialization
try {
  log('Minimal worker started');
  
  // Test basic postMessage
  log('Testing postMessage functionality');
  
  // Test Stockfish loading step by step
  log('Step 1: About to attempt importScripts');
  
  try {
    self.importScripts('/stockfish/stockfish.js');
    log('Step 2: importScripts completed successfully');
  } catch (importError) {
    reportError(`Step 2 FAILED - importScripts error: ${importError.message}`);
    log(`ImportScripts error details: ${importError.toString()}`);
  }
  
  // Test Stockfish availability
  log(`Step 3: Checking Stockfish availability - typeof self.Stockfish: ${typeof self.Stockfish}`);
  
  if (typeof self.Stockfish === 'function') {
    log('Step 4: Stockfish function found, attempting to create engine');
    try {
      engine = self.Stockfish();
      log('Step 5: Stockfish engine created successfully');
      ready = true;
      
      // Test engine setup
      engine.onmessage = (line) => {
        log(`Engine says: ${line}`);
        self.postMessage(line);
      };
      
      log('Step 6: Engine message handler set up');
      
    } catch (engineError) {
      reportError(`Step 4-5 FAILED - Engine creation error: ${engineError.message}`);
    }
  } else {
    reportError(`Step 3 FAILED - Stockfish not found, typeof: ${typeof self.Stockfish}`);
  }
  
} catch (globalError) {
  reportError(`Global initialization error: ${globalError.message}`);
}

self.onmessage = (e) => {
  const command = e.data;
  log(`Received command: ${command}`);
  
  if (command === 'test') {
    log('Test command received - worker is responding');
    self.postMessage('test-response');
    return;
  }
  
  if (ready && engine) {
    log(`Forwarding to engine: ${command}`);
    try {
      engine.postMessage(command);
    } catch (error) {
      reportError(`Error sending to engine: ${error.message}`);
    }
  } else {
    log(`Cannot send command - ready: ${ready}, engine: ${!!engine}`);
  }
};

self.onerror = function(error) {
  reportError(`Worker onerror: ${error.message}`);
};

log('Minimal worker setup complete');