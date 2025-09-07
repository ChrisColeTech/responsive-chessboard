import React from 'react';

interface BrandedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const BrandedSplashPage: React.FC<BrandedSplashPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-content">
        <h1 className="splash-title">Branded Splash - Placeholder</h1>
        <p className="splash-subtitle">This is placeholder content for the branded splash variant.</p>
      </div>
    </div>
  );
};