// MobileChessSquare.tsx - Individual chess square component
import React from 'react';
import type { ChessPosition, ChessPiece } from '../../types';
import { getPieceImagePath } from '../../constants/pieces.constants';
import { useAppStore } from '../../stores/appStore';

interface MobileChessSquareProps {
  square: ChessPosition;
  piece: ChessPiece | null;
  isSelected: boolean;
  isValidMove: boolean;
  isInCheck: boolean;
  isLastMove: boolean;
  onSquareTap: (square: ChessPosition) => void;
  onDragStart: (piece: ChessPiece, square: ChessPosition, pieceSize: number) => void;
}

export const MobileChessSquare: React.FC<MobileChessSquareProps> = ({
  square,
  piece,
  isSelected,
  isValidMove,
  isInCheck,
  isLastMove,
  onSquareTap,
  onDragStart,
}) => {
  
  // Get selected piece set from app store
  const selectedPieceSet = useAppStore((state) => state.selectedPieceSet);
  
  // Calculate square color (alternating pattern)
  const getSquareColor = (): string => {
    const file = square[0];
    const rank = parseInt(square[1]);
    const fileIndex = file.charCodeAt(0) - "a".charCodeAt(0);
    const isLight = (fileIndex + rank) % 2 === 0;
    return isLight ? "#F0D9B5" : "#B58863";
  };

  // Calculate visual styling based on square state
  const getSquareStyle = () => {
    let borderColor = "rgba(139, 69, 19, 0.3)";
    let borderWidth = "1px";
    let backgroundColor = getSquareColor();
    let boxShadow = "";

    if (isInCheck) {
      // King in check - highest priority
      borderColor = "#FF0000";
      borderWidth = "4px";
      backgroundColor = `${getSquareColor()}CC`; // Add transparency
      boxShadow = "inset 0 0 10px rgba(255, 0, 0, 0.3)";
    } else if (isSelected) {
      // Selected square
      borderColor = "#4A90E2";
      borderWidth = "3px";
    } else if (isLastMove) {
      // Last move highlight
      borderColor = "#FFD700";
      borderWidth = "2px";
      boxShadow = "inset 0 0 5px rgba(255, 215, 0, 0.3)";
    }

    if (isValidMove) {
      // Valid move target - green glow
      boxShadow += (boxShadow ? ", " : "") + "inset 0 0 0 3px rgba(0, 255, 0, 0.6)";
    }

    return {
      backgroundColor,
      border: `${borderWidth} solid ${borderColor}`,
      boxShadow,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: piece ? "grab" : "default",
      position: "relative" as const,
      userSelect: "none" as const,
      touchAction: "manipulation" as const,
      WebkitTapHighlightColor: "transparent",
      minHeight: "44px", // Standard accessibility touch target
      transition: "all 0.2s ease",
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!piece) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Calculate piece size
    const pieceElement = e.target as HTMLImageElement;
    const actualSize = Math.max(pieceElement.offsetWidth, pieceElement.offsetHeight);
    
    onDragStart(piece, square, actualSize);
  };

  const handleClick = () => {
    onSquareTap(square);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSquareTap(square);
  };

  return (
    <div
      data-square={square} // Essential for drop detection
      onClick={handleClick}
      onTouchEnd={handleTouchEnd}
      style={getSquareStyle()}
    >
      {piece && (
        <img
          src={getPieceImagePath(piece.color, piece.type, selectedPieceSet, square)}
          alt={`${piece.color} ${piece.type}`}
          draggable={false}
          onMouseDown={handleMouseDown}
          style={{
            width: "88%",
            height: "88%",
            cursor: "grab",
            userSelect: "none",
            pointerEvents: "auto",
            minWidth: "40px",
            minHeight: "40px",
            // Mobile contrast enhancements
            ...(window.matchMedia && window.matchMedia("(max-width: 768px)").matches && {
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
              borderRadius: "4px",
              background: "rgba(255, 255, 255, 0.1)",
            }),
          }}
          onError={(e) => {
            console.log(`Failed to load piece image: ${getPieceImagePath(piece.color, piece.type, selectedPieceSet, square)}`);
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      
      {/* Square labels - only on bottom and right edges */}
      {(square[1] === "1" || square[0] === "h") && (
        <div
          style={{
            position: "absolute",
            bottom: "1px",
            right: "2px",
            fontSize: "8px",
            fontWeight: "bold",
            color: getSquareColor() === "#F0D9B5" ? "#8B4513" : "#F0D9B5",
            pointerEvents: "none",
            opacity: 0.7,
          }}
        >
          {square}
        </div>
      )}

      {/* Valid move indicator dot */}
      {isValidMove && !piece && (
        <div
          style={{
            position: "absolute",
            width: "12px",
            height: "12px",
            backgroundColor: "rgba(0, 255, 0, 0.8)",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
};