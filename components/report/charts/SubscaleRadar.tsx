"use client";
import React from "react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";

export interface RadarPoint {
  axis: string; // short label shown on the chart
  value: number; // 0-100
  description?: string; // shown in the tooltip
}

/**
 * Single-series radar for multi-axis behavioral profiles.
 *
 * Dataviz rules applied: one series → no legend box (the section heading
 * names it); axis text wears ink tokens, not the series color; the grid is
 * recessive; a per-point tooltip explains each axis on hover.
 */
export default function SubscaleRadar({
  data,
  accent,
  height = 320,
}: {
  data: RadarPoint[];
  accent: string;
  height?: number;
}) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="rgba(148,163,184,0.25)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "#475569", fontSize: 12, fontWeight: 700 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as RadarPoint;
              return (
                <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl max-w-[240px]">
                  <p className="font-black text-sm mb-0.5">{p.axis} — {p.value}%</p>
                  {p.description && <p className="text-white/60 text-xs leading-snug">{p.description}</p>}
                </div>
              );
            }}
          />
          <Radar
            dataKey="value"
            stroke={accent}
            strokeWidth={2}
            fill={accent}
            fillOpacity={0.18}
            dot={{ r: 4, fill: accent, strokeWidth: 2, stroke: "#fff" }}
            isAnimationActive
            animationDuration={1100}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
