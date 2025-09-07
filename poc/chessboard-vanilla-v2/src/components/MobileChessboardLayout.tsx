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
      className={`w-full h-full ${className}`}
      style={{
        display: 'grid',
        gridTemplateRows: '80px auto 80px',
        paddingTop: '80px',
        boxSizing: 'border-box'
      }}
    >
      {/* Top captured pieces - compact horizontal layout */}
      {topPieces && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            {topPieces}
          </div>
        </div>
      )}
      
      {/* Center chessboard - takes remaining space but maintains aspect ratio */}
      <div 
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          minHeight: '0',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}
      >
        {center}
      </div>
      
      {/* Bottom captured pieces - compact horizontal layout */}
      {bottomPieces && (
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <div style={{ flex: 1, width: '100%', height: '100%' }}>
            {bottomPieces}
          </div>
        </div>
      )}
    </div>
  )
}