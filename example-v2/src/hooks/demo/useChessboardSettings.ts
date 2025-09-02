/**
 * Chessboard Settings Hook
 * SRP: Manages UI settings for chessboard appearance and behavior
 * Handles theme, piece set, animations, coordinates, etc.
 */

import { useState, useCallback, useMemo } from 'react';
import type { 
  ChessboardSettings, 
  BoardTheme, 
  PieceSet, 
  DemoError 
} from '@/types/demo/freeplay.types';
import { 
  DEFAULT_CHESSBOARD_SETTINGS,
  DEMO_STORAGE_KEYS 
} from '@/constants/demo/chessboard-demo.constants';
import { DemoConfigService } from '@/services/demo/DemoConfigService';

/**
 * Hook options interface
 */
export interface UseChessboardSettingsOptions {
  initialSettings?: Partial<ChessboardSettings>;
  persistToStorage?: boolean;
  onSettingsChange?: (settings: ChessboardSettings) => void;
  onError?: (error: DemoError) => void;
}

/**
 * Hook return interface
 */
export interface UseChessboardSettingsReturn {
  settings: ChessboardSettings;
  updateTheme: (theme: BoardTheme) => void;
  updatePieceSet: (pieceSet: PieceSet) => void;
  toggleCoordinates: () => void;
  toggleAnimations: () => void;
  toggleDragAndDrop: () => void;
  updateAnimationDuration: (duration: number) => void;
  flipBoardOrientation: () => void;
  updateSettings: (partial: Partial<ChessboardSettings>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
  error: DemoError | null;
}

/**
 * Load settings from localStorage
 */
function loadStoredSettings(): Partial<ChessboardSettings> {
  try {
    const stored = localStorage.getItem(DEMO_STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.warn('Failed to load stored settings:', error);
    return {};
  }
}

/**
 * Save settings to localStorage
 */
function saveStoredSettings(settings: ChessboardSettings): void {
  try {
    localStorage.setItem(DEMO_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings:', error);
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
 * Chessboard Settings Hook
 * Manages UI settings with validation, persistence, and fallbacks
 */
export function useChessboardSettings(options: UseChessboardSettingsOptions = {}): UseChessboardSettingsReturn {
  const {
    initialSettings = {},
    persistToStorage = true,
    onSettingsChange,
    onError
  } = options;

  // Initialize settings with fallbacks
  const [settings, setSettingsState] = useState<ChessboardSettings>(() => {
    const stored = persistToStorage ? loadStoredSettings() : {};
    const combined = { ...DEFAULT_CHESSBOARD_SETTINGS, ...stored, ...initialSettings };
    return DemoConfigService.sanitizeSettings(combined);
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

  // Update settings with validation and persistence
  const updateSettings = useCallback((partial: Partial<ChessboardSettings>) => {
    clearError();
    setIsLoading(true);

    try {
      const newSettings = { ...settings, ...partial };
      
      // Validate the new settings
      const errors = DemoConfigService.validateCompleteSettings(newSettings);
      if (errors.length > 0) {
        handleError(errors[0]); // Report first error
        return;
      }

      // Sanitize to ensure all values are valid
      const sanitizedSettings = DemoConfigService.sanitizeSettings(newSettings);
      
      // Update state
      setSettingsState(sanitizedSettings);
      
      // Persist to storage if enabled
      if (persistToStorage) {
        saveStoredSettings(sanitizedSettings);
      }
      
      // Notify callback
      onSettingsChange?.(sanitizedSettings);
      
    } catch (error) {
      handleError(createDemoError(
        'settings_error', 
        `Failed to update settings: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { partial, error }
      ));
    } finally {
      setIsLoading(false);
    }
  }, [settings, persistToStorage, onSettingsChange, clearError, handleError]);

  // Individual setting updaters with validation
  const updateTheme = useCallback((theme: BoardTheme) => {
    if (!DemoConfigService.validateTheme(theme)) {
      handleError(createDemoError('settings_error', `Invalid theme: ${theme}`, { theme }));
      return;
    }
    updateSettings({ theme });
  }, [updateSettings, handleError]);

  const updatePieceSet = useCallback((pieceSet: PieceSet) => {
    if (!DemoConfigService.validatePieceSet(pieceSet)) {
      handleError(createDemoError('settings_error', `Invalid piece set: ${pieceSet}`, { pieceSet }));
      return;
    }
    updateSettings({ pieceSet });
  }, [updateSettings, handleError]);

  const toggleCoordinates = useCallback(() => {
    updateSettings({ showCoordinates: !settings.showCoordinates });
  }, [settings.showCoordinates, updateSettings]);

  const toggleAnimations = useCallback(() => {
    updateSettings({ animationsEnabled: !settings.animationsEnabled });
  }, [settings.animationsEnabled, updateSettings]);

  const toggleDragAndDrop = useCallback(() => {
    updateSettings({ allowDragAndDrop: !settings.allowDragAndDrop });
  }, [settings.allowDragAndDrop, updateSettings]);

  const updateAnimationDuration = useCallback((duration: number) => {
    if (!DemoConfigService.validateAnimationDuration(duration)) {
      handleError(createDemoError('settings_error', `Invalid animation duration: ${duration}`, { duration }));
      return;
    }
    updateSettings({ animationDuration: duration });
  }, [updateSettings, handleError]);

  const flipBoardOrientation = useCallback(() => {
    const newOrientation = settings.boardOrientation === 'white' ? 'black' : 'white';
    updateSettings({ boardOrientation: newOrientation });
  }, [settings.boardOrientation, updateSettings]);

  const resetToDefaults = useCallback(() => {
    clearError();
    setIsLoading(true);

    try {
      const defaultSettings = DemoConfigService.getDefaultSettings();
      setSettingsState(defaultSettings);
      
      if (persistToStorage) {
        saveStoredSettings(defaultSettings);
      }
      
      onSettingsChange?.(defaultSettings);
    } catch (error) {
      handleError(createDemoError(
        'settings_error',
        `Failed to reset settings: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { error }
      ));
    } finally {
      setIsLoading(false);
    }
  }, [persistToStorage, onSettingsChange, clearError, handleError]);

  // Memoized return value to prevent unnecessary re-renders
  return useMemo(() => ({
    settings,
    updateTheme,
    updatePieceSet,
    toggleCoordinates,
    toggleAnimations,
    toggleDragAndDrop,
    updateAnimationDuration,
    flipBoardOrientation,
    updateSettings,
    resetToDefaults,
    isLoading,
    error
  }), [
    settings,
    updateTheme,
    updatePieceSet,
    toggleCoordinates,
    toggleAnimations,
    toggleDragAndDrop,
    updateAnimationDuration,
    flipBoardOrientation,
    updateSettings,
    resetToDefaults,
    isLoading,
    error
  ]);
}