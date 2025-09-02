/**
 * Demo Configuration Service
 * SRP: Handles demo settings validation, defaults, and sanitization
 * No React dependencies - pure business logic
 */

import type { 
  BoardTheme, 
  PieceSet, 
  ContainerSize, 
  ChessboardSettings, 
  ContainerConfig,
  DemoError 
} from '@/types/demo/freeplay.types';
import { 
  THEME_OPTIONS, 
  PIECE_SET_OPTIONS, 
  CONTAINER_SIZE_OPTIONS, 
  DEFAULT_CHESSBOARD_SETTINGS, 
  DEFAULT_CONTAINER_CONFIG,
  DEMO_LIMITS 
} from '@/constants/demo/chessboard-demo.constants';

/**
 * Demo Configuration Service
 * Validates and manages demo configuration settings
 */
export class DemoConfigService {
  /**
   * Validates if a theme is supported
   */
  static validateTheme(theme: string): theme is BoardTheme {
    return THEME_OPTIONS.some(option => option.value === theme);
  }

  /**
   * Validates if a piece set is supported
   */
  static validatePieceSet(pieceSet: string): pieceSet is PieceSet {
    return PIECE_SET_OPTIONS.some(option => option.value === pieceSet);
  }

  /**
   * Validates if a container size is supported
   */
  static validateContainerSize(size: string): size is ContainerSize {
    return CONTAINER_SIZE_OPTIONS.some(option => option.value === size);
  }

  /**
   * Validates animation duration is within acceptable range
   */
  static validateAnimationDuration(duration: number): boolean {
    return (
      typeof duration === 'number' &&
      duration >= DEMO_LIMITS.MIN_ANIMATION_DURATION &&
      duration <= DEMO_LIMITS.MAX_ANIMATION_DURATION
    );
  }

  /**
   * Validates board size is within acceptable range
   */
  static validateBoardSize(size: number): boolean {
    return (
      typeof size === 'number' &&
      size >= DEMO_LIMITS.MIN_BOARD_SIZE &&
      size <= DEMO_LIMITS.MAX_BOARD_SIZE
    );
  }

  /**
   * Gets default chessboard settings
   */
  static getDefaultSettings(): ChessboardSettings {
    return { ...DEFAULT_CHESSBOARD_SETTINGS };
  }

  /**
   * Gets default container configuration
   */
  static getDefaultContainerConfig(): ContainerConfig {
    return { ...DEFAULT_CONTAINER_CONFIG };
  }

  /**
   * Sanitizes chessboard settings to ensure all values are valid
   * Falls back to defaults for invalid values
   */
  static sanitizeSettings(settings: Partial<ChessboardSettings>): ChessboardSettings {
    const defaults = this.getDefaultSettings();
    
    return {
      theme: this.validateTheme(settings.theme || '') ? settings.theme! : defaults.theme,
      pieceSet: this.validatePieceSet(settings.pieceSet || '') ? settings.pieceSet! : defaults.pieceSet,
      showCoordinates: typeof settings.showCoordinates === 'boolean' ? settings.showCoordinates : defaults.showCoordinates,
      allowDragAndDrop: typeof settings.allowDragAndDrop === 'boolean' ? settings.allowDragAndDrop : defaults.allowDragAndDrop,
      animationsEnabled: typeof settings.animationsEnabled === 'boolean' ? settings.animationsEnabled : defaults.animationsEnabled,
      animationDuration: this.validateAnimationDuration(settings.animationDuration || 0) ? settings.animationDuration! : defaults.animationDuration,
      boardOrientation: (settings.boardOrientation === 'white' || settings.boardOrientation === 'black') ? settings.boardOrientation : defaults.boardOrientation
    };
  }

  /**
   * Sanitizes container configuration to ensure all values are valid
   * Falls back to defaults for invalid values
   */
  static sanitizeContainerConfig(config: Partial<ContainerConfig>): ContainerConfig {
    const defaults = this.getDefaultContainerConfig();
    
    // Get the size option for validation
    const sizeOption = CONTAINER_SIZE_OPTIONS.find(option => option.value === config.size);
    const validSize = sizeOption ? config.size! : defaults.size;
    const defaultSizeOption = CONTAINER_SIZE_OPTIONS.find(option => option.value === validSize)!;
    
    return {
      size: validSize,
      width: this.validateBoardSize(config.width || 0) ? config.width! : defaultSizeOption.width,
      height: this.validateBoardSize(config.height || 0) ? config.height! : defaultSizeOption.height,
      aspectRatio: typeof config.aspectRatio === 'number' && config.aspectRatio > 0 ? config.aspectRatio : defaults.aspectRatio,
      minSize: this.validateBoardSize(config.minSize || 0) ? config.minSize! : defaults.minSize,
      maxSize: this.validateBoardSize(config.maxSize || 0) ? config.maxSize! : defaults.maxSize
    };
  }

  /**
   * Creates a validation error
   */
  static createValidationError(message: string, context?: Record<string, any>): DemoError {
    return {
      type: 'settings_error',
      message,
      timestamp: Date.now(),
      context
    };
  }

  /**
   * Validates complete settings object and returns errors if any
   */
  static validateCompleteSettings(settings: ChessboardSettings): DemoError[] {
    const errors: DemoError[] = [];

    if (!this.validateTheme(settings.theme)) {
      errors.push(this.createValidationError(`Invalid theme: ${settings.theme}`, { theme: settings.theme }));
    }

    if (!this.validatePieceSet(settings.pieceSet)) {
      errors.push(this.createValidationError(`Invalid piece set: ${settings.pieceSet}`, { pieceSet: settings.pieceSet }));
    }

    if (!this.validateAnimationDuration(settings.animationDuration)) {
      errors.push(this.createValidationError(`Invalid animation duration: ${settings.animationDuration}`, { duration: settings.animationDuration }));
    }

    return errors;
  }

  /**
   * Validates complete container configuration and returns errors if any
   */
  static validateCompleteContainerConfig(config: ContainerConfig): DemoError[] {
    const errors: DemoError[] = [];

    if (!this.validateContainerSize(config.size)) {
      errors.push(this.createValidationError(`Invalid container size: ${config.size}`, { size: config.size }));
    }

    if (!this.validateBoardSize(config.width)) {
      errors.push(this.createValidationError(`Invalid width: ${config.width}`, { width: config.width }));
    }

    if (!this.validateBoardSize(config.height)) {
      errors.push(this.createValidationError(`Invalid height: ${config.height}`, { height: config.height }));
    }

    if (config.minSize >= config.maxSize) {
      errors.push(this.createValidationError('Min size must be less than max size', { minSize: config.minSize, maxSize: config.maxSize }));
    }

    return errors;
  }

  /**
   * Gets theme option by value
   */
  static getThemeOption(theme: BoardTheme) {
    return THEME_OPTIONS.find(option => option.value === theme);
  }

  /**
   * Gets piece set option by value
   */
  static getPieceSetOption(pieceSet: PieceSet) {
    return PIECE_SET_OPTIONS.find(option => option.value === pieceSet);
  }

  /**
   * Gets container size option by value
   */
  static getContainerSizeOption(size: ContainerSize) {
    return CONTAINER_SIZE_OPTIONS.find(option => option.value === size);
  }
}