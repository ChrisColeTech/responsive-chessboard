import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

type ThemeId = 'light' | 'dark'

interface Theme {
  id: ThemeId
  name: string
  description: string
}

const themes: Theme[] = [
  { id: 'light', name: 'Light', description: 'Clean light theme' },
  { id: 'dark', name: 'Dark', description: 'Classic dark theme' },
]

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark')

  useEffect(() => {
    // Load saved theme from localStorage
    const saved = localStorage.getItem('chess-app-theme') as ThemeId
    if (saved && themes.some(t => t.id === saved)) {
      setCurrentTheme(saved)
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    const html = document.documentElement
    
    console.log('🎨 [THEME] Applying theme:', currentTheme)
    
    // Remove dark class
    html.classList.remove('dark')
    
    // Add current theme class
    if (currentTheme === 'dark') {
      html.classList.add('dark')
      console.log('🎨 [THEME] Added class: dark')
    } else {
      console.log('🎨 [THEME] Using light theme (no class added)')
    }
    
    console.log('🎨 [THEME] Document classes:', Array.from(html.classList).join(', '))
    
    // Save to localStorage
    localStorage.setItem('chess-app-theme', currentTheme)
  }, [currentTheme])

  const handleThemeChange = (themeId: ThemeId) => {
    setCurrentTheme(themeId)
  }

  return (
    <button
      onClick={() => handleThemeChange(currentTheme === 'light' ? 'dark' : 'light')}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
      title={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`}
    >
      {currentTheme === 'light' ? (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-sm">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-sm">Light</span>
        </>
      )}
    </button>
  )
}