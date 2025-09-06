import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

export function useBrandedSplashActions() {
  const { playMove } = useChessAudio()

  const testBrandAnimation = useCallback(() => {
    console.log('🎨 [BRANDED SPLASH ACTIONS] Testing brand animation')
    playMove(false)
  }, [playMove])

  return {
    testBrandAnimation
  }
}