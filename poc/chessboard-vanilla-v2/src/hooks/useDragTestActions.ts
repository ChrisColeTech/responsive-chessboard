import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

/**
 * Drag Test page actions - extracted from DragTestPage controls
 */
export function useDragTestActions() {
  const { playMove, playError } = useChessAudio()

  const resetBoard = useCallback(() => {
    console.log('🔄 [DRAG TEST ACTIONS] Resetting board')
    if (typeof window !== 'undefined' && (window as any).__testBoardReset) {
      (window as any).__testBoardReset()
    }
  }, [])

  const testMoveSound = useCallback(() => {
    console.log('🔊 [DRAG TEST ACTIONS] Testing move sound')
    playMove(false)
  }, [playMove])

  const testCaptureSound = useCallback(() => {
    console.log('🎯 [DRAG TEST ACTIONS] Testing capture sound')
    playMove(true)
  }, [playMove])

  const testErrorSound = useCallback(() => {
    console.log('⚔️ [DRAG TEST ACTIONS] Testing error sound')
    playError()
  }, [playError])

  const togglePiecesPosition = useCallback(() => {
    console.log('🔄 [DRAG TEST ACTIONS] Toggle pieces position requested')
    if (typeof window !== 'undefined' && (window as any).__togglePiecesPosition) {
      (window as any).__togglePiecesPosition()
      playMove(false)
    }
  }, [playMove])

  return {
    resetBoard,
    testMoveSound,
    testCaptureSound,
    testErrorSound,
    togglePiecesPosition
  }
}