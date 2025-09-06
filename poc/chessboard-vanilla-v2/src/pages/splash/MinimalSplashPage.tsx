import React from "react";

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-minimal-1a`}>
      {/* VARIANT 1A: Ultra-minimal king focus */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Single floating king - ultimate minimal */}
          <div className="splash-king-minimal">
            <span className="splash-chess-king-1a">♔</span>
          </div>
          
          <h1 className="splash-title splash-minimal-title-1a">Chess Master</h1>
          <p className="splash-subtitle splash-minimal-subtitle-1a">Professional Training</p>
        </div>
      </div>
      
      {/* Ultra-thin progress */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-hairline-1a">
          <div className="splash-progress-fill splash-minimal-fill-1a" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
};
