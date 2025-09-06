/**
 * Container component that wires up page-specific actions with HeadlessUI Popover
 * Works with external MenuButton trigger in TabBar for proper HeadlessUI integration
 */
import { useCallback } from 'react'
import { ActionSheet } from './ActionSheet'
import { usePlayActions } from '../../hooks/usePlayActions'
import { useSlotsActions } from '../../hooks/useSlotsActions'
import { useWorkerActions } from '../../hooks/useWorkerActions'
import { useUITestsActions } from '../../hooks/useUITestsActions'
import { useLayoutActions } from '../../hooks/useLayoutActions'
import { useDragTestActions } from '../../hooks/useDragTestActions'
import { useUIAudioTestActions } from '../../hooks/useUIAudioTestActions'
import { useSplashActions } from '../../hooks/useSplashActions'
import { useMinimalSplashActions } from '../../hooks/useMinimalSplashActions'
import { useAnimatedSplashActions } from '../../hooks/useAnimatedSplashActions'
import { useLoadingProgressActions } from '../../hooks/useLoadingProgressActions'
import { useBrandedSplashActions } from '../../hooks/useBrandedSplashActions'
import { useUIClickSound } from '../../hooks/useUIClickSound'
import { useAppStore } from '../../stores/appStore'
import type { ActionSheetContainerProps } from '../../types/action-sheet.types'
import { PAGE_ACTIONS } from '../../constants/actions/page-actions.constants'

export function ActionSheetContainer({ currentPage, className, onClose, isOpen, onOpenSettings }: ActionSheetContainerProps) {
  
  // Use child page if it exists, otherwise use current tab
  const currentChildPage = useAppStore((state) => state.currentChildPage)
  const actionSheetPage = currentChildPage || currentPage
  
  // Get actions for current page
  const actions = PAGE_ACTIONS[actionSheetPage] || []
  
  // Get page-specific action handlers
  const playActions = usePlayActions()
  const slotsActions = useSlotsActions()
  const workerActions = useWorkerActions()
  const uiTestsActions = useUITestsActions()
  const layoutActions = useLayoutActions()
  const dragTestActions = useDragTestActions()
  const uiAudioTestActions = useUIAudioTestActions()
  const splashActions = useSplashActions()
  const minimalSplashActions = useMinimalSplashActions()
  const animatedSplashActions = useAnimatedSplashActions()
  const loadingProgressActions = useLoadingProgressActions()
  const brandedSplashActions = useBrandedSplashActions()
  
  // Audio for action clicks
  const { playUIClick } = useUIClickSound()

  // HeadlessUI action handler - fixed typing for string indexing
  const handleAction = useCallback((actionId: string, actionLabel: string, closeCallback: () => void) => {
    
    // Play click sound
    playUIClick(`Action: ${actionLabel}`)
    
    // Map actions to the right page hook functions with proper typing
    type Fn = () => void | Promise<void>
    const actionMap: Record<string, Record<string, Fn>> = {
      play: {
        'new-game': playActions.newGame,
        'pause-game': playActions.pauseGame,
        'show-moves': playActions.showMoves,
        'undo-move': playActions.undoMove
      },
      slots: {
        'test-spin': slotsActions.testSpin,
        'test-win': slotsActions.testWin,
        'test-lose': slotsActions.testLose,
        'reset-coins': slotsActions.resetCoins
      },
      worker: {
        'test-worker-ready': workerActions.testWorkerReady,
        'test-good-move': workerActions.testGoodMove,
        'test-speed': workerActions.testSpeed,
        'run-all-tests': workerActions.runAllTests,
        'clear-test-results': workerActions.clearTestResults
      },
      uitests: {
        'go-to-drag-test': uiTestsActions.goToDragTest,
        'go-to-audio-test': uiTestsActions.goToAudioTest,
        'go-to-layout-test': uiTestsActions.goToLayoutTest
      },
      layout: {
        'change-background': layoutActions.changeBackground,
        'reset-layout': layoutActions.resetLayout,
        'toggle-effects': layoutActions.toggleEffects,
        'shuffle-theme': layoutActions.shuffleTheme
      },
      dragtest: {
        'reset-board': dragTestActions.resetBoard,
        'test-move-sound': dragTestActions.testMoveSound,
        'test-capture-sound': dragTestActions.testCaptureSound,
        'test-error-sound': dragTestActions.testErrorSound,
        'toggle-pieces-position': dragTestActions.togglePiecesPosition
      },
      uiaudiotest: {
        'test-ui-sound': uiAudioTestActions.testUISound,
        'test-audio-system': uiAudioTestActions.testAudioSystem,
        'reset-audio-settings': uiAudioTestActions.resetAudioSettings
      },
      splash: {
        'go-to-minimal': splashActions.goToMinimal,
        'go-to-animated': splashActions.goToAnimated,
        'go-to-progress': splashActions.goToProgress,
        'go-to-branded': splashActions.goToBranded
      },
      minimalsplash: {
        'test-minimal-load': minimalSplashActions.testMinimalLoad
      },
      animatedsplash: {
        'test-spring-animation': animatedSplashActions.testSpringAnimation
      },
      loadingprogress: {
        'test-progress-bar': loadingProgressActions.testProgressBar
      },
      brandedsplash: {
        'test-brand-animation': brandedSplashActions.testBrandAnimation
      },
      layouttest: {}
    }
    
    // Handle global settings action
    if (actionId === 'open-settings') {
      onOpenSettings()
      return
    }

    // Call the action function with proper typing
    const pageActions = actionMap[actionSheetPage]          // Record<string, Fn> | undefined
    const actionFunction = pageActions?.[actionId]      // Fn | undefined
    
    if (actionFunction) {
      Promise.resolve(actionFunction()).catch(error => {
        console.error(`❌ [ACTION SHEET] Action ${actionId} failed:`, error)
      })
    } else {
      console.warn(`⚠️ [ACTION SHEET] No handler found for action: ${actionId} on page: ${actionSheetPage}`)
    }
    
    // Use HeadlessUI's close callback AND our onClose
    closeCallback()
    onClose()
  }, [currentPage, playUIClick, playActions, slotsActions, workerActions, uiTestsActions, layoutActions, dragTestActions, uiAudioTestActions, splashActions, minimalSplashActions, animatedSplashActions, loadingProgressActions, brandedSplashActions, onClose])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }, [onClose])

  // Found ${actions.length} actions for page: ${currentPage}

  return (
    <ActionSheet
      actions={actions}
      onActionClick={handleAction}
      onKeyDown={handleKeyDown}
      onClose={onClose}
      isOpen={isOpen}
      className={className}
    />
  )
}