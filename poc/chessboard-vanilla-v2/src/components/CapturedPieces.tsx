import React from 'react'
import type { ChessPiece } from '../types'

interface CapturedPiecesProps {
  pieces: ChessPiece[]
  className?: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'normal'
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
  className = "",
  position = 'normal'
}) => {
  // Apply position-specific styling and layout
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'absolute -top-12 left-0 right-0 z-20'
      case 'bottom':
        return 'absolute -bottom-16 left-0 right-0 z-20'
      case 'left':
        return 'absolute -left-32 top-0 bottom-0 z-20 w-28'
      case 'right':
        return 'absolute -right-32 top-0 bottom-0 z-20 w-28'
      case 'normal':
      default:
        return ''
    }
  }

  // Get layout orientation based on position
  const getLayoutClasses = () => {
    switch (position) {
      case 'left':
      case 'right':
        return 'flex-col h-full'
      case 'top':
      case 'bottom':
      case 'normal':
      default:
        return ''
    }
  }

  // Get pieces container layout based on position
  const getPiecesContainerClasses = () => {
    switch (position) {
      case 'left':
      case 'right':
        return 'flex-col gap-1 overflow-y-auto flex-1'
      case 'top':
      case 'bottom':
      case 'normal':
      default:
        return 'flex-wrap gap-2'
    }
  }

  return (
    <div 
      className={`card-gaming p-4 ${getPositionClasses()} ${getLayoutClasses()} ${className}`} 
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
      
      <div className={`flex ${getPiecesContainerClasses()}`}>
        {pieces.map((piece, index) => (
          <div 
            key={`${piece.id}-${index}`}
            className={`bg-muted rounded-lg border border-border/50 flex items-center justify-center text-lg hover:bg-muted/80 transition-colors ${
              position === 'left' || position === 'right' ? 'w-8 h-8' : 'w-8 h-8'
            }`}
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