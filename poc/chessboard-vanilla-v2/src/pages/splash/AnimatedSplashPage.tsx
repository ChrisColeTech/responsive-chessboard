import React from "react";
import { useAnimatedSplashActions } from "../../hooks/useAnimatedSplashActions";

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  const { animationKey, orbitingPieces } = useAnimatedSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-orbit-assembly`}>
      {/* 
        CONCEPT 3: Progressive Piece Assembly - Animated Variant
        
        DESIGN INTENT: Orbital piece assembly with rotating chess pieces around a central crown.
        Pieces orbit in and settle into formation with unique radial positioning.
        Creates mesmerizing circular motion that's completely different from other variants.
      */}
      
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title splash-orbit-title">Chess Training</h1>
          
          {/* Orbital assembly animation */}
          <div className="splash-orbit-container">
            {/* Central crown that pieces orbit around */}
            <div className="splash-central-crown">
              <span className="splash-crown-piece">♔</span>
            </div>
            
            {/* Orbiting pieces */}
            <div className="splash-orbit-pieces">
              {orbitingPieces.map((piece) => (
                <div 
                  key={piece.id}
                  className={`splash-orbit-piece ${piece.visible ? 'splash-orbit-active' : ''}`}
                  style={{ 
                    '--orbit-angle': `${piece.angle}deg`,
                    '--piece-delay': `${piece.delay}ms`,
                    '--settle-delay': `${piece.settleDelay}ms`
                  } as React.CSSProperties}
                >
                  <span className="splash-rotating-symbol">{piece.symbol}</span>
                </div>
              ))}
            </div>
            
            {/* Formation indicator */}
            <div className="splash-formation-ring"></div>
          </div>
          
          <p className="splash-subtitle splash-orbit-subtitle">Master Advanced Strategies</p>
        </div>
      </div>
    </div>
  );
};
