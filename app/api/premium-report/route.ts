import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const openai = new OpenAI();
    const body = await req.json();
    const { primaryArchetype, normalizedScores } = body;
    
    let systemPrompt = `You are an elite, highly sought-after behavioral strategist. Your tone is validating, warm, but profoundly insightful. STRICT WRITING RULES: ZERO EMDASHES. Frame their pattern as a "learned strategy that once protected you but is now costing you X."`;
    
    let userPrompt = `
      USER DATA: Primary Result: ${primaryArchetype}
      Exact Scores: Avoidance: ${normalizedScores?.avoidance || 0}, Anxiety: ${normalizedScores?.anxiety || 0}
      
      TASK: Write a premium, life-changing breakdown.
      
      RETURN STRICTLY AS JSON:
      {
        "validationLayer": "2 paragraphs. Use 2nd person. Call out their exact scores. Make them feel impressive and emotionally resilient.",
        "fearLayer": "1 paragraph. Name the specific risk their profile creates. Frame it as a learned strategy.",
        "hopeLayer": "3 paragraphs. Tell them healing is fast. Give 2 named action steps. End with: 'You already took the hardest step. The rest is just execution.'"
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.8, 
    });

    const aiContent = response.choices[0].message.content;
    return NextResponse.json({ success: true, report: JSON.parse(aiContent || "{}") });

  } catch (error: any) {
    console.error("AI Error:", error);
    // Give a clear error message back to the frontend instead of failing silently
    return NextResponse.json({ error: error.message || "Generation Failed" }, { status: 500 });
  }
}
