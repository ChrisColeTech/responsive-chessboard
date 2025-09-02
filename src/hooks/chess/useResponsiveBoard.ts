/**
 * Responsive Board Hook
 * Manages board dimensions and responsive behavior
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import type { ResponsiveBoardHook } from '../../types';

interface UseResponsiveBoardOptions {
  width?: number;
  height?: number;
  minSize?: number;
  maxSize?: number;
  aspectRatio?: number;
  responsive?: boolean;
}

/**
 * Hook for managing responsive board sizing
 */
export function useResponsiveBoard(options: UseResponsiveBoardOptions = {}): ResponsiveBoardHook {
  const {
    width,
    height,
    minSize = 200,
    maxSize = 800,
    aspectRatio = 1,
    responsive = true
  } = options;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: width || 400,
    height: height || 400,
    squareSize: (width || 400) / 8
  });
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');
  const [isResizing, setIsResizing] = useState(false);
  
  const calculateDimensions = useCallback(() => {
    if (!responsive || !containerRef.current) {
      const finalWidth = width || 400;
      const finalHeight = height || finalWidth * aspectRatio;
      return {
        width: finalWidth,
        height: finalHeight,
        squareSize: finalWidth / 8
      };
    }
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const availableWidth = containerRect.width || container.clientWidth;
    const availableHeight = containerRect.height || container.clientHeight;
    
    let boardWidth = Math.min(availableWidth, availableHeight);
    
    // Apply size constraints
    boardWidth = Math.max(minSize, Math.min(maxSize, boardWidth));
    
    const boardHeight = boardWidth * aspectRatio;
    const squareSize = boardWidth / 8;
    
    return {
      width: boardWidth,
      height: boardHeight,
      squareSize
    };
  }, [width, height, minSize, maxSize, aspectRatio, responsive]);
  
  const updateDimensions = useCallback(() => {
    const newDimensions = calculateDimensions();
    setDimensions(prev => {
      if (prev.width !== newDimensions.width || 
          prev.height !== newDimensions.height) {
        setIsResizing(true);
        // Reset resizing flag after a short delay
        setTimeout(() => setIsResizing(false), 100);
        return newDimensions;
      }
      return prev;
    });
  }, [calculateDimensions]);
  
  // Update dimensions on mount and when options change
  useEffect(() => {
    updateDimensions();
  }, [updateDimensions]);
  
  // Set up resize observer for responsive behavior
  useEffect(() => {
    if (!responsive || !containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    
    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [responsive, updateDimensions]);
  
  // Also listen to window resize as fallback
  useEffect(() => {
    if (!responsive) return;
    
    const handleResize = () => updateDimensions();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [responsive, updateDimensions]);
  
  return {
    dimensions,
    orientation,
    containerRef,
    isResizing,
    setOrientation
  };
}