import { useChessAudio } from '../services/audioService'
import { useIsMobile } from './useIsMobile'

/**
 * Chess-themed hover sound hook
 * Uses chess move sound for UI hover feedback
 * Skips hover sounds on mobile devices (no hover on touch)
 */
export function useUIHoverSound() {
  const { playMove } = useChessAudio()
  const isMobile = useIsMobile()
  
  const playUIHover = (_context?: string) => {
    // Skip hover sounds on mobile devices (no hover on touch)
    if (isMobile) {
      return
    }
    
    try {
      // Play chess move sound for hover feedback
      playMove(false) // false = move sound (not capture)
    } catch (error) {
      console.warn(`🔊 [UI HOVER] Failed to play hover sound:`, error)
    }
  }
  
  return { playUIHover }
}