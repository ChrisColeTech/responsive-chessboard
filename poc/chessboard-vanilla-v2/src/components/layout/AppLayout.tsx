import type { ReactNode } from 'react'
import { useState } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Header } from './Header'
import { TabBar } from './TabBar'
import { SettingsPanel } from '../SettingsPanel'
import { ThemeProvider } from '../../contexts/ThemeContext'
import type { TabId } from './types'

interface AppLayoutProps {
  children: ReactNode
  currentTab: TabId
  onTabChange: (tab: TabId) => void
}

export function AppLayout({ children, currentTab, onTabChange }: AppLayoutProps) {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <BackgroundEffects />
        
        {/* Header - fixed height, not fixed position */}
        <header className="flex-shrink-0 relative z-20">
          <Header 
            onOpenSettings={() => setIsSettingsPanelOpen(true)} 
            isSettingsOpen={isSettingsPanelOpen} 
          />
        </header>
        
        {/* Main Content Area - with overlay settings */}
        <div className="flex-1 relative z-10 overflow-hidden">
          {/* Primary Content */}
          <main className="w-full h-full overflow-auto">
            <div className="container mx-auto px-6 py-8 h-full">
              {children}
            </div>
          </main>
          
          {/* Settings Panel - overlays main content from right */}
          <>
            {/* Backdrop - covers entire main content */}
            <div 
              className={`absolute inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity duration-300 ease-out ${
                isSettingsPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              onClick={() => setIsSettingsPanelOpen(false)}
            />
            
            {/* Settings Panel */}
            <aside className={`absolute top-0 right-0 h-full z-30 transform transition-transform duration-300 ease-out ${
              isSettingsPanelOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <SettingsPanel 
                isOpen={isSettingsPanelOpen}
                onClose={() => setIsSettingsPanelOpen(false)}
              />
            </aside>
          </>
        </div>
        
        {/* TabBar - fixed height, not fixed position */}
        <footer className="flex-shrink-0 relative z-20">
          <TabBar currentTab={currentTab} onTabChange={onTabChange} />
        </footer>
      </div>
    </ThemeProvider>
  )
}