// useCoordinates.ts - Coordinate display logic hook
import { useState, useCallback, useMemo, useEffect } from 'react';
import type { 
  CoordinateStyleType, 
  FocusModeType 
} from '../types/enhancement.types';
import type { ChessPosition, PieceColor } from '../types/chess.types';

interface UseCoordinatesOptions {
  skillLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  showHints?: boolean;
  adaptToContext?: boolean;
  onStyleChange?: (style: CoordinateStyleType) => void;
}

interface CoordinateConfig {
  style: CoordinateStyleType;
  showFiles: boolean;
  showRanks: boolean;
  showHints: boolean;
}

interface UseCoordinatesReturn {
  coordinateStyle: CoordinateStyleType;
  coordinateConfig: CoordinateConfig;
  coordinateElements: HTMLElement[] | null;
  showFiles: boolean;
  showRanks: boolean;
  showHints: boolean;
  availableStyles: CoordinateStyleType[];
  setCoordinateStyle: (style: CoordinateStyleType) => void;
  updateConfig: (config: Partial<CoordinateConfig>) => void;
  shouldShowCoordinateAt: (position: ChessPosition, orientation: PieceColor) => boolean;
  shouldShowFileAt: (position: ChessPosition, orientation: PieceColor) => boolean;
  shouldShowRankAt: (position: ChessPosition, orientation: PieceColor) => boolean;
  getCoordinateClasses: (position: ChessPosition, orientation: PieceColor) => string[];
  getCoordinateVisibility: (focusMode: FocusModeType) => {
    visible: boolean;
    opacity: number;
    position: 'static' | 'overlay';
  };
  cssVariables: Record<string, string>;
  formatCoordinate: (position: ChessPosition, format?: 'standard' | 'friendly' | 'phonetic') => string;
}

export const useCoordinates = (
  initialStyle: CoordinateStyleType = 'corner',
  initialFocusMode: FocusModeType = 'casual',
  options: UseCoordinatesOptions = {}
): UseCoordinatesReturn => {
  const {
    skillLevel = 'intermediate',
    showHints: initialShowHints = false,
    adaptToContext = true,
    onStyleChange
  } = options;

  const [coordinateStyle, setCoordinateStyleState] = useState<CoordinateStyleType>(initialStyle);
  const [showFiles, setShowFiles] = useState(true);
  const [showRanks, setShowRanks] = useState(true);
  const [showHints, setShowHints] = useState(initialShowHints);

  // Memoized coordinate config
  const coordinateConfig = useMemo((): CoordinateConfig => ({
    style: coordinateStyle,
    showFiles,
    showRanks,
    showHints
  }), [coordinateStyle, showFiles, showRanks, showHints]);

  // For now, coordinate elements will be null (would be populated when rendering)
  const coordinateElements = null;

  // Available coordinate styles
  const availableStyles = useMemo((): CoordinateStyleType[] => 
    ['corner', 'edge', 'overlay', 'hidden'], 
    []
  );

  // Update coordinate configuration
  const updateConfig = useCallback((config: Partial<CoordinateConfig>) => {
    if (config.style !== undefined) {
      setCoordinateStyleState(config.style);
    }
    if (config.showFiles !== undefined) {
      setShowFiles(config.showFiles);
    }
    if (config.showRanks !== undefined) {
      setShowRanks(config.showRanks);
    }
    if (config.showHints !== undefined) {
      setShowHints(config.showHints);
    }
  }, []);

  // Set coordinate style with validation
  const setCoordinateStyle = useCallback((style: CoordinateStyleType) => {
    if (!availableStyles.includes(style)) {
      console.warn(`Invalid coordinate style: ${style}`);
      return;
    }

    setCoordinateStyleState(style);
    onStyleChange?.(style);
  }, [availableStyles, onStyleChange]);

  // Determine if coordinates should be shown at a specific position
  const shouldShowCoordinateAt = useCallback((
    position: ChessPosition, 
    orientation: PieceColor
  ): boolean => {
    if (coordinateStyle === 'hidden') return false;

    const file = position.charAt(0);
    const rank = position.charAt(1);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankNumber = parseInt(rank);
    const isWhiteOrientation = orientation === 'white';

    switch (coordinateStyle) {
      case 'corner':
        // Show only on corner squares
        return isWhiteOrientation 
          ? (fileIndex === 0 && rankNumber === 1) 
          : (fileIndex === 7 && rankNumber === 8);
      
      case 'edge':
        // Show on edge squares
        return fileIndex === 0 || fileIndex === 7 || rankNumber === 1 || rankNumber === 8;
      
      case 'overlay':
        // Show on all squares but with different opacity
        return true;
      
      default:
        return false;
    }
  }, [coordinateStyle]);

  // Determine if file coordinate should be shown
  const shouldShowFileAt = useCallback((
    position: ChessPosition, 
    orientation: PieceColor
  ): boolean => {
    if (!showFiles || coordinateStyle === 'hidden') return false;

    const file = position.charAt(0);
    const rank = position.charAt(1);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankNumber = parseInt(rank);
    const isWhiteOrientation = orientation === 'white';

    switch (coordinateStyle) {
      case 'corner':
        return shouldShowCoordinateAt(position, orientation);
      
      case 'edge':
        // Show file on bottom edge (rank 1 for white, rank 8 for black)
        return rankNumber === (isWhiteOrientation ? 1 : 8);
      
      case 'overlay':
        // Show file on left and right edges
        return fileIndex === 0 || fileIndex === 7;
      
      default:
        return false;
    }
  }, [showFiles, coordinateStyle, shouldShowCoordinateAt]);

  // Determine if rank coordinate should be shown
  const shouldShowRankAt = useCallback((
    position: ChessPosition, 
    orientation: PieceColor
  ): boolean => {
    if (!showRanks || coordinateStyle === 'hidden') return false;

    const file = position.charAt(0);
    const rank = position.charAt(1);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankNumber = parseInt(rank);
    const isWhiteOrientation = orientation === 'white';

    switch (coordinateStyle) {
      case 'corner':
        return shouldShowCoordinateAt(position, orientation);
      
      case 'edge':
        // Show rank on left edge (file a for white, file h for black)
        return fileIndex === (isWhiteOrientation ? 0 : 7);
      
      case 'overlay':
        // Show rank on top and bottom edges
        return rankNumber === 1 || rankNumber === 8;
      
      default:
        return false;
    }
  }, [showRanks, coordinateStyle, shouldShowCoordinateAt]);

  // Generate CSS classes for coordinate display
  const getCoordinateClasses = useCallback((
    position: ChessPosition, 
    orientation: PieceColor
  ): string[] => {
    const classes = ['coordinate-display'];

    if (!shouldShowCoordinateAt(position, orientation)) {
      return classes;
    }

    const file = position.charAt(0);
    const rank = position.charAt(1);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankNumber = parseInt(rank);

    classes.push(`coordinate-${coordinateStyle}`);
    classes.push(`coordinate-${orientation}`);

    // Position-specific classes
    if (coordinateStyle === 'edge') {
      if (fileIndex === 0) classes.push('left-edge');
      if (fileIndex === 7) classes.push('right-edge');
      if (rankNumber === 1) classes.push('bottom-edge');
      if (rankNumber === 8) classes.push('top-edge');
    }

    // Skill level classes
    classes.push(`coordinate-skill-${skillLevel}`);

    return classes;
  }, [coordinateStyle, shouldShowCoordinateAt, skillLevel]);

  // Get coordinate visibility settings based on focus mode
  const getCoordinateVisibility = useCallback((focusMode: FocusModeType): {
    visible: boolean;
    opacity: number;
    position: 'static' | 'overlay';
  } => {
    switch (focusMode) {
      case 'tournament':
        return {
          visible: coordinateStyle !== 'hidden' && coordinateStyle === 'overlay',
          opacity: 0.3,
          position: 'overlay' as const
        };
      
      case 'analysis':
        return {
          visible: coordinateStyle !== 'hidden',
          opacity: 0.9,
          position: coordinateStyle === 'overlay' ? ('overlay' as const) : ('static' as const)
        };
      
      case 'learning':
        return {
          visible: coordinateStyle !== 'hidden',
          opacity: 1.0,
          position: coordinateStyle === 'overlay' ? ('overlay' as const) : ('static' as const)
        };
      
      case 'casual':
      default:
        return {
          visible: coordinateStyle !== 'hidden',
          opacity: 0.8,
          position: coordinateStyle === 'overlay' ? ('overlay' as const) : ('static' as const)
        };
    }
  }, [coordinateStyle]);

  // Generate CSS variables for coordinate styling
  const cssVariables = useMemo(() => {
    const visibility = getCoordinateVisibility(initialFocusMode);
    
    return {
      '--coordinate-visibility': visibility.visible ? 'visible' : 'hidden',
      '--coordinate-opacity': visibility.opacity.toString(),
      '--coordinate-position': visibility.position,
      '--coordinate-style': coordinateStyle,
      '--coordinate-files-display': showFiles ? 'block' : 'none',
      '--coordinate-ranks-display': showRanks ? 'block' : 'none',
      '--coordinate-hints-display': showHints ? 'block' : 'none',
      '--coordinate-skill-level': skillLevel
    };
  }, [coordinateStyle, showFiles, showRanks, showHints, skillLevel, getCoordinateVisibility, initialFocusMode]);

  // Format coordinate for different display purposes
  const formatCoordinate = useCallback((
    position: ChessPosition, 
    format: 'standard' | 'friendly' | 'phonetic' = 'standard'
  ): string => {
    const file = position.charAt(0);
    const rank = position.charAt(1);

    switch (format) {
      case 'friendly':
        const fileNames = {
          'a': 'Anna', 'b': 'Bob', 'c': 'Charlie', 'd': 'David',
          'e': 'Emma', 'f': 'Frank', 'g': 'George', 'h': 'Helen'
        };
        return `${fileNames[file as keyof typeof fileNames]} ${rank}`;
      
      case 'phonetic':
        const phoneticFiles = {
          'a': 'Alpha', 'b': 'Bravo', 'c': 'Charlie', 'd': 'Delta',
          'e': 'Echo', 'f': 'Foxtrot', 'g': 'Golf', 'h': 'Hotel'
        };
        return `${phoneticFiles[file as keyof typeof phoneticFiles]} ${rank}`;
      
      case 'standard':
      default:
        return `${file.toUpperCase()}${rank}`;
    }
  }, []);

  // Adapt coordinate style based on context
  useEffect(() => {
    if (!adaptToContext) return;

    // Adapt based on skill level
    if (skillLevel === 'beginner' && coordinateStyle === 'hidden') {
      setCoordinateStyleState('overlay');
      setShowHints(true);
    } else if (skillLevel === 'expert' && coordinateStyle === 'overlay') {
      setCoordinateStyleState('corner');
      setShowHints(false);
    }
  }, [skillLevel, coordinateStyle, adaptToContext]);

  // Update hints based on skill level
  useEffect(() => {
    if (adaptToContext) {
      const shouldShowHintsForSkill = skillLevel === 'beginner' || skillLevel === 'intermediate';
      setShowHints(shouldShowHintsForSkill);
    }
  }, [skillLevel, adaptToContext]);

  // Update coordinate style when initial style changes
  useEffect(() => {
    if (initialStyle !== coordinateStyle) {
      setCoordinateStyleState(initialStyle);
    }
  }, [initialStyle, coordinateStyle]);

  return {
    coordinateStyle,
    coordinateConfig,
    coordinateElements,
    showFiles,
    showRanks,
    showHints,
    availableStyles,
    setCoordinateStyle,
    updateConfig,
    shouldShowCoordinateAt,
    shouldShowFileAt,
    shouldShowRankAt,
    getCoordinateClasses,
    getCoordinateVisibility,
    cssVariables,
    formatCoordinate
  };
};