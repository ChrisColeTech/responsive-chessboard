import React from 'react'
import { usePageInstructions } from '../hooks/usePageInstructions'
import { usePageActions } from '../hooks/usePageActions'
import { UIAudioTestPage } from '../pages/UIAudioTestPage'

export const UIAudioTestPageWrapper: React.FC = () => {
  usePageInstructions('uiaudiotest')
  usePageActions('uiaudiotest')
  
  return <UIAudioTestPage />
}