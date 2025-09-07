import React, { useEffect, useState } from 'react';

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  useEffect(() => {
    const phases = [
      { delay: 0, phase: 0 },
      { delay: 600, phase: 1 },
      { delay: 1200, phase: 2 },
      { delay: 1800, phase: 3 }
    ];

    phases.forEach(({ delay, phase }) => {
      setTimeout(() => setCurrentPhase(phase), delay);
    });
  }, []);

  return (
    <div className={containerClass}>
      <div className="splash-center-content">
        {/* Animated floating pieces */}
        <div className="floating-pieces-container">
          <div className={`floating-piece piece-1 ${currentPhase >= 1 ? 'animate' : ''}`}>♔</div>
          <div className={`floating-piece piece-2 ${currentPhase >= 1 ? 'animate' : ''}`}>♕</div>
          <div className={`floating-piece piece-3 ${currentPhase >= 1 ? 'animate' : ''}`}>♖</div>
          <div className={`floating-piece piece-4 ${currentPhase >= 1 ? 'animate' : ''}`}>♗</div>
          <div className={`floating-piece piece-5 ${currentPhase >= 1 ? 'animate' : ''}`}>♘</div>
          <div className={`floating-piece piece-6 ${currentPhase >= 1 ? 'animate' : ''}`}>♙</div>
        </div>

        {/* Central logo/icon */}
        <div className={`chess-crown ${currentPhase >= 0 ? 'crown-appear' : ''}`}>
          <div className="crown-glow">♔</div>
        </div>
        
        {/* Typography */}
        <h1 className={`splash-title ${currentPhase >= 2 ? 'title-slide-up' : 'title-hidden'}`}>
          Master Chess Training
        </h1>
        
        <p className={`splash-subtitle ${currentPhase >= 3 ? 'subtitle-fade-in' : 'subtitle-hidden'}`}>
          Strategic thinking starts here
        </p>

        {/* Modern loading dots */}
        <div className={`modern-dots ${currentPhase >= 2 ? 'dots-animate' : ''}`}>
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};