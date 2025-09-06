import React from "react";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-minimal-1d`}>
      {/* VARIANT 1D: Professional tournament style */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Tournament logo with king */}
          <div className="splash-tournament-logo">
            <span className="splash-chess-king-1d">♔</span>
            <div className="splash-tournament-border"></div>
          </div>
          
          <h1 className="splash-title splash-tournament-title-1d">Chess Master</h1>
          <p className="splash-subtitle splash-tournament-subtitle-1d">Professional Tournament Training</p>
          <div className="splash-tournament-credentials">FIDE Certified • GM Instruction</div>
        </div>
      </div>
      
      {/* Professional progress indicator */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-tournament-1d">
          <div className="splash-progress-fill splash-professional-fill-1d" style={{ width: '91%' }}></div>
        </div>
        <p className="splash-status-text splash-tournament-status-1d">Preparing tournament environment...</p>
      </div>
    </div>
  );
};
