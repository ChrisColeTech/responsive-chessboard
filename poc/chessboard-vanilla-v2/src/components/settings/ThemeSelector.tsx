/**
 * Dedicated ThemeSelector component with theme selection and pagination logic
 * Extracted from SettingsPanel for Single Responsibility Principle
 */

import { ChevronDown } from "lucide-react";
import { useTheme } from "../../stores/appStore";
import { useUIClickSound } from "../../hooks/useUIClickSound";
import { useThemePagination } from "../../hooks/useThemePagination";
import { type BaseTheme } from "../ThemeSwitcher";
import { SETTINGS_SECTIONS } from "../../data/themeConfig";

export function ThemeSelector() {
  const { isDarkMode, selectedBaseTheme, setBaseTheme } = useTheme();
  const { playUIClick } = useUIClickSound();
  const { visibleThemes, hasMoreThemes, handleLoadMoreThemes } = useThemePagination();

  const handleBaseThemeChange = (baseThemeId: BaseTheme) => {
    playUIClick(`Theme: ${baseThemeId}`);
    setBaseTheme(baseThemeId);
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
        <SETTINGS_SECTIONS.THEME.icon className="w-4 h-4" />
        {SETTINGS_SECTIONS.THEME.title}
      </h3>
      
      <div className="grid-settings">
        {visibleThemes.map((baseTheme) => {
          const isActive = selectedBaseTheme === baseTheme.id;
          const ThemeIcon = baseTheme.icon;
          const preview = isDarkMode
            ? baseTheme.darkPreview
            : baseTheme.lightPreview;

          return (
            <button
              key={baseTheme.id}
              onClick={() => handleBaseThemeChange(baseTheme.id)}
              className={`settings-theme-btn ${
                isActive ? "settings-theme-btn-active" : ""
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full border-2 ${preview} flex items-center justify-center`}
              >
                <ThemeIcon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="text-sm font-medium">
                  {baseTheme.name}
                </div>
                <div className="text-xs opacity-70 leading-tight mt-1">
                  {baseTheme.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Load More Button */}
      {hasMoreThemes && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMoreThemes}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-md transition-all duration-200 border border-border hover:border-primary/50"
          >
            <span>Load More</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}