import { useCallback } from 'react'
import { useChessAudio } from '../../services/audio/audioService'

export function useMobileDragTestActions() {
  const { playMove } = useChessAudio()

  const mobileBoardAction = useCallback(() => {
    console.log('🎯 Mobile board action executed')
    playMove(false)
    // Your mobile board action implementation
  }, [playMove])

  const mobileTestSound = useCallback(() => {
    console.log('🚀 Mobile test sound executed')
    playMove(true)
    // Your mobile test sound implementation
  }, [playMove])

  return {
    mobileBoardAction,
    mobileTestSound
  }
}