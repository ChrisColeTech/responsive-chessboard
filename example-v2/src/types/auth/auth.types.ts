// Authentication domain types
export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface User {
  readonly id: string;
  readonly email: string;
  readonly username?: string;
  readonly rating: number;
  readonly createdAt: string;
  readonly preferences?: UserPreferences;
}

export interface UserPreferences {
  readonly theme?: string;
  readonly pieceSet?: string;
  readonly boardTheme?: string;
  readonly soundEnabled?: boolean;
  readonly animationsEnabled?: boolean;
}

export interface AuthResult {
  readonly success: boolean;
  readonly token: string;
  readonly refreshToken: string;
  readonly user: User;
}

export interface AuthState {
  readonly isAuthenticated: boolean;
  readonly user: User | null;
  readonly token: string | null;
  readonly isLoading: boolean;
}

export interface AuthenticationHook {
  readonly authState: AuthState;
  readonly login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  readonly logout: () => void;
  readonly refreshToken: () => Promise<boolean>;
}

// Phase 9.4: Authentication UI component types
export interface LoginFormProps {
  readonly onSubmit: (credentials: LoginCredentials) => void;
  readonly isLoading?: boolean;
  readonly error?: string;
  readonly className?: string;
}

export interface LoginButtonProps {
  readonly onClick: () => void;
  readonly className?: string;
  readonly children?: React.ReactNode;
}

export interface UserMenuProps {
  readonly user: User;
  readonly onLogout: () => void;
  readonly onProfile?: () => void;
  readonly className?: string;
}

export interface AuthGuardProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly redirectTo?: string;
}