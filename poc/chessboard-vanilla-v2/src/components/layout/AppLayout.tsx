import type { ReactNode } from 'react'
import { useState } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Header } from './Header'
import { MainContent } from './MainContent'
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
      <div className="min-h-screen bg-background text-foreground">
        <BackgroundEffects />
        <Header onOpenSettings={() => setIsSettingsPanelOpen(true)} isSettingsOpen={isSettingsPanelOpen} />
        <MainContent>
          {children}
        </MainContent>
        <TabBar currentTab={currentTab} onTabChange={onTabChange} />
        
        {/* Settings Panel */}
        <SettingsPanel 
          isOpen={isSettingsPanelOpen}
          onClose={() => setIsSettingsPanelOpen(false)}
        />
      </div>
    </ThemeProvider>
  )
}