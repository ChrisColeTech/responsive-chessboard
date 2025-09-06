import { useCallback, useState, useEffect } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

export function useMinimalSplashActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')
  const { goToAnimated, goToProgress, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Realistic loading simulation for minimal splash
  useEffect(() => {
    const loadingSequence = [
      { progress: 15, status: 'Loading chess engine...', delay: 200 },
      { progress: 35, status: 'Preparing board...', delay: 300 },
      { progress: 65, status: 'Loading piece sets...', delay: 250 },
      { progress: 85, status: 'Finalizing setup...', delay: 200 },
      { progress: 100, status: 'Ready', delay: 150 }
    ]

    let timeoutId: NodeJS.Timeout

    const runSequence = (index: number) => {
      if (index >= loadingSequence.length) return

      const { progress: newProgress, status: newStatus, delay } = loadingSequence[index]
      
      timeoutId = setTimeout(() => {
        setProgress(newProgress)
        setStatus(newStatus)
        runSequence(index + 1)
      }, delay)
    }

    runSequence(0)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
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