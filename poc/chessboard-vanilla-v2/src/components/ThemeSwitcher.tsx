import { useState, useEffect, useRef } from 'react'
import { Settings, Sun, Moon, Zap, Crown, TreePine, Gem, Shield } from 'lucide-react'

export type ThemeId = 'light' | 'dark' | 'cyber-neon' | 'cyber-neon-light' | 'dragon-gold' | 'dragon-gold-light' | 'shadow-knight' | 'shadow-knight-light' | 'forest-mystique' | 'forest-mystique-light' | 'royal-purple' | 'royal-purple-light'

export type BaseTheme = 'default' | 'cyber-neon' | 'dragon-gold' | 'shadow-knight' | 'forest-mystique' | 'royal-purple'

export interface Theme {
  id: ThemeId
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  preview: string
}

export interface BaseThemeConfig {
  id: BaseTheme
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  darkPreview: string
  lightPreview: string
}

export const themes: Theme[] = [
  { 
    id: 'light', 
    name: 'Light', 
    description: 'Clean light theme', 
    icon: Sun,
    preview: 'bg-slate-50 border-slate-200'
  },
  { 
    id: 'dark', 
    name: 'Dark', 
    description: 'Pure dark elegance', 
    icon: Moon,
    preview: 'bg-gray-900 border-gray-600'
  },
  { 
    id: 'cyber-neon', 
    name: 'Cyber Neon', 
    description: 'Electric neon glow', 
    icon: Zap,
    preview: 'bg-gray-900 border-pink-500'
  },
  { 
    id: 'cyber-neon-light', 
    name: 'Cyber Light', 
    description: 'Bright neon colors', 
    icon: Zap,
    preview: 'bg-purple-50 border-pink-400'
  },
  { 
    id: 'dragon-gold', 
    name: 'Dragon Gold', 
    description: 'Medieval dragon theme', 
    icon: Crown,
    preview: 'bg-orange-950 border-yellow-400'
  },
  { 
    id: 'dragon-gold-light', 
    name: 'Gold Light', 
    description: 'Light dragon theme', 
    icon: Crown,
    preview: 'bg-orange-50 border-red-500'
  },
  { 
    id: 'shadow-knight', 
    name: 'Shadow Knight', 
    description: 'Dark steel armor', 
    icon: Shield,
    preview: 'bg-black border-blue-400'
  },
  { 
    id: 'shadow-knight-light', 
    name: 'Knight Light', 
    description: 'Polished steel', 
    icon: Shield,
    preview: 'bg-blue-50 border-blue-500'
  },
  { 
    id: 'forest-mystique', 
    name: 'Forest Mystique', 
    description: 'Mystic forest theme', 
    icon: TreePine,
    preview: 'bg-green-950 border-green-400'
  },
  { 
    id: 'forest-mystique-light', 
    name: 'Forest Light', 
    description: 'Light forest theme', 
    icon: TreePine,
    preview: 'bg-green-50 border-green-500'
  },
  { 
    id: 'royal-purple', 
    name: 'Royal Purple', 
    description: 'Majestic purple theme', 
    icon: Gem,
    preview: 'bg-purple-950 border-purple-400'
  },
  { 
    id: 'royal-purple-light', 
    name: 'Purple Light', 
    description: 'Lavender royalty', 
    icon: Gem,
    preview: 'bg-purple-100 border-purple-600'
  }
]

export const baseThemes: BaseThemeConfig[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Classic clean theme',
    icon: Settings,
    darkPreview: 'bg-gray-900 border-gray-600',
    lightPreview: 'bg-slate-50 border-slate-200'
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    description: 'Electric neon gaming',
    icon: Zap,
    darkPreview: 'bg-gray-900 border-pink-500',
    lightPreview: 'bg-purple-50 border-pink-400'
  },
  {
    id: 'dragon-gold',
    name: 'Dragon Gold',
    description: 'Medieval dragon power',
    icon: Crown,
    darkPreview: 'bg-orange-950 border-yellow-400',
    lightPreview: 'bg-orange-50 border-red-500'
  },
  {
    id: 'shadow-knight',
    name: 'Shadow Knight',
    description: 'Dark steel armor',
    icon: Shield,
    darkPreview: 'bg-black border-blue-400',
    lightPreview: 'bg-blue-50 border-blue-500'
  },
  {
    id: 'forest-mystique',
    name: 'Forest Mystique',
    description: 'Mystic nature theme',
    icon: TreePine,
    darkPreview: 'bg-green-950 border-green-400',
    lightPreview: 'bg-green-50 border-green-500'
  },
  {
    id: 'royal-purple',
    name: 'Royal Purple',
    description: 'Majestic royal theme',
    icon: Gem,
    darkPreview: 'bg-purple-950 border-purple-400',
    lightPreview: 'bg-purple-100 border-purple-600'
  }
]

interface ThemeSwitcherProps {
  onOpenSettings: () => void
}

export function ThemeSwitcher({ onOpenSettings }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark')
  const currentThemeRef = useRef(currentTheme)
  
  // Keep ref in sync with state
  useEffect(() => {
    currentThemeRef.current = currentTheme
  }, [currentTheme])

  useEffect(() => {
    // Load saved theme from localStorage
    const saved = localStorage.getItem('chess-app-theme') as ThemeId
    if (saved) {
      setCurrentTheme(saved)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    const html = document.documentElement
    
    console.log('🎨 [THEME] Applying theme:', currentTheme)
    
    // Remove all theme classes
    const themeClasses = ['dark', 'theme-cyber-neon', 'theme-cyber-neon-light', 'theme-dragon-gold', 'theme-dragon-gold-light', 'theme-shadow-knight', 'theme-shadow-knight-light', 'theme-forest-mystique', 'theme-forest-mystique-light', 'theme-royal-purple', 'theme-royal-purple-light']
    themeClasses.forEach(cls => html.classList.remove(cls))
    
    // Add current theme class
    if (currentTheme === 'dark') {
      html.classList.add('dark')
    } else if (currentTheme !== 'light') {
      html.classList.add(`theme-${currentTheme}`)
    }
    
    console.log('🎨 [THEME] Document classes:', Array.from(html.classList).join(', '))
    
    // Save to localStorage
    localStorage.setItem('chess-app-theme', currentTheme)
  }, [currentTheme])

  // Expose theme functions globally so SettingsPanel can use them
  useEffect(() => {
    (window as any).__setTheme = (theme: ThemeId) => {
      setCurrentTheme(theme)
    }
    (window as any).__getCurrentTheme = () => currentThemeRef.current
    (window as any).__getThemes = () => themes
    (window as any).__getCurrentThemeInfo = () => themes.find(t => t.id === currentThemeRef.current)
  }, [])

  return (
    <button
      onClick={onOpenSettings}
      className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
      title="Change Theme"
    >
      <Settings className="w-5 h-5" />
    </button>
  )
}