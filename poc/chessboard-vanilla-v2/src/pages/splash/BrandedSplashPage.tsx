import React from "react";
import { useBrandedSplashActions } from "../../hooks/useBrandedSplashActions";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  const { animationKey, pieceGroups, currentQuote, overallProgress } = useBrandedSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-academy`}>
      {/* 
        CONCEPT 3: Progressive Piece Assembly - Branded Academy Variant
        
        DESIGN INTENT: Luxury chess academy experience with prestigious branding.
        Medallion piece assembly showing institutional authority and grandmaster quality.
        All content contained within centered brand section.
      */}
      
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Academy Header */}
          <h1 className="splash-title splash-academy-title">Master Chess Training</h1>
          <h2 className="splash-subtitle splash-academy-subtitle">Elite Academy</h2>
          
          {/* Premium Medallion Pieces */}
          <div className="splash-medallion-gallery">
            {pieceGroups.map((piece) => (
              <div 
                key={piece.id}
                className={`splash-medallion ${piece.completed ? 'splash-medallion-complete' : ''}`}
              >
                <div className="splash-medallion-inner">
                  <span className="splash-medallion-piece">{piece.symbol}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Academy Credentials */}
          <div className="splash-academy-credentials">
            <span className="splash-credential">FIDE Approved Training</span>
            <span className="splash-credential-divider">•</span>
            <span className="splash-credential">GM Level Instruction</span>
          </div>

          {/* Rotating Inspirational Quote */}
          <div className="splash-academy-quote">
            <p className="splash-quote-text">"{currentQuote}"</p>
          </div>

          {/* Elegant Progress Line */}
          <div className="splash-progress-section">
            <div className="splash-academy-progress-bar">
              <div 
                className="splash-academy-progress-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
