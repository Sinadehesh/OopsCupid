import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * SHARE CARD
 *
 * A quiz site's only free distribution is people posting their result.
 * That only works if the shared link renders something worth looking at —
 * a plain link gets scrolled past, a designed card with a verdict on it
 * gets tapped.
 *
 * /api/og?t=The%20Intensity%20Chaser&s=72&l=Pattern%20Index&q=Why%20Do%20I%20Pick%20Bad%20Guys
 *
 * Everything is drawn from query params so no result data is stored
 * server-side and the image is cacheable at the edge.
 */

const ACCENTS: Record<string, string> = {
  low: "#10b981",
  mid: "#f59e0b",
  high: "#f43f5e",
};

function accentFor(score: number) {
  if (score >= 67) return ACCENTS.high;
  if (score >= 34) return ACCENTS.mid;
  return ACCENTS.low;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = (searchParams.get("t") ?? "My result").slice(0, 70);
  const quiz = (searchParams.get("q") ?? "OopsCupid").slice(0, 60);
  const label = (searchParams.get("l") ?? "Score").slice(0, 28);
  const raw = Number(searchParams.get("s"));
  const score = Number.isFinite(raw) ? Math.max(0, Math.min(100, Math.round(raw))) : null;
  const accent = accentFor(score ?? 50);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E1621",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* accent wash */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 320,
            background: `radial-gradient(60% 100% at 50% 0%, ${accent}40, transparent 70%)`,
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: accent,
              display: "flex",
            }}
          />
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            {quiz}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {score !== null && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
              <div
                style={{
                  color: "#fff",
                  fontSize: 132,
                  fontWeight: 900,
                  lineHeight: 1,
                  display: "flex",
                }}
              >
                {score}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  paddingBottom: 18,
                  display: "flex",
                }}
              >
                {label} / 100
              </div>
            </div>
          )}

          <div
            style={{
              color: "#fff",
              fontSize: title.length > 40 ? 58 : 72,
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              display: "flex",
              maxWidth: 980,
            }}
          >
            {title}
          </div>

          {score !== null && (
            <div style={{ display: "flex", width: 980, height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 999 }}>
              <div style={{ display: "flex", width: (980 * score) / 100, height: 10, background: accent, borderRadius: 999 }} />
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 28, fontWeight: 700, display: "flex" }}>
            What&apos;s yours?
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ color: "#fff", fontSize: 30, fontWeight: 900, display: "flex" }}>Oops</div>
            <div style={{ color: accent, fontSize: 30, fontWeight: 900, fontStyle: "italic", display: "flex" }}>Cupid</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 26, fontWeight: 700, display: "flex", marginLeft: 8 }}>
              oopscupid.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
