import { useEffect, useRef } from 'react'
import { Settings, HelpCircle, BarChart, Palette } from 'lucide-react'
import { useSettings } from '../../stores/appStore'
import { useInstructions } from '../../contexts/InstructionsContext'
import { useChessAudio } from '../../services/audioService'

interface MenuDropdownProps {
  onClose: () => void
}

export function MenuDropdown({ onClose }: MenuDropdownProps) {
  console.log('🔍 [MENU DEBUG] MenuDropdown component rendered!')
  const { open: openSettings } = useSettings()
  const { openInstructions } = useInstructions()
  const { playMove } = useChessAudio()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus first menu item when dropdown opens
    const firstMenuItem = menuRef.current?.querySelector('[role="menuitem"]') as HTMLButtonElement
    firstMenuItem?.focus()
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose()
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const menuItems = Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') || [])
      const currentIndex = menuItems.indexOf(event.target as Element)
      const direction = event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (currentIndex + direction + menuItems.length) % menuItems.length
      ;(menuItems[nextIndex] as HTMLButtonElement)?.focus()
    }
  }

  return (
    <div 
      ref={menuRef}
      data-menu-dropdown 
      role="menu"
      aria-label="Navigation menu"
      onKeyDown={handleKeyDown}
      className="fixed bottom-[84px] left-0 right-0 z-50 md:w-[25vw] md:right-auto glass-layout border border-border shadow-2xl"
    >
      <div className="glass-layout space-y-1">
        <button 
          onClick={() => { playMove(false); openSettings(); onClose(); }}
          role="menuitem"
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:glass rounded transition-all duration-200 flex items-center gap-2 group focus:outline-none"
        >
          <Settings className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Settings</span>
        </button>
        <button 
          onClick={() => { playMove(false); openInstructions(); onClose(); }}
          role="menuitem"
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:glass rounded transition-all duration-200 flex items-center gap-2 group focus:outline-none"
        >
          <HelpCircle className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Help</span>
        </button>
        <button 
          onClick={() => { playMove(false); onClose(); }}
          role="menuitem"
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:glass rounded transition-all duration-200 flex items-center gap-2 group focus:outline-none"
        >
          <BarChart className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Stats</span>
        </button>
        <button 
          onClick={() => { playMove(false); onClose(); }}
          role="menuitem"
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:glass rounded transition-all duration-200 flex items-center gap-2 group focus:outline-none"
        >
          <Palette className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Themes</span>
        </button>
      </div>
    </div>
  )
}