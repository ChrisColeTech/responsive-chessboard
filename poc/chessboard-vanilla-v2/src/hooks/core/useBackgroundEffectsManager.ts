/**
 * Custom hook for background effects management logic
 * Extracted from SettingsPanel for Single Responsibility Principle
 */

import { useBackgroundEffects } from "./useBackgroundEffects";
import { useUIClickSound } from "../audio/useUIClickSound";
import type { SegmentedControlOption } from "../../components/ui/SegmentedControl";
import { DEFAULT_BACKGROUND_VARIANT } from "../../data/backgroundEffectsConfig";
import { getChessDescription } from "../../data/themeConfig";

export function useBackgroundEffectsManager() {
  const { currentVariant, setVariant, availableEffects } = useBackgroundEffects();
  const { playUIClick } = useUIClickSound();

  const handleBackgroundEffectsToggle = () => {
    playUIClick("Background Effects Toggle");
    if (currentVariant === 'off') {
      setVariant(DEFAULT_BACKGROUND_VARIANT);
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
  
  // Get chess-themed description for current variant
  const currentDescription = isEffectsEnabled && selectedEffect 
    ? getChessDescription(currentVariant)
    : "Activate background effects to enhance your chess experience with immersive visual atmospheres.";

  return {
    currentVariant,
    isEffectsEnabled,
    selectedEffect,
    effectsOptions,
    currentDescription,
    handleBackgroundEffectsToggle,
    handleVariantChange
  };
}