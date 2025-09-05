// /src/pages/PlayPage.tsx - SIMPLE PLACEHOLDER FOR PHASE 3
import React, { useEffect } from 'react';
import { useInstructions } from '../contexts/InstructionsContext';

export const PlayPage: React.FC = () => {
  const { setInstructions } = useInstructions();

  useEffect(() => {
    setInstructions("Play Chess vs Computer - Coming Soon", [
      "This page will feature human vs computer chess gameplay",
      "Computer opponent with 10 difficulty levels (1-10)",
      "Full drag & drop chessboard interface",
      "Audio feedback and professional game controls",
      "Currently under development..."
    ]);
  }, [setInstructions]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="card-gaming p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Play vs Computer</h1>
        <p className="text-muted-foreground mb-6">
          Professional chess gameplay with AI opponent coming soon!
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>🎯 10 difficulty levels</p>
          <p>🎵 Audio feedback</p>
          <p>🎮 Drag & drop interface</p>
          <p>🤖 Stockfish AI engine</p>
        </div>
      </div>
    </div>
  );
};