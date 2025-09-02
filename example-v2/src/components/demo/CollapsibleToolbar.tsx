/**
 * CollapsibleToolbar Component
 * SRP: Top control bar with expand/collapse functionality and progressive disclosure
 * Orchestrates all game controls, settings, and status display
 */

import React from 'react';
import type { CollapsibleToolbarProps } from '@/types/demo/chessboard-demo.types';
import { cn } from '@/utils/ui/ui.utils';

/**
 * CollapsibleToolbar Component
 * Main control interface following Doc 12 layout specification:
 * - Collapsed: Essential controls in single row (New, Reset, Flip, Theme, Pieces, Size)
 * - Expanded: Full control panel with responsive controls, coordinates, animations, status
 * - Progressive disclosure: Advanced options revealed on demand
 */
export const CollapsibleToolbar: React.FC<CollapsibleToolbarProps> = ({
  isExpanded,
  onToggleExpanded,
  gameControls,
  themeSelector,
  pieceSetSelector,
  containerSizeControls,
  gameStatus,
  advancedSettings,
  disabled = false,
  className,
  ...props
}) => {
  // Handle toggle with error prevention
  const handleToggle = () => {
    if (disabled || !onToggleExpanded) return;
    onToggleExpanded();
  };

  return (
    <div 
      className={cn(
        'collapsible-toolbar',
        'w-full',
        // Glass morphism styling following golden standard
        'bg-white/80 dark:bg-chess-stone-800/80',
        'backdrop-blur-sm border border-chess-stone-200 dark:border-chess-stone-700',
        'rounded-xl shadow-lg shadow-chess-stone-900/10 dark:shadow-chess-stone-900/30',
        // Animation
        'transition-all duration-300 ease-in-out',
        className
      )}
      {...props}
    >
      {/* Primary Toolbar Row (Always Visible) */}
      <div className="primary-toolbar p-4">
        <div className="flex items-center gap-4 justify-between">
          {/* Left Section: Essential Controls */}
          <div className="essential-controls flex items-center gap-3">
            {/* Expand/Collapse Toggle */}
            <button
              onClick={handleToggle}
              disabled={disabled}
              title={isExpanded ? 'Collapse toolbar' : 'Expand toolbar'}
              className={cn(
                'toolbar-toggle',
                'flex items-center justify-center',
                'w-8 h-8 rounded-md',
                'border border-chess-stone-300 dark:border-chess-stone-600',
                'bg-white dark:bg-chess-stone-700',
                'text-chess-stone-600 dark:text-chess-stone-400',
                'hover:bg-chess-royal-50 dark:hover:bg-chess-royal-900/20',
                'hover:border-chess-royal-400 dark:hover:border-chess-royal-500',
                'hover:text-chess-royal-600 dark:hover:text-chess-royal-400',
                'transition-all duration-200',
                // Focus
                'focus:outline-none focus:ring-2 focus:ring-chess-royal-500/20',
                // Disabled
                {
                  'opacity-50 cursor-not-allowed hover:bg-white dark:hover:bg-chess-stone-700': disabled
                }
              )}
            >
              <span 
                className={cn(
                  'toggle-icon transition-transform duration-200 text-sm',
                  { 'rotate-90': isExpanded }
                )}
                aria-hidden="true"
              >
                ≡
              </span>
            </button>

            {/* Game Controls */}
            {gameControls && (
              <div className="game-controls-wrapper">
                {gameControls}
              </div>
            )}
          </div>

          {/* Right Section: Visual Controls */}
          <div className="visual-controls flex items-center gap-3">
            {/* Theme Selector */}
            {themeSelector && (
              <div className="theme-selector-wrapper">
                {React.cloneElement(themeSelector as React.ReactElement<any>, {
                  compact: true,
                  label: undefined
                } as any)}
              </div>
            )}

            {/* Piece Set Selector */}
            {pieceSetSelector && (
              <div className="piece-set-selector-wrapper">
                {React.cloneElement(pieceSetSelector as React.ReactElement<any>, {
                  compact: true,
                  label: undefined
                } as any)}
              </div>
            )}

            {/* Container Size Indicator (collapsed state) */}
            {!isExpanded && containerSizeControls && (
              <div className="size-indicator">
                <div className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-chess-stone-500 dark:text-chess-stone-400 bg-chess-stone-100 dark:bg-chess-stone-700">
                  <span>Size:</span>
                  <span className="font-mono">●M</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Panel (Shown when isExpanded is true) */}
      {isExpanded && (
        <div className="expanded-panel border-t border-chess-stone-200 dark:border-chess-stone-700">
          <div className="p-4 space-y-4">
            
            {/* Responsive Controls Section */}
            {containerSizeControls && (
              <div className="responsive-controls-section">
                <h4 className="section-title text-sm font-semibold text-chess-stone-700 dark:text-chess-stone-300 mb-3">
                  Responsive Testing
                </h4>
                <div className="container-controls">
                  {containerSizeControls}
                </div>
              </div>
            )}

            {/* Advanced Settings Section */}
            {advancedSettings && (
              <div className="advanced-settings-section">
                <h4 className="section-title text-sm font-semibold text-chess-stone-700 dark:text-chess-stone-300 mb-3">
                  Board Settings
                </h4>
                <div className="advanced-controls">
                  {advancedSettings}
                </div>
              </div>
            )}

            {/* Game Status Section */}
            {gameStatus && (
              <div className="game-status-section">
                <h4 className="section-title text-sm font-semibold text-chess-stone-700 dark:text-chess-stone-300 mb-3">
                  Game Status
                </h4>
                <div className="game-status-display">
                  {React.cloneElement(gameStatus as React.ReactElement<any>, {
                    compact: false,
                    showFen: true,
                    showMoveCount: true,
                    showGameResult: true
                  } as any)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Expansion State Indicator */}
      <div className={cn(
        'expansion-indicator',
        'absolute bottom-0 left-1/2 transform -translate-x-1/2',
        'w-8 h-1 rounded-t-full',
        'bg-chess-stone-300 dark:bg-chess-stone-600',
        'transition-all duration-300',
        {
          'bg-chess-royal-400 dark:bg-chess-royal-500': isExpanded
        }
      )} />

      {/* Accessibility */}
      <div className="sr-only">
        Toolbar {isExpanded ? 'expanded' : 'collapsed'}. 
        Press the menu button to {isExpanded ? 'collapse' : 'expand'} advanced controls.
      </div>
    </div>
  );
};

export default CollapsibleToolbar;