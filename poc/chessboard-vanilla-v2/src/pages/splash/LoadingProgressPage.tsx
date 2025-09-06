import React from "react";

export const LoadingProgressPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-content splash-fade-in" style={{ maxWidth: '500px', padding: '3rem', background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))', border: '2px solid rgba(34, 197, 94, 0.4)', borderRadius: '16px' }}>
        <h1 className="splash-title" style={{ color: 'rgb(34, 197, 94)', fontSize: '3rem', marginBottom: '1rem' }}>⚡ Chess Engine</h1>
        <p className="splash-subtitle" style={{ fontWeight: '600', color: 'rgb(59, 130, 246)' }}>
          Loading Progress Dashboard
        </p>
        <div className="splash-description" style={{ marginBottom: '2rem' }}>
          Initializing chess engine components...
        </div>
        
        {/* Progress sections with labels */}
        <div style={{ textAlign: 'left', marginTop: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgb(34, 197, 94)', fontWeight: '500' }}>
              <span>Opening Database</span>
              <span>87%</span>
            </div>
            <div className="splash-progress-bar" style={{ height: '6px' }}>
              <div className="splash-progress-fill" style={{ width: '87%', backgroundColor: 'rgb(34, 197, 94)' }}></div>
            </div>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgb(59, 130, 246)', fontWeight: '500' }}>
              <span>Analysis Engine</span>
              <span>94%</span>
            </div>
            <div className="splash-progress-bar" style={{ height: '6px' }}>
              <div className="splash-progress-fill splash-pulse" style={{ width: '94%', backgroundColor: 'rgb(59, 130, 246)' }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'rgb(168, 85, 247)', fontWeight: '500' }}>
              <span>Tablebase Files</span>
              <span>73%</span>
            </div>
            <div className="splash-progress-bar" style={{ height: '6px' }}>
              <div className="splash-progress-fill" style={{ width: '73%', backgroundColor: 'rgb(168, 85, 247)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
