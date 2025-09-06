import { Settings, X, Sun, Moon } from "lucide-react";
import { baseThemes, type BaseTheme } from "./ThemeSwitcher";
import { useTheme } from "../stores/appStore";
import { useUIClickSound } from "../hooks/useUIClickSound";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { isDarkMode, selectedBaseTheme, setBaseTheme, toggleMode } =
    useTheme();
  const { playUIClick } = useUIClickSound();

  const handleBaseThemeChange = (baseThemeId: BaseTheme) => {
    playUIClick(`Theme: ${baseThemeId}`);
    setBaseTheme(baseThemeId);
  };

  const handleModeToggle = () => {
    playUIClick("Theme Toggle");
    toggleMode();
  };

  const handleCloseClick = () => {
    playUIClick("Settings Close");
    onClose();
  };

  return (
    <div className="settings-panel">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="settings-header">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Settings</h2>
          </div>
          <button onClick={handleCloseClick} className="settings-close-btn">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Light/Dark Mode Toggle */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Brightness
            </h3>
            <div className="settings-toggle-container">
              <button
                onClick={handleModeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  !isDarkMode
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={handleModeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  isDarkMode
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Theme Section */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Theme
            </h3>
            <div className="grid-settings">
              {baseThemes.map((baseTheme) => {
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
          </div>

          {/* Future Settings Sections */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3">
              Other Settings
            </h3>
            <div className="text-sm text-muted-foreground">
              More settings will be added here...
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border settings-footer">
          <div className="text-xs text-muted-foreground text-center">
            Settings Panel - Theme & More
          </div>
        </div>
      </div>
    </div>
  );
}
