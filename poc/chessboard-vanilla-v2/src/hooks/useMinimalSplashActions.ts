import { useCallback, useState, useEffect } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

/**
 * Hook for Chess Engine Loading Dashboard - Minimal Variant (CONCEPT 2)
 * 
 * DESIGN INTENT: Clean engine initialization display with technical credibility.
 * Shows sequential service loading - engine core, opening database, tablebase, analysis tools.
 * Focus on transparency and trust through realistic engine startup sequence.
 */
export function useMinimalSplashActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Setting up your training...')
  const { goToAnimated, goToProgress, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Training setup sequence - realistic timing for readability
  useEffect(() => {
    setProgress(0)
    setStatus('Setting up your training...')

    const trainingSetupSequence = [
      { progress: 25, status: 'Loading chess lessons...', delay: 800 },
      { progress: 50, status: 'Preparing practice puzzles...', delay: 1000 },
      { progress: 75, status: 'Getting analysis ready...', delay: 700 },
      { progress: 100, status: 'Ready to improve your chess!', delay: 500 }
    ]

    const timeouts: NodeJS.Timeout[] = []
    let currentDelay = 300

    trainingSetupSequence.forEach((step) => {
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

  const testMinimalLoad = useCallback(() => {
    // No audio needed for loading test
  }, [])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
    setProgress(0)
    setStatus('Initializing...')
  }, [])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('minimalsplash')
  }, [openSplashModal])

  return {
    testMinimalLoad,
    restartAnimation,
    toggleFullscreen,
    progress,
    status,
    // Cross-navigation
    goToAnimated,
    goToProgress,
    goToBranded,
    animationKey
  }
}