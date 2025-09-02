/**
 * Player Color Selector Component
 * Domain: Demo - Player color selection interface
 * Architecture: Presentation layer - handles color selection for VS Computer games
 */

import React from 'react';
import clsx from 'clsx';

import type { PlayerColorSelectorProps } from '../../types/demo/vs-computer.types';

const COLOR_OPTIONS = [
  {
    value: 'white' as const,
    label: 'White',
    description: 'Play as white pieces (first move)',
    icon: '♔',
    bgColor: 'bg-white',
    borderColor: 'border-gray-400',
    textColor: 'text-gray-800',
    selectedBg: 'bg-blue-50',
    selectedBorder: 'border-blue-500',
    selectedText: 'text-blue-700'
  },
  {
    value: 'black' as const,
    label: 'Black',
    description: 'Play as black pieces (second move)',
    icon: '♚',
    bgColor: 'bg-gray-800',
    borderColor: 'border-gray-600',
    textColor: 'text-white',
    selectedBg: 'bg-blue-900/20',
    selectedBorder: 'border-blue-400',
    selectedText: 'text-blue-400'
  }
] as const;

export const PlayerColorSelector: React.FC<PlayerColorSelectorProps> = ({
  selectedColor,
  onColorChange,
  disabled = false,
  className
}) => {
  const handleColorSelect = (color: 'white' | 'black') => {
    if (disabled || !onColorChange) return;
    onColorChange(color);
  };

  return (
    <div className={clsx(
      'player-color-selector',
      'grid grid-cols-2 gap-3',
      className
    )}>
      {COLOR_OPTIONS.map((option) => {
        const isSelected = selectedColor === option.value;
        
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleColorSelect(option.value)}
            disabled={disabled}
            className={clsx(
              'color-option relative flex flex-col items-center',
              'p-4 rounded-lg border-2 transition-all duration-200',
              'text-center min-h-[120px]',
              // Default styling
              {
                [option.bgColor]: true,
                [option.borderColor]: !isSelected,
                [option.textColor]: !isSelected && option.value === 'white'
              },
              // Selected styling
              {
                [option.selectedBg]: isSelected,
                [option.selectedBorder]: isSelected,
                [option.selectedText]: isSelected,
                'ring-2 ring-blue-500/20': isSelected
              },
              // Hover styling
              {
                'hover:scale-105 hover:shadow-lg': !disabled && !isSelected,
                'hover:border-blue-300': !disabled && !isSelected && option.value === 'white',
                'hover:border-blue-500': !disabled && !isSelected && option.value === 'black'
              },
              // Disabled styling
              {
                'opacity-50 cursor-not-allowed': disabled,
                'cursor-pointer': !disabled
              }
            )}
          >
            {/* Chess Piece Icon */}
            <div className="text-4xl mb-2">
              {option.icon}
            </div>
            
            {/* Color Label */}
            <div className="font-semibold text-sm mb-1">
              {option.label} Pieces
            </div>
            
            {/* Description */}
            <div className={clsx(
              'text-xs leading-tight',
              {
                'text-gray-600': !isSelected && option.value === 'white',
                'text-gray-300': !isSelected && option.value === 'black',
                [option.selectedText]: isSelected
              }
            )}>
              {option.description}
            </div>
            
            {/* Selected Indicator */}
            {isSelected && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">
                ✓
              </div>
            )}
            
            {/* Move Order Indicator */}
            <div className={clsx(
              'absolute -top-1 -left-1 w-5 h-5 rounded-full',
              'flex items-center justify-center text-xs font-bold',
              {
                'bg-green-500 text-white': option.value === 'white',
                'bg-orange-500 text-white': option.value === 'black'
              }
            )}>
              {option.value === 'white' ? '1' : '2'}
            </div>
          </button>
        );
      })}
    </div>
  );
};

/**
 * Compact Player Color Toggle
 * Minimal toggle for space-constrained layouts
 */
export const PlayerColorToggle: React.FC<PlayerColorSelectorProps> = ({
  selectedColor,
  onColorChange,
  disabled = false,
  className
}) => {
  const handleToggle = () => {
    if (disabled || !onColorChange) return;
    onColorChange(selectedColor === 'white' ? 'black' : 'white');
  };

  return (
    <div className={clsx(
      'player-color-toggle flex items-center space-x-3',
      className
    )}>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Play as:
      </span>
      
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          'flex items-center space-x-2 px-3 py-2 rounded-lg border',
          'transition-all duration-200',
          {
            'bg-white border-gray-300 text-gray-800': selectedColor === 'white',
            'bg-gray-800 border-gray-600 text-white': selectedColor === 'black',
            'hover:scale-105': !disabled,
            'opacity-50 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled
          }
        )}
      >
        <span className="text-lg">
          {selectedColor === 'white' ? '♔' : '♚'}
        </span>
        <span className="font-medium">
          {selectedColor === 'white' ? 'White' : 'Black'}
        </span>
      </button>
    </div>
  );
};

/**
 * Player Color Radio Group
 * Traditional radio button interface
 */
export const PlayerColorRadio: React.FC<PlayerColorSelectorProps> = ({
  selectedColor,
  onColorChange,
  disabled = false,
  className
}) => {
  return (
    <fieldset className={clsx('player-color-radio', className)} disabled={disabled}>
      <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Choose your color
      </legend>
      
      <div className="space-y-2">
        {COLOR_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={clsx(
              'flex items-center space-x-3 p-2 rounded cursor-pointer',
              'hover:bg-gray-50 dark:hover:bg-gray-700',
              {
                'opacity-50 cursor-not-allowed': disabled
              }
            )}
          >
            <input
              type="radio"
              name="playerColor"
              value={option.value}
              checked={selectedColor === option.value}
              onChange={(e) => onColorChange?.(e.target.value as 'white' | 'black')}
              disabled={disabled}
              className="text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            
            <span className="text-xl">{option.icon}</span>
            
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {option.label}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {option.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default PlayerColorSelector;