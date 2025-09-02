// Code example generation utilities
import type { ChessboardConfig, ControlPanelSettings } from '@/types';

export const generateBasicExample = (config: ChessboardConfig): string => {
  return `import { Chessboard } from 'responsive-chessboard';

function MyChessboard() {
  return (
    <Chessboard
      initialFen="${config.initialFen}"
      boardTheme="${config.boardTheme}"
      pieceSet="${config.pieceSet}"
      showCoordinates={${config.showCoordinates}}
      width={${config.boardWidth}}
    />
  );
}`;
};

export const generateAdvancedExample = (settings: ControlPanelSettings): string => {
  return `import { Chessboard } from 'responsive-chessboard';
import { useState } from 'react';

function AdvancedChessboard() {
  const [position, setPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  
  const handleMove = (move) => {
    // Handle move logic here
    console.log('Move made:', move);
  };
  
  return (
    <Chessboard
      initialFen={position}
      boardTheme="${settings.boardTheme}"
      pieceSet="${settings.pieceSet}"
      boardOrientation="${settings.boardOrientation}"
      showCoordinates={${settings.showCoordinates}}
      animationsEnabled={${settings.animationsEnabled}}
      animationDuration={${settings.animationDuration}}
      width={${settings.boardWidth}}
      onMove={handleMove}
    />
  );
}`;
};

export const generatePOCMigrationExample = () => {
  return `// Before (POC API)
<Chessboard
  FEN={fen}
  onChange={handleChange}
  playerColor="white"
  boardSize={400}
/>

// After (New API)
<Chessboard
  initialFen={fen}
  onMove={handleMove}
  boardOrientation="white"
  width={400}
/>`;
};

export const generateResponsiveExample = (): string => {
  return `import { Chessboard } from 'responsive-chessboard';
import { useEffect, useState } from 'react';

function ResponsiveChessboard() {
  const [containerWidth, setContainerWidth] = useState(600);
  
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('chess-container');
      if (container) {
        setContainerWidth(container.offsetWidth - 32); // 16px padding each side
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div id="chess-container" className="w-full p-4">
      <Chessboard
        width={Math.min(containerWidth, 800)} // Max 800px
        showCoordinates={true}
        boardTheme="classic"
        pieceSet="tournament"
      />
    </div>
  );
}`;
};

export const formatCodeExample = (code: string): string => {
  // Basic code formatting - remove extra spaces and normalize indentation
  return code
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();
};