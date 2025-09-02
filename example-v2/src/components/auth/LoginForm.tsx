// SRP: Renders login form with React Hook Form + Zod validation
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormProps, LoginCredentials } from '@/types/auth/auth.types';
import { Button } from '@/components/ui/Button';

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
  className = '',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'chessdemo@example.com',
      password: 'ChessDemo2024',
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const onFormSubmit = (data: LoginCredentials) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className={`space-y-6 ${className}`}>
      {error && (
        <div className="p-4 bg-chess-crimson/10 border border-chess-crimson/20 rounded-md">
          <p className="text-sm text-chess-crimson">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-chess-royal/50 focus:border-chess-royal transition-colors ${
            errors.email 
              ? 'border-chess-crimson dark:border-chess-crimson' 
              : 'border-stone-300 dark:border-stone-600'
          }`}
          placeholder="Enter your email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-chess-crimson">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
          Password
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-chess-royal/50 focus:border-chess-royal transition-colors ${
            errors.password 
              ? 'border-chess-crimson dark:border-chess-crimson' 
              : 'border-stone-300 dark:border-stone-600'
          }`}
          placeholder="Enter your password"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-chess-crimson">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        loading={isLoading}
        disabled={isLoading || !isValid}
        className="w-full"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <p className="text-sm text-stone-600 dark:text-stone-400">
          Demo credentials: <strong>chessdemo@example.com</strong> / <strong>ChessDemo2024</strong>
        </p>
      </div>
    </form>
  );
};