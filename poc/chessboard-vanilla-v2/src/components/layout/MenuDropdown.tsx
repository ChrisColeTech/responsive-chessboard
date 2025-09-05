import { Settings, HelpCircle, BarChart, Palette } from 'lucide-react'
import { useSettings } from '../../stores/appStore'
import { useInstructions } from '../../contexts/InstructionsContext'

interface MenuDropdownProps {
  onClose: () => void
}

export function MenuDropdown({ onClose }: MenuDropdownProps) {
  const { open: openSettings } = useSettings()
  const { openInstructions } = useInstructions()

  return (
    <div 
      data-menu-dropdown 
      className="fixed bottom-[84px] mb-1 z-50 left-0 right-0 md:absolute md:bottom-full md:left-0 md:right-0 md:w-auto md:min-w-48"
    >
      <div className="glass-layout p-2 space-y-1 border-t border-border/20">
        <button 
          onClick={() => { openSettings(); onClose(); }}
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded transition-all duration-200 flex items-center gap-2 group"
        >
          <Settings className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Settings</span>
        </button>
        <button 
          onClick={() => { openInstructions(); onClose(); }}
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded transition-all duration-200 flex items-center gap-2 group"
        >
          <HelpCircle className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Help</span>
        </button>
        <button 
          onClick={onClose}
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded transition-all duration-200 flex items-center gap-2 group"
        >
          <BarChart className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Stats</span>
        </button>
        <button 
          onClick={onClose}
          className="w-full p-2 text-left text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded transition-all duration-200 flex items-center gap-2 group"
        >
          <Palette className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="group-hover:translate-x-0.5 transition-transform">Themes</span>
        </button>
      </div>
    </div>
  )
}