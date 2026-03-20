"use server";

import OpenAI from "openai";

export async function generatePremiumReport(primaryArchetype: string, anxiety: number, avoidance: number) {
  try {
    const openai = new OpenAI();
    
    const systemPrompt = `You are an elite behavioral strategist specializing in relational power dynamics and attachment extraction. Your tone is clinical, lethal, highly authoritative, yet validating. You speak in cold, hard facts. STRICT WRITING RULES:
1. NO EMDASHES. Use commas or periods.
2. Format using HTML tags (<p>, <b>, <ol>, <li>, <blockquote>) for high readability.
3. Output strictly as JSON.`;
    
    const userPrompt = `USER ATTACHMENT DATA: Primary Archetype: ${primaryArchetype}, Anxiety Score: ${anxiety}, Avoidance Score: ${avoidance}.
      Analyze this specific profile and RETURN STRICTLY AS JSON matching this schema:
      {
        "harshTruth": "<p>2 paragraphs analyzing the exact subconscious mind games being played against them, why their nervous system self-sabotages, and the specific toxic profile they are naturally a magnet for.</p>",
        "tacticalPlaybook": "<p>A simple, brutal 3-step action plan on exactly what to do next to shift the power dynamic back in their favor within 24 hours. Format as an HTML ordered list <ol><li><b>Step 1: [Name]</b> - [Instruction]</li>...</ol></p>",
        "textScripts": "<p>Provide 2 specific boundary-testing scenarios for this archetype. Under each, provide the exact, copy-paste text message they should send. The texts must be polite, cold, emotionally detached, and impossible to argue with. Wrap the texts in <blockquote> tags.</p>"
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
