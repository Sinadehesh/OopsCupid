import React from "react";

/**
 * The Flag Runner girl, seen from behind as she runs up the road: pink
 * hoodie with a heart on the back, ponytail, sneakers. Pure SVG and CSS
 * (keyframes in globals.css): legs pump, arms swing, the ponytail
 * bounces, the body bobs and her shadow squashes in time.
 *
 * mode "run" plays the cycle, "stand" holds still, "cheer" jumps.
 */
export default function RunnerGirl({ mode = "run", size = 60 }: { mode?: "run" | "stand" | "cheer"; size?: number }) {
  const ink = "#1A1033";
  const skin = "#F2C7A5";
  const hair = "#6B4226";
  const hoodie = "#FF4FA3";
  const legs = "#3F2C6B";
  const pivot = (x: number, y: number) => ({ transformBox: "view-box" as const, transformOrigin: `${x}px ${y}px` });

  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 64 96"
      aria-hidden="true"
      className={`rg ${mode === "run" ? "rg-run" : mode === "cheer" ? "rg-cheer" : "rg-stand"}`}
      style={{ overflow: "visible" }}
    >
      {/* Shadow */}
      <ellipse className="rg-shadow" cx="32" cy="91" rx="15" ry="3.5" fill={ink} opacity="0.2" style={pivot(32, 91)} />

      <g className="rg-body" style={pivot(32, 60)}>
        {/* Legs */}
        <g className="rg-leg-a" style={pivot(27, 58)}>
          <rect x="23.5" y="56" width="7.5" height="25" rx="3.7" fill={legs} stroke={ink} strokeWidth="2" />
          <rect x="21.5" y="77" width="11" height="8" rx="3.5" fill="#fff" stroke={ink} strokeWidth="2" />
          <rect x="21.5" y="82" width="11" height="3" rx="1.5" fill={hoodie} />
        </g>
        <g className="rg-leg-b" style={pivot(37, 58)}>
          <rect x="33" y="56" width="7.5" height="25" rx="3.7" fill={legs} stroke={ink} strokeWidth="2" />
          <rect x="31.5" y="77" width="11" height="8" rx="3.5" fill="#fff" stroke={ink} strokeWidth="2" />
          <rect x="31.5" y="82" width="11" height="3" rx="1.5" fill={hoodie} />
        </g>

        {/* Arms, behind the hoodie at the shoulder */}
        <g className="rg-arm-a" style={pivot(21, 37)}>
          <rect x="13" y="34" width="8" height="20" rx="4" fill={hoodie} stroke={ink} strokeWidth="2" />
          <circle cx="17" cy="56" r="3.6" fill={skin} stroke={ink} strokeWidth="2" />
        </g>
        <g className="rg-arm-b" style={pivot(43, 37)}>
          <rect x="43" y="34" width="8" height="20" rx="4" fill={hoodie} stroke={ink} strokeWidth="2" />
          <circle cx="47" cy="56" r="3.6" fill={skin} stroke={ink} strokeWidth="2" />
        </g>

        {/* Hoodie, with a little heart on the back */}
        <rect x="18.5" y="31" width="27" height="29" rx="10" fill={hoodie} stroke={ink} strokeWidth="2.5" />
        <path d="M32 50.5l-.9-.8C28 46.9 26 45.1 26 42.9c0-1.8 1.4-3.2 3.2-3.2 1 0 2 .5 2.8 1.2.8-.7 1.8-1.2 2.8-1.2 1.8 0 3.2 1.4 3.2 3.2 0 2.2-2 4-5.1 6.8l-.9.8z" fill="#fff" />
        <rect x="18.5" y="55" width="27" height="5" rx="2.5" fill="#E0388A" />

        {/* Head, from behind */}
        <circle cx="21.5" cy="22" r="2.6" fill={skin} stroke={ink} strokeWidth="1.8" />
        <circle cx="42.5" cy="22" r="2.6" fill={skin} stroke={ink} strokeWidth="1.8" />
        <circle cx="32" cy="20" r="11" fill={hair} stroke={ink} strokeWidth="2.5" />
        <path d="M25 14 Q32 9 39 14" stroke="#8A5A3B" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* Ponytail, swinging */}
        <g className="rg-pony" style={pivot(32, 23)}>
          <path d="M29 23 Q25 35 32 46 Q39 35 35 23 Z" fill={hair} stroke={ink} strokeWidth="2.2" strokeLinejoin="round" />
          <rect x="28" y="20.5" width="8" height="4.5" rx="2.2" fill="#FFE68A" stroke={ink} strokeWidth="1.8" />
        </g>
      </g>
    </svg>
  );
}
