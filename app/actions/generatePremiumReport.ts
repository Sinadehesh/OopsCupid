"use server";

import OpenAI from "openai";

export async function generatePremiumReport(primaryArchetype: string, anxiety: number, avoidance: number) {
  try {
    const openai = new OpenAI();

    const systemPrompt = `You are an elite behavioral strategist specializing in relational extraction. 
    Your tone is clinical, lethal, but deeply validating. 
    
    STRICT WRITING RULES:
    1. NO EMDASHES. Use commas or periods.
    2. THE 3 PILLARS: You must provide:
       - The Harsh Truth: A raw look at how they are being manipulated or self-sabotaging.
       - The Playbook: 3 specific tactical steps to take immediately.
       - Text Scripts: 2 verbatim text messages they can use to set boundaries.
    3. Use professional, high-status language.`;
    
    const userPrompt = `
      USER DATA:
      Archetype: ${primaryArchetype}
      Anxiety Score: ${anxiety}/100
      Avoidance Score: ${avoidance}/100
      
      TASK: Generate the Ultimate Clarity Bundle report.
      
      RETURN STRICTLY AS JSON:
      {
        "harshTruth": "2 paragraphs naming the exact behavioral loops and mind games in play.",
        "tacticalPlaybook": "3 numbered steps. Focus on immediate power-retrieval.",
        "textScripts": "2 scenarios (e.g., 'When they go silent' and 'When they demand more'). Provide verbatim quotes."
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
    return { success: true, report: JSON.parse(aiContent || "{}") };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, error: error.message };
  }
}
