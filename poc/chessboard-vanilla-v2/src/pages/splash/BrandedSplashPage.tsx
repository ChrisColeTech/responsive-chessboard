import React from "react";
import { useBrandedSplashActions } from "../../hooks/useBrandedSplashActions";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  const { progress, status, animationKey } = useBrandedSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-branded`}>
      {/* 
        CONCEPT 2: Chess Engine Loading Dashboard - Branded Variant
        
        DESIGN INTENT: Simple branded splash screen with premium chess academy feel.
        Clean typography with gold accent, minimal but elegant.
      */}
      
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Premium branded logo section */}
          <div className="splash-branded-logo">
            <div className="splash-branded-emblem">
              <span className="splash-chess-crown-branded">♔</span>
            </div>
            <div className="splash-branded-nameplate">
              <h1 className="splash-title splash-branded-title">Master Chess Training</h1>
              <div className="splash-branded-tagline">
                <span className="splash-academy-text">Professional Academy</span>
                <div className="splash-branded-divider"></div>
                <span className="splash-founded-text">Est. 2024</span>
              </div>
            </div>
          </div>
          
          {/* Academy credentials */}
          <div className="splash-credentials-line">
            <span className="splash-credential-item">♕ Grandmaster Lessons</span>
            <span className="splash-credential-separator">•</span>
            <span className="splash-credential-item">♖ Tournament Prep</span>
          </div>
        </div>
      </div>

      {/* Premium progress with branding */}
      <div className="splash-progress-section">
        <div className="splash-branded-progress-wrapper">
          <div className="splash-progress-label">
            <span>Preparing Elite Training</span>
            <span className="splash-progress-percentage">{progress}%</span>
          </div>
          <div className="splash-progress-bar splash-branded-progress">
            <div 
              className="splash-progress-fill splash-branded-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="splash-status-text splash-branded-status">{status}</div>
      </div>
    </div>
  );
};
