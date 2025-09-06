import { 
  Save, 
  RotateCcw, 
  Eye, 
  Pause, 
  Undo, 
  Coins, 
  Gift, 
  Volume2, 
  RefreshCw, 
  Trash2, 
  Settings, 
  FileText, 
  Download, 
  TestTube, 
  Palette, 
  Layout,
  Shuffle,
  Zap,
  SkipForward
} from 'lucide-react'
import type { ActionSheetAction } from '../../types/action-sheet.types'
import type { TabId } from '../../components/layout/types'

/**
 * Static action definitions for each page
 * Following DRY principle - centralized action configurations
 */

/**
 * Actions for the Play page - Chess gameplay
 */
const PLAY_ACTIONS: ActionSheetAction[] = [
  {
    id: 'save-game',
    label: 'Save Game',
    icon: Save,
    variant: 'default'
  },
  {
    id: 'new-game',
    label: 'New Game',
    icon: RotateCcw,
    variant: 'destructive'
  },
  {
    id: 'show-moves',
    label: 'Show Moves',
    icon: Eye,
    variant: 'default'
  },
  {
    id: 'pause-game',
    label: 'Pause Game',
    icon: Pause,
    variant: 'secondary'
  },
  {
    id: 'undo-move',
    label: 'Undo Move',
    icon: Undo,
    variant: 'secondary'
  }
]

/**
 * Actions for the Slot Machine page - Casino features
 */
const SLOTS_ACTIONS: ActionSheetAction[] = [
  {
    id: 'buy-coins',
    label: 'Buy Coins',
    icon: Coins,
    variant: 'default'
  },
  {
    id: 'daily-bonus',
    label: 'Daily Bonus',
    icon: Gift,
    variant: 'default'
  },
  {
    id: 'auto-spin',
    label: 'Auto Spin',
    icon: Zap,
    variant: 'secondary'
  },
  {
    id: 'max-bet',
    label: 'Max Bet',
    icon: Shuffle,
    variant: 'destructive'
  },
  {
    id: 'sound-toggle',
    label: 'Toggle Sound',
    icon: Volume2,
    variant: 'secondary'
  }
]

/**
 * Actions for the Worker Test page - Stockfish engine
 */
const WORKER_ACTIONS: ActionSheetAction[] = [
  {
    id: 'restart-engine',
    label: 'Restart Engine',
    icon: RefreshCw,
    variant: 'default'
  },
  {
    id: 'clear-logs',
    label: 'Clear Logs',
    icon: Trash2,
    variant: 'secondary'
  },
  {
    id: 'test-position',
    label: 'Test Position',
    icon: TestTube,
    variant: 'default'
  },
  {
    id: 'engine-settings',
    label: 'Engine Settings',
    icon: Settings,
    variant: 'secondary'
  }
]

/**
 * Actions for the UI Tests page - Testing interface
 */
const UITESTS_ACTIONS: ActionSheetAction[] = [
  {
    id: 'reset-tests',
    label: 'Reset Tests',
    icon: RefreshCw,
    variant: 'destructive'
  },
  {
    id: 'export-results',
    label: 'Export Results',
    icon: Download,
    variant: 'default'
  },
  {
    id: 'view-logs',
    label: 'View Logs',
    icon: FileText,
    variant: 'secondary'
  },
  {
    id: 'run-all',
    label: 'Run All Tests',
    icon: TestTube,
    variant: 'default'
  }
]

/**
 * Actions for the Layout Test page - Background and theme
 */
const LAYOUT_ACTIONS: ActionSheetAction[] = [
  {
    id: 'change-background',
    label: 'Change Background',
    icon: Palette,
    variant: 'default'
  },
  {
    id: 'reset-layout',
    label: 'Reset Layout',
    icon: Layout,
    variant: 'destructive'
  },
  {
    id: 'export-theme',
    label: 'Export Theme',
    icon: Download,
    variant: 'secondary'
  },
  {
    id: 'toggle-effects',
    label: 'Toggle Effects',
    icon: Zap,
    variant: 'secondary'
  }
]

/**
 * Actions for the Splash page - Loading and preferences  
 */
const SPLASH_ACTIONS: ActionSheetAction[] = [
  {
    id: 'skip-animation',
    label: 'Skip Animation',
    icon: SkipForward,
    variant: 'secondary'
  },
  {
    id: 'change-theme',
    label: 'Change Theme',
    icon: Palette,
    variant: 'default'
  },
  {
    id: 'reset-preferences',
    label: 'Reset Preferences',
    icon: RefreshCw,
    variant: 'destructive'
  }
]

/**
 * Complete mapping of page IDs to their action arrays
 * Following SRP - single source of truth for page actions
 */
export const PAGE_ACTIONS: Record<TabId, ActionSheetAction[]> = {
  play: PLAY_ACTIONS,
  slots: SLOTS_ACTIONS,
  worker: WORKER_ACTIONS,
  uitests: UITESTS_ACTIONS,
  layout: LAYOUT_ACTIONS,
  splash: SPLASH_ACTIONS
}

/**
 * Get actions for a specific page
 * @param pageId - The page to get actions for
 * @returns Array of actions for the page, or empty array if page not found
 */
export const getPageActions = (pageId: TabId): ActionSheetAction[] => {
  return PAGE_ACTIONS[pageId] || []
}

/**
 * Get all available action IDs across all pages
 * Useful for validation and testing
 */
export const getAllActionIds = (): string[] => {
  return Object.values(PAGE_ACTIONS)
    .flat()
    .map(action => action.id)
}