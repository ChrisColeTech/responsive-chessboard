// CoordinateDisplay.tsx - Enhanced coordinate component
import React, { useMemo } from 'react';
import type { ChessPosition } from '../../types/chess.types';
import type { CoordinateStyleType, FocusModeType } from '../../types/enhancement.types';

interface CoordinateDisplayProps {
  position: ChessPosition;
  coordinateStyle: CoordinateStyleType;
  focusMode: FocusModeType;
  orientation: 'white' | 'black';
  showRank?: boolean;
  showFile?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const CoordinateDisplay: React.FC<CoordinateDisplayProps> = ({
  position,
  coordinateStyle,
  focusMode,
  orientation,
  showRank = true,
  showFile = true,
  className = '',
  style = {}
}) => {
  // Don't render if hidden or in tournament mode
  if (coordinateStyle === 'hidden' || (focusMode === 'tournament' && coordinateStyle !== 'overlay')) {
    return null;
  }

  // Parse position to get file and rank
  const file = position.charAt(0);
  const rank = position.charAt(1);

  // Determine if this square should show coordinates
  const shouldShowCoordinates = useMemo(() => {
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankNumber = parseInt(rank);
    const isWhiteOrientation = orientation === 'white';

    switch (coordinateStyle) {
      case 'corner':
        // Show on bottom-left square for white, top-right for black
        return isWhiteOrientation 
          ? (fileIndex === 0 && rankNumber === 1) 
          : (fileIndex === 7 && rankNumber === 8);
      
      case 'edge':
        // Show on edge squares
        return (fileIndex === 0 || rankNumber === 1 || fileIndex === 7 || rankNumber === 8);
      
      case 'overlay':
        // Show on all squares but with transparency
        return true;
      
      default:
        return false;
    }
  }, [file, rank, coordinateStyle, orientation]);

  if (!shouldShowCoordinates) {
    return null;
  }

  // Determine coordinate visibility based on position
  const showFileLabel = useMemo(() => {
    const rankNumber = parseInt(rank);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);

    switch (coordinateStyle) {
      case 'corner':
        return showFile;
      case 'edge':
        return showFile && (rankNumber === (orientation === 'white' ? 1 : 8));
      case 'overlay':
        return showFile && (fileIndex === 0 || fileIndex === 7);
      default:
        return false;
    }
  }, [file, rank, coordinateStyle, orientation, showFile]);

  const showRankLabel = useMemo(() => {
    const rankNumber = parseInt(rank);
    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);

    switch (coordinateStyle) {
      case 'corner':
        return showRank;
      case 'edge':
        return showRank && (fileIndex === (orientation === 'white' ? 0 : 7));
      case 'overlay':
        return showRank && (rankNumber === 1 || rankNumber === 8);
      default:
        return false;
    }
  }, [file, rank, coordinateStyle, orientation, showRank]);

  // Generate CSS classes
  const cssClasses = useMemo(() => {
    const classes = [
      'coordinate-display',
      `coordinate-${coordinateStyle}`,
      `coordinate-focus-${focusMode}`,
      `coordinate-orientation-${orientation}`,
      className
    ].filter(Boolean);

    if (coordinateStyle === 'overlay') {
      classes.push('coordinate-overlay');
    }

    return classes.join(' ');
  }, [coordinateStyle, focusMode, orientation, className]);

  // Position-specific classes for edge coordinates
  const positionClasses = useMemo(() => {
    if (coordinateStyle !== 'edge') return '';

    const fileIndex = file.charCodeAt(0) - 'a'.charCodeAt(0);
    const rankNumber = parseInt(rank);
    const classes = [];

    if (fileIndex === 0) classes.push('left-edge');
    if (fileIndex === 7) classes.push('right-edge');
    if (rankNumber === 1) classes.push('bottom-edge');
    if (rankNumber === 8) classes.push('top-edge');

    return classes.join(' ');
  }, [file, rank, coordinateStyle]);

  const combinedClasses = `${cssClasses} ${positionClasses}`.trim();

  return (
    <div 
      className={combinedClasses}
      style={style}
      data-coordinate-style={coordinateStyle}
      data-position={position}
      role="text"
      aria-label={`Square ${position}`}
    >
      {showRankLabel && (
        <span 
          className="coordinate-rank" 
          data-rank={rank}
          aria-label={`Rank ${rank}`}
        >
          {rank}
        </span>
      )}
      
      {showFileLabel && (
        <span 
          className="coordinate-file" 
          data-file={file}
          aria-label={`File ${file}`}
        >
          {file.toUpperCase()}
        </span>
      )}
    </div>
  );
};

// Sub-component for learning mode coordinate hints
interface CoordinateHintProps {
  position: ChessPosition;
  showHint: boolean;
  hintType: 'beginner' | 'intermediate';
}

export const CoordinateHint: React.FC<CoordinateHintProps> = ({
  position,
  showHint,
  hintType
}) => {
  if (!showHint) return null;

  const file = position.charAt(0);
  const rank = position.charAt(1);

  // Generate coordinate description for beginners
  const getCoordinateDescription = useMemo(() => {
    if (hintType === 'beginner') {
      const fileNames = {
        'a': 'Anna', 'b': 'Bob', 'c': 'Charlie', 'd': 'David',
        'e': 'Emma', 'f': 'Frank', 'g': 'George', 'h': 'Helen'
      };
      return `${fileNames[file as keyof typeof fileNames]} ${rank}`;
    }
    return `${file.toUpperCase()}${rank}`;
  }, [file, rank, hintType]);

  return (
    <div 
      className="coordinate-hint"
      data-hint-type={hintType}
      role="tooltip"
      aria-label={`Square coordinate: ${getCoordinateDescription}`}
    >
      <span className="hint-text">{getCoordinateDescription}</span>
    </div>
  );
};

// Board edge coordinate labels component
interface BoardEdgeCoordinatesProps {
  orientation: 'white' | 'black';
  coordinateStyle: CoordinateStyleType;
  focusMode: FocusModeType;
  showFiles?: boolean;
  showRanks?: boolean;
}

export const BoardEdgeCoordinates: React.FC<BoardEdgeCoordinatesProps> = ({
  orientation,
  coordinateStyle,
  focusMode,
  showFiles = true,
  showRanks = true
}) => {
  if (coordinateStyle !== 'edge' || focusMode === 'tournament') {
    return null;
  }

  const files = orientation === 'white' ? 'abcdefgh'.split('') : 'hgfedcba'.split('');
  const ranks = orientation === 'white' ? '12345678'.split('') : '87654321'.split('');

  return (
    <div className="board-edge-coordinates">
      {/* File labels (bottom edge) */}
      {showFiles && (
        <div className="file-labels" role="group" aria-label="File coordinates">
          {files.map((file, index) => (
            <span 
              key={file}
              className="file-label"
              data-file={file}
              style={{ 
                gridColumn: index + 1,
                gridRow: 9 
              }}
              aria-label={`File ${file}`}
            >
              {file.toUpperCase()}
            </span>
          ))}
        </div>
      )}

      {/* Rank labels (left edge) */}
      {showRanks && (
        <div className="rank-labels" role="group" aria-label="Rank coordinates">
          {ranks.map((rank, index) => (
            <span 
              key={rank}
              className="rank-label"
              data-rank={rank}
              style={{ 
                gridColumn: 0,
                gridRow: 8 - index 
              }}
              aria-label={`Rank ${rank}`}
            >
              {rank}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};