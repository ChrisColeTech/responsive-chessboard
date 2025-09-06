import React from "react";
import { useBrandedSplashActions } from "../../hooks/useBrandedSplashActions";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  const { progress, status, animationKey } = useBrandedSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-professional-branding`}>
      {/* 
        VARIANT 1E: Professional Branding - Premium Chess Academy
        
        DESIGN INTENT: Create prestigious chess academy entrance feeling.
        Premium gold/bronze accents, elegant typography, authority indicators.
        Makes users feel they're accessing elite-level chess training.
      */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Premium academy emblem */}
          <div className="splash-academy-emblem">
            <span className="splash-chess-crown-premium">♔</span>
            <div className="splash-premium-ring"></div>
          </div>
          
          <h1 className="splash-title splash-academy-title">Master Chess Training</h1>
          <p className="splash-subtitle splash-academy-subtitle">Elite Chess Academy</p>
          <div className="splash-credentials">
            <span className="splash-credential">FIDE Certified</span>
            <span className="splash-credential-separator">•</span>
            <span className="splash-credential">Grandmaster Instruction</span>
            <span className="splash-credential-separator">•</span>
            <span className="splash-credential">Tournament Preparation</span>
          </div>
        </div>
      </div>
      
      {/* Premium progress indicator */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-premium-progress">
          <div className="splash-progress-fill splash-premium-fill" style={{ width: `${progress}%` }}>
            <div className="splash-premium-shimmer"></div>
          </div>
        </div>
        <p className="splash-status-text splash-academy-status">{status}</p>
      </div>
    </div>
  );
};
