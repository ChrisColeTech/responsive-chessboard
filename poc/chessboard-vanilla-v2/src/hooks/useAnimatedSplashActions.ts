import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

export function useAnimatedSplashActions() {
  const { playMove } = useChessAudio()

  const testSpringAnimation = useCallback(() => {
    console.log('🎨 [ANIMATED SPLASH ACTIONS] Testing spring animation')
    playMove(false)
  }, [playMove])

  return {
    testSpringAnimation
  }
}