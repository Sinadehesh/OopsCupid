import React from "react";
import { ImageResponse } from "next/og";
import type { KitEntry, Slide } from "./kit";

/**
 * Pins (1000x1500, Pinterest's 2:3) and slideshow slides (1080x1920, for
 * TikTok and Instagram) in the site's sticker look: Nunito Black, ink
 * outlines, hard shadows, candy colours. Slides keep their text out of the
 * strips TikTok covers with its own buttons and caption.
 */

const INK = "#1A1033";
const PINK = "#FF4FA3";

type Fonts = { name: string; data: ArrayBuffer; weight: 800 | 900; style: "normal" }[];
let fontCache: Promise<Fonts> | null = null;

/** The fonts are public files, so read them from the site serving this. */
function fonts(origin: string): Promise<Fonts> {
  if (!fontCache) {
    fontCache = Promise.all(
      ([800, 900] as const).map(async (weight) => {
        const res = await fetch(`${origin}/fonts/Nunito-${weight}.woff`);
        if (!res.ok) throw new Error(`font ${weight}: ${res.status}`);
        return { name: "Nunito", data: await res.arrayBuffer(), weight, style: "normal" as const };
      })
    ).catch((e) => {
      fontCache = null;
      throw e;
    });
  }
  return fontCache;
}

const HEADERS = { "Cache-Control": "public, max-age=3600, s-maxage=86400" };

function TickBox({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        border: `${Math.round(size / 11)}px solid ${INK}`,
        background: "#fff",
        flexShrink: 0,
        display: "flex",
      }}
    />
  );
}

function Pin({ k }: { k: KitEntry }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: k.bg, padding: "64px 60px 56px", fontFamily: "Nunito", color: INK }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
        <div style={{ display: "flex", background: "#fff", border: `4px solid ${INK}`, borderRadius: 999, padding: "10px 26px", fontSize: 32, fontWeight: 900, boxShadow: `5px 5px 0 ${INK}`, transform: "rotate(-3deg)" }}>
          ✨ {k.badge}
        </div>
        <div style={{ display: "flex", width: 130, height: 130, borderRadius: 999, background: "#fff", border: `5px solid ${INK}`, alignItems: "center", justifyContent: "center", fontSize: 76 }}>
          {k.emoji}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: k.title.length > 34 ? 82 : 96, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, marginBottom: 44, width: 880 }}>
        {k.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26, background: "#fff", border: `5px solid ${INK}`, borderRadius: 40, padding: "40px 40px", boxShadow: `12px 12px 0 ${INK}`, marginBottom: 40 }}>
        {k.pinLines.map((line) => (
          <div key={line} style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {k.pinStyle === "tick" && <TickBox size={50} />}
            <div style={{ display: "flex", fontSize: 38, fontWeight: 800, lineHeight: 1.15, width: k.pinStyle === "tick" ? 700 : 770 }}>{line}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", fontSize: 42, fontWeight: 900, marginBottom: 30, width: 880 }}>{k.pinMore}</div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto", gap: 18 }}>
        <div style={{ display: "flex", background: PINK, color: "#fff", border: `5px solid ${INK}`, borderRadius: 28, padding: "22px 54px", fontSize: 50, fontWeight: 900, boxShadow: `8px 8px 0 ${INK}` }}>
          Take the quiz →
        </div>
        <div style={{ display: "flex", fontSize: 36, fontWeight: 900, opacity: 0.8 }}>oopscupid.com</div>
      </div>
    </div>
  );
}

/** The frame every slide shares: safe margins and a small watermark. */
function Frame({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: bg, fontFamily: "Nunito", color: INK, padding: "230px 150px 400px 80px", position: "relative" }}>
      {children}
      <div style={{ position: "absolute", top: 120, left: 80, display: "flex", fontSize: 38, fontWeight: 900, opacity: 0.55 }}>oopscupid.com</div>
    </div>
  );
}

function SlideArt({ k, s }: { k: KitEntry; s: Slide }) {
  if (s.kind === "hook") {
    return (
      <Frame bg={k.bg}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", width: 280, height: 280, borderRadius: 999, background: "#fff", border: `7px solid ${INK}`, alignItems: "center", justifyContent: "center", fontSize: 170, marginBottom: 60, boxShadow: `12px 12px 0 ${INK}` }}>
            {s.emoji}
          </div>
          <div style={{ display: "flex", fontSize: s.title.length > 34 ? 104 : 124, fontWeight: 900, lineHeight: 1.02, letterSpacing: -3, marginBottom: 50, width: 850 }}>{s.title}</div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 800, lineHeight: 1.2, width: 850, opacity: 0.8 }}>{s.sub}</div>
        </div>
      </Frame>
    );
  }
  if (s.kind === "list") {
    return (
      <Frame bg={k.bg}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1, gap: 34 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", border: `5px solid ${INK}`, borderRadius: 999, padding: "8px 28px", fontSize: 40, fontWeight: 900, boxShadow: `5px 5px 0 ${INK}`, marginBottom: 10 }}>
            {k.emoji} {s.heading}
          </div>
          {s.lines.map((line) => (
            <div key={line} style={{ display: "flex", alignItems: "center", gap: 30, background: "#fff", border: `5px solid ${INK}`, borderRadius: 36, padding: "34px 34px", boxShadow: `9px 9px 0 ${INK}` }}>
              <TickBox size={66} />
              <div style={{ display: "flex", fontSize: 50, fontWeight: 800, lineHeight: 1.15, width: 630 }}>{line}</div>
            </div>
          ))}
        </div>
      </Frame>
    );
  }
  if (s.kind === "type") {
    return (
      <Frame bg={k.bg}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", fontSize: 260, marginBottom: 40 }}>{s.emoji}</div>
          <div style={{ display: "flex", fontSize: s.title.length > 24 ? 92 : 110, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, marginBottom: 50, width: 850 }}>{s.title}</div>
          <div style={{ display: "flex", background: "#fff", border: `5px solid ${INK}`, borderRadius: 40, padding: "40px 44px", boxShadow: `10px 10px 0 ${INK}`, fontSize: 54, fontWeight: 800, lineHeight: 1.2, width: 850 }}>
            {s.line}
          </div>
        </div>
      </Frame>
    );
  }
  return (
    <Frame bg={PINK}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1, color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 900, lineHeight: 1.0, letterSpacing: -3, marginBottom: 50, width: 850 }}>{s.title}</div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, lineHeight: 1.2, marginBottom: 70, width: 850 }}>{s.sub}</div>
        <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", color: INK, border: `6px solid ${INK}`, borderRadius: 30, padding: "24px 44px", fontSize: 60, fontWeight: 900, boxShadow: `10px 10px 0 ${INK}` }}>
          {k.emoji} oopscupid.com
        </div>
      </div>
    </Frame>
  );
}

export async function pinImage(k: KitEntry, origin: string) {
  return new ImageResponse(<Pin k={k} />, { width: 1000, height: 1500, fonts: await fonts(origin), headers: HEADERS });
}

export async function slideImage(k: KitEntry, n: number, origin: string) {
  return new ImageResponse(<SlideArt k={k} s={k.slides[n]} />, { width: 1080, height: 1920, fonts: await fonts(origin), headers: HEADERS });
}
