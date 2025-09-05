import React from 'react'
import type { ChessPiece } from '../types'

interface CapturedPiecesProps {
  pieces: ChessPiece[]
  className?: string
}

const getPieceSymbol = (piece: ChessPiece): string => {
  const symbols = {
    king: { white: '♔', black: '♚' },
    queen: { white: '♕', black: '♛' },
    rook: { white: '♖', black: '♜' },
    bishop: { white: '♗', black: '♝' },
    knight: { white: '♘', black: '♞' },
    pawn: { white: '♙', black: '♟' }
  }
  
  return symbols[piece.type]?.[piece.color] || '?'
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({ 
  pieces, 
  className = "" 
}) => {
  return (
    <div 
      className={`card-gaming p-4 ${className}`} 
      style={{ 
        scrollBehavior: 'auto', 
        scrollMargin: '0px',
        contain: 'layout style paint'
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${pieces.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-muted-foreground/30'}`}></div>
        <h4 className="text-sm font-semibold text-foreground/90">
          Captured Pieces ({pieces.length})
        </h4>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {pieces.map((piece, index) => (
          <div 
            key={`${piece.id}-${index}`}
            className="w-8 h-8 bg-muted rounded-lg border border-border/50 flex items-center justify-center text-lg hover:bg-muted/80 transition-colors"
            title={`${piece.color} ${piece.type}`}
            tabIndex={-1}
          >
            {getPieceSymbol(piece)}
          </div>
        ))}
      </div>
    </div>
  )
}