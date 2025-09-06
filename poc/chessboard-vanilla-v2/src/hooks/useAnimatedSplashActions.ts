import { useCallback, useState } from 'react'
import { useChessAudio } from '../services/audioService'
import { useSplashActions } from './useSplashActions'

export function useAnimatedSplashActions() {
  const { playMove } = useChessAudio()
  const [animationKey, setAnimationKey] = useState(0)
  const { goToMinimal, goToProgress, goToBranded } = useSplashActions()

  const testSpringAnimation = useCallback(() => {
    playMove(false)
  }, [playMove])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
    playMove(false)
  }, [playMove])

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
      playMove(false)
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }, [playMove])

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