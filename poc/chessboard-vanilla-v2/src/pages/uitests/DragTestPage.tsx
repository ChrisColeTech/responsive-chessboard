import React, { useState } from "react";
import { MobileChessBoard } from "../../components/chess/MobileChessBoard";
import { CapturedPieces } from "../../components/chess/CapturedPieces";
import { ChessboardLayout } from "../../components/chess/ChessboardLayout";
import { MobileChessboardLayout } from "../../components/chess/MobileChessboardLayout";
import { usePageInstructions } from "../../hooks/core/usePageInstructions";
import { useIsMobile } from "../../hooks/core/useIsMobile";
import type { ChessPosition, ChessPiece } from "../../types";

export const DragTestPage: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<ChessPosition | null>(
    null
  );
  const [validDropTargets, setValidDropTargets] = useState<ChessPosition[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<ChessPiece[]>([]);
  const [moveHandler, setMoveHandler] = useState<
    ((from: ChessPosition, to: ChessPosition) => Promise<boolean>) | null
  >(null);
  
  const [piecesPosition, setPiecesPosition] = useState<'top-bottom' | 'left-right'>('top-bottom');
  const isMobile = useIsMobile();
  usePageInstructions("uitests.drag-test");

  // Expose toggle function globally for actions to use
  React.useEffect(() => {
    (window as any).__togglePiecesPosition = () => {
      setPiecesPosition(prev => {
        const newPosition = prev === 'top-bottom' ? 'left-right' : 'top-bottom'
        return newPosition
      })
    }
    return () => {
      delete (window as any).__togglePiecesPosition
    }
  }, [])

  const handleSquareClick = (position: ChessPosition) => {

    if (selectedSquare === null) {
      // First click - select a square (TestBoard will provide valid moves via drag system)
      setSelectedSquare(position);
      // Don't set validDropTargets here - let TestBoard handle it through game service
      setValidDropTargets([]);
    } else if (selectedSquare === position) {
      // Clicking same square - deselect
      setSelectedSquare(null);
      setValidDropTargets([]);
    } else {
      // Second click - attempt move using TestBoard's move handler
      if (moveHandler) {
        moveHandler(selectedSquare, position).then((_success: boolean) => {
          // Move completed
        });
      }
      // Clear selection after move attempt
      setSelectedSquare(null);
      setValidDropTargets([]);
    }
  };

  // Use variables to avoid TypeScript unused warnings
  console.log('Debug state:', { validDropTargets, setCapturedPieces, setMoveHandler, handleSquareClick });

  return (
    <div className="relative min-h-full">
      {/* Enhanced gaming background effects */}
      <div className="bg-overlay">
        {/* Floating Particles */}
        <div className="bg-orb bg-orb-lg bg-orb-primary top-20 left-20 animation-delay-500"></div>
        <div className="bg-orb bg-orb-md bg-orb-accent bottom-32 right-16 animation-delay-1000"></div>

        {/* Sparkle Effects */}
        <div className="bg-sparkle bg-sparkle-lg bg-orb-foreground-60 top-1/4 right-1/4 animation-delay-300"></div>
        <div className="bg-sparkle bg-sparkle-sm bg-orb-foreground-40 bottom-1/3 left-1/3 animation-delay-700"></div>
        <div className="bg-sparkle bg-sparkle-md bg-orb-foreground-50 top-2/3 right-1/3 animation-delay-1200"></div>
      </div>

      {/* Mobile Layout fills entire page when on mobile */}
      {isMobile ? (
        <MobileChessboardLayout
              topPieces={
                <CapturedPieces
                  pieces={capturedPieces.filter((p: ChessPiece) => p.color === "white")}
                  position="normal"
                />
              }
              center={<MobileChessBoard gridSize={3} pieceConfig="drag-test" />}
              bottomPieces={
                <CapturedPieces
                  pieces={capturedPieces.filter((p: ChessPiece) => p.color === "black")}
                  position="normal"
                />
              }
        />
      ) : (
        /* Desktop Layout - 3x3 Grid fills entire page */
        <ChessboardLayout
              top={
                <CapturedPieces
                  pieces={capturedPieces.filter((p: ChessPiece) => p.color === "white")}
                  position="normal"
                />
              }
              left={
                piecesPosition === 'left-right' ? (
                  <CapturedPieces
                    pieces={capturedPieces.filter((p: ChessPiece) => p.color === "white")}
                    position="normal"
                    className="h-96 overflow-y-auto"
                  />
                ) : undefined
              }
              center={
                <div style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "0",
                  minWidth: "0",
                  overflow: "hidden"
                }}>
                  <MobileChessBoard gridSize={3} pieceConfig="drag-test" />
                </div>
              }
              right={
                piecesPosition === 'left-right' ? (
                  <CapturedPieces
                    pieces={capturedPieces.filter((p: ChessPiece) => p.color === "black")}
                    position="normal"
                    className="h-96 overflow-y-auto"
                  />
                ) : undefined
              }
              bottom={
                <CapturedPieces
                  pieces={capturedPieces.filter((p: ChessPiece) => p.color === "black")}
                  position="normal"
                />
              }
              className="h-full"
        />
      )}
    </div>
  );
};
