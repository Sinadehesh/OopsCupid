"use server";

import OpenAI from "openai";

export async function generatePremiumReport(primaryArchetype: string, anxiety: number, avoidance: number) {
  try {
    const openai = new OpenAI();
    const systemPrompt = `You are an elite behavioral strategist specializing in relational extraction. Your tone is clinical, lethal, but deeply validating. STRICT WRITING RULES: NO EMDASHES. Use commas or periods. You must provide: The Harsh Truth, The Playbook, and Text Scripts in JSON format.`;
    const userPrompt = `USER DATA: Archetype: ${primaryArchetype}, Anxiety Score: ${anxiety}, Avoidance Score: ${avoidance}.
      RETURN STRICTLY AS JSON:
      {
        "harshTruth": "2 paragraphs naming the exact behavioral loops and mind games in play.",
        "tacticalPlaybook": "3 numbered steps. Focus on immediate power-retrieval.",
        "textScripts": "2 scenarios. Provide verbatim quotes."
      }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
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
