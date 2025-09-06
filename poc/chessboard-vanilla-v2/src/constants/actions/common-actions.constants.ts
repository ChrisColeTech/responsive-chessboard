// Global actions available on all pages
import { Settings, HelpCircle, BarChart, Palette } from 'lucide-react'
import type { ActionSheetAction } from '../../types/action-sheet.types'
import { COMMON_ACTION_HANDLERS } from './common-actions-handlers'

export const COMMON_ACTIONS: ActionSheetAction[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    variant: 'default',
    shortcut: 'S'
  },
  {
    id: 'help',
    label: 'Help',
    icon: HelpCircle,
    variant: 'default',
    shortcut: 'H'
  },
  {
    id: 'stats',
    label: 'Statistics',
    icon: BarChart,
    variant: 'secondary'
  },
  {
    id: 'themes',
    label: 'Themes',
    icon: Palette,
    variant: 'secondary'
  }
]

// Export handlers for registration
export { COMMON_ACTION_HANDLERS }