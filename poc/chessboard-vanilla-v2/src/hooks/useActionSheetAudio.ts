import { useCallback } from 'react'
import { useUIClickSound } from './useUIClickSound'
import { useChessAudio } from '../services/audioService'

/**
 * Hook for action sheet audio integration
 * Following established pattern from useUIClickSound.ts and useChessAudio()
 * SRP - ONLY handles action sheet specific audio, no other business logic
 */
export function useActionSheetAudio() {
  const { playUIClick } = useUIClickSound()
  const { playMove } = useChessAudio()

  const playActionSound = useCallback((actionId: string, actionLabel: string) => {
    // Different sounds for different action types following the MenuDropdown pattern
    if (actionId.includes('game') || actionId.includes('move') || actionId.includes('chess')) {
      playMove(false) // Chess-related actions use move sound (non-capture)
      console.log(`🔊 [ACTION AUDIO] Move sound for chess action: ${actionLabel}`)
    } else if (actionId.includes('test-win') || actionId.includes('win')) {
      playMove(true) // Win actions use capture sound for excitement  
      console.log(`🔊 [ACTION AUDIO] Win sound for: ${actionLabel}`)
    } else {
      playUIClick(`Action: ${actionLabel}`)
      console.log(`🔊 [ACTION AUDIO] UI click sound for: ${actionLabel}`)
    }
  }, [playUIClick, playMove])

  return {
    playActionSound
  }
}