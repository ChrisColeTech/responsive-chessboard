// index.ts - Type exports barrel
export type {
  // Chess types
  PieceColor,
  PieceType,
  File,
  Rank,
  ChessPosition,
  ChessPositionObject,
  ChessPiece,
  ChessMove,
  CastlingRights,
  ChessGameState,
  ChessMoveInput,
  ChessMoveResult,
  GameResult
} from './chess.types';

export type {
  // Component types
  ChessboardProps,
  BoardProps,
  SquareProps,
  PieceProps,
  DraggedPieceProps,
  PlayChessboardProps
} from './component.types';

// Phase 1: Computer opponent types
export type {
  ComputerDifficulty,
  ComputerMoveRequest,
  ComputerMoveResult,
  ComputerOpponentConfig,
  ComputerThinkingState,
  ComputerOpponentStatus,
  ComputerMoveAnalysis
} from './chess/computer-opponent.types';

// Phase 1: Play game types
export type {
  PlayGameMode,
  PlayGameState,
  PlayGameActions,
  GameResultType,
  PlayGameResult,
  GameSettings,
  PlayerInfo,
  GameSession,
  GameMoveRecord
} from './chess/play-game.types';

// Phase 1: Play UI component types
export type {
  PlayerStatusProps,
  GameControlsProps,
  DifficultyLevelProps,
  ComputerThinkingProps,
  GameStatusBarProps,
  PlaySettingsProps,
  MoveHistoryProps,
  GameResultModalProps,
  BasePlayComponentProps,
  PlayComponentTheme,
  PlayComponentSize,
  PlayComponentAnimation
} from './ui/play-components.types';

// Phase 2: UI Audio types
export type {
  UIInteractionType,
  UISoundType,
  UIInteractionConfig,
  UIElementSelector,
  UIExclusionConfig
} from './audio/ui-audio.types';

// Phase 2: Global Audio Service types
export type {
  GlobalUIAudioConfig,
  GlobalUIAudioConfigUpdate,
  GlobalUIAudioService,
  GlobalClickHandler,
  ElementDetectionResult
} from './audio/global-audio.types';

// Phase 3: UI Tests types
export type {
  UITestRoute,
  UITestNavigationState,
  UITestNavigationActions,
  UITestNavigationHook,
  AudioDemoConfiguration,
  DemoSection,
  DemoButtonExample,
  ExclusionExample,
  CodeSnippet,
  AudioDemoState,
  AudioDemoActions,
  AudioDemoHook,
  DragTestConfiguration,
  DragTestState,
  DragTestActions,
  MoveHandler,
  DragTestingHook
} from './ui-tests';