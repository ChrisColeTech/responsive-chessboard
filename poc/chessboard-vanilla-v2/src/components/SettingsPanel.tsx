import { Settings, X, Sun, Moon, Sparkles } from "lucide-react";
import { baseThemes, type BaseTheme } from "./ThemeSwitcher";
import { useTheme } from "../stores/appStore";
import { useUIClickSound } from "../hooks/useUIClickSound";
import { useBackgroundEffects } from "../hooks/useBackgroundEffects";
import { SegmentedControl, type SegmentedControlOption } from "./ui/SegmentedControl";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { isDarkMode, selectedBaseTheme, setBaseTheme, toggleMode } =
    useTheme();
  const { currentVariant, setVariant, availableEffects } = useBackgroundEffects();
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

  const handleBackgroundEffectsToggle = () => {
    playUIClick("Background Effects Toggle");
    if (currentVariant === 'off') {
      setVariant('gaming'); // Default to gaming when enabling
    } else {
      setVariant('off');
    }
  };

  const handleVariantChange = (variant: string) => {
    playUIClick(`Background Effect: ${variant}`);
    setVariant(variant as any);
  };

  // Create segmented control options from available effects (excluding 'off')
  const effectsOptions: SegmentedControlOption[] = availableEffects.map(effect => ({
    id: effect.id,
    label: effect.name,
    icon: effect.icon,
    description: effect.description
  }));

  const isEffectsEnabled = currentVariant !== 'off';
  
  // Get the currently selected effect for display
  const selectedEffect = availableEffects.find(effect => effect.id === currentVariant);
  
  // Chess master descriptions for each effect
  const chessDescriptions = {
    gaming: "Classic battle atmosphere with floating orbs and chess pieces.",
    minimal: "Clean geometric shapes for focused strategy.",
    particles: "Dynamic particles representing endless possibilities.", 
    abstract: "Mathematical symbols of chess mastery.",
    casino: "High-energy sparkles for tournament intensity."
  };
  
  const getChessDescription = (variant: string) => {
    return chessDescriptions[variant as keyof typeof chessDescriptions] || "Choose your battlefield aesthetic.";
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
          {/* Background Effects Toggle */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Background Effects
            </h3>
            <div className="settings-toggle-container">
              <button
                onClick={handleBackgroundEffectsToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  isEffectsEnabled
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Enabled</span>
              </button>
              <button
                onClick={handleBackgroundEffectsToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  !isEffectsEnabled
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <X className="w-4 h-4" />
                <span className="text-sm font-medium">Disabled</span>
              </button>
            </div>
            
            {/* Effect Type Selection - always show so users can choose their preference */}
            {effectsOptions.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-sm font-medium text-foreground">Effect Style</h4>
                  {selectedEffect && isEffectsEnabled && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <selectedEffect.icon className="w-3 h-3" />
                      <span>{selectedEffect.name}</span>
                    </div>
                  )}
                </div>
                <SegmentedControl
                  options={effectsOptions}
                  value={isEffectsEnabled ? currentVariant : 'gaming'} // Default preview when disabled
                  onChange={handleVariantChange}
                  className="w-full"
                  size="sm"
                  iconOnly={true}
                />
              </div>
            )}
            
            <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
              {isEffectsEnabled && selectedEffect 
                ? getChessDescription(currentVariant)
                : "Activate background effects to enhance your chess experience with immersive visual atmospheres."
              }
            </div>
          </div>

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
