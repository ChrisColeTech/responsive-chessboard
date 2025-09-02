/**
 * ThemeSelector Component
 * SRP: Provides dropdown interface for selecting chessboard themes
 * Handles theme selection with preview colors and validation
 */

import React, { useState } from 'react';
import type { ThemeSelectorProps } from '@/types/demo/chessboard-demo.types';
import type { BoardTheme } from '@/types/demo/freeplay.types';
import { cn } from '@/utils/ui/ui.utils';

// Theme configuration with preview colors
const THEME_OPTIONS: Array<{
  key: BoardTheme;
  label: string;
  description: string;
  lightSquare: string;
  darkSquare: string;
}> = [
  {
    key: 'classic',
    label: 'Classic',
    description: 'Traditional wooden board appearance',
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863'
  },
  {
    key: 'modern',
    label: 'Modern',
    description: 'Clean contemporary design',
    lightSquare: '#eeeed2',
    darkSquare: '#769656'
  },
  {
    key: 'blue',
    label: 'Blue',
    description: 'Cool blue color scheme',
    lightSquare: '#e6f3ff',
    darkSquare: '#4a90b8'
  },
  {
    key: 'wood',
    label: 'Wood',
    description: 'Rich wooden texture theme',
    lightSquare: '#f4e4bc',
    darkSquare: '#8b6914'
  }
];

/**
 * ThemeSelector Component
 * Dropdown selector for chessboard themes with color previews
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  showPreview = true,
  label = 'Board Theme',
  compact = false,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get current theme option
  const currentTheme = THEME_OPTIONS.find(theme => theme.key === value) || THEME_OPTIONS[0];

  // Handle theme selection
  const handleThemeSelect = (theme: BoardTheme) => {
    if (disabled || !onChange) return;
    
    onChange(theme);
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
        'theme-selector',
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
        {/* Current Theme Display */}
        <div className="flex items-center gap-3">
          {/* Theme Preview */}
          {showPreview && (
            <div className="theme-preview flex">
              <div 
                className="w-4 h-4 rounded-l border border-chess-stone-400"
                style={{ backgroundColor: currentTheme.lightSquare }}
                title="Light squares"
              />
              <div 
                className="w-4 h-4 rounded-r border border-chess-stone-400 border-l-0"
                style={{ backgroundColor: currentTheme.darkSquare }}
                title="Dark squares"
              />
            </div>
          )}
          
          {/* Theme Info */}
          <div className="text-left">
            <div className="font-medium">
              {currentTheme.label}
            </div>
            {!compact && (
              <div className="text-xs text-chess-stone-500 dark:text-chess-stone-400">
                {currentTheme.description}
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
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme.key}
              onClick={() => handleThemeSelect(theme.key)}
              className={cn(
                'theme-option',
                'w-full flex items-center gap-3 px-4 py-3',
                'text-left text-sm',
                'hover:bg-chess-royal-50/80 dark:hover:bg-chess-royal-900/20',
                'transition-all duration-150',
                // Active theme
                {
                  'bg-chess-royal-100/60 dark:bg-chess-royal-900/30 text-chess-royal-700 dark:text-chess-royal-300': theme.key === value,
                  'text-chess-stone-700 dark:text-chess-stone-300': theme.key !== value
                }
              )}
            >
              {/* Theme Preview */}
              {showPreview && (
                <div className="theme-preview flex">
                  <div 
                    className="w-4 h-4 rounded-l border border-chess-stone-400"
                    style={{ backgroundColor: theme.lightSquare }}
                    title="Light squares"
                  />
                  <div 
                    className="w-4 h-4 rounded-r border border-chess-stone-400 border-l-0"
                    style={{ backgroundColor: theme.darkSquare }}
                    title="Dark squares"
                  />
                </div>
              )}
              
              {/* Theme Info */}
              <div className="flex-1">
                <div className="font-medium">
                  {theme.label}
                </div>
                <div className="text-xs text-chess-stone-500 dark:text-chess-stone-400">
                  {theme.description}
                </div>
              </div>
              
              {/* Selected Indicator */}
              {theme.key === value && (
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

export default ThemeSelector;