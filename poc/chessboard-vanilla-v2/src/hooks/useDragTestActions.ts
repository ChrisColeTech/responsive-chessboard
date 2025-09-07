import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

/**
 * Drag Test page actions - extracted from DragTestPage controls
 */
export function useDragTestActions() {
  const { playMove, playError, playGameStart } = useChessAudio()

  const resetBoard = useCallback(() => {
    if (typeof window !== 'undefined' && (window as any).__testBoardReset) {
      (window as any).__testBoardReset()
      playGameStart() // Play welcome/new game sound when resetting board
    }
  }, [playGameStart])

  const testMoveSound = useCallback(() => {
    playMove(false)
  }, [playMove])

  const testCaptureSound = useCallback(() => {
    playMove(true)
  }, [playMove])

  const testErrorSound = useCallback(() => {
    playError()
  }, [playError])

  const togglePiecesPosition = useCallback(() => {
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