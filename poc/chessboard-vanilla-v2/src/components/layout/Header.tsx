import { Crown } from 'lucide-react'
import { ThemeSwitcher } from '../ThemeSwitcher'

export function Header() {
  return (
    <header className="relative z-20 glass border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
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
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}