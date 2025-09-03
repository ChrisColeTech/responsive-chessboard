// useHighlight.ts - Highlight state management hook
import { useState, useCallback, useEffect, useMemo } from 'react';
import type { ChessGameState, ChessPosition } from '../types/chess.types';
import type { 
  HighlightType, 
  HighlightConfig, 
  HighlightStyleType,
  FocusModeType 
} from '../types/enhancement.types';
import { HighlightEngine, type HighlightMap, type HighlightData } from '../services/HighlightEngine';

interface UseHighlightOptions {
  updateInterval?: number;
  enableAutoUpdate?: boolean;
  onHighlightChange?: (highlights: HighlightMap) => void;
  maxHighlights?: number;
}

interface UseHighlightReturn {
  highlights: HighlightMap;
  highlightOverlays: HighlightMap;
  highlightStyle: HighlightStyleType;
  config: HighlightConfig;
  isUpdating: boolean;
  setHighlightStyle: (style: HighlightStyleType) => void;
  updateConfig: (newConfig: Partial<HighlightConfig>) => void;
  updateHighlights: (gameState: ChessGameState) => void;
  clearHighlights: () => void;
  addHighlight: (type: HighlightType, positions: ChessPosition[], metadata?: any) => void;
  removeHighlight: (type: HighlightType) => void;
  addCustomHighlight: (type: HighlightType, positions: ChessPosition[], metadata?: any) => void;
  removeCustomHighlight: (type: HighlightType) => void;
  hasHighlightAt: (position: ChessPosition) => boolean;
  getHighlightTypesAt: (position: ChessPosition) => HighlightType[];
  getHighlightIntensityAt: (position: ChessPosition) => 'low' | 'medium' | 'high' | null;
  cssVariables: Record<string, string>;
  highlightClasses: string[];
}

const DEFAULT_CONFIG: HighlightConfig = {
  showThreats: false,
  showPatterns: false,
  showLastMove: true,
  style: 'standard'
};

export const useHighlight = (
  gameState: ChessGameState | null,
  initialStyle: HighlightStyleType = 'standard',
  focusMode: FocusModeType = 'casual',
  options: UseHighlightOptions = {}
): UseHighlightReturn => {
  const {
    updateInterval = 500,
    enableAutoUpdate = true,
    onHighlightChange,
    maxHighlights = 50
  } = options;

  const [highlightStyle, setHighlightStyle] = useState<HighlightStyleType>(initialStyle);
  const [config, setConfig] = useState<HighlightConfig>({ ...DEFAULT_CONFIG, style: initialStyle });
  const [highlights, setHighlights] = useState<HighlightMap>(new Map());
  const [customHighlights, setCustomHighlights] = useState<HighlightMap>(new Map());
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<number>(0);

  // Update config when style changes
  const updateConfigCallback = useCallback((newConfig: Partial<HighlightConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  }, []);

  // Update config when style changes
  useEffect(() => {
    updateConfigCallback({ style: highlightStyle });
  }, [highlightStyle, updateConfigCallback]);

  // Combine engine highlights with custom highlights
  const combinedHighlights = useMemo((): HighlightMap => {
    const combined = new Map<HighlightType, HighlightData[]>();
    
    // Add engine highlights
    highlights.forEach((data, type) => {
      combined.set(type, [...data]);
    });
    
    // Add custom highlights
    customHighlights.forEach((data, type) => {
      const existing = combined.get(type) || [];
      combined.set(type, [...existing, ...data]);
    });
    
    // Filter by focus mode
    return HighlightEngine.filterHighlightsByFocus(combined, focusMode);
  }, [highlights, customHighlights, focusMode]);

  // Update highlights from game state
  const updateHighlights = useCallback((currentGameState: ChessGameState) => {
    if (!currentGameState || isUpdating) {
      return;
    }

    const now = Date.now();
    if (now - lastUpdate < updateInterval) {
      return;
    }

    setIsUpdating(true);
    
    try {
      const newHighlights = HighlightEngine.generateHighlights(currentGameState, config);
      
      // Limit total highlights for performance
      if (newHighlights.size > maxHighlights) {
        // Keep only highest priority highlights
        const sortedTypes = Array.from(newHighlights.keys()).sort(
          (a, b) => HighlightEngine.getHighlightPriority(b) - HighlightEngine.getHighlightPriority(a)
        );
        
        const limitedHighlights = new Map<HighlightType, HighlightData[]>();
        let count = 0;
        
        for (const type of sortedTypes) {
          const data = newHighlights.get(type)!;
          if (count + data.length <= maxHighlights) {
            limitedHighlights.set(type, data);
            count += data.length;
          } else {
            break;
          }
        }
        
        setHighlights(limitedHighlights);
      } else {
        setHighlights(newHighlights);
      }
      
      setLastUpdate(now);
      onHighlightChange?.(newHighlights);
    } catch (error) {
      console.error('Failed to update highlights:', error);
    } finally {
      setIsUpdating(false);
    }
  }, [config, isUpdating, lastUpdate, updateInterval, maxHighlights, onHighlightChange]);

  // Clear all highlights
  const clearHighlights = useCallback(() => {
    setHighlights(new Map());
    setCustomHighlights(new Map());
  }, []);

  // Add custom highlight
  const addCustomHighlight = useCallback((
    type: HighlightType, 
    positions: ChessPosition[], 
    metadata?: any
  ) => {
    const highlightData: HighlightData = {
      positions,
      type,
      intensity: 'medium',
      metadata
    };

    setCustomHighlights(prev => {
      const updated = new Map(prev);
      const existing = updated.get(type) || [];
      updated.set(type, [...existing, highlightData]);
      return updated;
    });
  }, []);

  // Remove custom highlight
  const removeCustomHighlight = useCallback((type: HighlightType) => {
    setCustomHighlights(prev => {
      const updated = new Map(prev);
      updated.delete(type);
      return updated;
    });
  }, []);

  // Check if position has any highlight
  const hasHighlightAt = useCallback((position: ChessPosition): boolean => {
    return Array.from(combinedHighlights.values()).some(dataArray =>
      dataArray.some(data => data.positions.includes(position))
    );
  }, [combinedHighlights]);

  // Get highlight types at position
  const getHighlightTypesAt = useCallback((position: ChessPosition): HighlightType[] => {
    const types: HighlightType[] = [];
    
    combinedHighlights.forEach((dataArray, type) => {
      if (dataArray.some(data => data.positions.includes(position))) {
        types.push(type);
      }
    });
    
    return types.sort((a, b) => 
      HighlightEngine.getHighlightPriority(b) - HighlightEngine.getHighlightPriority(a)
    );
  }, [combinedHighlights]);

  // Get highlight intensity at position
  const getHighlightIntensityAt = useCallback((
    position: ChessPosition
  ): 'low' | 'medium' | 'high' | null => {
    let maxIntensity: 'low' | 'medium' | 'high' | null = null;
    const intensityOrder = { low: 1, medium: 2, high: 3 };
    
    combinedHighlights.forEach(dataArray => {
      dataArray.forEach(data => {
        if (data.positions.includes(position)) {
          if (!maxIntensity || intensityOrder[data.intensity] > intensityOrder[maxIntensity]) {
            maxIntensity = data.intensity;
          }
        }
      });
    });
    
    return maxIntensity;
  }, [combinedHighlights]);

  // Generate CSS variables for highlighting
  const cssVariables = useMemo(() => ({
    '--highlight-style': highlightStyle,
    '--highlight-threats-enabled': config.showThreats ? '1' : '0',
    '--highlight-patterns-enabled': config.showPatterns ? '1' : '0',
    '--highlight-last-move-enabled': config.showLastMove ? '1' : '0',
    '--highlight-opacity-subtle': '0.3',
    '--highlight-opacity-standard': '0.5',
    '--highlight-opacity-vivid': '0.8',
    '--highlight-opacity-minimal': '0.2',
    '--highlight-animation-enabled': focusMode !== 'tournament' ? '1' : '0'
  }), [highlightStyle, config, focusMode]);

  // Generate CSS classes for highlighting
  const highlightClasses = useMemo(() => {
    const classes = ['highlight-engine'];
    
    classes.push(`highlight-style-${highlightStyle}`);
    classes.push(`highlight-focus-${focusMode}`);
    
    if (config.showThreats) classes.push('highlight-threats');
    if (config.showPatterns) classes.push('highlight-patterns');
    if (config.showLastMove) classes.push('highlight-last-move');
    
    if (isUpdating) classes.push('highlight-updating');
    
    return classes;
  }, [highlightStyle, focusMode, config, isUpdating]);

  // Auto-update highlights when game state changes
  useEffect(() => {
    if (!enableAutoUpdate || !gameState) {
      return;
    }

    const timeoutId = setTimeout(() => {
      updateHighlights(gameState);
    }, 100); // Small delay to batch updates

    return () => clearTimeout(timeoutId);
  }, [gameState, enableAutoUpdate, updateHighlights]);

  // Update highlights when config changes
  useEffect(() => {
    if (gameState) {
      updateHighlights(gameState);
    }
  }, [config, gameState, updateHighlights]);

  // Update style when initial style changes
  useEffect(() => {
    if (initialStyle !== highlightStyle) {
      setHighlightStyle(initialStyle);
    }
  }, [initialStyle, highlightStyle]);

  return {
    highlights: combinedHighlights,
    highlightOverlays: combinedHighlights,
    highlightStyle,
    config,
    isUpdating,
    setHighlightStyle,
    updateConfig: updateConfigCallback,
    updateHighlights,
    clearHighlights,
    addHighlight: addCustomHighlight,
    removeHighlight: removeCustomHighlight,
    addCustomHighlight,
    removeCustomHighlight,
    hasHighlightAt,
    getHighlightTypesAt,
    getHighlightIntensityAt,
    cssVariables,
    highlightClasses
  };
};