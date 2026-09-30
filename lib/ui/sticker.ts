/**
 * The site's "sticker" look, shared so every page matches the homepage:
 * ink outlines, hard offset shadows that press in on tap, candy colours
 * and a heavy rounded display font.
 */
export const INK = "#1A1033";
export const PINK = "#FF4FA3";
export const CANDY = ["#FFD1E8", "#C9B6FF", "#FFE68A", "#B8F2D8", "#FFC9A8", "#BDE3FF", "#FFB3C7", "#D9F99D"];

/** Card or button with an ink outline and a shadow that presses in. */
export const sticker =
  "border-[2.5px] border-[#1A1033] shadow-[4px_4px_0_#1A1033] active:shadow-[1px_1px_0_#1A1033] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-100";

/** The same outline for things that are not tappable. */
export const stickerStatic = "border-[2.5px] border-[#1A1033] shadow-[4px_4px_0_#1A1033]";

/** Headline font. Set inline because the global h1/h2 rule would win over a class. */
export const display = {
  fontFamily: "var(--font-nunito), system-ui, sans-serif",
  fontWeight: 900,
  letterSpacing: "-0.03em",
} as const;
