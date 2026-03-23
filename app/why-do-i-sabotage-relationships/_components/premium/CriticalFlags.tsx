"use client";
import React from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const FLAG_COPY: Record<string, string> = {
  fear_of_closeness: "High-intensity closeness fear — you strongly feel the pull to withdraw when intimacy becomes real.",
  rejection_alarm: "Rejection surveillance on high — you actively scan for signs of disinterest even in calm moments.",
  worthiness_wounds: "Core unworthiness belief active — part of you believes you'd be left if truly known.",
  protest_testing: "Emotional masking under stress — you go cold or hard instead of communicating when scared.",
  withdrawal_exit: "Exit patterning confirmed — you've pushed away or faded from people you actually wanted to keep.",
};

export default function CriticalFlags({ result }: { result: any }) {
  const flags = result.criticalFlags ?? 0;
  const firedKeys = (result.subscales ?? []).filter((s: any) => s.pct > 72).map((s: any) => s.key);

  if (flags === 0) {
    return (
      <div className="bg-white rounded-[24px] border-2 border-[#06AED5]/20 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="w-10 h-10 text-[#06AED5] shrink-0" />
          <div>
            <h3 className="font-extrabold text-[#086788] text-xl mb-1">No High-Intensity Flags</h3>
            <p className="text-[#5E6E79] font-medium text-sm">None of the high-severity behavioral markers fired at critical levels. Your patterns exist but aren't running at maximum intensity. That's genuinely meaningful.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] border-2 border-[#DD1C1A]/30 shadow-sm p-6 md:p-8">
      <div className="flex items-start gap-4 mb-6">
        <AlertTriangle className="w-10 h-10 text-[#DD1C1A] shrink-0 mt-0.5" />
        <div>
          <h3 className="font-extrabold text-[#086788] text-xl mb-1">{flags} High-Intensity Flag{flags > 1 ? "s" : ""} Detected</h3>
          <p className="text-[#5E6E79] font-medium text-sm">These specific behaviors scored at clinically significant levels. This is not a diagnosis — it's a precise signal about where your pattern is most active and worth addressing.</p>
        </div>
      </div>
      <div className="space-y-3">
        {firedKeys.slice(0, flags + 1).map((key: string, i: number) => (
          <div key={key} className="flex items-start gap-3 p-4 rounded-xl bg-[#DD1C1A]/5 border border-[#DD1C1A]/15">
            <span className="w-6 h-6 rounded-full bg-[#DD1C1A] text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
            <p className="text-[#334B63] text-[14px] font-medium leading-snug">{FLAG_COPY[key] ?? "High-intensity sabotage behavior confirmed."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
