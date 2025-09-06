import { useCallback, useState, useEffect } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

/**
 * Hook for Professional Branding (Variant 1E)
 * 
 * DESIGN INTENT: Premium chess academy entrance with sophisticated loading progression.
 * Shows academy credentials loading sequence with elegant timing and premium messaging.
 */
export function useBrandedSplashActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Accessing Master Chess Training Academy...')
  const { goToMinimal, goToAnimated, goToProgress } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Premium academy loading sequence
  useEffect(() => {
    setProgress(0)
    setStatus('Accessing Master Chess Training Academy...')

    const loadingSequence = [
      { progress: 20, status: 'Verifying premium credentials...', delay: 400 },
      { progress: 45, status: 'Loading GM instruction modules...', delay: 800 },
      { progress: 70, status: 'Preparing tournament environment...', delay: 600 },
      { progress: 90, status: 'Finalizing academy access...', delay: 500 },
      { progress: 100, status: 'Welcome to Elite Chess Training', delay: 300 }
    ]

    const timeouts: NodeJS.Timeout[] = []
    let currentDelay = 200

    loadingSequence.forEach((step) => {
      currentDelay += step.delay
      const timeout = setTimeout(() => {
        setProgress(step.progress)
        setStatus(step.status)
      }, currentDelay)
      timeouts.push(timeout)
    })

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [animationKey])

  const testBrandAnimation = useCallback(() => {
    // No audio needed for premium branding test
  }, [])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
  }, [])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('brandedsplash')
  }, [openSplashModal])

  return {
    progress,
    status,
    testBrandAnimation,
    restartAnimation,
    toggleFullscreen,
    // Cross-navigation
    goToMinimal,
    goToAnimated,
    goToProgress,
    animationKey
  }
}