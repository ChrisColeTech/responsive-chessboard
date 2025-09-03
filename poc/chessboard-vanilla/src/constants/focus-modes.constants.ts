// focus-modes.constants.ts - Focus mode configuration constants
import type { FocusModeType, FocusModeConfig } from '../types/enhancement.types';

export const FOCUS_MODE_CONFIGS: Record<FocusModeType, FocusModeConfig> = {
  casual: {
    showCoordinates: true,
    showControls: true,
    allowCustomization: true,
    uiOpacity: 1.0
  },
  
  tournament: {
    showCoordinates: false,
    showControls: false,
    allowCustomization: false,
    uiOpacity: 0.3
  },
  
  analysis: {
    showCoordinates: true,
    showControls: true,
    allowCustomization: true,
    showAnalysisTools: true,
    uiOpacity: 1.0
  },
  
  learning: {
    showCoordinates: true,
    showControls: true,
    allowCustomization: true,
    showHints: true,
    showPatterns: true,
    uiOpacity: 1.0
  }
};

export const DEFAULT_FOCUS_MODE: FocusModeType = 'casual';

export const FOCUS_MODE_DISPLAY_NAMES: Record<FocusModeType, string> = {
  casual: 'Casual Play',
  tournament: 'Tournament Focus',
  analysis: 'Analysis Mode',
  learning: 'Learning Mode'
};

export const FOCUS_MODE_DESCRIPTIONS: Record<FocusModeType, string> = {
  casual: 'Relaxed play with all visual aids and customization options available',
  tournament: 'Minimal UI for serious competitive play with reduced distractions',
  analysis: 'Enhanced tools for game analysis with pattern recognition and evaluation',
  learning: 'Educational mode with hints, patterns, and interactive learning features'
};

// CSS classes that get applied for each focus mode
export const FOCUS_MODE_CSS_CLASSES: Record<FocusModeType, string[]> = {
  casual: ['focus-casual'],
  tournament: ['focus-tournament', 'minimal-ui'],
  analysis: ['focus-analysis', 'enhanced-tools'],
  learning: ['focus-learning', 'educational-aids']
};

// Animation preferences for each focus mode
export const FOCUS_MODE_ANIMATION_PREFERENCES: Record<FocusModeType, {
  preferredAnimation: string;
  allowAnimations: boolean;
  reducedMotion: boolean;
}> = {
  casual: {
    preferredAnimation: 'smooth',
    allowAnimations: true,
    reducedMotion: false
  },
  
  tournament: {
    preferredAnimation: 'fast',
    allowAnimations: false,
    reducedMotion: true
  },
  
  analysis: {
    preferredAnimation: 'smooth',
    allowAnimations: true,
    reducedMotion: false
  },
  
  learning: {
    preferredAnimation: 'smooth',
    allowAnimations: true,
    reducedMotion: false
  }
};

// Audio preferences for each focus mode
export const FOCUS_MODE_AUDIO_PREFERENCES: Record<FocusModeType, {
  preferredProfile: string;
  allowAudio: boolean;
}> = {
  casual: {
    preferredProfile: 'standard',
    allowAudio: true
  },
  
  tournament: {
    preferredProfile: 'silent',
    allowAudio: false
  },
  
  analysis: {
    preferredProfile: 'subtle',
    allowAudio: true
  },
  
  learning: {
    preferredProfile: 'rich',
    allowAudio: true
  }
};

// Theme preferences for each focus mode
export const FOCUS_MODE_THEME_PREFERENCES: Record<FocusModeType, {
  preferredThemes: string[];
  allowThemeSelection: boolean;
}> = {
  casual: {
    preferredThemes: ['classic', 'modern', 'elegant'],
    allowThemeSelection: true
  },
  
  tournament: {
    preferredThemes: ['tournament', 'minimal'],
    allowThemeSelection: false
  },
  
  analysis: {
    preferredThemes: ['modern', 'elegant', 'minimal'],
    allowThemeSelection: true
  },
  
  learning: {
    preferredThemes: ['classic', 'modern', 'elegant'],
    allowThemeSelection: true
  }
};

// UI visibility settings for each focus mode
export const FOCUS_MODE_UI_SETTINGS: Record<FocusModeType, {
  showBoardBorder: boolean;
  showPieceHover: boolean;
  showValidMoves: boolean;
  showLastMove: boolean;
  showThreats: boolean;
  coordinatePosition: 'corner' | 'edge' | 'overlay' | 'hidden';
}> = {
  casual: {
    showBoardBorder: true,
    showPieceHover: true,
    showValidMoves: true,
    showLastMove: true,
    showThreats: false,
    coordinatePosition: 'corner'
  },
  
  tournament: {
    showBoardBorder: true,
    showPieceHover: false,
    showValidMoves: true,
    showLastMove: false,
    showThreats: false,
    coordinatePosition: 'hidden'
  },
  
  analysis: {
    showBoardBorder: true,
    showPieceHover: true,
    showValidMoves: true,
    showLastMove: true,
    showThreats: true,
    coordinatePosition: 'edge'
  },
  
  learning: {
    showBoardBorder: true,
    showPieceHover: true,
    showValidMoves: true,
    showLastMove: true,
    showThreats: true,
    coordinatePosition: 'overlay'
  }
};