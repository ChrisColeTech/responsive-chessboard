// stockfish-singleton.ts - Singleton pattern to survive Vite HMR cycles
import { StockfishService } from './StockfishService';

let svc: StockfishService | null = null;

export function getStockfish(): StockfishService {
  if (svc) {
    console.log('🔄 [SINGLETON] Reusing existing StockfishService instance');
    return svc;
  }
  
  console.log('🚀 [SINGLETON] Creating new StockfishService instance');
  svc = new StockfishService();
  
  // Keep the worker alive across HMR in development
  if (import.meta.hot) {
    console.log('🔥 [HMR] Setting up hot module replacement handlers');
    import.meta.hot.accept?.();
    import.meta.hot.dispose?.(() => {
      console.log('🔄 [HMR] Module disposal - keeping worker alive in dev');
      // Intentionally NOT terminating the worker in dev
      // The singleton will be reused by the next module instance
    });
  }
  
  return svc;
}

export function destroyStockfish(): void {
  if (svc) {
    console.log('🔥 [SINGLETON] Destroying StockfishService instance');
    svc.destroy();
    svc = null;
  }
}