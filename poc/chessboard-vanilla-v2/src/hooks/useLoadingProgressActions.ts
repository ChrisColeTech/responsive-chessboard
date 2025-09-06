import { useCallback, useState } from 'react'
import { useChessAudio } from '../services/audioService'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

export function useLoadingProgressActions() {
  const { playMove } = useChessAudio()
  const [animationKey, setAnimationKey] = useState(0)
  const { goToMinimal, goToAnimated, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  const testProgressBar = useCallback(() => {
    playMove(false)
  }, [playMove])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
    playMove(false)
  }, [playMove])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('loadingprogress')
    playMove(false)
  }, [openSplashModal, playMove])

  return {
    testProgressBar,
    restartAnimation,
    toggleFullscreen,
    // Cross-navigation
    goToMinimal,
    goToAnimated,
    goToBranded,
    animationKey
  }
}