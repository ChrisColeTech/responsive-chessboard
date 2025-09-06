/**
 * Dedicated BackgroundEffectsSelector component with effects management logic
 * Extracted from SettingsPanel for Single Responsibility Principle
 */

import { Sparkles } from "lucide-react";
import { useBackgroundEffectsManager } from "../../hooks/useBackgroundEffectsManager";
import { SegmentedControl } from "../ui/SegmentedControl";
import { BACKGROUND_EFFECTS_TOGGLE_BUTTONS } from "../../data/backgroundEffectsConfig";
import { SETTINGS_SECTIONS } from "../../data/themeConfig";

export function BackgroundEffectsSelector() {
  const {
    currentVariant,
    isEffectsEnabled,
    selectedEffect,
    effectsOptions,
    currentDescription,
    handleBackgroundEffectsToggle,
    handleVariantChange
  } = useBackgroundEffectsManager();

  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        {SETTINGS_SECTIONS.BACKGROUND_EFFECTS.title}
      </h3>
      
      {/* Effects Toggle */}
      <div className="settings-toggle-container">
        <button
          onClick={handleBackgroundEffectsToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
            isEffectsEnabled
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <BACKGROUND_EFFECTS_TOGGLE_BUTTONS.enabled.icon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {BACKGROUND_EFFECTS_TOGGLE_BUTTONS.enabled.label}
          </span>
        </button>
        
        <button
          onClick={handleBackgroundEffectsToggle}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
            !isEffectsEnabled
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          <BACKGROUND_EFFECTS_TOGGLE_BUTTONS.disabled.icon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {BACKGROUND_EFFECTS_TOGGLE_BUTTONS.disabled.label}
          </span>
        </button>
      </div>
      
      {/* Effect Style Selection */}
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
      
      {/* Description */}
      <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
        {currentDescription}
      </div>
    </div>
  );
}