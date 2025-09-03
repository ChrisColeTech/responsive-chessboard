import { useState } from 'react'
import { AppLayout } from './components/layout'
import type { TabId } from './components/layout'
import { DragTestPage, LayoutTestPage, WorkerTestPage } from './pages'
import { DragProvider, useDrag } from './providers/DragProvider'
import { DraggedPiece } from './components/DraggedPiece'

/*
 * To add a new route/page:
 * 
 * 1. Create your page component in ./pages/YourPage.tsx
 * 2. Export it from ./pages/index.ts
 * 3. Add the new tab ID to TabId type in ./components/layout/types.ts
 * 4. Add the tab configuration to the tabs array in ./components/layout/TabBar.tsx
 * 5. Import your page component above
 * 6. Add routing condition below in the AppContent component
 * 7. Optionally update the default currentPage state if needed
 */

function AppContent() {
  const [currentPage, setCurrentPage] = useState<TabId>('layout')
  const { draggedPiece, cursorPosition } = useDrag()

  return (
    <AppLayout 
      currentTab={currentPage} 
      onTabChange={setCurrentPage}
    >
      {/* Page routing */}
      {currentPage === 'layout' && <LayoutTestPage />}
      {currentPage === 'worker' && <WorkerTestPage />}
      {currentPage === 'drag' && <DragTestPage />}
      
      {/* Global drag overlay */}
      {draggedPiece && (
        <DraggedPiece
          piece={draggedPiece}
          position={cursorPosition}
          size={60}
        />
      )}
    </AppLayout>
  )
}

function App() {
  return (
    <DragProvider>
      <AppContent />
    </DragProvider>
  )
}

export default App