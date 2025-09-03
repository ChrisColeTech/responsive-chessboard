import type { ReactNode } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Header } from './Header'
import { TabBar } from './TabBar'
import { SettingsPanel } from '../SettingsPanel'
import { useSettings } from '../../stores/appStore'
import type { TabId } from './types'

/**
 * GLASSMORPHISM DESIGN SYSTEM
 * ===========================
 * 
 * This app uses a consistent glassmorphism design system with two main classes:
 * 
 * 1. `glass-layout` - For full-width layout elements (Header, TabBar)
 *    - No rounded corners (sharp edges for layout)
 *    - Subtle glassmorphism effect
 *    - No entry animations
 * 
 * 2. `card-gaming` - For content cards (modals, panels, cards)
 *    - Rounded corners for content separation
 *    - Same glassmorphism effect
 *    - Entry animations for engagement
 * 
 * USAGE RULES:
 * - Header/TabBar: Use `glass-layout`
 * - Content cards/panels: Use `card-gaming`
 * - Modals/overlays: Use `card-gaming`
 * - Never mix classes - stick to the designated purpose
 */

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
      
      {/* 
        Header - Uses `glass-layout` for sharp edges and subtle glassmorphism
        ✅ Correct: Full-width layout element with no rounded corners
      */}
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
          
          {/* 
            Settings Panel - Uses `card-gaming` for rounded corners and entry animations
            ✅ Correct: Content overlay with rounded design
          */}
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
        
        {/* 
          TabBar - Uses `glass-layout` for sharp edges and subtle glassmorphism
          ✅ Correct: Full-width layout element with no rounded corners
        */}
        <footer className="flex-shrink-0 relative z-20">
          <TabBar currentTab={currentTab} onTabChange={onTabChange} />
        </footer>
    </div>
  )
}