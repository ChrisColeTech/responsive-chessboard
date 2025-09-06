/**
 * Animation and snap point configurations for react-spring-bottom-sheet
 * Following DRY principle - centralized animation settings
 */

/**
 * Snap point configurations for different sheet sizes
 * These functions determine where the sheet can settle based on content
 */
export const SNAP_POINTS = {
  /**
   * Small sheet - for 1-3 actions
   * Takes up about 30% of screen height
   */
  small: ({ maxHeight }: { maxHeight: number }) => maxHeight * 0.3,

  /**
   * Medium sheet - for 4-6 actions  
   * Takes up about 50% of screen height
   */
  medium: ({ maxHeight }: { maxHeight: number }) => maxHeight * 0.5,

  /**
   * Large sheet - for 7+ actions
   * Takes up about 70% of screen height
   */
  large: ({ maxHeight }: { maxHeight: number }) => maxHeight * 0.7,

  /**
   * Auto-sizing based on content
   * Dynamically calculates height based on number of actions
   */
  auto: ({ maxHeight }: { maxHeight: number }, actionCount: number) => {
    const baseHeight = 120 // Header + padding
    const actionHeight = 64 // Height per action item
    const calculatedHeight = baseHeight + (actionCount * actionHeight)
    
    // Clamp between 25% and 75% of screen height
    const minHeight = maxHeight * 0.25
    const maxClampedHeight = maxHeight * 0.75
    
    return Math.max(minHeight, Math.min(calculatedHeight, maxClampedHeight))
  }
}

/**
 * Spring animation configurations
 * These control the feel of sheet animations
 */
export const ANIMATION_CONFIG = {
  /**
   * Default spring configuration
   * Smooth, responsive feel matching existing app animations
   */
  default: {
    tension: 300,
    friction: 30
  },

  /**
   * Quick animation for instant feedback
   * Used for rapid open/close actions
   */
  quick: {
    tension: 400,
    friction: 40
  },

  /**
   * Gentle animation for subtle interactions
   * Used for hover states and secondary actions
   */
  gentle: {
    tension: 200,
    friction: 25
  }
}

/**
 * Gesture thresholds for sheet interactions
 * Controls sensitivity of swipe gestures
 */
export const GESTURE_CONFIG = {
  /**
   * Minimum swipe velocity to trigger dismiss (px/ms)
   */
  dismissVelocity: 0.5,

  /**
   * Minimum drag distance to trigger snap (px)
   */
  snapThreshold: 50,

  /**
   * Resistance factor when dragging beyond bounds
   */
  resistance: 0.8
}

/**
 * Action sheet appearance configuration
 * Matches existing glassmorphism design system
 */
export const APPEARANCE_CONFIG = {
  /**
   * Border radius for sheet corners
   */
  borderRadius: '16px',

  /**
   * Background blur amount
   */
  backdropBlur: '8px',

  /**
   * Background overlay opacity
   */
  backdropOpacity: 0.3,

  /**
   * Sheet handle appearance
   */
  handle: {
    width: '40px',
    height: '4px',
    borderRadius: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
}

/**
 * Complete configuration object for react-spring-bottom-sheet
 * Ready to be used directly in the component
 */
export const ACTION_SHEET_CONFIG = {
  snapPoints: SNAP_POINTS,
  animation: ANIMATION_CONFIG,
  gestures: GESTURE_CONFIG,
  appearance: APPEARANCE_CONFIG,

  /**
   * Get appropriate snap point for given action count
   * @param actionCount Number of actions to display
   * @returns Snap point function
   */
  getSnapPoint: (actionCount: number) => {
    if (actionCount <= 3) return SNAP_POINTS.small
    if (actionCount <= 6) return SNAP_POINTS.medium
    return SNAP_POINTS.large
  },

  /**
   * Get animation config for given interaction type
   * @param type Type of interaction ('open', 'close', 'drag', 'default')
   * @returns Animation configuration
   */
  getAnimationConfig: (type: 'open' | 'close' | 'drag' | 'default' = 'default') => {
    switch (type) {
      case 'open':
      case 'close':
        return ANIMATION_CONFIG.quick
      case 'drag':
        return ANIMATION_CONFIG.gentle
      default:
        return ANIMATION_CONFIG.default
    }
  }
}

/**
 * CSS custom properties for theming
 * Can be applied to override default react-spring-bottom-sheet styles
 */
export const CSS_VARIABLES = {
  '--rsbs-backdrop-bg': `rgba(0, 0, 0, ${APPEARANCE_CONFIG.backdropOpacity})`,
  '--rsbs-backdrop-blur': APPEARANCE_CONFIG.backdropBlur,
  '--rsbs-bg': 'rgba(255, 255, 255, 0.1)', // Glassmorphism background
  '--rsbs-handle-bg': APPEARANCE_CONFIG.handle.backgroundColor,
  '--rsbs-max-w': '100%',
  '--rsbs-ml': '0px',
  '--rsbs-mr': '0px',
  '--rsbs-overlay-rounded': APPEARANCE_CONFIG.borderRadius
}