import React, { useState } from 'react'
import { Grid3X3, Volume2, RotateCcw, Sword, Target } from 'lucide-react'
import { TestBoard } from '../components/TestBoard'
import { InstructionsModal } from '../components/InstructionsModal'
import { CapturedPieces } from '../components/CapturedPieces'
import { useChessAudio } from '../services/audioService'
import type { ChessPosition, ChessPiece } from '../types'

export const DragTestPage: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<ChessPosition | null>(null)
  const [validDropTargets, setValidDropTargets] = useState<ChessPosition[]>([])
  const [showInstructions, setShowInstructions] = useState(false)
  const [capturedPieces, setCapturedPieces] = useState<ChessPiece[]>([])
  const { playMove, playError } = useChessAudio()

  const instructions = [
    "Test drag and drop functionality with visual feedback, capture mechanics, and sound effects",
    "Drag the bottom-right corner of the dashed container to test responsive scaling", 
    "Use the control buttons below to test different sound effects",
    "Click on squares to select them and see valid drop targets highlighted"
  ]

  const handleSquareClick = (position: ChessPosition) => {
    setSelectedSquare(position)
    // For demo purposes, set some valid targets
    setValidDropTargets(['b1', 'b2'])
  }

  return (
    <div className="relative min-h-full pb-12">
      {/* Enhanced gaming background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full opacity-20 blur-xl animate-pulse gpu-accelerated animation-delay-500"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/20 rounded-full opacity-15 blur-lg animate-pulse gpu-accelerated animation-delay-1000"></div>
        
        {/* Sparkle Effects */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-foreground/60 rounded-full animate-ping animation-delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-foreground/40 rounded-full animate-ping animation-delay-700"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse animation-delay-1200"></div>
      </div>

      <section className="relative z-10 space-y-8">
        {/* Ultra-Compact Header with Instructions */}
        <div className="card-gaming p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-sm">
                <Grid3X3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Interactive Chess Board</h3>
                <span className="text-sm text-muted-foreground">Responsive Test Environment</span>
              </div>
            </div>
            <button 
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
            >
              <Target className="w-4 h-4" />
              <span>Instructions</span>
            </button>
          </div>
        </div>

      {/* Black Captured Pieces - Above Board */}
      <CapturedPieces 
        pieces={capturedPieces.filter(p => p.color === 'black')} 
        className="mb-4" 
      />

      {/* Resizable container for testing - 100% width by default */}
      <div 
        className="border-2 border-dashed border-primary/30 rounded-lg p-4 bg-background/50 mb-8"
        style={{ 
          resize: 'both',
          overflow: 'hidden',
          minWidth: '200px', 
          minHeight: '200px',
          width: '100%', // Start at 100% width
          height: 'clamp(400px, 60vh, 800px)', // Increased default height
          display: 'flex',
          flexDirection: 'column',
          containerType: 'size' // Modern CSS container queries
        }}
      >
        
        {/* TestBoard with clean container query approach */}
        <div style={{
          width: '100%',
          flex: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '0'
        }}>
          <div style={{
            width: 'min(100cqw, 100cqh)', // Use container query units
            height: 'min(100cqw, 100cqh)', // Same size for square
            aspectRatio: '1' // Force square
          }}>
            <TestBoard 
              onSquareClick={handleSquareClick}
              selectedSquare={selectedSquare}
              validDropTargets={validDropTargets}
              onCapturedPiecesChange={setCapturedPieces}
            />
          </div>
        </div>
      </div>

      {/* White Captured Pieces - Below Board */}
      <CapturedPieces 
        pieces={capturedPieces.filter(p => p.color === 'white')} 
        className="mt-4" 
      />
      
      {/* Professional Control Panel - Fully Responsive */}
      <div className="mt-6 card-gaming p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <h4 className="text-sm font-semibold text-foreground/90">Testing Controls</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && (window as any).__testBoardReset) {
              (window as any).__testBoardReset();
            }
          }}
          className="group relative px-4 py-2 rounded-lg font-medium text-sm
                     bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 
                     border border-border/50 text-foreground
                     backdrop-blur-sm
                     hover:from-muted-foreground/30 hover:to-muted-foreground/20 
                     hover:border-primary/30 hover:text-primary
                     active:scale-[0.98] 
                     transition-all duration-200 ease-out
                     gpu-accelerated focus-glow"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </div>
        </button>
        
        <button
          onClick={() => {
            playMove(false);
            console.log('Move sound test');
          }}
          className="group relative px-4 py-2 rounded-lg font-medium text-sm
                     bg-gradient-to-br from-green-500/20 to-green-600/10 
                     border border-green-500/30 text-green-400
                     backdrop-blur-sm
                     hover:from-green-500/30 hover:to-green-600/20 
                     hover:border-green-400/50 hover:text-green-300
                     active:scale-[0.98] 
                     transition-all duration-200 ease-out
                     gpu-accelerated focus-glow"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            <span>Move</span>
          </div>
        </button>
        
        <button
          onClick={() => {
            playMove(true);
            console.log('Capture sound test');
          }}
          className="group relative px-4 py-2 rounded-lg font-medium text-sm
                     bg-gradient-to-br from-red-500/20 to-red-600/10 
                     border border-red-500/30 text-red-400
                     backdrop-blur-sm
                     hover:from-red-500/30 hover:to-red-600/20 
                     hover:border-red-400/50 hover:text-red-300
                     active:scale-[0.98] 
                     transition-all duration-200 ease-out
                     gpu-accelerated focus-glow"
        >
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Capture</span>
          </div>
        </button>
        
        <button
          onClick={() => {
            playError();
            console.log('Error sound test');
          }}
          className="group relative px-4 py-2 rounded-lg font-medium text-sm
                     bg-gradient-to-br from-orange-500/20 to-orange-600/10 
                     border border-orange-500/30 text-orange-400
                     backdrop-blur-sm
                     hover:from-orange-500/30 hover:to-orange-600/20 
                     hover:border-orange-400/50 hover:text-orange-300
                     active:scale-[0.98] 
                     transition-all duration-200 ease-out
                     gpu-accelerated focus-glow"
        >
          <div className="flex items-center gap-2">
            <Sword className="w-4 h-4" />
            <span>Error</span>
          </div>
        </button>
        </div>
      </div>
    </section>

    <InstructionsModal
      isOpen={showInstructions}
      onClose={() => setShowInstructions(false)}
      title="Interactive Chess Board Guide"
      instructions={instructions}
    />
    </div>
  )
}