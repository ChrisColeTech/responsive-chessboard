import React from "react";

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-academy-minimal`}>
      {/* 
        CONCEPT 4: Chess Academy Branding - Minimal Variant
        
        DESIGN INTENT: Sophisticated chess academy presenting institutional authority.
        Clean, professional approach establishing credibility and inspiring confidence.
        Minimal elements with maximum impact - premium educational experience.
      */}
      
      <div className="splash-brand-section">
        {/* Academy Identity */}
        <div className="splash-academy-identity">
          {/* Crown Symbol */}
          <div className="splash-academy-crown">
            <span className="splash-crown-symbol">♔</span>
          </div>
          
          {/* Main Title */}
          <h1 className="splash-title splash-academy-title">Master Chess Training</h1>
          
          {/* Institution Subtitle */}
          <h2 className="splash-subtitle splash-academy-subtitle">Chess Academy</h2>
          
          {/* Credentials */}
          <div className="splash-academy-credentials">
            <span className="splash-credential">Premium Training</span>
            <span className="splash-credential-divider">•</span>
            <span className="splash-credential">Est. 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};
