import React from "react";
import { usePageInstructions } from "../hooks/usePageInstructions";
import { usePageActions } from "../hooks/usePageActions";
import { LuxurysplashPage } from "../pages";

export const LuxurysplashPageWrapper: React.FC = () => {
  usePageInstructions("luxurysplash");
  usePageActions("luxurysplash");

  return <LuxurysplashPage />;
};
