import React from "react";

export const LoadingProgressPage: React.FC = () => {
  return (
    <div className="splash-container splash-fade-in splash-progress">
      {/* Header area */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title splash-engine-title">⚡ Chess Engine</h1>
          <p className="splash-subtitle">Loading Progress Dashboard</p>
        </div>
      </div>
      
      {/* Progress dashboard area */}
      <div className="splash-dashboard-section">
        <div className="splash-progress-item">
          <div className="splash-progress-label">
            <span>Opening Database</span>
            <span>87%</span>
          </div>
          <div className="splash-progress-bar splash-thick">
            <div className="splash-progress-fill" style={{ width: '87%' }}></div>
          </div>
        </div>
        
        <div className="splash-progress-item">
          <div className="splash-progress-label">
            <span>Analysis Engine</span>
            <span>94%</span>
          </div>
          <div className="splash-progress-bar splash-thick">
            <div className="splash-progress-fill splash-pulse" style={{ width: '94%' }}></div>
          </div>
        </div>
        
        <div className="splash-progress-item">
          <div className="splash-progress-label">
            <span>Tablebase Files</span>
            <span>73%</span>
          </div>
          <div className="splash-progress-bar splash-thick">
            <div className="splash-progress-fill" style={{ width: '73%' }}></div>
          </div>
        </div>
      </div>
      
      {/* Status area */}
      <div className="splash-status-section">
        <p className="splash-status-text">Initializing chess engine components...</p>
      </div>
    </div>
  );
};}
