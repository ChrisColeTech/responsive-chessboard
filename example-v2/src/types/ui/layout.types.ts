// Layout and navigation types
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly path: string;
  readonly icon: LucideIcon;
  readonly requiresAuth?: boolean;
  readonly children?: NavigationItem[];
}

export interface DemoNavigationProps {
  readonly currentPage: string;
  readonly onPageChange: (pageId: string) => void;
  readonly className?: string;
}

export interface PageLayoutProps {
  readonly title: string;
  readonly description?: string;
  readonly breadcrumbs?: NavigationItem[];
  readonly actions?: React.ReactNode;
  readonly sidebar?: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
}

// Phase 9.4: Layout component types
export interface LayoutProps {
  readonly children: React.ReactNode;
  readonly className?: string;
}

export interface SidebarProps {
  readonly items: NavigationItem[];
  readonly isCollapsed: boolean;
  readonly onToggleCollapse: () => void;
  readonly currentPath: string;
  readonly onNavigate?: (path: string) => void;
  readonly className?: string;
}

export interface HeaderProps {
  readonly title?: string;
  readonly isAuthenticated: boolean;
  readonly user?: { username: string } | null;
  readonly onLogin: () => void;
  readonly onLogout: () => void;
  readonly className?: string;
}

export interface SidebarItemProps {
  readonly item: NavigationItem;
  readonly isActive: boolean;
  readonly isCollapsed: boolean;
  readonly onClick: (path: string) => void;
  readonly className?: string;
}