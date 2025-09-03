// WorkerTestPage.tsx - Stockfish Web Worker testing page
import React, { useState } from 'react';
import { useStockfish } from '../hooks/useStockfish';
import { STARTING_FEN } from '../constants/chess.constants';

export const WorkerTestPage: React.FC = () => {
  const { isReady, isThinking, error, requestMove, setSkillLevel, skillLevel } = useStockfish();
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestWorker = async () => {
    console.log('🧪 [TEST] Starting Stockfish worker test...');
    setTestResult('Testing...');
    
    try {
      const startingFen = STARTING_FEN;
      console.log('🧪 [TEST] Requesting move for starting position:', startingFen);
      
      const move = await requestMove(startingFen, 1000);
      
      if (move) {
        setTestResult(`✅ Success! Computer suggests: ${move}`);
        console.log('🎉 [TEST] Worker test successful!', move);
      } else {
        setTestResult('❌ Failed: No move returned');
        console.error('💥 [TEST] Worker test failed - no move');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setTestResult(`❌ Error: ${errorMsg}`);
      console.error('💥 [TEST] Worker test error:', err);
    }
  };

  const handleSkillChange = (level: number) => {
    setSkillLevel(level);
  };

  return (
    <>
      <h2>Stockfish Engine Test</h2>
      
      <section>
        <h3>Engine Status</h3>
        <p>Ready: {isReady ? '✅ Yes' : '❌ No'}</p>
        <p>Thinking: {isThinking ? '🧠 Yes' : '💤 No'}</p>
        <p>Skill Level: {skillLevel}</p>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </section>

      <section>
        <h3>Skill Level</h3>
        {[1, 5, 10, 15, 20].map(level => (
          <button 
            key={level}
            onClick={() => handleSkillChange(level)}
            disabled={!isReady || isThinking}
          >
            Level {level}
          </button>
        ))}
      </section>

      <section>
        <h3>Test Engine</h3>
        <button 
          onClick={handleTestWorker} 
          disabled={!isReady || isThinking}
        >
          {isThinking ? '🧠 Thinking...' : '🧪 Test Engine'}
        </button>
        
        {testResult && (
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
            borderRadius: '4px'
          }}>
            {testResult}
          </div>
        )}
      </section>
    </>
  );
};