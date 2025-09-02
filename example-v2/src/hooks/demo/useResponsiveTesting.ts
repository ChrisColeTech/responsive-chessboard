/**
 * Responsive Testing Hook
 * SRP: Manages container size controls for testing chessboard responsiveness
 * Handles dynamic container sizing to showcase responsive behavior
 */

import { useState, useCallback, useMemo } from 'react';
import type { 
  ContainerConfig, 
  ContainerSize, 
  DemoError 
} from '@/types/demo/freeplay.types';
import { 
  DEFAULT_CONTAINER_CONFIG,
  CONTAINER_SIZE_OPTIONS,
  DEMO_STORAGE_KEYS 
} from '@/constants/demo/chessboard-demo.constants';
import { DemoConfigService } from '@/services/demo/DemoConfigService';

/**
 * Hook options interface
 */
export interface UseResponsiveTestingOptions {
  initialConfig?: Partial<ContainerConfig>;
  persistToStorage?: boolean;
  onConfigChange?: (config: ContainerConfig) => void;
  onError?: (error: DemoError) => void;
}

/**
 * Hook return interface
 */
export interface UseResponsiveTestingReturn {
  containerConfig: ContainerConfig;
  setContainerSize: (size: ContainerSize) => void;
  setCustomDimensions: (width: number, height: number) => void;
  updateAspectRatio: (ratio: number) => void;
  updateSizeLimits: (minSize: number, maxSize: number) => void;
  updateConfig: (partial: Partial<ContainerConfig>) => void;
  resetToDefaults: () => void;
  containerDimensions: { width: number; height: number };
  availableSizes: typeof CONTAINER_SIZE_OPTIONS;
  isLoading: boolean;
  error: DemoError | null;
}

/**
 * Load container config from localStorage
 */
function loadStoredConfig(): Partial<ContainerConfig> {
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEYS.CONTAINER_CONFIG);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load stored container config:', error);
    return {};
  }
}

/**
 * Save container config to localStorage
 */
function saveStoredConfig(config: ContainerConfig): void {
  try {
    localStorage.setItem(DEMO_STORAGE_KEYS.CONTAINER_CONFIG, JSON.stringify(config));
  } catch (error) {
    console.warn('Failed to save container config:', error);
  }
}

/**
 * Creates a demo error
 */
function createDemoError(type: DemoError['type'], message: string, context?: Record<string, any>): DemoError {
  return {
    type,
    message,
    timestamp: Date.now(),
    context
  };
}

/**
 * Responsive Testing Hook
 * Manages container configuration for testing chessboard responsive behavior
 */
export function useResponsiveTesting(options: UseResponsiveTestingOptions = {}): UseResponsiveTestingReturn {
  const {
    initialConfig = {},
    persistToStorage = true,
    onConfigChange,
    onError
  } = options;

  // Initialize container config with fallbacks
  const [containerConfig, setContainerConfigState] = useState<ContainerConfig>(() => {
    const stored = persistToStorage ? loadStoredConfig() : {};
    const combined = { ...DEFAULT_CONTAINER_CONFIG, ...stored, ...initialConfig };
    return DemoConfigService.sanitizeContainerConfig(combined);
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<DemoError | null>(null);

  // Clear error helper
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Handle errors
  const handleError = useCallback((newError: DemoError) => {
    setError(newError);
    onError?.(newError);
  }, [onError]);

  // Update config with validation and persistence
  const updateConfig = useCallback((partial: Partial<ContainerConfig>) => {
    clearError();
    setIsLoading(true);

    try {
      const newConfig = { ...containerConfig, ...partial };
      
      // Validate the new config
      const errors = DemoConfigService.validateCompleteContainerConfig(newConfig);
      if (errors.length > 0) {
        handleError(errors[0]); // Report first error
        return;
      }

      // Sanitize to ensure all values are valid
      const sanitizedConfig = DemoConfigService.sanitizeContainerConfig(newConfig);
      
      // Update state
      setContainerConfigState(sanitizedConfig);
      
      // Persist to storage if enabled
      if (persistToStorage) {
        saveStoredConfig(sanitizedConfig);
      }
      
      // Notify callback
      onConfigChange?.(sanitizedConfig);
      
    } catch (error) {
      handleError(createDemoError(
        'settings_error', 
        `Failed to update container config: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { partial, error }
      ));
    } finally {
      setIsLoading(false);
    }
  }, [containerConfig, persistToStorage, onConfigChange, clearError, handleError]);

  // Set container size (updates dimensions automatically)
  const setContainerSize = useCallback((size: ContainerSize) => {
    if (!DemoConfigService.validateContainerSize(size)) {
      handleError(createDemoError('settings_error', `Invalid container size: ${size}`, { size }));
      return;
    }

    const sizeOption = DemoConfigService.getContainerSizeOption(size);
    if (!sizeOption) {
      handleError(createDemoError('settings_error', `Container size option not found: ${size}`, { size }));
      return;
    }

    updateConfig({
      size,
      width: sizeOption.width,
      height: sizeOption.height
    });
  }, [updateConfig, handleError]);

  // Set custom dimensions (switches to custom size)
  const setCustomDimensions = useCallback((width: number, height: number) => {
    if (!DemoConfigService.validateBoardSize(width) || !DemoConfigService.validateBoardSize(height)) {
      handleError(createDemoError('settings_error', `Invalid dimensions: ${width}x${height}`, { width, height }));
      return;
    }

    updateConfig({
      size: 'custom',
      width,
      height
    });
  }, [updateConfig, handleError]);

  // Update aspect ratio (maintains width, adjusts height)
  const updateAspectRatio = useCallback((ratio: number) => {
    if (typeof ratio !== 'number' || ratio <= 0) {
      handleError(createDemoError('settings_error', `Invalid aspect ratio: ${ratio}`, { ratio }));
      return;
    }

    const newHeight = Math.round(containerConfig.width / ratio);
    if (!DemoConfigService.validateBoardSize(newHeight)) {
      handleError(createDemoError('settings_error', `Invalid calculated height: ${newHeight}`, { ratio, width: containerConfig.width, newHeight }));
      return;
    }

    updateConfig({
      aspectRatio: ratio,
      height: newHeight
    });
  }, [containerConfig.width, updateConfig, handleError]);

  // Update size limits
  const updateSizeLimits = useCallback((minSize: number, maxSize: number) => {
    if (!DemoConfigService.validateBoardSize(minSize) || !DemoConfigService.validateBoardSize(maxSize)) {
      handleError(createDemoError('settings_error', `Invalid size limits: ${minSize} - ${maxSize}`, { minSize, maxSize }));
      return;
    }

    if (minSize >= maxSize) {
      handleError(createDemoError('settings_error', 'Min size must be less than max size', { minSize, maxSize }));
      return;
    }

    updateConfig({ minSize, maxSize });
  }, [updateConfig, handleError]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    clearError();
    setIsLoading(true);

    try {
      const defaultConfig = DemoConfigService.getDefaultContainerConfig();
      setContainerConfigState(defaultConfig);
      
      if (persistToStorage) {
        saveStoredConfig(defaultConfig);
      }
      
      onConfigChange?.(defaultConfig);
    } catch (error) {
      handleError(createDemoError(
        'settings_error',
        `Failed to reset container config: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { error }
      ));
    } finally {
      setIsLoading(false);
    }
  }, [persistToStorage, onConfigChange, clearError, handleError]);

  // Memoized container dimensions for easy access
  const containerDimensions = useMemo(() => ({
    width: containerConfig.width,
    height: containerConfig.height
  }), [containerConfig.width, containerConfig.height]);

  // Memoized return value to prevent unnecessary re-renders
  return useMemo(() => ({
    containerConfig,
    setContainerSize,
    setCustomDimensions,
    updateAspectRatio,
    updateSizeLimits,
    updateConfig,
    resetToDefaults,
    containerDimensions,
    availableSizes: CONTAINER_SIZE_OPTIONS,
    isLoading,
    error
  }), [
    containerConfig,
    setContainerSize,
    setCustomDimensions,
    updateAspectRatio,
    updateSizeLimits,
    updateConfig,
    resetToDefaults,
    containerDimensions,
    isLoading,
    error
  ]);
}