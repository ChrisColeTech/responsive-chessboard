// TestBoard.tsx - 3x3 chess board with game logic validation
import React, { useState, useEffect, useCallback } from 'react';
import type { ChessPiece, ChessPosition } from '../types';
import { PIECE_SETS, getPieceImagePath } from '../constants/pieces.constants';
import { useDrag } from '../providers';
import { useChessAudio } from '../services/audioService';
import { TestBoardGameService, type GameStatus } from '../services/TestBoardGameService';
import { CheckmateModal } from './CheckmateModal';
import { PromotionModal } from './PromotionModal';

interface TestBoardProps {
  onSquareClick: (position: ChessPosition) => void;
  selectedSquare: ChessPosition | null;
  validDropTargets: ChessPosition[];
  onCapturedPiecesChange?: (pieces: ChessPiece[]) => void;
  onMoveHandlerReady?: (moveHandler: (from: ChessPosition, to: ChessPosition) => Promise<boolean>) => void;
}

// Stable piece set selection
const pieceSetKeys = Object.keys(PIECE_SETS) as Array<keyof typeof PIECE_SETS>;
const STABLE_PIECE_SET = pieceSetKeys[0]; // Use first piece set consistently

// Initial test pieces for 3x3 board - with check/checkmate testing
const initialTestPieces: Record<string, ChessPiece> = {
  // White pieces (bottom row)
  a1: {
    id: 'test-white-king-a1',
    type: 'king',
    color: 'white',
    position: { file: 'a', rank: 1 }
  },
  b1: {
    id: 'test-white-queen-b1',
    type: 'queen',
    color: 'white',
    position: { file: 'b', rank: 1 }
  },
  // Black pieces (top row)
  b3: {
    id: 'test-black-pawn-b3',
    type: 'pawn',
    color: 'black',
    position: { file: 'b', rank: 3 }
  },
  c3: {
    id: 'test-black-pawn-c3',
    type: 'pawn',
    color: 'black',
    position: { file: 'c', rank: 3 }
  }
};

export const TestBoard = ({ 
  onSquareClick, 
  selectedSquare, 
  validDropTargets,
  onCapturedPiecesChange,
  onMoveHandlerReady
}: TestBoardProps) => {
  const { startDrag, updateCursor, endDrag, clearDrag, setMoveHandler } = useDrag();
  const { playMove, playError, playGameStart, playCheck, preloadSounds } = useChessAudio();
  
  // Game service and state
  const [gameService] = useState(() => new TestBoardGameService(initialTestPieces));
  const [testPieces, setTestPieces] = useState(initialTestPieces);
  const [capturedPieces, setCapturedPieces] = useState<ChessPiece[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [kingInCheck, setKingInCheck] = useState<string | null>(null);
  
  // Promotion state
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionMove, setPromotionMove] = useState<{ from: ChessPosition; to: ChessPosition } | null>(null);
  const [promotionColor, setPromotionColor] = useState<'white' | 'black'>('white');
  
  // Update parent component when captured pieces change
  useEffect(() => {
    onCapturedPiecesChange?.(capturedPieces);
  }, [capturedPieces, onCapturedPiecesChange]);

  // Set up TestBoard's move handler using game service
  useEffect(() => {
    const handleTestMove = async (move: { from: ChessPosition, to: ChessPosition }) => {
      console.log(`🧪 [TEST BOARD] Handling move: ${move.from} → ${move.to}`);
      
      // Check if game is over
      if (gameStatus === 'checkmate') {
        console.log(`🧪 [TEST BOARD] Game is over, move rejected`);
        playError();
        return false;
      }
      
      // Use game service to validate and execute move
      const result = gameService.makeMove(move.from, move.to);
      
      if (result.needsPromotion) {
        // Show promotion modal dialog - defer state updates
        console.log(`🎉 [TEST BOARD] Pawn promotion needed at ${result.promotionSquare}`);
        const piece = gameService.getGameState().pieces[move.from];
        
        setTimeout(() => {
          setPromotionMove({ from: move.from, to: move.to });
          setPromotionColor(piece?.color || 'white');
          setShowPromotionModal(true);
        }, 0);
        
        return false; // Don't complete the move yet
      }
      
      if (result.success && result.newGameState) {
        console.log(`🧪 [TEST BOARD] Move successful: ${move.from} → ${move.to}`);
        
        // Defer all state updates to avoid render-time updates
        setTimeout(() => {
          // Update UI state
          setTestPieces(result.newGameState!.pieces);
          setGameStatus(result.newGameState!.gameStatus);
          setKingInCheck(result.newGameState!.kingInCheck);
          
          // Handle captured piece
          if (result.capturedPiece) {
            setCapturedPieces(prev => {
              const newCaptured = [...prev, result.capturedPiece!];
              // Call parent update outside of setTimeout to avoid stale closure
              setTimeout(() => onCapturedPiecesChange?.(newCaptured), 0);
              return newCaptured;
            });
            console.log(`🧪 [TEST BOARD] Piece captured: ${result.capturedPiece.color} ${result.capturedPiece.type}`);
          }
        }, 0);
        
        // Play appropriate sound effects
        if (result.newGameState.gameStatus === 'checkmate') {
          playGameStart(); // Use game start as "game over" sound for now
          console.log(`🧪 [TEST BOARD] CHECKMATE! Game over.`);
        } else if (result.newGameState.gameStatus === 'check') {
          playCheck();
          console.log(`🧪 [TEST BOARD] CHECK! King is in check.`);
        } else {
          playMove(!!result.capturedPiece);
        }
        
        return true;
      } else {
        console.log(`🧪 [TEST BOARD] Move failed: ${result.error}`);
        playError();
        return false;
      }
    };

    // Create a simplified move handler for tap-to-move
    const tapMoveHandler = async (from: ChessPosition, to: ChessPosition): Promise<boolean> => {
      console.log(`🎯 [TAP-TO-MOVE] Executing move: ${from} → ${to}`);
      return await handleTestMove({ from, to });
    };
    
    // Use setTimeout to ensure TestBoard handler is set after main app handler
    const timer = setTimeout(() => {
      console.log('🧪 [TEST BOARD] Setting TestBoard move handler (overriding main app)');
      setMoveHandler(handleTestMove);
      
      // Provide tap-to-move handler to parent
      if (onMoveHandlerReady) {
        onMoveHandlerReady(tapMoveHandler);
      }
    }, 0);
    
    return () => clearTimeout(timer);
  }, []); // Empty dependency array - only run once on mount


  // Promotion handling functions
  const handlePromotionSelect = async (promotionPiece: 'queen' | 'rook' | 'bishop' | 'knight') => {
    if (!promotionMove) return;
    
    console.log(`🎉 [TEST BOARD] Promotion selected: ${promotionPiece}`);
    
    // Execute the move with promotion
    const result = gameService.makeMove(promotionMove.from, promotionMove.to, promotionPiece);
    
    if (result.success && result.newGameState) {
      console.log(`🎉 [TEST BOARD] Promotion completed! New pieces:`, result.newGameState.pieces);
      console.log(`🎉 [TEST BOARD] Setting UI state with pieces:`, Object.keys(result.newGameState.pieces));
      
      // Update UI state
      setTestPieces(result.newGameState.pieces);
      setGameStatus(result.newGameState.gameStatus);
      setKingInCheck(result.newGameState.kingInCheck);
      
      // Force UI update to match game service state
      console.log(`🎉 [TEST BOARD] Forcing UI sync with game service state`);
      setTimeout(() => {
        const currentGameState = gameService.getGameState();
        setTestPieces(currentGameState.pieces);
        console.log(`🎉 [TEST BOARD] UI state forcibly synced:`, Object.keys(currentGameState.pieces));
      }, 50);
      
      // Handle captured piece
      if (result.capturedPiece) {
        setCapturedPieces(prev => {
          const newCaptured = [...prev, result.capturedPiece!];
          // Call parent update outside of setTimeout to avoid stale closure
          setTimeout(() => onCapturedPiecesChange?.(newCaptured), 0);
          return newCaptured;
        });
      }
      
      // Play sound effects
      if (result.newGameState.gameStatus === 'checkmate') {
        playGameStart(); // Use game start as "game over" sound
      } else if (result.newGameState.gameStatus === 'check') {
        playCheck();
      } else {
        playMove(!!result.capturedPiece);
      }
    }
    
    // Close promotion modal and reset state
    setShowPromotionModal(false);
    setPromotionMove(null);
  };

  const handlePromotionCancel = () => {
    console.log('🎉 [TEST BOARD] Promotion cancelled');
    setShowPromotionModal(false);
    setPromotionMove(null);
  };

  // Reset function
  const handleReset = () => {
    gameService.reset(initialTestPieces);
    setTestPieces(initialTestPieces);
    setCapturedPieces([]);
    setGameStatus('playing');
    setKingInCheck(null);
    setShowPromotionModal(false);
    setPromotionMove(null);
    onCapturedPiecesChange?.([]);
    console.log('🧪 [TEST BOARD] Board reset to initial position');
  };

  // Expose reset function
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__testBoardReset = handleReset;
    }
  }, []);

  // 3x3 squares: arranged in grid (top to bottom, left to right)
  const squares = ['a3', 'b3', 'c3', 'a2', 'b2', 'c2', 'a1', 'b1', 'c1'];

  // POC Mouse Event Pattern - Document 20
  const handleMouseDown = (e: React.MouseEvent, piece: ChessPiece, square: string) => {
    if (!piece) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    console.log(`🎯 [TEST BOARD] Mouse down: ${piece.color} ${piece.type} from ${square}`);
    
    // Calculate current piece size for dragged piece matching
    const pieceElement = e.target as HTMLImageElement;
    const actualSize = Math.max(pieceElement.offsetWidth, pieceElement.offsetHeight);
    console.log(`🎯 [TEST BOARD] Calculated piece size: ${actualSize}px`);
    
    // Get valid moves from game service
    console.log(`🔧 [TEST BOARD] About to call gameService.getValidMoves for ${square}`, gameService);
    const validMoves = gameService.getValidMoves(square as ChessPosition);
    console.log(`🎯 [TEST BOARD] Valid moves for ${piece.color} ${piece.type} at ${square}:`, validMoves);
    startDrag(piece, square as ChessPosition, validMoves, actualSize);
    
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
    // Standard chess board coloring for 3x3
    const file = square[0];
    const rank = parseInt(square[1]);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0); // a=0, b=1, c=2
    const isLight = (fileIndex + rank) % 2 === 0;
    return isLight ? '#F0D9B5' : '#B58863';
  };

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gridTemplateRows: 'repeat(3, 1fr)',
      width: '100%', // Fill parent container
      height: '100%', // Fill parent container
      border: '2px solid #8B4513', 
      borderRadius: '4px',
      boxSizing: 'border-box',
      gap: '0'
    }}>
      {squares.map((square) => {
        const piece = testPieces[square];
        const isHighlighted = isSelected(square);
        const isValidDrop = isValidTarget(square);
        const isKingInCheck = piece?.type === 'king' && kingInCheck === piece.color && gameStatus === 'check';

        return (
          <div
            key={square}
            data-square={square} // Essential for drop detection
            onClick={() => onSquareClick(square as ChessPosition)}
            onTouchEnd={(e) => {
              e.preventDefault(); // Prevent double-firing with onClick
              onSquareClick(square as ChessPosition);
            }}
            style={{
              backgroundColor: getSquareColor(square),
              border: isHighlighted ? '3px solid #4A90E2' : 
                      isKingInCheck ? '4px solid #FF0000' : '1px solid #999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: piece ? 'pointer' : 'default',
              position: 'relative',
              fontSize: '32px',
              userSelect: 'none',
              touchAction: 'manipulation', // Improves touch responsiveness
              WebkitTapHighlightColor: 'transparent', // Remove iOS tap highlight
              ...(isValidDrop && {
                boxShadow: 'inset 0 0 0 4px rgba(0, 255, 0, 0.6)'
              }),
              ...(isKingInCheck && {
                backgroundColor: 'rgba(255, 0, 0, 0.2)', // Red tint for king in check
                animation: 'pulse 1s infinite'
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
                  width: '85%',
                  height: '85%',
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
            
            {/* Square label - only on bottom row and right column */}
            {(square[1] === '1' || square[0] === 'c') && (
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
            )}

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

      {/* Checkmate Modal */}
      <CheckmateModal
        isOpen={gameStatus === 'checkmate'}
        winner={gameStatus === 'checkmate' && kingInCheck ? (kingInCheck === 'white' ? 'black' : 'white') : 'white'}
        onReset={handleReset}
      />

      {/* Promotion Modal */}
      <PromotionModal
        isOpen={showPromotionModal}
        color={promotionColor}
        onSelect={handlePromotionSelect}
        onCancel={handlePromotionCancel}
      />

    </div>
  );
};