// SRP: Renders top header UI with auth controls and theme toggle
import React from 'react';
import { HeaderProps } from '@/types/ui/layout.types';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/providers';
import { Sun, Moon, Crown } from 'lucide-react';

export const Header: React.FC<HeaderProps> = ({
  title = 'Responsive Chessboard Examples',
  isAuthenticated,
  user,
  onLogin,
  onLogout,
  className = '',
}) => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className={`bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800 shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Title */}
        <div className="flex items-center space-x-4">
          <Crown className="w-6 h-6 text-chess-royal" />
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            {title}
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          
          {/* Auth controls */}
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-stone-600 dark:text-stone-400">
                @{user.username || 'demo'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={onLogin}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};