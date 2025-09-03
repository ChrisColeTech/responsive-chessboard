// useAnimation.ts - Animation state and controls hook
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { 
  MoveAnimationType, 
  AnimationConfig, 
  EnhancementContext 
} from '../types/enhancement.types';
import { AnimationController } from '../services/AnimationController';

interface UseAnimationOptions {
  context?: EnhancementContext;
  onAnimationComplete?: () => void;
  enableOptimizations?: boolean;
}

interface UseAnimationReturn {
  animationType: MoveAnimationType;
  animationConfig: AnimationConfig;
  config: AnimationConfig;
  cssVariables: Record<string, string>;
  isAnimating: boolean;
  setAnimationType: (type: MoveAnimationType) => void;
  updateConfig: (config: Partial<AnimationConfig>) => void;
  animateMove: (fromElement: HTMLElement, toElement: HTMLElement) => Promise<void>;
  animateHover: (element: HTMLElement, isHovering: boolean) => Promise<void>;
  animateDrag: (element: HTMLElement, isDragging: boolean) => Promise<void>;
  animateStaggered: (elements: HTMLElement[], staggerDelay?: number) => Promise<void>;
  cancelAllAnimations: () => void;
  availableTypes: MoveAnimationType[];
}

export const useAnimation = (
  initialType: MoveAnimationType = 'smooth',
  options: UseAnimationOptions = {}
): UseAnimationReturn => {
  const [animationType, setAnimationType] = useState<MoveAnimationType>(initialType);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeAnimationsRef = useRef<Set<Animation>>(new Set());

  // Memoized animation configuration
  const animationConfig = useMemo(() => 
    AnimationController.getAnimationConfig(animationType, options.context),
    [animationType, options.context]
  );

  // Memoized CSS variables
  const cssVariables = useMemo(() => {
    const baseVariables = AnimationController.generateAnimationCSSVariables(animationConfig);
    const deviceOptimizations = options.context && options.enableOptimizations
      ? AnimationController.optimizeForDevice(options.context)
      : {};
    
    return { ...baseVariables, ...deviceOptimizations };
  }, [animationConfig, options.context, options.enableOptimizations]);

  // Available animation types
  const availableTypes = useMemo(() => 
    AnimationController.getAvailableAnimationTypes(), 
    []
  );

  // Animation completion handler
  const handleAnimationComplete = useCallback((animation: Animation) => {
    activeAnimationsRef.current.delete(animation);
    
    if (activeAnimationsRef.current.size === 0) {
      setIsAnimating(false);
      options.onAnimationComplete?.();
    }
  }, [options.onAnimationComplete]);

  // Track animation lifecycle
  const trackAnimation = useCallback((animation: Animation | null) => {
    if (!animation) return;
    
    activeAnimationsRef.current.add(animation);
    setIsAnimating(true);
    
    animation.addEventListener('finish', () => handleAnimationComplete(animation));
    animation.addEventListener('cancel', () => handleAnimationComplete(animation));
  }, [handleAnimationComplete]);

  // Animate piece movement
  const animateMove = useCallback(async (fromElement: HTMLElement, toElement: HTMLElement): Promise<void> => {
    const animation = AnimationController.createMoveAnimation(
      fromElement, 
      toElement, 
      animationConfig
    );
    
    if (animation) {
      trackAnimation(animation);
      await animation.finished;
    }
  }, [animationConfig, trackAnimation]);

  // Animate piece hover
  const animateHover = useCallback(async (element: HTMLElement, isHovering: boolean): Promise<void> => {
    const animation = AnimationController.createHoverAnimation(
      element,
      animationConfig,
      isHovering
    );
    
    if (animation) {
      trackAnimation(animation);
      await animation.finished;
    }
  }, [animationConfig, trackAnimation]);

  // Animate piece drag
  const animateDrag = useCallback(async (element: HTMLElement, isDragging: boolean): Promise<void> => {
    const animation = AnimationController.createDragAnimation(
      element,
      animationConfig,
      isDragging
    );
    
    if (animation) {
      trackAnimation(animation);
      await animation.finished;
    }
  }, [animationConfig, trackAnimation]);

  // Animate multiple elements with stagger
  const animateStaggered = useCallback(async (
    elements: HTMLElement[], 
    staggerDelay: number = 50
  ): Promise<void> => {
    const animations = AnimationController.createStaggeredAnimations(
      elements,
      animationConfig,
      staggerDelay
    );
    
    animations.forEach(animation => trackAnimation(animation));
    
    if (animations.length > 0) {
      await Promise.all(animations.map(animation => animation.finished));
    }
  }, [animationConfig, trackAnimation]);

  // Cancel all active animations
  const cancelAllAnimations = useCallback(() => {
    activeAnimationsRef.current.forEach(animation => {
      try {
        animation.cancel();
      } catch (error) {
        // Animation might already be finished or cancelled
        console.debug('Failed to cancel animation:', error);
      }
    });
    
    activeAnimationsRef.current.clear();
    setIsAnimating(false);
  }, []);

  // Update animation config
  const updateConfig = useCallback((_newConfig: Partial<AnimationConfig>) => {
    // Cancel existing animations when changing config
    cancelAllAnimations();
    // For now, if duration or easing changes, we could update the type
    // In a more complex implementation, we might maintain separate state
  }, [cancelAllAnimations]);

  // Update animation type
  const setAnimationTypeCallback = useCallback((type: MoveAnimationType) => {
    // Cancel existing animations when changing type
    cancelAllAnimations();
    setAnimationType(type);
  }, [cancelAllAnimations]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cancelAllAnimations();
    };
  }, [cancelAllAnimations]);

  // Update animation type when initial type changes
  useEffect(() => {
    if (initialType !== animationType) {
      setAnimationType(initialType);
    }
  }, [initialType, animationType]);

  // Listen for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // User prefers reduced motion, cancel all animations
        cancelAllAnimations();
      }
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, [cancelAllAnimations]);

  return {
    animationType,
    animationConfig,
    config: animationConfig,
    cssVariables,
    isAnimating,
    setAnimationType: setAnimationTypeCallback,
    updateConfig,
    animateMove,
    animateHover,
    animateDrag,
    animateStaggered,
    cancelAllAnimations,
    availableTypes
  };
};