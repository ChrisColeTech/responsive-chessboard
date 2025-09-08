import { useCallback } from 'react'
import { useChessAudio } from '../../services/audio/audioService'
import { useAppStore } from '../../stores/appStore'

/**
 * Slots page actions - extracted from SlotMachineTestPage controls
 */
export function useSlotsActions() {
  const { playMove, playError } = useChessAudio()
  const setCoinBalance = useAppStore((state) => state.setCoinBalance)

  const testSpin = useCallback(() => {
    playMove(false)
    // This matches the existing SlotMachine test spin button logic
  }, [playMove])

  const testWin = useCallback(() => {
    playMove(false)
    // Test win sound logic
  }, [playMove])

  const testLose = useCallback(() => {
    playError()
    // Test lose sound logic
  }, [playError])

  const resetCoins = useCallback(() => {
    setCoinBalance(1000)
    playMove(false)
    // Reset coins to default value
  }, [setCoinBalance, playMove])

  return {
    testSpin,
    testWin,
    testLose,
    resetCoins
  }
}