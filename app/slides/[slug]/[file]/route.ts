import { kitEntry } from "@/lib/share/kit";
import { slideImage } from "@/lib/share/art";

export const dynamic = "force-dynamic";

/** /slides/<slug>/<n>.png: one slide of a quiz's TikTok slideshow, from 1. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string; file: string }> }) {
  const { slug, file } = await params;
  const k = kitEntry(slug);
  const n = Number(file.replace(/\.png$/, ""));
  if (!k || !file.endsWith(".png") || !Number.isInteger(n) || n < 1 || n > k.slides.length) {
    return new Response("Not found", { status: 404 });
  }
  return slideImage(k, n - 1, new URL(req.url).origin);
}
