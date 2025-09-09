// useWrapperChessBoard.ts - Hook for wrapper-based chess board state management
import { useState, useEffect, useCallback } from 'react';
import { useChessBoardAudio } from '../../hooks/audio/useChessBoardAudio';

interface WrapperPiece {
  id: string;
  symbol: string;
  color: string;
  type: string;
  x: number; // Pixel position
  y: number; // Pixel position
  opacity: number;
  isAnimating: boolean;
  boardPosition: string; // Chess notation
  scale: number; // Scale for capture animation
}

export const useWrapperChessBoard = (gridSize: number = 6, pieceConfig?: 'drag-test' | 'mobile-test') => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [wrapperPieces, setWrapperPieces] = useState<WrapperPiece[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [draggedPiece, setDraggedPiece] = useState<WrapperPiece | null>(null);
  
  const {
    playPieceSelection,
    playPieceDeselection,
    playPieceMove,
    playInvalidMove,
  } = useChessBoardAudio();

  // Convert chess notation to pixel coordinates 
  const chessToPx = useCallback((cellId: string): { x: number; y: number } => {
    const file = cellId[0];
    const rank = parseInt(cellId[1]);
    
    let column = file.charCodeAt(0) - "a".charCodeAt(0);
    let row = gridSize - rank;
    
    // Flip coordinates if board is flipped
    if (isFlipped) {
      column = (gridSize - 1) - column;
      row = (gridSize - 1) - row;
    }
    
    // Calculate pixel position as percentage of container
    const cellPercentage = 100 / gridSize;
    return {
      x: column * cellPercentage + cellPercentage / 2, // Return as percentage
      y: row * cellPercentage + cellPercentage / 2
    };
  }, [gridSize, isFlipped]);

  // Helper to find piece by board position
  const findPieceAt = useCallback((position: string) => {
    return wrapperPieces.find(p => p.boardPosition === position);
  }, [wrapperPieces]);


  // Initialize wrapper pieces with pixel positions
  const initializePieces = useCallback(() => {
    const topRank = gridSize;
    const bottomRank = 1;
    
    let initialPieces: WrapperPiece[] = [];
    
    if (pieceConfig === 'drag-test') {
      // Drag test: 2 black pawns + white king + white queen on 3x3
      initialPieces = [
        {
          id: 'black-pawn1',
          symbol: '♟',
          color: 'black',
          type: 'pawn',
          ...chessToPx('a1'),
          opacity: 1,
          isAnimating: false,
          boardPosition: 'a1',
          scale: 1
        },
        {
          id: 'black-pawn2',
          symbol: '♟',
          color: 'black',
          type: 'pawn',
          ...chessToPx('c1'),
          opacity: 1,
          isAnimating: false,
          boardPosition: 'c1',
          scale: 1
        },
        {
          id: 'white-king',
          symbol: '♔',
          color: 'white',
          type: 'king',
          ...chessToPx('a3'),
          opacity: 1,
          isAnimating: false,
          boardPosition: 'a3',
          scale: 1
        },
        {
          id: 'white-queen',
          symbol: '♕',
          color: 'white',
          type: 'queen',
          ...chessToPx('c3'),
          opacity: 1,
          isAnimating: false,
          boardPosition: 'c3',
          scale: 1
        }
      ];
    } else {
      // Mobile test: both kings and queens on 6x6
      initialPieces = [
        {
          id: 'white-king',
          symbol: '♔',
          color: 'white',
          type: 'king',
          ...chessToPx(`a${topRank}`),
          opacity: 1,
          isAnimating: false,
          boardPosition: `a${topRank}`,
          scale: 1
        },
        {
          id: 'white-queen',
          symbol: '♕',
          color: 'white',
          type: 'queen',
          ...chessToPx(`b${topRank}`),
          opacity: 1,
          isAnimating: false,
          boardPosition: `b${topRank}`,
          scale: 1
        },
        {
          id: 'black-queen',
          symbol: '♛',
          color: 'black',
          type: 'queen',
          ...chessToPx(`e${bottomRank}`),
          opacity: 1,
          isAnimating: false,
          boardPosition: `e${bottomRank}`,
          scale: 1
        },
        {
          id: 'black-king',
          symbol: '♚',
          color: 'black',
          type: 'king',
          ...chessToPx(`f${bottomRank}`),
          opacity: 1,
          isAnimating: false,
          boardPosition: `f${bottomRank}`,
          scale: 1
        }
      ];
    }
    
    setWrapperPieces(initialPieces);
  }, [chessToPx, gridSize, pieceConfig]);

  // Flip board function
  const handleFlipBoard = useCallback(() => {
    setIsFlipped(prev => !prev);
    console.log('🔄 [MOBILE WRAPPER] Board flipped:', !isFlipped);
  }, [isFlipped]);

  // Reset function
  const handleReset = useCallback(() => {
    initializePieces();
    setSelectedCell(null);
    console.log('🎯 [MOBILE WRAPPER] Board reset to initial position');
  }, [initializePieces]);

  // Initialize pieces on mount or gridSize change
  useEffect(() => {
    initializePieces();
  }, [initializePieces]);

  // Expose reset and flip functions globally
  useEffect(() => {
    (window as any).__wrapperChessBoardReset = handleReset;
    (window as any).__wrapperChessBoardFlip = handleFlipBoard;
    return () => {
      delete (window as any).__wrapperChessBoardReset;
      delete (window as any).__wrapperChessBoardFlip;
    };
  }, [handleReset, handleFlipBoard]);

  const handleCellClick = useCallback((cellId: string) => {
    const pieceAtCell = findPieceAt(cellId);

    if (selectedCell === null) {
      // First click - select cell only if it has a piece
      if (pieceAtCell) {
        setSelectedCell(cellId);
        playPieceSelection();
        console.log(`Selected ${pieceAtCell.color} ${pieceAtCell.type} at: ${cellId}`);
      } else {
        playInvalidMove();
        console.log(`Clicked empty cell: ${cellId}`);
      }
    } else if (selectedCell === cellId) {
      // Clicking same cell - deselect
      setSelectedCell(null);
      playPieceDeselection();
      console.log(`Deselected piece at: ${cellId}`);
    } else {
      // Second click - move piece to new cell
      const movingPiece = findPieceAt(selectedCell);
      if (movingPiece) {
        const targetPiece = findPieceAt(cellId);
        const wasCapture = !!targetPiece;

        // Handle captured piece (shrink and fade out)
        if (wasCapture && targetPiece) {
          setWrapperPieces(prev => prev.map(p => 
            p.id === targetPiece.id 
              ? { ...p, opacity: 0, scale: 0.1, isAnimating: true }
              : p
          ));
          
          // Remove captured piece after shrink animation
          setTimeout(() => {
            setWrapperPieces(prev => prev.filter(p => p.id !== targetPiece.id));
          }, 180);
        }

        playPieceMove(wasCapture);

        // Animate moving piece to new position
        const newPosition = chessToPx(cellId);
        setWrapperPieces(prev => prev.map(p => {
          if (p.id === movingPiece.id) {
            return {
              ...p,
              x: newPosition.x,
              y: newPosition.y,
              isAnimating: true,
              boardPosition: cellId,
              opacity: 0.7 // Ghost effect during move
            };
          }
          return p;
        }));

        // Complete animation (optimized for smooth movement)
        setTimeout(() => {
          setWrapperPieces(prev => prev.map(p => 
            p.id === movingPiece.id 
              ? { ...p, opacity: 1, isAnimating: false }
              : p
          ));
        }, 250);
      }

      setSelectedCell(null);
      console.log(`Moved piece: ${selectedCell} → ${cellId}`);
    }
  }, [selectedCell, findPieceAt, chessToPx, playPieceSelection, playPieceDeselection, playPieceMove, playInvalidMove]);

  // Piece click handler (same logic as cell click but for pieces)
  const handlePieceClick = useCallback((piece: WrapperPiece) => {
    handleCellClick(piece.boardPosition);
  }, [handleCellClick]);

  // Drag handlers
  const handleDragStart = useCallback((piece: WrapperPiece) => {
    setDraggedPiece(piece);
    setSelectedCell(piece.boardPosition);
    playPieceSelection();
    console.log(`🎯 [DRAG] Started dragging ${piece.color} ${piece.type} from ${piece.boardPosition}`);
    console.log(`🔥 [DRAG] isDragging state will be:`, !!piece);
  }, [playPieceSelection]);

  const handleDrop = useCallback((targetSquare: string, dragData: { pieceId: string; fromPosition: string }) => {
    const piece = wrapperPieces.find(p => p.id === dragData.pieceId);
    if (!piece || targetSquare === dragData.fromPosition) {
      setDraggedPiece(null);
      setSelectedCell(null);
      return;
    }

    // Attempt move
    const targetPiece = findPieceAt(targetSquare);
    const wasCapture = !!targetPiece;

    console.log(`🎯 [DRAG] Dropping ${piece.color} ${piece.type}: ${dragData.fromPosition} → ${targetSquare}${wasCapture ? ' (capture)' : ''}`);

    // Handle captured piece (shrink and fade out)
    if (wasCapture && targetPiece) {
      setWrapperPieces(prev => prev.map(p => 
        p.id === targetPiece.id 
          ? { ...p, opacity: 0, scale: 0.1, isAnimating: true }
          : p
      ));
      
      // Remove captured piece after animation
      setTimeout(() => {
        setWrapperPieces(prev => prev.filter(p => p.id !== targetPiece.id));
      }, 180);
    }

    // Move the dragged piece
    const newPosition = chessToPx(targetSquare);
    setWrapperPieces(prev => prev.map(p => {
      if (p.id === piece.id) {
        return {
          ...p,
          x: newPosition.x,
          y: newPosition.y,
          isAnimating: true,
          boardPosition: targetSquare,
          opacity: 0.7
        };
      }
      return p;
    }));

    // Complete animation
    setTimeout(() => {
      setWrapperPieces(prev => prev.map(p => 
        p.id === piece.id 
          ? { ...p, opacity: 1, isAnimating: false }
          : p
      ));
    }, 250);

    playPieceMove(wasCapture);
    console.log(`🔚 [DRAG] Ending drag, setting draggedPiece to null`);
    setDraggedPiece(null);
    setSelectedCell(null);
  }, [wrapperPieces, findPieceAt, chessToPx, playPieceMove]);

  return {
    selectedCell,
    hoveredCell,
    setHoveredCell,
    wrapperPieces,
    handleCellClick,
    handlePieceClick,
    handleReset,
    handleFlipBoard,
    handleDragStart,
    handleDrop,
    isFlipped,
    findPieceAt,
    isDragging: !!draggedPiece,
    setDraggedPiece // Expose this so PieceWrapper can manage it directly
  };
};