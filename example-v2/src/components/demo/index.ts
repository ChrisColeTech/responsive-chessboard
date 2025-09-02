/**
 * Demo Components Export Barrel
 * Exports all demo-related UI components
 */

// Core Components
export { ChessboardDemo } from './ChessboardDemo';
export { ResponsiveContainer } from './ResponsiveContainer';
export { CollapsibleToolbar } from './CollapsibleToolbar';

// Control Components
export { GameControls } from './GameControls';
export { ThemeSelector } from './ThemeSelector';
export { PieceSetSelector } from './PieceSetSelector';
export { GameStatus } from './GameStatus';

// Re-export component prop types for convenience
export type {
  ChessboardDemoProps,
  ResponsiveContainerProps,
  CollapsibleToolbarProps,
  GameControlsProps,
  ThemeSelectorProps,
  PieceSetSelectorProps,
  GameStatusProps
} from '@/types/demo/chessboard-demo.types';