import { useState } from 'react'
import { DraggedPiece, TabBar } from './components'
import { DragProvider, useDrag } from './providers'
import { DragTestPage, WorkerTestPage, DevToolsPage } from './pages'
import type { TabId } from './components/TabBar'
import './App.css'

// Inner App component that uses drag context
function AppContent() {
  const [currentPage, setCurrentPage] = useState<TabId>('worker')
  
  // New drag system from Document 20
  const { draggedPiece, cursorPosition } = useDrag()

  return (
    <>
      <div style={{ paddingBottom: '80px' }}>
        <header>
          <h1>Responsive Chessboard POC</h1>
        </header>
        
        <main>
          {currentPage === 'worker' && <WorkerTestPage />}
          {currentPage === 'drag' && <DragTestPage />}
        </main>
      </div>
      
      {/* iPad-style tab bar at bottom */}
      <TabBar currentTab={currentPage} onTabChange={setCurrentPage} />
      
      {/* Cursor-following dragged piece (Document 20 pattern) */}
      {draggedPiece && (
        <DraggedPiece
          piece={draggedPiece}
          position={cursorPosition}
          size={60}
        />
      )}
    </>
  )
}

// Main App component wrapped with DragProvider
function App() {
  return (
    <DragProvider>
      <AppContent />
    </DragProvider>
  )
}

export default App