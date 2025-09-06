import React from "react";
import { useLoadingProgressActions } from "../../hooks/useLoadingProgressActions";

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

export const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  const { overallProgress, currentStatus, animationKey } = useLoadingProgressActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-training-dashboard`}>
      {/* 
        CONCEPT 2: Chess Engine Loading Dashboard - Loading Progress Variant
        
        DESIGN INTENT: Multiple progress bars showing detailed preparation of chess training components.
        Each component (lessons, puzzles, analysis, practice) has individual progress tracking.
        Professional dashboard shows users exactly what's being prepared for their training.
      */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title splash-training-dashboard-title">Chess Training</h1>
          <p className="splash-subtitle splash-training-dashboard-subtitle">Preparing Your Lessons</p>
        </div>
      </div>
      
      {/* Single Progress Bar Dashboard */}
      <div className="splash-training-dashboard-section">
        {/* Single Progress Bar */}
        <div className="splash-single-progress">
          <div className="splash-single-progress-header">
            <span className="splash-single-progress-label">Loading Training Components</span>
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
