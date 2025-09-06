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

  // Render the appropriate splash page with modal variant
  let splashContent: React.ReactNode
  switch (splashModalPage) {
    case 'minimalsplash':
      splashContent = <MinimalSplashPage variant="modal" />
      break
    case 'animatedsplash':
      splashContent = <AnimatedSplashPage variant="modal" />
      break
    case 'loadingprogress':
      splashContent = <LoadingProgressPage variant="modal" />
      break
    case 'brandedsplash':
      splashContent = <BrandedSplashPage variant="modal" />
      break
    default:
      return null
  }

  return (
    <div className="fixed inset-0 z-[99999]">
      {/* Close button overlay */}
      <button
        onClick={closeSplashModal}
        className="absolute top-6 right-6 z-[99999] p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-sm"
        aria-label="Close splash modal"
      >
        <X className="w-6 h-6" />
      </button>
      
      {/* Full-screen splash content */}
      {splashContent}
    </div>
  )
}