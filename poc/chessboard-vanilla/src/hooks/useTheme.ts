// useTheme.ts - Theme management hook
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ThemeType, BoardMaterialType } from '../types/enhancement.types';
import { ThemeService } from '../services/ThemeService';
import { DEFAULT_THEME, DEFAULT_MATERIAL } from '../constants/themes.constants';

interface UseThemeOptions {
  preloadThemes?: ThemeType[];
  enableAutoDetection?: boolean;
  onThemeChange?: (theme: ThemeType, material?: BoardMaterialType) => void;
}

interface UseThemeReturn {
  currentTheme: ThemeType;
  currentMaterial: BoardMaterialType;
  isLoading: boolean;
  error: string | null;
  availableThemes: ThemeType[];
  availableMaterials: BoardMaterialType[];
  compatibleMaterials: BoardMaterialType[];
  applyTheme: (theme: ThemeType, material?: BoardMaterialType) => Promise<void>;
  setTheme: (theme: ThemeType) => Promise<void>;
  setMaterial: (material: BoardMaterialType) => void;
  preloadTheme: (theme: ThemeType) => Promise<void>;
  resetToDefault: () => Promise<void>;
  isThemeLoaded: (theme: ThemeType) => boolean;
  cssVariables: Record<string, string>;
}

export const useTheme = (
  initialTheme: ThemeType = DEFAULT_THEME,
  initialMaterial: BoardMaterialType = DEFAULT_MATERIAL,
  options: UseThemeOptions = {}
): UseThemeReturn => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(initialTheme);
  const [currentMaterial, setCurrentMaterial] = useState<BoardMaterialType>(initialMaterial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized values
  const availableThemes = useMemo(() => ThemeService.getAvailableThemes(), []);
  const availableMaterials = useMemo(() => ThemeService.getAvailableMaterials(), []);
  const compatibleMaterials = useMemo(() => 
    ThemeService.getCompatibleMaterials(currentTheme), 
    [currentTheme]
  );

  const cssVariables = useMemo(() => 
    ThemeService.generateCSSVariables(currentTheme, currentMaterial),
    [currentTheme, currentMaterial]
  );

  // Apply theme function
  const applyTheme = useCallback(async (theme: ThemeType, material?: BoardMaterialType) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate material compatibility
      if (material && !ThemeService.isMaterialCompatible(theme, material)) {
        throw new Error(`Material '${material}' is not compatible with theme '${theme}'`);
      }

      await ThemeService.applyTheme(theme, material);
      
      setCurrentTheme(theme);
      if (material) {
        setCurrentMaterial(material);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to apply theme';
      setError(errorMessage);
      console.error('Theme application failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Reset to default theme
  const resetToDefault = useCallback(async () => {
    await applyTheme(DEFAULT_THEME, DEFAULT_MATERIAL);
  }, [applyTheme]);

  // Check if theme is loaded
  const isThemeLoaded = useCallback((theme: ThemeType) => {
    return ThemeService.isThemeLoaded(theme);
  }, []);

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = async () => {
      setIsLoading(true);
      
      try {
        // Preload themes if specified
        if (options.preloadThemes && options.preloadThemes.length > 0) {
          await ThemeService.preloadThemes(options.preloadThemes);
        }

        // Apply initial theme
        await ThemeService.applyTheme(initialTheme, initialMaterial);
        
        setCurrentTheme(initialTheme);
        setCurrentMaterial(initialMaterial);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize theme';
        setError(errorMessage);
        console.error('Theme initialization failed:', err);
        
        // Fallback to default theme
        try {
          await ThemeService.resetToDefault();
          setCurrentTheme(DEFAULT_THEME);
          setCurrentMaterial(DEFAULT_MATERIAL);
        } catch (fallbackErr) {
          console.error('Failed to apply default theme:', fallbackErr);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, [initialTheme, initialMaterial, options.preloadThemes]);

  // Auto-detect preferred color scheme if enabled
  useEffect(() => {
    if (!options.enableAutoDetection) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const preferredTheme = e.matches ? 'modern' : 'classic';
      if (preferredTheme !== currentTheme) {
        applyTheme(preferredTheme, currentMaterial);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [options.enableAutoDetection, currentTheme, currentMaterial, applyTheme]);

  // Update theme when props change
  useEffect(() => {
    if (initialTheme !== currentTheme || initialMaterial !== currentMaterial) {
      applyTheme(initialTheme, initialMaterial);
    }
  }, [initialTheme, initialMaterial, currentTheme, currentMaterial, applyTheme]);

  // Convenience methods
  const setTheme = useCallback(async (theme: ThemeType) => {
    await applyTheme(theme, currentMaterial);
  }, [applyTheme, currentMaterial]);

  const setMaterial = useCallback((material: BoardMaterialType) => {
    setCurrentMaterial(material);
    options.onThemeChange?.(currentTheme, material);
  }, [currentTheme, options]);

  const preloadTheme = useCallback(async (theme: ThemeType) => {
    try {
      await ThemeService.loadTheme(theme);
    } catch (error) {
      console.warn(`Failed to preload theme: ${theme}`, error);
    }
  }, []);

  return {
    currentTheme,
    currentMaterial,
    isLoading,
    error,
    availableThemes,
    availableMaterials,
    compatibleMaterials,
    applyTheme,
    setTheme,
    setMaterial,
    preloadTheme,
    resetToDefault,
    isThemeLoaded,
    cssVariables
  };
};