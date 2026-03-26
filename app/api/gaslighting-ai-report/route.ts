import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { result } = await req.json();
    if (!result) return NextResponse.json({ success: false }, { status: 400 });

    const topTactic = result.subscales[0]?.label ?? "Reality Denial";
    const secondTactic = result.subscales[1]?.label ?? "Invalidation";
    const thirdTactic = result.subscales[2]?.label ?? "Blame Reversal";
    const criticalFlags = result.criticalFlags ?? 0;
    const level = result.level ?? 0;
    const tacticsPct = Math.round((result.tacticsScore / result.tacticsMax) * 100);
    const impactPct = Math.round((result.impactScore / result.impactMax) * 100);

    const systemPrompt = `You are a trauma-informed clinical psychologist specializing in coercive control and emotional abuse. 
You write with deep empathy, clarity, and professional authority. 
Your tone: validating, direct, warm — never clinical-cold. You speak to the reader as a person who matters, not a case.
You do NOT use bullet points. You write in rich, flowing paragraphs of 3-5 sentences each.
Each insight must feel personally written for THIS person's exact scores, not generic.`;

    const userPrompt = `A user just completed the 50-question gaslighting audit. Here are their results:
- Overall level: ${level} out of 5 (${result.levelData.title})
- Tactics Score: ${result.tacticsScore}/${result.tacticsMax} (${tacticsPct}%)
- Impact/Erosion Score: ${result.impactScore}/${result.impactMax} (${impactPct}%)
- Critical flags triggered: ${criticalFlags}/10
- Top 3 manipulation tactics detected: 1. ${topTactic}, 2. ${secondTactic}, 3. ${thirdTactic}
- All subscale scores: ${result.subscales.map((s: any) => `${s.label}: ${Math.round(s.pct)}%`).join(", ")}

Write exactly 6 JSON fields, each a single paragraph (3-5 sentences):

1. tacticsInsight — Explain what their mind-games score means specifically. What does a ${tacticsPct}% tactics score indicate about his behavior patterns? Make it validating and clear.

2. impactInsight — Explain their erosion score of ${impactPct}%. What does this level of mental erosion actually feel like day-to-day? How long does this damage typically last without intervention?

3. subscaleInsight — Explain the combination of ${topTactic}, ${secondTactic}, and ${thirdTactic} as a system. How do these three tactics work together to trap someone in confusion? This is the most important section — make it revelatory.

4. redFlagInsight — Explain what ${criticalFlags} critical flags out of 10 means in real terms. If high (5+), be direct that this is serious. If low (0-2), explain that doesn't mean they're imagining it — frequency matters more than severity sometimes.

5. erosionProfileInsight — Based on the combination of their tactics and impact scores, describe their unique erosion profile. What specific psychological mechanisms are at work? How has this person been systematically taught to doubt themselves?

6. actionInsight — Write a warm, direct, empowering paragraph telling them exactly what their first 3 moves should be, based on their specific level (${level}) and top tactic (${topTactic}). End with one sentence that makes them feel capable of getting out of the fog.

Respond ONLY with valid JSON like:
{
  "tacticsInsight": "...",
  "impactInsight": "...",
  "subscaleInsight": "...",
  "redFlagInsight": "...",
  "erosionProfileInsight": "...",
  "actionInsight": "..."
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 1800,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const insights = JSON.parse(raw);
    return NextResponse.json({ success: true, insights });
  } catch (err) {
    console.error("[gaslighting-ai-report]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
