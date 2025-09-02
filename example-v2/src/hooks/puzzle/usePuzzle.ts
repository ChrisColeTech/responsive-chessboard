// Puzzle hooks - provide puzzle solving functionality
import { useState, useCallback, useEffect } from 'react';
import { PuzzleAPIClient } from '@/services/clients';
import { httpClient } from '@/services/clients';
import type { PuzzleData, PuzzleSolution, SolutionResult } from '@/types';

interface PuzzleState {
  currentPuzzle: PuzzleData | null;
  isLoading: boolean;
  error: string | null;
  solution: SolutionResult | null;
  hintsUsed: number;
  maxHints: number;
  currentHint: string | null;
  startTime: number | null;
  isCompleted: boolean;
}

const puzzleClient = new PuzzleAPIClient(httpClient);

/**
 * Main puzzle hook - provides complete puzzle solving functionality
 */
export const usePuzzle = () => {
  const [state, setState] = useState<PuzzleState>({
    currentPuzzle: null,
    isLoading: false,
    error: null,
    solution: null,
    hintsUsed: 0,
    maxHints: 3,
    currentHint: null,
    startTime: null,
    isCompleted: false
  });

  // Load next puzzle
  const loadNextPuzzle = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const puzzle = await puzzleClient.getNextPuzzle();
      
      setState(prev => ({
        ...prev,
        currentPuzzle: puzzle,
        isLoading: false,
        solution: null,
        hintsUsed: 0,
        currentHint: null,
        startTime: Date.now(),
        isCompleted: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load puzzle';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
    }
  }, []);

  // Submit solution
  const submitSolution = useCallback(async (solution: PuzzleSolution) => {
    if (!state.currentPuzzle) return null;

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const result = await puzzleClient.submitSolution(state.currentPuzzle.id, solution);
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        solution: result,
        isCompleted: true
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit solution';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      return null;
    }
  }, [state.currentPuzzle]);

  // Request hint
  const requestHint = useCallback(async () => {
    if (!state.currentPuzzle || state.hintsUsed >= state.maxHints) return null;

    try {
      const hintData = await puzzleClient.requestHint(state.currentPuzzle.id);
      
      setState(prev => ({
        ...prev,
        currentHint: hintData.hint,
        hintsUsed: hintData.hintsUsed,
        maxHints: hintData.maxHints
      }));

      return hintData.hint;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get hint';
      setState(prev => ({ ...prev, error: errorMessage }));
      return null;
    }
  }, [state.currentPuzzle, state.hintsUsed, state.maxHints]);

  // Calculate time taken
  const getTimeTaken = useCallback(() => {
    if (!state.startTime) return 0;
    return Math.floor((Date.now() - state.startTime) / 1000);
  }, [state.startTime]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Load initial puzzle on mount
  useEffect(() => {
    loadNextPuzzle();
  }, []);

  return {
    // State
    puzzle: state.currentPuzzle,
    isLoading: state.isLoading,
    error: state.error,
    solution: state.solution,
    hintsUsed: state.hintsUsed,
    maxHints: state.maxHints,
    currentHint: state.currentHint,
    isCompleted: state.isCompleted,
    timeTaken: getTimeTaken(),
    
    // Actions
    loadNextPuzzle,
    submitSolution,
    requestHint,
    clearError,
    
    // Computed
    canUseHint: state.hintsUsed < state.maxHints && !state.isCompleted,
    hintsRemaining: state.maxHints - state.hintsUsed
  };
};

/**
 * Puzzle statistics hook - provides solving statistics
 */
export const usePuzzleStats = () => {
  const [stats, setStats] = useState({
    totalSolved: 0,
    correctRate: 0,
    averageTime: 0,
    currentStreak: 0,
    bestStreak: 0,
    rating: 1200,
    ratingChange: 0,
    todaysSolved: 0,
    isLoading: false,
    error: null as string | null
  });

  // Load puzzle statistics
  const loadStats = useCallback(async () => {
    try {
      setStats(prev => ({ ...prev, isLoading: true, error: null }));
      
      const data = await puzzleClient.getPuzzleStats();
      
      setStats(prev => ({
        ...prev,
        ...data,
        isLoading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load statistics';
      setStats(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
    }
  }, []);

  // Update stats after puzzle completion
  const updateStats = useCallback((result: SolutionResult) => {
    setStats(prev => ({
      ...prev,
      totalSolved: prev.totalSolved + 1,
      todaysSolved: prev.todaysSolved + 1,
      rating: result.newRating,
      ratingChange: result.ratingChange,
      currentStreak: result.correct ? prev.currentStreak + 1 : 0,
      bestStreak: result.correct && prev.currentStreak + 1 > prev.bestStreak 
        ? prev.currentStreak + 1 
        : prev.bestStreak,
      correctRate: ((prev.correctRate * prev.totalSolved) + (result.correct ? 1 : 0)) / (prev.totalSolved + 1)
    }));
  }, []);

  // Load stats on mount
  useEffect(() => {
    loadStats();
  }, []);

  return {
    ...stats,
    loadStats,
    updateStats,
    ratingTrend: stats.ratingChange >= 0 ? 'up' : 'down'
  };
};

/**
 * Puzzle validation hook - for real-time move validation
 */
export const usePuzzleValidation = (puzzleId: string | null) => {
  const [validationState, setValidationState] = useState({
    isValidating: false,
    isCorrect: false,
    explanation: null as string | null,
    error: null as string | null
  });

  const validateMoves = useCallback(async (moves: string[]) => {
    if (!puzzleId) return;

    try {
      setValidationState(prev => ({ 
        ...prev, 
        isValidating: true, 
        error: null 
      }));

      const result = await puzzleClient.validateMoves(puzzleId, moves);
      
      setValidationState({
        isValidating: false,
        isCorrect: result.isCorrect,
        explanation: result.explanation || null,
        error: null
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Validation failed';
      setValidationState({
        isValidating: false,
        isCorrect: false,
        explanation: null,
        error: errorMessage
      });
      return null;
    }
  }, [puzzleId]);

  return {
    ...validationState,
    validateMoves
  };
};

/**
 * Puzzle theme hook - for filtering puzzles by theme
 */
export const usePuzzleThemes = () => {
  const themes = [
    'mate-in-1',
    'mate-in-2', 
    'mate-in-3',
    'pin',
    'fork',
    'skewer',
    'discovery',
    'sacrifice',
    'endgame',
    'opening',
    'middlegame'
  ];

  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const toggleTheme = useCallback((theme: string) => {
    setSelectedThemes(prev => 
      prev.includes(theme)
        ? prev.filter(t => t !== theme)
        : [...prev, theme]
    );
  }, []);

  const clearThemes = useCallback(() => {
    setSelectedThemes([]);
  }, []);

  return {
    allThemes: themes,
    selectedThemes,
    toggleTheme,
    clearThemes,
    hasSelectedThemes: selectedThemes.length > 0
  };
};