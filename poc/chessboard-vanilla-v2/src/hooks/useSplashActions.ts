import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'
import { useAppStore } from '../stores/appStore'

export function useSplashActions() {
  const { playMove } = useChessAudio()
  const setCurrentChildPage = useAppStore((state) => state.setCurrentChildPage)

  const goToMinimal = useCallback(() => {
    console.log('🎨 [SPLASH ACTIONS] Navigate to minimal splash')
    setCurrentChildPage('minimalsplash')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  const goToAnimated = useCallback(() => {
    console.log('🎨 [SPLASH ACTIONS] Navigate to animated splash')
    setCurrentChildPage('animatedsplash')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  const goToProgress = useCallback(() => {
    console.log('🎨 [SPLASH ACTIONS] Navigate to progress splash')
    setCurrentChildPage('loadingprogress')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  const goToBranded = useCallback(() => {
    console.log('🎨 [SPLASH ACTIONS] Navigate to branded splash')
    setCurrentChildPage('brandedsplash')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  return {
    goToMinimal,
    goToAnimated,
    goToProgress,
    goToBranded
  }
}