/**
 * Player Card Component
 * Domain: Demo - Player information display
 * Architecture: Presentation layer - displays player status and timer
 */

import React from 'react';
import clsx from 'clsx';

import type { PlayerCardProps } from '../../types/demo/vs-computer.types';
import { ComputerChessService } from '../../services/chess/ComputerChessService';

export const PlayerCard: React.FC<PlayerCardProps> = ({
  playerType,
  playerColor,
  timeRemaining,
  isCurrentTurn,
  isThinking = false,
  thinkingTime = 0,
  playerName,
  evaluation,
  depth,
  className
}) => {
  const displayName = playerName || (playerType === 'computer' ? 'Stockfish' : 'You');
  const formattedTime = ComputerChessService.formatTimerDisplay(timeRemaining);
  const timePressure = ComputerChessService.getTimePressure(timeRemaining, 300000); // Assume 5 min default
  const isLowTime = ComputerChessService.isTimePressingPosition(timeRemaining, 300000);

  // Format evaluation display
  const evaluationDisplay = evaluation !== undefined ? 
    (evaluation > 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2)) : null;

  return (
    <div className={clsx(
      'flex items-center justify-between px-4 py-2 rounded-lg border transition-all duration-200',
      {
        // Player color styling
        'bg-white border-gray-300': playerColor === 'white',
        'bg-gray-800 border-gray-600 text-white': playerColor === 'black',
        
        // Turn indicator
        'ring-2 ring-blue-500 shadow-lg': isCurrentTurn,
        'border-green-500': isCurrentTurn && !isLowTime,
        'border-red-500': isCurrentTurn && isLowTime,
        
        // Thinking indicator
        'bg-blue-50 border-blue-300': isThinking && playerColor === 'white',
        'bg-blue-900 border-blue-500': isThinking && playerColor === 'black',
      },
      className
    )}>
      {/* Player Info Section */}
      <div className="flex items-center space-x-3">
        {/* Color indicator */}
        <div className={clsx(
          'w-4 h-4 rounded-full border-2',
          {
            'bg-white border-gray-400': playerColor === 'white',
            'bg-gray-800 border-gray-300': playerColor === 'black',
          }
        )} />

        {/* Player name and status */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-sm">
              {displayName}
            </span>
            
            {/* Thinking indicator */}
            {isThinking && (
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  thinking...
                </span>
              </div>
            )}
          </div>

          {/* Evaluation and depth for computer */}
          {playerType === 'computer' && (evaluationDisplay || depth !== undefined) && (
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
              {evaluationDisplay && (
                <span className={clsx(
                  'font-mono',
                  {
                    'text-green-600 dark:text-green-400': evaluation! > 0,
                    'text-red-600 dark:text-red-400': evaluation! < 0,
                    'text-gray-600 dark:text-gray-400': evaluation === 0,
                  }
                )}>
                  {evaluationDisplay}
                </span>
              )}
              {depth !== undefined && (
                <span className="text-gray-500">
                  depth {depth}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Timer Section */}
      <div className="flex flex-col items-end">
        <div className={clsx(
          'font-mono text-lg font-semibold px-2 py-1 rounded',
          {
            'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30': isLowTime,
            'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30': 
              !isLowTime && timePressure > 50,
            'text-gray-900 dark:text-gray-100': timePressure <= 50,
          }
        )}>
          {formattedTime}
        </div>

        {/* Thinking time display */}
        {isThinking && thinkingTime > 0 && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {ComputerChessService.formatTimerDisplay(thinkingTime)} elapsed
          </div>
        )}

        {/* Time pressure indicator */}
        {timePressure > 30 && (
          <div className="w-full mt-1">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={clsx(
                  'h-full transition-all duration-300',
                  {
                    'bg-green-500': timePressure <= 50,
                    'bg-yellow-500': timePressure > 50 && timePressure <= 75,
                    'bg-red-500': timePressure > 75,
                  }
                )}
                style={{ width: `${Math.min(timePressure, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Compact Player Status Line
 * Minimal version for space-constrained layouts
 */
export const PlayerStatusLine: React.FC<PlayerCardProps> = ({
  playerType,
  playerColor,
  timeRemaining,
  isCurrentTurn,
  isThinking = false,
  playerName,
  evaluation,
  className
}) => {
  const displayName = playerName || (playerType === 'computer' ? 'Stockfish' : 'You');
  const formattedTime = ComputerChessService.formatTimerDisplay(timeRemaining);
  const isLowTime = ComputerChessService.isTimePressingPosition(timeRemaining, 300000);

  const evaluationDisplay = evaluation !== undefined ? 
    (evaluation > 0 ? `+${evaluation.toFixed(1)}` : evaluation.toFixed(1)) : null;

  return (
    <div className={clsx(
      'flex items-center justify-between px-3 py-1 text-sm',
      {
        'bg-blue-50 dark:bg-blue-900/20': isCurrentTurn,
        'text-blue-600 dark:text-blue-400': isCurrentTurn,
      },
      className
    )}>
      {/* Left side: Player info */}
      <div className="flex items-center space-x-2">
        <div className={clsx(
          'w-2 h-2 rounded-full',
          {
            'bg-white border border-gray-400': playerColor === 'white',
            'bg-gray-800 border border-gray-300': playerColor === 'black',
          }
        )} />
        
        <span className="font-medium">{displayName}</span>
        
        {isThinking && (
          <span className="text-xs text-blue-500 animate-pulse">●</span>
        )}
        
        {evaluationDisplay && (
          <span className={clsx(
            'text-xs font-mono',
            {
              'text-green-600 dark:text-green-400': evaluation! > 0,
              'text-red-600 dark:text-red-400': evaluation! < 0,
            }
          )}>
            {evaluationDisplay}
          </span>
        )}
      </div>

      {/* Right side: Timer */}
      <div className={clsx(
        'font-mono font-semibold',
        {
          'text-red-600 dark:text-red-400': isLowTime,
          'text-gray-900 dark:text-gray-100': !isLowTime,
        }
      )}>
        {formattedTime}
      </div>
    </div>
  );
};