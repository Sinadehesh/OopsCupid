"use server";

import OpenAI from "openai";

export async function generatePremiumReport(profile: any, demographics: any) {
  try {
    const openai = new OpenAI();
    
    const status = demographics?.isSingle ? "Single" : "In a relationship / Married";
    const kids = demographics?.hasChildren ? "Has children" : "No children";
    const gender = demographics?.gender || "Unknown";

    const systemPrompt = `You are a world-class behavioral analyst. You speak with deep empathy but brutal honesty. You do not talk like a therapist. You talk like a highly observant friend who just read their diary.

STRICT WRITING RULES:
1. Write strictly at a 3rd-grade reading level. Use short, punchy sentences. Use simple words.
2. NEVER use em dashes. Use periods or commas.
3. NEVER use AI words like "delve", "moreover", "tapestry", "navigate", or "crucial".
4. State their life as fact. Do not say "If you are single..." Say "Because you are single..."
5. Make it LONG. People are paying for detail. Give them rich, specific examples of how they act.
6. Format using HTML tags (<p>, <b>, <ul>, <li>). Do NOT use markdown.
7. Output strictly as JSON.`;
    
    const userPrompt = `USER DATA:
    Relationship Status: ${status}
    Parental Status: ${kids}
    Gender: ${gender}
    
    ATTACHMENT SCORES:
    Mother: ${profile.mother?.classification} (Anx: ${profile.mother?.anxietyScore}, Avo: ${profile.mother?.avoidanceScore})
    Father: ${profile.father?.classification} (Anx: ${profile.father?.anxietyScore}, Avo: ${profile.father?.avoidanceScore})
    Romantic: ${profile.romantic?.classification} (Anx: ${profile.romantic?.anxietyScore}, Avo: ${profile.romantic?.avoidanceScore})
    Work: ${profile.work?.classification} (Anx: ${profile.work?.anxietyScore}, Avo: ${profile.work?.avoidanceScore})

    YOUR MISSION:
    Write a massive, deeply personalized report.

    RETURN STRICTLY AS JSON matching this schema:
    {
      "populationPercentile": <Integer 1-99 representing their attachment health. 50 is average. Secure people are 85+. Insecure people are 20-45. Give them a realistic number based on their scores.>,
      "deepValidation": "<p>3 paragraphs. Read their soul. Tell them exactly who they are and why they feel exhausted. Connect their specific demographic data to their scores. Make them feel seen and understood immediately.</p>",
      "childhoodPrint": "<p>3 paragraphs. Break down exactly how their mother and father wired their brain. Give specific, simple examples of what they learned love means as a child.</p>",
      "romanticDanger": "<p>3 paragraphs. What are the specific, distinct threats ruining their love life right now? Tell them exactly how partners view their actions. Do not sugarcoat it.</p>",
      "workplaceDanger": "<p>2 paragraphs. How do these exact triggers cause them to burn out, get used, or hide at work? Be very specific.</p>",
      "masterActionPlan": "<p>A long, highly detailed timeline. Focus on the few tiny actions that create the biggest life changes. Format as an HTML list. Provide distinct phases: <b>Phase 1: The Next 24 Hours</b> (give 2 highly specific actions/texts), <b>Phase 2: The Next 7 Days</b> (give 2 specific boundary rules), <b>Phase 3: The Long Game</b> (give 1 major mental shift).</p>",
      "recommendedNextTest": {
        "testId": "<Choose ONE: 'why-do-i-attract-toxic-people', 'are-my-friends-bad-for-me', 'is-he-manipulative'>",
        "testName": "<The display name of the test you chose>",
        "psychologicalPitch": "<1 paragraph. Based on their specific profile, tell them EXACTLY why they need to take this specific test right now to fix the next piece of their life. Make it compelling.>"
      }
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      response_format: { type: "json_object" },
      temperature: 0.75, 
    });

    const aiContent = response.choices[0].message.content;
    return { success: true, report: JSON.parse(aiContent || "{}") };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, error: error.message };
  }
}
