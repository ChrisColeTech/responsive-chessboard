// SRP: Renders login navigation button
import React from 'react';
import { LoginButtonProps } from '@/types/auth/auth.types';
import { Button } from '@/components/ui/Button';

export const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  className = '',
  children = 'Login',
}) => {
  return (
    <Button
      variant="primary"
      size="sm"
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};