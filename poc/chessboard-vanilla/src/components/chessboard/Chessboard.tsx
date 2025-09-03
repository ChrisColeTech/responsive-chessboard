// Chessboard.tsx - Main chessboard component
import React from 'react';
import type { ChessboardProps } from '../../types';
import { useChessGame, useResponsiveBoard, useDragAndDrop } from '../../hooks';
import { 
  useTheme, 
  useAnimation, 
  useFocusMode, 
  useCoordinates, 
  useHighlight, 
  useAudio, 
  useAccessibility 
} from '../../hooks';
import { Board } from './Board';
import { FocusMode } from './FocusMode';
import { CoordinateDisplay } from './CoordinateDisplay';
import { MultiHighlightOverlay } from './HighlightOverlay';
import { ChessAnnouncements } from './ScreenReaderAnnouncements';

// Import CSS
import '../../styles/global.css';
import '../../styles/chessboard.css';
import '../../styles/themes/classic.css';
import '../../styles/themes/modern.css';
import '../../styles/themes/tournament.css';
import '../../styles/themes/executive.css';
import '../../styles/themes/conqueror.css';
import '../../styles/themes/elegant.css';
import '../../styles/themes/minimal.css';
import '../../styles/animations.css';
import '../../styles/coordinates.css';
import '../../styles/highlights.css';
import '../../styles/accessibility.css';

export const Chessboard: React.FC<ChessboardProps> = ({
  // Core existing props
  pieceSet = 'classic',
  showCoordinates = true,
  allowDragAndDrop = true,
  orientation = 'white',
  onMove,
  onGameEnd,
  makeMoveRef,
  maxWidth,
  className,
  style,
  
  // Enhancement bundle (takes precedence over individual props)
  enhancements,
  
  // Individual enhancement props (overridden by enhancements bundle if provided)
  theme = enhancements?.theme,
  boardMaterial = enhancements?.boardMaterial,
  animationConfig = enhancements?.animationConfig,
  focusMode = enhancements?.focusMode,
  coordinateStyle = enhancements?.coordinateStyle,
  highlightConfig = enhancements?.highlightConfig,
  audioProfile = enhancements?.audioProfile,
  accessibilityConfig = enhancements?.accessibilityConfig,
  
  // Enhancement event handlers
  onThemeChange,
  onFocusModeChange,
  onAnimationComplete,
  onAudioEvent,
  onAccessibilityChange
}) => {
  // Use hooks for state management
  const { gameState, makeMove, getValidMoves, getValidTargetSquares, isLoading, error } = useChessGame();
  const { containerRef } = useResponsiveBoard(maxWidth);
  
  // Enhancement hooks
  const { 
    currentTheme, 
    currentMaterial,
    cssVariables: themeCssVariables
  } = useTheme(theme, boardMaterial, { onThemeChange });
  
  const {
    config: animConfig
  } = useAnimation(animationConfig?.type || 'smooth', { onAnimationComplete });
  
  const {
    currentMode,
    cssVariables: focusCssVariables
  } = useFocusMode(focusMode, { onModeChange: onFocusModeChange });
  
  const {
    coordinateConfig,
    coordinateElements,
    cssVariables: coordinateCssVariables
  } = useCoordinates(coordinateStyle || 'corner', focusMode || 'casual', { showHints: showCoordinates });
  
  const {
    highlights: _highlights, // Not currently used but available for future enhancement
    cssVariables: highlightCssVariables
  } = useHighlight(gameState, highlightConfig?.style || 'standard', focusMode || 'casual');
  
  const {
    playSound
  } = useAudio(
    enhancements?.audioProfile ? {
      move: { enabled: true, file: 'move.mp3', volume: 0.8 },
      capture: { enabled: true, file: 'capture.mp3', volume: 0.9 },
      check: { enabled: true, file: 'check.mp3', volume: 0.9 },
      checkmate: { enabled: true, file: 'checkmate.mp3', volume: 1.0 },
      castle: { enabled: true, file: 'castle.mp3', volume: 0.8 },
      promote: { enabled: true, file: 'promote.mp3', volume: 0.9 },
      gameStart: { enabled: true, file: 'gamestart.mp3', volume: 0.7 },
      gameEnd: { enabled: true, file: 'gameend.mp3', volume: 0.8 }
    } : {
      move: { enabled: false, file: '', volume: 0 },
      capture: { enabled: false, file: '', volume: 0 },
      check: { enabled: false, file: '', volume: 0 },
      checkmate: { enabled: false, file: '', volume: 0 },
      castle: { enabled: false, file: '', volume: 0 },
      promote: { enabled: false, file: '', volume: 0 },
      gameStart: { enabled: false, file: '', volume: 0 },
      gameEnd: { enabled: false, file: '', volume: 0 }
    },
    audioProfile || 'standard',
    { onAudioEvent }
  );
  
  const {
    config: a11yConfig,
    isScreenReaderEnabled,
    isKeyboardNavigationEnabled,
    announcements,
    announceMove: _announceMove, // Available for future use (move announcements handled elsewhere)
    announceGameState,
    cssVariables: a11yCssVariables,
    ariaLabels
  } = useAccessibility(accessibilityConfig, { onAccessibilityChange });
  
  // Combine all CSS variables from enhancement hooks
  const combinedCssVariables = React.useMemo(() => ({
    ...themeCssVariables,
    ...focusCssVariables,
    ...coordinateCssVariables,
    ...highlightCssVariables,
    ...a11yCssVariables
  }), [themeCssVariables, focusCssVariables, coordinateCssVariables, highlightCssVariables, a11yCssVariables]);
  
  // Combine style with CSS variables
  const enhancedStyle = React.useMemo(() => ({
    ...style,
    ...combinedCssVariables
  }), [style, combinedCssVariables]);
  
  // Generate enhanced class names
  const enhancedClassName = React.useMemo(() => {
    const classes = ['chessboard'];
    
    if (className) classes.push(className);
    if (currentTheme) classes.push(`theme-${currentTheme}`);
    if (currentMaterial) classes.push(`material-${currentMaterial}`);
    if (currentMode) classes.push(`focus-${currentMode}`);
    if (isKeyboardNavigationEnabled) classes.push('keyboard-navigation-enabled');
    if (a11yConfig.highContrast) classes.push('high-contrast');
    if (a11yConfig.reducedMotion) classes.push('reduce-motion');
    if (isScreenReaderEnabled) classes.push('screen-reader-enhanced');
    
    return classes.join(' ');
  }, [className, currentTheme, currentMaterial, currentMode, isKeyboardNavigationEnabled, a11yConfig, isScreenReaderEnabled]);
  
  // Wrap makeMove to trigger onMove callback and enhancements
  const wrappedMakeMove = React.useCallback(async (from: string, to: string, promotion?: any) => {
    const success = await makeMove(from, to, promotion, onMove);
    
    // Play move sound if move was successful
    if (success) {
      playSound('move');
      
      // Note: announceMove will be called by the onMove callback with the move details
    }
    
    return success;
  }, [makeMove, onMove, playSound]);
  
  const { 
    selectedSquare,
    validDropTargets, 
    handleDragStart, 
    handleDragEnd, 
    handleDrop,
    handleSquareClick
  } = useDragAndDrop(gameState, wrappedMakeMove, getValidMoves, getValidTargetSquares, animConfig, onAnimationComplete);

  // Expose makeMove function to parent via ref
  React.useEffect(() => {
    if (makeMoveRef) {
      makeMoveRef.current = wrappedMakeMove;
    }
  }, [makeMoveRef, wrappedMakeMove]);

  // Handle game state changes and announcements
  React.useEffect(() => {
    if (gameState) {
      // Announce game state changes
      announceGameState(gameState);
      
      // Play audio for game events
      if (gameState.isCheckmate) {
        playSound('checkmate');
      } else if (gameState.isCheck) {
        playSound('check');
      }
    }
  }, [gameState?.isCheckmate, gameState?.isCheck, gameState?.activeColor, announceGameState, playSound]);
  
  // Handle game end detection
  React.useEffect(() => {
    if (gameState?.isGameOver) {
      const result = {
        winner: gameState.isCheckmate ? 
          (gameState.activeColor === 'white' ? 'black' as const : 'white' as const) : 
          undefined,
        reason: gameState.isCheckmate ? 'checkmate' as const : 
                gameState.isStalemate ? 'stalemate' as const : 'draw' as const,
        moves: gameState.history,
        pgn: '' // Would be populated by service
      };
      onGameEnd?.(result);
    }
  }, [onGameEnd, gameState?.isGameOver, gameState?.isCheckmate, gameState?.isStalemate, gameState?.activeColor, gameState?.history]);

  if (isLoading) {
    return (
      <div ref={containerRef} className={`chessboard loading ${className}`} style={style}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div ref={containerRef} className={`chessboard error ${className}`} style={style}>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <FocusMode 
      focusMode={currentMode || 'casual'}
      className={enhancedClassName}
    >
      <div 
        ref={containerRef} 
        className={enhancedClassName}
        style={enhancedStyle}
        data-theme={currentTheme}
        data-material={currentMaterial}
        data-focus-mode={currentMode}
      >
        {/* Highlight overlays */}
        <MultiHighlightOverlay
          highlights={new Map()}
          highlightStyle={highlightConfig?.style || 'standard'}
        />
        
        {/* Main board */}
        <Board
          gameState={gameState}
          orientation={orientation}
          pieceSet={pieceSet}
          showCoordinates={showCoordinates}
          selectedSquare={selectedSquare}
          validDropTargets={validDropTargets}
          isInCheck={gameState?.isCheck || false}
          onSquareClick={handleSquareClick}
          onDragStart={allowDragAndDrop ? handleDragStart : undefined}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          
          // Enhancement props
          theme={currentTheme}
          boardMaterial={currentMaterial}
          animationConfig={animConfig}
          focusMode={currentMode}
          coordinateStyle={coordinateConfig?.style}
          highlightConfig={highlightConfig}
          cssVariables={combinedCssVariables}
          ariaLabels={ariaLabels}
        />
        
        {/* Enhanced coordinate display */}
        {showCoordinates && coordinateElements && (
          <CoordinateDisplay
            position="a1"
            orientation={orientation}
            coordinateStyle={coordinateConfig?.style || 'corner'}
            focusMode={currentMode || 'casual'}
            showRank={coordinateConfig?.showRanks}
            showFile={coordinateConfig?.showFiles}
            style={coordinateCssVariables}
          />
        )}
        
        {/* Screen reader announcements */}
        <ChessAnnouncements
          gameState={gameState || undefined}
          selectedSquare={selectedSquare || undefined}
          validMoves={Array.from(validDropTargets)}
          announcements={announcements}
          enabled={isScreenReaderEnabled}
        />
      </div>
    </FocusMode>
  );
};