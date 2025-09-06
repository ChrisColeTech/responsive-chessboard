import { useMemo, useCallback, useState } from 'react'
import type { TabId } from '../components/layout/types'
import type { ActionSheetAction } from '../types/action-sheet.types'
import type { 
  PageActionHandler, 
  ActionContext, 
  ActionResult,
  UsePageActionsReturn 
} from '../types/page-actions.types'
import { getPageActions } from '../constants/action-sheet'
import { actionSheetService } from '../services/actionSheetService'

/**
 * Hook for managing page-specific actions
 * Following DRY principle - reusable across all pages
 */
export function usePageActions(pageId: TabId): UsePageActionsReturn {
  const [customActions, setCustomActions] = useState<ActionSheetAction[]>([])
  const [customHandler, setCustomHandler] = useState<PageActionHandler | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Get actions for the current page
   * Combines static actions from constants with any custom registered actions
   */
  const actions = useMemo(() => {
    const staticActions = getPageActions(pageId)
    // Custom actions take priority over static ones
    return customActions.length > 0 ? customActions : staticActions
  }, [pageId, customActions])

  /**
   * Handle action execution
   * Uses custom handler if registered, otherwise falls back to service
   */
  const handleAction = useCallback(async (
    actionId: string, 
    context?: ActionContext
  ): Promise<ActionResult> => {
    console.log('📋 [PAGE ACTIONS] Handling action:', actionId, 'for page:', pageId)
    setIsLoading(true)

    try {
      let result: ActionResult

      if (customHandler) {
        // Use custom handler registered by page
        console.log('📋 [PAGE ACTIONS] Using custom handler')
        await customHandler(actionId, context)
        result = { 
          success: true, 
          message: 'Action completed successfully',
          closeSheet: true 
        }
      } else {
        // Use service for action execution
        console.log('📋 [PAGE ACTIONS] Using service handler')
        result = await actionSheetService.executeAction(pageId, actionId, context)
      }

      console.log('📋 [PAGE ACTIONS] Action result:', result)
      return result
    } catch (error) {
      console.error('📋 [PAGE ACTIONS] Action failed:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Action failed',
        closeSheet: false
      }
    } finally {
      setIsLoading(false)
    }
  }, [pageId, customHandler])

  /**
   * Register custom actions for this page
   * Allows pages to dynamically define their actions
   */
  const registerActions = useCallback((newActions: ActionSheetAction[]) => {
    console.log('📋 [PAGE ACTIONS] Registering custom actions for page:', pageId, newActions)
    setCustomActions(newActions)
  }, [pageId])

  /**
   * Register custom handler for this page
   * Allows pages to define their own action handling logic
   */
  const registerHandler = useCallback((handler: PageActionHandler) => {
    console.log('📋 [PAGE ACTIONS] Registering custom handler for page:', pageId)
    setCustomHandler(() => handler) // Function wrapper to store function in state
  }, [pageId])

  return {
    actions,
    handleAction,
    registerActions,
    registerHandler,
    isLoading
  }
}