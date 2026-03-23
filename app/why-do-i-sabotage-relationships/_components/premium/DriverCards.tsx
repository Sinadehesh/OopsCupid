"use client";
import React, { useEffect, useState } from "react";
import { SUBSCALE_META, type SubscaleKey } from "./premiumCopy";

const ORDER: SubscaleKey[] = ["fear_of_closeness","rejection_alarm","worthiness_wounds","protest_testing","withdrawal_exit"];

function getTierText(pct: number, meta: any) {
  if (pct >= 80) return meta.critText;
  if (pct >= 60) return meta.highText;
  if (pct >= 30) return meta.medText;
  return meta.lowText;
}

export default function DriverCards({ result }: { result: any }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 400); return () => clearTimeout(t); }, []);

  const map: Record<string, any> = {};
  result.subscales?.forEach((s: any) => { map[s.key] = s; });

  return (
    <div>
      <div className="mb-8">
        <span className="text-[#F0C808] font-extrabold uppercase tracking-widest text-xs">Deep Dive</span>
        <h3 className="text-[28px] md:text-[36px] font-extrabold text-[#086788] mt-1">Your 5 Behavioral Drivers</h3>
        <p className="text-[#5E6E79] font-medium mt-2 text-[15px]">Each driver is scored and interpreted from your actual answers — not a generic bucket.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ORDER.map((key, idx) => {
          const meta = SUBSCALE_META[key];
          const s = map[key];
          const pct = s?.pct ?? 0;
          const score = s?.score ?? 0;
          const isTop = result.topDrivers?.[0]?.key === key;
          return (
            <div key={key} className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${isTop ? "border-[#086788]" : "border-[#06AED5]/20 hover:border-[#06AED5]"}`}>
              <div className="flex items-center gap-3 px-6 pt-6 pb-3">
                <span className="text-3xl">{meta.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-[#086788] text-[17px]">{s?.label ?? key}</span>
                    {isTop && <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#086788] text-white px-2 py-0.5 rounded-full">Top Driver</span>}
                  </div>
                  <p className="text-[12px] font-bold text-[#5E6E79] uppercase tracking-widest">{meta.tagline}</p>
                </div>
                <span className="text-sm font-extrabold rounded-full px-3 py-1 text-white shrink-0" style={{ background: pct >= 60 ? meta.color : "#d6d2d2", color: pct >= 60 ? "white" : "#5E6E79" }}>{score}/40</span>
              </div>
              <div className="px-6 pb-3">
                <div className="w-full h-3 bg-[#d6d2d2] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: mounted ? `${pct}%` : "0%", background: meta.color, transitionDelay: `${idx * 100}ms` }} />
                </div>
                <div className="flex justify-between text-[11px] font-bold text-[#5E6E79] mt-1"><span>0</span><span>{Math.round(pct)}%</span><span>100</span></div>
              </div>
              <div className="px-6 pb-5 flex-1">
                <p className="text-[#334B63] text-[14px] leading-relaxed font-medium mb-3">{getTierText(pct, meta)}</p>
                <div className="bg-[#FFF1D0] border border-[#F0C808]/30 rounded-xl px-4 py-3">
                  <p className="text-[13px] text-[#5E6E79] font-bold italic leading-snug">{meta.realLifeExample}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
