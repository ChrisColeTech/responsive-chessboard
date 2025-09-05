// FocusMode.tsx - Focus mode wrapper component
import React, { useMemo } from 'react';
import type { FocusModeType } from '../../types/enhancement.types';
import { 
  FOCUS_MODE_CONFIGS,
  FOCUS_MODE_CSS_CLASSES,
  FOCUS_MODE_UI_SETTINGS,
  FOCUS_MODE_ANIMATION_PREFERENCES,
  FOCUS_MODE_AUDIO_PREFERENCES 
} from '../../constants/focus-modes.constants';

interface FocusModeProps {
  focusMode: FocusModeType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onModeChange?: (mode: FocusModeType) => void;
}

export const FocusMode: React.FC<FocusModeProps> = ({
  focusMode,
  children,
  className = '',
  style = {}
}) => {
  // Get configuration for current focus mode
  const config = useMemo(() => FOCUS_MODE_CONFIGS[focusMode], [focusMode]);
  const cssClasses = useMemo(() => FOCUS_MODE_CSS_CLASSES[focusMode], [focusMode]);
  const uiSettings = useMemo(() => FOCUS_MODE_UI_SETTINGS[focusMode], [focusMode]);
  const animationPrefs = useMemo(() => FOCUS_MODE_ANIMATION_PREFERENCES[focusMode], [focusMode]);
  const audioPrefs = useMemo(() => FOCUS_MODE_AUDIO_PREFERENCES[focusMode], [focusMode]);

  // Generate CSS variables for focus mode
  const cssVariables = useMemo(() => ({
    '--ui-opacity': config.uiOpacity.toString(),
    '--coordinate-visibility': config.showCoordinates ? 'visible' : 'hidden',
    '--control-display': config.showControls ? 'flex' : 'none',
    '--customization-enabled': config.allowCustomization ? '1' : '0',
    
    // UI settings
    '--board-border-opacity': uiSettings.showBoardBorder ? '1' : '0',
    '--piece-hover-enabled': uiSettings.showPieceHover ? '1' : '0',
    '--valid-moves-display': uiSettings.showValidMoves ? 'block' : 'none',
    '--last-move-display': uiSettings.showLastMove ? 'block' : 'none',
    '--threats-display': uiSettings.showThreats ? 'block' : 'none',
    
    // Animation settings
    '--focus-animations-enabled': animationPrefs.allowAnimations ? '1' : '0',
    '--focus-reduced-motion': animationPrefs.reducedMotion ? '1' : '0',
    
    // Audio settings
    '--focus-audio-enabled': audioPrefs.allowAudio ? '1' : '0'
  }), [config, uiSettings, animationPrefs, audioPrefs]);

  // Combine all CSS classes
  const combinedClasses = useMemo(() => {
    const classes = [
      'focus-mode-wrapper',
      `focus-mode-${focusMode}`,
      ...cssClasses,
      className
    ].filter(Boolean);
    
    return classes.join(' ');
  }, [focusMode, cssClasses, className]);

  // Combined styles
  const combinedStyles = useMemo(() => ({
    ...cssVariables,
    ...style
  }), [cssVariables, style]);

  // Data attributes for CSS targeting
  const dataAttributes = useMemo(() => ({
    'data-focus-mode': focusMode,
    'data-show-coordinates': config.showCoordinates,
    'data-show-controls': config.showControls,
    'data-allow-customization': config.allowCustomization,
    'data-coordinate-position': uiSettings.coordinatePosition,
    'data-animations-enabled': animationPrefs.allowAnimations,
    'data-audio-enabled': audioPrefs.allowAudio
  }), [focusMode, config, uiSettings, animationPrefs, audioPrefs]);

  return (
    <div 
      className={combinedClasses}
      style={combinedStyles}
      {...dataAttributes}
    >
      {children}
      
      {/* Focus mode indicator for tournament mode */}
      {focusMode === 'tournament' && (
        <div className="focus-mode-indicator" aria-label="Tournament focus mode active">
          <div className="focus-indicator-dot"></div>
        </div>
      )}
      
      {/* Learning mode hints overlay */}
      {focusMode === 'learning' && config.showHints && (
        <div className="learning-hints-overlay" role="complementary">
          <div className="hint-text">Learning mode active - Watch for patterns and tactics</div>
        </div>
      )}
      
      {/* Analysis tools overlay */}
      {focusMode === 'analysis' && config.showAnalysisTools && (
        <div className="analysis-tools-overlay" role="toolbar" aria-label="Analysis tools">
          <div className="analysis-indicator">Analysis Mode</div>
        </div>
      )}
    </div>
  );
};

// Sub-component for focus mode controls (if needed)
interface FocusModeControlsProps {
  currentMode: FocusModeType;
  availableModes: FocusModeType[];
  onModeChange: (mode: FocusModeType) => void;
  disabled?: boolean;
}

export const FocusModeControls: React.FC<FocusModeControlsProps> = ({
  currentMode,
  availableModes,
  onModeChange,
  disabled = false
}) => {
  const currentConfig = FOCUS_MODE_CONFIGS[currentMode];
  
  // Don't show controls if current mode doesn't allow customization
  if (!currentConfig.allowCustomization || disabled) {
    return null;
  }

  return (
    <div className="focus-mode-controls" role="group" aria-label="Focus mode selection">
      {availableModes.map(mode => (
        <button
          key={mode}
          type="button"
          className={`focus-mode-btn ${currentMode === mode ? 'active' : ''}`}
          onClick={() => onModeChange(mode)}
          aria-pressed={currentMode === mode}
          title={`Switch to ${mode} mode`}
        >
          <span className="mode-name">{mode}</span>
        </button>
      ))}
    </div>
  );
};