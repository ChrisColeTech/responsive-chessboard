import React from "react";
import { useMinimalSplashActions } from "../../hooks/useMinimalSplashActions";

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  const { status, animationKey, visiblePieces } = useMinimalSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-piece-assembly`}>
      {/* 
        CONCEPT 3: Progressive Piece Assembly - Minimal Variant
        
        DESIGN INTENT: Educational chess piece assembly that teaches proper chess hierarchy.
        Pieces appear in logical sequence showing board setup progress.
        Transforms loading time into learning time about chess fundamentals.
      */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title splash-assembly-title">Chess Training</h1>
          <p className="splash-subtitle splash-assembly-subtitle">Master the Fundamentals</p>
          
          {/* Progressive piece assembly */}
          <div className="splash-piece-lineup">
            {visiblePieces.map((piece, index) => (
              <div 
                key={piece.id}
                className={`splash-chess-piece splash-piece-${piece.id} ${piece.visible ? 'splash-piece-visible' : ''}`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {piece.symbol}
              </div>
            ))}
          </div>
          
        </div>
      </div>
      
      {/* Assembly progress */}
      <div className="splash-progress-section">
        <div className="splash-assembly-status">
          {status}
        </div>
      </div>
    </div>
  );
};
