import type { ReactNode } from 'react'
import { BackgroundEffects } from './BackgroundEffects'
import { Header } from './Header'
import { MainContent } from './MainContent'
import { TabBar } from './TabBar'
import type { TabId } from './types'

interface AppLayoutProps {
  children: ReactNode
  currentTab: TabId
  onTabChange: (tab: TabId) => void
}

export function AppLayout({ children, currentTab, onTabChange }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackgroundEffects />
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <TabBar currentTab={currentTab} onTabChange={onTabChange} />
    </div>
  )
}