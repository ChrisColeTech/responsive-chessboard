import React, { useState } from 'react'
import { Grid3X3, RotateCcw, Trash2 } from 'lucide-react'
import { TestBoard } from '../components/TestBoard'
import type { ChessPosition } from '../types'

export const DragTestPage: React.FC = () => {
  const [selectedSquare, setSelectedSquare] = useState<ChessPosition | null>(null)
  const [validDropTargets, setValidDropTargets] = useState<ChessPosition[]>([])

  const handleSquareClick = (position: ChessPosition) => {
    setSelectedSquare(position)
    // For demo purposes, set some valid targets
    setValidDropTargets(['b1', 'b2'])
  }

  return (
    <>
      <section className="space-y-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            <Grid3X3 className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Interactive Board</h3>
        </div>
        <div className="card-gaming p-4">
          <p className="text-muted-foreground mb-4">
            Test drag and drop functionality with visual feedback and capture mechanics.
          </p>
          <TestBoard 
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            validDropTargets={validDropTargets}
          />
        </div>
      </section>
      
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-foreground/10 rounded border border-foreground/30">
            <RotateCcw className="w-4 h-4 text-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Test Controls</h3>
        </div>
        <div className="card-gaming p-4">
          <div className="flex gap-4">
            <button 
              className="btn-gaming-primary gpu-accelerated flex items-center gap-2"
              onClick={() => {
                // Reset functionality from global window reference
                if (typeof window !== 'undefined' && (window as any).__testBoardReset) {
                  (window as any).__testBoardReset();
                }
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Reset Board
            </button>
            <button className="btn-gaming-secondary gpu-accelerated flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Clear Captures
            </button>
          </div>
        </div>
      </section>
    </>
  )
}