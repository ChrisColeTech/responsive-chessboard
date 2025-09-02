// Demo application types
import type { BoardTheme, PieceSet } from './freeplay.types';

export interface ChessboardConfig {
  readonly initialFen: string;
  readonly boardTheme: string;
  readonly pieceSet: string;
  readonly showCoordinates: boolean;
  readonly animationsEnabled: boolean;
  readonly animationDuration?: number;
  readonly boardWidth?: number;
  readonly boardOrientation?: 'white' | 'black';
}

export interface ChessboardSettings {
  theme: BoardTheme;
  pieceSet: PieceSet;
  showCoordinates: boolean;
  allowDragAndDrop: boolean;
  animationsEnabled: boolean;
  animationDuration: number;
  boardOrientation: 'white' | 'black';
}

export interface DemoStateHook {
  readonly config: ChessboardConfig;
  readonly setConfig: (config: ChessboardConfig) => void;
}

export interface DemoPage {
  readonly id: string;
  readonly title: string;
  readonly path: string;
  readonly description: string;
  readonly requiresAuth: boolean;
}

// Phase 9.4: Page component types
export interface BasePageProps {
  readonly className?: string;
}

export interface HomePageProps extends BasePageProps {
  // No additional props - uses auth store directly
}

export interface FreePlayPageProps extends BasePageProps {
  // No additional props for Phase 9.4 placeholder
}

export interface ConnectedGamePageProps extends BasePageProps {
  // No additional props for Phase 9.4 placeholder
}

export interface PuzzlePageProps extends BasePageProps {
  // No additional props for Phase 9.4 placeholder
}

export interface LoginPageProps extends BasePageProps {
  // No additional props for Phase 9.4 placeholder
}

// Phase 9.6: Free play demo types (re-export for convenience)
export type { 
  FreePlayGameState,
  ChessboardSettings as FreePlayChessboardSettings,
  ContainerConfig,
  MoveHistoryEntry,
  BoardTheme,
  PieceSet,
  ContainerSize,
  DemoError,
  DemoErrorType,
  DemoStats
} from './freeplay.types';

export type {
  ChessboardDemoProps,
  ControlPanelProps,
  ThemeSelectorProps,
  PieceSetSelectorProps,
  ResponsiveContainerProps,
  GameStatusProps,
  ContainerSizeOption,
  ThemeOption,
  PieceSetOption,
  AnimationOption,
  ControlSection,
  DemoBaseProps
} from './chessboard-demo.types';