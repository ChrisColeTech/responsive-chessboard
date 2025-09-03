// hooks/index.ts - Hooks exports barrel

// Core hooks
export { useChessGame, type UseChessGameHook } from './useChessGame';
export { useStockfish, type UseStockfishHook } from './useStockfish';
export { useResponsiveBoard, type UseResponsiveBoardHook } from './useResponsiveBoard';
export { useDragAndDrop, type UseDragAndDropHook } from './useDragAndDrop';

// Enhancement hooks
export { useTheme } from './useTheme';
export { useAnimation } from './useAnimation';
export { useFocusMode } from './useFocusMode';
export { useCoordinates } from './useCoordinates';
export { useHighlight } from './useHighlight';
export { useAudio } from './useAudio';
export { useAccessibility } from './useAccessibility';