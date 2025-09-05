// HighlightOverlay.tsx - Visual highlight components
import React, { useMemo } from 'react';
import type { ChessPosition } from '../../types/chess.types';
import type { HighlightType, HighlightStyleType } from '../../types/enhancement.types';
import type { HighlightData } from '../../services/HighlightEngine';

interface HighlightOverlayProps {
  position: ChessPosition;
  highlightTypes: HighlightType[];
  highlightData: HighlightData[];
  highlightStyle: HighlightStyleType;
  intensity: 'low' | 'medium' | 'high';
  className?: string;
  style?: React.CSSProperties;
}

export const HighlightOverlay: React.FC<HighlightOverlayProps> = ({
  position,
  highlightTypes,
  highlightData,
  highlightStyle,
  intensity,
  className = '',
  style = {}
}) => {
  // Sort highlights by priority for layering
  const sortedHighlights = useMemo(() => {
    return highlightData.sort((a, b) => {
      const priorities = {
        'check': 100,
        'threat': 80,
        'capture': 70,
        'pattern': 60,
        'selected': 40,
        'valid-move': 30,
        'last-move': 20
      };
      
      const aPriority = priorities[a.type] || 10;
      const bPriority = priorities[b.type] || 10;
      
      return bPriority - aPriority;
    });
  }, [highlightData]);

  // Generate CSS classes
  const cssClasses = useMemo(() => {
    const classes = [
      'highlight-overlay',
      `highlight-style-${highlightStyle}`,
      `highlight-intensity-${intensity}`,
      className
    ].filter(Boolean);

    // Add type-specific classes
    highlightTypes.forEach(type => {
      classes.push(`highlight-${type}`);
    });

    return classes.join(' ');
  }, [highlightTypes, highlightStyle, intensity, className]);

  // Generate overlay elements for each highlight type
  const overlayElements = useMemo(() => {
    return sortedHighlights.map((highlight, index) => {
      const key = `${highlight.type}-${index}`;
      
      switch (highlight.type) {
        case 'check':
          return (
            <CheckHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
            />
          );
          
        case 'threat':
          return (
            <ThreatHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
              metadata={highlight.metadata}
            />
          );
          
        case 'pattern':
          return (
            <PatternHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
              metadata={highlight.metadata}
            />
          );
          
        case 'last-move':
          return (
            <LastMoveHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
            />
          );
          
        case 'selected':
          return (
            <SelectionHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
            />
          );
          
        case 'valid-move':
          return (
            <ValidMoveHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
            />
          );
          
        case 'capture':
          return (
            <CaptureHighlight
              key={key}
              position={position}
              intensity={highlight.intensity}
              style={highlightStyle}
            />
          );
          
        default:
          return (
            <GenericHighlight
              key={key}
              position={position}
              type={highlight.type}
              intensity={highlight.intensity}
              style={highlightStyle}
            />
          );
      }
    });
  }, [sortedHighlights, position, highlightStyle]);

  if (overlayElements.length === 0) {
    return null;
  }

  return (
    <div 
      className={cssClasses}
      style={style}
      data-position={position}
      data-highlight-types={highlightTypes.join(',')}
      role="presentation"
    >
      {overlayElements}
    </div>
  );
};

// Individual highlight components
interface HighlightComponentProps {
  position: ChessPosition;
  intensity: 'low' | 'medium' | 'high';
  style: HighlightStyleType;
  metadata?: any;
}

const CheckHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style 
}) => (
  <div 
    className={`highlight-check highlight-check-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`King in check at ${position}`}
  >
    <div className="check-indicator"></div>
    <div className="check-pulse"></div>
  </div>
);

const ThreatHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style,
  metadata 
}) => (
  <div 
    className={`highlight-threat highlight-threat-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`Piece under threat at ${position}`}
    title={metadata?.description}
  >
    <div className="threat-indicator"></div>
    <div className="threat-warning"></div>
  </div>
);

const PatternHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style,
  metadata 
}) => (
  <div 
    className={`highlight-pattern highlight-pattern-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`Tactical pattern at ${position}`}
    title={metadata?.description}
  >
    <div className="pattern-indicator">
      <div className="pattern-lines"></div>
    </div>
  </div>
);

const LastMoveHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style 
}) => (
  <div 
    className={`highlight-last-move highlight-last-move-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`Last move at ${position}`}
  >
    <div className="last-move-indicator"></div>
  </div>
);

const SelectionHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style 
}) => (
  <div 
    className={`highlight-selected highlight-selected-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`Selected square ${position}`}
  >
    <div className="selection-border"></div>
    <div className="selection-glow"></div>
  </div>
);

const ValidMoveHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style 
}) => (
  <div 
    className={`highlight-valid-move highlight-valid-move-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`Valid move to ${position}`}
  >
    <div className="valid-move-dot"></div>
  </div>
);

const CaptureHighlight: React.FC<HighlightComponentProps> = ({ 
  position, 
  intensity, 
  style 
}) => (
  <div 
    className={`highlight-capture highlight-capture-${intensity} highlight-style-${style}`}
    data-position={position}
    role="presentation"
    aria-label={`Capture available at ${position}`}
  >
    <div className="capture-border"></div>
    <div className="capture-corners">
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>
    </div>
  </div>
);

interface GenericHighlightProps extends HighlightComponentProps {
  type: HighlightType;
}

const GenericHighlight: React.FC<GenericHighlightProps> = ({ 
  position, 
  type,
  intensity, 
  style 
}) => (
  <div 
    className={`highlight-${type} highlight-${type}-${intensity} highlight-style-${style}`}
    data-position={position}
    data-highlight-type={type}
    role="presentation"
    aria-label={`${type} highlight at ${position}`}
  >
    <div className="generic-highlight-indicator"></div>
  </div>
);

// Composite highlight overlay for multiple highlights
interface MultiHighlightOverlayProps {
  highlights: Map<ChessPosition, {
    types: HighlightType[];
    data: HighlightData[];
    intensity: 'low' | 'medium' | 'high';
  }>;
  highlightStyle: HighlightStyleType;
  className?: string;
}

export const MultiHighlightOverlay: React.FC<MultiHighlightOverlayProps> = ({
  highlights,
  highlightStyle,
  className = ''
}) => {
  const overlayElements = useMemo(() => {
    const elements: React.ReactElement[] = [];
    
    highlights.forEach((highlightInfo, position) => {
      elements.push(
        <HighlightOverlay
          key={position}
          position={position}
          highlightTypes={highlightInfo.types}
          highlightData={highlightInfo.data}
          highlightStyle={highlightStyle}
          intensity={highlightInfo.intensity}
        />
      );
    });
    
    return elements;
  }, [highlights, highlightStyle]);

  if (overlayElements.length === 0) {
    return null;
  }

  return (
    <div 
      className={`multi-highlight-overlay ${className}`}
      role="presentation"
      aria-label="Chess board highlights"
    >
      {overlayElements}
    </div>
  );
};