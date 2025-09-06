import { useCallback, useState, useEffect, useMemo } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

interface EngineComponent {
  id: string
  name: string
  description: string
  targetProgress: number
  color: string
  delay: number
  speed: number
}

/**
 * Hook for Engine Loading Dashboard (Variant 1D)
 * 
 * DESIGN INTENT: Simulates sequential service initialization for a SINGLE progress bar.
 * Overall progress advances in chunks (0% → 25% → 50% → 75% → 100%) as each 
 * service completes initialization. NOT for multiple individual progress bars.
 * 
 * The overallProgress value drives the single progress bar in LoadingProgressPage.
 * The currentStatus shows which service is currently being initialized.
 */
export function useLoadingProgressActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [componentProgress, setComponentProgress] = useState<Record<string, number>>({})
  const [currentStatus, setCurrentStatus] = useState('Starting Master Chess Training...')
  const [activeComponents, setActiveComponents] = useState<Set<string>>(new Set())
  const { goToMinimal, goToAnimated, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Memoize engine components to prevent recreation
  // TIMING: Slower delays so users can read what's being loaded
  const engineComponents: EngineComponent[] = useMemo(() => [
    {
      id: 'engine',
      name: 'Engine Core',
      description: 'Initializing chess analysis engine',
      targetProgress: 100,
      color: 'rgb(59, 130, 246)', // Blue
      delay: 500, // Increased from 0 to give initial pause
      speed: 1500 // Slower loading per component
    },
    {
      id: 'database',
      name: 'Opening Database',
      description: 'Loading master chess openings',
      targetProgress: 100,
      color: 'rgb(34, 197, 94)', // Green
      delay: 2000, // Increased from 200 - more time to read engine status
      speed: 1500
    },
    {
      id: 'tablebase',
      name: 'Tablebase',
      description: 'Loading endgame databases',
      targetProgress: 100,
      color: 'rgb(249, 115, 22)', // Orange
      delay: 3500, // Increased from 600 - more time to read database status
      speed: 1500
    },
    {
      id: 'analysis',
      name: 'Analysis Tools',
      description: 'Preparing position evaluation',
      targetProgress: 100,
      color: 'rgb(168, 85, 247)', // Purple
      delay: 5000, // Increased from 1000 - more time to read tablebase status
      speed: 1500
    }
  ], [])

  // Engine loading simulation
  useEffect(() => {
    setComponentProgress({})
    setActiveComponents(new Set())
    setCurrentStatus('Starting Master Chess Training...')

    const intervals: NodeJS.Timeout[] = []

    engineComponents.forEach((component) => {
      const startTimeout = setTimeout(() => {
        setActiveComponents(prev => new Set([...prev, component.id]))
        setCurrentStatus(`Loading ${component.description}...`)

        const interval = setInterval(() => {
          setComponentProgress(prev => {
            const current = prev[component.id] || 0
            if (current >= component.targetProgress) {
              clearInterval(interval)
              return prev
            }
            const increment = Math.random() * 5 + 2 // Random increment 2-7%
            return {
              ...prev,
              [component.id]: Math.min(current + increment, component.targetProgress)
            }
          })
        }, component.speed / 20) // Update frequency based on speed

        intervals.push(interval)
      }, component.delay)

      intervals.push(startTimeout)
    })

    // Set final status when all complete - increased timing to match slower loading
    const finalTimeout = setTimeout(() => {
      setCurrentStatus('Master Chess Training ready for analysis')
    }, 7000) // Increased from 3000 to accommodate slower component loading
    intervals.push(finalTimeout)

    return () => {
      intervals.forEach(clearInterval)
    }
  }, [animationKey, engineComponents])

  const testProgressBar = useCallback(() => {
    // No audio needed for engine loading test
  }, [])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
  }, [])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('loadingprogress')
  }, [openSplashModal])

  const overallProgress = useMemo(() => {
    const totalProgress = engineComponents.reduce((sum, component) => {
      return sum + (componentProgress[component.id] || 0)
    }, 0)
    return Math.round(totalProgress / engineComponents.length)
  }, [componentProgress, engineComponents])

  return {
    testProgressBar,
    restartAnimation,
    toggleFullscreen,
    engineComponents,
    componentProgress,
    currentStatus,
    activeComponents,
    overallProgress,
    // Cross-navigation
    goToMinimal,
    goToAnimated,
    goToBranded,
    animationKey
  }
}