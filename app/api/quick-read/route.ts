import { NextRequest, NextResponse } from "next/server";
import { getAI, aiModel, aiConfigured } from "@/lib/ai/client";
import { tidy } from "@/lib/ai/tidy";
import { ACCESS_COOKIE, readAccessToken, canRead } from "@/lib/stripe/access";
import { tickTestBySlug, scoreTick } from "@/lib/quizzes/tickTests";
import { versusBySlug, scoreVersus, type Pick } from "@/lib/quizzes/versus";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * THE QUICK READ, the €2.99 add-on to a forty-second test.
 *
 * A written read of exactly what she ticked: what the ticks say together,
 * the one to watch, a message she could send, one thing to do this week.
 * Only for someone who has bought it for this test, or who holds the
 * €9.99 report (which unlocks every report on the site, reads included).
 *
 * Versus games send "Person A" and "Person B", never the names she typed:
 * the names are put back in the browser.
 */

const RULES = `Rules:
- Ground every point in what they ticked or guessed. Quote their items.
- Count and interpret; never diagnose anyone, never state someone's
  psychology or intentions as fact. Say "this pattern usually means",
  not "he is a narcissist".
- Warm, direct, specific. No filler, no "remember to be kind to yourself",
  nothing that would apply to any other reader.
- British English, second person. Never use em dashes or en dashes.
- If anything they picked points to control, fear or harm, say plainly in
  "flag" that it is worth talking to someone outside the relationship
  (in the UK, Refuge: 0808 2000 247). Otherwise "flag" is "".
- About 220 to 300 words across all fields.`;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as any));
  const { kind, slug, picks } = body ?? {};
  if (typeof slug !== "string" || (kind !== "tick" && kind !== "versus")) {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const claims = readAccessToken(req.cookies.get(ACCESS_COOKIE)?.value);
  if (!canRead(claims, slug)) {
    return NextResponse.json({ error: "locked" }, { status: 402 });
  }
  if (!aiConfigured()) {
    return NextResponse.json({ error: "Reads are unavailable for a moment. Please try again shortly." }, { status: 503 });
  }

  let system: string;
  let user: string;

  if (kind === "tick") {
    const test = tickTestBySlug(slug);
    if (!test || !Array.isArray(picks)) return NextResponse.json({ error: "Bad request." }, { status: 400 });
    const r = scoreTick(test, picks.filter((p: unknown) => typeof p === "string"));
    if (r.count === 0) return NextResponse.json({ error: "Tick at least one to get a read." }, { status: 422 });
    system = `You write a short personal read for someone who just took a quick
self-check called "${test.question}". ${test.fun ? "This one is light-hearted: keep the tone playful and affectionate, with one genuinely useful insight." : "Take it seriously and be kind."}

${RULES}

Return ONLY valid JSON:
{
  "headline": "one sentence naming the most important thing in what they ticked",
  "together": "2 short paragraphs on what their ticks say together, quoting them",
  "watch": {"item": "the single tick to watch most, quoted exactly", "why": "2 sentences"},
  "say": {"intro": "one sentence on when to use it", "message": "a message they could actually send or say, under 40 words"},
  "step": "one concrete thing to do this week, 1 to 2 sentences",
  "flag": ""
}`;
    user = `They ticked ${r.count} of ${r.total}:\n${r.groups
      .map((g) => `${g.label}:\n${g.items.map((i) => `- ${i.text}`).join("\n")}`)
      .join("\n\n")}`;
  } else {
    const game = versusBySlug(slug);
    if (!game || !picks || typeof picks !== "object") return NextResponse.json({ error: "Bad request." }, { status: 400 });
    const clean: Record<string, Pick> = {};
    for (const c of game.cards) {
      const p = (picks as Record<string, unknown>)[c.id];
      if (p === "a" || p === "b" || p === "both" || p === "neither") clean[c.id] = p;
    }
    const r = scoreVersus(game, clean);
    const who = (p?: Pick) =>
      p === "a" ? "Person A" : p === "b" ? "Person B" : p === "both" ? "both of them" : "neither";
    system = `You write a short personal read for someone who just played "${game.title}":
they named two people (${game.roleA} is "Person A", ${game.roleB} is "Person B") and
guessed who would say or do each thing. Always refer to them as "Person A" and
"Person B" exactly; the real names are added later. Be clear that this is built
from their own guesses.

${RULES}

Return ONLY valid JSON:
{
  "headline": "one sentence on the real difference between them",
  "personA": "2 to 3 sentences on Person A, quoting the guesses",
  "personB": "2 to 3 sentences on Person B, quoting the guesses",
  "difference": "one paragraph on what the contrast shows them",
  "say": {"to": "A or B", "intro": "one sentence on why", "message": "something they could say to that person, under 40 words"},
  "step": "one concrete thing to do this week, 1 to 2 sentences",
  "flag": ""
}`;
    user = `Scores (0 to 100): Person A ${r.a.score} (${r.a.tier.label}), Person B ${r.b.score} (${r.b.tier.label}).
Trait scores A: ${r.a.traits.map((t) => `${t.label} ${t.score}`).join(", ")}.
Trait scores B: ${r.b.traits.map((t) => `${t.label} ${t.score}`).join(", ")}.

Their guesses:
${game.cards
  .map((c) => `- ${c.situation}: ${c.line} [${c.good ? "green flag" : "red flag"}] -> ${who(clean[c.id])}`)
  .join("\n")}`;
  }

  try {
    const res = await getAI().chat.completions.create({
      model: aiModel(),
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    const raw = res.choices[0]?.message?.content;
    if (!raw) throw new Error("empty completion");
    return NextResponse.json({ read: tidy(JSON.parse(raw)) });
  } catch (err: any) {
    console.error("[quick-read] failed:", err?.status ?? "", err?.message ?? err);
    return NextResponse.json(
      { error: "Your read couldn't be written just now. You've paid for it and it's saved: tap to try again." },
      { status: 502 }
    );
  }
}
