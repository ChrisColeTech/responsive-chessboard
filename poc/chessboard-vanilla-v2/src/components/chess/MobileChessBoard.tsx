// Dynamic 2x2 Grid with Click Tracking and Animation
import React, { useState, useEffect } from "react";
import { generateChessGridCells, type GridCell } from "../../utils/grid-generator.utils";

interface MobileChessBoardProps {
  onGameStateChange?: (gameState: any) => void;
  onCapturedPiecesChange?: (pieces: any[]) => void;
}

export const MobileChessBoard: React.FC<MobileChessBoardProps> = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [animatingPiece, setAnimatingPiece] = useState<{
    piece: { symbol: string; color: string; type: string };
    from: string;
    to: string;
  } | null>(null);
  const [animationStep, setAnimationStep] = useState<'start' | 'end'>('start');
  
  // Generate 16 cells (4x4 grid) with chess-style alternating colors and coordinates only on edges
  const gridCells = generateChessGridCells(16, "#F0D9B5", "#B58863", {
    showCoordinates: true,
    coordinateStyle: 'edges',
    showFiles: true,
    showRanks: true
  });

  // Define pieces and their positions using chess notation
  const [pieces, setPieces] = useState<Record<string, { symbol: string; color: string; type: string }>>({
    "a4": { symbol: "♔", color: "white", type: "king" },    // Top-left: White King
    "b4": { symbol: "♕", color: "white", type: "queen" },   // Top-row: White Queen  
    "c1": { symbol: "♛", color: "black", type: "queen" },  // Bottom-row: Black Queen
    "d1": { symbol: "♚", color: "black", type: "king" }    // Bottom-right: Black King
  });

  // Convert chess notation to pixel coordinates for absolute positioning (4x4 grid)
  const cellToPixelPosition = (cellId: string) => {
    // Parse chess notation: e.g., "a4" -> file='a', rank=4
    const file = cellId[0]; // a, b, c, d
    const rank = parseInt(cellId[1]); // 1, 2, 3, 4
    
    // Convert to 0-indexed coordinates
    const column = file.charCodeAt(0) - 'a'.charCodeAt(0); // a=0, b=1, c=2, d=3
    const row = 4 - rank; // rank 4=row 0 (top), rank 1=row 3 (bottom)
    
    // Each cell is 25% of grid width/height, centered
    return {
      left: `${column * 25 + 12.5}%`, // 12.5%, 37.5%, 62.5%, 87.5% (center of each cell)
      top: `${row * 25 + 12.5}%`      // 12.5%, 37.5%, 62.5%, 87.5% (center of each cell)
    };
  };

  const handleCellClick = (cellId: string) => {
    const pieceAtCell = pieces[cellId];
    
    if (selectedCell === null) {
      // First click - select cell only if it has a piece
      if (pieceAtCell) {
        setSelectedCell(cellId);
        console.log(`Selected ${pieceAtCell.color} ${pieceAtCell.type} at: ${cellId}`);
      } else {
        console.log(`Clicked empty cell: ${cellId}`);
      }
    } else if (selectedCell === cellId) {
      // Clicking same cell - deselect
      setSelectedCell(null);
      console.log(`Deselected piece at: ${cellId}`);
    } else {
      // Second click - move piece to new cell
      const move = { from: selectedCell, to: cellId };
      setLastMove(move);
      
      const movingPiece = pieces[selectedCell];
      if (movingPiece) {
        // Remove piece from current position and start animation
        setPieces(prev => {
          const newPieces = { ...prev };
          delete newPieces[selectedCell];
          return newPieces;
        });
        
        // Start animation with the piece
        setAnimatingPiece({
          piece: movingPiece,
          from: selectedCell,
          to: cellId
        });
        setAnimationStep('start');
        
        // Trigger animation after a small delay
        setTimeout(() => {
          setAnimationStep('end');
        }, 10);
        
        // Complete the move after animation
        setTimeout(() => {
          setPieces(prev => ({
            ...prev,
            [cellId]: movingPiece
          }));
          setAnimatingPiece(null);
          setAnimationStep('start');
        }, 300);
      }
      
      setSelectedCell(null);
      console.log(`Moved piece: ${move.from} → ${move.to}`);
    }
  };

  const getCellStyle = (cell: GridCell) => ({
    backgroundColor: selectedCell === cell.id 
      ? "rgba(255, 255, 0, 0.8)" // Yellow when selected
      : lastMove && (lastMove.from === cell.id || lastMove.to === cell.id)
      ? "rgba(0, 255, 0, 0.6)" // Green for last move
      : cell.backgroundColor,
    border: selectedCell === cell.id ? "3px solid orange" : "1px solid #333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "24px",
    fontWeight: "bold",
    transition: "all 0.2s ease"
  });

  return (
    <div 
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "min(90vw, 80vh)",
        aspectRatio: "1",
        position: "relative" // Enable absolute positioning for pieces
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
          gap: "2px"
        }}
      >
        {gridCells.map((cell) => 
          React.cloneElement(cell.element as React.ReactElement<any>, {
            key: cell.id,
            onClick: () => handleCellClick(cell.id),
            style: {
              ...(cell.element.props as any).style,
              ...getCellStyle(cell)
            }
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
              filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
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
            left: animationStep === 'start' 
              ? cellToPixelPosition(animatingPiece.from).left 
              : cellToPixelPosition(animatingPiece.to).left,
            top: animationStep === 'start' 
              ? cellToPixelPosition(animatingPiece.from).top 
              : cellToPixelPosition(animatingPiece.to).top,
            transform: "translate(-50%, -50%)",
            fontSize: "min(20vw, 20vh)",
            transition: animationStep === 'end' ? "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            zIndex: 20, // Higher z-index during animation
            pointerEvents: "none",
            userSelect: "none",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
          }}
        >
          {animatingPiece.piece.symbol}
        </div>
      )}
    </div>
  );
};