import { useCallback } from 'react'
import { useChessAudio } from '../../services/audio/audioService'

/**
 * Play page actions - extracted from PlayPage controls
 */
export function usePlayActions() {
  const { playMove } = useChessAudio()

  const newGame = useCallback(() => {
    playMove(false)
    // TODO: Implement actual new game logic when PlayPage has it
  }, [playMove])

  const pauseGame = useCallback(() => {
    playMove(false)
    // TODO: Implement actual pause logic when PlayPage has it
  }, [playMove])

  const showMoves = useCallback(() => {
    playMove(false)
    // TODO: Implement actual show moves logic when PlayPage has it
  }, [playMove])

  const undoMove = useCallback(() => {
    playMove(false)
    // TODO: Implement actual undo logic when PlayPage has it
  }, [playMove])

  return {
    newGame,
    pauseGame,
    showMoves,
    undoMove
  }
}