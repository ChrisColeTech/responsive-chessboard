import React from "react";
import { useAppStore } from "../../stores/appStore";
import { MinimalSplashPageWrapper } from "../../components/MinimalSplashPageWrapper";
import { AnimatedSplashPageWrapper } from "../../components/AnimatedSplashPageWrapper";
import { LoadingProgressPageWrapper } from "../../components/LoadingProgressPageWrapper";
import { BrandedSplashPageWrapper } from "../../components/BrandedSplashPageWrapper";

export const SplashPage: React.FC = () => {
  const currentChildPage = useAppStore((state) => state.currentChildPage);

  let CurrentPageComponent = SplashMainPage;

  if (currentChildPage === "minimalsplash") {
    CurrentPageComponent = MinimalSplashPageWrapper;
  } else if (currentChildPage === "animatedsplash") {
    CurrentPageComponent = AnimatedSplashPageWrapper;
  } else if (currentChildPage === "loadingprogress") {
    CurrentPageComponent = LoadingProgressPageWrapper;
  } else if (currentChildPage === "brandedsplash") {
    CurrentPageComponent = BrandedSplashPageWrapper;
  }

  return <CurrentPageComponent />;
};

const SplashMainPage: React.FC = () => {
  return (
    <div className="splash-container">
      <div className="splash-content splash-test-border splash-fade-in">
        <h1 className="splash-title">Chess Master</h1>
        <p className="splash-subtitle">
          Splash Screen Examples Hub
        </p>
        <div className="splash-description">
          Use the action sheet to navigate to different splash screen examples
        </div>
      </div>
    </div>
  );
};
