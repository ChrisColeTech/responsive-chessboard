// SRP: Demo component specific types
import type { BaseProps } from '@/types/ui/ui.types';
import type { 
  FreePlayGameState, 
  ChessboardSettings, 
  ContainerConfig, 
  MoveHistoryEntry, 
  BoardTheme, 
  PieceSet, 
  ContainerSize,
  DemoError
} from './freeplay.types';

/**
 * Base demo component props
 */
export interface DemoBaseProps extends BaseProps {
  readonly className?: string;
}

/**
 * ChessboardDemo component props
 */
export interface ChessboardDemoProps extends DemoBaseProps {
  readonly gameState: FreePlayGameState;
  readonly settings: ChessboardSettings;
  readonly containerConfig: ContainerConfig;
  readonly onMove: (move: string) => Promise<boolean>;
  readonly onError?: (error: DemoError) => void;
}

/**
 * ControlPanel component props
 */
export interface ControlPanelProps extends DemoBaseProps {
  readonly settings: ChessboardSettings;
  readonly containerConfig: ContainerConfig;
  readonly gameState: FreePlayGameState;
  readonly onSettingsChange: (settings: Partial<ChessboardSettings>) => void;
  readonly onContainerChange: (config: Partial<ContainerConfig>) => void;
  readonly onNewGame: () => void;
  readonly onFlipBoard: () => void;
  readonly onResetPosition: () => void;
  readonly disabled?: boolean;
}

/**
 * ThemeSelector component props
 */
export interface ThemeSelectorProps extends DemoBaseProps {
  readonly value: BoardTheme;
  readonly onChange: (theme: BoardTheme) => void;
  readonly disabled?: boolean;
  readonly showPreview?: boolean;
  readonly label?: string;
  readonly compact?: boolean;
}

/**
 * PieceSetSelector component props
 */
export interface PieceSetSelectorProps extends DemoBaseProps {
  readonly value: PieceSet;
  readonly onChange: (pieceSet: PieceSet) => void;
  readonly disabled?: boolean;
  readonly compact?: boolean;
  readonly label?: string;
}

/**
 * ResponsiveContainer component props
 */
export interface ResponsiveContainerProps extends DemoBaseProps {
  readonly config: ContainerConfig;
  readonly onConfigChange: (config: Partial<ContainerConfig>) => void;
  readonly children: React.ReactNode;
  readonly showSizeControls?: boolean;
  readonly disabled?: boolean;
}

/**
 * GameControls component props
 */
export interface GameControlsProps extends DemoBaseProps {
  readonly onNewGame?: () => void;
  readonly onResetGame?: () => void;
  readonly onFlipBoard?: () => void;
  readonly disabled?: boolean;
  readonly showNewGame?: boolean;
  readonly showReset?: boolean;
  readonly showFlip?: boolean;
  readonly orientation?: 'horizontal' | 'vertical';
}

/**
 * CollapsibleToolbar component props
 */
export interface CollapsibleToolbarProps extends DemoBaseProps {
  readonly isExpanded: boolean;
  readonly onToggleExpanded?: () => void;
  readonly gameControls?: React.ReactNode;
  readonly themeSelector?: React.ReactNode;
  readonly pieceSetSelector?: React.ReactNode;
  readonly containerSizeControls?: React.ReactNode;
  readonly gameStatus?: React.ReactNode;
  readonly advancedSettings?: React.ReactNode;
  readonly disabled?: boolean;
}

/**
 * GameStatus component props
 */
export interface GameStatusProps extends DemoBaseProps {
  readonly gameState: FreePlayGameState;
  readonly compact?: boolean;
  readonly showFen?: boolean;
  readonly showMoveCount?: boolean;
  readonly showGameResult?: boolean;
}

/**
 * Container size option for UI
 */
export interface ContainerSizeOption {
  readonly value: ContainerSize;
  readonly label: string;
  readonly width: number;
  readonly height: number;
  readonly description?: string;
}

/**
 * Theme option for UI
 */
export interface ThemeOption {
  readonly value: BoardTheme;
  readonly label: string;
  readonly description: string;
  readonly colors: {
    readonly light: string;
    readonly dark: string;
    readonly border: string;
  };
}

/**
 * Piece set option for UI
 */
export interface PieceSetOption {
  readonly value: PieceSet;
  readonly label: string;
  readonly description: string;
  readonly previewUrl?: string;
}

/**
 * Animation option for UI
 */
export interface AnimationOption {
  readonly duration: number;
  readonly label: string;
  readonly description: string;
}

/**
 * Control section configuration
 */
export interface ControlSection {
  readonly id: string;
  readonly label: string;
  readonly expanded: boolean;
  readonly disabled?: boolean;
}