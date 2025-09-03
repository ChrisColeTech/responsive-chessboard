// DragTestPage.tsx - Document 20 drag and drop testing page
import React, { useState } from 'react';
import { TestBoard } from '../components';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useChessGame } from '../hooks/useChessGame';

export const DragTestPage: React.FC = () => {
  const { gameState, makeMove, getValidMoves, resetGame, error: gameError } = useChessGame();
  const [dragTestResult, setDragTestResult] = useState<string | null>(null);
  
  const { 
    selectedSquare, 
    validDropTargets,
    handleSquareClick
  } = useDragAndDrop(gameState, makeMove, getValidMoves);

  const handleTestDragDrop = async () => {
    console.log('🎯 [DRAG TEST] Starting drag and drop test...');
    setDragTestResult('Testing drag and drop functionality...');
    
    try {
      const success = await makeMove('e2', 'e4');
      
      if (success) {
        setDragTestResult(`✅ Success! Move e2-e4 executed successfully.`);
        console.log('🎉 [DRAG TEST] Drag and drop test successful!', gameState);
      } else {
        setDragTestResult('❌ Failed: Move was not executed');
        console.error('💥 [DRAG TEST] Drag and drop test failed');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setDragTestResult(`❌ Error: ${errorMsg}`);
      console.error('💥 [DRAG TEST] Drag and drop test error:', err);
    }
  };

  const handleResetGame = () => {
    resetGame();
    setDragTestResult(null);
    // Also reset the TestBoard
    if (typeof window !== 'undefined' && (window as any).__testBoardReset) {
      (window as any).__testBoardReset();
    }
    console.log('🔄 [DRAG TEST] Game and TestBoard reset to starting position');
  };

  const handleTestSquareClick = (square: string) => {
    console.log(`🖱️ [CLICK TEST] Square ${square} clicked`);
    handleSquareClick(square);
    setDragTestResult(`Square ${square} selected. Valid moves: ${validDropTargets.join(', ') || 'none'}`);
  };

  return (
    <>
      <h2>Document 20 Drag & Drop Test</h2>
      
      {/* Compact status bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        padding: '8px 12px',
        backgroundColor: 'rgba(248, 250, 252, 0.8)',
        borderRadius: '8px',
        fontSize: '13px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <span>Status: {gameState?.isGameOver ? '🏁 Game Over' : '♟️ Active'}</span>
        <span>•</span>
        <span>Turn: {gameState?.activeColor === 'white' ? '⚪ White' : '⚫ Black'}</span>
        {selectedSquare && (
          <>
            <span>•</span>
            <span>Selected: <strong>{selectedSquare}</strong></span>
          </>
        )}
        {validDropTargets.length > 0 && (
          <>
            <span>•</span>
            <span>Valid: {validDropTargets.join(', ')}</span>
          </>
        )}
        {gameError && <span style={{ color: '#ef4444' }}>• Error: {gameError}</span>}
      </div>

      {/* Compact controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleTestDragDrop}
          style={{
            padding: '6px 12px',
            backgroundColor: '#007AFF',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px'
          }}
        >
          🎯 Test Move (e2-e4)
        </button>
        <button 
          onClick={handleResetGame}
          style={{
            padding: '6px 12px',
            backgroundColor: '#FF9500',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px'
          }}
        >
          🔄 Reset
        </button>
        <div style={{ marginLeft: '8px', display: 'flex', gap: '4px' }}>
          {['e2', 'd2', 'e4', 'd4', 'a1', 'h8'].map(square => (
            <button 
              key={square}
              onClick={() => handleTestSquareClick(square)}
              style={{
                padding: '4px 8px',
                backgroundColor: selectedSquare === square ? '#007AFF' : 'rgba(0,0,0,0.1)',
                color: selectedSquare === square ? 'white' : '#333',
                border: 'none',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              {square}
            </button>
          ))}
        </div>
      </div>

      {/* Main test area */}
      <div style={{ 
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>Visual Drag & Drop Test</h3>
        <TestBoard 
          onSquareClick={handleSquareClick}
          selectedSquare={selectedSquare}
          validDropTargets={validDropTargets}
        />
      </div>
      
      {dragTestResult && (
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: dragTestResult.includes('✅') ? '#d4edda' : '#f8d7da',
          borderRadius: '4px'
        }}>
          {dragTestResult}
        </div>
      )}
    </>
  );
};