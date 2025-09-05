// useFocusMode.ts - Focus mode state management hook
import { useState, useCallback, useEffect, useMemo } from 'react';
import type { FocusModeType, FocusModeConfig } from '../types/enhancement.types';
import { 
  FOCUS_MODE_CONFIGS,
  FOCUS_MODE_UI_SETTINGS,
  FOCUS_MODE_ANIMATION_PREFERENCES,
  FOCUS_MODE_AUDIO_PREFERENCES,
  FOCUS_MODE_THEME_PREFERENCES,
  DEFAULT_FOCUS_MODE 
} from '../constants/focus-modes.constants';

interface UseFocusModeOptions {
  onModeChange?: (mode: FocusModeType, config: FocusModeConfig) => void;
  allowModeChange?: boolean;
  persistMode?: boolean;
  storageKey?: string;
}

interface UseFocusModeReturn {
  focusMode: FocusModeType;
  currentMode: FocusModeType;
  config: FocusModeConfig;
  modeConfig: FocusModeConfig;
  uiSettings: typeof FOCUS_MODE_UI_SETTINGS[FocusModeType];
  animationPreferences: typeof FOCUS_MODE_ANIMATION_PREFERENCES[FocusModeType];
  audioPreferences: typeof FOCUS_MODE_AUDIO_PREFERENCES[FocusModeType];
  themePreferences: typeof FOCUS_MODE_THEME_PREFERENCES[FocusModeType];
  availableModes: FocusModeType[];
  setFocusMode: (mode: FocusModeType) => void;
  setMode: (mode: FocusModeType) => void;
  resetToDefault: () => void;
  cssVariables: Record<string, string>;
  cssClasses: string[];
  canChangeFocusMode: boolean;
  isMinimalMode: boolean;
  isInFocusMode: boolean;
  shouldShowUI: (element: string) => boolean;
}

const STORAGE_KEY_DEFAULT = 'chessboard-focus-mode';

export const useFocusMode = (
  initialMode: FocusModeType = DEFAULT_FOCUS_MODE,
  options: UseFocusModeOptions = {}
): UseFocusModeReturn => {
  const {
    onModeChange,
    allowModeChange = true,
    persistMode = false,
    storageKey = STORAGE_KEY_DEFAULT
  } = options;

  // Load initial mode from storage if persistence is enabled
  const getInitialMode = useCallback((): FocusModeType => {
    if (persistMode && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored && Object.keys(FOCUS_MODE_CONFIGS).includes(stored)) {
          return stored as FocusModeType;
        }
      } catch (error) {
        console.warn('Failed to load focus mode from storage:', error);
      }
    }
    return initialMode;
  }, [initialMode, persistMode, storageKey]);

  const [focusMode, setFocusModeState] = useState<FocusModeType>(getInitialMode);

  // Memoized configurations
  const config = useMemo(() => FOCUS_MODE_CONFIGS[focusMode], [focusMode]);
  const uiSettings = useMemo(() => FOCUS_MODE_UI_SETTINGS[focusMode], [focusMode]);
  const animationPreferences = useMemo(() => FOCUS_MODE_ANIMATION_PREFERENCES[focusMode], [focusMode]);
  const audioPreferences = useMemo(() => FOCUS_MODE_AUDIO_PREFERENCES[focusMode], [focusMode]);
  const themePreferences = useMemo(() => FOCUS_MODE_THEME_PREFERENCES[focusMode], [focusMode]);

  // Available modes
  const availableModes = useMemo(() => 
    Object.keys(FOCUS_MODE_CONFIGS) as FocusModeType[], 
    []
  );

  // Check if user can change focus mode
  const canChangeFocusMode = useMemo(() => 
    allowModeChange && config.allowCustomization, 
    [allowModeChange, config.allowCustomization]
  );

  // Check if current mode is minimal (tournament)
  const isMinimalMode = useMemo(() => 
    focusMode === 'tournament', 
    [focusMode]
  );

  // Check if currently in a focused mode (not casual)
  const isInFocusMode = useMemo(() => 
    focusMode !== 'casual', 
    [focusMode]
  );

  // Generate CSS variables
  const cssVariables = useMemo(() => ({
    '--focus-ui-opacity': config.uiOpacity.toString(),
    '--focus-coordinate-visibility': config.showCoordinates ? 'visible' : 'hidden',
    '--focus-control-display': config.showControls ? 'flex' : 'none',
    '--focus-customization-enabled': config.allowCustomization ? '1' : '0',
    
    // UI settings
    '--focus-board-border': uiSettings.showBoardBorder ? '1' : '0',
    '--focus-piece-hover': uiSettings.showPieceHover ? '1' : '0',
    '--focus-valid-moves': uiSettings.showValidMoves ? '1' : '0',
    '--focus-last-move': uiSettings.showLastMove ? '1' : '0',
    '--focus-threats': uiSettings.showThreats ? '1' : '0',
    '--focus-coordinate-position': uiSettings.coordinatePosition,
    
    // Animation preferences
    '--focus-animations': animationPreferences.allowAnimations ? '1' : '0',
    '--focus-reduced-motion': animationPreferences.reducedMotion ? '1' : '0',
    
    // Audio preferences
    '--focus-audio': audioPreferences.allowAudio ? '1' : '0'
  }), [config, uiSettings, animationPreferences, audioPreferences]);

  // Generate CSS classes
  const cssClasses = useMemo(() => {
    const classes = [
      'focus-mode-wrapper',
      `focus-mode-${focusMode}`
    ];

    if (isMinimalMode) {
      classes.push('focus-minimal');
    }

    if (config.showAnalysisTools) {
      classes.push('focus-analysis-tools');
    }

    if (config.showHints) {
      classes.push('focus-hints');
    }

    if (config.showPatterns) {
      classes.push('focus-patterns');
    }

    return classes;
  }, [focusMode, isMinimalMode, config]);

  // Function to check if specific UI elements should be shown
  const shouldShowUI = useCallback((element: string): boolean => {
    switch (element) {
      case 'coordinates':
        return config.showCoordinates;
      case 'controls':
        return config.showControls;
      case 'customization':
        return config.allowCustomization;
      case 'analysisTools':
        return config.showAnalysisTools || false;
      case 'hints':
        return config.showHints || false;
      case 'patterns':
        return config.showPatterns || false;
      case 'boardBorder':
        return uiSettings.showBoardBorder;
      case 'pieceHover':
        return uiSettings.showPieceHover;
      case 'validMoves':
        return uiSettings.showValidMoves;
      case 'lastMove':
        return uiSettings.showLastMove;
      case 'threats':
        return uiSettings.showThreats;
      default:
        return true;
    }
  }, [config, uiSettings]);

  // Set focus mode with validation and persistence
  const setFocusMode = useCallback((mode: FocusModeType) => {
    if (!availableModes.includes(mode)) {
      console.warn(`Invalid focus mode: ${mode}`);
      return;
    }

    if (!canChangeFocusMode) {
      console.warn('Focus mode changes are not allowed in current configuration');
      return;
    }

    setFocusModeState(mode);

    // Persist to storage if enabled
    if (persistMode && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, mode);
      } catch (error) {
        console.warn('Failed to persist focus mode to storage:', error);
      }
    }

    // Call change handler
    const newConfig = FOCUS_MODE_CONFIGS[mode];
    onModeChange?.(mode, newConfig);
  }, [availableModes, canChangeFocusMode, persistMode, storageKey, onModeChange]);

  // Reset to default mode
  const resetToDefault = useCallback(() => {
    setFocusMode(DEFAULT_FOCUS_MODE);
  }, [setFocusMode]);

  // Update focus mode when initial mode changes
  useEffect(() => {
    if (initialMode !== focusMode && canChangeFocusMode) {
      setFocusMode(initialMode);
    }
  }, [initialMode, focusMode, canChangeFocusMode, setFocusMode]);

  // Apply CSS variables to document root
  useEffect(() => {
    const root = document.documentElement;
    
    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Set data attribute for CSS targeting
    root.setAttribute('data-focus-mode', focusMode);

    return () => {
      // Cleanup on unmount
      Object.keys(cssVariables).forEach(property => {
        root.style.removeProperty(property);
      });
      root.removeAttribute('data-focus-mode');
    };
  }, [cssVariables, focusMode]);

  // Handle keyboard shortcuts for focus mode switching
  useEffect(() => {
    if (!canChangeFocusMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + F to cycle through focus modes
      if (event.altKey && event.key === 'f') {
        event.preventDefault();
        const currentIndex = availableModes.indexOf(focusMode);
        const nextIndex = (currentIndex + 1) % availableModes.length;
        setFocusMode(availableModes[nextIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canChangeFocusMode, availableModes, focusMode, setFocusMode]);

  return {
    focusMode,
    currentMode: focusMode,
    config,
    modeConfig: config,
    uiSettings,
    animationPreferences,
    audioPreferences,
    themePreferences,
    availableModes,
    setFocusMode,
    setMode: setFocusMode,
    resetToDefault,
    cssVariables,
    cssClasses,
    canChangeFocusMode,
    isMinimalMode,
    isInFocusMode,
    shouldShowUI
  };
};