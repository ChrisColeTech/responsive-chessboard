// useDragAndDrop.ts - Drag and drop interaction with animation support
import { useState, useCallback, useRef, useEffect } from 'react';
import type { ChessPiece, ChessPosition, ChessGameState, AnimationConfig } from '../types';
// No utility imports needed for string-based positions

export interface UseDragAndDropHook {
  draggedPiece: ChessPiece | null;
  isDragging: boolean;
  dragSource: ChessPosition | null;
  selectedSquare: ChessPosition | null;
  validDropTargets: ChessPosition[];
  isAnimating: boolean;
  animatingPiece: ChessPiece | null;
  animationSource: ChessPosition | null;
  animationTarget: ChessPosition | null;
  handleDragStart: (piece: ChessPiece, position: ChessPosition) => void;
  handleDragEnd: () => void;
  handleDrop: (targetPosition: ChessPosition) => Promise<boolean>;
  handleSquareClick: (position: ChessPosition) => void;
  startMoveAnimation: (piece: ChessPiece, from: ChessPosition, to: ChessPosition) => Promise<void>;
}

export const useDragAndDrop = (
  gameState: ChessGameState | null,
  onMove: (from: string, to: string) => Promise<boolean>,
  _getValidMoves: (square?: string) => string[],
  getValidTargetSquares: (square: string) => string[],
  animationConfig?: AnimationConfig,
  onAnimationComplete?: () => void
): UseDragAndDropHook => {
  const [draggedPiece, setDraggedPiece] = useState<ChessPiece | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragSource, setDragSource] = useState<ChessPosition | null>(null);
  const [validDropTargets, setValidDropTargets] = useState<ChessPosition[]>([]);
  const [selectedSquare, setSelectedSquare] = useState<ChessPosition | null>(null);
  
  // Animation state
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingPiece, setAnimatingPiece] = useState<ChessPiece | null>(null);
  const [animationSource, setAnimationSource] = useState<ChessPosition | null>(null);
  const [animationTarget, setAnimationTarget] = useState<ChessPosition | null>(null);
  
  const dragDataRef = useRef<{ piece: ChessPiece; source: ChessPosition } | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearDragState = useCallback(() => {
    setDraggedPiece(null);
    setIsDragging(false);
    setDragSource(null);
    setValidDropTargets([]);
    dragDataRef.current = null;
  }, []);
  
  const clearAnimationState = useCallback(() => {
    setIsAnimating(false);
    setAnimatingPiece(null);
    setAnimationSource(null);
    setAnimationTarget(null);
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  }, []);
  
  // Move animation function
  const startMoveAnimation = useCallback(async (piece: ChessPiece, from: ChessPosition, to: ChessPosition): Promise<void> => {
    if (!animationConfig?.enabled) {
      return Promise.resolve();
    }
    
    return new Promise((resolve) => {
      setIsAnimating(true);
      setAnimatingPiece(piece);
      setAnimationSource(from);
      setAnimationTarget(to);
      
      // Use animation duration from config or default
      const duration = animationConfig.duration || 300;
      
      // Add moving class to the piece element
      const pieceElement = document.querySelector(`[data-position="${from}"] .chessboard-piece`);
      if (pieceElement && pieceElement instanceof HTMLElement) {
        pieceElement.classList.add('moving');
        
        // Apply CSS transform for smooth movement
        const fromSquare = document.querySelector(`[data-position="${from}"]`);
        const toSquare = document.querySelector(`[data-position="${to}"]`);
        
        if (fromSquare && toSquare && fromSquare instanceof HTMLElement && toSquare instanceof HTMLElement) {
          const fromRect = fromSquare.getBoundingClientRect();
          const toRect = toSquare.getBoundingClientRect();
          
          const deltaX = toRect.left - fromRect.left;
          const deltaY = toRect.top - fromRect.top;
          
          pieceElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
          pieceElement.style.zIndex = '1000';
        }
      }
      
      animationTimeoutRef.current = setTimeout(() => {
        // Clean up animation classes
        if (pieceElement && pieceElement instanceof HTMLElement) {
          pieceElement.classList.remove('moving');
          pieceElement.style.transform = '';
          pieceElement.style.zIndex = '';
        }
        
        clearAnimationState();
        onAnimationComplete?.();
        resolve();
      }, duration);
    });
  }, [animationConfig, clearAnimationState, onAnimationComplete]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleDragStart = useCallback((piece: ChessPiece, position: ChessPosition) => {
    if (!gameState || gameState.isGameOver || isAnimating) {
      return;
    }

    // Check if it's the current player's turn
    if (piece.color !== gameState.activeColor) {
      return;
    }

    setDraggedPiece(piece);
    setIsDragging(true);
    setDragSource(position);
    dragDataRef.current = { piece, source: position };

    // Get valid target squares for this piece
    const sourceSquare = position;
    const targetSquares = getValidTargetSquares(sourceSquare);
    setValidDropTargets(targetSquares);
    
    // Add drag animation class if enabled
    if (animationConfig?.enabled) {
      const pieceElement = document.querySelector(`[data-position="${position}"] .chessboard-piece`);
      if (pieceElement && pieceElement instanceof HTMLElement) {
        pieceElement.classList.add('dragging');
      }
    }
  }, [gameState, getValidTargetSquares, isAnimating, animationConfig]);

  const handleDragEnd = useCallback(() => {
    // Remove drag animation classes
    if (animationConfig?.enabled && dragDataRef.current) {
      const sourceSquare = dragDataRef.current.source;
      const pieceElement = document.querySelector(`[data-position="${sourceSquare}"] .chessboard-piece`);
      if (pieceElement && pieceElement instanceof HTMLElement) {
        pieceElement.classList.remove('dragging');
      }
    }
    
    // Small delay to allow drop event to process first
    setTimeout(() => {
      setIsDragging(false);
      // Don't clear other state immediately in case drop is processing
    }, 50);
  }, [animationConfig]);

  const handleDrop = useCallback(async (targetPosition: ChessPosition): Promise<boolean> => {
    if (!dragDataRef.current || !gameState) {
      clearDragState();
      return false;
    }

    const { piece, source } = dragDataRef.current;
    const fromSquare = source;
    const toSquare = targetPosition;

    // Check if this is a valid drop target
    const isValidTarget = validDropTargets.includes(targetPosition);

    if (!isValidTarget) {
      clearDragState();
      return false;
    }

    try {
      // If animation is enabled, animate the move before executing it
      if (animationConfig?.enabled && source !== targetPosition) {
        await startMoveAnimation(piece, source, targetPosition);
      }
      
      const success = await onMove(fromSquare, toSquare);
      clearDragState();
      setSelectedSquare(null);
      return success;
    } catch (error) {
      console.error('Drop move failed:', error);
      clearDragState();
      return false;
    }
  }, [validDropTargets, gameState, onMove, clearDragState, animationConfig, startMoveAnimation]);

  const handleSquareClick = useCallback((position: ChessPosition) => {
    if (!gameState || gameState.isGameOver) {
      return;
    }

    const clickedSquare = position;
    const piece = gameState.position.get(clickedSquare);

    // If no piece is selected, select this square (if it has a piece)
    if (!selectedSquare) {
      if (piece && piece.color === gameState.activeColor) {
        setSelectedSquare(position);
        
        // Show valid moves for click-to-move using target squares for consistency
        const targetSquares = getValidTargetSquares(clickedSquare);
        setValidDropTargets(targetSquares);
      }
      return;
    }

    // If same square clicked, deselect
    if (selectedSquare === position) {
      setSelectedSquare(null);
      setValidDropTargets([]);
      return;
    }

    // If different piece of same color clicked, select new piece
    if (piece && piece.color === gameState.activeColor) {
      setSelectedSquare(position);
      
      const targetSquares = getValidTargetSquares(clickedSquare);
      setValidDropTargets(targetSquares);
      return;
    }

    // Try to make a move from selected square to clicked square
    const fromSquare = selectedSquare;
    const toSquare = clickedSquare;

    // Check if this is a valid move
    const isValidMove = validDropTargets.includes(position);

    if (isValidMove) {
      const selectedPiece = gameState.position.get(fromSquare);
      
      // If animation is enabled and we have a piece, animate the move
      if (animationConfig?.enabled && selectedPiece && selectedSquare !== position) {
        startMoveAnimation(selectedPiece, selectedSquare, position).then(() => {
          onMove(fromSquare, toSquare).then(() => {
            setSelectedSquare(null);
            setValidDropTargets([]);
          }).catch(error => {
            console.error('Click move failed:', error);
          });
        });
      } else {
        onMove(fromSquare, toSquare).then(() => {
          setSelectedSquare(null);
          setValidDropTargets([]);
        }).catch(error => {
          console.error('Click move failed:', error);
        });
      }
    } else {
      // Invalid move, clear selection
      setSelectedSquare(null);
      setValidDropTargets([]);
    }
  }, [gameState, selectedSquare, validDropTargets, getValidTargetSquares, onMove, animationConfig, startMoveAnimation]);

  return {
    draggedPiece,
    isDragging,
    dragSource,
    selectedSquare,
    validDropTargets,
    isAnimating,
    animatingPiece,
    animationSource,
    animationTarget,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleSquareClick,
    startMoveAnimation
  };
};