import React from "react";
import { useLoadingProgressActions } from "../../hooks/useLoadingProgressActions";

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

export const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  const { animationKey, pieceGroups, currentStatus, overallProgress } = useLoadingProgressActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in`}>
      {/* 
        CONCEPT 3: Progressive Piece Assembly - Loading Progress Variant
        
        DESIGN INTENT: Everything contained within centered brand section - NO bottom elements.
        Piece assembly progress shown with single progress bar and piece icons.
        Follows established splash page pattern with all content centered.
      */}
      
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title">Chess Training</h1>
          <p className="splash-subtitle">{currentStatus}</p>
          
          {/* Piece Assembly Preview */}
          <div className="splash-piece-preview">
            {pieceGroups.map((group) => (
              <div 
                key={group.id} 
                className={`splash-piece-icon ${group.completed ? 'splash-piece-complete' : ''}`}
              >
                <span className="splash-piece-symbol">{group.symbol}</span>
              </div>
            ))}
          </div>

          {/* Single Progress Bar */}
          <div className="splash-progress-section">
            <div className="splash-progress-bar">
              <div 
                className="splash-progress-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <p className="splash-progress-text">{overallProgress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
