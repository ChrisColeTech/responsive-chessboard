// DevToolsPage.tsx - Development tools and utilities
import React, { useState } from 'react';

export const DevToolsPage: React.FC = () => {
  const [hmrCount, setHmrCount] = useState(0);

  return (
    <>
      <h2>Development Tools</h2>
      
      <section>
        <h3>Hot Module Replacement Test</h3>
        <button onClick={() => setHmrCount(count => count + 1)}>
          Count: {hmrCount}
        </button>
        <p>Edit and save files to test Hot Module Replacement</p>
      </section>

      <section>
        <h3>Build Information</h3>
        <ul>
          <li><strong>Framework:</strong> React + TypeScript</li>
          <li><strong>Build Tool:</strong> Vite</li>
          <li><strong>Architecture:</strong> Document 20 POC Implementation</li>
        </ul>
      </section>

      <section>
        <h3>Performance Metrics</h3>
        <ul>
          <li><strong>Bundle Size (gzipped):</strong> ~85KB</li>
          <li><strong>Dependencies:</strong> React, Chess.js, Stockfish.js</li>
          <li><strong>Browser Support:</strong> Modern ES2020+ browsers</li>
          <li><strong>Web Workers:</strong> Stockfish engine runs in background thread</li>
        </ul>
      </section>

      <section>
        <h3>Debug Information</h3>
        <pre>
          Environment: {import.meta.env.MODE}
          Base URL: {import.meta.env.BASE_URL}
          Dev Mode: {import.meta.env.DEV ? 'Yes' : 'No'}
          Timestamp: {new Date().toISOString()}
        </pre>
        <p>Open browser DevTools console for detailed application logs</p>
      </section>
    </>
  );
};