import { useRef, useEffect, useCallback } from 'react'
import { useUIClickSound } from './useUIClickSound'

/**
 * Hook for managing action sheet event handlers
 * Separated from useActionSheet to avoid hooks order issues
 */
export function useActionSheetEventHandlers(isOpen: boolean, closeSheet: () => void) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const { playUIClick } = useUIClickSound()

  /**
   * Focus management for accessibility
   */
  useEffect(() => {
    if (isOpen) {
      const firstAction = sheetRef.current?.querySelector('[role="menuitem"]') as HTMLButtonElement
      firstAction?.focus()
    }
  }, [isOpen])

  /**
   * Handle action selection with sound
   */
  const handleActionSelect = useCallback((actionId: string, actionLabel: string, onActionSelect: (actionId: string) => void) => {
    console.log('📋 [ACTION SHEET] Action selected:', actionId)
    playUIClick(`Action: ${actionLabel}`)
    onActionSelect(actionId)
  }, [playUIClick])

  /**
   * Handle escape key to close
   */
  const handleEscapeClose = useCallback(() => {
    console.log('📋 [ACTION SHEET] Escape key pressed - closing sheet')
    closeSheet()
  }, [closeSheet])

  /**
   * Handle backdrop dismiss with logging
   */
  const handleBackdropDismiss = useCallback(() => {
    console.log('📋 [ACTION SHEET] Backdrop clicked - closing sheet')
    closeSheet()
  }, [closeSheet])

  /**
   * Keyboard navigation support
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleEscapeClose()
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      const actionElements = Array.from(
        sheetRef.current?.querySelectorAll('[role="menuitem"]') || []
      ) as HTMLButtonElement[]
      
      const currentIndex = actionElements.indexOf(event.target as HTMLButtonElement)
      const direction = event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (currentIndex + direction + actionElements.length) % actionElements.length
      
      actionElements[nextIndex]?.focus()
    }
  }, [handleEscapeClose])

  return {
    sheetRef,
    handleActionSelect,
    handleBackdropDismiss,
    handleKeyDown
  }
}