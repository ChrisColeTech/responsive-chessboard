import React, { useState } from "react";
import { TestBoard } from "../../components/TestBoard";
import { CapturedPieces } from "../../components/CapturedPieces";
import { usePageInstructions } from "../../hooks/usePageInstructions";
import { useDragTestActions } from "../../hooks/useDragTestActions";
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
  usePageInstructions("uitests.drag-test");

  // Expose toggle function globally for actions to use
  React.useEffect(() => {
    (window as any).__togglePiecesPosition = () => {
      setPiecesPosition(prev => {
        const newPosition = prev === 'top-bottom' ? 'left-right' : 'top-bottom'
        console.log(`🔄 [DRAG TEST PAGE] Toggling pieces position: ${prev} → ${newPosition}`)
        return newPosition
      })
    }
    return () => {
      delete (window as any).__togglePiecesPosition
    }
  }, [])

  const handleSquareClick = (position: ChessPosition) => {
    console.log(`🎯 [DRAG TEST PAGE] Square clicked: ${position}`);

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
        console.log(
          `🎯 [DRAG TEST PAGE] Executing move: ${selectedSquare} → ${position}`
        );
        moveHandler(selectedSquare, position).then((success) => {
          console.log(
            `🎯 [DRAG TEST PAGE] Move result: ${success ? "SUCCESS" : "FAILED"}`
          );
        });
      }
      // Clear selection after move attempt
      setSelectedSquare(null);
      setValidDropTargets([]);
    }
  };

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

      <section className="relative z-10 space-y-8">
        {/* Chess Board Layout Wrapper with proper spacing */}
        <div>
          
          {/* Top-Bottom Mode: Traditional layout */}
          {piecesPosition === 'top-bottom' && (
            <div className="test-container" style={{
              resize: "both",
              overflow: "hidden", 
              minWidth: "200px",
              minHeight: "200px",
              width: "100%",
              height: "clamp(400px, 60vh, 700px)", // Slightly taller to accommodate pieces
              display: "flex",
              flexDirection: "column",
              containerType: "size",
              gap: "1rem"
            }}>
              {/* White Captured Pieces - Above board */}
              <div className="flex-shrink-0">
                <CapturedPieces
                  pieces={capturedPieces.filter((p) => p.color === "white")}
                  position="normal"
                />
              </div>

              {/* Chess Board - Centered and square */}
              <div style={{
                flex: "1",
                display: "flex", 
                alignItems: "center",
                justifyContent: "center",
                minHeight: "0"
              }}>
                <div style={{
                  width: "min(100cqw, calc(100cqh - 200px))", // Account for captured pieces height
                  height: "min(100cqw, calc(100cqh - 200px))",
                  aspectRatio: "1",
                }}>
                  <TestBoard
                    onSquareClick={handleSquareClick}
                    selectedSquare={selectedSquare}
                    validDropTargets={validDropTargets}
                    onCapturedPiecesChange={setCapturedPieces}
                    onMoveHandlerReady={(handler) => {
                      console.log("🎯 [DRAG TEST PAGE] Move handler ready");
                      setMoveHandler(() => handler);
                    }}
                  />
                </div>
              </div>

              {/* Black Captured Pieces - Below board */}
              <div className="flex-shrink-0">
                <CapturedPieces
                  pieces={capturedPieces.filter((p) => p.color === "black")}
                  position="normal"
                />
              </div>
            </div>
          )}

          {/* Left-Right Mode: Side layout */}
          {piecesPosition === 'left-right' && (
            <div className="flex items-center gap-8 w-full">
              {/* White Captured Pieces - Left side */}
              <div className="w-32 flex-shrink-0">
                <CapturedPieces
                  pieces={capturedPieces.filter((p) => p.color === "white")}
                  position="normal"
                  className="h-96 overflow-y-auto"
                />
              </div>

              {/* Chess Board Container */}
              <div
                className="test-container flex-1"
                style={{
                  resize: "both",
                  overflow: "hidden",
                  minWidth: "200px",
                  minHeight: "200px",
                  height: "clamp(300px, 50vh, 600px)",
                  display: "flex",
                  flexDirection: "column",
                  containerType: "size",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "0",
                  }}
                >
                  <div
                    style={{
                      width: "min(100cqw, 100cqh)",
                      height: "min(100cqw, 100cqh)",
                      aspectRatio: "1",
                    }}
                  >
                    <TestBoard
                      onSquareClick={handleSquareClick}
                      selectedSquare={selectedSquare}
                      validDropTargets={validDropTargets}
                      onCapturedPiecesChange={setCapturedPieces}
                      onMoveHandlerReady={(handler) => {
                        console.log("🎯 [DRAG TEST PAGE] Move handler ready");
                        setMoveHandler(() => handler);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Black Captured Pieces - Right side */}
              <div className="w-32 flex-shrink-0">
                <CapturedPieces
                  pieces={capturedPieces.filter((p) => p.color === "black")}
                  position="normal"
                  className="h-96 overflow-y-auto"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
