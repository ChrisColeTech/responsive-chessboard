// ScreenReaderAnnouncements.tsx - Screen reader integration component
import React, { useEffect, useRef, useState } from 'react';
import type { ChessPiece, ChessGameState } from '../../types/chess.types';

interface ScreenReaderAnnouncementsProps {
  announcements: string[];
  enabled?: boolean;
  politeLevel?: 'off' | 'polite' | 'assertive';
  clearOnAnnounce?: boolean;
  className?: string;
}

export const ScreenReaderAnnouncements: React.FC<ScreenReaderAnnouncementsProps> = ({
  announcements,
  enabled = true,
  politeLevel = 'polite',
  clearOnAnnounce = true,
  className = ''
}) => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<string>('');
  const [announcementHistory, setAnnouncementHistory] = useState<string[]>([]);
  const previousAnnouncementsRef = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Process new announcements
  useEffect(() => {
    if (!enabled || announcements.length === 0) {
      return;
    }

    // Find new announcements
    const newAnnouncements = announcements.slice(previousAnnouncementsRef.current.length);
    previousAnnouncementsRef.current = [...announcements];

    if (newAnnouncements.length === 0) {
      return;
    }

    // Get the most recent announcement
    const latestAnnouncement = newAnnouncements[newAnnouncements.length - 1];
    
    // Update current announcement
    setCurrentAnnouncement(latestAnnouncement);
    
    // Add to history
    setAnnouncementHistory(prev => [...prev, ...newAnnouncements]);

    // Clear the announcement after a delay to allow screen readers to process it
    if (clearOnAnnounce) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setCurrentAnnouncement('');
      }, 1000);
    }
  }, [announcements, enabled, clearOnAnnounce]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className={`screen-reader-announcements ${className}`}>
      {/* Live region for current announcements */}
      <div
        role="status"
        aria-live={politeLevel}
        aria-atomic="true"
        className="sr-only"
        data-testid="screen-reader-live-region"
      >
        {currentAnnouncement}
      </div>

      {/* Alternative live region for assertive announcements */}
      {politeLevel !== 'assertive' && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="sr-only"
          data-testid="screen-reader-alert-region"
        >
          {/* This will be used for high-priority announcements */}
        </div>
      )}

      {/* Hidden log of announcements for debugging/testing */}
      {process.env.NODE_ENV === 'development' && (
        <div
          className="sr-only"
          data-testid="announcement-history"
          role="log"
          aria-label="Announcement history"
        >
          {announcementHistory.map((announcement, index) => (
            <div key={index}>{announcement}</div>
          ))}
        </div>
      )}
    </div>
  );
};

// Higher-order component for wrapping components with screen reader support
interface WithScreenReaderProps {
  children: React.ReactNode;
  announcements?: string[];
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
}

export const WithScreenReader: React.FC<WithScreenReaderProps> = ({
  children,
  announcements = [],
  ariaLabel,
  ariaDescribedBy,
  role
}) => {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      className="screen-reader-enhanced"
    >
      {children}
      <ScreenReaderAnnouncements announcements={announcements} />
    </div>
  );
};

// Component for chess-specific announcements
interface ChessAnnouncementsProps {
  gameState?: ChessGameState;
  selectedSquare?: string;
  validMoves?: string[];
  announcements: string[];
  enabled?: boolean;
}

export const ChessAnnouncements: React.FC<ChessAnnouncementsProps> = ({
  gameState,
  selectedSquare,
  validMoves = [],
  announcements,
  enabled = true
}) => {
  const [chessAnnouncements, setChessAnnouncements] = useState<string[]>([]);

  // Generate chess-specific announcements
  useEffect(() => {
    if (!enabled) return;

    const newAnnouncements: string[] = [];

    // Announce game state changes
    if (gameState) {
      if (gameState.isCheckmate) {
        newAnnouncements.push(`Checkmate! ${gameState.activeColor === 'white' ? 'Black' : 'White'} wins the game.`);
      } else if (gameState.isCheck) {
        newAnnouncements.push(`${gameState.activeColor} king is in check.`);
      } else if (gameState.isStalemate) {
        newAnnouncements.push('Stalemate. The game is a draw.');
      }
    }

    // Announce selected square and available moves
    if (selectedSquare && validMoves.length > 0) {
      const moveList = validMoves.join(', ');
      newAnnouncements.push(`Selected ${selectedSquare}. Available moves: ${moveList}`);
    }

    if (newAnnouncements.length > 0) {
      setChessAnnouncements(prev => [...prev, ...newAnnouncements]);
    }
  }, [gameState, selectedSquare, validMoves, enabled]);

  // Combine all announcements
  const allAnnouncements = [...announcements, ...chessAnnouncements];

  return (
    <ScreenReaderAnnouncements
      announcements={allAnnouncements}
      enabled={enabled}
      politeLevel="polite"
      className="chess-announcements"
    />
  );
};

// Hook for managing screen reader announcements
interface UseScreenReaderReturn {
  announce: (message: string, priority?: 'low' | 'medium' | 'high') => void;
  announcements: string[];
  clearAnnouncements: () => void;
  isEnabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export const useScreenReader = (initialEnabled = true): UseScreenReaderReturn => {
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [isEnabled, setIsEnabled] = useState(initialEnabled);

  const announce = React.useCallback((
    message: string,
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    if (!isEnabled || !message.trim()) return;

    // Add priority prefix for screen readers
    const priorityPrefixes = {
      low: '',
      medium: 'Notice: ',
      high: 'Important: '
    };

    const prefixedMessage = `${priorityPrefixes[priority]}${message}`;
    
    setAnnouncements(prev => [...prev, prefixedMessage]);
  }, [isEnabled]);

  const clearAnnouncements = React.useCallback(() => {
    setAnnouncements([]);
  }, []);

  const setEnabled = React.useCallback((enabled: boolean) => {
    setIsEnabled(enabled);
    if (!enabled) {
      clearAnnouncements();
    }
  }, [clearAnnouncements]);

  return {
    announce,
    announcements,
    clearAnnouncements,
    isEnabled,
    setEnabled
  };
};

// Utility component for creating accessible chess piece descriptions
interface ChessPieceDescriptionProps {
  piece: ChessPiece;
  position: string;
  isSelected?: boolean;
  canMove?: boolean;
  threatens?: string[];
  isProtected?: boolean;
}

export const ChessPieceDescription: React.FC<ChessPieceDescriptionProps> = ({
  piece,
  position,
  isSelected = false,
  canMove = false,
  threatens = [],
  isProtected = false
}) => {
  const description = React.useMemo(() => {
    let desc = `${piece.color} ${piece.type} on ${position}`;
    
    if (isSelected) {
      desc += ', selected';
    }
    
    if (!canMove) {
      desc += ', cannot move';
    }
    
    if (threatens.length > 0) {
      desc += `, threatening ${threatens.join(', ')}`;
    }
    
    if (isProtected) {
      desc += ', protected';
    }
    
    return desc;
  }, [piece, position, isSelected, canMove, threatens, isProtected]);

  return (
    <span className="sr-only chess-piece-description">
      {description}
    </span>
  );
};