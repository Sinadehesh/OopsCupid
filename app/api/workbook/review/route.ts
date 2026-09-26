import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAI, aiModel, aiConfigured, aiProviderName } from "@/lib/ai/client";
import { ACCESS_COOKIE, readAccessToken } from "@/lib/stripe/access";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * WEEKLY REVIEW — the thing the €49 tier is actually selling.
 *
 * Until now the workbook was 42 pages of static text with input boxes that
 * discarded everything typed into them. Reading advice you could have got
 * from a blog post is not worth €49; having someone read what YOU wrote
 * and respond to it is.
 *
 * This reads a week of the buyer's own entries and returns specific
 * feedback on them — quoting their words back, naming the pattern across
 * days, and setting one concrete task. Generic encouragement is explicitly
 * ruled out in the prompt, because a model asked to be supportive will
 * produce exactly the horoscope filler that made the old workbook feel
 * cheap.
 */

const SYSTEM = `You are reviewing a week of written exercises from someone
working through a self-guided attachment workbook. You are not their
therapist and you must not pretend to be.

You are given their own words. Respond to THOSE, not to attachment theory
in general.

Rules, in order of importance:

1. QUOTE THEM. Every observation must cite a phrase they actually wrote.
   If you cannot ground a point in their text, cut the point.
2. NAME WHAT CHANGED ACROSS THE WEEK. They wrote on several days. The
   value is in the movement between entries — a fear on day 2 that they
   contradicted on day 5, a word they keep reaching for, a situation they
   describe twice with different endings.
3. BE SPECIFIC ABOUT THE MECHANISM. Not "you have anxious attachment" —
   they know. What specifically fires, on what trigger, producing what
   behaviour, at what cost.
4. ONE TASK. A single concrete thing for next week, doable in a day,
   phrased as an action rather than an attitude.
5. NO FILLER. No "it's wonderful that you're doing this work", no
   "remember to be kind to yourself", no summarising their entries back at
   them. If a sentence would apply to any other reader, delete it.
6. SAFETY. If the writing describes fear of a partner, coercion, or
   self-harm, say so plainly in the "flag" field and keep the rest short.
   Do not diagnose. Do not speculate about anyone's mental illness.

Write in British English, second person, plain language. Roughly 400-550
words across all fields combined.

Return ONLY valid JSON:
{
  "headline": "one sentence naming the single most important thing in their week",
  "observations": [
    {"quote": "their exact words", "reading": "what it shows, in 2-3 sentences"}
  ],
  "pattern": "2-4 sentences on what connects the entries across days",
  "contradiction": "one place their entries disagree with each other, or empty string if none",
  "task": {"title": "short imperative", "detail": "2-3 sentences, concrete and doable in a day"},
  "flag": "empty string, or a plain sentence if something in the writing needs real-world support"
}`;

interface Entry {
  day: number;
  exerciseKey: string;
  content: unknown;
  createdAt: Date;
}

/** Flatten a saved exercise into readable text, dropping empty answers. */
function renderEntry(e: Entry): string {
  const c = e.content as Record<string, unknown> | null;
  if (!c || typeof c !== "object") return "";
  const parts: string[] = [];
  for (const [k, v] of Object.entries(c)) {
    if (typeof v !== "string") continue;
    const text = v.trim();
    if (text.length < 2) continue;
    parts.push(`${k.replace(/[-_]/g, " ")}: ${text}`);
  }
  if (!parts.length) return "";
  return `--- Day ${e.day} (${e.exerciseKey})\n${parts.join("\n")}`;
}

/**
 * Is the review actually wired up in this deployment?
 *
 * Deliberately says nothing secret: which provider is selected, which
 * model, and whether a key is present. Without this, a provider key that
 * was pasted into the wrong variable looks identical from the outside to a
 * model that refused — both are a 502 and a shrug.
 */
export async function GET() {
  return NextResponse.json({
    provider: aiProviderName(),
    model: aiModel(),
    keyPresent: aiConfigured(),
  });
}

export async function POST(req: NextRequest) {
  // Paid feature: the workbook is what the bundle buys.
  const claims = readAccessToken(req.cookies.get(ACCESS_COOKIE)?.value);
  if (!claims?.workbook) {
    return NextResponse.json({ error: "This review is part of the workbook bundle." }, { status: 402 });
  }

  const { workbook, week, sessionId } = await req.json().catch(() => ({} as any));
  if (typeof workbook !== "string" || typeof week !== "number") {
    return NextResponse.json({ error: "Missing workbook or week." }, { status: 400 });
  }

  let entries: Entry[];
  try {
    entries = await prisma.workbookEntry.findMany({
      where: {
        workbook,
        week,
        ...(typeof sessionId === "string" && sessionId ? { sessionId } : {}),
      },
      orderBy: [{ day: "asc" }, { createdAt: "asc" }],
      select: { day: true, exerciseKey: true, content: true, createdAt: true },
    });
  } catch (err) {
    console.error("[workbook/review] db read failed:", err);
    return NextResponse.json({ error: "Could not read your entries." }, { status: 500 });
  }

  const rendered = entries.map(renderEntry).filter(Boolean);
  if (rendered.length < 2) {
    return NextResponse.json(
      {
        error: "not-enough",
        message:
          "There isn't enough written yet to review. Finish a few more days of this week and come back — the review reads across days, so it needs more than one.",
      },
      { status: 422 }
    );
  }

  if (!aiConfigured()) {
    console.error("[workbook/review] no AI key configured");
    return NextResponse.json(
      { error: "Reviews are temporarily unavailable. Your entries are saved." },
      { status: 503 }
    );
  }

  try {
    const res = await getAI().chat.completions.create({
      model: aiModel(),
      temperature: 0.6,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: `Workbook: ${workbook}\nWeek: ${week}\nEntries written by the reader:\n\n${rendered.join("\n\n")}`,
        },
      ],
    });

    const raw = res.choices[0]?.message?.content;
    if (!raw) throw new Error("empty completion");

    return NextResponse.json({ review: JSON.parse(raw), days: entries.length });
  } catch (err: any) {
    // Never lose their work over a failed review.
    console.error("[workbook/review] generation failed:", err?.message ?? err);
    return NextResponse.json(
      { error: "The review could not be generated just now. Your entries are saved — try again shortly." },
      { status: 502 }
    );
  }
}
