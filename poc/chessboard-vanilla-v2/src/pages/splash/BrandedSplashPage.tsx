import React from "react";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-branded`}>
      {/* Background decorative elements */}
      <div className="splash-brand-decoration splash-top-right">♔</div>
      <div className="splash-brand-decoration splash-bottom-left">♕</div>
      <div className="splash-brand-decoration splash-center-bg">♚</div>
      
      {/* Main brand area */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title splash-luxury-title">
            👑 MASTER CHESS ACADEMY 👑
          </h1>
          <p className="splash-subtitle splash-luxury-subtitle">
            Premium Training Platform
          </p>
          <div className="splash-quote">
            "Excellence in chess begins with the first move" - GM Magnus Carlsen
          </div>
        </div>
      </div>
      
      {/* Progress area */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-luxury">
          <div className="splash-progress-fill splash-pulse splash-luxury-fill" style={{ width: '85%' }}></div>
        </div>
        <p className="splash-status-text splash-luxury-status">
          Preparing your chess mastery journey...
        </p>
      </div>
    </div>
  );
};
