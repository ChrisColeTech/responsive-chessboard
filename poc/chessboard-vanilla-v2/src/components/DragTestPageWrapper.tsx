import React from 'react'
import { usePageInstructions } from '../hooks/usePageInstructions'
import { usePageActions } from '../hooks/usePageActions'
import { DragTestPage } from '../pages/DragTestPage'

export const DragTestPageWrapper: React.FC = () => {
  usePageInstructions('dragtest')
  usePageActions('dragtest')
  
  return <DragTestPage />
}