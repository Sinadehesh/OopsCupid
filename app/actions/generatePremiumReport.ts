"use server";

import OpenAI from "openai";

export async function generatePremiumReport(primaryArchetype: string, anxiety: number, avoidance: number) {
  try {
    const openai = new OpenAI();

    const systemPrompt = `You are an elite, highly sought-after behavioral strategist. 
    Your tone is incredibly validating, warm, but profoundly insightful. 
    STRICT WRITING RULES: ZERO EMDASHES OR ENDASHES. Use commas or shorter sentences.`;
    
    const userPrompt = `
      USER DATA:
      Primary Result: ${primaryArchetype}
      Exact Scores: Avoidance: ${avoidance}, Anxiety: ${anxiety}
      
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
    return { success: true, report: JSON.parse(aiContent || "{}") };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, error: error.message || "Failed to generate AI report" };
  }
}
