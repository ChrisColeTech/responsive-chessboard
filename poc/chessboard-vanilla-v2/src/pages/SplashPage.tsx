import React from 'react';

const SplashPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center card-gaming p-12">
        <h1 className="text-6xl font-bold mb-6">Chess Master</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Splash screen placeholder - to be implemented
        </p>
        <div className="text-sm text-muted-foreground">
          This is where a proper splash screen will go
        </div>
      </div>
    </div>
  );
};

export default SplashPage;