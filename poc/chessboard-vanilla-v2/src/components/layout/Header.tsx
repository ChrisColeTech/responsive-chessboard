import { Coins } from 'lucide-react'

interface HeaderProps {
  onOpenSettings: () => void
  isSettingsOpen: boolean
  coinBalance?: number
}

export function Header({ coinBalance }: HeaderProps) {
  return (
    <div className="w-full h-16">
      <div className="container mx-auto px-6 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-3">
            {/* Title and icon moved to TitleBar */}
          </div>
          
          <div className="flex items-center gap-4">
            {coinBalance !== undefined && (
              <div className="flex items-center gap-2 bg-background/50 px-3 py-1 rounded-lg border border-border">
                <Coins className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-sm font-bold text-foreground">{coinBalance.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">coins</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}