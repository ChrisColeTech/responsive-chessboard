/**
 * GameStatus Component
 * SRP: Displays current game state information (turn, moves, FEN)
 * Provides real-time status updates with compact and expanded views
 */

import React from 'react';
import type { GameStatusProps } from '@/types/demo/chessboard-demo.types';
import { cn } from '@/utils/ui/ui.utils';

/**
 * GameStatus Component
 * Real-time display of chess game status with professional styling
 */
export const GameStatus: React.FC<GameStatusProps> = ({
  gameState,
  compact = false,
  showFen = false,
  showMoveCount = true,
  showGameResult = true,
  className,
  ...props
}) => {
  // Safe fallbacks for all game state properties
  const currentTurn = gameState?.turn || 'white';
  const moveCount = gameState?.moveCount || 1;
  const isGameOver = gameState?.isGameOver || false;
  const isCheck = gameState?.isCheck || false;
  const isCheckmate = gameState?.isCheckmate || false;
  const isStalemate = gameState?.isStalemate || false;
  const isDraw = gameState?.isDraw || false;
  const gameResult = gameState?.gameResult || null;
  const lastMove = gameState?.lastMove || null;
  const currentFen = gameState?.currentFen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  // Format turn display
  const turnDisplay = currentTurn === 'white' ? 'White' : 'Black';
  const turnIcon = currentTurn === 'white' ? '⚪' : '⚫';

  // Format move count display
  const fullMoveNumber = Math.ceil(moveCount);
  const halfMoveDisplay = currentTurn === 'white' ? `${fullMoveNumber}.` : `${fullMoveNumber}...`;

  // Determine game status message
  const getStatusMessage = () => {
    if (isGameOver) {
      if (isCheckmate) {
        return `Checkmate! ${currentTurn === 'white' ? 'Black' : 'White'} wins`;
      }
      if (isStalemate) {
        return 'Stalemate - Draw';
      }
      if (isDraw) {
        return 'Draw';
      }
      return gameResult || 'Game Over';
    }
    
    if (isCheck) {
      return `${turnDisplay} in Check`;
    }
    
    return `${turnDisplay} to move`;
  };

  // Get status color based on game state
  const getStatusColor = () => {
    if (isGameOver) {
      if (isCheckmate) return 'text-red-600 dark:text-red-400';
      return 'text-chess-gold-600 dark:text-chess-gold-400';
    }
    
    if (isCheck) {
      return 'text-amber-600 dark:text-amber-400';
    }
    
    return currentTurn === 'white' 
      ? 'text-chess-stone-700 dark:text-chess-stone-300'
      : 'text-chess-stone-800 dark:text-chess-stone-200';
  };

  return (
    <div 
      className={cn(
        'game-status',
        // Glass morphism styling
        'p-3 rounded-lg',
        'bg-white/80 dark:bg-chess-stone-800/80',
        'backdrop-blur-sm border border-chess-stone-200 dark:border-chess-stone-700',
        'shadow-sm shadow-chess-stone-900/10 dark:shadow-chess-stone-900/20',
        // Layout
        'flex flex-col gap-2',
        // Compact mode
        {
          'p-2 gap-1': compact
        },
        className
      )}
      {...props}
    >
      {/* Primary Status Line */}
      <div className="status-primary flex items-center justify-between">
        {/* Turn and Status */}
        <div className="flex items-center gap-2">
          <span className="turn-icon text-lg" aria-hidden="true">
            {turnIcon}
          </span>
          <span className={cn(
            'status-text font-medium',
            {
              'text-sm': compact,
              'text-base': !compact
            },
            getStatusColor()
          )}>
            {getStatusMessage()}
          </span>
        </div>

        {/* Move Counter */}
        {showMoveCount && (
          <div className="move-counter flex items-center gap-1 text-chess-stone-500 dark:text-chess-stone-400">
            <span className="move-label text-xs font-medium">Move:</span>
            <span className={cn(
              'move-number font-mono font-medium',
              {
                'text-xs': compact,
                'text-sm': !compact
              }
            )}>
              {halfMoveDisplay}
            </span>
          </div>
        )}
      </div>

      {/* Secondary Info (if not compact) */}
      {!compact && (
        <div className="status-secondary flex flex-col gap-1">
          {/* Last Move */}
          {lastMove && (
            <div className="last-move flex items-center gap-2">
              <span className="last-move-label text-xs font-medium text-chess-stone-500 dark:text-chess-stone-400">
                Last Move:
              </span>
              <span className="last-move-value text-xs font-mono font-medium text-chess-stone-700 dark:text-chess-stone-300">
                {lastMove}
              </span>
            </div>
          )}

          {/* Game Result (if game over) */}
          {showGameResult && isGameOver && gameResult && (
            <div className="game-result">
              <span className="text-xs font-medium text-chess-gold-600 dark:text-chess-gold-400">
                Result: {gameResult}
              </span>
            </div>
          )}
        </div>
      )}

      {/* FEN Display (if requested) */}
      {showFen && (
        <div className="fen-display">
          <div className="fen-label-wrapper flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-chess-stone-500 dark:text-chess-stone-400">
              Position (FEN):
            </span>
            <button
              onClick={() => navigator.clipboard?.writeText(currentFen)}
              className="copy-fen text-xs text-chess-royal-500 hover:text-chess-royal-600 transition-colors"
              title="Copy FEN to clipboard"
            >
              📋
            </button>
          </div>
          <div className="fen-string bg-chess-stone-50 dark:bg-chess-stone-900 p-2 rounded border">
            <code className="text-xs font-mono text-chess-stone-700 dark:text-chess-stone-300 break-all">
              {currentFen}
            </code>
          </div>
        </div>
      )}

      {/* Status Indicators */}
      <div className="status-indicators flex items-center gap-3 text-xs">
        {/* Check Indicator */}
        {isCheck && !isGameOver && (
          <div className="check-indicator flex items-center gap-1 text-amber-600 dark:text-amber-400">
            <span aria-hidden="true">⚠️</span>
            <span className="font-medium">CHECK</span>
          </div>
        )}

        {/* Game Over Indicators */}
        {isGameOver && (
          <>
            {isCheckmate && (
              <div className="checkmate-indicator flex items-center gap-1 text-red-600 dark:text-red-400">
                <span aria-hidden="true">♛</span>
                <span className="font-medium">CHECKMATE</span>
              </div>
            )}
            {isStalemate && (
              <div className="stalemate-indicator flex items-center gap-1 text-chess-gold-600 dark:text-chess-gold-400">
                <span aria-hidden="true">🤝</span>
                <span className="font-medium">STALEMATE</span>
              </div>
            )}
            {isDraw && !isStalemate && (
              <div className="draw-indicator flex items-center gap-1 text-chess-gold-600 dark:text-chess-gold-400">
                <span aria-hidden="true">🤝</span>
                <span className="font-medium">DRAW</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameStatus;