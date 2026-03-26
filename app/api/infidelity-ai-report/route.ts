import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { result } = await req.json();
    if (!result) return NextResponse.json({ success: false }, { status: 400 });

    const score = result.score ?? 65;
    const riskLevel = result.riskLevel ?? "ELEVATED";
    const digital = result.vectors?.digital ?? 60;
    const chronological = result.vectors?.chronological ?? 60;
    const intimacy = result.vectors?.intimacy ?? 60;
    const micro = result.vectors?.micro ?? 60;

    const systemPrompt = `You are a forensic relationship psychologist and deception specialist. 
You have studied 10,000+ infidelity cases and trained therapists on behavioral detection. 
You write with authority, empathy, and brutal honesty — never sugarcoating, never catastrophizing. 
You speak directly to a woman who is scared, confused, and deserves to know the truth. 
Your tone: clinical but warm, like a wise older sister who is also a forensic expert. 
No bullet points. Rich paragraphs only, 3-5 sentences each. 
Every insight must feel written specifically for HER scores — not generic relationship advice.`;

    const userPrompt = `A woman just completed the infidelity behavioral diagnostic. Her scores:
- Overall deception probability: ${score}/100
- Risk Level: ${riskLevel}
- Digital Footprint vector: ${digital}/100 (phone secrecy, app switching, notification hiding)
- Time & Schedule vector: ${chronological}/100 (unexplained absences, vague whereabouts)
- Emotional Intimacy vector: ${intimacy}/100 (coldness, deflection, guilt projection)
- Micro-Deception vector: ${micro}/100 (small lies, story inconsistencies, defensiveness)

Write exactly 7 JSON fields. Each is a single rich paragraph (3-5 sentences). Make every word count.

1. verdictInsight — Based on her score of ${score}/100 at ${riskLevel} level: what does this combination of vectors actually mean? Is she being paranoid, or is her gut right? Be direct and validating. Name what this pattern clinically represents.

2. digitalInsight — Her digital score is ${digital}/100. Explain exactly what behaviors at this score level look like in real life. What specific things is he likely doing on his phone? What does it mean psychologically when a man hides his digital life?

3. scheduleInsight — Her schedule/time score is ${chronological}/100. Explain what this score reveals about his movements and explanations. What does clinical research say about how cheaters manage their time? What specific inconsistencies should she be watching for?

4. intimacyInsight — Her intimacy/emotional score is ${intimacy}/100. This is the most psychologically complex vector. Explain how emotional withdrawal and guilt projection work as a defense mechanism in men who are cheating. What does this feel like for the woman on the receiving end? Why do women often blame themselves?

5. microInsight — Her micro-deception score is ${micro}/100. Explain what micro-deceptions are and why they are actually MORE revealing than big lies. What specific patterns at this score level should she document? Why do liars use micro-deceptions as a buffer strategy?

6. confrontationScript — Write a word-for-word psychological confrontation script she can use TODAY. It should use a technique that forces a reaction without tipping him off. Include exactly what to say, when to pause, and what to watch for in his response. Make it feel like a superpower she now has.

7. nextStepsInsight — Based on her specific score combination (${score}, ${riskLevel}), write her exact 5-day action protocol. Day 1 through Day 5 — specific, actionable, emotionally intelligent. End with one sentence that makes her feel strong and clear-headed.

Respond ONLY with valid JSON:
{
  "verdictInsight": "...",
  "digitalInsight": "...",
  "scheduleInsight": "...",
  "intimacyInsight": "...",
  "microInsight": "...",
  "confrontationScript": "...",
  "nextStepsInsight": "..."
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 2200,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    const insights = JSON.parse(raw);
    return NextResponse.json({ success: true, insights });
  } catch (err) {
    console.error("[infidelity-ai-report]", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
