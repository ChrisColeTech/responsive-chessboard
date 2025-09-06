import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import type { ActionSheetProps } from '../../types/action-sheet.types'
import { ACTION_SHEET_CONFIG } from '../../constants/action-sheet'
import { ActionItem } from './ActionItem'

/**
 * Pure Action Sheet Presentation Component
 * Mobile-native bottom sheet interface for page-specific actions
 * Following SRP - single responsibility for UI rendering only
 */
export function ActionSheet({ 
  open, 
  onDismiss, 
  actions, 
  onActionSelect,
  sheetRef,
  onKeyDown,
  onActionSelectWithSound
}: ActionSheetProps) {
  /**
   * Get appropriate snap point based on number of actions
   */
  const snapPoint = ACTION_SHEET_CONFIG.getSnapPoint(actions.length)

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      snapPoints={({ maxHeight }) => [snapPoint({ maxHeight })]}
    >
      <div 
        ref={sheetRef}
        className="card-gaming p-6"
        role="menu"
        aria-label="Page actions"
        onKeyDown={onKeyDown}
      >
        {/* Sheet handle for better UX */}
        <div className="w-10 h-1 bg-white/40 rounded-full mx-auto mb-6" />
        
        {/* Actions list */}
        <div className="space-y-2">
          {actions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>No actions available</p>
            </div>
          ) : (
            actions.map((action) => (
              <ActionItem
                key={action.id}
                action={action}
                onSelect={() => onActionSelectWithSound?.(action.id, action.label, onActionSelect)}
              />
            ))
          )}
        </div>
      </div>
    </BottomSheet>
  )
}