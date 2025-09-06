import React from "react";
import { useMinimalSplashActions } from "../../hooks/useMinimalSplashActions";

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  const { progress, status, animationKey } = useMinimalSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-minimal-professional`}>
      {/* Minimal Professional Design - Concept 1 */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Single floating king representing mastery */}
          <div className="splash-king-container">
            <span className="splash-chess-king-professional">♚</span>
          </div>
          
          <h1 className="splash-title splash-professional-title">Chess Training</h1>
          <p className="splash-subtitle splash-professional-subtitle">Tournament Ready</p>
        </div>
      </div>
      
      {/* Precision progress indicator */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-hairline-professional">
          <div 
            className="splash-progress-fill splash-professional-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="splash-status-text splash-professional-status">
          {status}
        </div>
      </div>
    </div>
  );
};
