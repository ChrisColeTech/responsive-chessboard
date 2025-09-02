/**
 * Computer Chess Service
 * Domain: Chess - Computer opponent business logic
 * Architecture: Infrastructure layer - pure business logic, no external dependencies
 */

import type { 
  ComputerDifficulty, 
  ComputerOpponentConfig, 
  ComputerPlayerInfo,
  EngineAnalysis,
  TimerState
} from '../../types/chess/computer-opponent.types';

import { 
  getDifficultyConfig,
  getDifficultyName,
  getDifficultyDescription,
  calculateThinkingTime,
  parseEvaluation,
  formatTime,
  getPositionPhase,
  isSupportedDifficulty,
  getAdjacentDifficulty
} from '../../utils/chess/computer-chess.utils';

import { 
  DIFFICULTY_LEVELS,
  DEFAULT_COMPUTER_DIFFICULTY,
  ANALYSIS_THRESHOLDS,
  GAME_RESULT_MESSAGES,
  DEFAULT_TIME_CONTROLS
} from '../../constants/chess/computer-difficulty.constants';

export class ComputerChessService {
  /**
   * Get complete difficulty configuration
   */
  static getDifficultyInfo(difficulty: ComputerDifficulty): ComputerOpponentConfig {
    return getDifficultyConfig(difficulty);
  }

  /**
   * Get difficulty level metadata
   */
  static getDifficultyLevel(difficulty: ComputerDifficulty) {
    return DIFFICULTY_LEVELS[difficulty];
  }

  /**
   * Create initial computer player info
   */
  static createComputerPlayer(difficulty: ComputerDifficulty): ComputerPlayerInfo {
    return {
      name: `Stockfish ${getDifficultyName(difficulty)}`,
      difficulty,
      isThinking: false,
      thinkingTime: 0,
      lastEvaluation: undefined,
      searchDepth: undefined
    };
  }

  /**
   * Create initial timer state
   */
  static createTimerState(
    timeControlMinutes: number = 5,
    incrementSeconds: number = 3
  ): TimerState {
    const timeMs = timeControlMinutes * 60 * 1000;
    const incrementMs = incrementSeconds * 1000;

    return {
      whiteTime: timeMs,
      blackTime: timeMs,
      increment: incrementMs,
      isRunning: false,
      activeColor: 'white'
    };
  }

  /**
   * Update timer state for a move
   */
  static updateTimerForMove(
    currentTimer: TimerState,
    playerColor: 'white' | 'black',
    timeSpent: number
  ): TimerState {
    if (!currentTimer.isRunning) return currentTimer;

    const timeAfterMove = playerColor === 'white' 
      ? Math.max(0, currentTimer.whiteTime - timeSpent + currentTimer.increment)
      : Math.max(0, currentTimer.blackTime - timeSpent + currentTimer.increment);

    return {
      ...currentTimer,
      whiteTime: playerColor === 'white' ? timeAfterMove : currentTimer.whiteTime,
      blackTime: playerColor === 'black' ? timeAfterMove : currentTimer.blackTime,
      activeColor: playerColor === 'white' ? 'black' : 'white'
    };
  }

  /**
   * Check if time has expired
   */
  static isTimeExpired(timer: TimerState, playerColor: 'white' | 'black'): boolean {
    return playerColor === 'white' ? timer.whiteTime <= 0 : timer.blackTime <= 0;
  }

  /**
   * Calculate realistic thinking time based on position and difficulty
   */
  static calculateComputerThinkingTime(
    difficulty: ComputerDifficulty,
    fen: string,
    moveNumber: number
  ): number {
    const positionPhase = getPositionPhase(fen);
    const baseTime = calculateThinkingTime(difficulty, positionPhase);

    // Add some randomization to make it feel more human-like
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2 multiplier
    
    // Adjust for move number (slightly faster in opening)
    const moveNumberFactor = moveNumber <= 10 ? 0.9 : 1.0;

    return Math.round(baseTime * randomFactor * moveNumberFactor);
  }

  /**
   * Analyze engine evaluation result
   */
  static analyzeEvaluation(centipawns: number, depth: number): EngineAnalysis {
    const evaluation = parseEvaluation(centipawns);
    
    return {
      evaluation: evaluation.value,
      depth,
      principalVariation: [], // This would be filled by the engine client
      timeSpent: 0, // This would be filled by the engine client
      nodesSearched: undefined
    };
  }

  /**
   * Determine game result message
   */
  static getGameResultMessage(
    winner: 'human' | 'computer' | 'draw',
    reason: 'checkmate' | 'resignation' | 'timeout' | 'stalemate' | 'repetition' | 'fifty_moves' | 'insufficient_material' | 'agreement'
  ): string {
    const key = `${winner.toUpperCase()}_${reason === 'checkmate' ? 'WINS_CHECKMATE' : 
                 reason === 'resignation' ? 'WINS_RESIGNATION' :
                 reason === 'timeout' ? 'WINS_TIMEOUT' :
                 reason === 'stalemate' ? 'DRAW_STALEMATE' :
                 reason === 'repetition' ? 'DRAW_REPETITION' :
                 reason === 'fifty_moves' ? 'DRAW_FIFTY_MOVES' :
                 reason === 'insufficient_material' ? 'DRAW_INSUFFICIENT_MATERIAL' :
                 'DRAW_AGREEMENT'}` as keyof typeof GAME_RESULT_MESSAGES;

    return GAME_RESULT_MESSAGES[key] || 'Game ended.';
  }

  /**
   * Validate difficulty level
   */
  static validateDifficulty(difficulty: number): ComputerDifficulty {
    if (!isSupportedDifficulty(difficulty)) {
      console.warn(`Invalid difficulty level ${difficulty}, using default ${DEFAULT_COMPUTER_DIFFICULTY}`);
      return DEFAULT_COMPUTER_DIFFICULTY;
    }
    return difficulty;
  }

  /**
   * Get next difficulty level (for UI controls)
   */
  static getNextDifficulty(current: ComputerDifficulty): ComputerDifficulty {
    return getAdjacentDifficulty(current, 'next');
  }

  /**
   * Get previous difficulty level (for UI controls)
   */
  static getPreviousDifficulty(current: ComputerDifficulty): ComputerDifficulty {
    return getAdjacentDifficulty(current, 'previous');
  }

  /**
   * Format timer display
   */
  static formatTimerDisplay(
    timeRemaining: number,
    format: 'mm:ss' | 'hh:mm:ss' = 'mm:ss'
  ): string {
    return formatTime(timeRemaining, format);
  }

  /**
   * Check if position is critical (low time)
   */
  static isTimePressingPosition(timeRemaining: number, totalTime: number): boolean {
    return timeRemaining < (totalTime * 0.1); // Less than 10% time remaining
  }

  /**
   * Calculate time pressure indicator (0-100)
   */
  static getTimePressure(timeRemaining: number, totalTime: number): number {
    if (totalTime === 0) return 0;
    const ratio = timeRemaining / totalTime;
    return Math.round((1 - ratio) * 100);
  }

  /**
   * Determine if move is critical based on evaluation swing
   */
  static isCriticalMove(
    previousEvaluation?: number,
    currentEvaluation?: number
  ): boolean {
    if (previousEvaluation === undefined || currentEvaluation === undefined) {
      return false;
    }

    const evaluationSwing = Math.abs(currentEvaluation - previousEvaluation);
    return evaluationSwing > ANALYSIS_THRESHOLDS.CLEAR_ADVANTAGE / 100; // Convert from centipawns
  }

  /**
   * Get evaluation advantage description
   */
  static getEvaluationDescription(evaluation: number): string {
    const absEval = Math.abs(evaluation);
    const player = evaluation > 0 ? 'White' : 'Black';

    if (absEval < ANALYSIS_THRESHOLDS.SLIGHT_ADVANTAGE / 100) {
      return 'Equal position';
    } else if (absEval < ANALYSIS_THRESHOLDS.CLEAR_ADVANTAGE / 100) {
      return `Slight advantage for ${player}`;
    } else if (absEval < ANALYSIS_THRESHOLDS.WINNING_ADVANTAGE / 100) {
      return `Clear advantage for ${player}`;
    } else if (absEval < ANALYSIS_THRESHOLDS.DECISIVE_ADVANTAGE / 100) {
      return `Winning position for ${player}`;
    } else {
      return `Decisive advantage for ${player}`;
    }
  }

  /**
   * Create default VS Computer settings
   */
  static createDefaultSettings() {
    return {
      difficulty: DEFAULT_COMPUTER_DIFFICULTY,
      playerColor: 'white' as const,
      timeControl: DEFAULT_TIME_CONTROLS.BLITZ_5_3,
      soundEnabled: true,
      showCoordinates: true,
      animationsEnabled: true
    };
  }

  /**
   * Validate and sanitize settings
   */
  static validateSettings(settings: any) {
    const defaults = this.createDefaultSettings();
    
    return {
      difficulty: this.validateDifficulty(settings.difficulty ?? defaults.difficulty),
      playerColor: settings.playerColor === 'black' ? 'black' : 'white',
      timeControl: {
        minutes: Math.max(1, Math.min(999, settings.timeControl?.minutes ?? defaults.timeControl.minutes)),
        increment: Math.max(0, Math.min(60, settings.timeControl?.increment ?? defaults.timeControl.increment))
      },
      soundEnabled: Boolean(settings.soundEnabled ?? defaults.soundEnabled),
      showCoordinates: Boolean(settings.showCoordinates ?? defaults.showCoordinates),
      animationsEnabled: Boolean(settings.animationsEnabled ?? defaults.animationsEnabled)
    };
  }
}