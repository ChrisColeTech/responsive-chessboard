// SRP: Responsive container utilities for demo testing
import type { ContainerSize, ContainerConfig } from '@/types/demo/demo.types';
import { CONTAINER_SIZE_OPTIONS, DEMO_LIMITS } from '@/constants/demo/chessboard-demo.constants';

/**
 * Gets container dimensions for a given size preset
 */
export const getContainerDimensions = (size: ContainerSize): { width: number; height: number } => {
  const option = CONTAINER_SIZE_OPTIONS.find(opt => opt.value === size);
  return {
    width: option?.width ?? 400,
    height: option?.height ?? 400
  };
};

/**
 * Validates container dimensions against demo limits
 */
export const validateContainerSize = (width: number, height: number): boolean => {
  return (
    width >= DEMO_LIMITS.MIN_BOARD_SIZE &&
    width <= DEMO_LIMITS.MAX_BOARD_SIZE &&
    height >= DEMO_LIMITS.MIN_BOARD_SIZE &&
    height <= DEMO_LIMITS.MAX_BOARD_SIZE
  );
};

/**
 * Clamps dimensions to valid range
 */
export const clampContainerSize = (width: number, height: number): { width: number; height: number } => {
  return {
    width: Math.max(DEMO_LIMITS.MIN_BOARD_SIZE, Math.min(DEMO_LIMITS.MAX_BOARD_SIZE, width)),
    height: Math.max(DEMO_LIMITS.MIN_BOARD_SIZE, Math.min(DEMO_LIMITS.MAX_BOARD_SIZE, height))
  };
};

/**
 * Calculates square size based on container dimensions
 */
export const calculateSquareSize = (containerWidth: number, containerHeight: number): number => {
  // Use the smaller dimension to ensure square board fits
  const boardSize = Math.min(containerWidth, containerHeight);
  // Account for padding and coordinates
  const usableSize = boardSize * 0.9; // 10% padding
  return Math.floor(usableSize / 8); // 8x8 squares
};

/**
 * Gets responsive breakpoint information
 */
export const getResponsiveInfo = (width: number): {
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} => {
  const isMobile = width < 480;
  const isTablet = width >= 480 && width < 768;
  const isDesktop = width >= 768;
  
  let breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large';
  if (width < 480) breakpoint = 'mobile';
  else if (width < 768) breakpoint = 'tablet';
  else if (width < 1200) breakpoint = 'desktop';
  else breakpoint = 'large';
  
  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop
  };
};

/**
 * Calculates optimal container configuration based on viewport
 */
export const calculateOptimalContainer = (
  viewportWidth: number, 
  viewportHeight: number
): ContainerConfig => {
  const availableWidth = viewportWidth * 0.8; // Leave some margin
  const availableHeight = viewportHeight * 0.8;
  
  // Find the largest square that fits
  const maxSize = Math.min(availableWidth, availableHeight);
  const clampedSize = Math.max(DEMO_LIMITS.MIN_BOARD_SIZE, Math.min(DEMO_LIMITS.MAX_BOARD_SIZE, maxSize));
  
  // Determine size category
  let size: ContainerSize;
  if (clampedSize <= 320) size = 'small';
  else if (clampedSize <= 480) size = 'medium';
  else if (clampedSize <= 640) size = 'large';
  else if (clampedSize <= 800) size = 'xlarge';
  else size = 'custom';
  
  return {
    size,
    width: clampedSize,
    height: clampedSize,
    aspectRatio: 1,
    minSize: DEMO_LIMITS.MIN_BOARD_SIZE,
    maxSize: DEMO_LIMITS.MAX_BOARD_SIZE
  };
};

/**
 * Updates container config with new dimensions
 */
export const updateContainerConfig = (
  current: ContainerConfig, 
  updates: Partial<ContainerConfig>
): ContainerConfig => {
  const updated = { ...current, ...updates };
  
  // If size is being updated to a preset, update dimensions
  if (updates.size && updates.size !== 'custom') {
    const dimensions = getContainerDimensions(updates.size);
    updated.width = dimensions.width;
    updated.height = dimensions.height;
  }
  
  // If dimensions are being updated, check if it matches a preset
  if (updates.width || updates.height) {
    const { width, height } = clampContainerSize(updated.width, updated.height);
    updated.width = width;
    updated.height = height;
    
    // Update size if it matches a preset
    const matchingPreset = CONTAINER_SIZE_OPTIONS.find(
      opt => opt.width === width && opt.height === height && opt.value !== 'custom'
    );
    if (matchingPreset) {
      updated.size = matchingPreset.value;
    } else {
      updated.size = 'custom';
    }
  }
  
  return updated;
};

/**
 * Gets CSS styles for responsive container
 */
export const getContainerStyles = (config: ContainerConfig): React.CSSProperties => {
  return {
    width: config.width,
    height: config.height,
    minWidth: config.minSize,
    minHeight: config.minSize,
    maxWidth: config.maxSize,
    maxHeight: config.maxSize,
    aspectRatio: config.aspectRatio.toString(),
    margin: '0 auto',
    position: 'relative',
    border: '1px solid rgb(var(--border))',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'all 0.3s ease'
  };
};

/**
 * Debounces resize events for performance
 */
export const debounceResize = <T extends (...args: any[]) => void>(
  func: T, 
  wait: number
): T => {
  let timeout: NodeJS.Timeout | null = null;
  
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
};

/**
 * Gets device pixel ratio for high-DPI displays
 */
export const getDevicePixelRatio = (): number => {
  return typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1;
};

/**
 * Calculates if container should use high-DPI rendering
 */
export const shouldUseHighDPI = (width: number): boolean => {
  const pixelRatio = getDevicePixelRatio();
  return pixelRatio > 1 && width >= 400; // Only for larger boards
};

/**
 * Gets touch-friendly settings based on container size
 */
export const getTouchSettings = (containerWidth: number): {
  useLargerHitTargets: boolean;
  enableHapticFeedback: boolean;
  adjustedAnimationDuration: number;
} => {
  const isMobile = containerWidth < 480;
  
  return {
    useLargerHitTargets: isMobile,
    enableHapticFeedback: isMobile,
    adjustedAnimationDuration: isMobile ? 250 : 300 // Slightly faster on mobile
  };
};

/**
 * Formats container size for display
 */
export const formatContainerSize = (config: ContainerConfig): string => {
  if (config.size === 'custom') {
    return `${config.width}×${config.height}px`;
  }
  
  const option = CONTAINER_SIZE_OPTIONS.find(opt => opt.value === config.size);
  return option?.label || `${config.width}×${config.height}px`;
};

/**
 * Gets performance recommendations based on container size
 */
export const getPerformanceRecommendations = (config: ContainerConfig): {
  recommendReduceAnimations: boolean;
  recommendDisableCoordinates: boolean;
  recommendLowerQuality: boolean;
} => {
  const isLarge = config.width > 600 || config.height > 600;
  const isSmall = config.width < 300 || config.height < 300;
  
  return {
    recommendReduceAnimations: isLarge,
    recommendDisableCoordinates: isSmall,
    recommendLowerQuality: isSmall
  };
};