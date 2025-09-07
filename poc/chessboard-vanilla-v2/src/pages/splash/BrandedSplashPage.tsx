import React from "react";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-academy-branded`}>
      {/* 
        CONCEPT 4: Chess Academy Branding - Branded Variant
        
        DESIGN INTENT: Grand chess academy with sophisticated animations and chess-themed elements.
        Premium institutional presentation with chess piece choreography and elegant branding.
        Maximum visual impact while maintaining splash screen focus.
      */}
      
      <div className="splash-brand-section">
        {/* Academy Identity with Grand Chess Presentation */}
        <div className="splash-academy-identity">
          {/* Grand Chess Academy Emblem */}
          <div className="splash-grand-emblem">
            {/* Chess Piece Formation */}
            <div className="splash-chess-formation">
              <div className="splash-formation-row splash-formation-top">
                <span className="splash-piece-emblem splash-piece-1">♜</span>
                <span className="splash-piece-emblem splash-piece-2">♞</span>
                <span className="splash-piece-emblem splash-piece-3">♝</span>
              </div>
              
              {/* Central Crown */}
              <div className="splash-central-crown">
                <span className="splash-crown-grand">♔</span>
              </div>
              
              <div className="splash-formation-row splash-formation-bottom">
                <span className="splash-piece-emblem splash-piece-4">♗</span>
                <span className="splash-piece-emblem splash-piece-5">♘</span>
                <span className="splash-piece-emblem splash-piece-6">♖</span>
              </div>
            </div>
            
            {/* Floating Queen Accents */}
            <div className="splash-queen-accents">
              <span className="splash-queen-left">♕</span>
              <span className="splash-queen-right">♕</span>
            </div>
          </div>
          
          {/* Grand Academy Title with Typewriter Effect */}
          <h1 className="splash-title splash-academy-title splash-grand-title">Master Chess Training</h1>
          
          {/* Prestigious Institution Subtitle */}
          <h2 className="splash-subtitle splash-academy-subtitle splash-grand-subtitle">Grand Chess Academy</h2>
          
          {/* Academy Philosophy */}
          <div className="splash-academy-philosophy">
            <span className="splash-philosophy-text">Where Masters Are Made</span>
          </div>
          
          {/* Elegant Academy Establishment */}
          <div className="splash-academy-establishment">
            <div className="splash-establishment-line"></div>
            <span className="splash-establishment-text">Established 2024</span>
            <div className="splash-establishment-line"></div>
          </div>
        </div>
      </div>
      
      {/* Chess Piece Particles */}
      <div className="splash-chess-atmosphere">
        <div className="splash-floating-piece splash-float-1">♟</div>
        <div className="splash-floating-piece splash-float-2">♙</div>
        <div className="splash-floating-piece splash-float-3">♟</div>
        <div className="splash-floating-piece splash-float-4">♙</div>
        <div className="splash-floating-piece splash-float-5">♟</div>
        <div className="splash-floating-piece splash-float-6">♙</div>
      </div>
    </div>
  );
};