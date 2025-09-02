/**
 * GameControls Component
 * SRP: Provides essential game control buttons (New, Reset, Flip)
 * Handles basic chess game actions with proper error handling
 */

import React from 'react';
import type { GameControlsProps } from '@/types/demo/chessboard-demo.types';
import { cn } from '@/utils/ui/ui.utils';

/**
 * GameControls Component
 * Essential chess game controls with glass morphism styling
 * Provides New Game, Reset, and Flip Board functionality
 */
export const GameControls: React.FC<GameControlsProps> = ({
  onNewGame,
  onResetGame,
  onFlipBoard,
  disabled = false,
  showNewGame = true,
  showReset = true,
  showFlip = true,
  orientation = 'horizontal',
  className,
  ...props
}) => {
  // Handle button clicks with error prevention
  const handleNewGame = () => {
    if (disabled || !onNewGame) return;
    onNewGame();
  };

  const handleResetGame = () => {
    if (disabled || !onResetGame) return;
    onResetGame();
  };

  const handleFlipBoard = () => {
    if (disabled || !onFlipBoard) return;
    onFlipBoard();
  };

  // Control buttons configuration
  const controls = [
    {
      key: 'new',
      show: showNewGame,
      onClick: handleNewGame,
      icon: '🎯',
      label: 'New Game',
      title: 'Start a new chess game'
    },
    {
      key: 'reset',
      show: showReset,
      onClick: handleResetGame,
      icon: '🔄',
      label: 'Reset',
      title: 'Reset to starting position'
    },
    {
      key: 'flip',
      show: showFlip,
      onClick: handleFlipBoard,
      icon: '🔀',
      label: 'Flip',
      title: 'Flip board orientation'
    }
  ].filter(control => control.show);

  if (controls.length === 0) return null;

  return (
    <div 
      className={cn(
        'game-controls',
        'flex items-center gap-2',
        // Glass morphism styling
        'p-3 rounded-xl',
        'bg-white/80 dark:bg-chess-stone-800/80',
        'backdrop-blur-sm border border-chess-stone-200 dark:border-chess-stone-700',
        'shadow-lg shadow-chess-stone-900/10 dark:shadow-chess-stone-900/30',
        // Orientation
        {
          'flex-row': orientation === 'horizontal',
          'flex-col': orientation === 'vertical'
        },
        // Disabled state
        {
          'opacity-60 pointer-events-none': disabled
        },
        className
      )}
      {...props}
    >
      {/* Control Buttons */}
      {controls.map(({ key, onClick, icon, label, title }) => (
        <button
          key={key}
          onClick={onClick}
          disabled={disabled}
          title={title}
          className={cn(
            'control-button',
            'flex items-center gap-2 px-4 py-2',
            'rounded-lg font-medium text-sm',
            'transition-all duration-200',
            'border border-chess-stone-300 dark:border-chess-stone-600',
            // Default state
            'bg-white dark:bg-chess-stone-700',
            'text-chess-stone-700 dark:text-chess-stone-300',
            // Hover state
            'hover:bg-chess-royal-50 dark:hover:bg-chess-royal-900/20',
            'hover:border-chess-royal-300 dark:hover:border-chess-royal-600',
            'hover:text-chess-royal-700 dark:hover:text-chess-royal-300',
            'hover:shadow-md',
            // Active state
            'active:scale-95 active:shadow-sm',
            // Focus state
            'focus:outline-none focus:ring-2 focus:ring-chess-royal-500/20',
            'focus:border-chess-royal-400',
            // Disabled state
            {
              'opacity-50 cursor-not-allowed hover:bg-white dark:hover:bg-chess-stone-700': disabled
            }
          )}
        >
          {/* Button Icon */}
          <span className="control-icon text-base" aria-hidden="true">
            {icon}
          </span>
          
          {/* Button Label */}
          <span className="control-label">
            {label}
          </span>
        </button>
      ))}
      
      {/* Game Controls Label */}
      <div className={cn(
        'controls-label',
        'text-xs text-chess-stone-500 dark:text-chess-stone-400',
        'font-medium tracking-wide',
        {
          'ml-2': orientation === 'horizontal',
          'mt-2 text-center': orientation === 'vertical'
        }
      )}>
        Game Controls
      </div>
    </div>
  );
};

export default GameControls;