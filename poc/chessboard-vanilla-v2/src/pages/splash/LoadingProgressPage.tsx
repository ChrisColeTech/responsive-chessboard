import React from "react";

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-center-content">
        {/* Brand symbol */}
        <div className="text-7xl text-secondary animate-card-entrance">
          ♖
        </div>
        
        {/* App title */}
        <h1 className="splash-title animate-card-entrance animation-delay-200">
          Master Chess Training
        </h1>
        
        {/* Progress description */}
        <p className="splash-subtitle animate-card-entrance animation-delay-500">
          Loading Progress Concept
        </p>
        
        {/* Simple progress bar using theme classes */}
        <div className="w-full max-w-xs animate-card-entrance animation-delay-700">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full animate-pulse"
              style={{ width: '60%' }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">Initializing...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingProgressPage;