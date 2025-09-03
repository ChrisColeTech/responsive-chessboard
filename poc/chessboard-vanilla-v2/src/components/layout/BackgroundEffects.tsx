import { useEffect, useState } from 'react'

interface BackgroundEffectsProps {
  className?: string
}

export function BackgroundEffects({ className = '' }: BackgroundEffectsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Full-screen theme gradient background */}
      <div className="absolute inset-0 bg-theme-gradient" />
      
      {/* Floating Orbs - Gaming Style */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/30 rounded-full blur-sm animate-pulse-glow animate-drift animation-delay-500" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/30 rounded-full blur-sm animate-pulse-glow animate-hover animation-delay-1000" />
      <div className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-orange-600/30 rounded-full blur-sm animate-pulse-glow animate-float animation-delay-2000" />
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-purple-400/20 to-purple-600/30 rounded-full blur-sm animate-pulse-glow animate-drift" />
      
      {/* Floating Chess Pieces */}
      <div className="absolute top-1/4 left-1/4 text-8xl text-gray-700/15 dark:text-white/25 animate-float animation-delay-100">♛</div>
      <div className="absolute top-1/3 right-1/3 text-7xl text-gray-700/20 dark:text-white/30 animate-float animation-delay-500">♔</div>
      <div className="absolute bottom-1/4 right-1/4 text-6xl text-gray-700/15 dark:text-white/25 animate-float animation-delay-1000">♝</div>
      <div className="absolute bottom-1/3 left-1/3 text-7xl text-gray-700/20 dark:text-white/30 animate-float animation-delay-1500">♞</div>
      <div className="absolute top-2/3 left-1/5 text-6xl text-gray-700/15 dark:text-white/25 animate-float animation-delay-2000">♜</div>
      <div className="absolute bottom-2/3 right-1/5 text-5xl text-gray-700/20 dark:text-white/30 animate-float animation-delay-800">♟</div>
      
      {/* Sparkle Effects */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-gray-700 dark:bg-white rounded-full animate-twinkle animation-delay-100" />
      <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full animate-twinkle animation-delay-500" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-gray-700 dark:bg-white rounded-full animate-twinkle animation-delay-1000" />
      <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-gray-700 dark:bg-white rounded-full animate-twinkle animation-delay-200" />
      <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-gray-700 dark:bg-white rounded-full animate-twinkle animation-delay-2000" />
      <div className="absolute bottom-2/3 left-1/5 w-1 h-1 bg-gray-700 dark:bg-white rounded-full animate-twinkle animation-delay-1500" />
      
      {/* Additional ambient orbs for depth */}
      <div className="absolute top-1/2 left-1/6 w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-cyan-600/20 rounded-full blur-md animate-pulse-glow animate-hover animation-delay-1500" />
      <div className="absolute top-3/4 right-1/6 w-12 h-12 bg-gradient-to-br from-pink-400/10 to-pink-600/20 rounded-full blur-md animate-pulse-glow animate-drift animation-delay-800" />
      
      {/* More chess pieces for richness */}
      <div className="absolute top-1/5 right-1/5 text-5xl text-gray-700/12 dark:text-white/20 animate-float animation-delay-300">♕</div>
      <div className="absolute bottom-1/5 left-1/5 text-5xl text-gray-700/12 dark:text-white/20 animate-float animation-delay-1800">♗</div>
    </div>
  )
}