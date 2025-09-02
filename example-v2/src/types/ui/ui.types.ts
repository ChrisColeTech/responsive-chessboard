// UI component types
export interface BaseProps {
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export interface ButtonProps extends BaseProps {
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly onClick?: () => void;
  readonly type?: 'button' | 'submit' | 'reset';
}

export interface CardProps extends BaseProps {
  readonly title?: string;
  readonly description?: string;
  readonly header?: React.ReactNode;
  readonly footer?: React.ReactNode;
}

// LayoutProps moved to layout.types.ts for Phase 9.4

export interface LoadingSpinnerProps extends BaseProps {
  readonly size?: 'sm' | 'md' | 'lg';
  readonly message?: string;
}

export interface ResponsiveBreakpoints {
  readonly xs: string;
  readonly sm: string;
  readonly md: string;
  readonly lg: string;
  readonly xl: string;
  readonly '2xl': string;
}