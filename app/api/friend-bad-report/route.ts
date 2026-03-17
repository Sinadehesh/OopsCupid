import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// FIX: Switch to the Edge runtime. This prevents the "output: export" build crash 
// caused by force-dynamic, and is heavily optimized for OpenAI on Vercel.
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const openai = new OpenAI();
    const { data } = await req.json();

    const prompt = `
    You are an elite psychological profiler and direct-response behavioral strategist charging $10,000/hour. 
    The user just completed the "Are My Friends Bad For Me?" assessment.
    
    Diagnostic Tier: "${data.tier}"
    Highest Vulnerability: "${data.top1}"
    Risk Breakdown:
    ${data.sortedSubcategories.map((s: any) => `- ${s.name}: ${s.percentage}% Risk`).join('\n')}

    Your objective is to generate a hyper-personalized, brutal, but highly actionable insights report.
    You must optimize the report using these principles:
    1. THE PAIN IS THE PITCH: Accurately articulate the specific pain and frustration of their current patterns. Make them feel perfectly understood.
    2. ZERO FLUFF: Do not use generic self-help clichés (e.g., "journey," "authentic self"). Speak with absolute certainty, utilizing sharp behavioral terminology.
    3. DECREASE EFFORT & SACRIFICE: The scripts provided must be low-friction and immediately actionable.

    Format the response STRICTLY as a JSON object with the following keys:
    {
      "howTheyUseYou": "The Sharp Truth (2 paragraphs). Explain exactly how their friends are exploiting their top vulnerability right now. Expose the hidden 'why' behind their friends' behavior without clinical diagnoses.",
      "whatKeepsYouStuck": "The Cost (1 paragraph). Describe the specific psychological trap (like guilt, fear of loneliness, or boundary collapse) keeping them in this loop, and the toll it takes on their peace.",
      "softScript": "The Pivot: Low Friction. A 1-sentence polite but firm text message they can copy-paste to buy time or set a boundary without triggering immediate confrontation.",
      "firmScript": "The Pivot: High Authority. A 1-sentence lethal, emotionally detached text message they can copy-paste to shut it down when a friend actively crosses a line."
    }
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: "json_object" },
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const aiData = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(aiData);

  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate AI report." }, { status: 500 });
  }
}
