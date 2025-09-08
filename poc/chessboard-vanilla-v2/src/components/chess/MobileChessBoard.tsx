// MobileChessBoard.tsx - 8x8 mobile chess board component
import React, { useState, useEffect } from 'react';
import { MobileChessSquare } from './MobileChessSquare';
import type { ChessPiece, ChessPosition, MobileChessGameState } from '../../types';
import { generateChessSquares } from '../../utils/chess/mobileBoardUtils';

interface MobileChessBoardProps {
  onGameStateChange?: (gameState: MobileChessGameState) => void;
  onCapturedPiecesChange?: (pieces: ChessPiece[]) => void;
}

// Standard chess starting position
const initialChessPieces: Record<string, ChessPiece> = {
  // White pieces (ranks 1-2)
  a1: { id: 'white-rook-a1', type: 'rook', color: 'white', position: { file: 'a', rank: 1 } },
  b1: { id: 'white-knight-b1', type: 'knight', color: 'white', position: { file: 'b', rank: 1 } },
  c1: { id: 'white-bishop-c1', type: 'bishop', color: 'white', position: { file: 'c', rank: 1 } },
  d1: { id: 'white-queen-d1', type: 'queen', color: 'white', position: { file: 'd', rank: 1 } },
  e1: { id: 'white-king-e1', type: 'king', color: 'white', position: { file: 'e', rank: 1 } },
  f1: { id: 'white-bishop-f1', type: 'bishop', color: 'white', position: { file: 'f', rank: 1 } },
  g1: { id: 'white-knight-g1', type: 'knight', color: 'white', position: { file: 'g', rank: 1 } },
  h1: { id: 'white-rook-h1', type: 'rook', color: 'white', position: { file: 'h', rank: 1 } },
  
  a2: { id: 'white-pawn-a2', type: 'pawn', color: 'white', position: { file: 'a', rank: 2 } },
  b2: { id: 'white-pawn-b2', type: 'pawn', color: 'white', position: { file: 'b', rank: 2 } },
  c2: { id: 'white-pawn-c2', type: 'pawn', color: 'white', position: { file: 'c', rank: 2 } },
  d2: { id: 'white-pawn-d2', type: 'pawn', color: 'white', position: { file: 'd', rank: 2 } },
  e2: { id: 'white-pawn-e2', type: 'pawn', color: 'white', position: { file: 'e', rank: 2 } },
  f2: { id: 'white-pawn-f2', type: 'pawn', color: 'white', position: { file: 'f', rank: 2 } },
  g2: { id: 'white-pawn-g2', type: 'pawn', color: 'white', position: { file: 'g', rank: 2 } },
  h2: { id: 'white-pawn-h2', type: 'pawn', color: 'white', position: { file: 'h', rank: 2 } },

  // Black pieces (ranks 7-8)
  a8: { id: 'black-rook-a8', type: 'rook', color: 'black', position: { file: 'a', rank: 8 } },
  b8: { id: 'black-knight-b8', type: 'knight', color: 'black', position: { file: 'b', rank: 8 } },
  c8: { id: 'black-bishop-c8', type: 'bishop', color: 'black', position: { file: 'c', rank: 8 } },
  d8: { id: 'black-queen-d8', type: 'queen', color: 'black', position: { file: 'd', rank: 8 } },
  e8: { id: 'black-king-e8', type: 'king', color: 'black', position: { file: 'e', rank: 8 } },
  f8: { id: 'black-bishop-f8', type: 'bishop', color: 'black', position: { file: 'f', rank: 8 } },
  g8: { id: 'black-knight-g8', type: 'knight', color: 'black', position: { file: 'g', rank: 8 } },
  h8: { id: 'black-rook-h8', type: 'rook', color: 'black', position: { file: 'h', rank: 8 } },
  
  a7: { id: 'black-pawn-a7', type: 'pawn', color: 'black', position: { file: 'a', rank: 7 } },
  b7: { id: 'black-pawn-b7', type: 'pawn', color: 'black', position: { file: 'b', rank: 7 } },
  c7: { id: 'black-pawn-c7', type: 'pawn', color: 'black', position: { file: 'c', rank: 7 } },
  d7: { id: 'black-pawn-d7', type: 'pawn', color: 'black', position: { file: 'd', rank: 7 } },
  e7: { id: 'black-pawn-e7', type: 'pawn', color: 'black', position: { file: 'e', rank: 7 } },
  f7: { id: 'black-pawn-f7', type: 'pawn', color: 'black', position: { file: 'f', rank: 7 } },
  g7: { id: 'black-pawn-g7', type: 'pawn', color: 'black', position: { file: 'g', rank: 7 } },
  h7: { id: 'black-pawn-h7', type: 'pawn', color: 'black', position: { file: 'h', rank: 7 } },
};

export const MobileChessBoard: React.FC<MobileChessBoardProps> = ({
  onGameStateChange: _onGameStateChange,
  onCapturedPiecesChange: _onCapturedPiecesChange
}) => {
  const [pieces] = useState(initialChessPieces);
  const [selectedSquare, setSelectedSquare] = useState<ChessPosition | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate all 64 squares for 8x8 board
  const squares = generateChessSquares();

  // Loading animation effect (following TestBoard pattern)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle square tap (placeholder - no logic for now)
  const handleSquareTap = (square: ChessPosition) => {
    console.log(`📱 [MOBILE CHESS BOARD] Square tapped: ${square}`);
    setSelectedSquare(selectedSquare === square ? null : square);
  };

  // Handle drag start (placeholder - no logic for now)
  const handleDragStart = (piece: ChessPiece, square: ChessPosition, pieceSize: number) => {
    console.log(`📱 [MOBILE CHESS BOARD] Drag started: ${piece.color} ${piece.type} from ${square}, size: ${pieceSize}px`);
  };

  return (
    <div 
      className={`transition-all duration-500 ease-out ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(8, 1fr)', 
        gridTemplateRows: 'repeat(8, 1fr)',
        aspectRatio: '1', // Force square shape
        border: '2px solid #8B4513', 
        borderRadius: '8px',
        boxSizing: 'border-box',
        gap: '0',
        minWidth: '200px',
        minHeight: '200px',
        maxWidth: '100%',
        maxHeight: '100%',
        margin: 'auto', // Center the board
        filter: isLoaded ? 'none' : 'blur(2px)',
        transform: 'translateZ(0)', // Force hardware acceleration
        background: '#2C1810', // Dark wood background
      }}
    >
      {squares.map((square) => {
        const piece = pieces[square] || null;
        const isSelected = selectedSquare === square;

        return (
          <MobileChessSquare
            key={square}
            square={square}
            piece={piece}
            isSelected={isSelected}
            isValidMove={false} // No move validation yet
            isInCheck={false}   // No check detection yet
            isLastMove={false}  // No move history yet
            onSquareTap={handleSquareTap}
            onDragStart={handleDragStart}
          />
        );
      })}
    </div>
  );
};