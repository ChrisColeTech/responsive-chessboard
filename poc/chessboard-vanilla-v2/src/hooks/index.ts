// index.ts - Hooks exports barrel

// Core chess hooks
export { useChessGame } from './chess/useChessGame';
export { useDragAndDrop } from './chess/useDragAndDrop';
export { useResponsiveBoard } from './chess/useResponsiveBoard';

// Audio hooks
export { useGlobalUIAudio } from './audio/useGlobalUIAudio';

// Stockfish hooks
export { useStockfish } from './chess/useStockfish';

// Menu hooks
export { useMenuDropdown } from './core/useMenuDropdown';

// Action Sheet hooks
export { useActionSheet } from './core/useActionSheet';

// Page Action hooks
export { usePlayActions } from './chess/usePlayActions';
export { useSlotsActions } from './casino/useSlotsActions';
export { useWorkerActions } from './chess/useWorkerActions';
export { useUITestsActions } from './uitests/useUITestsActions';
export { useLayoutActions } from './core/useLayoutActions';
export { useDragTestActions } from './uitests/useDragTestActions';
export { useUIAudioTestActions } from './uitests/useUIAudioTestActions';

// Chess subdomain hooks
export { useComputerOpponent, usePlayGame } from './chess';

// Phase 5: UI Tests hooks
export { useUITestNavigation, useAudioDemo, useDragTesting } from './uitests';