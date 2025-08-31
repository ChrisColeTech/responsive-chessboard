import React, { useState } from 'react';
import { ChessBoard } from '../../src';
import './App.css';

const App: React.FC = () => {
  const [boardSize, setBoardSize] = useState(400);
  const [position, setPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  const [isReversed, setIsReversed] = useState(false);

  const handleMove = (moveData: any) => {
    console.log('Move:', moveData);
  };

  const handleEndGame = (result: any) => {
    console.log('Game ended:', result);
  };

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

      <div className="test-grid">
        <h3>Multiple Size Test</h3>
        <div className="size-grid">
          {[200, 300, 400, 500].map(size => (
            <div key={size} className="size-test">
              <h4>{size}px</h4>
              <ChessBoard
                FEN={position}
                onChange={() => {}}
                onEndGame={() => {}}
                boardSize={size}
                playerColor="white"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="responsive-test">
        <h3>Responsive Mode Test</h3>
        <div className="responsive-container">
          <ChessBoard
            FEN={position}
            onChange={() => {}}
            onEndGame={() => {}}
            responsive={true}
            minSize={200}
            maxSize={600}
            playerColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
