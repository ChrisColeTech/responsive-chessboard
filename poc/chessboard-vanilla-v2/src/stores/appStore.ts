import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'
import type { TabId } from '../components/layout/types'
import type { ThemeId, BaseTheme } from '../components/ThemeSwitcher'

interface AppState {
  // Navigation
  selectedTab: TabId
  
  // Theme
  currentTheme: ThemeId
  isDarkMode: boolean
  selectedBaseTheme: BaseTheme
  
  // Settings
  isSettingsPanelOpen: boolean
  
  // UI State
  lastVisited: Date
}

interface AppActions {
  // Navigation actions
  setSelectedTab: (tab: TabId) => void
  
  // Theme actions
  setTheme: (theme: ThemeId) => void
  setBaseTheme: (baseTheme: BaseTheme) => void
  toggleMode: () => void
  
  // Settings actions
  openSettings: () => void
  closeSettings: () => void
  toggleSettings: () => void
  
  // Utility actions
  reset: () => void
}

type AppStore = AppState & AppActions

const initialState: AppState = {
  selectedTab: 'layout',
  currentTheme: 'dark',
  isDarkMode: true,
  selectedBaseTheme: 'default',
  isSettingsPanelOpen: false,
  lastVisited: new Date(),
}

export const useAppStore = create<AppStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
      ...initialState,
      
      // Navigation actions
      setSelectedTab: (tab) => set({ selectedTab: tab }),
      
      // Theme actions
      setTheme: (theme) => {
        // Determine base theme and mode from theme ID
        let baseTheme: BaseTheme = 'default'
        let isDark = true
        
        if (theme === 'light' || theme === 'dark') {
          baseTheme = 'default'
          isDark = theme === 'dark'
        } else {
          baseTheme = theme.replace('-light', '') as BaseTheme
          isDark = !theme.endsWith('-light')
        }
        
        set({ 
          currentTheme: theme, 
          selectedBaseTheme: baseTheme,
          isDarkMode: isDark 
        })
        
        // Apply theme to document
        applyThemeToDocument(theme)
      },
      
      setBaseTheme: (baseTheme) => {
        const { isDarkMode } = get()
        let actualTheme: ThemeId
        
        if (baseTheme === 'default') {
          actualTheme = isDarkMode ? 'dark' : 'light'
        } else {
          actualTheme = isDarkMode ? baseTheme : `${baseTheme}-light` as ThemeId
        }
        
        set({ 
          selectedBaseTheme: baseTheme,
          currentTheme: actualTheme 
        })
        
        applyThemeToDocument(actualTheme)
      },
      
      toggleMode: () => {
        const { selectedBaseTheme, isDarkMode } = get()
        const newIsDarkMode = !isDarkMode
        let actualTheme: ThemeId
        
        if (selectedBaseTheme === 'default') {
          actualTheme = newIsDarkMode ? 'dark' : 'light'
        } else {
          actualTheme = newIsDarkMode ? selectedBaseTheme : `${selectedBaseTheme}-light` as ThemeId
        }
        
        set({ 
          isDarkMode: newIsDarkMode,
          currentTheme: actualTheme 
        })
        
        applyThemeToDocument(actualTheme)
      },
      
      // Settings actions
      openSettings: () => set({ isSettingsPanelOpen: true }),
      closeSettings: () => set({ isSettingsPanelOpen: false }),
      toggleSettings: () => set((state) => ({ isSettingsPanelOpen: !state.isSettingsPanelOpen })),
      
      // Utility actions
      reset: () => set(initialState),
    }),
    {
      name: 'chess-app-store',
      partialize: (state) => ({
        selectedTab: state.selectedTab,
        currentTheme: state.currentTheme,
        isDarkMode: state.isDarkMode,
        selectedBaseTheme: state.selectedBaseTheme,
        lastVisited: new Date(),
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.currentTheme) {
          // Apply persisted theme to document on load
          applyThemeToDocument(state.currentTheme)
        }
      },
    })
  )
)

// Helper function to apply theme to document
function applyThemeToDocument(theme: ThemeId) {
  const html = document.documentElement
  
  // Remove all theme classes
  const themeClasses = [
    'dark', 
    'theme-cyber-neon', 
    'theme-cyber-neon-light', 
    'theme-dragon-gold', 
    'theme-dragon-gold-light', 
    'theme-shadow-knight', 
    'theme-shadow-knight-light', 
    'theme-forest-mystique', 
    'theme-forest-mystique-light', 
    'theme-royal-purple', 
    'theme-royal-purple-light'
  ]
  themeClasses.forEach(cls => html.classList.remove(cls))
  
  // Add current theme class
  if (theme === 'dark') {
    html.classList.add('dark')
  } else if (theme !== 'light') {
    html.classList.add(`theme-${theme}`)
  }
}

// Convenience selectors for common state
export const useSelectedTab = () => useAppStore((state) => state.selectedTab)

// Individual hooks to prevent object recreation and infinite re-renders
export const useTheme = () => {
  const currentTheme = useAppStore((state) => state.currentTheme)
  const isDarkMode = useAppStore((state) => state.isDarkMode)
  const selectedBaseTheme = useAppStore((state) => state.selectedBaseTheme)
  const setTheme = useAppStore((state) => state.setTheme)
  const setBaseTheme = useAppStore((state) => state.setBaseTheme)
  const toggleMode = useAppStore((state) => state.toggleMode)
  
  return {
    currentTheme,
    isDarkMode,
    selectedBaseTheme,
    setTheme,
    setBaseTheme,
    toggleMode,
  }
}

export const useSettings = () => {
  const isOpen = useAppStore((state) => state.isSettingsPanelOpen)
  const open = useAppStore((state) => state.openSettings)
  const close = useAppStore((state) => state.closeSettings)
  const toggle = useAppStore((state) => state.toggleSettings)
  
  return {
    isOpen,
    open,
    close,
    toggle,
  }
}