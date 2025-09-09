// Wrapper-based animation system for MobileChessBoard
import React from "react";
import { useWrapperChessBoard } from "../../hooks/chess/useWrapperChessBoard";
import { ChessGrid } from "./ChessGrid";
import { ChessOverlay } from "./ChessOverlay";
import { PieceWrapper } from "./PieceWrapper";
import type { MobileChessGameState, ChessPiece } from "../../types";

interface MobileChessBoardProps {
  gridSize?: number;
  pieceConfig?: 'drag-test' | 'mobile-test';
  onGameStateChange?: (gameState: MobileChessGameState) => void;
  onCapturedPiecesChange?: (pieces: ChessPiece[]) => void;
}

export const MobileChessBoard: React.FC<MobileChessBoardProps> = ({ gridSize = 8, pieceConfig }) => {
  // Centralized responsive piece sizing based on grid size
  const GRID_SIZE = gridSize;
  const PIECE_SIZE = `min(${100 / GRID_SIZE * 0.72}vw, ${100 / GRID_SIZE * 0.72}vh)`;
  
  // Use hook for chess board state
  const { selectedCell, hoveredCell, setHoveredCell, wrapperPieces, handleCellClick, handlePieceClick, handleDragStart, handleDrop, isFlipped, isDragging, setDraggedPiece } = useWrapperChessBoard(GRID_SIZE, pieceConfig);
  
  // Debug dragging state
  React.useEffect(() => {
    console.log('📱 [MOBILE] isDragging changed to:', isDragging);
  }, [isDragging]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "1",
        position: "relative",
      }}
    >
      {/* Chess Grid */}
      <ChessGrid 
        gridSize={GRID_SIZE}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
        onCellDrop={handleDrop}
        onHoverChange={setHoveredCell}
        isFlipped={isFlipped}
        isDragging={isDragging}
      />

      {/* Chess Overlay - Glassmorphism effects */}
      <ChessOverlay
        gridSize={GRID_SIZE}
        selectedCell={selectedCell}
        hoveredCell={hoveredCell}
        isFlipped={isFlipped}
      />

      {/* Piece Pool - All pieces in wrappers with CSS transforms */}
      <div className="piece-pool" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
        {wrapperPieces.map(piece => (
          <PieceWrapper
            key={piece.id}
            piece={piece}
            size={PIECE_SIZE}
            gridSize={GRID_SIZE}
            onDragStart={handleDragStart}
            onPieceClick={handlePieceClick}
            onDrop={handleDrop}
            setDraggedPiece={setDraggedPiece}
          />
        ))}
      </div>
    </div>
  );
};