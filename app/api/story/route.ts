import { storyImage } from "@/lib/share/art";
import { storyQuiz } from "@/lib/share/story";

export const dynamic = "force-dynamic";

const clean = (text: string | null, max: number) => (text ?? "").replace(/[\u0000-\u001f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

/**
 * /api/story?p=/is-my-friend-a-pick-me&t=Pick-me%20energy&s=9&l=of%2012
 * Her result as a 1080x1920 card for an Instagram or TikTok Story. The
 * quiz must be one of ours (p), and its title and colours come from our
 * own data; only her result line and score come from the link.
 */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const path = clean(u.searchParams.get("p"), 80);
  const quiz = storyQuiz(path);
  if (!quiz) return new Response("Not found", { status: 404 });
  const result = clean(u.searchParams.get("t"), 70) || "My result";
  const raw = clean(u.searchParams.get("s"), 8);
  const n = raw === "" ? NaN : Number(raw);
  const label = clean(u.searchParams.get("l"), 16);
  const score = Number.isFinite(n) ? `${Math.round(n)}${label ? ` ${label}` : ""}` : undefined;
  return storyImage({ ...quiz, path, result, score }, u.origin);
}
