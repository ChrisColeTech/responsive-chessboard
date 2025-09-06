import { Menu } from "lucide-react";
import { useChessAudio } from "../../services/audioService";

interface MenuButtonProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function MenuButton({ isMenuOpen, onToggleMenu }: MenuButtonProps) {
  const { playMove } = useChessAudio();

  const handleMenuClick = () => {
    console.log(
      "🔍 [MENU DEBUG] Menu button clicked, current isMenuOpen:",
      isMenuOpen
    );
    playMove(false); // Play UI interaction sound
    onToggleMenu();
    console.log("🔍 [MENU DEBUG] onToggleMenu called");
  };

  return (
    <button
      onClick={handleMenuClick}
      data-menu-button
      aria-expanded={isMenuOpen}
      aria-haspopup="menu"
      aria-label="Open navigation menu"
      className={`w-full h-full tab-button ${
        isMenuOpen ? "menu-button-active" : "menu-button-inactive"
      }`}
    >
      <Menu
        className={`w-6 h-6 mb-1 transition-all duration-300 ${
          isMenuOpen
            ? "scale-110 text-primary"
            : "text-muted-foreground hover:scale-105 hover:text-foreground"
        }`}
      />
      <span className="leading-tight font-medium">Menu</span>
    </button>
  );
}
