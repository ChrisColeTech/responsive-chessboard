import React from "react";
import { usePageInstructions } from "../hooks/usePageInstructions";
import { usePageActions } from "../hooks/usePageActions";
import { LayoutTestPage } from "../pages/uitests/LayoutTestPage";

export const LayoutTestPageWrapper: React.FC = () => {
  usePageInstructions("layout");
  usePageActions("layouttest");

  return <LayoutTestPage />;
};