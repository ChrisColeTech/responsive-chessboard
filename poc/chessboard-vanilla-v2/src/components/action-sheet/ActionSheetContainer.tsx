/**
 * Container component that wires up page-specific actions with HeadlessUI Popover
 * Works with external MenuButton trigger in TabBar for proper HeadlessUI integration
 */
import { useCallback, useState, useEffect } from 'react'
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
import { useLuxurysplashActions } from '../../hooks/useLuxurysplashActions'
import { useMobileDragTestActions } from '../../hooks/useMobileDragTestActions'
import { useUIClickSound } from '../../hooks/useUIClickSound'
import { useUIHoverSound } from '../../hooks/useUIHoverSound'
import { useAppStore } from '../../stores/appStore'
import type { ActionSheetContainerProps, ActionSheetAction } from '../../types/action-sheet.types'
import { PAGE_ACTIONS } from '../../constants/actions/page-actions.constants'

export function ActionSheetContainer({ currentPage, className, onClose, isOpen, onOpenSettings }: ActionSheetContainerProps) {
  
  // Use child page if it exists, otherwise use current tab
  const currentChildPage = useAppStore((state) => state.currentChildPage)
  const actionSheetPage = currentChildPage || currentPage
  
  // Add delay when switching action menus
  const [delayedActionSheetPage, setDelayedActionSheetPage] = useState(actionSheetPage)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedActionSheetPage(actionSheetPage)
    }, 1000) // 1000ms delay when switching action menus
    
    return () => clearTimeout(timer)
  }, [actionSheetPage])
  
  // Get actions for current page (with delay)
  const actions = PAGE_ACTIONS[delayedActionSheetPage] || []
  
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
  const luxurysplashActions = useLuxurysplashActions()
  const mobileDragTestActions = useMobileDragTestActions()
  
  // Audio for action clicks and hovers
  const { playUIClick } = useUIClickSound()
  const { playUIHover } = useUIHoverSound()

  // HeadlessUI action handler - fixed typing for string indexing
  const handleAction = useCallback((action: ActionSheetAction, closeCallback: () => void) => {
    // Note: UI click sound is handled automatically by Global UI Audio System
    
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
        'go-to-layout-test': uiTestsActions.goToLayoutTest,
        'go-to-mobile-drag-test': uiTestsActions.goToMobileDragTest
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
        'go-to-branded': splashActions.goToBranded,
        'go-to-luxurysplash': splashActions.goToLuxurysplash
      },
      minimalsplash: {
        'test-minimal-load': minimalSplashActions.testMinimalLoad,
        'restart-animation': minimalSplashActions.restartAnimation,
        'toggle-fullscreen': minimalSplashActions.toggleFullscreen,
        'go-to-animated': minimalSplashActions.goToAnimated,
        'go-to-progress': minimalSplashActions.goToProgress,
        'go-to-branded': minimalSplashActions.goToBranded
      },
      animatedsplash: {
        'test-spring-animation': animatedSplashActions.testAnimatedAssembly,
        'restart-animation': animatedSplashActions.restartAnimation,
        'toggle-fullscreen': animatedSplashActions.toggleFullscreen,
        'go-to-minimal': animatedSplashActions.goToMinimal,
        'go-to-progress': animatedSplashActions.goToProgress,
        'go-to-branded': animatedSplashActions.goToBranded
      },
      loadingprogress: {
        'test-progress-bar': loadingProgressActions.testProgressBar,
        'restart-animation': loadingProgressActions.restartAnimation,
        'toggle-fullscreen': loadingProgressActions.toggleFullscreen,
        'go-to-minimal': loadingProgressActions.goToMinimal,
        'go-to-animated': loadingProgressActions.goToAnimated,
        'go-to-branded': loadingProgressActions.goToBranded
      },
      brandedsplash: {
        'test-brand-animation': brandedSplashActions.testBrandAnimation,
        'restart-animation': brandedSplashActions.restartAnimation,
        'toggle-fullscreen': brandedSplashActions.toggleFullscreen,
        'go-to-minimal': brandedSplashActions.goToMinimal,
        'go-to-animated': brandedSplashActions.goToAnimated,
        'go-to-progress': brandedSplashActions.goToProgress
      },
      luxurysplash: {
        'test-luxury': luxurysplashActions.testLuxury,
        'restart-demo': luxurysplashActions.restartDemo
      },
      layouttest: {},
      mobiledragtest: {
        'mobile-board-action': mobileDragTestActions.mobileBoardAction,
        'mobile-test-sound': mobileDragTestActions.mobileTestSound
      }
    }
    
    // Handle global settings action
    if (action.id === 'open-settings') {
      onOpenSettings()
      return
    }

    // Call the action function with proper typing
    const pageActions = actionMap[delayedActionSheetPage]          // Record<string, Fn> | undefined
    const actionFunction = pageActions?.[action.id]      // Fn | undefined
    
    if (actionFunction) {
      Promise.resolve(actionFunction()).catch(error => {
        console.error(`❌ [ACTION SHEET] Action ${action.id} failed:`, error)
      })
    } else {
      console.warn(`⚠️ [ACTION SHEET] No handler found for action: ${action.id} on page: ${delayedActionSheetPage}`)
    }
    
    // Use HeadlessUI's close callback AND our onClose
    closeCallback()
    onClose()
  }, [currentPage, playUIClick, playActions, slotsActions, workerActions, uiTestsActions, layoutActions, dragTestActions, uiAudioTestActions, splashActions, minimalSplashActions, animatedSplashActions, loadingProgressActions, brandedSplashActions, luxurysplashActions, mobileDragTestActions, onClose])

  const handleHover = useCallback((actionLabel: string) => {
    playUIHover(`Action: ${actionLabel}`)
  }, [playUIHover])

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
      onActionHover={handleHover}
      onKeyDown={handleKeyDown}
      onClose={onClose}
      isOpen={isOpen}
      className={className}
    />
  )
}