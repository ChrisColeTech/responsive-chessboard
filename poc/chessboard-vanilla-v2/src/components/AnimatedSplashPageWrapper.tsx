import React from 'react'
import { usePageInstructions } from '../hooks/usePageInstructions'
import { usePageActions } from '../hooks/usePageActions'
import AnimatedSplashPage from '../pages/splash/AnimatedSplashPage'

export const AnimatedSplashPageWrapper: React.FC = () => {
  usePageInstructions('animatedsplash')
  usePageActions('animatedsplash')
  
  return <AnimatedSplashPage />
}