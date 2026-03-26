import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { result } = await req.json();
    if (!result) return NextResponse.json({ error: 'No result provided' }, { status: 400 });

    const subscaleLines = result.subscales
      .map((s: any) => `  - ${s.label}: ${Math.round(s.pct)}% (score ${s.score}/${s.max})`)
      .join('\n');

    const prompt = `You are a world-class relationship psychologist writing a deeply personalized report for someone who just completed a self-sabotage assessment.

Here is their full result data:
- Archetype: "${result.archetype}"
- Severity Level: ${result.level}/5 (${result.levelData.title})
- Total Score: ${result.totalScore}/${result.maxScore}
- Critical Flags: ${result.criticalFlags}
- Primary Driver: ${result.topDrivers[0]?.label} (${Math.round(result.topDrivers[0]?.pct)}%)
- Secondary Driver: ${result.topDrivers[1]?.label} (${Math.round(result.topDrivers[1]?.pct)}%)

Subscale Scores:
${subscaleLines}

Composites:
  - Anxious Pattern: ${result.composites.anxiousPattern}/80
  - Avoidant Pattern: ${result.composites.avoidantPattern}/80
  - Vulnerability Score: ${result.composites.vulnerabilityScore}/80
  - Defense Score: ${result.composites.defenseScore}/120
  - Self-Worth Core: ${result.composites.selfWorthCore}/40

Write exactly 7 personalized insight blocks. Each block must be specific to this person's EXACT scores — not generic. Use second person ("you", "your"). Be warm but direct. Use psychological depth. No fluff.

Return ONLY a valid JSON object with exactly these 7 keys:
{
  "archetypeInsight": "3-4 sentences deeply explaining what their archetype means for them personally, referencing their specific dominant scores",
  "subscaleInsight": "3-4 sentences interpreting their 5-axis radar — what the shape of their profile reveals, which axes are dangerously high and why",
  "anxiousAvoidantInsight": "3-4 sentences on their anxious vs avoidant balance — what this split means for their day-to-day relationship behavior",
  "populationInsight": "2-3 sentences on what their percentile position means — are they in the dangerous zone, the common zone, or the rare zone, and what that implies",
  "topDriversInsight": "3-4 sentences on how their top 2 drivers interact with each other — the compound effect when both fire simultaneously",
  "coreWoundInsight": "3-4 sentences identifying the likely childhood or developmental root of their pattern, based on their subscale combination — be specific and compassionate",
  "actionInsight": "4-5 sentences of the single most important behavioral change they can make RIGHT NOW — specific, actionable, tied to their exact archetype and scores. This should feel like advice from the best therapist they've ever had."
}

Do not add any text outside the JSON. No markdown. No explanation. Pure JSON only.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.75,
      max_tokens: 1800,
      response_format: { type: 'json_object' },
    });

    const raw = completion.choices[0].message.content ?? '{}';
    const insights = JSON.parse(raw);

    return NextResponse.json({ success: true, insights });
  } catch (err: any) {
    console.error('AI report error:', err.message ?? err);
    return NextResponse.json({ error: 'Failed to generate AI insights', details: err.message }, { status: 500 });
  }
}
