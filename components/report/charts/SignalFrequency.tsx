"use client";
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, LabelList,
} from "recharts";

export interface FrequencyRow {
  label: string;
  value: number; // 0-100
  description?: string;
}

/**
 * Horizontal magnitude bars for behavioral-frequency breakdowns.
 *
 * Dataviz rules applied: one hue for magnitude (sequential job — bars vary
 * by length, not by color); thin marks with rounded data-ends; value labels
 * in ink at the bar end; recessive axes; per-bar hover tooltip.
 */
export default function SignalFrequency({
  data,
  accent,
  height,
}: {
  data: FrequencyRow[];
  accent: string;
  height?: number;
}) {
  const h = height ?? data.length * 56 + 16;
  return (
    <div style={{ width: "100%", height: h }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 44, top: 4, bottom: 4 }}>
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            type="category"
            dataKey="label"
            width={150}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#475569", fontSize: 12, fontWeight: 700 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(148,163,184,0.08)" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as FrequencyRow;
              return (
                <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl max-w-[240px]">
                  <p className="font-black text-sm mb-0.5">{p.label} — {p.value}%</p>
                  {p.description && <p className="text-white/60 text-xs leading-snug">{p.description}</p>}
                </div>
              );
            }}
          />
          <Bar dataKey="value" barSize={14} radius={[0, 4, 4, 0]} isAnimationActive animationDuration={1100}>
            {data.map((row) => (
              <Cell key={row.label} fill={accent} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v) => `${v}%`}
              style={{ fill: "#334155", fontSize: 12, fontWeight: 800 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
