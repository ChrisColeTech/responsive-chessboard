// SRP: Renders dedicated login page with form
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoginCredentials } from '@/types/auth/auth.types';
import { LoginPageProps } from '@/types/demo/demo.types';
import { Card } from '@/components/ui/Card';
import { LoginForm } from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/Button';
import { useLogin } from '@/hooks/mutations';
import { Crown } from 'lucide-react';

export const LoginPage: React.FC<LoginPageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '/';
  const loginMutation = useLogin();
  const [error, setError] = useState<string>('');

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setError('');
      await loginMutation.mutateAsync(credentials);
      // Navigate back to the page they came from
      navigate(returnTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Crown className="w-16 h-16 mx-auto mb-4 text-chess-royal" />
          <h2 className="text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Access connected games and chess puzzles
          </p>
        </div>

        {/* Login form */}
        <Card>
          <LoginForm
            onSubmit={handleLogin}
            isLoading={loginMutation.isPending}
            error={error}
          />
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Button
            variant="ghost"
            onClick={handleBackHome}
          >
            ← Back to Home
          </Button>
        </div>

        {/* Phase 9.4 notice */}
        <Card className="mt-6 bg-stone-100/80 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60">
          <div className="text-center">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Phase 9.4 - Layout Infrastructure
            </h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Authentication functionality will be implemented in Phase 9.5. 
              This is a placeholder login page showing the UI structure.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};