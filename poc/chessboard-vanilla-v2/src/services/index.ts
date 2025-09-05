// index.ts - Services exports barrel

// Core chess services
export { ChessGameService } from './ChessGameService';
export { FenService } from './FenService';
export { TestBoardGameService } from './TestBoardGameService';

// Stockfish services
export { StockfishService } from './StockfishService';
export * from './stockfish-singleton';

// Audio services
export * from './audioService';
export * from './globalUIAudioService';
export * from './globalUIAudio-singleton';

// Chess subdomain services
export * from './chess';

// Client services
export * from './clients';

// Phase 4: UI Tests services
export { UIDemoService } from './ui-tests';