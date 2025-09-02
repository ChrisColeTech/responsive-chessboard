// SRP: Renders VS Code-style collapsible sidebar with navigation
import React from 'react';
import { SidebarProps } from '@/types/ui/layout.types';
import { Button } from '@/components/ui/Button';
import { ChevronLeft, Lock } from 'lucide-react';

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  isCollapsed,
  onToggleCollapse,
  currentPath,
  onNavigate,
  className = '',
}) => {
  return (
    <aside
      className={`bg-white/95 dark:bg-stone-900/95 backdrop-blur-sm border-r border-stone-200 dark:border-stone-800 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${className}`}
    >
      {/* Collapse toggle */}
      <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800">
        {!isCollapsed && (
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">Chess Examples</span>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = currentPath === item.path;
            const IconComponent = item.icon;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate?.(item.path)}
                  className={`w-full flex items-center px-3 py-2.5 text-left rounded-md transition-all duration-200 group ${
                    isActive
                      ? 'bg-chess-royal text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <IconComponent className="w-4 h-4" />
                  {!isCollapsed && (
                    <>
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                      {item.requiresAuth && (
                        <span className="ml-auto">
                          <Lock className="w-3 h-3 text-muted-foreground group-hover:text-accent-foreground" />
                        </span>
                      )}
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};