"use client";
import React, { useState } from "react";
import { LOOP_STEPS } from "./premiumCopy";

const STEP_CONFIG = [
  { key: "trigger", label: "Trigger", color: "#F0C808", emoji: "⚡" },
  { key: "brainStory", label: "Brain Story", color: "#DD1C1A", emoji: "🧠" },
  { key: "behavior", label: "Defense Behavior", color: "#086788", emoji: "🛡️" },
  { key: "outcome", label: "Outcome", color: "#5E6E79", emoji: "🔄" },
];

export default function SabotageLoop({ result }: { result: any }) {
  const [active, setActive] = useState<number | null>(null);
  const loop = LOOP_STEPS[result.archetype ?? ""];
  if (!loop) return null;

  const steps = STEP_CONFIG.map(s => ({ ...s, text: loop[s.key as keyof typeof loop] }));

  return (
    <div className="bg-white rounded-[24px] border-2 border-[#06AED5]/20 shadow-sm p-6 md:p-10 hover:border-[#06AED5] hover:shadow-lg transition-all duration-300">
      <div className="mb-8 text-center">
        <span className="text-[#F0C808] font-extrabold uppercase tracking-widest text-xs">The Mechanism</span>
        <h3 className="text-[26px] md:text-[32px] font-extrabold text-[#086788] mt-1">Your Sabotage Loop</h3>
        <p className="text-[#5E6E79] font-medium mt-2 text-[15px]">The exact sequence your nervous system runs — often in under 10 seconds. Tap each step.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {steps.map((step, i) => (
          <button key={step.key} onClick={() => setActive(active === i ? null : i)}
            className={`relative flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all duration-200 focus:outline-none ${active === i ? "shadow-lg -translate-y-1" : "border-[#d6d2d2] hover:border-[#06AED5] hover:-translate-y-0.5"}`}
            style={active === i ? { borderColor: step.color, background: step.color + "12" } : {}}>
            <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full text-white text-xs font-extrabold flex items-center justify-center shadow-sm" style={{ background: step.color }}>{i + 1}</div>
            <span className="text-3xl mb-2">{step.emoji}</span>
            <span className="font-extrabold text-[#086788] text-[13px] uppercase tracking-wide">{step.label}</span>
          </button>
        ))}
      </div>
      {active !== null ? (
        <div className="rounded-2xl p-5 border-2 animate-in fade-in slide-in-from-top-2 duration-200" style={{ borderColor: steps[active].color, background: steps[active].color + "0D" }}>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{steps[active].emoji}</span>
            <span className="font-extrabold text-[#086788] uppercase tracking-widest text-xs">{steps[active].label}</span>
          </div>
          <p className="text-[#334B63] font-bold text-[16px] leading-relaxed">{steps[active].text}</p>
        </div>
      ) : (
        <p className="text-center text-[#5E6E79] text-sm font-medium">↑ Tap any step above to expand it</p>
      )}
    </div>
  );
}
