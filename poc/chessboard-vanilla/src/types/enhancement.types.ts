// enhancement.types.ts - Type definitions for chessboard enhancements
import type React from 'react';

export type ThemeType = 'classic' | 'modern' | 'tournament' | 'executive' | 'conqueror' | 'elegant' | 'minimal';
export type BoardMaterialType = 'wood' | 'marble' | 'glass' | 'metal' | 'fabric';
export type HighlightStyleType = 'subtle' | 'standard' | 'vivid' | 'minimal';
export type MoveAnimationType = 'none' | 'fast' | 'smooth' | 'adaptive';
export type FocusModeType = 'casual' | 'tournament' | 'analysis' | 'learning';
export type AudioProfileType = 'silent' | 'subtle' | 'standard' | 'rich';
export type CoordinateStyleType = 'corner' | 'edge' | 'overlay' | 'hidden';

export interface AnimationConfig {
  enabled?: boolean;
  duration?: number;
  easing?: string;
  type?: MoveAnimationType;
}

export interface HighlightConfig {
  style?: HighlightStyleType;
  showThreats?: boolean;
  showLastMove?: boolean;
  showPatterns?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export interface AccessibilityConfig {
  highContrast?: boolean;
  reducedMotion?: boolean;
  screenReaderEnabled?: boolean;
  keyboardNavigationEnabled?: boolean;
}

export interface ChessboardEnhancements {
  // Theme System
  theme?: ThemeType;
  boardMaterial?: BoardMaterialType;
  
  // Animation System
  animationConfig?: AnimationConfig;
  
  // Visual Feedback
  highlightStyle?: HighlightStyleType;
  highlightConfig?: HighlightConfig;
  moveAnimation?: MoveAnimationType;
  
  // Focus Modes
  focusMode?: FocusModeType;
  
  // Audio System
  audioProfile?: AudioProfileType;
  
  // Accessibility
  accessibilityConfig?: AccessibilityConfig;
  highContrast?: boolean;
  reducedMotion?: boolean;
  
  // Advanced Features
  showThreats?: boolean;
  showLastMove?: boolean;
  coordinateStyle?: CoordinateStyleType;
}

export interface ThemeConfig {
  name: string;
  cssFile: string;
  variables: Record<string, string>;
  materials?: BoardMaterialType[];
}


export interface FocusModeConfig {
  showCoordinates: boolean;
  showControls: boolean;
  allowCustomization: boolean;
  showAnalysisTools?: boolean;
  showHints?: boolean;
  showPatterns?: boolean;
  uiOpacity: number;
}

export interface AudioEventConfig {
  enabled: boolean;
  file: string;
  volume: number;
}

export interface AudioProfileConfig {
  move: AudioEventConfig;
  capture: AudioEventConfig;
  check: AudioEventConfig;
  checkmate: AudioEventConfig;
  castle: AudioEventConfig;
  promote: AudioEventConfig;
  gameStart: AudioEventConfig;
  gameEnd: AudioEventConfig;
}

export type HighlightType = 'selected' | 'valid-move' | 'capture' | 'check' | 'threat' | 'pattern' | 'last-move';

export interface HighlightData {
  type: HighlightType;
  intensity?: 'low' | 'medium' | 'high';
  style?: React.CSSProperties;
}


export type GameContext = 'casual' | 'bullet' | 'blitz' | 'rapid' | 'classical' | 'analysis';

export interface EnhancementContext {
  gameType: GameContext;
  playerSkillLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  preferredColorScheme: 'light' | 'dark' | 'auto';
}