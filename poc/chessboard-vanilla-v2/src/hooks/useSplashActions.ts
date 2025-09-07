import { useCallback } from 'react'
import { useAppStore } from '../stores/appStore'

export function useSplashActions() {
  const setCurrentChildPage = useAppStore((state) => state.setCurrentChildPage)

  const goToMinimal = useCallback(() => {
    setCurrentChildPage('minimalsplash')
  }, [setCurrentChildPage])

  const goToAnimated = useCallback(() => {
    setCurrentChildPage('animatedsplash')
  }, [setCurrentChildPage])

  const goToProgress = useCallback(() => {
    setCurrentChildPage('loadingprogress')
  }, [setCurrentChildPage])

  const goToBranded = useCallback(() => {
    setCurrentChildPage('brandedsplash')
  }, [setCurrentChildPage])

  return {
    goToMinimal,
    goToAnimated,
    goToProgress,
    goToBranded
  }
}