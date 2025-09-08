/**
 * Custom hook for theme pagination logic
 * Extracted from SettingsPanel for Single Responsibility Principle
 */

import { useState, useMemo } from "react";
import { useUIClickSound } from "../audio/useUIClickSound";
import { useTheme } from "../../stores/appStore";
import { THEME_PAGINATION_CONFIG } from "../../data/themeConfig";
import { baseThemes, type BaseThemeConfig } from "../../components/core/ThemeSwitcher";

export function useThemePagination() {
  const { playUIClick } = useUIClickSound();
  const { selectedBaseTheme } = useTheme();
  const [visibleThemeCount, setVisibleThemeCount] = useState<number>(
    THEME_PAGINATION_CONFIG.INITIAL_VISIBLE_COUNT
  );

  const handleLoadMoreThemes = () => {
    playUIClick("Load More Themes");
    setVisibleThemeCount(prev => prev + THEME_PAGINATION_CONFIG.THEMES_PER_LOAD);
  };

  // Reorder themes to put selected theme first
  const orderedThemes = useMemo(() => {
    const selectedTheme = baseThemes.find(theme => theme.id === selectedBaseTheme);
    const otherThemes = baseThemes.filter(theme => theme.id !== selectedBaseTheme);
    
    return selectedTheme ? [selectedTheme, ...otherThemes] : baseThemes;
  }, [selectedBaseTheme]);

  // Get visible themes based on current count from reordered list
  const visibleThemes: BaseThemeConfig[] = orderedThemes.slice(0, visibleThemeCount);
  const hasMoreThemes = visibleThemeCount < orderedThemes.length;

  return {
    visibleThemes,
    hasMoreThemes,
    handleLoadMoreThemes,
    visibleThemeCount
  };
}