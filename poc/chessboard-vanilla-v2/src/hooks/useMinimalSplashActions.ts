import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

export function useMinimalSplashActions() {
  const { playMove } = useChessAudio()

  const testMinimalLoad = useCallback(() => {
    console.log('🎨 [MINIMAL SPLASH ACTIONS] Testing minimal load animation')
    playMove(false)
  }, [playMove])

  return {
    testMinimalLoad
  }
}