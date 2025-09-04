import { AppLayout } from './components/layout'
import { DragTestPage, LayoutTestPage, WorkerTestPage, SlotMachineTestPage } from './pages'
import { DragProvider, useDrag } from './providers/DragProvider'
import { DraggedPiece } from './components/DraggedPiece'
import { useSelectedTab, useAppStore } from './stores/appStore'
import { useChessAudio } from './services/audioService'
import { useEffect } from 'react'

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
  const selectedTab = useSelectedTab()
  const setSelectedTab = useAppStore((state) => state.setSelectedTab)
  const coinBalance = useAppStore((state) => state.coinBalance)
  const { draggedPiece, cursorPosition, draggedPieceSize } = useDrag()
  const { preloadSounds, playGameStart } = useChessAudio()

  // Initialize audio system on first user interaction (application-wide)
  useEffect(() => {
    const handleFirstInteraction = () => {
      console.log('🎵 [APP] First user interaction - initializing audio system');
      preloadSounds();
      playGameStart(); // Welcome sound
      
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    // Listen for first user interaction to enable audio
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [preloadSounds, playGameStart])

  return (
    <AppLayout 
      currentTab={selectedTab} 
      onTabChange={setSelectedTab}
      coinBalance={coinBalance}
    >
      {/* Page routing */}
      {selectedTab === 'layout' && <LayoutTestPage />}
      {selectedTab === 'worker' && <WorkerTestPage />}
      {selectedTab === 'drag' && <DragTestPage />}
      {selectedTab === 'slots' && <SlotMachineTestPage />}
      
      {/* Global drag overlay */}
      {draggedPiece && (
        <DraggedPiece
          piece={draggedPiece}
          position={cursorPosition}
          size={draggedPieceSize}
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