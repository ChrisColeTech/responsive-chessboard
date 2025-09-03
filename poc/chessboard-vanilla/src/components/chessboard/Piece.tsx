// Piece.tsx - Chess piece component
import React, { useCallback, useMemo } from 'react';
import type { PieceProps } from '../../types';
import { describePiece } from '../../utils/a11y.utils';
import { positionToSquare } from '../../utils';

export const Piece: React.FC<PieceProps> = React.memo(({
  piece,
  pieceSet,
  onDragStart,
  onDragEnd,
  
  // Enhancement props
  theme,
  boardMaterial,
  animationConfig,
  focusMode,
  accessibilityConfig,
  cssVariables,
  ariaLabels
}) => {
  // Map piece types to their standard chess notation letters
  const getPieceImagePath = () => {
    const colorPrefix = piece.color[0]; // 'w' or 'b'
    
    // Handle knight orientation for piece sets that have left/right knights
    if (piece.type === 'knight') {
      // Check if this piece set has left/right knight variants
      const hasKnightVariants = ['conqueror', 'executive', 'modern', 'tournament'].includes(pieceSet);
      
      if (hasKnightVariants) {
        // For piece sets with knight variants, determine orientation
        // Strategy: Use current position with intelligent fallbacks
        
        // Primary: Check if knight is on starting files (b or g files)
        const isOnQueenside = piece.position.file === 'b';
        const isOnKingside = piece.position.file === 'g';
        
        if (isOnQueenside) {
          return `/pieces/${pieceSet}/${colorPrefix}N-left.svg`;
        } else if (isOnKingside) {
          return `/pieces/${pieceSet}/${colorPrefix}N-right.svg`;
        }
        
        // Fallback for knights that have moved off their starting files:
        // Use position to determine which orientation looks better
        // Left half of board (a,b,c,d) = left knight, right half (e,f,g,h) = right knight
        const fileIndex = piece.position.file.charCodeAt(0) - 'a'.charCodeAt(0);
        const useLeftVariant = fileIndex < 4; // Files a,b,c,d
        
        if (useLeftVariant) {
          return `/pieces/${pieceSet}/${colorPrefix}N-left.svg`;
        } else {
          return `/pieces/${pieceSet}/${colorPrefix}N-right.svg`;
        }
      }
      // Fallback to standard knight or for piece sets without variants
      return `/pieces/${pieceSet}/${colorPrefix}N.svg`;
    }
    
    // Standard piece mapping for non-knights
    const pieceTypeToLetter: Record<string, string> = {
      'king': 'K',
      'queen': 'Q', 
      'rook': 'R',
      'bishop': 'B',
      'knight': 'N',
      'pawn': 'P'
    };
    
    const pieceLetterCode = pieceTypeToLetter[piece.type];
    return `/pieces/${pieceSet}/${colorPrefix}${pieceLetterCode}.svg`;
  };
  
  const pieceImageSrc = getPieceImagePath();

  // Generate accessibility description
  const ariaLabel = useMemo(() => {
    if (ariaLabels?.piece && typeof ariaLabels.piece === 'function') {
      return ariaLabels.piece(piece);
    }
    return describePiece(piece, positionToSquare(piece.position));
  }, [ariaLabels, piece]);
  
  // Generate enhanced class names
  const pieceClasses = useMemo(() => {
    const classes = ['chessboard-piece'];
    
    // Enhancement classes
    if (theme) classes.push(`theme-${theme}`);
    if (boardMaterial) classes.push(`material-${boardMaterial}`);
    if (focusMode) classes.push(`focus-${focusMode}`);
    if (animationConfig?.enabled) classes.push('animated');
    if (accessibilityConfig?.reducedMotion) classes.push('reduce-motion');
    
    // Piece-specific classes
    classes.push(`piece-${piece.color}`);
    classes.push(`piece-${piece.type}`);
    
    return classes.join(' ');
  }, [theme, boardMaterial, focusMode, animationConfig, accessibilityConfig, piece]);
  
  // Generate enhanced styles
  const pieceStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    // Apply CSS variables
    if (cssVariables) {
      Object.assign(style, cssVariables);
    }
    
    // Apply animation styles
    if (animationConfig?.enabled) {
      style.transition = animationConfig.duration ? `all ${animationConfig.duration}ms ${animationConfig.easing || 'ease-out'}` : undefined;
    }
    
    return style;
  }, [cssVariables, animationConfig]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    const positionString = positionToSquare(piece.position);
    onDragStart?.(piece, positionString);
    e.dataTransfer.effectAllowed = 'move';
    
    // Add drag styling
    const target = e.target as HTMLElement;
    target.classList.add('dragging');
  }, [onDragStart, piece]);
  
  const handleDragEnd = useCallback((e: React.DragEvent) => {
    onDragEnd?.();
    
    // Remove drag styling
    const target = e.target as HTMLElement;
    target.classList.remove('dragging');
  }, [onDragEnd]);

  return (
    <img
      src={pieceImageSrc}
      alt={ariaLabel}
      className={pieceClasses}
      style={pieceStyle}
      draggable={!!onDragStart}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      
      // Accessibility attributes
      role="img"
      aria-label={ariaLabel}
      aria-grabbed={onDragStart ? "false" : undefined}
      tabIndex={accessibilityConfig?.keyboardNavigationEnabled ? -1 : undefined}
      data-piece-type={piece.type}
      data-piece-color={piece.color}
      data-position={piece.position}
      data-theme={theme}
      data-material={boardMaterial}
      data-focus-mode={focusMode}
      
      // Animation attributes
      data-animated={animationConfig?.enabled}
      data-animation-duration={animationConfig?.duration}
      data-animation-easing={animationConfig?.easing}
    />
  );
});