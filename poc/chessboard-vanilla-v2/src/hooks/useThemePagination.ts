/**
 * Custom hook for theme pagination logic
 * Extracted from SettingsPanel for Single Responsibility Principle
 */

import { useState } from "react";
import { useUIClickSound } from "./useUIClickSound";
import { THEME_PAGINATION_CONFIG } from "../data/themeConfig";
import { baseThemes, type BaseThemeConfig } from "../components/ThemeSwitcher";

export function useThemePagination() {
  const { playUIClick } = useUIClickSound();
  const [visibleThemeCount, setVisibleThemeCount] = useState<number>(
    THEME_PAGINATION_CONFIG.INITIAL_VISIBLE_COUNT
  );

  const handleLoadMoreThemes = () => {
    playUIClick("Load More Themes");
    setVisibleThemeCount(prev => prev + THEME_PAGINATION_CONFIG.THEMES_PER_LOAD);
  };

  // Get visible themes based on current count
  const visibleThemes: BaseThemeConfig[] = baseThemes.slice(0, visibleThemeCount);
  const hasMoreThemes = visibleThemeCount < baseThemes.length;

  return {
    visibleThemes,
    hasMoreThemes,
    handleLoadMoreThemes,
    visibleThemeCount
  };
}