"use client";
import React, { useEffect, useState } from "react";

const LABELS = ["Fear of\nCloseness","Rejection\nAlarm","Worthiness\nWounds","Protest &\nTesting","Withdrawal\n& Exit"];
const KEYS = ["fear_of_closeness","rejection_alarm","worthiness_wounds","protest_testing","withdrawal_exit"];

function polar(angle: number, r: number, cx: number, cy: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function RadarChart({ result }: { result: any }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 300); return () => clearTimeout(t); }, []);
  const cx = 200, cy = 210, maxR = 140, levels = 4;

  const scores = KEYS.map(key => {
    const found = result.subscales?.find((s: any) => s.key === key);
    return found ? Math.min(found.pct / 100, 1) : 0;
  });

  const points = scores.map((s, i) => polar((360 / 5) * i, animated ? s * maxR : 0, cx, cy));
  const polyStr = points.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="bg-white rounded-[24px] border-2 border-[#06AED5]/20 shadow-sm p-6 md:p-8 hover:border-[#06AED5] hover:shadow-lg transition-all duration-300">
      <h3 className="font-extrabold text-[#086788] text-xl mb-1">Your Pattern Radar</h3>
      <p className="text-[#5E6E79] text-sm font-medium mb-4">All 5 sabotage dimensions at a glance.</p>
      <div className="flex justify-center">
        <svg viewBox="0 0 400 420" className="w-full max-w-[320px]">
          {Array.from({ length: levels }).map((_, l) => {
            const r = (maxR / levels) * (l + 1);
            const pts = Array.from({ length: 5 }).map((_, i) => polar((360 / 5) * i, r, cx, cy));
            return <polygon key={l} points={pts.map(p => `${p.x},${p.y}`).join(" ")} fill="none" stroke={l === levels - 1 ? "#d6d2d2" : "#eeeeee"} strokeWidth={l === levels - 1 ? 1.5 : 1} />;
          })}
          {Array.from({ length: 5 }).map((_, i) => {
            const end = polar((360 / 5) * i, maxR, cx, cy);
            return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#e0e0e0" strokeWidth="1" />;
          })}
          <polygon points={polyStr} fill="#06AED5" fillOpacity="0.18" stroke="#086788" strokeWidth="2.5" strokeLinejoin="round" style={{ transition: "all 1.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="6" fill="#086788" stroke="white" strokeWidth="2" style={{ transition: "all 1.2s cubic-bezier(0.34,1.56,0.64,1)" }} />
          ))}
          {LABELS.map((label, i) => {
            const pos = polar((360 / 5) * i, maxR + 32, cx, cy);
            return (
              <text key={i} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="700" fill="#334B63">
                {label.split("\n").map((line, li) => <tspan key={li} x={pos.x} dy={li === 0 ? "0" : "15"}>{line}</tspan>)}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
