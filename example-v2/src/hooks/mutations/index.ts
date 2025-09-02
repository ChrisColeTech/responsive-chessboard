// Barrel exports for React Query mutations
// Following architecture pattern for clean imports

// Game mutations
export {
  useCreateGame,
  useSubmitMove,
  useEndGame
} from './useGameMutations';

// Puzzle mutations
export {
  useSubmitPuzzleSolution,
  useRequestPuzzleHint,
  useSkipPuzzle,
  useReportPuzzle
} from './usePuzzleMutations';

// Auth mutations
export {
  useLogin,
  useDemoLogin,
  useLogout,
  useRefreshToken,
  useUpdateProfile,
  useChangePassword
} from './useAuthMutations';