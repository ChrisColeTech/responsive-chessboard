import type { ReactNode } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Header } from './Header'
import { TabBar } from './TabBar'
import { SettingsPanel } from '../SettingsPanel'
import { InstructionsFAB } from '../InstructionsFAB'
import { InstructionsModal } from '../InstructionsModal'
import { useSettings } from '../../stores/appStore'
import { useInstructions } from '../../contexts/InstructionsContext'
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
  coinBalance?: number
}

export function AppLayout({ children, currentTab, onTabChange, coinBalance }: AppLayoutProps) {
  const { isOpen: isSettingsPanelOpen, open: openSettings, close: closeSettings } = useSettings()
  const { instructions, title, showInstructions, openInstructions, closeInstructions } = useInstructions()

  return (
    <div className="relative min-h-screen min-h-[100dvh] bg-background text-foreground">
      <BackgroundEffects />
      
      {/* 
        Header - Fixed positioning for mobile compatibility
        ✅ Fixed to top with proper z-index
      */}
      <header className="fixed top-0 left-0 right-0 z-20">
        <Header 
          onOpenSettings={openSettings} 
          isSettingsOpen={isSettingsPanelOpen}
          coinBalance={coinBalance}
        />
      </header>
        
        {/* Main Content Area - constrained between fixed header and footer */}
        <div className="absolute top-16 bottom-[84px] left-0 right-0 z-10">
          {/* Primary Content - scrollable within the constrained area */}
          <main className="w-full h-full overflow-auto">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
          
          {/* Instructions FAB - positioned within main content area */}
          <InstructionsFAB onClick={openInstructions} />
          
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
          TabBar - Fixed positioning for mobile compatibility  
          ✅ Fixed to bottom with proper z-index
        */}
        <footer className="fixed bottom-0 left-0 right-0 z-20">
          <TabBar currentTab={currentTab} onTabChange={onTabChange} />
        </footer>
        
        {/* Global Instructions Modal */}
        <InstructionsModal
          isOpen={showInstructions}
          onClose={closeInstructions}
          title={title}
          instructions={instructions}
        />
    </div>
  )
}