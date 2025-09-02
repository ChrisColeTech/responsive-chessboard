/**
 * Difficulty Selector Component
 * Domain: Demo - Computer difficulty selection interface
 * Architecture: Presentation layer - handles difficulty selection with previews
 */

import React, { useState } from 'react';
import clsx from 'clsx';

import type { ComputerDifficulty } from '../../types/chess/computer-opponent.types';
import { DIFFICULTY_LEVELS } from '../../constants/chess/computer-difficulty.constants';

export interface DifficultySelectorProps {
  readonly value: ComputerDifficulty;
  readonly onChange?: (difficulty: ComputerDifficulty) => void;
  readonly disabled?: boolean;
  readonly label?: string;
  readonly compact?: boolean;
  readonly showDescription?: boolean;
  readonly className?: string;
}

// Difficulty level configurations with visual indicators
const DIFFICULTY_OPTIONS = (Object.entries(DIFFICULTY_LEVELS) as [string, typeof DIFFICULTY_LEVELS[ComputerDifficulty]][]).map(
  ([key, level]) => ({
    value: parseInt(key) as ComputerDifficulty,
    ...level,
    color: getDifficultyColor(parseInt(key) as ComputerDifficulty),
    stars: getDifficultyStars(parseInt(key) as ComputerDifficulty)
  })
);

function getDifficultyColor(difficulty: ComputerDifficulty): string {
  if (difficulty <= 2) return 'text-green-600 dark:text-green-400';
  if (difficulty <= 4) return 'text-yellow-600 dark:text-yellow-400';
  if (difficulty <= 6) return 'text-orange-600 dark:text-orange-400';
  if (difficulty <= 8) return 'text-red-600 dark:text-red-400';
  return 'text-purple-600 dark:text-purple-400';
}

function getDifficultyStars(difficulty: ComputerDifficulty): string {
  const starCount = Math.ceil(difficulty / 2);
  return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  value,
  onChange,
  disabled = false,
  label = 'Difficulty Level',
  compact = false,
  showDescription = true,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get current difficulty option
  const currentDifficulty = DIFFICULTY_OPTIONS.find(diff => diff.value === value) || DIFFICULTY_OPTIONS[4];

  // Handle difficulty selection
  const handleDifficultySelect = (difficulty: ComputerDifficulty) => {
    if (disabled || !onChange) return;
    
    onChange(difficulty);
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
      className={clsx(
        'difficulty-selector relative',
        className
      )}
      onBlur={handleBlur}
    >
      {/* Label */}
      {label && !compact && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          'dropdown-button w-full flex items-center justify-between',
          'px-4 py-3 rounded-lg border',
          'border-gray-300 dark:border-gray-600',
          'bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm',
          'text-gray-700 dark:text-gray-300 text-sm font-medium',
          {
            'py-2': compact,
            'ring-2 ring-blue-500/20 border-blue-400': isOpen,
            'opacity-50 cursor-not-allowed': disabled
          },
          'hover:bg-gray-50/80 dark:hover:bg-gray-600/80',
          'hover:border-blue-400 dark:hover:border-blue-500',
          'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400',
          'transition-all duration-200'
        )}
      >
        {/* Current Difficulty Display */}
        <div className="flex items-center gap-3">
          {/* Difficulty indicator */}
          <div className="difficulty-indicator flex items-center gap-2">
            <span className={clsx('text-sm', currentDifficulty.color)}>
              {currentDifficulty.stars}
            </span>
            <span className={clsx('font-semibold', currentDifficulty.color)}>
              {currentDifficulty.level}
            </span>
          </div>
          
          {/* Difficulty info */}
          <div className="text-left">
            <div className="font-medium">
              {currentDifficulty.name}
            </div>
            {!compact && showDescription && (
              <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs truncate">
                {currentDifficulty.description}
              </div>
            )}
          </div>
        </div>

        {/* Dropdown Arrow */}
        <div className={clsx(
          'dropdown-arrow text-gray-500 transition-transform duration-200',
          { 'rotate-180': isOpen }
        )}>
          ▼
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={clsx(
          'dropdown-menu absolute top-full left-0 right-0 z-50',
          'mt-1 py-2 rounded-lg',
          'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md',
          'border border-gray-200 dark:border-gray-700',
          'shadow-xl shadow-gray-900/20 dark:shadow-gray-900/40',
          'max-h-80 overflow-y-auto'
        )}>
          {DIFFICULTY_OPTIONS.map((difficulty) => (
            <button
              key={difficulty.value}
              onClick={() => handleDifficultySelect(difficulty.value)}
              className={clsx(
                'difficulty-option w-full flex items-center gap-3 px-4 py-3',
                'text-left text-sm transition-all duration-150',
                {
                  'bg-blue-100/60 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300': 
                    difficulty.value === value,
                  'text-gray-700 dark:text-gray-300': 
                    difficulty.value !== value,
                  'hover:bg-blue-50/80 dark:hover:bg-blue-900/20': 
                    difficulty.value !== value
                }
              )}
            >
              {/* Difficulty Indicator */}
              <div className="difficulty-indicator flex items-center gap-2 min-w-0">
                <span className={clsx('text-sm', difficulty.color)}>
                  {difficulty.stars}
                </span>
                <span className={clsx('font-semibold w-6', difficulty.color)}>
                  {difficulty.level}
                </span>
              </div>
              
              {/* Difficulty Info */}
              <div className="flex-1 min-w-0">
                <div className="font-medium">
                  {difficulty.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {difficulty.description}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  Depth: {difficulty.depth} • Time: {difficulty.thinkingTime}ms
                </div>
              </div>
              
              {/* Selected Indicator */}
              {difficulty.value === value && (
                <div className="text-blue-500 text-sm">
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

/**
 * Compact Difficulty Display
 * Shows current difficulty without dropdown functionality
 */
export const DifficultyDisplay: React.FC<{
  readonly difficulty: ComputerDifficulty;
  readonly showName?: boolean;
  readonly className?: string;
}> = ({
  difficulty,
  showName = true,
  className
}) => {
  const difficultyInfo = DIFFICULTY_LEVELS[difficulty];
  const color = getDifficultyColor(difficulty);
  const stars = getDifficultyStars(difficulty);

  return (
    <div className={clsx(
      'difficulty-display flex items-center gap-2',
      className
    )}>
      <span className={clsx('text-sm', color)}>
        {stars}
      </span>
      <span className={clsx('font-semibold', color)}>
        {difficulty}
      </span>
      {showName && (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {difficultyInfo.name}
        </span>
      )}
    </div>
  );
};

/**
 * Difficulty Slider
 * Alternative slider interface for difficulty selection
 */
export const DifficultySlider: React.FC<DifficultySelectorProps> = ({
  value,
  onChange,
  disabled = false,
  label = 'Difficulty Level',
  className
}) => {
  const currentDifficulty = DIFFICULTY_LEVELS[value];
  const color = getDifficultyColor(value);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || !onChange) return;
    onChange(parseInt(event.target.value) as ComputerDifficulty);
  };

  return (
    <div className={clsx('difficulty-slider', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="space-y-2">
        {/* Current difficulty display */}
        <div className="flex items-center justify-between">
          <DifficultyDisplay difficulty={value} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {currentDifficulty.description}
          </span>
        </div>
        
        {/* Slider */}
        <input
          type="range"
          min="1"
          max="10"
          step="1"
          value={value}
          onChange={handleSliderChange}
          disabled={disabled}
          className={clsx(
            'w-full h-2 rounded-lg appearance-none cursor-pointer',
            'bg-gray-200 dark:bg-gray-700',
            'slider-thumb:appearance-none slider-thumb:w-4 slider-thumb:h-4',
            'slider-thumb:rounded-full slider-thumb:bg-blue-500',
            'slider-thumb:cursor-pointer slider-thumb:shadow-lg',
            {
              'opacity-50 cursor-not-allowed': disabled
            }
          )}
        />
        
        {/* Difficulty markers */}
        <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500">
          <span>Beginner</span>
          <span>Medium</span>
          <span>Master</span>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;