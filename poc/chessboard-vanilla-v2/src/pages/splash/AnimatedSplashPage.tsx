import React from "react";

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-center-content">
        {/* Animated chess piece entrance */}
        <div className="text-8xl text-accent animate-float">
          ♕
        </div>
        
        {/* Staggered text animation */}
        <h1 className="splash-title animate-card-entrance animation-delay-300">
          Master Chess Training
        </h1>
        
        {/* Supporting text with delay */}
        <p className="splash-subtitle animate-card-entrance animation-delay-700">
          Animated Splash Concept
        </p>
        
        {/* Modern loading dots */}
        <div className="modern-dots dots-animate animate-card-entrance animation-delay-1000">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSplashPage;