import { Layout, Settings, Target, Coins, Loader } from "lucide-react";
import { MenuButton } from "./MenuButton";
import type { TabId } from "./types";
import { useUIClickSound } from "../../hooks/useUIClickSound";

interface TabBarProps {
  currentTab: TabId;
  onTabChange: (tab: TabId) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const tabs: Tab[] = [
  {
    id: "layout",
    label: "Layout",
    icon: Layout,
    description: "Background Test",
  },
  {
    id: "worker",
    label: "Stockfish",
    icon: Settings,
    description: "Engine Testing",
  },
  {
    id: "uitests",
    label: "UI Tests",
    icon: Target,
    description: "UI Testing Hub",
  },
  {
    id: "slots",
    label: "Casino",
    icon: Coins,
    description: "Slot Machine",
  },
  {
    id: "play",
    label: "Play",
    icon: Target,
    description: "vs Computer",
  },
  {
    id: "splash",
    label: "Splash",
    icon: Loader,
    description: "Loading Screens",
  },
];

export function TabBar({ currentTab, onTabChange, isMenuOpen, onToggleMenu }: TabBarProps) {
  const { playUIClick } = useUIClickSound();
  const handleKeyDown = (event: React.KeyboardEvent, tabId: TabId) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      console.log(`⌨️ [TAB BAR] Keyboard activation: ${event.key} on ${tabId}`);
      onTabChange(tabId);
      console.log(`⌨️ [TAB BAR] Keyboard tab change called`);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const currentIndex = tabs.findIndex((tab) => tab.id === currentTab);
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
      console.log(
        `⌨️ [TAB BAR] Arrow key navigation: ${event.key} from ${currentTab} to ${tabs[nextIndex].id}`
      );
      onTabChange(tabs[nextIndex].id);
      console.log(`⌨️ [TAB BAR] Arrow navigation tab change called`);
    }
  };
  return (
    <div
      className="
        w-full h-[84px] 
        grid grid-cols-7 
      "
      role="tablist"
      aria-label="Main navigation"
    >
      {/* Menu Button - First item */}
      <MenuButton isMenuOpen={isMenuOpen} onToggleMenu={onToggleMenu} />

      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => {
              console.log(`🔄 [TAB BAR] Tab clicked: ${tab.id} (${tab.label})`);
              console.log(`🔄 [TAB BAR] Previous tab was: ${currentTab}`);

              // Play click sound
              playUIClick(`Tab: ${tab.label}`);

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
                ${
                  isActive
                    ? "text-foreground font-bold -translate-y-1 shadow-xl border-t-4 border-primary glass"
                    : "text-muted-foreground hover:text-foreground hover:-translate-y-0.5 hover:glass"
                }
              `}
          >
            <IconComponent
              className={`w-6 h-6 mb-1 transition-all duration-300 ${
                isActive
                  ? "scale-110 text-primary drop-shadow-lg"
                  : "text-muted-foreground hover:scale-105 hover:text-foreground"
              }`}
            />
            <span className="leading-tight font-medium">{tab.label}</span>
            {isActive && (
              <span className="text-[10px] opacity-70 font-normal -mt-0.5">
                {tab.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
