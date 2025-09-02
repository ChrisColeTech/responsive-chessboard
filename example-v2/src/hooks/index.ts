// Main hooks export - organized by domain
// Domain-specific hooks (local state management) - avoiding conflicts
export { 
  useAuth,
  useUser,
  useAuthGuard
} from './auth';
export * from './demo';

// Phase 9.4: Layout hooks
export { 
  useSidebarState,
  useAuthGuard as useLayoutAuthGuard  // Alias to avoid conflict
} from './layout';

// React Query hooks for server state management (preferred)
export * from './queries';
export * from './mutations';

// Legacy local hooks (use React Query versions instead when available)
// Exporting with aliases to avoid conflicts
export { 
  useGame,
  useGameCreation,
  useGameMoves,
  useGameNavigation,
  useGameAnalysis,
  useGameStatus
} from './game';

export { 
  usePuzzle,
  usePuzzleValidation
} from './puzzle';