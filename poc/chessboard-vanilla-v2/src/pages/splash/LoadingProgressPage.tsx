import React from 'react';

interface LoadingProgressPageProps {
  variant?: 'in-app' | 'modal';
}

export const LoadingProgressPage: React.FC<LoadingProgressPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-content">
        <h1 className="splash-title">Loading Progress - Placeholder</h1>
        <p className="splash-subtitle">This is placeholder content for the loading progress splash variant.</p>
      </div>
    </div>
  );
};