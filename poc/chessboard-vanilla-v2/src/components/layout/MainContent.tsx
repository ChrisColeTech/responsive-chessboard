import type { ReactNode } from 'react'

interface MainContentProps {
  children: ReactNode
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="relative z-10 container mx-auto px-6 py-8 pb-24 min-h-[calc(100vh-200px)]">
      {children}
    </main>
  )
}