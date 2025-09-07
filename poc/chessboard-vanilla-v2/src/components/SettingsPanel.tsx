import { Settings, X, Volume2, VolumeX } from "lucide-react";
import { useTheme, useAppStore } from "../stores/appStore";
import { useUIClickSound } from "../hooks/useUIClickSound";
import { BackgroundEffectsSelector } from "./settings/BackgroundEffectsSelector";
import { ThemeSelector } from "./settings/ThemeSelector";
import { SETTINGS_SECTIONS } from "../data/themeConfig";
import { useGlobalUIAudio } from "../hooks/useGlobalUIAudio";
import { useChessAudio } from "../services/audioService";
import { useCallback, useEffect } from "react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { isDarkMode, toggleMode } = useTheme();
  const { playUIClick } = useUIClickSound();
  
  // Get audio state from store
  const audioEnabled = useAppStore((state) => state.audioEnabled);
  const setAudioEnabled = useAppStore((state) => state.setAudioEnabled);
  
  // Get chess audio service methods
  const { setEnabled: setChessAudioEnabled } = useChessAudio();
  
  // Initialize global UI audio with store state
  const { configure } = useGlobalUIAudio({
    autoInitialize: true,
    initialConfig: {
      enabled: audioEnabled,
      autoDetection: audioEnabled
    }
  });
  
  // Sync both audio systems with store state
  useEffect(() => {
    // Update global UI audio service
    configure({
      enabled: audioEnabled,
      autoDetection: audioEnabled
    });
    
    // Update chess audio service
    setChessAudioEnabled(audioEnabled);
  }, [audioEnabled, configure, setChessAudioEnabled]);

  const handleModeToggle = () => {
    // Note: UI click sound is handled automatically by Global UI Audio System
    toggleMode();
  };

  const handleCloseClick = () => {
    // Note: UI click sound is handled automatically by Global UI Audio System
    onClose();
  };

  const handleAudioToggle = useCallback(() => {
    const newAudioState = !audioEnabled;
    
    // Update store (which will trigger useEffect to sync with global service)
    setAudioEnabled(newAudioState);
    
    // Note: UI click sound is handled automatically by Global UI Audio System
  }, [audioEnabled, setAudioEnabled, playUIClick]);

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
          {/* Audio Toggle */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              {audioEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
              Sound Effects
            </h3>
            <div className="settings-toggle-container">
              <button
                onClick={handleAudioToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  audioEnabled
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span className="text-sm font-medium">On</span>
              </button>
              <button
                onClick={handleAudioToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  !audioEnabled
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <VolumeX className="w-4 h-4" />
                <span className="text-sm font-medium">Off</span>
              </button>
            </div>
          </div>

          {/* Background Effects */}
          <BackgroundEffectsSelector />

          {/* Light/Dark Mode Toggle */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <SETTINGS_SECTIONS.BRIGHTNESS.icon className="w-4 h-4" />
              {SETTINGS_SECTIONS.BRIGHTNESS.title}
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
                <SETTINGS_SECTIONS.BRIGHTNESS.modes.light.icon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {SETTINGS_SECTIONS.BRIGHTNESS.modes.light.label}
                </span>
              </button>
              <button
                onClick={handleModeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  isDarkMode
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <SETTINGS_SECTIONS.BRIGHTNESS.modes.dark.icon className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {SETTINGS_SECTIONS.BRIGHTNESS.modes.dark.label}
                </span>
              </button>
            </div>
          </div>

          {/* Theme Selector */}
          <ThemeSelector />
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
