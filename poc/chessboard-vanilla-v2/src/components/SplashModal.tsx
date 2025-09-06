import React from 'react'
import { X } from 'lucide-react'
import { useAppStore } from '../stores/appStore'
import { MinimalSplashPage } from '../pages/splash/MinimalSplashPage'
import { AnimatedSplashPage } from '../pages/splash/AnimatedSplashPage'
import { LoadingProgressPage } from '../pages/splash/LoadingProgressPage'
import { BrandedSplashPage } from '../pages/splash/BrandedSplashPage'

export const SplashModal: React.FC = () => {
  const splashModalOpen = useAppStore((state) => state.splashModalOpen)
  const splashModalPage = useAppStore((state) => state.splashModalPage)
  const closeSplashModal = useAppStore((state) => state.closeSplashModal)

  if (!splashModalOpen || !splashModalPage) {
    return null
  }

  // Get the appropriate splash page component
  let SplashComponent: React.FC
  switch (splashModalPage) {
    case 'minimalsplash':
      SplashComponent = MinimalSplashPage
      break
    case 'animatedsplash':
      SplashComponent = AnimatedSplashPage
      break
    case 'loadingprogress':
      SplashComponent = LoadingProgressPage
      break
    case 'brandedsplash':
      SplashComponent = BrandedSplashPage
      break
    default:
      return null
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeSplashModal}
      />
      
      {/* Modal Content */}
      <div className="relative w-full h-full max-w-none">
        {/* Close button */}
        <button
          onClick={closeSplashModal}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          aria-label="Close splash modal"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Splash page content */}
        <SplashComponent />
      </div>
    </div>
  )
}