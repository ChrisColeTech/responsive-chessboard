// Core action sheet component types - following clean component architecture
export interface ActionSheetAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  variant: 'default' | 'destructive' | 'secondary'
  disabled?: boolean
  badge?: string | number
  shortcut?: string
}

export interface ActionSheetProps {
  actions: ActionSheetAction[]
  onActionClick: (actionId: string, actionLabel: string, close: () => void) => void
  onActionHover?: (actionLabel: string) => void
  onKeyDown: (event: React.KeyboardEvent) => void
  onClose: () => void
  isOpen: boolean
  className?: string
}

export interface ActionSheetContainerProps {
  currentPage: string
  className?: string
  onClose: () => void
  isOpen: boolean
  onOpenSettings: () => void
}