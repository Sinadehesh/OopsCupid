import React from "react";
import { ImageResponse } from "next/og";
import type { Deck, KitEntry, Slide } from "./kit";

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
function Frame({ bg, feed, children }: { bg: string; feed: boolean; children: React.ReactNode }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: bg, fontFamily: "Nunito", color: INK, padding: feed ? "100px 80px 70px 80px" : "230px 150px 400px 80px", position: "relative" }}>
      {children}
      <div style={{ position: "absolute", top: feed ? 36 : 120, left: 80, display: "flex", fontSize: 38, fontWeight: 900, opacity: 0.55 }}>oopscupid.com</div>
    </div>
  );
}

function SlideArt({ k, s, feed }: { k: Deck; s: Slide; feed: boolean }) {
  if (s.kind === "hook") {
    return (
      <Frame bg={k.bg} feed={feed}>
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
      <Frame bg={k.bg} feed={feed}>
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
      <Frame bg={k.bg} feed={feed}>
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
  // Text width inside the frame: TikTok's buttons cover the right edge of the tall shape.
  const W = feed ? 920 : 850;
  if (s.kind === "ask") {
    return (
      <Frame bg={k.bg} feed={feed}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: INK, color: "#fff", borderRadius: 999, padding: "8px 28px", fontSize: 40, fontWeight: 900, marginBottom: 34 }}>{s.n}</div>
          <div style={{ display: "flex", fontSize: s.q.length > 24 ? 84 : 98, fontWeight: 900, lineHeight: 1.04, letterSpacing: -2, marginBottom: 48, width: W }}>{s.q}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: feed ? 20 : 24 }}>
            {s.options.map((o, i) => (
              <div key={o.label} style={{ display: "flex", alignItems: "center", gap: 24, background: "#fff", border: `5px solid ${INK}`, borderRadius: 30, padding: feed ? "18px 26px" : "22px 28px", boxShadow: `7px 7px 0 ${INK}`, width: W }}>
                <div style={{ display: "flex", width: 66, height: 66, borderRadius: 999, background: k.bg, border: `4px solid ${INK}`, alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 900, flexShrink: 0 }}>
                  {"ABCD"[i]}
                </div>
                <div style={{ display: "flex", fontSize: 46, fontWeight: 800, lineHeight: 1.15, width: W - 160 }}>
                  {o.emoji} {o.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }
  if (s.kind === "flag") {
    return (
      <Frame bg={k.bg} feed={feed}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: INK, color: "#fff", borderRadius: 999, padding: "8px 28px", fontSize: 40, fontWeight: 900, marginBottom: 40 }}>{s.n}</div>
          <div style={{ display: "flex", background: "#fff", border: `6px solid ${INK}`, borderRadius: 44, padding: "52px 48px", boxShadow: `12px 12px 0 ${INK}`, fontSize: s.text.length > 58 ? 66 : 76, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, width: W, marginBottom: 60 }}>
            {s.text}
          </div>
          <div style={{ display: "flex", gap: 26 }}>
            <div style={{ display: "flex", background: "#FF5C7A", color: "#fff", border: `5px solid ${INK}`, borderRadius: 999, padding: "18px 40px", fontSize: 50, fontWeight: 900, boxShadow: `6px 6px 0 ${INK}` }}>🚩 Red</div>
            <div style={{ display: "flex", background: "#7BE0AE", color: INK, border: `5px solid ${INK}`, borderRadius: 999, padding: "18px 40px", fontSize: 50, fontWeight: 900, boxShadow: `6px 6px 0 ${INK}` }}>💚 Green</div>
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, opacity: 0.7, marginTop: 40 }}>Call it, then swipe →</div>
        </div>
      </Frame>
    );
  }
  if (s.kind === "verdict") {
    const look = s.beige
      ? { bg: "#F3E3C3", emoji: "🤎", label: "Beige flag", note: "Annoying, not dangerous. Counts as green." }
      : s.flag === "red"
        ? { bg: "#FFB3C7", emoji: "🚩", label: "Red flag", note: "" }
        : { bg: "#B8F2D8", emoji: "💚", label: "Green flag", note: "" };
    return (
      <Frame bg={look.bg} feed={feed}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", fontSize: feed ? 150 : 190, marginBottom: 10 }}>{look.emoji}</div>
          <div style={{ display: "flex", fontSize: feed ? 118 : 132, fontWeight: 900, lineHeight: 1, letterSpacing: -4, marginBottom: look.note ? 22 : 52 }}>{look.label}</div>
          {look.note ? <div style={{ display: "flex", fontSize: 44, fontWeight: 800, opacity: 0.7, marginBottom: 48, width: W }}>{look.note}</div> : null}
          <div style={{ display: "flex", background: "#fff", border: `5px solid ${INK}`, borderRadius: 40, padding: "42px 44px", boxShadow: `10px 10px 0 ${INK}`, fontSize: s.why.length > 100 ? 50 : 54, fontWeight: 800, lineHeight: 1.22, width: W }}>
            {s.why}
          </div>
        </div>
      </Frame>
    );
  }
  if (s.kind === "bingo") {
    const n = s.items.length;
    const cols = n <= 12 ? 3 : 4;
    const rows = Math.ceil(n / cols);
    const gap = 14;
    const cell = Math.floor((W - gap * (cols - 1)) / cols);
    const gridH = feed ? 1010 : 1150;
    const cellH = Math.min(Math.round(cell * 1.45), Math.floor((gridH - gap * (rows - 1)) / rows));
    const longest = Math.max(...s.items.map((x) => x.length));
    const size = cols === 3 ? (longest > 44 ? 37 : 40) : longest > 50 ? 30 : longest > 42 ? 32 : 34;
    return (
      <Frame bg={k.bg} feed={feed}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1 }}>
          <div style={{ display: "flex", fontSize: s.name.length > 22 ? 62 : 72, fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 30, width: W }}>
            {k.emoji} {s.name}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap, width: W }}>
            {s.items.map((item) => (
              <div key={item} style={{ display: "flex", width: cell, height: cellH, background: "#fff", border: `4px solid ${INK}`, borderRadius: 22, padding: "10px 12px", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "flex", textAlign: "center", justifyContent: "center", fontSize: size, fontWeight: 800, lineHeight: 1.12, width: cell - 32 }}>{item}</div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    );
  }
  return (
    <Frame bg={PINK} feed={feed}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexGrow: 1, color: "#fff" }}>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 900, lineHeight: 1.0, letterSpacing: -3, marginBottom: 50, width: 850 }}>{s.title}</div>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 800, lineHeight: 1.2, marginBottom: 70, width: 850 }}>{s.sub}</div>
        <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", color: INK, border: `6px solid ${INK}`, borderRadius: 30, padding: "24px 44px", fontSize: s.cta && s.cta.length > 18 ? 52 : 60, fontWeight: 900, boxShadow: `10px 10px 0 ${INK}` }}>
          {k.emoji} {s.cta ?? "oopscupid.com"}
        </div>
      </div>
    </Frame>
  );
}

export async function pinImage(k: KitEntry, origin: string) {
  return new ImageResponse(<Pin k={k} />, { width: 1000, height: 1500, fonts: await fonts(origin), headers: HEADERS });
}

/** `feed`: Instagram's 4:5 feed shape. The story shape suits TikTok, Reels and Stories. */
export async function slideImage(k: Deck, n: number, origin: string, feed = false) {
  return new ImageResponse(<SlideArt k={k} s={k.slides[n]} feed={feed} />, { width: 1080, height: feed ? 1350 : 1920, fonts: await fonts(origin), headers: HEADERS });
}

export interface StoryCard {
  /** The quiz, from lib/share/story.ts, never from the request. */
  title: string;
  emoji: string;
  bg: string;
  path: string;
  /** Her result, as the quiz words it. */
  result: string;
  /** "12 of 16", "8/10": only when the quiz has a score. */
  score?: string;
}

/**
 * The Story card: her result, phone-sized, with the way back to the quiz.
 * Everything sits inside the band Instagram and TikTok leave clear (their
 * name bar on top, the reply bar below).
 */
function Story({ c }: { c: StoryCard }) {
  const n = c.result.length;
  const size = n <= 14 ? 150 : n <= 24 ? 126 : n <= 36 ? 106 : n <= 50 ? 90 : 78;
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: c.bg, fontFamily: "Nunito", color: INK, padding: "250px 80px 330px 80px" }}>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
        <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", border: `5px solid ${INK}`, borderRadius: 999, padding: "14px 32px", fontSize: c.title.length > 30 ? 34 : 40, fontWeight: 900, boxShadow: `6px 6px 0 ${INK}`, transform: "rotate(-2deg)", marginBottom: 72, maxWidth: 920 }}>
          {c.emoji} {c.title}
        </div>
        <div style={{ display: "flex", fontSize: 48, fontWeight: 800, opacity: 0.65, marginBottom: 18 }}>My result</div>
        <div style={{ display: "flex", fontSize: size, fontWeight: 900, lineHeight: 1.02, letterSpacing: -3, width: 920 }}>{c.result}</div>
        {c.score ? (
          <div style={{ display: "flex", alignSelf: "flex-start", marginTop: 56, background: INK, color: "#fff", borderRadius: 28, padding: "18px 36px", fontSize: 52, fontWeight: 900 }}>{c.score}</div>
        ) : null}
      </div>
      <div style={{ display: "flex", flexDirection: "column", background: "#fff", border: `6px solid ${INK}`, borderRadius: 40, padding: "36px 44px", boxShadow: `10px 10px 0 ${INK}` }}>
        <div style={{ display: "flex", fontSize: 58, fontWeight: 900, marginBottom: 10 }}>What would you get? 👀</div>
        <div style={{ display: "flex", fontSize: 50, fontWeight: 900, color: PINK }}>oopscupid.com</div>
      </div>
    </div>
  );
}

export async function storyImage(c: StoryCard, origin: string) {
  return new ImageResponse(<Story c={c} />, { width: 1080, height: 1920, fonts: await fonts(origin), headers: HEADERS });
}
