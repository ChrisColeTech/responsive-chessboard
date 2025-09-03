import type { ReactNode } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Header } from './Header'
import { TabBar } from './TabBar'
import { SettingsPanel } from '../SettingsPanel'
import { useSettings } from '../../stores/appStore'
import type { TabId } from './types'

interface AppLayoutProps {
  children: ReactNode
  currentTab: TabId
  onTabChange: (tab: TabId) => void
}

export function AppLayout({ children, currentTab, onTabChange }: AppLayoutProps) {
  const { isOpen: isSettingsPanelOpen, open: openSettings, close: closeSettings } = useSettings()

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <BackgroundEffects />
      
      {/* Header - fixed height, not fixed position */}
      <header className="flex-shrink-0 relative z-20">
        <Header 
          onOpenSettings={openSettings} 
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
              onClick={closeSettings}
            />
            
            {/* Settings Panel */}
            <aside className={`absolute top-0 right-0 h-full z-30 transform transition-transform duration-300 ease-out ${
              isSettingsPanelOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
              <SettingsPanel 
                isOpen={isSettingsPanelOpen}
                onClose={closeSettings}
              />
            </aside>
          </>
        </div>
        
        {/* TabBar - fixed height, not fixed position */}
        <footer className="flex-shrink-0 relative z-20">
          <TabBar currentTab={currentTab} onTabChange={onTabChange} />
        </footer>
    </div>
  )
}