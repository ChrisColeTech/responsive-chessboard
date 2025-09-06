// index.ts - Hooks exports barrel

// Core chess hooks
export { useChessGame } from './useChessGame';
export { useDragAndDrop } from './useDragAndDrop';
export { useResponsiveBoard } from './useResponsiveBoard';

// Audio hooks
export { useGlobalUIAudio } from './useGlobalUIAudio';

// Stockfish hooks
export { useStockfish } from './useStockfish';

// Menu hooks
export { useMenuDropdown } from './useMenuDropdown';

// Action sheet hooks
export { useActionSheet } from './useActionSheet';
export { usePageActions } from './usePageActions';
export { useActionSheetEventHandlers } from './useActionSheetEventHandlers';

// Chess subdomain hooks
export { useComputerOpponent, usePlayGame } from './chess';

// Phase 5: UI Tests hooks
export { useUITestNavigation, useAudioDemo, useDragTesting } from './ui-tests';