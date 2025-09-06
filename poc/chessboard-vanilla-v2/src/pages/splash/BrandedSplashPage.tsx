import React from "react";

export const BrandedSplashPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center card-gaming p-12">
        <h1 className="text-6xl font-bold mb-6">Chess Master</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Branded Splash Screen Design
        </p>
        <div className="text-sm text-muted-foreground">
          Rich branding with logos, colors, and chess-themed elements
        </div>
      </div>
    </div>
  );
};
