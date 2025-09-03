/**
 * ChessboardDemo Component
 * SRP: Minimal wrapper around responsive-chessboard component
 * CRITICAL: This component must render the chessboard with pieces working
 */

import React, { useCallback } from 'react';
import { Chessboard } from 'responsive-chessboard';
import 'responsive-chessboard/styles';
import type { ChessboardDemoProps } from '@/types/demo/chessboard-demo.types';
import { cn } from '@/utils/ui/ui.utils';

/**
 * ChessboardDemo Component
 * Minimal wrapper that focuses on getting basic chessboard functionality working
 * Following the lessons learned: MINIMAL PROPS FIRST, FALLBACKS ALWAYS
 */
export const ChessboardDemo: React.FC<ChessboardDemoProps> = ({
  gameState,
  settings,
  containerConfig,
  onMove,
  onError,
  className,
  ...props
}) => {
  // MINIMAL TEST - Use hardcoded values to debug
  console.log('ChessboardDemo render:', { gameState, settings, containerConfig });
  
  const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const pieceSet = 'classic';
  const theme = 'classic';
  const showCoordinates = true;
  const animationsEnabled = true;
  const animationDuration = 300;
  const allowDragAndDrop = true;
  const boardOrientation = 'white';
  const width = containerConfig?.width || 400;
  const height = containerConfig?.height || 400;

  // Handle move with proper ChessMoveInput format
  const handleMove = useCallback((move: any) => {
    console.log('ChessboardDemo handleMove called:', move);
    try {
      if (!onMove) {
        console.log('No onMove handler provided');
        return false;
      }

      // Convert ChessMoveInput object to string format expected by chess.js
      let moveString: string;
      if (typeof move === 'string') {
        moveString = move;
      } else if (move && move.from && move.to) {
        // Convert {from: "e2", to: "e4"} to "e2e4"
        moveString = `${move.from}${move.to}`;
        if (move.promotion) {
          moveString += move.promotion;
        }
      } else {
        console.error('Invalid move format:', move);
        return false;
      }

      console.log('Calling onMove handler with move string:', moveString);
      // Call the parent onMove handler and return its boolean result
      const result = onMove(moveString);
      console.log('Move result:', result);
      return result;
    } catch (error) {
      console.error('Move error:', error);
      onError?.({ 
        type: 'invalid_move', 
        message: error instanceof Error ? error.message : 'Move failed', 
        timestamp: Date.now(),
        context: { move, error }
      });
      return false;
    }
  }, [onMove, onError]);

  // MINIMAL APPROACH: Start with basic props, add complexity only after this works
  return (
    <div 
      className={cn(
        'chessboard-demo-container',
        'w-full h-full',
        className
      )}
      {...props}
    >
      <Chessboard
        // Use correct new API
        initialFen={fen}
        pieceSet={pieceSet}
        boardOrientation={boardOrientation}
        onMove={handleMove}
        
        // Basic features
        showCoordinates={showCoordinates}
        animationsEnabled={animationsEnabled}
        allowDragAndDrop={allowDragAndDrop}
        
        // Theme configuration
        boardTheme={{
          lightSquareColor: theme === 'classic' ? '#f0d9b5' : 
                           theme === 'modern' ? '#eeeed2' :
                           theme === 'blue' ? '#e6f3ff' : '#f4e4bc',
          darkSquareColor: theme === 'classic' ? '#b58863' : 
                          theme === 'modern' ? '#769656' :
                          theme === 'blue' ? '#4a90b8' : '#8b6914',
          coordinateColor: '#666666',
          borderColor: '#333333',
          highlightColors: {
            'selected': '#ffff00',
            'valid-move': '#00ff00',
            'last-move': '#ffcc00',
            'check': '#ff0000',
            'capture': '#ff6600'
          }
        }}
        
        // Error handling
        onError={(error: any) => {
          onError?.({ 
            type: 'invalid_move', 
            message: error?.message || 'Chessboard error', 
            timestamp: Date.now(),
            context: { error }
          });
        }}
        
        // Additional props for better UX
        className="responsive-chessboard"
        testId="free-play-chessboard"
      />
    </div>
  );
};

export default ChessboardDemo;