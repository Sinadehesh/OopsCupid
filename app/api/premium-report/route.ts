import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = 'edge';

export async function POST(req: Request) {
  const openai = new OpenAI();

  try {
    const body = await req.json();
    const { quizType, primaryArchetype, secondaryArchetype, normalizedScores, useRiskIndex, loveStyle, schema } = body;

    // THE ELITE PROFILER PERSONA (System Prompt)
    let systemPrompt = `You are an elite, $10,000/hour psychological profiler and direct-response behavioral strategist. 
    Your objective is to generate a hyper-personalized, premium-quality insights report that makes the user feel profoundly seen, validated, and completely exposed. 

    CORE DIRECTIVES:
    1. RADICAL HONESTY: Do not use clinical jargon, vague affirmations, or generic self-help clichés (ban words like: "journey," "authentic self," "you are enough," "toxic"). Use sharp, hard-hitting, behavioral terminology.
    2. THE PAIN IS THE PITCH: Describe their specific relationship pain points better than they can describe them themselves. 
    3. EFFORT & SACRIFICE: When providing actionable advice (like text scripts), make it radically low-friction. It must require almost zero emotional exertion for them to execute today.
    4. NO FLUFF: Do not write preamble or introductory filler. Speak with absolute objective authority.`;
    
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
          "theColdRead": "string (formatted with HTML <br/><br/> for line breaks)",
          "theHarshTruth": "string (formatted as an HTML <ul> list)",
          "tacticalPlaybook": "string (formatted with HTML <br/><br/> for line breaks and <strong> for scripts)"
        }
      `;
    } else if (quizType === "attachment-style") {
      userPrompt = `
        ANALYSIS SUBJECT: Attachment Style, Subconscious Trauma Loops, & Attraction Magnets.
        PRIMARY ATTACHMENT: ${primaryArchetype}
        LOVE STYLE: ${loveStyle || "Unknown"}
        PRIMARY SCHEMA/TRAUMA: ${schema || "Fear of Abandonment"}
        
        TASK: Write a master-level psychological premium audit based on these specific traits. Format your response STRICTLY as a JSON object with the exact keys below.
        
        REQUIREMENTS FOR JSON SECTIONS:
        
        1. "thePlaybook": Write a tactical deep dive (2 paragraphs) into the exact mind games their ${primaryArchetype} brain plays on them to self-sabotage. Explain how their nervous system confuses anxiety with love. Then, provide 2 exact, copy-paste text scripts they can use today to set a boundary without triggering immediate confrontation. Format scripts clearly.
        
        2. "attractionMagnets": Provide 3 bullet points. Explain exactly which specific toxic personality profiles they naturally attract, WHY those manipulators specifically target their ${primaryArchetype} traits, and the exact subtle red flags they are currently ignoring because it feels "familiar."
        
        3. "traumaLoop": Write a 2-paragraph deep analysis of their '${schema}' schema. Explain the probable childhood or past-relationship dynamic that programmed this emotional trigger. Explain the psychological mechanism of how to "delete" or overwrite this trigger by proving safety to their nervous system.
        
        4. "extractionPlan": Explain exactly why their '${loveStyle}' love style keeps them stuck in painful relationship loops. Provide a step-by-step, 3-phase behavioral plan (Actionable Micro-Steps) to rewire their attraction today. Do not tell them to "do the inner work." Tell them exactly what to DO in a real-world scenario.

        RETURN STRICTLY AS JSON:
        {
          "thePlaybook": "string (formatted with HTML <br/><br/> for line breaks and <strong> for script quotes)",
          "attractionMagnets": "string (formatted as an HTML <ul> list)",
          "traumaLoop": "string (formatted with HTML <br/><br/> for line breaks)",
          "extractionPlan": "string (formatted as an HTML <ol> list)"
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
