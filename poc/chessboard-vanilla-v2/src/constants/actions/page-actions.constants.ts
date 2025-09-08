// Define all page-specific actions based on current page controls
import { 
  RotateCcw, Eye, Pause, Undo, Coins, RefreshCw, Volume2, 
  Trash2, TestTube, SkipForward, Navigation,
  Brain, Clock, CheckCircle, Target, Sword, Move, Crown,
  Database, BarChart3
} from 'lucide-react'
import type { ActionSheetAction } from '../../types/core/action-sheet.types'
import { mergeWithCommonActions, COMMON_ACTION_GROUPS, COMMON_ACTIONS, buildCommonActions } from './common-actions.constants'

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
      variant: 'default',
      hasOwnAudio: true
    },
    {
      id: 'test-win',
      label: 'Test Win Sound',
      icon: Coins,
      variant: 'secondary',
      hasOwnAudio: true
    },
    {
      id: 'test-lose',
      label: 'Test Lose Sound',
      icon: Volume2,
      variant: 'destructive',
      hasOwnAudio: true
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
      variant: 'secondary',
      hasOwnAudio: true
    }
  ],
  uitests: [...COMMON_ACTION_GROUPS.uitestSiblings.map(name => ({
    ...COMMON_ACTIONS[name],
    variant: 'secondary' as const
  }))],
  layouttest: [...buildCommonActions(['go-to-drag-test', 'go-to-audio-test', 'go-to-mobile-drag-test'])],
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
    },
    {
      id: 'go-to-luxurysplash',
      label: 'Go to Luxurysplash',
      icon: Navigation,
      variant: 'secondary'
    },
    {
      id: 'go-to-functional',
      label: 'Functional Preloading',
      icon: Target,
      variant: 'default'
    }
  ],
  minimalsplash: mergeWithCommonActions([
    {
      id: 'test-minimal-load',
      label: 'Test Load Animation',
      icon: SkipForward,
      variant: 'default'
    }
  ], [...COMMON_ACTION_GROUPS.demoUtilities, 'go-to-animated', 'go-to-progress', 'go-to-branded']),
  animatedsplash: mergeWithCommonActions([
    {
      id: 'test-spring-animation',
      label: 'Test Spring Animation',
      icon: SkipForward,
      variant: 'default'
    }
  ], [...COMMON_ACTION_GROUPS.demoUtilities, 'go-to-minimal', 'go-to-progress', 'go-to-branded']),
  loadingprogress: mergeWithCommonActions([
    {
      id: 'test-progress-bar',
      label: 'Test Progress Bar',
      icon: Clock,
      variant: 'default'
    }
  ], [...COMMON_ACTION_GROUPS.demoUtilities, 'go-to-minimal', 'go-to-animated', 'go-to-branded']),
  brandedsplash: mergeWithCommonActions([
    {
      id: 'test-brand-animation',
      label: 'Test Brand Animation',
      icon: Target,
      variant: 'default'
    }
  ], [...COMMON_ACTION_GROUPS.demoUtilities, 'go-to-minimal', 'go-to-animated', 'go-to-progress']),
  dragtest: mergeWithCommonActions([
    {
      id: 'reset-board',
      label: 'Reset Board',
      icon: RotateCcw,
      variant: 'secondary',
      hasOwnAudio: true
    },
    {
      id: 'test-move-sound',
      label: 'Test Move Sound',
      icon: Volume2,
      variant: 'default',
      hasOwnAudio: true
    },
    {
      id: 'test-capture-sound',
      label: 'Test Capture Sound',
      icon: Target,
      variant: 'default',
      hasOwnAudio: true
    },
    {
      id: 'test-error-sound',
      label: 'Test Error Sound',
      icon: Sword,
      variant: 'destructive',
      hasOwnAudio: true
    },
    {
      id: 'toggle-pieces-position',
      label: 'Toggle Pieces Position',
      icon: Move,
      variant: 'secondary'
    }
  ], ['go-to-audio-test', 'go-to-layout-test', 'go-to-mobile-drag-test']),
  uiaudiotest: mergeWithCommonActions([
    {
      id: 'test-ui-sound',
      label: 'Test UI Sound',
      icon: Volume2,
      variant: 'default',
      hasOwnAudio: true
    },
    {
      id: 'test-audio-system',
      label: 'Test Audio System',
      icon: TestTube,
      variant: 'default',
      hasOwnAudio: true
    },
    {
      id: 'reset-audio-settings',
      label: 'Reset Audio Settings',
      icon: RefreshCw,
      variant: 'destructive'
    }
  ], ['go-to-drag-test', 'go-to-layout-test', 'go-to-mobile-drag-test']),
  luxurysplash: [
    {
      id: 'test-luxury',
      label: 'Test Luxury',
      icon: Crown,
      variant: 'default'
    },
    {
      id: 'restart-demo',
      label: 'Restart Demo',
      icon: RotateCcw,
      variant: 'secondary'
    }
  ],
  functionalsplash: mergeWithCommonActions([
    {
      id: 'test-functional-loading',
      label: 'Test Real Loading',
      icon: TestTube,
      variant: 'default'
    },
    {
      id: 'retry-loading',
      label: 'Retry Loading',
      icon: RefreshCw,
      variant: 'secondary'
    },
    {
      id: 'skip-loading',
      label: 'Skip Loading',
      icon: SkipForward,
      variant: 'destructive'
    },
    {
      id: 'show-cache-stats',
      label: 'Cache Statistics',
      icon: BarChart3,
      variant: 'secondary'
    },
    {
      id: 'clear-cache',
      label: 'Clear Cache',
      icon: Database,
      variant: 'destructive'
    }
  ], [...COMMON_ACTION_GROUPS.demoUtilities, 'go-to-minimal', 'go-to-animated', 'go-to-progress', 'go-to-branded']),
  mobiledragtest: mergeWithCommonActions([
    {
      id: 'mobile-board-action',
      label: 'Mobile Board Action',
      icon: Target,
      variant: 'default'
    },
    {
      id: 'mobile-test-sound',
      label: 'Mobile Test Sound',
      icon: Volume2,
      variant: 'secondary',
      hasOwnAudio: true
    }
  ], ['go-to-drag-test', 'go-to-audio-test', 'go-to-layout-test']),
}