import React from "react";
import { useAnimatedSplashActions } from "../../hooks/useAnimatedSplashActions";

interface AnimatedSplashPageProps {
  variant?: 'in-app' | 'modal';
}

export const AnimatedSplashPage: React.FC<AnimatedSplashPageProps> = ({ variant = 'in-app' }) => {
  const { engineComponents, activeComponents, currentStatus, progress, animationKey } = useAnimatedSplashActions();

  return (
    <div key={animationKey} className={`splash-container splash-${variant} splash-fade-in splash-engine-animated`}>
      {/* 
        CONCEPT 2: Chess Engine Loading Dashboard - Animated Variant
        
        DESIGN INTENT: Engine components materialize sequentially with physics-based animations.
        Shows visual assembly of engine system - core, database, tablebase, analysis tools.
        Creates engaging technical process that builds anticipation for engine capabilities.
      */}
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          {/* Engine component assembly area */}
          <div className="splash-engine-components-container">
            {engineComponents.map((component, index) => (
              <div 
                key={component.id} 
                className={`splash-engine-component ${index < activeComponents ? 'splash-component-active' : ''}`}
                style={{ animationDelay: `${index * 0.4}s` }}
              >
                <div className="splash-component-icon">{component.icon}</div>
                <div className="splash-component-label">{component.label}</div>
              </div>
            ))}
          </div>
          
          <h1 className="splash-title splash-engine-animated-title">Chess Training</h1>
          <p className="splash-subtitle splash-engine-animated-subtitle">Preparing Your Game</p>
        </div>
      </div>
      
      {/* Engine assembly progress */}
      <div className="splash-progress-section">
        <div className="splash-progress-bar splash-engine-animated-progress">
          <div 
            className="splash-progress-fill splash-engine-animated-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="splash-status-text splash-engine-animated-status">
          {currentStatus}
        </div>
      </div>
    </div>
  );
};
