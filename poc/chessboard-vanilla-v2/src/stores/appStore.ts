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
  
  // Audio settings
  audioEnabled: boolean
  audioVolume: number
  moveSound: boolean
  captureSound: boolean
  checkSound: boolean
  uiSounds: boolean
  
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
  
  // Audio actions
  setAudioEnabled: (enabled: boolean) => void
  setAudioVolume: (volume: number) => void
  setMoveSound: (enabled: boolean) => void
  setCaptureSound: (enabled: boolean) => void
  setCheckSound: (enabled: boolean) => void
  setUiSounds: (enabled: boolean) => void
  toggleAudio: () => void
  
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
  audioEnabled: true,
  audioVolume: 0.7,
  moveSound: true,
  captureSound: true,
  checkSound: true,
  uiSounds: true,
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
      
      // Audio actions
      setAudioEnabled: (enabled) => set({ audioEnabled: enabled }),
      setAudioVolume: (volume) => set({ audioVolume: Math.max(0, Math.min(1, volume)) }),
      setMoveSound: (enabled) => set({ moveSound: enabled }),
      setCaptureSound: (enabled) => set({ captureSound: enabled }),
      setCheckSound: (enabled) => set({ checkSound: enabled }),
      setUiSounds: (enabled) => set({ uiSounds: enabled }),
      toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
      
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
        audioEnabled: state.audioEnabled,
        audioVolume: state.audioVolume,
        moveSound: state.moveSound,
        captureSound: state.captureSound,
        checkSound: state.checkSound,
        uiSounds: state.uiSounds,
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

export const useAudio = () => {
  const audioEnabled = useAppStore((state) => state.audioEnabled)
  const audioVolume = useAppStore((state) => state.audioVolume)
  const moveSound = useAppStore((state) => state.moveSound)
  const captureSound = useAppStore((state) => state.captureSound)
  const checkSound = useAppStore((state) => state.checkSound)
  const uiSounds = useAppStore((state) => state.uiSounds)
  
  const setAudioEnabled = useAppStore((state) => state.setAudioEnabled)
  const setAudioVolume = useAppStore((state) => state.setAudioVolume)
  const setMoveSound = useAppStore((state) => state.setMoveSound)
  const setCaptureSound = useAppStore((state) => state.setCaptureSound)
  const setCheckSound = useAppStore((state) => state.setCheckSound)
  const setUiSounds = useAppStore((state) => state.setUiSounds)
  const toggleAudio = useAppStore((state) => state.toggleAudio)
  
  return {
    audioEnabled,
    audioVolume,
    moveSound,
    captureSound,
    checkSound,
    uiSounds,
    setAudioEnabled,
    setAudioVolume,
    setMoveSound,
    setCaptureSound,
    setCheckSound,
    setUiSounds,
    toggleAudio,
  }
}