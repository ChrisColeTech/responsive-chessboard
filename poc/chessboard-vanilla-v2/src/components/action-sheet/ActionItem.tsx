import type { ActionItemProps } from '../../types/action-sheet.types'

/**
 * Individual Action Item Component
 * Represents a single actionable item in the action sheet
 * Following SRP - single responsibility for action item display
 */
export function ActionItem({ action, onSelect }: ActionItemProps) {
  const IconComponent = action.icon

  /**
   * Get CSS classes for action variant styling - using existing theme
   */
  const getVariantClasses = () => {
    const baseClasses = `
      flex items-center gap-4 p-4 w-full rounded-xl
      transition-all duration-200 ease-out
      hover:scale-[0.98] active:scale-95
      focus:outline-none focus:ring-2 focus:ring-primary/20
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:scale-100 disabled:active:scale-100
      border border-transparent
    `

    switch (action.variant) {
      case 'destructive':
        return `${baseClasses} 
          text-red-400 hover:bg-red-500/10 hover:border-red-500/20
          hover:text-red-300 active:bg-red-500/20
        `
      case 'secondary':
        return `${baseClasses} 
          text-muted-foreground hover:bg-white/5 hover:border-white/10
          hover:text-foreground active:bg-white/10
        `
      default: // 'default'
        return `${baseClasses} 
          text-foreground hover:bg-white/10 hover:border-white/20
          hover:text-white active:bg-white/20
        `
    }
  }

  /**
   * Handle keyboard activation (Enter/Space)
   */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (!action.disabled) {
        onSelect()
      }
    }
  }

  return (
    <button
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      disabled={action.disabled}
      className={getVariantClasses()}
      role="menuitem"
      aria-disabled={action.disabled}
      tabIndex={0}
    >
      {/* Action Icon */}
      <div className="flex-shrink-0">
        <IconComponent 
          className={`w-6 h-6 ${action.disabled ? 'opacity-50' : ''}`} 
        />
      </div>

      {/* Action Content */}
      <div className="flex-grow text-left">
        <div className="font-medium leading-tight">
          {action.label}
        </div>
      </div>

      {/* Optional Badge */}
      {action.badge && (
        <div className="flex-shrink-0">
          <span className={`
            inline-flex items-center justify-center
            min-w-[20px] h-5 px-2 rounded-full
            text-xs font-medium leading-none
            ${action.variant === 'destructive' 
              ? 'bg-red-500/20 text-red-300' 
              : 'bg-white/20 text-white/90'
            }
          `}>
            {action.badge}
          </span>
        </div>
      )}

      {/* Disabled indicator */}
      {action.disabled && (
        <div className="flex-shrink-0 opacity-50">
          <span className="text-xs text-muted-foreground">
            Disabled
          </span>
        </div>
      )}
    </button>
  )
}