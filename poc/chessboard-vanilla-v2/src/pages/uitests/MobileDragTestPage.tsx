import React, { useState } from "react";
import { MobileChessboardLayout } from "../../components/MobileChessboardLayout";
import { usePageInstructions } from "../../hooks/usePageInstructions";
import type { ChessPosition, ChessPiece } from "../../types";

export const MobileDragTestPage: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<ChessPosition | null>(null);
  const [validDropTargets, setValidDropTargets] = useState<ChessPosition[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<ChessPiece[]>([]);
  
  usePageInstructions("uitests.mobile-drag-test");

  const handleSquareClick = (position: ChessPosition) => {
    // TODO: Implement mobile-specific chess logic
    console.log('Mobile square clicked:', position);
  };

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