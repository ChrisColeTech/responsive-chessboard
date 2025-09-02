// SRP: Renders app overview and navigation to demos
import React from 'react';
import { HomePageProps } from '@/types/demo/demo.types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuthGuard } from '@/hooks/layout/useAuthGuard';
import { demoItems } from '@/data/demo-data';
import { Crown } from 'lucide-react';

export const HomePage: React.FC<HomePageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthGuard();

  const demos = demoItems.map(item => ({
    ...item,
    available: item.requiresAuth ? isAuthenticated : true,
  }));

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Hero section */}
      <div className="text-center mb-12">
        <Crown className="w-20 h-20 mx-auto mb-6 text-chess-royal" />
        <h1 className="text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight mb-4">
          Responsive Chessboard Examples
        </h1>
        <p className="text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed">
          Explore interactive demonstrations of the responsive-chessboard library. 
          From simple free play to backend-integrated games and puzzles.
        </p>
      </div>

      {/* Demo cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {demos.map((demo) => (
          <Card
            key={demo.id}
            title={demo.title}
            header={
              <div className="flex items-center space-x-3">
                <demo.icon className="w-6 h-6 text-chess-royal" />
                <span className="text-lg font-semibold">{demo.title}</span>
              </div>
            }
            description={demo.description}
            className="h-full"
          >
            <div className="mt-6">
              {demo.available ? (
                <Button
                  variant="primary"
                  onClick={() => navigate(demo.path)}
                  className="w-full"
                >
                  Try Demo
                </Button>
              ) : (
                <div className="text-center">
                  <Button
                    variant="outline"
                    disabled
                    className="w-full mb-2"
                  >
                    🔒 Authentication Required
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Features */}
      <Card title="Library Features" className="mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Responsive Design</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Automatically adapts to any container size, from mobile phones to large displays.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Customizable Themes</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Multiple piece sets and board themes to match your application's design.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">High Performance</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Smooth animations and optimized rendering for excellent user experience.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">Easy Integration</h4>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Simple API with TypeScript support for seamless integration.
            </p>
          </div>
        </div>
      </Card>

      {/* Phase status */}
      <Card className="bg-stone-100/80 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60">
        <div className="text-center">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Implementation Status - Phase 9.4 Complete
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Layout infrastructure complete. Demo implementations coming in subsequent phases.
          </p>
        </div>
      </Card>
    </div>
  );
};