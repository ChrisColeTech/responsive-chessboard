// Define all page-specific actions based on current page controls
import { 
  RotateCcw, Eye, Pause, Undo, Coins, RefreshCw, Volume2, 
  Trash2, TestTube, SkipForward, Navigation, VolumeX,
  Brain, Clock, CheckCircle, Download, Target, Sword
} from 'lucide-react'
import type { ActionSheetAction } from '../../types/action-sheet.types'

export const PAGE_ACTIONS: Record<string, ActionSheetAction[]> = {
  play: [
    {
      id: 'new-game',
      label: 'New Game',
      icon: RotateCcw,
      variant: 'default',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'pause-game',
      label: 'Pause Game',
      icon: Pause,
      variant: 'secondary',
      shortcut: 'Space'
    },
    {
      id: 'show-moves',
      label: 'Show Moves',
      icon: Eye,
      variant: 'default'
    },
    {
      id: 'undo-move',
      label: 'Undo Move',
      icon: Undo,
      variant: 'secondary',
      shortcut: 'Ctrl+Z'
    }
  ],
  slots: [
    {
      id: 'test-spin',
      label: 'Test Spin',
      icon: RotateCcw,
      variant: 'default'
    },
    {
      id: 'test-win',
      label: 'Test Win Sound',
      icon: Coins,
      variant: 'secondary'
    },
    {
      id: 'test-lose',
      label: 'Test Lose Sound',
      icon: Volume2,
      variant: 'destructive'
    },
    {
      id: 'reset-coins',
      label: 'Reset Coins',
      icon: RefreshCw,
      variant: 'secondary'
    }
  ],
  worker: [
    {
      id: 'test-worker-ready',
      label: 'Test Worker Ready',
      icon: CheckCircle,
      variant: 'default'
    },
    {
      id: 'test-good-move',
      label: 'Test Chess Move',
      icon: Brain,
      variant: 'default'
    },
    {
      id: 'test-speed',
      label: 'Test Response Speed',
      icon: Clock,
      variant: 'default'
    },
    {
      id: 'run-all-tests',
      label: 'Run All Tests',
      icon: TestTube,
      variant: 'default'
    },
    {
      id: 'clear-test-results',
      label: 'Clear Results',
      icon: Trash2,
      variant: 'secondary'
    }
  ],
  uitests: [
    {
      id: 'run-ui-tests',
      label: 'Run UI Tests',
      icon: TestTube,
      variant: 'default'
    },
    {
      id: 'clear-ui-results',
      label: 'Clear Results',
      icon: Trash2,
      variant: 'secondary'
    },
    {
      id: 'export-results',
      label: 'Export Results',
      icon: Download,
      variant: 'default'
    },
    {
      id: 'reset-ui-tests',
      label: 'Reset Tests',
      icon: RefreshCw,
      variant: 'destructive'
    },
    {
      id: 'go-to-drag-test',
      label: 'Go to Drag Test',
      icon: Navigation,
      variant: 'secondary'
    },
    {
      id: 'go-to-audio-test',
      label: 'Go to Audio Test',
      icon: VolumeX,
      variant: 'secondary'
    }
  ],
  layout: [],
  splash: [
    {
      id: 'skip-animation',
      label: 'Skip Animation',
      icon: SkipForward,
      variant: 'secondary'
    },
    {
      id: 'test-loading',
      label: 'Test Loading',
      icon: Clock,
      variant: 'default'
    },
    {
      id: 'reset-preferences',
      label: 'Reset Preferences',
      icon: RefreshCw,
      variant: 'destructive'
    }
  ],
  dragtest: [
    {
      id: 'reset-board',
      label: 'Reset Board',
      icon: RotateCcw,
      variant: 'secondary'
    },
    {
      id: 'test-move-sound',
      label: 'Test Move Sound',
      icon: Volume2,
      variant: 'default'
    },
    {
      id: 'test-capture-sound',
      label: 'Test Capture Sound',
      icon: Target,
      variant: 'default'
    },
    {
      id: 'test-error-sound',
      label: 'Test Error Sound',
      icon: Sword,
      variant: 'destructive'
    }
  ],
  uiaudiotest: [
    {
      id: 'test-ui-sound',
      label: 'Test UI Sound',
      icon: Volume2,
      variant: 'default'
    },
    {
      id: 'test-audio-system',
      label: 'Test Audio System',
      icon: TestTube,
      variant: 'default'
    },
    {
      id: 'reset-audio-settings',
      label: 'Reset Audio Settings',
      icon: RefreshCw,
      variant: 'destructive'
    }
  ]
}