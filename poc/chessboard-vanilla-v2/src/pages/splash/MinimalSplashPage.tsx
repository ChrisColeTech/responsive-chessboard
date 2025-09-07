import React from 'react';

interface MinimalSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const MinimalSplashPage: React.FC<MinimalSplashPageProps> = ({ variant = 'in-app' }) => {
  const containerClass = variant === 'modal' 
    ? 'splash-container splash-modal splash-fade-in'
    : 'splash-container splash-in-app splash-fade-in';

  return (
    <div className={containerClass}>
      <div className="splash-center-content">
        <div style={{ fontSize: '48px', marginBottom: '1rem' }}>♔</div>
        <h1 className="splash-title">Master Chess Training</h1>
        <p className="splash-subtitle">
          Learn strategic thinking through chess
        </p>
        <div style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {[0, 1, 2, 3].map((index) => (
            <div 
              key={index}
              style={{
                width: '8px',
                height: '8px',
                background: '#6b7280',
                borderRadius: '1px',
                animation: `skeletonPulse 1.5s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};