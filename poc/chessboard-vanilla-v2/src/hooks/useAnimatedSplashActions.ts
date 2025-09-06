import { useCallback, useState, useEffect, useMemo } from 'react'
import { useSplashActions } from './useSplashActions'
import { useAppStore } from '../stores/appStore'

interface PieceAssembly {
  piece: string
  name: string
  delay: number
}

export function useAnimatedSplashActions() {
  const [animationKey, setAnimationKey] = useState(0)
  const [activePieces, setActivePieces] = useState<number>(0)
  const [currentStatus, setCurrentStatus] = useState('Preparing chess mastery...')
  const { goToMinimal, goToProgress, goToBranded } = useSplashActions()
  const openSplashModal = useAppStore((state) => state.openSplashModal)

  // Memoize pieces array to prevent recreating on every render
  const pieces: PieceAssembly[] = useMemo(() => [
    { piece: '♚', name: 'King', delay: 300 },
    { piece: '♛', name: 'Queen', delay: 300 },
    { piece: '♜', name: 'Rook', delay: 300 },
    { piece: '♗', name: 'Bishop', delay: 300 },
    { piece: '♞', name: 'Knight', delay: 300 },
    { piece: '♟', name: 'Pawn', delay: 200 }
  ], [])

  // Progressive piece assembly simulation
  useEffect(() => {
    setActivePieces(0)
    setCurrentStatus('Preparing chess mastery...')

    let timeoutId: NodeJS.Timeout

    const assemblePieces = (index: number) => {
      if (index >= pieces.length) {
        setCurrentStatus('Assembly complete - Ready to play')
        return
      }

      const { name, delay } = pieces[index]
      
      timeoutId = setTimeout(() => {
        setActivePieces(index + 1)
        setCurrentStatus(`${name} positioned... (${index + 1}/${pieces.length})`)
        assemblePieces(index + 1)
      }, delay)
    }

    // Start assembly after short delay
    const initialTimeout = setTimeout(() => {
      assemblePieces(0)
    }, 200)

    return () => {
      clearTimeout(initialTimeout)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [animationKey, pieces])

  const testSpringAnimation = useCallback(() => {
    // No audio needed for animation test
  }, [])

  const restartAnimation = useCallback(() => {
    setAnimationKey(prev => prev + 1)
  }, [])

  const toggleFullscreen = useCallback(() => {
    openSplashModal('animatedsplash')
  }, [openSplashModal])

  const progress = (activePieces / pieces.length) * 100

  return {
    testSpringAnimation,
    restartAnimation,
    toggleFullscreen,
    pieces,
    activePieces,
    currentStatus,
    progress,
    // Cross-navigation
    goToMinimal,
    goToProgress,
    goToBranded,
    animationKey
  }
}