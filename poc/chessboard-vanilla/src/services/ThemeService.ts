// ThemeService.ts - Theme management service
import type { ThemeType, BoardMaterialType, ThemeConfig } from '../types/enhancement.types';
import { THEME_CONFIGS, BOARD_MATERIAL_CONFIGS, DEFAULT_THEME, DEFAULT_MATERIAL } from '../constants/themes.constants';

export class ThemeService {
  private static loadedThemes = new Set<string>();
  private static currentTheme: ThemeType = DEFAULT_THEME;
  private static currentMaterial: BoardMaterialType = DEFAULT_MATERIAL;

  /**
   * Load a theme CSS file dynamically
   */
  static async loadTheme(theme: ThemeType): Promise<void> {
    if (this.loadedThemes.has(theme)) {
      return;
    }

    try {
      // Use explicit imports for better Vite compatibility
      switch (theme) {
        case 'classic':
          await import('../styles/themes/classic.css');
          break;
        case 'modern':
          await import('../styles/themes/modern.css');
          break;
        case 'tournament':
          await import('../styles/themes/tournament.css');
          break;
        case 'executive':
          await import('../styles/themes/executive.css');
          break;
        case 'conqueror':
          await import('../styles/themes/conqueror.css');
          break;
        case 'elegant':
          await import('../styles/themes/elegant.css');
          break;
        case 'minimal':
          await import('../styles/themes/minimal.css');
          break;
        default:
          await import('../styles/themes/classic.css');
      }
      this.loadedThemes.add(theme);
    } catch (error) {
      console.warn(`Failed to load theme: ${theme}`, error);
      // Fallback to default theme if loading fails
      if (theme !== DEFAULT_THEME) {
        await this.loadTheme(DEFAULT_THEME);
      }
    }
  }

  /**
   * Apply a theme to the document
   */
  static async applyTheme(theme: ThemeType, material?: BoardMaterialType): Promise<void> {
    // Load the theme first
    await this.loadTheme(theme);
    
    const themeConfig = THEME_CONFIGS[theme];
    const materialConfig = material ? BOARD_MATERIAL_CONFIGS[material] : {};
    
    // Apply theme variables to root element
    const root = document.documentElement;
    
    // Set theme data attribute
    root.setAttribute('data-theme', theme);
    
    if (material) {
      root.setAttribute('data-material', material);
    }
    
    // Apply CSS custom properties
    Object.entries(themeConfig.variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Apply material overrides
    Object.entries(materialConfig).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    this.currentTheme = theme;
    if (material) {
      this.currentMaterial = material;
    }
  }

  /**
   * Get the current theme
   */
  static getCurrentTheme(): ThemeType {
    return this.currentTheme;
  }

  /**
   * Get the current material
   */
  static getCurrentMaterial(): BoardMaterialType {
    return this.currentMaterial;
  }

  /**
   * Get theme configuration
   */
  static getThemeConfig(theme: ThemeType): ThemeConfig {
    return THEME_CONFIGS[theme];
  }

  /**
   * Check if a material is compatible with a theme
   */
  static isMaterialCompatible(theme: ThemeType, material: BoardMaterialType): boolean {
    const themeConfig = THEME_CONFIGS[theme];
    return themeConfig.materials ? themeConfig.materials.includes(material) : true;
  }

  /**
   * Get compatible materials for a theme
   */
  static getCompatibleMaterials(theme: ThemeType): BoardMaterialType[] {
    const themeConfig = THEME_CONFIGS[theme];
    return themeConfig.materials || ['wood', 'marble', 'glass', 'metal', 'fabric'];
  }

  /**
   * Reset to default theme
   */
  static async resetToDefault(): Promise<void> {
    await this.applyTheme(DEFAULT_THEME, DEFAULT_MATERIAL);
  }

  /**
   * Preload multiple themes for better performance
   */
  static async preloadThemes(themes: ThemeType[]): Promise<void> {
    const loadPromises = themes.map(theme => this.loadTheme(theme));
    await Promise.allSettled(loadPromises);
  }

  /**
   * Generate CSS variables for a specific theme and material combination
   */
  static generateCSSVariables(theme: ThemeType, material?: BoardMaterialType): Record<string, string> {
    const themeConfig = THEME_CONFIGS[theme];
    const materialConfig = material ? BOARD_MATERIAL_CONFIGS[material] : {};
    
    return {
      ...themeConfig.variables,
      ...materialConfig
    };
  }

  /**
   * Check if theme is currently loaded
   */
  static isThemeLoaded(theme: ThemeType): boolean {
    return this.loadedThemes.has(theme);
  }

  /**
   * Get all available themes
   */
  static getAvailableThemes(): ThemeType[] {
    return Object.keys(THEME_CONFIGS) as ThemeType[];
  }

  /**
   * Get all available materials
   */
  static getAvailableMaterials(): BoardMaterialType[] {
    return Object.keys(BOARD_MATERIAL_CONFIGS) as BoardMaterialType[];
  }
}