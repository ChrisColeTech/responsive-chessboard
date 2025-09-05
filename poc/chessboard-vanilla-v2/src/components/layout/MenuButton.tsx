import { Menu } from 'lucide-react'
import { MenuDropdown } from './MenuDropdown'
import { useMenuDropdown } from '../../hooks/useMenuDropdown'
import { useChessAudio } from '../../services/audioService'

export function MenuButton() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuDropdown()
  const { playMove } = useChessAudio()

  const handleMenuClick = () => {
    playMove(false) // Play UI interaction sound
    toggleMenu()
  }

  return (
    <div className="relative">
      <button
        onClick={handleMenuClick}
        data-menu-button
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="Open navigation menu"
        className={`
          w-full h-full flex flex-col items-center justify-center gap-1 py-2 border-none
          bg-transparent cursor-pointer transition-all duration-300 text-xs font-medium
          focus:outline-none
          ${isMenuOpen 
            ? 'bg-foreground/10 text-foreground font-bold -translate-y-1 shadow-xl border-t-4 border-primary' 
            : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5 hover:-translate-y-0.5'
          }
        `}
      >
        <Menu className={`w-6 h-6 mb-1 transition-all duration-300 ${isMenuOpen ? 'scale-110 text-primary' : 'text-muted-foreground hover:scale-105 hover:text-foreground'}`} />
        <span className="leading-tight font-medium">Menu</span>
      </button>

      {isMenuOpen && (
        <MenuDropdown onClose={closeMenu} />
      )}
    </div>
  )
}