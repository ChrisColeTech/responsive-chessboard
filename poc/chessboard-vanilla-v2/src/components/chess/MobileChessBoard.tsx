// Dynamic 2x2 Grid with Click Tracking and Animation
import React, { useState, useEffect } from "react";
import {
  generateChessGridCells,
  type GridCell,
} from "../../utils/grid-generator.utils";
import { useTheme } from "../../contexts/ThemeContext";
import { useChessBoardAudio } from "../../hooks/audio/useChessBoardAudio";

interface MobileChessBoardProps {
  onGameStateChange?: (gameState: any) => void;
  onCapturedPiecesChange?: (pieces: any[]) => void;
}

export const MobileChessBoard: React.FC<MobileChessBoardProps> = () => {
  const { currentTheme, isDarkMode } = useTheme();
  const {
    playPieceSelection,
    playPieceDeselection,
    playPieceMove,
    playInvalidMove,
  } = useChessBoardAudio();

  console.log(
    "🎨 [DEBUG] MobileChessBoard render start with theme:",
    currentTheme,
    isDarkMode
  );
  console.log(
    "🎨 [DEBUG] Current document classes at render:",
    document.documentElement.className
  );
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  // const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null); // TODO: Re-enable for move highlighting
  const [animatingPiece, setAnimatingPiece] = useState<{
    piece: { symbol: string; color: string; type: string };
    from: string;
    to: string;
  } | null>(null);
  const [animationStep, setAnimationStep] = useState<"start" | "end">("start");
  const [capturedPieces, setCapturedPieces] = useState<
    {
      cellId: string;
      piece: { symbol: string; color: string; type: string };
      id: string;
      isAnimating: boolean;
    }[]
  >([]);

  // Generate 16 cells (4x4 grid) with chess-style alternating colors using CSS classes
  const [gridCells, setGridCells] = useState<GridCell[]>([]);

  useEffect(() => {
    console.log(
      "🎨 [DEBUG] Generating grid cells with CSS classes for theme:",
      currentTheme,
      isDarkMode
    );

    const cells = generateChessGridCells(16, "", "", {
      showCoordinates: true,
      coordinateStyle: "edges",
      showFiles: true,
      showRanks: true,
    });
    setGridCells(cells);
    console.log(
      "🎨 [DEBUG] Grid cells generated and set, count:",
      cells.length
    );
  }, [currentTheme, isDarkMode]);

  // Define pieces and their positions using chess notation
  const [pieces, setPieces] = useState<
    Record<string, { symbol: string; color: string; type: string }>
  >({
    a4: { symbol: "♔", color: "white", type: "king" }, // Top-left: White King
    b4: { symbol: "♕", color: "white", type: "queen" }, // Top-row: White Queen
    c1: { symbol: "♛", color: "black", type: "queen" }, // Bottom-row: Black Queen
    d1: { symbol: "♚", color: "black", type: "king" }, // Bottom-right: Black King
  });

  // Convert chess notation to pixel coordinates for absolute positioning (4x4 grid)
  const cellToPixelPosition = (cellId: string) => {
    // Parse chess notation: e.g., "a4" -> file='a', rank=4
    const file = cellId[0]; // a, b, c, d
    const rank = parseInt(cellId[1]); // 1, 2, 3, 4

    // Convert to 0-indexed coordinates
    const column = file.charCodeAt(0) - "a".charCodeAt(0); // a=0, b=1, c=2, d=3
    const row = 4 - rank; // rank 4=row 0 (top), rank 1=row 3 (bottom)

    // Each cell is 25% of grid width/height, centered
    return {
      left: `${column * 25 + 12.5}%`, // 12.5%, 37.5%, 62.5%, 87.5% (center of each cell)
      top: `${row * 25 + 12.5}%`, // 12.5%, 37.5%, 62.5%, 87.5% (center of each cell)
    };
  };

  const handleCellClick = (cellId: string) => {
    const pieceAtCell = pieces[cellId];

    if (selectedCell === null) {
      // First click - select cell only if it has a piece
      if (pieceAtCell) {
        setSelectedCell(cellId);
        playPieceSelection(); // 🔊 Audio feedback
        console.log(
          `Selected ${pieceAtCell.color} ${pieceAtCell.type} at: ${cellId}`
        );
      } else {
        playInvalidMove(); // 🔊 Audio feedback for empty cell
        console.log(`Clicked empty cell: ${cellId}`);
      }
    } else if (selectedCell === cellId) {
      // Clicking same cell - deselect
      setSelectedCell(null);
      playPieceDeselection(); // 🔊 Audio feedback
      console.log(`Deselected piece at: ${cellId}`);
    } else {
      // Second click - move piece to new cell
      const move = { from: selectedCell, to: cellId };
      // setLastMove(move); // TODO: Re-enable for move highlighting

      const movingPiece = pieces[selectedCell];
      if (movingPiece) {
        // Check if this move captures an enemy piece
        const targetPiece = pieces[cellId];
        const wasCapture = !!targetPiece;

        // If capturing, add the captured piece to capture animation list
        if (wasCapture && targetPiece) {
          const captureId = `capture-${cellId}-${Date.now()}`;
          setCapturedPieces((prev) => [
            ...prev,
            {
              cellId,
              piece: targetPiece,
              id: captureId,
              isAnimating: false,
            },
          ]);

          // Start the capture animation after a small delay
          setTimeout(() => {
            setCapturedPieces((prev) =>
              prev.map((cp) =>
                cp.id === captureId ? { ...cp, isAnimating: true } : cp
              )
            );
          }, 10);

          // Remove captured piece after animation completes
          setTimeout(() => {
            setCapturedPieces((prev) =>
              prev.filter((cp) => cp.id !== captureId)
            );
          }, 410); // Reduced from 610ms to 410ms
        }

        // Play move audio feedback
        playPieceMove(wasCapture); // 🔊 Audio feedback

        // Remove both moving piece and captured piece from current positions
        setPieces((prev) => {
          const newPieces = { ...prev };
          delete newPieces[selectedCell];
          // Also remove captured piece immediately
          if (wasCapture) {
            delete newPieces[cellId];
          }
          return newPieces;
        });

        // Start animation with the piece
        setAnimatingPiece({
          piece: movingPiece,
          from: selectedCell,
          to: cellId,
        });
        setAnimationStep("start");

        // Trigger animation after a small delay
        setTimeout(() => {
          setAnimationStep("end");
        }, 10);

        // Complete the move after animation
        setTimeout(() => {
          setPieces((prev) => ({
            ...prev,
            [cellId]: movingPiece,
          }));
          setAnimatingPiece(null);
          setAnimationStep("start");
        }, 250);
      }

      setSelectedCell(null);
      console.log(`Moved piece: ${move.from} → ${move.to}`);
    }
  };

  const getCellStyle = (cell: GridCell) => ({
    backgroundColor:
      selectedCell === cell.id
        ? "var(--chess-selected-square)" // Use chess-specific selection color
        : undefined, // Let CSS variables handle the background color
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1",
        position: "relative", // Enable absolute positioning for pieces
      }}
    >
      {/* Grid Container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4x4 grid
          gridTemplateRows: "repeat(4, 1fr)",
          gap: "0px",
        }}
      >
        {gridCells.map((cell) =>
          React.cloneElement(cell.element as React.ReactElement<any>, {
            key: cell.id,
            onClick: () => handleCellClick(cell.id),
            style: {
              ...(cell.element.props as any).style,
              ...getCellStyle(cell),
            },
          })
        )}
      </div>

      {/* Static Chess Pieces */}
      {Object.entries(pieces).map(([cellId, piece]) => {
        const position = cellToPixelPosition(cellId);
        return (
          <div
            key={`piece-${cellId}`}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              transform: "translate(-50%, -50%)",
              fontSize: "min(20vw, 20vh)",
              zIndex: 10,
              pointerEvents: "none",
              userSelect: "none",
              color:
                piece.color === "white"
                  ? "var(--chess-piece-white)"
                  : "var(--chess-piece-black)",
              filter:
                piece.color === "white"
                  ? "var(--chess-piece-white-shadow)"
                  : "var(--chess-piece-black-shadow)",
              textShadow:
                piece.color === "white"
                  ? "var(--chess-piece-white-text-shadow)"
                  : "var(--chess-piece-black-text-shadow)",
            }}
          >
            {piece.symbol}
          </div>
        );
      })}

      {/* Animated Piece (during movement) */}
      {animatingPiece && (
        <div
          key="animating-piece"
          style={{
            position: "absolute",
            left:
              animationStep === "start"
                ? cellToPixelPosition(animatingPiece.from).left
                : cellToPixelPosition(animatingPiece.to).left,
            top:
              animationStep === "start"
                ? cellToPixelPosition(animatingPiece.from).top
                : cellToPixelPosition(animatingPiece.to).top,
            transform: "translate(-50%, -50%)",
            fontSize: "min(20vw, 20vh)",
            color:
              animatingPiece.piece.color === "white"
                ? "var(--chess-piece-white)"
                : "var(--chess-piece-black)",
            transition:
              animationStep === "end"
                ? "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            zIndex: 20, // Higher z-index during animation
            pointerEvents: "none",
            userSelect: "none",
            filter:
              animatingPiece.piece.color === "white"
                ? "var(--chess-piece-white-shadow)"
                : "var(--chess-piece-black-shadow)",
            textShadow:
              animatingPiece.piece.color === "white"
                ? "var(--chess-piece-white-text-shadow)"
                : "var(--chess-piece-black-text-shadow)",
          }}
        >
          {animatingPiece.piece.symbol}
        </div>
      )}

      {/* Captured Pieces (shrinking animation) */}
      {capturedPieces.map((capturedPiece) => {
        const position = cellToPixelPosition(capturedPiece.cellId);

        return (
          <div
            key={capturedPiece.id}
            style={{
              position: "absolute",
              left: position.left,
              top: position.top,
              transform: capturedPiece.isAnimating
                ? "translate(-50%, -50%) scale(0)"
                : "translate(-50%, -50%) scale(1)",
              fontSize: "min(20vw, 20vh)",
              color:
                capturedPiece.piece.color === "white"
                  ? "var(--chess-piece-white)"
                  : "var(--chess-piece-black)",
              opacity: capturedPiece.isAnimating ? 0 : 1,
              transition: capturedPiece.isAnimating
                ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease-out"
                : "none",
              zIndex: 15, // Above static pieces, below moving piece
              pointerEvents: "none",
              userSelect: "none",
              filter:
                capturedPiece.piece.color === "white"
                  ? "var(--chess-piece-white-shadow)"
                  : "var(--chess-piece-black-shadow)",
              textShadow:
                capturedPiece.piece.color === "white"
                  ? "var(--chess-piece-white-text-shadow)"
                  : "var(--chess-piece-black-text-shadow)",
            }}
          >
            {capturedPiece.piece.symbol}
          </div>
        );
      })}
    </div>
  );
};
