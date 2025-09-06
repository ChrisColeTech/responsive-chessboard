import React from "react";

export const BrandedSplashPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-content splash-fade-in" style={{ 
        padding: '4rem', 
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.1))', 
        border: '3px solid rgba(245, 158, 11, 0.5)', 
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{ 
          position: 'absolute', 
          top: '1rem', 
          right: '1rem', 
          fontSize: '2rem', 
          opacity: 0.3,
          color: 'rgb(245, 158, 11)'
        }}>♔</div>
        <div style={{ 
          position: 'absolute', 
          bottom: '1rem', 
          left: '1rem', 
          fontSize: '2rem', 
          opacity: 0.3,
          color: 'rgb(245, 158, 11)'
        }}>♕</div>

        <h1 className="splash-title" style={{ 
          background: 'linear-gradient(135deg, rgb(245, 158, 11), rgb(217, 119, 6))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '4rem',
          fontWeight: '900',
          letterSpacing: '0.05em',
          textShadow: '0 4px 8px rgba(245, 158, 11, 0.3)'
        }}>
          👑 MASTER CHESS ACADEMY 👑
        </h1>
        
        <p className="splash-subtitle" style={{ 
          color: 'rgb(217, 119, 6)', 
          fontWeight: '700',
          fontSize: '1.5rem',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Premium Training Platform
        </p>
        
        <div className="splash-description" style={{ 
          color: 'rgb(120, 53, 15)',
          fontSize: '1rem',
          fontWeight: '500',
          marginBottom: '2rem'
        }}>
          "Excellence in chess begins with the first move" - GM Magnus Carlsen
        </div>
        
        {/* Elegant single progress bar */}
        <div style={{ marginTop: '2rem' }}>
          <div className="splash-progress-bar" style={{ 
            height: '8px', 
            background: 'rgba(245, 158, 11, 0.2)',
            borderRadius: '4px'
          }}>
            <div className="splash-progress-fill splash-pulse" style={{ 
              width: '85%', 
              background: 'linear-gradient(90deg, rgb(245, 158, 11), rgb(217, 119, 6))',
              borderRadius: '4px',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.5)'
            }}></div>
          </div>
          <div style={{ 
            marginTop: '0.5rem', 
            fontSize: '0.875rem', 
            color: 'rgb(217, 119, 6)', 
            fontWeight: '600',
            textAlign: 'center'
          }}>
            Preparing your chess mastery journey...
          </div>
        </div>
      </div>
    </div>
  );
};
