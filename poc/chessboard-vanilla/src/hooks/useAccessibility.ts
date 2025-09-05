// useAccessibility.ts - Accessibility state and preferences hook
import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import type { AccessibilityConfig } from '../types/enhancement.types';
import type { ChessGameState, ChessPosition, ChessMove, ChessPiece } from '../types/chess.types';

interface UseAccessibilityOptions {
  enableScreenReader?: boolean;
  enableKeyboardNavigation?: boolean;
  enableAnnouncements?: boolean;
  announceDelay?: number;
  onAccessibilityChange?: (config: AccessibilityConfig) => void;
}

interface UseAccessibilityReturn {
  config: AccessibilityConfig;
  isScreenReaderEnabled: boolean;
  isKeyboardNavigationEnabled: boolean;
  currentFocus: ChessPosition | null;
  announcements: string[];
  updateConfig: (newConfig: Partial<AccessibilityConfig>) => void;
  setHighContrast: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  navigateToSquare: (position: ChessPosition) => void;
  announceMove: (move: ChessMove, gameState?: ChessGameState) => void;
  announceGameState: (gameState: ChessGameState) => void;
  announceCustom: (message: string, priority?: 'low' | 'medium' | 'high') => void;
  clearAnnouncements: () => void;
  getFocusableElements: () => Element[];
  cssVariables: Record<string, string>;
  ariaLabels: {
    chessboard: string;
    square: (position: ChessPosition, piece?: ChessPiece) => string;
    piece: (piece: ChessPiece) => string;
    gameStatus: (gameState: ChessGameState) => string;
  };
}

const DEFAULT_CONFIG: AccessibilityConfig = {
  highContrast: false,
  reducedMotion: false,
  screenReaderEnabled: false,
  keyboardNavigationEnabled: false
};

export const useAccessibility = (
  initialConfig: Partial<AccessibilityConfig> = {},
  options: UseAccessibilityOptions = {}
): UseAccessibilityReturn => {
  const {
    enableScreenReader = true,
    enableKeyboardNavigation = true,
    enableAnnouncements = true,
    announceDelay = 500,
    onAccessibilityChange
  } = options;

  const [config, setConfig] = useState<AccessibilityConfig>({
    ...DEFAULT_CONFIG,
    ...initialConfig
  });

  const [currentFocus, setCurrentFocus] = useState<ChessPosition | null>(null);
  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [announcementQueue, setAnnouncementQueue] = useState<{
    message: string;
    priority: 'low' | 'medium' | 'high';
    timestamp: number;
  }[]>([]);

  // Detect user preferences from system
  const systemPreferences = useMemo(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const screenReaderDetected = !!(
      window.navigator.userAgent.match(/NVDA|JAWS|VoiceOver|TalkBack/i) ||
      window.speechSynthesis ||
      document.querySelector('[role="application"]')
    );

    return {
      reducedMotion: prefersReducedMotion,
      highContrast: prefersHighContrast,
      screenReader: screenReaderDetected
    };
  }, []);

  // Derived accessibility states
  const isScreenReaderEnabled = useMemo(() => 
    enableScreenReader && (config.screenReaderEnabled || systemPreferences.screenReader),
    [enableScreenReader, config.screenReaderEnabled, systemPreferences.screenReader]
  );

  const isKeyboardNavigationEnabled = useMemo(() => 
    enableKeyboardNavigation && (config.keyboardNavigationEnabled ?? false),
    [enableKeyboardNavigation, config.keyboardNavigationEnabled]
  );

  // Update config function
  const updateConfig = useCallback((newConfig: Partial<AccessibilityConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      onAccessibilityChange?.(updated);
      return updated;
    });
  }, [onAccessibilityChange]);

  // Set high contrast mode
  const setHighContrast = useCallback((enabled: boolean) => {
    updateConfig({ highContrast: enabled });
    document.documentElement.classList.toggle('high-contrast', enabled);
  }, [updateConfig]);

  // Set reduced motion preference
  const setReducedMotion = useCallback((enabled: boolean) => {
    updateConfig({ reducedMotion: enabled });
    document.documentElement.classList.toggle('reduce-motion', enabled);
  }, [updateConfig]);

  // Navigate to specific square (for keyboard navigation)
  const navigateToSquare = useCallback((position: ChessPosition) => {
    setCurrentFocus(position);
    
    // Find and focus the square element
    const squareElement = document.querySelector(`[data-position="${position}"]`);
    if (squareElement && squareElement instanceof HTMLElement) {
      squareElement.focus();
    }

    // Announce the navigation
    if (isScreenReaderEnabled) {
      announceCustomRef.current?.(`Navigated to square ${position}`, 'low');
    }
  }, [isScreenReaderEnabled]);

  // Announce move to screen reader
  const announceMove = useCallback((move: ChessMove, gameState?: ChessGameState) => {
    if (!isScreenReaderEnabled || !enableAnnouncements) {
      return;
    }

    let announcement = `${move.piece.color} ${move.piece.type} moves from ${move.from} to ${move.to}`;

    // Add capture information
    if (move.captured) {
      announcement += `, capturing ${move.captured.color} ${move.captured.type}`;
    }

    // Add promotion information
    if (move.promotion) {
      announcement += `, promoted to ${move.promotion}`;
    }

    // Add special move information
    if (move.piece.type === 'king' && Math.abs(move.from.charCodeAt(0) - move.to.charCodeAt(0)) > 1) {
      announcement += ', castling';
    }

    // Add game state information
    if (gameState) {
      if (gameState.isCheckmate) {
        announcement += '. Checkmate!';
      } else if (gameState.isCheck) {
        announcement += '. Check!';
      } else if (gameState.isStalemate) {
        announcement += '. Stalemate!';
      }
    }

    announceCustomRef.current?.(announcement, 'high');
  }, [isScreenReaderEnabled, enableAnnouncements]);

  // Announce game state
  const announceGameState = useCallback((gameState: ChessGameState) => {
    if (!isScreenReaderEnabled || !enableAnnouncements) {
      return;
    }

    const messages: string[] = [];

    // Current turn
    messages.push(`${gameState.activeColor}'s turn`);

    // Game status
    if (gameState.isCheckmate) {
      messages.push(`Checkmate! ${gameState.activeColor === 'white' ? 'Black' : 'White'} wins`);
    } else if (gameState.isCheck) {
      messages.push(`${gameState.activeColor} king is in check`);
    } else if (gameState.isStalemate) {
      messages.push('Stalemate - game is a draw');
    }

    // Move count
    if (gameState.history.length > 0) {
      messages.push(`Move ${Math.ceil(gameState.history.length / 2)}`);
    }

    announceCustomRef.current?.(messages.join('. '), 'medium');
  }, [isScreenReaderEnabled, enableAnnouncements]);

  // Create stable ref for announcements to avoid dependency cycles
  const announceCustomRef = useRef<(message: string, priority?: 'low' | 'medium' | 'high') => void>();

  // Announce custom message
  const announceCustom = useCallback((
    message: string, 
    priority: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    if (!isScreenReaderEnabled || !enableAnnouncements) {
      return;
    }

    const timestamp = Date.now();
    
    setAnnouncementQueue(prev => {
      // Add to queue
      const newQueue = [...prev, { message, priority, timestamp }];
      
      // Sort by priority and timestamp
      return newQueue.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        
        if (priorityDiff !== 0) return priorityDiff;
        return a.timestamp - b.timestamp;
      });
    });
  }, [isScreenReaderEnabled, enableAnnouncements]);

  // Update ref when announceCustom changes
  announceCustomRef.current = announceCustom;

  // Clear announcements
  const clearAnnouncements = useCallback(() => {
    setAnnouncements([]);
    setAnnouncementQueue([]);
  }, []);

  // Get focusable elements in the chessboard
  const getFocusableElements = useCallback((): Element[] => {
    const chessboard = document.querySelector('.chessboard');
    if (!chessboard) return [];

    return Array.from(chessboard.querySelectorAll([
      '[tabindex]:not([tabindex="-1"])',
      '[data-position]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])'
    ].join(', ')));
  }, []);

  // Generate CSS variables for accessibility
  const cssVariables = useMemo(() => ({
    '--a11y-high-contrast': config.highContrast ? '1' : '0',
    '--a11y-reduced-motion': config.reducedMotion ? '1' : '0',
    '--a11y-screen-reader': isScreenReaderEnabled ? '1' : '0',
    '--a11y-keyboard-nav': isKeyboardNavigationEnabled ? '1' : '0',
    '--a11y-focus-outline': isKeyboardNavigationEnabled ? '3px solid #4A90E2' : 'none',
    '--a11y-focus-outline-offset': isKeyboardNavigationEnabled ? '2px' : '0'
  }), [config, isScreenReaderEnabled, isKeyboardNavigationEnabled]);

  // Generate ARIA labels
  const ariaLabels = useMemo(() => ({
    chessboard: 'Chess board',
    square: (position: ChessPosition, piece?: any) => {
      const file = position.charAt(0).toUpperCase();
      const rank = position.charAt(1);
      const squareDescription = `${file}${rank}`;
      
      if (piece) {
        return `${squareDescription}, ${piece.color} ${piece.type}`;
      }
      
      return `${squareDescription}, empty square`;
    },
    piece: (piece: ChessPiece) => `${piece.color} ${piece.type}`,
    gameStatus: (gameState: ChessGameState) => {
      if (gameState.isCheckmate) return 'Game over, checkmate';
      if (gameState.isCheck) return 'Check';
      if (gameState.isStalemate) return 'Game over, stalemate';
      return `${gameState.activeColor} to move`;
    }
  }), []);

  // Process announcement queue
  useEffect(() => {
    if (announcementQueue.length === 0) return;

    const timer = setTimeout(() => {
      const nextAnnouncement = announcementQueue[0];
      if (nextAnnouncement) {
        setAnnouncements(prev => [...prev, nextAnnouncement.message]);
        setAnnouncementQueue(prev => prev.slice(1));
      }
    }, announceDelay);

    return () => clearTimeout(timer);
  }, [announcementQueue, announceDelay]);

  // Keyboard navigation event handling
  useEffect(() => {
    if (!isKeyboardNavigationEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!currentFocus) return;

      const file = currentFocus.charCodeAt(0) - 'a'.charCodeAt(0);
      const rank = parseInt(currentFocus.charAt(1)) - 1;
      let newFile = file;
      let newRank = rank;

      switch (event.key) {
        case 'ArrowUp':
          newRank = Math.min(7, rank + 1);
          event.preventDefault();
          break;
        case 'ArrowDown':
          newRank = Math.max(0, rank - 1);
          event.preventDefault();
          break;
        case 'ArrowLeft':
          newFile = Math.max(0, file - 1);
          event.preventDefault();
          break;
        case 'ArrowRight':
          newFile = Math.min(7, file + 1);
          event.preventDefault();
          break;
        case 'Home':
          newFile = 0;
          newRank = 0;
          event.preventDefault();
          break;
        case 'End':
          newFile = 7;
          newRank = 7;
          event.preventDefault();
          break;
        default:
          return;
      }

      const newPosition = `${String.fromCharCode('a'.charCodeAt(0) + newFile)}${newRank + 1}` as ChessPosition;
      navigateToSquare(newPosition);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isKeyboardNavigationEnabled, currentFocus, navigateToSquare]);

  // Listen for system preference changes
  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches && !config.reducedMotion) {
        setReducedMotion(true);
        announceCustomRef.current?.('Reduced motion enabled based on system preference', 'low');
      }
    };

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches && !config.highContrast) {
        setHighContrast(true);
        announceCustomRef.current?.('High contrast enabled based on system preference', 'low');
      }
    };

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    highContrastQuery.addEventListener('change', handleHighContrastChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, [config.reducedMotion, config.highContrast, setReducedMotion, setHighContrast]);

  // Apply initial system preferences
  useEffect(() => {
    if (systemPreferences.reducedMotion && !config.reducedMotion) {
      setReducedMotion(true);
    }
    if (systemPreferences.highContrast && !config.highContrast) {
      setHighContrast(true);
    }
  }, [systemPreferences, config, setReducedMotion, setHighContrast]);

  return {
    config,
    isScreenReaderEnabled,
    isKeyboardNavigationEnabled,
    currentFocus,
    announcements,
    updateConfig,
    setHighContrast,
    setReducedMotion,
    navigateToSquare,
    announceMove,
    announceGameState,
    announceCustom,
    clearAnnouncements,
    getFocusableElements,
    cssVariables,
    ariaLabels
  };
};