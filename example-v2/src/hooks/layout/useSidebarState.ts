// SRP: Manages sidebar collapse/expand state only
import { useState, useCallback } from 'react';

interface UseSidebarStateReturn {
  readonly isCollapsed: boolean;
  readonly toggleCollapse: () => void;
  readonly setCollapsed: (collapsed: boolean) => void;
}

export const useSidebarState = (initialCollapsed = false): UseSidebarStateReturn => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(initialCollapsed);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  const setCollapsed = useCallback((collapsed: boolean) => {
    setIsCollapsed(collapsed);
  }, []);

  return {
    isCollapsed,
    toggleCollapse,
    setCollapsed,
  };
};