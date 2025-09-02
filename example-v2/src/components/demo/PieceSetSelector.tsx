/**
 * PieceSetSelector Component
 * SRP: Provides dropdown interface for selecting chess piece sets
 * Handles piece set selection with visual previews and validation
 */

import React, { useState } from 'react';
import type { PieceSetSelectorProps } from '@/types/demo/chessboard-demo.types';
import type { PieceSet } from '@/types/demo/freeplay.types';
import { cn } from '@/utils/ui/ui.utils';

// Piece set configuration with descriptions
const PIECE_SET_OPTIONS: Array<{
  key: PieceSet;
  label: string;
  description: string;
  style: string;
}> = [
  {
    key: 'classic',
    label: 'Classic',
    description: 'Traditional chess pieces',
    style: 'Timeless design'
  },
  {
    key: 'modern',
    label: 'Modern',
    description: 'Clean contemporary style',
    style: 'Minimalist approach'
  },
  {
    key: 'tournament',
    label: 'Tournament',
    description: 'Official competition style',
    style: 'Tournament standard'
  },
  {
    key: 'executive',
    label: 'Executive',
    description: 'Premium business style',
    style: 'Professional look'
  },
  {
    key: 'conqueror',
    label: 'Conqueror',
    description: 'Bold medieval design',
    style: 'Historical theme'
  }
];

/**
 * PieceSetSelector Component
 * Dropdown selector for chess piece sets with style descriptions
 */
export const PieceSetSelector: React.FC<PieceSetSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  compact = false,
  label = 'Piece Set',
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get current piece set option
  const currentPieceSet = PIECE_SET_OPTIONS.find(pieceSet => pieceSet.key === value) || PIECE_SET_OPTIONS[0];

  // Handle piece set selection
  const handlePieceSetSelect = (pieceSet: PieceSet) => {
    if (disabled || !onChange) return;
    
    onChange(pieceSet);
    setIsOpen(false);
  };

  // Handle dropdown toggle
  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  // Handle click outside to close dropdown
  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div 
      className={cn(
        'piece-set-selector',
        'relative',
        className
      )}
      onBlur={handleBlur}
      {...props}
    >
      {/* Label */}
      {label && !compact && (
        <label className="block text-sm font-medium text-chess-stone-700 dark:text-chess-stone-300 mb-2">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          'dropdown-button',
          'w-full flex items-center justify-between',
          'px-4 py-3 rounded-lg',
          'border border-chess-stone-300 dark:border-chess-stone-600',
          // Glass morphism styling
          'bg-white/80 dark:bg-chess-stone-700/80',
          'backdrop-blur-sm',
          'text-chess-stone-700 dark:text-chess-stone-300',
          'text-sm font-medium',
          // Compact mode adjustments
          {
            'py-2': compact
          },
          // Hover state
          'hover:bg-chess-stone-50/80 dark:hover:bg-chess-stone-600/80',
          'hover:border-chess-royal-400 dark:hover:border-chess-royal-500',
          // Focus state
          'focus:outline-none focus:ring-2 focus:ring-chess-royal-500/20',
          'focus:border-chess-royal-400',
          // Active state
          {
            'ring-2 ring-chess-royal-500/20 border-chess-royal-400': isOpen
          },
          // Disabled state
          {
            'opacity-50 cursor-not-allowed hover:bg-white/80 dark:hover:bg-chess-stone-700/80': disabled
          },
          'transition-all duration-200'
        )}
      >
        {/* Current Piece Set Display */}
        <div className="flex items-center gap-3">
          {/* Piece Set Icon */}
          <div className="piece-set-icon text-lg" title={`${currentPieceSet.label} pieces`}>
            ♔
          </div>
          
          {/* Piece Set Info */}
          <div className="text-left">
            <div className="font-medium">
              {currentPieceSet.label}
            </div>
            {!compact && (
              <div className="text-xs text-chess-stone-500 dark:text-chess-stone-400">
                {currentPieceSet.style}
              </div>
            )}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <div className={cn(
          'dropdown-arrow text-chess-stone-500 transition-transform duration-200',
          { 'rotate-180': isOpen }
        )}>
          ▼
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={cn(
          'dropdown-menu',
          'absolute top-full left-0 right-0 z-50',
          'mt-1 py-2 rounded-lg',
          // Glass morphism styling
          'bg-white/90 dark:bg-chess-stone-800/90',
          'backdrop-blur-md border border-chess-stone-200 dark:border-chess-stone-700',
          'shadow-xl shadow-chess-stone-900/20 dark:shadow-chess-stone-900/40',
          'max-h-64 overflow-y-auto'
        )}>
          {PIECE_SET_OPTIONS.map((pieceSet) => (
            <button
              key={pieceSet.key}
              onClick={() => handlePieceSetSelect(pieceSet.key)}
              className={cn(
                'piece-set-option',
                'w-full flex items-center gap-3 px-4 py-3',
                'text-left text-sm',
                'hover:bg-chess-royal-50/80 dark:hover:bg-chess-royal-900/20',
                'transition-all duration-150',
                // Active piece set
                {
                  'bg-chess-royal-100/60 dark:bg-chess-royal-900/30 text-chess-royal-700 dark:text-chess-royal-300': pieceSet.key === value,
                  'text-chess-stone-700 dark:text-chess-stone-300': pieceSet.key !== value
                }
              )}
            >
              {/* Piece Set Icon */}
              <div className="piece-set-icon text-lg" title={`${pieceSet.label} style`}>
                ♔
              </div>
              
              {/* Piece Set Info */}
              <div className="flex-1">
                <div className="font-medium">
                  {pieceSet.label}
                </div>
                <div className="text-xs text-chess-stone-500 dark:text-chess-stone-400">
                  {pieceSet.description}
                </div>
              </div>
              
              {/* Selected Indicator */}
              {pieceSet.key === value && (
                <div className="text-chess-royal-500 text-sm">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieceSetSelector;