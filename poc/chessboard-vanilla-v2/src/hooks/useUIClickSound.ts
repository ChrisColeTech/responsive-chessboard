import useSound from 'use-sound'

/**
 * Reusable hook for UI click sounds
 * Provides consistent click sound across all components
 */
export function useUIClickSound() {
  const [playClick] = useSound('/sounds/move.mp3', {
    volume: 0.3, // Consistent volume for all UI interactions
  })
  
  const playUIClick = (_context?: string) => {
    try {
      playClick()
    } catch (error) {
      console.warn(`🔊 [UI CLICK] Failed to play click sound:`, error)
    }
  }
  
  return { playUIClick }
}