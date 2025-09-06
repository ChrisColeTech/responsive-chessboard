/**
 * Action Sheet Constants - Barrel Export
 * 
 * Following DRY principle by providing a single import point
 * for all action sheet related constants and configurations
 */

// Page action definitions and utilities
export {
  PAGE_ACTIONS,
  getPageActions,
  getAllActionIds
} from './page-actions.constants'

// Animation and configuration settings
export {
  SNAP_POINTS,
  ANIMATION_CONFIG,
  GESTURE_CONFIG,
  APPEARANCE_CONFIG,
  ACTION_SHEET_CONFIG,
  CSS_VARIABLES
} from './animation.constants'

// Re-export commonly used types for convenience
export type {
  ActionSheetAction,
  ActionSheetState,
  ActionSheetProps,
  ActionItemProps
} from '../../types/action-sheet.types'

export type {
  PageActionHandler,
  PageActionConfig,
  PageActionRegistry,
  ActionContext,
  ActionResult,
  UsePageActionsReturn
} from '../../types/page-actions.types'