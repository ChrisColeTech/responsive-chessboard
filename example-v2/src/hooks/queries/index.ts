// Barrel exports for React Query hooks
// Following architecture pattern for clean imports

// Game queries
export {
  useGameHistory,
  useGameStats,
  useGameDetails,
  useRecentGames,
  gameQueryKeys
} from './useGameQueries';

// Puzzle queries  
export {
  useNextPuzzle,
  usePuzzleStats,
  usePuzzleThemes,
  usePuzzlesByTheme,
  useDemoPuzzle,
  puzzleQueryKeys
} from './usePuzzleQueries';

// Analysis queries
export {
  usePositionAnalysis,
  useBestMove,
  useOpeningIdentification,
  useCachedAnalysis,
  analysisQueryKeys
} from './useAnalysisQueries';