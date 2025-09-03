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
      <div className="absolute inset-0 bg-gaming-gradient" />
      
      {/* Floating Orbs - Gaming Style */}
      <div className="absolute top-20 left-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 floating-particle floating-particle-primary rounded-full blur-sm animate-pulse-glow animate-drift animation-delay-500" />
      <div className="absolute top-40 right-32 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 floating-particle floating-particle-secondary rounded-full blur-sm animate-pulse-glow animate-hover animation-delay-1000" />
      <div className="absolute bottom-32 left-40 w-10 h-10 sm:w-15 sm:h-15 lg:w-20 lg:h-20 floating-particle floating-particle-primary rounded-full blur-sm animate-pulse-glow animate-float animation-delay-2000" />
      <div className="absolute bottom-20 right-20 w-14 h-14 sm:w-21 sm:h-21 lg:w-28 lg:h-28 floating-particle floating-particle-secondary rounded-full blur-sm animate-pulse-glow animate-drift" />
      
      {/* Floating Chess Pieces */}
      <div className="absolute top-1/4 left-1/4 text-3xl sm:text-5xl md:text-6xl lg:text-8xl animate-float animation-delay-100" style={{color: 'color-mix(in srgb, var(--foreground) 15%, transparent)'}}>♛</div>
      <div className="absolute top-1/3 right-1/3 text-2xl sm:text-4xl md:text-5xl lg:text-7xl animate-float animation-delay-500" style={{color: 'color-mix(in srgb, var(--primary) 30%, transparent)'}}>♔</div>
      <div className="absolute bottom-1/4 right-1/4 text-2xl sm:text-3xl md:text-4xl lg:text-6xl animate-float animation-delay-1000" style={{color: 'color-mix(in srgb, var(--foreground) 15%, transparent)'}}>♝</div>
      <div className="absolute bottom-1/3 left-1/3 text-2xl sm:text-4xl md:text-5xl lg:text-7xl animate-float animation-delay-1500" style={{color: 'color-mix(in srgb, var(--primary) 20%, transparent)'}}>♞</div>
      <div className="absolute top-2/3 left-1/5 text-2xl sm:text-3xl md:text-4xl lg:text-6xl animate-float animation-delay-2000" style={{color: 'color-mix(in srgb, var(--foreground) 15%, transparent)'}}>♜</div>
      <div className="absolute bottom-2/3 right-1/5 text-xl sm:text-2xl md:text-3xl lg:text-5xl animate-float animation-delay-800" style={{color: 'color-mix(in srgb, var(--primary) 20%, transparent)'}}>♟</div>
      
      {/* Sparkle Effects */}
      <div className="absolute top-1/4 right-1/4 w-2 h-2 sparkle animate-twinkle animation-delay-100" style={{backgroundColor: 'var(--primary)'}} />
      <div className="absolute top-1/3 left-1/3 w-1.5 h-1.5 sparkle animate-twinkle animation-delay-500" style={{backgroundColor: 'var(--accent)'}} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 sparkle animate-twinkle animation-delay-1000" style={{backgroundColor: 'var(--primary)'}} />
      <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 sparkle animate-twinkle animation-delay-200" style={{backgroundColor: 'var(--accent)'}} />
      <div className="absolute top-2/3 right-1/5 w-1 h-1 sparkle animate-twinkle animation-delay-2000" style={{backgroundColor: 'var(--primary)'}} />
      <div className="absolute bottom-2/3 left-1/5 w-1 h-1 sparkle animate-twinkle animation-delay-1500" style={{backgroundColor: 'var(--accent)'}} />
      
      {/* Additional ambient orbs for depth */}
      <div className="absolute top-1/2 left-1/6 w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 floating-particle floating-particle-primary rounded-full blur-md animate-pulse-glow animate-hover animation-delay-1500" />
      <div className="absolute top-3/4 right-1/6 w-6 h-6 sm:w-9 sm:h-9 lg:w-12 lg:h-12 floating-particle floating-particle-secondary rounded-full blur-md animate-pulse-glow animate-drift animation-delay-800" />
      
      {/* More chess pieces for richness */}
      <div className="absolute top-1/5 right-1/5 text-xl sm:text-2xl md:text-3xl lg:text-5xl animate-float animation-delay-300" style={{color: 'color-mix(in srgb, var(--accent) 20%, transparent)'}}>♕</div>
      <div className="absolute bottom-1/5 left-1/5 text-xl sm:text-2xl md:text-3xl lg:text-5xl animate-float animation-delay-1800" style={{color: 'color-mix(in srgb, var(--accent) 20%, transparent)'}}>♗</div>
    </div>
  )
}