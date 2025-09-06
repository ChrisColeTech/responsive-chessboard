import React, { useState } from "react";
import { Volume2, RotateCcw, Sword, Target } from "lucide-react";
import { TestBoard } from "../../components/TestBoard";
import { CapturedPieces } from "../../components/CapturedPieces";
import { useChessAudio } from "../../services/audioService";
import { usePageInstructions } from "../../hooks/usePageInstructions";
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
  const { playMove, playError } = useChessAudio();
  usePageInstructions("uitests.drag-test");

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
    <div className="relative min-h-full pb-12">
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
        {/* White Captured Pieces - Above Board */}
        <CapturedPieces
          pieces={capturedPieces.filter((p) => p.color === "white")}
          className="mb-4"
        />

        {/* Resizable container for testing - 100% width by default */}
        <div
          className="test-container"
          style={{
            resize: "both",
            overflow: "hidden",
            minWidth: "200px",
            minHeight: "200px",
            width: "100%", // Start at 100% width
            height: "clamp(300px, 50vh, 600px)", // Reduced default height for better mobile experience
            display: "flex",
            flexDirection: "column",
            containerType: "size", // Modern CSS container queries
          }}
        >
          {/* TestBoard with clean container query approach */}
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
                width: "min(100cqw, 100cqh)", // Use container query units
                height: "min(100cqw, 100cqh)", // Same size for square
                aspectRatio: "1", // Force square
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

        {/* Black Captured Pieces - Below Board */}
        <CapturedPieces
          pieces={capturedPieces.filter((p) => p.color === "black")}
          className="mt-4"
        />

        {/* Professional Control Panel - Fully Responsive */}
        <div className="control-panel">
          <div className="control-header">
            <div className="status-indicator"></div>
            <h4 className="text-sm font-semibold text-foreground/90">
              Testing Controls
            </h4>
          </div>
          <div className="grid-control grid-control-2-4 grid-control-responsive">
            <button
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  (window as any).__testBoardReset
                ) {
                  (window as any).__testBoardReset();
                }
              }}
              className="group relative btn-muted"
            >
              <div className="icon-button-content">
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </div>
            </button>

            <button
              onClick={() => {
                playMove(false);
                console.log("Move sound test");
              }}
              className="group relative btn-secondary"
            >
              <div className="icon-button-content">
                <Volume2 className="w-4 h-4" />
                <span>Move</span>
              </div>
            </button>

            <button
              onClick={() => {
                playMove(true);
                console.log("Capture sound test");
              }}
              className="group relative btn-primary"
            >
              <div className="icon-button-content">
                <Target className="w-4 h-4" />
                <span>Capture</span>
              </div>
            </button>

            <button
              onClick={() => {
                playError();
                console.log("Error sound test");
              }}
              className="group relative btn-destructive"
            >
              <div className="icon-button-content">
                <Sword className="w-4 h-4" />
                <span>Error</span>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
