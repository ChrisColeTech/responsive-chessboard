import { useCallback, useState } from 'react'
import { useChessAudio } from '../services/audioService'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

export function useAnimatedSplashActions() {
  const { playMove } = useChessAudio()
  const [animationKey, setAnimationKey] = useState(0)
  const { goToMinimal, goToProgress, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  const testSpringAnimation = useCallback(() => {
    playMove(false)
  }, [playMove])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
    playMove(false)
  }, [playMove])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('animatedsplash')
    playMove(false)
  }, [openSplashModal, playMove])

  return {
    testSpringAnimation,
    restartAnimation,
    toggleFullscreen,
    // Cross-navigation
    goToMinimal,
    goToProgress,
    goToBranded,
    animationKey
  }
}