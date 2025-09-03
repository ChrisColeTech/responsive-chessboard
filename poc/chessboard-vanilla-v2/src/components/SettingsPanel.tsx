import { useState, useEffect } from 'react'
import { Settings, X } from 'lucide-react'
import { themes, type ThemeId } from './ThemeSwitcher'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('dark')
  const [currentThemeInfo, setCurrentThemeInfo] = useState<any>(null)

  // Update theme data when panel opens
  useEffect(() => {
    if (isOpen) {
      // Try to get current theme from localStorage first
      const savedTheme = localStorage.getItem('chess-app-theme') as ThemeId || 'dark'
      const themeInfo = themes.find(t => t.id === savedTheme)
      
      setCurrentTheme(savedTheme)
      setCurrentThemeInfo(themeInfo)
      
      // Also try global function if available
      if (typeof window !== 'undefined' && (window as any).__getCurrentTheme) {
        try {
          const globalTheme = (window as any).__getCurrentTheme()
          if (globalTheme && globalTheme !== savedTheme) {
            setCurrentTheme(globalTheme)
            setCurrentThemeInfo(themes.find(t => t.id === globalTheme))
          }
        } catch (e) {
          console.log('Global theme function not ready yet, using localStorage')
        }
      }
    }
  }, [isOpen])

  const handleThemeChange = (themeId: ThemeId) => {
    // Use global theme setter
    if (typeof window !== 'undefined' && (window as any).__setTheme) {
      (window as any).__setTheme(themeId)
    }
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
          onClick={onClose}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 sm:w-96 bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl z-50
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-muted/50 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Theme Display */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className={`w-10 h-10 rounded-full border-2 ${currentThemeInfo?.preview || 'bg-slate-900 border-slate-700'} flex items-center justify-center`}>
                {(() => {
                  const CurrentIcon = currentThemeInfo?.icon || Settings
                  return <CurrentIcon className="w-5 h-5" />
                })()}
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {currentThemeInfo?.name || 'Current Theme'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentThemeInfo?.description || 'Active theme'}
                </div>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* Theme Section */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => {
                const isActive = currentTheme === theme.id
                const ThemeIcon = theme.icon
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`
                      flex flex-col items-center gap-3 p-4 rounded-xl border transition-all
                      ${isActive 
                        ? 'bg-primary/20 border-primary text-primary shadow-lg ring-2 ring-primary/30' 
                        : 'bg-muted/30 border-border hover:bg-muted/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 ${theme.preview} flex items-center justify-center`}>
                      <ThemeIcon className="w-6 h-6" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-medium">{theme.name}</div>
                      <div className="text-xs opacity-70 leading-tight mt-1">{theme.description}</div>
                    </div>
                  </button>
                )
              })}
              </div>
            </div>

            {/* Future Settings Sections */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">Other Settings</h3>
              <div className="text-sm text-muted-foreground">
                More settings will be added here...
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted-foreground text-center">
              Settings Panel - Theme & More
            </div>
          </div>
        </div>
      </div>
    </>
  )
}