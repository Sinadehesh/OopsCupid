import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  // 🚨 FIX: Moved inside the function and added a build-safe fallback!
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy-key-for-build-process",
  });

  try {
    const body = await req.json();
    const { quizType, primaryArchetype, secondaryArchetype, normalizedScores, useRiskIndex } = body;

    // 🔥 THE ELITE PROFILER PERSONA 🔥
    let systemPrompt = `You are a world-class clinical psychologist and behavioral strategist. Your tone is radically honest, deeply insightful, highly articulate, and unfiltered. 
    You do not use clinical jargon; you use sharp, hitting, and profound language. 
    Your goal is to give the user a "jaw-dropping" revelation about their social life. Make them feel incredibly seen, validated, but completely exposed.
    Do NOT tell them to "share this report"—make the writing so profoundly accurate and actionable that they naturally want to screenshot it.`;
    
    let userPrompt = "";

    if (quizType === "are-your-friends-using-you") {
      userPrompt = `
        ANALYSIS SUBJECT: Friendship Exploitation & Transactional Dynamics.
        PRIMARY ROLE: ${primaryArchetype} | SECONDARY VULNERABILITY: ${secondaryArchetype}
        OVERALL EXPLOITATION RISK: ${useRiskIndex}/100
        EXACT VECTOR SCORES (0-100 severity): ${JSON.stringify(normalizedScores)}
        
        TASK: Write a master-level psychological audit. 
        
        REQUIREMENTS FOR JSON SECTIONS:
        
        1. "theColdRead" (3 paragraphs): Based on their specific high/low scores, explain *why* they attract this dynamic. What is their hidden fear? Make it profound.
        
        2. "theHarshTruth" (3 bullet points): The specific, undeniable behavioral loops their friends use against them. Name the manipulation tactics directly based on their data. Do not pull punches.
        
        3. "tacticalPlaybook" (3 highly specific steps + 2 text scripts): Do not give generic advice like "set boundaries." Give them a tactical, phased protocol. Include 2 copy-paste text scripts that are lethal, polite, and impossible to argue with.

        RETURN STRICTLY AS JSON:
        {
          "theColdRead": "string (formatted with line breaks)",
          "theHarshTruth": "string (formatted with bullet points)",
          "tacticalPlaybook": "string (formatted with clear headings and scripts)"
        }
      `;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.85,
    });

    const aiContent = response.choices[0].message.content;
    return NextResponse.json({ success: true, report: JSON.parse(aiContent || "{}") });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Generation Failed" }, { status: 500 });
  }
}
