import React from "react";
import { useAppStore } from "../../stores/appStore";
import { UITestsMainPage } from "../../components/UITestsMainPage";
import { DragTestPageWrapper } from "../../components/DragTestPageWrapper";
import { UIAudioTestPageWrapper } from "../../components/UIAudioTestPageWrapper";
import { LayoutTestPageWrapper } from "../../components/LayoutTestPageWrapper";

export const UITestPage: React.FC = () => {
  const currentChildPage = useAppStore((state) => state.currentChildPage);

  // Determine which component to render
  let CurrentPageComponent = UITestsMainPage;

  if (currentChildPage === "dragtest") {
    CurrentPageComponent = DragTestPageWrapper;
  } else if (currentChildPage === "uiaudiotest") {
    CurrentPageComponent = UIAudioTestPageWrapper;
  } else if (currentChildPage === "layouttest") {
    CurrentPageComponent = LayoutTestPageWrapper;
  }

  return (
    <div className="relative h-full">
      {/* Current page content */}
      <CurrentPageComponent />
    </div>
  );
};
