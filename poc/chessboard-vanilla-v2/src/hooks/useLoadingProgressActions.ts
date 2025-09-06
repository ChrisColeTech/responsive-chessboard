import { useCallback, useState, useEffect, useMemo } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

interface TrainingComponent {
  id: string
  name: string
  description: string
  icon: string
  targetProgress: number
  color: string
  delay: number
  speed: number
}

/**
 * Hook for Chess Engine Loading Dashboard - Loading Progress Variant (CONCEPT 2)
 * 
 * DESIGN INTENT: Multiple progress bars showing detailed preparation of chess training components.
 * Each component (lessons, puzzles, analysis, practice) has individual progress tracking.
 * Professional dashboard shows users exactly what's being prepared for their training.
 */
export function useLoadingProgressActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [componentProgress, setComponentProgress] = useState<Record<string, number>>({})
  const [currentStatus, setCurrentStatus] = useState('Preparing your chess training...')
  const [activeComponents, setActiveComponents] = useState<Set<string>>(new Set())
  const { goToMinimal, goToAnimated, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Memoize training components to prevent recreation
  // TIMING: Slower delays so users can read what's being loaded
  const engineComponents: TrainingComponent[] = useMemo(() => [
    {
      id: 'lessons',
      name: 'Chess Lessons',
      description: 'Loading your personalized lessons',
      icon: '♔',
      targetProgress: 100,
      color: 'rgb(59, 130, 246)', // Blue
      delay: 500,
      speed: 1500
    },
    {
      id: 'puzzles',
      name: 'Practice Puzzles',
      description: 'Preparing tactical puzzles',
      icon: '♛',
      targetProgress: 100,
      color: 'rgb(34, 197, 94)', // Green
      delay: 2000, // Increased from 200 - more time to read engine status
      speed: 1500
    },
    {
      id: 'analysis',
      name: 'Game Analysis',
      description: 'Setting up game analysis tools',
      icon: '♜',
      targetProgress: 100,
      color: 'rgb(249, 115, 22)', // Orange
      delay: 3500,
      speed: 1500
    },
    {
      id: 'practice',
      name: 'Training Games',
      description: 'Preparing practice games',
      icon: '♝',
      targetProgress: 100,
      color: 'rgb(168, 85, 247)', // Purple
      delay: 5000,
      speed: 1500
    }
  ], [])

  // Engine loading simulation
  useEffect(() => {
    setComponentProgress({})
    setActiveComponents(new Set())
    setCurrentStatus('Preparing your chess training...')

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
      setCurrentStatus('Ready to improve your chess!')
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