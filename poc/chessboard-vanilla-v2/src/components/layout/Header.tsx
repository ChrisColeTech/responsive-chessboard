import { Crown, Coins } from 'lucide-react'
import { ThemeSwitcher } from '../ThemeSwitcher'

interface HeaderProps {
  onOpenSettings: () => void
  isSettingsOpen: boolean
  coinBalance?: number
}

export function Header({ onOpenSettings, isSettingsOpen, coinBalance }: HeaderProps) {
  return (
    <div className="w-full glass-layout border-b border-border/20 h-16">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Responsive Chessboard
            </h1>
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded-lg text-xs font-medium border border-border">
              POC
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {coinBalance !== undefined && (
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1 rounded-lg border border-border">
                <Coins className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm font-bold text-foreground">{coinBalance.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">coins</span>
              </div>
            )}
            <ThemeSwitcher onOpenSettings={onOpenSettings} isSettingsOpen={isSettingsOpen} />
          </div>
        </div>
      </div>
    </div>
  )
}