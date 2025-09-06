import { useCallback } from 'react'
import { useChessAudio } from '../services/audioService'
import { useAppStore } from '../stores/appStore'

export function useSplashActions() {
  const { playMove } = useChessAudio()
  const setCurrentChildPage = useAppStore((state) => state.setCurrentChildPage)

  const goToMinimal = useCallback(() => {
    setCurrentChildPage('minimalsplash')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  const goToAnimated = useCallback(() => {
    setCurrentChildPage('animatedsplash')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  const goToProgress = useCallback(() => {
    setCurrentChildPage('loadingprogress')
    playMove(false)
  }, [setCurrentChildPage, playMove])

  const goToBranded = useCallback(() => {
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