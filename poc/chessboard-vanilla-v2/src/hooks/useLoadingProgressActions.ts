import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'

export function useLoadingProgressActions() {
  const { playMove } = useChessAudio()

  const testProgressBar = useCallback(() => {
    console.log('🎨 [LOADING PROGRESS ACTIONS] Testing progress bar')
    playMove(false)
  }, [playMove])

  return {
    testProgressBar
  }
}