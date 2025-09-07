import { useChessAudio } from '../services/audioService'

/**
 * Chess-themed hover sound hook
 * Uses chess move sound for UI hover feedback
 */
export function useUIHoverSound() {
  const { playMove } = useChessAudio()
  
  const playUIHover = (_context?: string) => {
    try {
      // Play chess move sound for hover feedback
      playMove(false) // false = move sound (not capture)
    } catch (error) {
      console.warn(`🔊 [UI HOVER] Failed to play hover sound:`, error)
    }
  }
  
  return { playUIHover }
}