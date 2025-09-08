import React from "react";
import { useAppStore } from "../../stores/appStore";
import { MinimalSplashPageWrapper } from "../../components/splash/MinimalSplashPageWrapper";
import { AnimatedSplashPageWrapper } from "../../components/splash/AnimatedSplashPageWrapper";
import { LoadingProgressPageWrapper } from "../../components/splash/LoadingProgressPageWrapper";
import { BrandedSplashPageWrapper } from "../../components/splash/BrandedSplashPageWrapper";

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
    <div className="splash-container splash-in-app splash-fade-in">
      <div className="splash-brand-section">
        <div className="splash-logo-area">
          <h1 className="splash-title">Chess Master</h1>
          <p className="splash-subtitle">
            Splash Screen Examples Hub
          </p>
          <div className="splash-description">
            Use the action sheet to navigate to different splash screen examples
          </div>
        </div>
      </div>
    </div>
  );
};
