import { useState, useCallback } from 'react'
import type { ActionSheetAction } from '../types/action-sheet.types'
import type { TabId } from '../components/layout/types'

/**
 * Hook for managing action sheet state and behavior
 * Following SRP - single responsibility for action sheet state management
 */
export function useActionSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<TabId | null>(null)
  const [currentActions, setCurrentActions] = useState<ActionSheetAction[]>([])

  /**
   * Open the action sheet with specific actions for a page
   */
  const openSheet = useCallback((pageId: TabId, actions: ActionSheetAction[]) => {
    console.log('📋 [ACTION SHEET] Opening sheet for page:', pageId, 'with actions:', actions.length)
    setCurrentPage(pageId)
    setCurrentActions(actions)
    setIsOpen(true)
  }, [])

  /**
   * Close the action sheet and reset state
   */
  const closeSheet = useCallback(() => {
    console.log('📋 [ACTION SHEET] Closing sheet')
    setIsOpen(false)
    // Don't clear currentPage/actions immediately to prevent flash during animation
    setTimeout(() => {
      setCurrentPage(null)
      setCurrentActions([])
    }, 300) // Allow time for exit animation
  }, [])

  /**
   * Toggle the action sheet for a specific page
   */
  const toggleSheet = useCallback((pageId: TabId, actions: ActionSheetAction[]) => {
    console.log('📋 [ACTION SHEET] Toggle sheet for page:', pageId, 'current state:', isOpen)
    console.log('📋 [ACTION SHEET] Current page:', currentPage, 'pageId:', pageId, 'pages match:', currentPage === pageId)
    
    // If sheet is open, always close it regardless of page match
    // This fixes the issue where currentPage becomes null during close animation
    if (isOpen) {
      console.log('📋 [ACTION SHEET] Sheet is open - calling closeSheet()')
      closeSheet()
    } else {
      console.log('📋 [ACTION SHEET] Sheet is closed - calling openSheet()')
      openSheet(pageId, actions)
    }
  }, [isOpen, openSheet, closeSheet])

  /**
   * Update actions for the current page without closing
   * Useful for dynamic action updates based on page state
   */
  const updateActions = useCallback((actions: ActionSheetAction[]) => {
    console.log('📋 [ACTION SHEET] Updating actions for current page:', currentPage)
    setCurrentActions(actions)
  }, [currentPage])

  return {
    // State
    isOpen,
    currentPage,
    currentActions,

    // Actions
    openSheet,
    closeSheet,
    toggleSheet,
    updateActions
  }
}