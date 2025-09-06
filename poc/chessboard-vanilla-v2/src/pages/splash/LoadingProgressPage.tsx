import React from "react";
import { useLoadingProgressActions } from "../../hooks/useLoadingProgressActions";

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

export const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  const { overallProgress, currentStatus } = useLoadingProgressActions();

  return (
    <div className={`splash-container splash-${variant} splash-fade-in splash-engine-dashboard`}>
      {/* 
        VARIANT 1D: Engine Loading Dashboard
        
        DESIGN INTENT: Single progress bar that advances in chunks (0% → 25% → 50% → 75% → 100%) 
        as each service initializes sequentially. NOT multiple progress bars.
        
        Shows:
        - One unified progress indicator representing overall system initialization
        - Current service being initialized (e.g. "Loading Stockfish evaluation engine...")
        - Progress advances when each service completes initialization
      */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Professional chess engine icon */}
          <div className="splash-engine-icon">
            <span className="splash-chess-king-dashboard">♔</span>
          </div>
          
          <h1 className="splash-title splash-dashboard-title">Chess Training</h1>
          <p className="splash-subtitle splash-dashboard-subtitle">Engine Initialization</p>
        </div>
      </div>
      
      {/* Single Progress Bar Dashboard */}
      <div className="splash-engine-dashboard-section">
        {/* Single Progress Bar */}
        <div className="splash-single-progress">
          <div className="splash-single-progress-header">
            <span className="splash-single-progress-label">Loading System Components</span>
            <span className="splash-single-progress-percent">{overallProgress}%</span>
          </div>
          <div className="splash-single-progress-bar">
            <div 
              className="splash-single-progress-fill" 
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Current Service Status */}
        <div className="splash-service-status">
          <p className="splash-service-status-text">{currentStatus}</p>
        </div>
      </div>
    </div>
  );
};
