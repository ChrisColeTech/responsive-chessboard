import { Layout, Settings, Target } from 'lucide-react'
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
    id: 'drag',
    label: 'Drag Test',
    icon: Target,
    description: 'Drag & Drop'
  }
]

export function TabBar({ currentTab, onTabChange }: TabBarProps) {
  return (
    <div className="w-full h-[84px] glass-layout border-t border-border/20 shadow-gaming">
      <div className="flex h-full">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id
          const IconComponent = tab.icon
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1 py-2 border-none
                bg-transparent cursor-pointer transition-all duration-300 text-xs font-medium
                ${isActive 
                  ? 'bg-foreground/10 text-foreground -translate-y-1 shadow-lg border-t-2 border-foreground/50' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:-translate-y-0.5'
                }
              `}
            >
              <IconComponent className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive ? 'scale-110' : ''}`} />
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
    </div>
  )
}