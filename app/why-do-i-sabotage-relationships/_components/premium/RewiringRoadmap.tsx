"use client";
import React, { useState } from "react";
import { REWIRING_STEPS, type SubscaleKey } from "./premiumCopy";
import { CheckCircle2, Circle } from "lucide-react";

const STYLES = [
  { bg: "bg-white", border: "border-[#06AED5]/20", num: "bg-[#086788]" },
  { bg: "bg-[#FFF1D0]", border: "border-[#F0C808]/30", num: "bg-[#F0C808]" },
  { bg: "bg-[#06AED5]/5", border: "border-[#06AED5]/20", num: "bg-[#06AED5]" },
];

export default function RewiringRoadmap({ result }: { result: any }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const topKey = result.topDrivers?.[0]?.key as SubscaleKey | undefined;
  const steps = (topKey && REWIRING_STEPS[topKey]) ? REWIRING_STEPS[topKey] : REWIRING_STEPS["rejection_alarm"];

  return (
    <div>
      <div className="mb-8">
        <span className="text-[#F0C808] font-extrabold uppercase tracking-widest text-xs">Action Plan</span>
        <h3 className="text-[28px] md:text-[36px] font-extrabold text-[#086788] mt-1">Your Rewiring Roadmap</h3>
        <p className="text-[#5E6E79] font-medium mt-2 text-[15px]">Three steps built specifically for <strong className="text-[#086788]">{result.topDrivers?.[0]?.label ?? "your primary pattern"}</strong>. Not generic advice.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, i) => {
          const s = STYLES[i % STYLES.length];
          const done = checked.has(i);
          return (
            <div key={i} className={`${s.bg} rounded-2xl border-2 ${s.border} shadow-sm p-6 flex flex-col transition-all duration-200 ${done ? "opacity-60" : ""}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-9 h-9 rounded-full ${s.num} text-white font-extrabold text-lg flex items-center justify-center shadow-sm`}>{i + 1}</div>
                <button onClick={() => setChecked(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; })} className="focus:outline-none transition-transform hover:scale-110">
                  {done ? <CheckCircle2 className="w-6 h-6 text-[#06AED5]" /> : <Circle className="w-6 h-6 text-[#d6d2d2]" />}
                </button>
              </div>
              <h4 className="font-extrabold text-[#086788] text-[17px] mb-3 leading-snug">{step.title}</h4>
              <p className="text-[#5E6E79] text-[14px] font-medium leading-relaxed flex-1 mb-4">{step.description}</p>
              <div className="bg-[#086788] rounded-xl p-4">
                <p className="text-[12px] font-extrabold uppercase tracking-widest text-[#F0C808] mb-1">This Week</p>
                <p className="text-white text-[13px] font-medium leading-snug">{step.microAction}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
