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
  if (pieces.length === 0) {
    return null
  }

  // Group pieces by color for better organization
  const whitePieces = pieces.filter(p => p.color === 'white')
  const blackPieces = pieces.filter(p => p.color === 'black')

  return (
    <div className={`backdrop-blur-sm bg-card/30 border border-border/30 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <h4 className="text-sm font-semibold text-foreground/90">
          Captured Pieces ({pieces.length})
        </h4>
      </div>
      
      <div className="space-y-3">
        {whitePieces.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-1 font-medium">
              White pieces ({whitePieces.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {whitePieces.map((piece, index) => (
                <div 
                  key={`${piece.id}-${index}`}
                  className="w-8 h-8 bg-muted rounded-lg border border-border/50 flex items-center justify-center text-lg hover:bg-muted/80 transition-colors"
                  title={`${piece.color} ${piece.type}`}
                >
                  {getPieceSymbol(piece)}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {blackPieces.length > 0 && (
          <div>
            <div className="text-xs text-muted-foreground mb-1 font-medium">
              Black pieces ({blackPieces.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {blackPieces.map((piece, index) => (
                <div 
                  key={`${piece.id}-${index}`}
                  className="w-8 h-8 bg-muted rounded-lg border border-border/50 flex items-center justify-center text-lg hover:bg-muted/80 transition-colors"
                  title={`${piece.color} ${piece.type}`}
                >
                  {getPieceSymbol(piece)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}