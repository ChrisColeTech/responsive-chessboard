import React from "react";

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-center-content">
        {/* Premium brand treatment */}
        <div className="space-y-4">
          <div className="text-8xl text-accent crown-glow animate-card-entrance">
            ♔
          </div>
          <div className="h-px w-24 bg-accent mx-auto animate-card-entrance animation-delay-200"></div>
        </div>
        
        {/* Premium typography */}
        <div className="space-y-4 animate-card-entrance animation-delay-500">
          <h1 className="splash-title tracking-wide">
            Master Chess Training
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Excellence in Chess Education
          </p>
        </div>
        
        {/* Branded tagline */}
        <p className="splash-subtitle animate-card-entrance animation-delay-800">
          Premium Branded Concept
        </p>
        
        {/* Subtle brand indicator */}
        <div className="flex justify-center animate-card-entrance animation-delay-1000">
          <div className="w-12 h-1 bg-accent rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default BrandedSplashPage;