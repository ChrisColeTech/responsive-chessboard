import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

/**
 * Play page actions - extracted from PlayPage controls
 */
export function usePlayActions() {
  const { playMove } = useChessAudio()

  const newGame = useCallback(() => {
    console.log('🎯 [PLAY ACTIONS] New game started')
    playMove(false)
    // TODO: Implement actual new game logic when PlayPage has it
  }, [playMove])

  const pauseGame = useCallback(() => {
    console.log('⏸️ [PLAY ACTIONS] Game paused')
    playMove(false)
    // TODO: Implement actual pause logic when PlayPage has it
  }, [playMove])

  const showMoves = useCallback(() => {
    console.log('👁️ [PLAY ACTIONS] Show moves toggled')
    playMove(false)
    // TODO: Implement actual show moves logic when PlayPage has it
  }, [playMove])

  const undoMove = useCallback(() => {
    console.log('↩️ [PLAY ACTIONS] Move undone')
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