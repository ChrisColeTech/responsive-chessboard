import { useCallback, useState } from 'react'
import { useChessAudio } from '../services/audioService'
import { useSplashActions } from './useSplashActions'

export function useMinimalSplashActions() {
  const { playMove } = useChessAudio()
  const [animationKey, setAnimationKey] = useState(0)
  const { goToAnimated, goToProgress, goToBranded } = useSplashActions()

  const testMinimalLoad = useCallback(() => {
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