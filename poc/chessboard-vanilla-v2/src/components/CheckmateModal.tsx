import React from 'react';
import { Crown, RotateCcw } from 'lucide-react';

interface CheckmateModalProps {
  isOpen: boolean;
  winner: 'white' | 'black';
  onReset: () => void;
}

export function CheckmateModal({ isOpen, winner, onReset }: CheckmateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-background border border-border rounded-xl p-8 shadow-2xl max-w-sm w-full mx-4">
        <div className="text-center space-y-6">
          {/* Winner Crown */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <Crown className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Checkmate!</h2>
            <p className="text-lg text-muted-foreground capitalize">
              {winner} wins the game
            </p>
          </div>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}