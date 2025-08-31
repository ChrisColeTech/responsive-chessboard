import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChessBoard } from 'responsive-chessboard';
import './App.css';

const ResponsiveChessBoardContainer: React.FC<{
  FEN: string;
  playerColor: string;
}> = ({ FEN, playerColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(400);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        // Account for padding (20px each side)
        const availableWidth = width - 40;
        setContainerWidth(Math.max(200, Math.min(600, availableWidth)));
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="responsive-container"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <ChessBoard
        FEN={FEN}
        onChange={() => {}}
        onEndGame={() => {}}
        boardSize={containerWidth}
        playerColor={playerColor as any}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState(400);
  const [position, setPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [isReversed, setIsReversed] = useState(false);

  // Memoize handlers to prevent unnecessary re-renders
  const handleMove = useMemo(() => (moveData: any) => {
    console.log('Move:', moveData);
  }, []);

  const handleEndGame = useMemo(() => (result: any) => {
    console.log('Game ended:', result);
  }, []);

  const testSizes = [200, 300, 400, 500, 600, 800];

  return (
    <div className="app">
      <div className="header">
        <h1>Responsive ChessBoard Test</h1>
        <p>Testing responsive sizing props implementation</p>
      </div>

      <div className="controls">
        <div className="control-group">
          <label>Board Size:</label>
          <input
            type="range"
            min="200"
            max="800"
            value={boardSize}
            onChange={(e) => setBoardSize(Number(e.target.value))}
          />
          <span>{boardSize}px</span>
        </div>

        <div className="control-group">
          <label>Quick Sizes:</label>
          {testSizes.map(size => (
            <button
              key={size}
              onClick={() => setBoardSize(size)}
              className={boardSize === size ? 'active' : ''}
            >
              {size}px
            </button>
          ))}
        </div>

        <div className="control-group">
          <button onClick={() => setIsReversed(!isReversed)}>
            {isReversed ? 'Black\'s View' : 'White\'s View'}
          </button>
        </div>
      </div>

      <div className="board-container">
        <ChessBoard
          FEN={position}
          onChange={handleMove}
          onEndGame={handleEndGame}
          reversed={isReversed}
          boardSize={boardSize}
          playerColor="white"
        />
      </div>


      <div className="responsive-test">
        <h3>Responsive Mode Test</h3>
        <p>Drag the resize handle in the bottom-right corner to test responsive behavior</p>
        <ResponsiveChessBoardContainer 
          FEN={position} 
          playerColor="white"
        />
      </div>
    </div>
  );
};

export default App;
