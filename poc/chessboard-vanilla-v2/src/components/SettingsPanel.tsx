import { Settings, X, Sun, Moon } from 'lucide-react'
import { baseThemes, type BaseTheme } from './ThemeSwitcher'
import { useTheme } from '../stores/appStore'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { isDarkMode, selectedBaseTheme, setBaseTheme, toggleMode } = useTheme()

  const handleBaseThemeChange = (baseThemeId: BaseTheme) => {
    setBaseTheme(baseThemeId)
  }
  
  const handleModeToggle = () => {
    toggleMode()
  }

  return (
    <div className="w-80 sm:w-96 h-full bg-background border-l border-border shadow-2xl">
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

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Light/Dark Mode Toggle */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Brightness
            </h3>
            <div className="flex items-center justify-center p-1 bg-muted/30 rounded-lg border border-border">
              <button
                onClick={handleModeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  !isDarkMode 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={handleModeToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  isDarkMode 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span className="text-sm font-medium">Dark</span>
              </button>
            </div>
          </div>

          {/* Theme Section */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Theme
            </h3>
            <div className="grid grid-cols-2 gap-3">
            {baseThemes.map((baseTheme) => {
              const isActive = selectedBaseTheme === baseTheme.id
              const ThemeIcon = baseTheme.icon
              const preview = isDarkMode ? baseTheme.darkPreview : baseTheme.lightPreview
              
              return (
                <button
                  key={baseTheme.id}
                  onClick={() => handleBaseThemeChange(baseTheme.id)}
                  className={`
                    flex flex-col items-center gap-3 p-4 rounded-xl border transition-all
                    ${isActive 
                      ? 'bg-primary/20 border-primary text-primary shadow-lg ring-2 ring-primary/30' 
                      : 'bg-muted/30 border-border hover:bg-muted/50 hover:border-primary/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <div className={`w-12 h-12 rounded-full border-2 ${preview} flex items-center justify-center`}>
                    <ThemeIcon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{baseTheme.name}</div>
                    <div className="text-xs opacity-70 leading-tight mt-1">{baseTheme.description}</div>
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
  )
}