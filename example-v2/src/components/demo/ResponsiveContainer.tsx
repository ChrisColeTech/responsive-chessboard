/**
 * ResponsiveContainer Component
 * SRP: Provides dynamic container sizing to showcase responsive behavior
 * Wraps children with configurable dimensions for responsive testing
 */

import React from 'react';
import type { ResponsiveContainerProps } from '@/types/demo/chessboard-demo.types';
import { cn } from '@/utils/ui/ui.utils';

/**
 * ResponsiveContainer Component
 * Dynamic container that adjusts size based on configuration
 * Showcases how chessboard responds to different container sizes
 */
export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  config,
  onConfigChange,
  children,
  showSizeControls = true,
  disabled = false,
  className,
  ...props
}) => {
  // Create container styles based on config
  const containerStyles: React.CSSProperties = {
    width: config.width,
    height: config.height,
    minWidth: config.minSize,
    maxWidth: config.maxSize,
    aspectRatio: config.aspectRatio,
    transition: 'all 300ms ease-in-out' // Smooth transitions when size changes
  };

  // Handle size button clicks
  const handleSizeChange = (newSize: typeof config.size) => {
    if (disabled || !onConfigChange) return;

    // Find the size option to get default dimensions
    const sizeOptions = {
      small: { width: 320, height: 320 },
      medium: { width: 480, height: 480 },
      large: { width: 640, height: 640 },
      xlarge: { width: 800, height: 800 },
      custom: { width: config.width, height: config.height }
    };

    const newDimensions = sizeOptions[newSize];
    onConfigChange({
      ...config,
      size: newSize,
      width: newDimensions.width,
      height: newDimensions.height
    });
  };

  return (
    <div 
      className={cn(
        'responsive-container-wrapper',
        'flex flex-col items-center gap-4',
        className
      )}
      {...props}
    >
      {/* Size Controls */}
      {showSizeControls && (
        <div className="size-controls flex items-center gap-2 p-2 rounded-lg bg-white/80 dark:bg-chess-stone-800/80 backdrop-blur-sm border border-chess-stone-200 dark:border-chess-stone-700">
          <span className="text-sm font-medium text-chess-stone-700 dark:text-chess-stone-300 mr-2">
            Size:
          </span>
          
          {/* Size Buttons */}
          {(['small', 'medium', 'large', 'xlarge', 'custom'] as const).map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              disabled={disabled}
              className={cn(
                'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                'border border-chess-stone-300 dark:border-chess-stone-600',
                {
                  // Active state
                  'bg-chess-royal-500 text-white border-chess-royal-600 shadow-sm': config.size === size,
                  // Inactive state
                  'bg-white dark:bg-chess-stone-700 text-chess-stone-700 dark:text-chess-stone-300 hover:bg-chess-stone-50 dark:hover:bg-chess-stone-600': config.size !== size,
                  // Disabled state
                  'opacity-50 cursor-not-allowed': disabled
                }
              )}
            >
              {size === 'xlarge' ? 'XL' : size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
          
          {/* Current dimensions display */}
          <span className="text-xs text-chess-stone-500 dark:text-chess-stone-400 ml-2 font-mono">
            {config.width}×{config.height}
          </span>
        </div>
      )}

      {/* Responsive Container */}
      <div 
        className={cn(
          'responsive-container',
          'relative overflow-hidden',
          'border-2 border-dashed border-chess-stone-300 dark:border-chess-stone-600',
          'rounded-lg',
          'bg-chess-stone-50/50 dark:bg-chess-stone-900/50',
          'p-4'
        )}
        style={containerStyles}
      >
        {/* Size indicator overlay */}
        <div className="absolute top-2 left-2 z-10">
          <div className="px-2 py-1 text-xs font-mono bg-black/60 text-white rounded">
            {config.size} ({config.width}×{config.height})
          </div>
        </div>

        {/* Container content */}
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>

        {/* Resize handles for custom size (visual only) */}
        {config.size === 'custom' && !disabled && (
          <>
            {/* Corner resize handle */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-chess-royal-500/50 cursor-se-resize" />
            
            {/* Edge resize handles */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-chess-royal-500/30 cursor-s-resize" />
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-8 bg-chess-royal-500/30 cursor-e-resize" />
          </>
        )}
      </div>

      {/* Container info */}
      <div className="container-info text-center">
        <div className="text-sm text-chess-stone-600 dark:text-chess-stone-400">
          Container: <span className="font-mono font-medium">{config.width}×{config.height}</span>
          {config.aspectRatio !== 1 && (
            <span className="ml-2">
              Ratio: <span className="font-mono font-medium">{config.aspectRatio.toFixed(2)}:1</span>
            </span>
          )}
        </div>
        
        <div className="text-xs text-chess-stone-500 dark:text-chess-stone-500 mt-1">
          Limits: {config.minSize}px - {config.maxSize}px
        </div>
      </div>
    </div>
  );
};

export default ResponsiveContainer;