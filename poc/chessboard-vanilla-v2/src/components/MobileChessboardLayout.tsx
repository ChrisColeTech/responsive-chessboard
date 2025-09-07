import React from 'react'

interface MobileChessboardLayoutProps {
  children?: React.ReactNode
  topPieces?: React.ReactNode
  center: React.ReactNode
  bottomPieces?: React.ReactNode
  className?: string
}

export const MobileChessboardLayout: React.FC<MobileChessboardLayoutProps> = ({
  topPieces,
  center,
  bottomPieces,
  className = ""
}) => {
  return (
    <div 
      className={`w-full h-full border-2 border-border rounded-lg ${className}`}
      style={{
        display: 'grid',
        gridTemplateRows: '80px 1fr 80px',
        gap: '12px',
        padding: '12px',
        boxSizing: 'border-box'
      }}
    >
      {/* Top captured pieces - compact horizontal layout */}
      {topPieces && (
        <div 
          className="flex items-center justify-center flex-shrink-0 w-full border border-border/50 rounded p-2"
          style={{
            minHeight: '60px',
            maxHeight: '80px'
          }}
        >
          <div className="w-full h-full">
            {topPieces}
          </div>
        </div>
      )}
      
      {/* Center chessboard - takes remaining space but maintains aspect ratio */}
      <div 
        className="flex items-center justify-center border border-border/50 rounded p-2"
        style={{ minHeight: '0' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1',
            maxWidth: '400px',
            maxHeight: '400px',
            minWidth: '240px',
            minHeight: '240px'
          }}
        >
          {center}
        </div>
      </div>
      
      {/* Bottom captured pieces - compact horizontal layout */}
      {bottomPieces && (
        <div 
          className="flex items-center justify-center flex-shrink-0 w-full border border-border/50 rounded p-2"
          style={{
            minHeight: '60px',
            maxHeight: '80px'
          }}
        >
          <div className="w-full h-full">
            {bottomPieces}
          </div>
        </div>
      )}
    </div>
  )
}