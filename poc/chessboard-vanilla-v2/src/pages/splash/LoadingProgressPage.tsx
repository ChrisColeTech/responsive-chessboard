import React from "react";

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

export const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-minimal-1c`}>
      {/* VARIANT 1C: Subtle progress animation focus */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Minimal king with subtle movement */}
          <div className="splash-king-progress">
            <span className="splash-chess-king-1c">♔</span>
          </div>
          
          <h1 className="splash-title splash-progress-title-1c">Chess Master</h1>
          <p className="splash-subtitle splash-progress-subtitle-1c">Professional Training</p>
        </div>
      </div>
      
      {/* Animated progress with subtle effects */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-animated-1c">
          <div className="splash-progress-fill splash-smooth-animation-1c" style={{ width: '82%' }}>
            <div className="splash-progress-shimmer"></div>
          </div>
        </div>
        <p className="splash-status-text splash-progress-status-1c">Loading chess mastery...</p>
      </div>
    </div>
  );
};
