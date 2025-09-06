// Define all page-specific actions based on current page controls
import { 
  RotateCcw, Eye, Pause, Undo, Coins, RefreshCw, Volume2, 
  Trash2, TestTube, SkipForward, Navigation, VolumeX,
  Brain, Clock, CheckCircle, Target, Sword, Move, Maximize2
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
    },
    {
      id: 'go-to-layout-test',
      label: 'Go to Layout Test',
      icon: Eye,
      variant: 'secondary'
    }
  ],
  layouttest: [],
  splash: [
    {
      id: 'go-to-minimal',
      label: 'Minimal Design',
      icon: Navigation,
      variant: 'default'
    },
    {
      id: 'go-to-animated',
      label: 'Animated Examples',
      icon: SkipForward,
      variant: 'default'
    },
    {
      id: 'go-to-progress',
      label: 'Loading Progress',
      icon: Clock,
      variant: 'default'
    },
    {
      id: 'go-to-branded',
      label: 'Branded Design',
      icon: Target,
      variant: 'default'
    }
  ],
  minimalsplash: [
    {
      id: 'test-minimal-load',
      label: 'Test Load Animation',
      icon: SkipForward,
      variant: 'default'
    },
    {
      id: 'restart-animation',
      label: 'Restart Animation',
      icon: RotateCcw,
      variant: 'secondary'
    },
    {
      id: 'toggle-fullscreen',
      label: 'Toggle Fullscreen',
      icon: Maximize2,
      variant: 'default',
      shortcut: 'F11'
    },
    {
      id: 'go-to-animated',
      label: '→ Animated',
      icon: SkipForward,
      variant: 'secondary'
    },
    {
      id: 'go-to-progress',
      label: '→ Progress',
      icon: Clock,
      variant: 'secondary'
    },
    {
      id: 'go-to-branded',
      label: '→ Branded',
      icon: Target,
      variant: 'secondary'
    }
  ],
  animatedsplash: [
    {
      id: 'test-spring-animation',
      label: 'Test Spring Animation',
      icon: SkipForward,
      variant: 'default'
    },
    {
      id: 'restart-animation',
      label: 'Restart Animation',
      icon: RotateCcw,
      variant: 'secondary'
    },
    {
      id: 'toggle-fullscreen',
      label: 'Toggle Fullscreen',
      icon: Maximize2,
      variant: 'default',
      shortcut: 'F11'
    },
    {
      id: 'go-to-minimal',
      label: '→ Minimal',
      icon: Navigation,
      variant: 'secondary'
    },
    {
      id: 'go-to-progress',
      label: '→ Progress',
      icon: Clock,
      variant: 'secondary'
    },
    {
      id: 'go-to-branded',
      label: '→ Branded',
      icon: Target,
      variant: 'secondary'
    }
  ],
  loadingprogress: [
    {
      id: 'test-progress-bar',
      label: 'Test Progress Bar',
      icon: Clock,
      variant: 'default'
    },
    {
      id: 'restart-animation',
      label: 'Restart Animation',
      icon: RotateCcw,
      variant: 'secondary'
    },
    {
      id: 'toggle-fullscreen',
      label: 'Toggle Fullscreen',
      icon: Maximize2,
      variant: 'default',
      shortcut: 'F11'
    },
    {
      id: 'go-to-minimal',
      label: '→ Minimal',
      icon: Navigation,
      variant: 'secondary'
    },
    {
      id: 'go-to-animated',
      label: '→ Animated',
      icon: SkipForward,
      variant: 'secondary'
    },
    {
      id: 'go-to-branded',
      label: '→ Branded',
      icon: Target,
      variant: 'secondary'
    }
  ],
  brandedsplash: [
    {
      id: 'test-brand-animation',
      label: 'Test Brand Animation',
      icon: Target,
      variant: 'default'
    },
    {
      id: 'restart-animation',
      label: 'Restart Animation',
      icon: RotateCcw,
      variant: 'secondary'
    },
    {
      id: 'toggle-fullscreen',
      label: 'Toggle Fullscreen',
      icon: Maximize2,
      variant: 'default',
      shortcut: 'F11'
    },
    {
      id: 'go-to-minimal',
      label: '→ Minimal',
      icon: Navigation,
      variant: 'secondary'
    },
    {
      id: 'go-to-animated',
      label: '→ Animated',
      icon: SkipForward,
      variant: 'secondary'
    },
    {
      id: 'go-to-progress',
      label: '→ Progress',
      icon: Clock,
      variant: 'secondary'
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
    },
    {
      id: 'toggle-pieces-position',
      label: 'Toggle Pieces Position',
      icon: Move,
      variant: 'secondary'
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