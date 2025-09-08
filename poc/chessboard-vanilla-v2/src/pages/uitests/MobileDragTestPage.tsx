import React from "react";
import { MobileChessboardLayout } from "../../components/chess/MobileChessboardLayout";
import { usePageInstructions } from "../../hooks/core/usePageInstructions";
// Removed unused type imports - can be added back when needed

export const MobileDragTestPage: React.FC = () => {
  // Removed unused state variables for now - can be added back when needed
  
  usePageInstructions("uitests.mobile-drag-test");

  // Removed unused handler - can be added back when needed

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="bg-sparkle bg-sparkle-lg bg-orb-foreground-30 top-1/4 left-1/4 animation-delay-300"></div>
        <div className="bg-sparkle bg-sparkle-sm bg-orb-foreground-40 bottom-1/3 left-1/3 animation-delay-700"></div>
        <div className="bg-sparkle bg-sparkle-md bg-orb-foreground-50 top-2/3 right-1/3 animation-delay-1200"></div>
      </div>

      {/* Mobile Layout fills entire page */}
      <MobileChessboardLayout
            topPieces={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Top
              </div>
            }
            center={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Board
              </div>
            }
            bottomPieces={
              <div style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'hidden',
                boxSizing: 'border-box',
                margin: 0,
                padding: 0,
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Bottom
              </div>
            }
      />
    </div>
  );
};