import React from "react";

export const AnimatedSplashPage: React.FC = () => {
  return (
    <div className="splash-container splash-fade-in splash-animated">
      {/* Background effect */}
      <div className="splash-background-pattern"></div>
      
      {/* Main content area - full screen */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <div className="splash-piece-assembly">
            <span className="splash-chess-piece" style={{ animationDelay: '0s' }}>♚</span>
            <span className="splash-chess-piece" style={{ animationDelay: '0.2s' }}>♛</span>
            <span className="splash-chess-piece" style={{ animationDelay: '0.4s' }}>♜</span>
          </div>
          <h1 className="splash-title splash-animated-title">Chess Master</h1>
          <p className="splash-subtitle">Progressive Piece Assembly</p>
        </div>
      </div>
      
      {/* Bottom multi-progress area */}
      <div className="splash-progress-section">
        <div className="splash-multi-progress">
          <div className="splash-progress-bar">
            <div className="splash-progress-fill" style={{ width: '80%' }}></div>
          </div>
          <div className="splash-progress-bar">
            <div className="splash-progress-fill splash-pulse" style={{ width: '60%' }}></div>
          </div>
          <div className="splash-progress-bar">
            <div className="splash-progress-fill" style={{ width: '40%' }}></div>
          </div>
        </div>
        <p className="splash-status-text">Assembling chess pieces...</p>
      </div>
    </div>
  );
};
