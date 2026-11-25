import { deckFor } from "@/lib/share/plays";
import { slideImage } from "@/lib/share/art";

export const dynamic = "force-dynamic";

/** /slides/<slug>/<n>.png: one slide of a slideshow (a quiz's or a play-along post), from 1. Add ?size=feed for Instagram's 4:5 feed. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string; file: string }> }) {
  const { slug, file } = await params;
  const k = deckFor(slug);
  const n = Number(file.replace(/\.png$/, ""));
  if (!k || !file.endsWith(".png") || !Number.isInteger(n) || n < 1 || n > k.slides.length) {
    return new Response("Not found", { status: 404 });
  }
  const url = new URL(req.url);
  return slideImage(k, n - 1, url.origin, url.searchParams.get("size") === "feed");
}
