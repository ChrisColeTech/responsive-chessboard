import type { TabId } from '../components/layout/types'

/**
 * Core action sheet types following SRP principle
 * Each interface has a single, clear responsibility
 */

/**
 * Represents a single action that can be performed from the action sheet
 */
export interface ActionSheetAction {
  /** Unique identifier for the action */
  id: string
  /** Display label for the action */
  label: string
  /** Lucide icon component for the action */
  icon: React.ComponentType<{ className?: string }>
  /** Visual variant for different action types */
  variant: 'default' | 'destructive' | 'secondary'
  /** Whether the action is currently disabled */
  disabled?: boolean
  /** Optional badge to display (e.g., count, status) */
  badge?: string | number
}

/**
 * Current state of the action sheet
 */
export interface ActionSheetState {
  /** Whether the action sheet is currently open */
  isOpen: boolean
  /** The page that triggered the action sheet */
  currentPage: TabId | null
  /** Array of actions available for the current page */
  actions: ActionSheetAction[]
}

/**
 * Props for the ActionSheet component (pure presentation component)
 */
export interface ActionSheetProps {
  /** Whether the action sheet is open */
  open: boolean
  /** Callback when the action sheet is dismissed */
  onDismiss: () => void
  /** Array of actions to display */
  actions: ActionSheetAction[]
  /** Callback when an action is selected */
  onActionSelect: (actionId: string) => void
  /** Ref for the sheet container (for keyboard navigation) */
  sheetRef?: React.RefObject<HTMLDivElement | null>
  /** Keyboard event handler */
  onKeyDown?: (event: React.KeyboardEvent) => void
  /** Enhanced action select handler with sound */
  onActionSelectWithSound?: (actionId: string, actionLabel: string, onActionSelect: (actionId: string) => void) => void
}

/**
 * Props for individual ActionItem components
 */
export interface ActionItemProps {
  /** The action to display */
  action: ActionSheetAction
  /** Callback when the action is selected */
  onSelect: () => void
}