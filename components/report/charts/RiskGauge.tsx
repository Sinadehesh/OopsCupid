"use client";
import React, { useEffect, useState } from "react";

/**
 * Semicircle risk gauge for single risk-index results (0–100).
 *
 * Dataviz rules applied: the value is a hero number in ink (not buried in
 * the mark); status is never color-alone — the caller renders an icon +
 * text label beside it; the arc is thin with a rounded data-end; the
 * animation eases the needle in on mount.
 */
export default function RiskGauge({
  value,
  accent,
  label,
  size = 260,
}: {
  value: number; // 0-100
  accent: string;
  label: string; // e.g. "Suspicion Index"
  size?: number;
}) {
  const [animated, setAnimated] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(Math.min(100, Math.max(0, value))), 150);
    return () => clearTimeout(t);
  }, [value]);

  // Semicircle geometry: r=42, half-circumference = PI * 42 ≈ 131.9
  const HALF = Math.PI * 42;
  const dash = (animated / 100) * HALF;

  // needle angle: -90° (0) → +90° (100)
  const angle = -90 + (animated / 100) * 180;

  return (
    <div className="inline-flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 100 58" style={{ width: size }} role="img" aria-label={`${label}: ${value} out of 100`}>
        {/* track */}
        <path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" strokeLinecap="round" />
        {/* value arc */}
        <path
          d="M 8 50 A 42 42 0 0 1 92 50"
          fill="none"
          stroke={accent}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${HALF}`}
          style={{ transition: "stroke-dasharray 1200ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
        {/* scale ticks at 0/25/50/75/100 */}
        {[0, 25, 50, 75, 100].map((t) => {
          const a = (-90 + (t / 100) * 180) * (Math.PI / 180);
          const x1 = 50 + Math.sin(a) * 34.5, y1 = 50 - Math.cos(a) * 34.5;
          const x2 = 50 + Math.sin(a) * 37.5, y2 = 50 - Math.cos(a) * 37.5;
          return <line key={t} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />;
        })}
        {/* value marker dot at the arc end */}
        {(() => {
          const a = (angle * Math.PI) / 180;
          const x = 50 + Math.sin(a) * 42, y = 50 - Math.cos(a) * 42;
          return <circle cx={x} cy={y} r="4.5" fill="white" stroke={accent} strokeWidth="2.5" style={{ transition: "cx 1200ms cubic-bezier(0.22,1,0.36,1), cy 1200ms cubic-bezier(0.22,1,0.36,1)" }} />;
        })()}
      </svg>
      <div className="text-center -mt-9">
        <p className="text-6xl font-black text-white leading-none tabular-nums">{value}</p>
        <p className="text-white/40 text-[11px] font-black uppercase tracking-widest mt-1.5">{label} / 100</p>
      </div>
    </div>
  );
}
