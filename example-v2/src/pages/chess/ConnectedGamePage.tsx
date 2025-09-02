// SRP: Renders connected games placeholder page with auth protection
import React from 'react';
import { ConnectedGamePageProps } from '@/types/demo/demo.types';
import { Card } from '@/components/ui/Card';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { GamepadIcon, Construction, CheckCircle } from 'lucide-react';

const ConnectedGameContent: React.FC<ConnectedGamePageProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <GamepadIcon className="w-16 h-16 mx-auto mb-4 text-chess-royal" />
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-2">
          Connected Games
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Backend-integrated chess games with AI opponents
        </p>
      </div>

      {/* Coming soon placeholder */}
      <Card className="text-center py-12 mb-8">
        <Construction className="w-20 h-20 mx-auto mb-6 text-chess-amber" />
        <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Coming in Phase 9.7
        </h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6 max-w-2xl mx-auto leading-relaxed">
          Connected Games will feature backend-integrated chess matches against AI opponents 
          with different difficulty levels, game persistence, and move history.
        </p>
        
        <div className="bg-chess-sage/10 border border-chess-sage/20 rounded-lg p-4 max-w-md mx-auto">
          <h3 className="font-semibold text-chess-sage mb-2">Planned Features:</h3>
          <ul className="text-sm text-stone-700 dark:text-stone-300 space-y-1">
            <li>• AI opponents (difficulty 1-5)</li>
            <li>• Real-time move synchronization</li>
            <li>• Game state persistence</li>
            <li>• Move history and replay</li>
            <li>• Game statistics tracking</li>
          </ul>
        </div>
      </Card>

      {/* Authentication success */}
      <Card className="bg-chess-sage/10 border-chess-sage/20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-chess-sage" />
            <h3 className="font-semibold text-chess-sage">Authentication Verified</h3>
          </div>
          <p className="text-sm text-stone-700 dark:text-stone-300">
            You are successfully authenticated and can access this protected feature 
            once it's implemented in Phase 9.7.
          </p>
        </div>
      </Card>
    </div>
  );
};

export const ConnectedGamePage: React.FC<ConnectedGamePageProps> = (props) => {
  return (
    <AuthGuard>
      <ConnectedGameContent {...props} />
    </AuthGuard>
  );
};