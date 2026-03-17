import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = 'edge';

export async function POST(req: Request) {
  const openai = new OpenAI();

  try {
    const body = await req.json();
    const { quizType, primaryArchetype, secondaryArchetype, normalizedScores, useRiskIndex, loveStyle, schema } = body;

    // THE ELITE PROFILER PERSONA
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
        2. "theHarshTruth" (3 bullet points): The specific, undeniable behavioral loops their friends use against them. Name the manipulation tactics directly based on their data.
        3. "tacticalPlaybook" (3 highly specific steps + 2 text scripts): A tactical, phased protocol. Include 2 copy-paste text scripts that are lethal, polite, and impossible to argue with.

        RETURN STRICTLY AS JSON:
        {
          "theColdRead": "string (formatted with line breaks)",
          "theHarshTruth": "string (formatted with bullet points)",
          "tacticalPlaybook": "string (formatted with clear headings and scripts)"
        }
      `;
    } else if (quizType === "attachment-style") {
      userPrompt = `
        ANALYSIS SUBJECT: Attachment Style, Subconscious Trauma Loops, & Attraction Magnets.
        PRIMARY ATTACHMENT: ${primaryArchetype}
        LOVE STYLE: ${loveStyle || "Unknown"}
        PRIMARY SCHEMA/TRAUMA: ${schema || "Fear of Abandonment"}
        
        TASK: Write a master-level psychological premium audit based on these specific traits.
        
        REQUIREMENTS FOR JSON SECTIONS:
        
        1. "thePlaybook": A tactical deep dive into the exact mind games their ${primaryArchetype} brain plays on them to self-sabotage, plus 2 copy-paste text scripts they need to set boundaries today.
        2. "attractionMagnets": Explain exactly which toxic personalities they naturally attract, why those specific manipulators target their ${primaryArchetype} traits, and the red flags they are currently ignoring.
        3. "traumaLoop": A deep analysis of their '${schema}' schema. Explain the exact childhood/past dynamic that programmed this emotional trigger and the psychology of how to delete it.
        4. "extractionPlan": Explain why their '${loveStyle}' love style keeps them stuck in transactional or painful loops, and provide a step-by-step, 3-phase behavioral plan to rewire their attraction today.

        RETURN STRICTLY AS JSON:
        {
          "thePlaybook": "string (formatted with line breaks and bolded script quotes)",
          "attractionMagnets": "string (bullet points of toxic traits they attract and why)",
          "traumaLoop": "string (deep psychological analysis)",
          "extractionPlan": "string (3 actionable, numbered steps)"
        }
      `;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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
