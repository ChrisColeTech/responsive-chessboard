import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'
import { useAppStore } from '../stores/appStore'

/**
 * Slots page actions - extracted from SlotMachineTestPage controls
 */
export function useSlotsActions() {
  const { playMove, playError } = useChessAudio()
  const setCoinBalance = useAppStore((state) => state.setCoinBalance)

  const testSpin = useCallback(() => {
    console.log('🎰 [SLOTS ACTIONS] Test spin initiated')
    playMove(false)
    // This matches the existing SlotMachine test spin button logic
  }, [playMove])

  const testWin = useCallback(() => {
    console.log('🏆 [SLOTS ACTIONS] Test win sound')
    playMove(false)
    // Test win sound logic
  }, [playMove])

  const testLose = useCallback(() => {
    console.log('💸 [SLOTS ACTIONS] Test lose sound') 
    playError()
    // Test lose sound logic
  }, [playError])

  const resetCoins = useCallback(() => {
    console.log('🔄 [SLOTS ACTIONS] Coins reset to 1000')
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