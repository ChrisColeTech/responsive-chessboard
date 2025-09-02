// SRP: Renders content containers with consistent styling
import React from 'react';
import { CardProps } from '@/types/ui/ui.types';

export const Card: React.FC<CardProps> = ({
  title,
  description,
  header,
  footer,
  className = '',
  children,
}) => {
  const baseClasses = 'backdrop-blur-sm bg-white/80 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60 shadow-xl hover:shadow-2xl hover:bg-white/90 dark:hover:bg-stone-800/90 transition-all duration-300 group';
  const classes = `${baseClasses} ${className}`;

  return (
    <div className={classes}>
      {header && (
        <div className="px-6 py-4 border-b border-border">
          {header}
        </div>
      )}
      
      {(title || description) && (
        <div className="px-6 py-4 border-b border-border">
          {title && (
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:text-chess-royal transition-colors mb-1">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="px-6 py-4">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 border-t border-border bg-muted rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};