import React from "react";

export const MinimalSplashPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-content splash-test-border splash-fade-in">
        <h1 className="splash-title">Chess Master</h1>
        <p className="splash-subtitle">
          Minimal Splash Screen Design
        </p>
        <div className="splash-description">
          Clean, simple design with just the essentials
        </div>
        
        {/* Test progress bar */}
        <div className="splash-progress-bar">
          <div className="splash-progress-fill splash-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
};
