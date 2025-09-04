import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type ThemeId, type BaseTheme } from '../types/theme.types'

interface ThemeContextValue {
  currentTheme: ThemeId
  isDarkMode: boolean
  selectedBaseTheme: BaseTheme
  setTheme: (themeId: ThemeId) => void
  setBaseTheme: (baseTheme: BaseTheme) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [selectedBaseTheme, setSelectedBaseTheme] = useState<BaseTheme>('default')

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('chess-app-theme') as ThemeId || 'dark'
    setCurrentTheme(savedTheme)
    
    // Determine base theme and mode from saved theme
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setSelectedBaseTheme('default')
      setIsDarkMode(savedTheme === 'dark')
    } else {
      const baseThemeId = savedTheme.replace('-light', '') as BaseTheme
      setSelectedBaseTheme(baseThemeId)
      setIsDarkMode(!savedTheme.endsWith('-light'))
    }
  }, [])

  // Apply theme to document when currentTheme changes
  useEffect(() => {
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

  const setTheme = (themeId: ThemeId) => {
    setCurrentTheme(themeId)
    
    // Update derived state
    if (themeId === 'light' || themeId === 'dark') {
      setSelectedBaseTheme('default')
      setIsDarkMode(themeId === 'dark')
    } else {
      const baseThemeId = themeId.replace('-light', '') as BaseTheme
      setSelectedBaseTheme(baseThemeId)
      setIsDarkMode(!themeId.endsWith('-light'))
    }
  }

  const setBaseTheme = (baseTheme: BaseTheme) => {
    setSelectedBaseTheme(baseTheme)
    
    // Calculate the actual theme ID
    let actualThemeId: ThemeId
    if (baseTheme === 'default') {
      actualThemeId = isDarkMode ? 'dark' : 'light'
    } else {
      actualThemeId = isDarkMode ? baseTheme : `${baseTheme}-light` as ThemeId
    }
    
    setCurrentTheme(actualThemeId)
  }

  const toggleMode = () => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
    
    // Calculate the actual theme ID
    let actualThemeId: ThemeId
    if (selectedBaseTheme === 'default') {
      actualThemeId = newIsDarkMode ? 'dark' : 'light'
    } else {
      actualThemeId = newIsDarkMode ? selectedBaseTheme : `${selectedBaseTheme}-light` as ThemeId
    }
    
    setCurrentTheme(actualThemeId)
  }

  const value: ThemeContextValue = {
    currentTheme,
    isDarkMode,
    selectedBaseTheme,
    setTheme,
    setBaseTheme,
    toggleMode
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}