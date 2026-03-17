import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Force dynamic rendering so Next.js doesn't try to statically evaluate this at build time
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // Initialize OpenAI INSIDE the request handler to avoid build-time crashes
    const openai = new OpenAI();

    const { data } = await req.json();

    const prompt = `
    Act as a brutally honest, high-end behavioral psychologist. The user just took an "Are My Friends Bad For Me?" test.
    Their overall diagnostic tier is: "${data.tier}".
    Their #1 highest vulnerability/pain point is: "${data.top1}".
    Here is the full breakdown of their risk percentages across 10 vectors:
    ${data.sortedSubcategories.map((s: any) => `- ${s.name}: ${s.percentage}% Risk`).join('\n')}

    Based on these exact scores, write a highly personalized, emotionally hitting action plan. 
    Use short sentences. Be direct. Do not use academic filler. Hit their exact pain points.
    
    Format the response STRICTLY as a JSON object with the following keys:
    {
      "howTheyUseYou": "A 2-paragraph brutally honest explanation of exactly how their friends are exploiting their top vulnerabilities right now.",
      "whatKeepsYouStuck": "A 1-paragraph explanation of the specific psychological trap (like guilt, fear of loneliness, or people-pleasing) keeping them in this toxic circle.",
      "softScript": "A 1-sentence polite but firm text message they can copy-paste to set a boundary when a friend asks for a favor.",
      "firmScript": "A 1-sentence lethal, shut-it-down text message they can copy-paste when a friend crosses the line or gaslights them."
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
