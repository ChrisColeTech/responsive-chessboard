import useSound from 'use-sound'

/**
 * Reusable hook for UI hover sounds
 * Provides subtle hover sound feedback across all interactive components
 */
export function useUIHoverSound() {
  const [playHover] = useSound('/sounds/move.mp3', {
    volume: 0.15, // Lower volume than clicks for subtle hover feedback
    playbackRate: 1.2, // Slightly higher pitch to differentiate from clicks
  })
  
  const playUIHover = (_context?: string) => {
    try {
      playHover()
    } catch (error) {
      console.warn(`🔊 [UI HOVER] Failed to play hover sound:`, error)
    }
  }
  
  return { playUIHover }
}