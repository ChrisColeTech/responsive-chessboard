import React from "react";

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-minimal-1b`}>
      {/* VARIANT 1B: Clean typography emphasis */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Typography-focused with subtle king accent */}
          <div className="splash-king-typography">
            <span className="splash-chess-king-1b">♔</span>
          </div>
          
          <h1 className="splash-title splash-typography-title-1b">CHESS MASTER</h1>
          <p className="splash-subtitle splash-typography-subtitle-1b">Tournament Professional</p>
          <div className="splash-typography-tagline-1b">Elite Training • Precision Play</div>
        </div>
      </div>
      
      {/* Clean minimal progress */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-clean-1b">
          <div className="splash-progress-fill splash-typography-fill-1b" style={{ width: '68%' }}></div>
        </div>
      </div>
    </div>
  );
};
