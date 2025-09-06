import React from 'react'
import { usePageInstructions } from '../hooks/usePageInstructions'
import { usePageActions } from '../hooks/usePageActions'
import LoadingProgressPage from '../pages/splash/LoadingProgressPage'

export const LoadingProgressPageWrapper: React.FC = () => {
  usePageInstructions('loadingprogress')
  usePageActions('loadingprogress')
  
  return <LoadingProgressPage />
}