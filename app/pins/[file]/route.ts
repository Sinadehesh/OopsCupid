import { kitEntry } from "@/lib/share/kit";
import { pinImage } from "@/lib/share/art";

export const dynamic = "force-dynamic";

/** /pins/<slug>.png: the Pinterest pin for one quiz. */
export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const k = file.endsWith(".png") ? kitEntry(file.slice(0, -4)) : undefined;
  if (!k) return new Response("Not found", { status: 404 });
  return pinImage(k, new URL(req.url).origin);
}
