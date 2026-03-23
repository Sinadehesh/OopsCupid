"use client";
import React from "react";
import IdentityHero from "./premium/IdentityHero";
import RadarChart from "./premium/RadarChart";
import DuelBars from "./premium/DuelBars";
import SabotageLoop from "./premium/SabotageLoop";
import FlipTogglePairs from "./premium/FlipTogglePairs";
import DriverCards from "./premium/DriverCards";
import SelfWorthCore from "./premium/SelfWorthCore";
import CriticalFlags from "./premium/CriticalFlags";
import RewiringRoadmap from "./premium/RewiringRoadmap";
import ShareFooter from "./premium/ShareFooter";

export default function SabotagePremiumResult({ result }: { result: any }) {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
      <IdentityHero result={result} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RadarChart result={result} />
        <DuelBars result={result} />
      </div>
      <SabotageLoop result={result} />
      <FlipTogglePairs result={result} />
      <DriverCards result={result} />
      <SelfWorthCore result={result} />
      <CriticalFlags result={result} />
      <RewiringRoadmap result={result} />
      <ShareFooter result={result} />
    </div>
  );
}
