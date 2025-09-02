// SRP: Renders main page structure with sidebar + header + main content
import React from 'react';
import { LayoutProps } from '@/types/ui/layout.types';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useSidebarState } from '@/hooks/layout/useSidebarState';
import { useAuthGuard } from '@/hooks/layout/useAuthGuard';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Crown, GamepadIcon, Target, Bot } from 'lucide-react';

const navigationItems = [
  { id: 'home', label: 'Home', path: '/', icon: Home, requiresAuth: false },
  { id: 'free-play', label: 'Free Play', path: '/free-play', icon: Crown, requiresAuth: false },
  { id: 'vs-computer', label: 'VS Computer', path: '/vs-computer', icon: Bot, requiresAuth: false },
  { id: 'connected', label: 'Connected Games', path: '/connected', icon: GamepadIcon, requiresAuth: true },
  { id: 'puzzles', label: 'Puzzles', path: '/puzzles', icon: Target, requiresAuth: true },
];

export const Layout: React.FC<LayoutProps> = ({ children, className = '' }) => {
  const { isCollapsed, toggleCollapse } = useSidebarState();
  const { isAuthenticated, user, login, logout } = useAuthGuard();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSidebarNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-stone-200 dark:from-stone-900 dark:via-stone-800 dark:to-stone-700 ${className}`}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-chess-texture opacity-30"></div>
      
      {/* Header */}
      <Header
        title="Responsive Chessboard Examples"
        isAuthenticated={isAuthenticated}
        user={user}
        onLogin={handleLogin}
        onLogout={logout}
        className="fixed top-0 left-0 right-0 z-50"
      />

      {/* Main layout with sidebar */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar
          items={navigationItems}
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
          currentPath={location.pathname}
          onNavigate={handleSidebarNavigation}
          className="fixed left-0 top-16 bottom-0 z-40"
        />

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            isCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};