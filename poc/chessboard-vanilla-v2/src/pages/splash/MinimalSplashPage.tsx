import React from "react";

export const MinimalSplashPage: React.FC = () => {
  return (
    <div className="splash-container splash-fade-in">
      {/* Full-screen minimal splash - no centered boxes */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title">Chess Master</h1>
          <p className="splash-subtitle">Professional Training Platform</p>
        </div>
      </div>
      
      {/* Bottom progress area */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar">
          <div className="splash-progress-fill splash-pulse" style={{ width: '60%' }}></div>
        </div>
        <p className="splash-status-text">Initializing...</p>
      </div>
    </div>
  );
};
