import { useCallback, useState } from 'react'
import { useChessAudio } from '../services/audioService'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

export function useMinimalSplashActions() {
  const { playMove } = useChessAudio()
  const [animationKey, setAnimationKey] = useState(0)
  const { goToAnimated, goToProgress, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  const testMinimalLoad = useCallback(() => {
    playMove(false)
  }, [playMove])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
    playMove(false)
  }, [playMove])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('minimalsplash')
    playMove(false)
  }, [openSplashModal, playMove])

  return {
    testMinimalLoad,
    restartAnimation,
    toggleFullscreen,
    // Cross-navigation
    goToAnimated,
    goToProgress,
    goToBranded,
    animationKey
  }
}