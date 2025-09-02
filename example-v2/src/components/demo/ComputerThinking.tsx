/**
 * Computer Thinking Component
 * Domain: Demo - Computer thinking animation and analysis display
 * Architecture: Presentation layer - displays computer analysis progress
 */

import React from 'react';
import clsx from 'clsx';

import type { ComputerThinkingProps } from '../../types/demo/vs-computer.types';
import { ComputerChessService } from '../../services/chess/ComputerChessService';

export const ComputerThinking: React.FC<ComputerThinkingProps> = ({
  isVisible,
  thinkingTime,
  evaluation,
  depth,
  principalVariation = [],
  progress = 0,
  className
}) => {
  if (!isVisible) return null;

  const formattedTime = ComputerChessService.formatTimerDisplay(thinkingTime);
  const evaluationDisplay = evaluation !== undefined ? 
    (evaluation > 0 ? `+${evaluation.toFixed(2)}` : evaluation.toFixed(2)) : null;
  
  const evaluationDescription = evaluation !== undefined ? 
    ComputerChessService.getEvaluationDescription(evaluation) : null;

  return (
    <div className={clsx(
      'bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-lg shadow-lg',
      'animate-pulse',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Computer is thinking...
          </span>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
          {formattedTime}
        </div>
      </div>

      {/* Analysis Content */}
      <div className="p-4 space-y-3">
        {/* Progress Bar */}
        {progress > 0 && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Analysis Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Evaluation and Depth */}
        <div className="grid grid-cols-2 gap-4">
          {evaluationDisplay && (
            <div className="space-y-1">
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Evaluation
              </div>
              <div className={clsx(
                'text-lg font-mono font-semibold',
                {
                  'text-green-600 dark:text-green-400': evaluation! > 0,
                  'text-red-600 dark:text-red-400': evaluation! < 0,
                  'text-gray-900 dark:text-gray-100': evaluation === 0,
                }
              )}>
                {evaluationDisplay}
              </div>
              {evaluationDescription && (
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {evaluationDescription}
                </div>
              )}
            </div>
          )}

          {depth !== undefined && (
            <div className="space-y-1">
              <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                Search Depth
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {depth} moves
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {depth < 5 ? 'Shallow' : depth < 10 ? 'Medium' : 'Deep'} search
              </div>
            </div>
          )}
        </div>

        {/* Principal Variation */}
        {principalVariation.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Best Line
            </div>
            <div className="font-mono text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded border">
              {principalVariation.slice(0, 8).join(' ')}
              {principalVariation.length > 8 && (
                <span className="text-gray-500 ml-1">...</span>
              )}
            </div>
          </div>
        )}

        {/* Thinking Animation */}
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Analyzing position
            </span>
            <div className="flex space-x-1 ml-2">
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1 h-1 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Compact Computer Thinking Indicator
 * Minimal version that shows just the essential info
 */
export const ComputerThinkingCompact: React.FC<ComputerThinkingProps> = ({
  isVisible,
  thinkingTime,
  evaluation,
  depth,
  className
}) => {
  if (!isVisible) return null;

  const formattedTime = ComputerChessService.formatTimerDisplay(thinkingTime);
  const evaluationDisplay = evaluation !== undefined ? 
    (evaluation > 0 ? `+${evaluation.toFixed(1)}` : evaluation.toFixed(1)) : null;

  return (
    <div className={clsx(
      'flex items-center space-x-3 px-3 py-2',
      'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded',
      'animate-pulse',
      className
    )}>
      {/* Thinking indicator */}
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <span className="text-sm text-blue-700 dark:text-blue-300">
          Thinking...
        </span>
      </div>

      {/* Analysis info */}
      <div className="flex items-center space-x-2 text-sm">
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
          <span className="text-gray-600 dark:text-gray-400">
            d{depth}
          </span>
        )}
        
        <span className="text-gray-500 dark:text-gray-400 font-mono">
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

/**
 * Inline Thinking Indicator
 * Ultra-minimal version for inline display
 */
export const ComputerThinkingInline: React.FC<Pick<ComputerThinkingProps, 'isVisible' | 'className'>> = ({
  isVisible,
  className
}) => {
  if (!isVisible) return null;

  return (
    <div className={clsx(
      'inline-flex items-center space-x-1',
      className
    )}>
      <div className="flex space-x-0.5">
        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" />
        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
      <span className="text-xs text-blue-600 dark:text-blue-400">
        thinking
      </span>
    </div>
  );
};