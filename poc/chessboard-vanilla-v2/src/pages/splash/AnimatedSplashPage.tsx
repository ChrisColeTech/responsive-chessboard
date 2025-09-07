import React from "react";

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-academy-animated`}>
      {/* 
        CONCEPT 4: Chess Academy Branding - Animated Splash Screen
        
        DESIGN INTENT: Sophisticated chess academy splash with animated elements.
        Brief institutional presentation with crown formation and elegant typography reveals.
        Focus on academy authority and prestige through carefully choreographed animations.
      */}
      
      <div className="splash-brand-section">
        {/* Academy Identity with Enhanced Animations */}
        <div className="splash-academy-identity">
          {/* Crown Formation Animation */}
          <div className="splash-academy-crown splash-crown-formation">
            <div className="splash-crown-elements">
              <span className="splash-crown-piece splash-crown-left">♔</span>
              <span className="splash-crown-piece splash-crown-center">♕</span>
              <span className="splash-crown-piece splash-crown-right">♔</span>
            </div>
          </div>
          
          {/* Typography with Writing Animation */}
          <h1 className="splash-title splash-academy-title splash-title-writing">Master Chess Training</h1>
          
          {/* Academy Subtitle with Elegant Reveal */}
          <h2 className="splash-subtitle splash-academy-subtitle splash-subtitle-elegant">Chess Academy</h2>
          
          {/* Credentials with Seal Animation */}
          <div className="splash-academy-credentials splash-credentials-seal">
            <div className="splash-credential-seal">⚜</div>
            <div className="splash-credential-text">
              <span className="splash-credential">Premium Training</span>
              <span className="splash-credential-divider">•</span>
              <span className="splash-credential">Est. 2024</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle Academy Atmosphere */}
      <div className="splash-academy-particles">
        <div className="splash-particle splash-particle-1">◊</div>
        <div className="splash-particle splash-particle-2">⚜</div>
        <div className="splash-particle splash-particle-3">◊</div>
        <div className="splash-particle splash-particle-4">⚜</div>
      </div>
    </div>
  );
};