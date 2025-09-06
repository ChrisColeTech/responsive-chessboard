import { useCallback, useState, useEffect, useMemo } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

interface EngineComponent {
  id: string
  icon: string
  label: string
  name: string
  delay: number
}

/**
 * Hook for Chess Engine Loading Dashboard - Animated Variant (CONCEPT 2)
 * 
 * DESIGN INTENT: Engine components materialize sequentially with physics-based animations.
 * Shows visual assembly of engine system - core, database, tablebase, analysis tools.
 * Creates engaging technical process that builds anticipation for engine capabilities.
 */
export function useAnimatedSplashActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [activeComponents, setActiveComponents] = useState<number>(0)
  const [currentStatus, setCurrentStatus] = useState('Setting up your chess training...')
  const { goToMinimal, goToProgress, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Memoize chess learning components to prevent recreating on every render
  const engineComponents: EngineComponent[] = useMemo(() => [
    { id: 'training', icon: '♔', label: 'Training', name: 'Setting up your training', delay: 800 },
    { id: 'openings', icon: '♛', label: 'Openings', name: 'Loading opening lessons', delay: 900 },
    { id: 'tactics', icon: '♜', label: 'Tactics', name: 'Preparing tactical puzzles', delay: 1000 },
    { id: 'analysis', icon: '♝', label: 'Analysis', name: 'Getting analysis ready', delay: 800 }
  ], [])

  // Progressive engine component assembly
  useEffect(() => {
    setActiveComponents(0)
    setCurrentStatus('Setting up your chess training...')

    let timeoutId: NodeJS.Timeout

    const assembleComponents = (index: number) => {
      if (index >= engineComponents.length) {
        setCurrentStatus('Ready to improve your chess!')
        return
      }

      const { name, delay } = engineComponents[index]
      
      timeoutId = setTimeout(() => {
        setActiveComponents(index + 1)
        setCurrentStatus(`Loading ${name}... (${index + 1}/${engineComponents.length})`)
        assembleComponents(index + 1)
      }, delay)
    }

    // Start assembly after short delay
    const initialTimeout = setTimeout(() => {
      assembleComponents(0)
    }, 500)

    return () => {
      clearTimeout(initialTimeout)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [animationKey, engineComponents])

  const testSpringAnimation = useCallback(() => {
    // No audio needed for animation test
  }, [])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
  }, [])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('animatedsplash')
  }, [openSplashModal])

  const progress = (activeComponents / engineComponents.length) * 100

  return {
    testSpringAnimation,
    restartAnimation,
    toggleFullscreen,
    engineComponents,
    activeComponents,
    currentStatus,
    progress,
    // Cross-navigation
    goToMinimal,
    goToProgress,
    goToBranded,
    animationKey
  }
}