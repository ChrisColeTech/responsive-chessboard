// TestBoard.tsx - Simple 2x2 board using definitive POC mouse event pattern
import React, { useState, useEffect } from 'react';
import type { ChessPiece, ChessPosition } from '../types';
import { PIECE_SETS, getPieceImagePath } from '../constants/pieces.constants';
import { useDrag } from '../providers';

interface TestBoardProps {
  onSquareClick: (position: ChessPosition) => void;
  selectedSquare: ChessPosition | null;
  validDropTargets: ChessPosition[];
}

// Stable piece set selection
const pieceSetKeys = Object.keys(PIECE_SETS) as Array<keyof typeof PIECE_SETS>;
const STABLE_PIECE_SET = pieceSetKeys[0]; // Use first piece set consistently

// Initial test pieces for drag testing - with capturing
const initialTestPieces: Record<string, ChessPiece> = {
  a2: {
    id: 'test-white-queen-a2',
    type: 'queen',
    color: 'white',
    position: { file: 'a', rank: 2 }
  },
  b1: {
    id: 'test-black-pawn-b1',
    type: 'pawn',
    color: 'black',
    position: { file: 'b', rank: 1 }
  }
};

interface TestBoardProps {
  onSquareClick: (position: ChessPosition) => void;
  selectedSquare: ChessPosition | null;
  validDropTargets: ChessPosition[];
  onReset?: () => void;
}

export const TestBoard = ({ 
  onSquareClick, 
  selectedSquare, 
  validDropTargets,
  onReset 
}: TestBoardProps) => {
  const { startDrag, updateCursor, endDrag, clearDrag, setMoveHandler } = useDrag();
  const [testPieces, setTestPieces] = useState(initialTestPieces);
  const [capturedPieces, setCapturedPieces] = useState<ChessPiece[]>([]);

  // Set up TestBoard's own simple move handler with delay to override main app
  useEffect(() => {
    const handleTestMove = async (move: { from: ChessPosition, to: ChessPosition }) => {
      console.log(`🧪 [TEST BOARD] Handling move: ${move.from} → ${move.to}`);
      
      // Simple move logic for TestBoard
      setTestPieces(prevPieces => {
        const newPieces = { ...prevPieces };
        const piece = newPieces[move.from];
        const capturedPiece = newPieces[move.to];
        
        if (piece) {
          // If there's a piece to capture, add it to captured pieces
          if (capturedPiece) {
            setCapturedPieces(prev => [...prev, capturedPiece]);
            console.log(`🧪 [TEST BOARD] Piece captured: ${capturedPiece.color} ${capturedPiece.type}`);
          }
          
          // Move the piece
          delete newPieces[move.from];
          newPieces[move.to] = {
            ...piece,
            position: { 
              file: move.to[0] as any, 
              rank: parseInt(move.to[1]) as any 
            }
          };
          console.log(`🧪 [TEST BOARD] Move successful: piece moved to ${move.to}`);
          return newPieces;
        }
        
        console.log(`🧪 [TEST BOARD] Move failed: no piece at ${move.from}`);
        return prevPieces;
      });
      
      return true; // Always successful in TestBoard
    };
    
    // Use setTimeout to ensure TestBoard handler is set after main app handler
    const timer = setTimeout(() => {
      console.log('🧪 [TEST BOARD] Setting TestBoard move handler (overriding main app)');
      setMoveHandler(handleTestMove);
    }, 0);
    
    return () => clearTimeout(timer);
  }, [setMoveHandler]);

  // Reset function
  const handleReset = () => {
    setTestPieces(initialTestPieces);
    setCapturedPieces([]);
    if (onReset) onReset();
    console.log('🧪 [TEST BOARD] Board reset to initial position');
  };

  // Expose reset function
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__testBoardReset = handleReset;
    }
  }, []);

  // 2x2 squares: a1, b1, a2, b2
  const squares = ['a2', 'b2', 'a1', 'b1'];

  // POC Mouse Event Pattern - Document 20
  const handleMouseDown = (e: React.MouseEvent, piece: ChessPiece, square: string) => {
    if (!piece) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`🎯 [TEST BOARD] Mouse down: ${piece.color} ${piece.type} from ${square}`);
    
    // Start drag with valid moves (for now, allow all other squares)
    const validMoves = squares.filter(s => s !== square) as ChessPosition[];
    startDrag(piece, square as ChessPosition, validMoves);
    
    // Set up global mouse tracking
    const handleGlobalMouseMove = (moveEvent: MouseEvent) => {
      updateCursor(moveEvent.clientX, moveEvent.clientY);
    };
    
    const handleGlobalMouseUp = (upEvent: MouseEvent) => {
      cleanup();
      
      // Temporarily hide dragged piece to detect element underneath
      const draggedElement = document.querySelector('[style*="position: fixed"][style*="z-index: 1000"]') as HTMLElement;
      const originalDisplay = draggedElement?.style.display;
      if (draggedElement) {
        draggedElement.style.display = 'none';
      }
      
      // Use elementFromPoint to find drop target
      const targetElement = document.elementFromPoint(upEvent.clientX, upEvent.clientY);
      const targetSquare = targetElement?.getAttribute('data-square');
      
      // Restore dragged piece visibility
      if (draggedElement && originalDisplay !== undefined) {
        draggedElement.style.display = originalDisplay;
      }
      
      console.log('🎯 [TEST BOARD] Drop detection:', {
        x: upEvent.clientX,
        y: upEvent.clientY,
        targetElement: targetElement?.tagName,
        targetSquare,
        elementClasses: targetElement?.className
      });
      
      if (targetSquare) {
        console.log(`🎯 [TEST BOARD] Drop target found: ${targetSquare}`);
        endDrag(targetSquare as ChessPosition);
      } else {
        console.log('🎯 [TEST BOARD] No valid drop target - checking parent elements');
        // Try checking parent elements in case we hit a child element
        let element = targetElement;
        while (element && element !== document.body) {
          const square = element.getAttribute('data-square');
          if (square) {
            console.log(`🎯 [TEST BOARD] Found square in parent: ${square}`);
            endDrag(square as ChessPosition);
            return;
          }
          element = element.parentElement;
        }
        console.log('🎯 [TEST BOARD] No valid drop target found');
        clearDrag();
      }
    };
    
    const cleanup = () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
    
    // Add global listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const isValidTarget = (square: string) => {
    return validDropTargets.includes(square as ChessPosition);
  };

  const isSelected = (square: string) => {
    return selectedSquare === square;
  };

  const getSquareColor = (square: string) => {
    // Simple alternating colors for 2x2
    const isLight = (square === 'a2' || square === 'b1');
    return isLight ? '#F0D9B5' : '#B58863';
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '300px', // Reasonable max size
      margin: '16px auto 0', // Center it
      border: '2px solid #8B4513', 
      borderRadius: '4px'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gridTemplateRows: 'repeat(2, 1fr)',
        width: '100%',
        aspectRatio: '1', // Keep it square
        gap: '0'
      }}>
        {squares.map((square) => {
          const piece = testPieces[square];
          const isHighlighted = isSelected(square);
          const isValidDrop = isValidTarget(square);

          return (
            <div
              key={square}
              data-square={square} // Essential for drop detection
              onClick={() => onSquareClick(square as ChessPosition)}
              style={{
                backgroundColor: getSquareColor(square),
                border: isHighlighted ? '3px solid #4A90E2' : '1px solid #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: piece ? 'pointer' : 'default',
                position: 'relative',
                fontSize: '32px',
                userSelect: 'none',
                ...(isValidDrop && {
                  boxShadow: 'inset 0 0 0 4px rgba(0, 255, 0, 0.6)'
                })
              }}
            >
              {piece && (
                <img
                  src={getPieceImagePath(piece.color, piece.type, STABLE_PIECE_SET)}
                  alt={`${piece.color} ${piece.type}`}
                  draggable={false} // No HTML5 drag - use mouse events only
                  onMouseDown={(e) => handleMouseDown(e, piece, square)}
                  style={{
                    width: '70%',
                    height: '70%',
                    maxWidth: '60px',
                    maxHeight: '60px',
                    cursor: 'grab',
                    userSelect: 'none',
                    pointerEvents: 'auto'
                  }}
                  onError={(e) => {
                    console.log(`Failed to load piece image: ${getPieceImagePath(piece.color, piece.type, STABLE_PIECE_SET)}`);
                    // Fallback to Unicode if SVG fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              
              {/* Square label */}
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                fontSize: '10px',
                fontWeight: 'bold',
                color: getSquareColor(square) === '#F0D9B5' ? '#8B4513' : '#F0D9B5',
                pointerEvents: 'none'
              }}>
                {square}
              </div>

              {/* Valid move indicator */}
              {isValidDrop && !piece && (
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0, 255, 0, 0.6)',
                  pointerEvents: 'none'
                }} />
              )}
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        padding: '8px', 
        fontSize: '12px', 
        textAlign: 'center', 
        backgroundColor: 'rgba(0,0,0,0.1)',
        color: '#666'
      }}>
        2x2 Test Board - <strong>{STABLE_PIECE_SET}</strong> piece set<br/>
        ♕ White Queen & ♟ Black Pawn - Test capturing & movement
      </div>

      {/* Captured pieces indicator */}
      {capturedPieces.length > 0 && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#dc2626', marginBottom: '4px' }}>
            Captured Pieces
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
            {capturedPieces.map((piece, index) => (
              <img
                key={`${piece.id}-${index}`}
                src={getPieceImagePath(piece.color, piece.type, STABLE_PIECE_SET)}
                alt={`${piece.color} ${piece.type}`}
                style={{
                  width: '20px',
                  height: '20px',
                  opacity: 0.7
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Reset button */}
      <div style={{ marginTop: '8px', textAlign: 'center' }}>
        <button
          onClick={handleReset}
          style={{
            padding: '4px 12px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          🔄 Reset Board
        </button>
      </div>
    </div>
  );
};