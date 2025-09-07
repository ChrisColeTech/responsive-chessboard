import React from "react";

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-center-content">
        {/* High-contrast, centered brand element */}
        <div className="text-6xl text-primary animate-card-entrance">
          ♔
        </div>
        
        {/* Clean typography treatment */}
        <h1 className="splash-title animate-card-entrance animation-delay-200">
          Master Chess Training
        </h1>
        
        {/* Minimal supporting text */}
        <p className="splash-subtitle animate-card-entrance animation-delay-500">
          Minimal Splash Concept
        </p>
      </div>
    </div>
  );
};

export default MinimalSplashPage;