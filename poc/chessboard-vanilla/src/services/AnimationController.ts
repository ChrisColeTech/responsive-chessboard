// AnimationController.ts - Animation timing and context management service
import type { 
  AnimationConfig, 
  MoveAnimationType, 
  GameContext, 
  EnhancementContext 
} from '../types/enhancement.types';

export class AnimationController {
  private static animationConfigs: Record<MoveAnimationType, AnimationConfig> = {
    none: {
      duration: 0,
      easing: 'none',
      enabled: false
    },
    fast: {
      duration: 150,
      easing: 'ease-out',
      enabled: true
    },
    smooth: {
      duration: 300,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enabled: true
    },
    adaptive: {
      duration: 300, // Will be overridden by context
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enabled: true
    }
  };

  private static contextualConfigs: Record<GameContext, AnimationConfig> = {
    casual: {
      duration: 400,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      enabled: true
    },
    bullet: {
      duration: 0,
      easing: 'none',
      enabled: false
    },
    blitz: {
      duration: 100,
      easing: 'ease-out',
      enabled: true
    },
    rapid: {
      duration: 200,
      easing: 'ease-in-out',
      enabled: true
    },
    classical: {
      duration: 350,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enabled: true
    },
    analysis: {
      duration: 500,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      enabled: true
    }
  };

  /**
   * Get animation configuration based on type and context
   */
  static getAnimationConfig(
    type: MoveAnimationType, 
    context?: EnhancementContext
  ): AnimationConfig {
    let baseConfig = { ...this.animationConfigs[type] };

    // For adaptive animations, use context to determine timing
    if (type === 'adaptive' && context?.gameType) {
      const contextConfig = this.contextualConfigs[context.gameType];
      baseConfig = {
        ...baseConfig,
        duration: contextConfig.duration,
        easing: contextConfig.easing,
        enabled: contextConfig.enabled
      };
    }

    // Adjust for device performance
    if (context?.deviceType === 'mobile' && (baseConfig.duration ?? 0) > 0) {
      baseConfig.duration = Math.max(100, (baseConfig.duration ?? 0) * 0.7);
    }

    // Respect reduced motion preference
    if (this.shouldReduceMotion()) {
      baseConfig.duration = 0;
      baseConfig.enabled = false;
    }

    return baseConfig;
  }

  /**
   * Generate CSS variables for animation configuration
   */
  static generateAnimationCSSVariables(config: AnimationConfig): Record<string, string> {
    return {
      '--move-duration': config.enabled ? `${config.duration ?? 0}ms` : '0ms',
      '--move-easing': config.enabled ? (config.easing ?? 'none') : 'none',
      '--animation-enabled': config.enabled ? '1' : '0'
    };
  }

  /**
   * Create animation keyframes for piece movement
   */
  static createMoveAnimation(
    fromElement: HTMLElement,
    toElement: HTMLElement,
    config: AnimationConfig
  ): Animation | null {
    if (!config.enabled || config.duration === 0) {
      return null;
    }

    const fromRect = fromElement.getBoundingClientRect();
    const toRect = toElement.getBoundingClientRect();
    
    const deltaX = toRect.left - fromRect.left;
    const deltaY = toRect.top - fromRect.top;

    const keyframes = [
      { transform: 'translate(0, 0) scale(1)', offset: 0 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(1.05)`, offset: 0.5 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(1)`, offset: 1 }
    ];

    return fromElement.animate(keyframes, {
      duration: config.duration,
      easing: config.easing,
      fill: 'forwards'
    });
  }

  /**
   * Create hover animation for piece
   */
  static createHoverAnimation(
    element: HTMLElement,
    config: AnimationConfig,
    isHovering: boolean
  ): Animation | null {
    if (!config.enabled) {
      return null;
    }

    const scale = isHovering ? 1.08 : 1;
    const translateY = isHovering ? -2 : 0;
    
    const keyframes = [
      { 
        transform: element.style.transform || 'translate(0, 0) scale(1)',
        filter: element.style.filter || 'none'
      },
      { 
        transform: `translate(0, ${translateY}px) scale(${scale})`,
        filter: isHovering ? 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'none'
      }
    ];

    return element.animate(keyframes, {
      duration: Math.min(200, config.duration ?? 200),
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  /**
   * Create drag animation for piece
   */
  static createDragAnimation(
    element: HTMLElement,
    config: AnimationConfig,
    isDragging: boolean
  ): Animation | null {
    if (!config.enabled) {
      return null;
    }

    const scale = isDragging ? 1.15 : 1;
    const rotate = isDragging ? 5 : 0;
    const opacity = isDragging ? 0.7 : 1;
    
    const keyframes = [
      { 
        transform: element.style.transform || 'translate(0, 0) scale(1) rotate(0deg)',
        opacity: element.style.opacity || '1'
      },
      { 
        transform: `translate(0, 0) scale(${scale}) rotate(${rotate}deg)`,
        opacity: opacity.toString()
      }
    ];

    return element.animate(keyframes, {
      duration: 150,
      easing: 'ease-out',
      fill: 'forwards'
    });
  }

  /**
   * Check if reduced motion is preferred
   */
  private static shouldReduceMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Get all available animation types
   */
  static getAvailableAnimationTypes(): MoveAnimationType[] {
    return Object.keys(this.animationConfigs) as MoveAnimationType[];
  }

  /**
   * Get animation configuration for a specific context
   */
  static getContextualConfig(context: GameContext): AnimationConfig {
    return { ...this.contextualConfigs[context] };
  }

  /**
   * Create staggered animations for multiple pieces
   */
  static createStaggeredAnimations(
    elements: HTMLElement[],
    config: AnimationConfig,
    staggerDelay: number = 50
  ): Animation[] {
    if (!config.enabled || config.duration === 0) {
      return [];
    }

    return elements.map((element, index) => {
      const delay = index * staggerDelay;
      
      return element.animate(
        [
          { opacity: 0, transform: 'scale(0.8)' },
          { opacity: 1, transform: 'scale(1)' }
        ],
        {
          duration: config.duration,
          easing: config.easing,
          delay,
          fill: 'forwards'
        }
      );
    });
  }

  /**
   * Optimize animation performance based on device capabilities
   */
  static optimizeForDevice(context: EnhancementContext): Record<string, string> {
    const isMobile = context.deviceType === 'mobile';
    const isLowEnd = isMobile; // Could be enhanced with actual device detection
    
    return {
      '--will-change': isLowEnd ? 'auto' : 'transform',
      '--backface-visibility': 'hidden',
      '--transform-style': 'preserve-3d',
      '--animation-fill-mode': 'both',
      '--animation-play-state': isLowEnd ? 'paused' : 'running'
    };
  }
}