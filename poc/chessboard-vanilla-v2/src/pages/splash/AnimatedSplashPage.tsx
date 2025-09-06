import React from "react";
import { useAnimatedSplashActions } from "../../hooks/useAnimatedSplashActions";

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  const { pieces, activePieces, currentStatus, progress, animationKey } = useAnimatedSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-assembly-professional`}>
      {/* Progressive Piece Assembly - Concept 1 Variant 2 */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Chess piece assembly area */}
          <div className="splash-piece-assembly-container">
            {pieces.map((pieceData, index) => (
              <div 
                key={index} 
                className={`splash-chess-piece-assembly ${index < activePieces ? 'splash-piece-active' : ''}`}
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {pieceData.piece}
              </div>
            ))}
          </div>
          
          <h1 className="splash-title splash-assembly-title">Chess Training</h1>
          <p className="splash-subtitle splash-assembly-subtitle">Building Excellence</p>
        </div>
      </div>
      
      {/* Assembly progress indicator */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-assembly-progress">
          <div 
            className="splash-progress-fill splash-assembly-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="splash-status-text splash-assembly-status">
          {currentStatus}
        </div>
      </div>
    </div>
  );
};
