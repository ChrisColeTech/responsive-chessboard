import React from "react";
import { useMinimalSplashActions } from "../../hooks/useMinimalSplashActions";

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  const { progress, status, animationKey } = useMinimalSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-engine-minimal`}>
      {/* 
        CONCEPT 2: Chess Engine Loading Dashboard - Minimal Variant
        
        DESIGN INTENT: Clean engine initialization display with technical credibility.
        Shows sequential service loading with professional engine core branding.
        Focus on transparency and trust through visible progress.
      */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Engine core icon */}
          <div className="splash-engine-core-icon">
            <span className="splash-chess-engine-symbol">♔</span>
          </div>
          
          <h1 className="splash-title splash-engine-title">Chess Training</h1>
          <p className="splash-subtitle splash-engine-subtitle">Master Your Game</p>
        </div>
      </div>
      
      {/* Engine initialization progress */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-engine-progress">
          <div 
            className="splash-progress-fill splash-engine-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="splash-status-text splash-engine-status">
          {status}
        </div>
      </div>
    </div>
  );
};
