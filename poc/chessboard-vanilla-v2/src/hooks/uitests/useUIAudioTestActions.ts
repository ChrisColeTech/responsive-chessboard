import { useCallback } from 'react'
import { useChessAudio } from '../../services/audio/audioService'

/**
 * UI Audio Test page actions - placeholder for future audio testing controls
 */
export function useUIAudioTestActions() {
  const { playMove, playError } = useChessAudio()

  const testUISound = useCallback(() => {
    playMove(false)
    // TODO: Implement actual UI audio testing
  }, [playMove])

  const testAudioSystem = useCallback(() => {
    playMove(false)
    // TODO: Implement audio system testing
  }, [playMove])

  const resetAudioSettings = useCallback(() => {
    playError()
    // TODO: Implement audio settings reset
  }, [playError])

  const testMoveSound = useCallback(() => {
    playMove(false)
  }, [playMove])

  const testCaptureSound = useCallback(() => {
    playMove(true)
  }, [playMove])

  const testErrorSound = useCallback(() => {
    playError()
  }, [playError])

  return {
    testUISound,
    testAudioSystem,
    resetAudioSettings,
    testMoveSound,
    testCaptureSound,
    testErrorSound
  }
}