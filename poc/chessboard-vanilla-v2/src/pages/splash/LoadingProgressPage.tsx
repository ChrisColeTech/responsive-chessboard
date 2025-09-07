import React from "react";

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

export const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-academy-progress`}>
      {/* 
        CONCEPT 4: Chess Academy Branding - Loading Progress Variant
        
        DESIGN INTENT: Chess Academy with integrated progress as part of crown design.
        Progress ring surrounds the crown, making loading feel institutional and elegant.
        No bottom progress bars - progress is part of the academy's visual identity.
      */}
      
      <div className="splash-brand-section">
        {/* Academy Identity with Integrated Progress */}
        <div className="splash-academy-identity">
          {/* Crown with Progress Ring */}
          <div className="splash-academy-crown splash-crown-with-progress">
            <div className="splash-progress-ring">
              <svg className="splash-progress-circle" viewBox="0 0 120 120">
                <circle 
                  className="splash-progress-track" 
                  cx="60" 
                  cy="60" 
                  r="54" 
                />
                <circle 
                  className="splash-progress-fill-circle" 
                  cx="60" 
                  cy="60" 
                  r="54"
                />
              </svg>
              <span className="splash-crown-symbol">♔</span>
            </div>
          </div>
          
          {/* Academy Title with Loading State */}
          <h1 className="splash-title splash-academy-title">Master Chess Training</h1>
          
          {/* Institution Subtitle */}
          <h2 className="splash-subtitle splash-academy-subtitle">Chess Academy</h2>
          
          {/* Loading Status integrated into credentials */}
          <div className="splash-academy-credentials">
            <span className="splash-credential">Preparing Academy</span>
            <span className="splash-credential-divider">•</span>
            <span className="splash-credential">Premium Training</span>
          </div>
          
          {/* Academy Year */}
          <div className="splash-academy-year">
            <span className="splash-year-text">Est. 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};