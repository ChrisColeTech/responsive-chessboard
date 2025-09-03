// App.tsx - Main application component
import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from './components';
import { useStockfish } from './hooks';
import { TestWorkerService } from './services/TestWorkerService';
import { testStockfish } from './direct-stockfish-test';
import type { ChessMove, GameResult } from './types';
import './styles/app.css';

function App() {
  const [gameStatus, setGameStatus] = useState<string>('White to move');
  const [pieceSet, setPieceSet] = useState<string>('classic');
  const [vsComputer, setVsComputer] = useState<boolean>(false);
  const [computerColor] = useState<'white' | 'black'>('black');
  const [gameKey, setGameKey] = useState<number>(0); // Force re-render of chessboard
  const gameStateRef = useRef<any>(null);
  const makeMoveRef = useRef<any>(null);
  
  // Reactive ply counter - increments after each move is actually applied to board
  const [ply, setPly] = useState<number>(0);
  
  // App-level ply latch - prevent multiple searches for the same chess position
  const inFlightForPlyRef = useRef<number | null>(null);
  
  // Track last requested ply for latch management
  const lastRequestedPlyRef = useRef<number | null>(null);
  
  // Initialize Stockfish
  const { isReady: stockfishReady, isThinking, requestMove, skillLevel, error: stockfishError } = useStockfish();
  
  // Phase 1: Test Worker Communication
  const [testWorker] = useState(() => new TestWorkerService());
  const [testWorkerReady, setTestWorkerReady] = useState(false);
  
  // Component initialization (cleaned up logging)

  // Phase 1: Test worker lifecycle
  useEffect(() => {
    console.log('🧪 [PHASE1] Starting test worker communication test');
    
    // Test error handling after 3 seconds
    const timer = setTimeout(() => {
      console.log('🧪 [PHASE1] Testing error handling...');
      testWorker.testErrorHandling();
    }, 3000);
    
    // Check worker status periodically
    const statusCheck = setInterval(() => {
      const isReady = testWorker.getStatus();
      if (isReady !== testWorkerReady) {
        console.log('🧪 [PHASE1] Test worker status changed:', isReady);
        setTestWorkerReady(isReady);
      }
    }, 500);
    
    return () => {
      console.log('🧪 [PHASE1] Cleaning up test worker');
      clearTimeout(timer);
      clearInterval(statusCheck);
      testWorker.destroy();
    };
  }, [testWorker, testWorkerReady]);

  // Determine whose turn it is and if computer should move
  const { turn, shouldComputerMove } = React.useMemo(() => {
    if (!gameStateRef.current) {
      // Game start
      return { 
        turn: 'white', 
        shouldComputerMove: vsComputer && computerColor === 'white' 
      };
    }
    
    if (gameStateRef.current.isCheckmate || gameStateRef.current.isGameOver) {
      return { turn: 'game_over', shouldComputerMove: false };
    }
    
    // Game in progress - whose turn is next?
    const lastMoveColor = gameStateRef.current.piece.color;
    const nextTurn = lastMoveColor === 'white' ? 'black' : 'white';
    
    return { 
      turn: nextTurn, 
      shouldComputerMove: vsComputer && computerColor === nextTurn 
    };
  }, [gameStateRef.current, vsComputer, computerColor]);

  // Computer move effect - ply-based single-flight protection
  useEffect(() => {
    if (!shouldComputerMove || !stockfishReady) return;
    
    console.log('🔄 [COMPUTER] Ply effect triggered:', {
      ply,
      turn,
      shouldComputerMove,
      inFlightForPly: inFlightForPlyRef.current,
      lastRequestedPly: lastRequestedPlyRef.current
    });
    
    // Ply-based single-flight guard - only allow one search per ply
    if (inFlightForPlyRef.current === ply) {
      console.log('🚫 [COMPUTER] Already searching for ply', ply, '- blocking duplicate');
      return;
    }
    
    // Block future duplicates for this ply
    inFlightForPlyRef.current = ply;
    console.log('🔒 [COMPUTER] Latched on ply', ply);
    
    // Get current FEN after human move is applied
    const currentFEN = gameStateRef.current?.fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    console.log('♟️ [COMPUTER] Position for ply', ply, ':', currentFEN);
    
    // Async computer move with proper latch release
    (async () => {
      try {
        console.log('🤖 [COMPUTER] Starting computer move for ply', ply);
        
        const computerMove = await requestMove(currentFEN, 2000);
        if (!computerMove) {
          console.error('❌ [COMPUTER] No move received from engine');
          return;
        }
        
        console.log('💡 [COMPUTER] Engine suggests:', computerMove, 'for ply', ply);
        
        // Parse and apply move
        const fromSquare = computerMove.substring(0, 2);
        const toSquare = computerMove.substring(2, 4);
        
        console.log(`♛ [COMPUTER] Applying move: ${fromSquare} → ${toSquare}`);
        
        // Brief delay for UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Apply move to board
        const success = await makeMoveRef.current(fromSquare, toSquare);
        if (success) {
          console.log('✅ [COMPUTER] Move applied successfully for ply', ply);
          setGameStatus(`Computer played ${fromSquare}→${toSquare}. Your turn!`);
          
          // Increment reactive ply counter after computer move is applied
          setPly(prev => {
            const newPly = prev + 1;
            console.log('📈 [PLY] Computer move applied - ply incremented:', prev, '→', newPly);
            return newPly;
          });
        } else {
          console.error('❌ [COMPUTER] Move failed to apply on board for ply', ply);
        }
        
      } catch (error) {
        console.error('💥 [COMPUTER] Computer move failed for ply', ply, ':', error);
      } finally {
        // Release latch - the ply state will trigger new effect if needed
        console.log('🔓 [COMPUTER] Releasing latch for ply', ply);
        inFlightForPlyRef.current = null;
        lastRequestedPlyRef.current = ply;
      }
    })();
    
  }, [shouldComputerMove, stockfishReady, ply]); // Reactive ply state triggers computer moves


  const handleMove = (move: ChessMove) => {
    console.log('👤 [HUMAN] Move made:', move.notation, 'by', move.piece.color);
    gameStateRef.current = move;
    
    // Increment reactive ply counter after move is applied
    setPly(prev => {
      const newPly = prev + 1;
      console.log('📈 [PLY] Human move applied - ply incremented:', prev, '→', newPly);
      return newPly;
    });
    
    // Update status based on game state
    if (move.isCheckmate) {
      setGameStatus(`Checkmate! ${move.piece.color === 'white' ? 'White' : 'Black'} wins!`);
    } else if (move.isCheck) {
      setGameStatus(`Check! ${move.piece.color === 'white' ? 'Black' : 'White'} to move`);
    } else {
      const nextColor = move.piece.color === 'white' ? 'Black' : 'White';
      if (vsComputer && !move.isCheckmate && !move.isCheck) {
        if (computerColor === (move.piece.color === 'white' ? 'black' : 'white')) {
          setGameStatus(`${nextColor} (Computer) to move...`);
        } else {
          setGameStatus(`${nextColor} to move`);
        }
      } else {
        setGameStatus(`${nextColor} to move`);
      }
    }
  };

  const handleGameEnd = (result: GameResult) => {
    console.log('Game ended:', result);
    
    switch (result.reason) {
      case 'checkmate':
        setGameStatus(`Checkmate! ${result.winner === 'white' ? 'White' : 'Black'} wins!`);
        break;
      case 'stalemate':
        setGameStatus('Stalemate! Game is a draw.');
        break;
      case 'draw':
        setGameStatus('Draw!');
        break;
      default:
        setGameStatus('Game over.');
    }
  };

  const handleNewGame = () => {
    setGameKey(prev => prev + 1); // Force chessboard re-render
    setGameStatus('White to move');
    setVsComputer(false);
    gameStateRef.current = null;
    
    // Reset reactive ply counter and clear latches for fresh game
    setPly(0);
    lastRequestedPlyRef.current = null;
    inFlightForPlyRef.current = null;
    console.log('🔄 [GAME] New game - reset ply to 0 and cleared latches');
  };

  const handleFlipBoard = () => {
    // TODO: Implement board flipping
    console.log('Board flip requested');
  };

  const handlePlayComputer = () => {
    const newVsComputer = !vsComputer;
    console.log(`🎮 [GAME] ${newVsComputer ? 'Starting' : 'Stopping'} vs Computer mode`);
    setVsComputer(newVsComputer);
    setGameKey(prev => prev + 1); // Force chessboard re-render
    setGameStatus(vsComputer ? 'White to move' : 'Game vs Computer - White to move');
    
    // Reset reactive ply counter and clear latches when changing modes
    setPly(0);
    lastRequestedPlyRef.current = null;
    inFlightForPlyRef.current = null;
    console.log('🔄 [GAME] Computer mode toggled - reset ply to 0 and cleared latches');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Vanilla Chessboard</h1>
      </header>
      
      <main className="app-main">
        <div className="chessboard-container">
          <Chessboard
            key={gameKey} // Force re-render when game resets
            pieceSet={pieceSet as 'classic' | 'modern' | 'tournament' | 'executive' | 'conqueror'}
            showCoordinates={true}
            allowDragAndDrop={true}
            orientation="white"
            onMove={handleMove}
            onGameEnd={handleGameEnd}
            makeMoveRef={makeMoveRef}
            maxWidth={600}
          />
        </div>
        
        <div className="game-controls">
          <button className="btn btn-primary" onClick={handleNewGame}>
            New Game
          </button>
          <button className="btn btn-secondary" onClick={handleFlipBoard}>
            Flip Board
          </button>
          <button 
            className={`btn ${vsComputer ? 'btn-primary' : 'btn-secondary'}`} 
            onClick={handlePlayComputer}
            disabled={!stockfishReady}
          >
            {vsComputer ? '👤 vs Human' : '🤖 vs Computer'}
            {!stockfishReady && ' (Loading...)'}
          </button>
          <button className="btn" onClick={testStockfish} style={{backgroundColor: '#ff9800', color: 'white'}}>
            🧪 Test Stockfish Direct
          </button>
        </div>
        
        <div className="piece-set-selector">
          <label htmlFor="piece-set">Piece Set: </label>
          <select 
            id="piece-set" 
            value={pieceSet} 
            onChange={(e) => setPieceSet(e.target.value)}
            className="piece-set-dropdown"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
            <option value="tournament">Tournament</option>
            <option value="executive">Executive</option>
            <option value="conqueror">Conqueror</option>
          </select>
        </div>
        
        <div className="game-status">
          <div className="status-line">
            {isThinking ? '🤔 Computer thinking...' : gameStatus}
          </div>
          {stockfishError && (
            <div className="error-line" style={{color: 'red', fontSize: '0.9em'}}>
              Stockfish Error: {stockfishError}
            </div>
          )}
          {vsComputer && (
            <div className="computer-info" style={{fontSize: '0.8em', color: '#666'}}>
              Computer plays as {computerColor} • Skill Level: {skillLevel}
              <br/>
              Stockfish Ready: {stockfishReady ? '✅' : '❌'} • Game State: {gameStateRef.current ? '✅' : '❌'} • makeMoveRef: {makeMoveRef.current ? '✅' : '❌'}
              <br/>
              Last Move: {gameStateRef.current ? `${gameStateRef.current.piece?.color} ${gameStateRef.current.notation}` : 'None'}
            </div>
          )}
          <div className="phase1-status" style={{fontSize: '0.8em', color: '#333', marginTop: '10px', padding: '5px', backgroundColor: '#f0f0f0', borderRadius: '3px'}}>
            <strong>🧪 Phase 1 Test:</strong> Test Worker Ready: {testWorkerReady ? '✅' : '❌'}
            <br/>
            <em>Check browser console for detailed worker communication logs</em>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
