import { Layout, Settings, Target, Coins } from 'lucide-react'
import { MenuButton } from './MenuButton'
import type { TabId } from './types'

interface TabBarProps {
  currentTab: TabId
  onTabChange: (tab: TabId) => void
}

interface Tab {
  id: TabId
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

const tabs: Tab[] = [
  {
    id: 'layout',
    label: 'Layout',
    icon: Layout,
    description: 'Background Test'
  },
  {
    id: 'worker',
    label: 'Stockfish',
    icon: Settings,
    description: 'Engine Testing'
  },
  {
    id: 'uitests',
    label: 'UI Tests',
    icon: Target,
    description: 'UI Testing Hub'
  },
  {
    id: 'slots',
    label: 'Casino',
    icon: Coins,
    description: 'Slot Machine'
  },
  {
    id: 'play',
    label: 'Play',
    icon: Target,
    description: 'vs Computer'
  }
]

export function TabBar({ currentTab, onTabChange }: TabBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent, tabId: TabId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      console.log(`⌨️ [TAB BAR] Keyboard activation: ${event.key} on ${tabId}`);
      onTabChange(tabId)
      console.log(`⌨️ [TAB BAR] Keyboard tab change called`);
    }
    
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const currentIndex = tabs.findIndex(tab => tab.id === currentTab)
      const direction = event.key === 'ArrowLeft' ? -1 : 1
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length
      console.log(`⌨️ [TAB BAR] Arrow key navigation: ${event.key} from ${currentTab} to ${tabs[nextIndex].id}`);
      onTabChange(tabs[nextIndex].id)
      console.log(`⌨️ [TAB BAR] Arrow navigation tab change called`);
    }
  }
  return (
    <div 
      className="
        w-full h-[84px] glass-layout border-t border-border/20 shadow-gaming
        grid grid-cols-6 
      "
      role="tablist" 
      aria-label="Main navigation"
    >
      {/* Menu Button - First item */}
      <MenuButton />
      
      {tabs.map((tab) => {
          const isActive = currentTab === tab.id
          const IconComponent = tab.icon
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                console.log(`🔄 [TAB BAR] Tab clicked: ${tab.id} (${tab.label})`);
                console.log(`🔄 [TAB BAR] Previous tab was: ${currentTab}`);
                onTabChange(tab.id);
                console.log(`🔄 [TAB BAR] Tab change function called`);
              }}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`
                flex flex-col items-center justify-center gap-1 py-2 border-none
                bg-transparent cursor-pointer transition-all duration-300 text-xs font-medium
                focus:outline-none
                ${isActive 
                  ? 'bg-foreground/10 text-foreground font-bold -translate-y-1 shadow-xl border-t-4 border-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:-translate-y-0.5'
                }
              `}
            >
              <IconComponent className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive ? 'scale-110 text-primary drop-shadow-lg' : 'text-muted-foreground hover:scale-105 hover:text-foreground'}`} />
              <span className="leading-tight font-medium">
                {tab.label}
              </span>
              {isActive && (
                <span className="text-[10px] opacity-70 font-normal -mt-0.5">
                  {tab.description}
                </span>
              )}
            </button>
          )
        })}
    </div>
  )
}