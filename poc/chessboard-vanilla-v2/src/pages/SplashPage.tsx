import React from 'react';
import { useAppStore } from '../stores/appStore';
import { MinimalSplashPageWrapper } from '../components/MinimalSplashPageWrapper';
import { AnimatedSplashPageWrapper } from '../components/AnimatedSplashPageWrapper';
import { LoadingProgressPageWrapper } from '../components/LoadingProgressPageWrapper';
import { BrandedSplashPageWrapper } from '../components/BrandedSplashPageWrapper';

const SplashPage: React.FC = () => {
  const currentChildPage = useAppStore((state) => state.currentChildPage);

  let CurrentPageComponent = SplashMainPage;
  
  if (currentChildPage === 'minimalsplash') {
    CurrentPageComponent = MinimalSplashPageWrapper;
  } else if (currentChildPage === 'animatedsplash') {
    CurrentPageComponent = AnimatedSplashPageWrapper;
  } else if (currentChildPage === 'loadingprogress') {
    CurrentPageComponent = LoadingProgressPageWrapper;
  } else if (currentChildPage === 'brandedsplash') {
    CurrentPageComponent = BrandedSplashPageWrapper;
  }

  return (
    <div className="relative h-full">
      <CurrentPageComponent />
    </div>
  );
};

const SplashMainPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center card-gaming p-12">
        <h1 className="text-6xl font-bold mb-6">Chess Master</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Splash Screen Examples Hub
        </p>
        <div className="text-sm text-muted-foreground">
          Use the action sheet to navigate to different splash screen examples
        </div>
      </div>
    </div>
  );
};

export default SplashPage;