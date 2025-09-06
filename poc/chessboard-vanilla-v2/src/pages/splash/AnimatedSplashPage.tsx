import React from "react";

export const AnimatedSplashPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-content splash-fade-in" style={{ padding: '4rem', backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: '24px', border: '2px solid rgba(99, 102, 241, 0.3)' }}>
        <h1 className="splash-title" style={{ color: 'rgb(99, 102, 241)' }}>♚ Chess Master ♛</h1>
        <p className="splash-subtitle" style={{ fontStyle: 'italic' }}>
          Animated Splash Screen with React Spring
        </p>
        <div className="splash-description">
          Smooth animations and progressive loading indicators
        </div>
        
        {/* Multiple progress bars for animation effect */}
        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div className="splash-progress-bar">
            <div className="splash-progress-fill" style={{ width: '80%', backgroundColor: 'rgb(99, 102, 241)' }}></div>
          </div>
          <div className="splash-progress-bar">
            <div className="splash-progress-fill splash-pulse" style={{ width: '60%', backgroundColor: 'rgb(168, 85, 247)' }}></div>
          </div>
          <div className="splash-progress-bar">
            <div className="splash-progress-fill" style={{ width: '40%', backgroundColor: 'rgb(236, 72, 153)' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
