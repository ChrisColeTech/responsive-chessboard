import React from 'react'
import { usePageInstructions } from '../hooks/usePageInstructions'

export const LayoutTestPage: React.FC = () => {
  usePageInstructions('layout')

  return (
    <section className="space-y-4">
      <div className="card-gaming p-8">
        <p className="text-muted-foreground text-center">
          This is a minimal test page to view the background effects, floating chess pieces, 
          and theme styling without any other content interfering.
        </p>
      </div>
    </section>
  )
}