import type { ActionSheetAction } from './action-sheet.types'

/**
 * Page-specific action types following DRY principle
 * Reusable across all page implementations
 */

/**
 * Handler function for page-specific actions
 * Can be sync or async to support various action types
 */
export type PageActionHandler = (actionId: string, context?: ActionContext) => void | Promise<void>

/**
 * Configuration for actions available on a specific page
 */
export interface PageActionConfig {
  /** Array of actions available on this page */
  actions: ActionSheetAction[]
  /** Handler function for executing actions on this page */
  handler: PageActionHandler
}

/**
 * Complete mapping of all pages to their action configurations
 */
export interface PageActionRegistry {
  [pageId: string]: PageActionConfig
}

/**
 * Context information passed to action handlers
 * Extensible interface for different page needs
 */
export interface ActionContext {
  /** Chess game state (for play page) */
  currentGame?: any
  /** Currently selected piece (for chess pages) */
  selectedPiece?: any
  /** User's coin balance (for casino pages) */
  coinBalance?: number
  /** Application settings */
  settings?: any
  /** Stockfish engine state (for worker page) */
  engineState?: any
  /** Test results (for UI test pages) */
  testResults?: any
  /** Current theme/layout settings */
  themeSettings?: any
}

/**
 * Action execution result
 */
export interface ActionResult {
  /** Whether the action was successful */
  success: boolean
  /** Optional message about the result */
  message?: string
  /** Any data returned from the action */
  data?: any
  /** Whether the action sheet should close after execution */
  closeSheet?: boolean
}

/**
 * Hook return type for page action management
 */
export interface UsePageActionsReturn {
  /** Actions available for the current page */
  actions: ActionSheetAction[]
  /** Function to handle action execution */
  handleAction: (actionId: string, context?: ActionContext) => Promise<ActionResult>
  /** Function to register new actions dynamically */
  registerActions: (actions: ActionSheetAction[]) => void
  /** Function to register a page action handler */
  registerHandler: (handler: PageActionHandler) => void
  /** Whether actions are currently loading */
  isLoading: boolean
}