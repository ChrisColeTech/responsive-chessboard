import { useCallback, useState } from 'react'
import { useChessAudio } from '../services/audioService'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

export function useBrandedSplashActions() {
  const { playMove } = useChessAudio()
  const [animationKey, setAnimationKey] = useState(0)
  const { goToMinimal, goToAnimated, goToProgress } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  const testBrandAnimation = useCallback(() => {
    playMove(false)
  }, [playMove])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
    playMove(false)
  }, [playMove])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('brandedsplash')
    playMove(false)
  }, [openSplashModal, playMove])

  return {
    testBrandAnimation,
    restartAnimation,
    toggleFullscreen,
    // Cross-navigation
    goToMinimal,
    goToAnimated,
    goToProgress,
    animationKey
  }
}