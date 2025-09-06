import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

/**
 * Layout Test page actions - placeholder implementations for testing background effects
 */
export function useLayoutTestActions() {
  const { playMove } = useChessAudio()

  const testBackgroundEffects = useCallback(() => {
    console.log('🎨 [LAYOUT TEST ACTIONS] Testing background effects')
    playMove(false)
  }, [playMove])

  const toggleThemePreview = useCallback(() => {
    console.log('🎨 [LAYOUT TEST ACTIONS] Toggling theme preview')
    playMove(false)
  }, [playMove])

  return {
    testBackgroundEffects,
    toggleThemePreview
  }
}