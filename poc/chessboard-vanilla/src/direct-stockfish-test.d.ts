// Type declarations for direct-stockfish-test.js
export function testStockfish(): void;

declare global {
  interface Window {
    testStockfish: () => void;
  }
}