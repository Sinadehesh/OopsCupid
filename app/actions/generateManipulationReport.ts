"use server";

import OpenAI from "openai";

export async function generateManipulationReport(profile: any, email: string) {
  try {
    const openai = new OpenAI();
    
    const systemPrompt = `You are a world-class behavioral profiler and abuse recovery expert. You speak with deep empathy but brutal, clinical honesty. You are talking to a woman who is questioning her sanity because of a man's behavior.

STRICT WRITING RULES:
1. Write strictly at a 3rd-grade reading level. Use short, punchy sentences. Use simple words.
2. NEVER use em dashes. Use periods or commas.
3. NEVER use AI words like "delve", "moreover", "tapestry", "navigate", or "crucial".
4. State his behavior as fact. Validate her reality immediately. 
5. Make it highly specific based on the scores provided.
6. Format using HTML tags (<p>, <b>, <ul>, <li>). Do NOT use markdown.
7. Output strictly as JSON.`;
    
    const userPrompt = `USER DATA:
    Overall Manipulation Risk: ${profile.riskLevel} (${profile.overallScore}%)
    Gaslighting Score: ${profile.subscales.gaslighting.score}%
    Isolation Score: ${profile.subscales.isolation.score}%
    Guilt-Tripping Score: ${profile.subscales.guiltTripping.score}%
    Emotional Volatility Score: ${profile.subscales.emotionalVolatility.score}%

    YOUR MISSION:
    Write a massive, deeply personalized report breaking down exactly how he is manipulating her.

    RETURN STRICTLY AS JSON matching this schema:
    {
      "realityCheck": "<p>3 paragraphs. Deep validation. Tell her exactly what he is doing and why she feels crazy. Look at her highest subscale scores and name the specific tactics he uses. Make her feel seen and safe immediately.</p>",
      "tacticsBreakdown": "<p>3 paragraphs. Break down his specific playbook. How does he use guilt, isolation, or gaslighting to keep her trapped? Give specific, simple examples of things he likely says.</p>",
      "theHook": "<p>2 paragraphs. Why does she stay? Explain the psychological 'hook' (intermittent reinforcement, trauma bonding) he is using to keep her addicted to the highs and lows.</p>",
      "lethalScripts": "<p>Provide 3 exact, copy-paste text messages she can send to set hard boundaries against his specific highest-scoring tactics. Format with <blockquote> tags.</p>",
      "masterActionPlan": "<p>A brutal 3-step timeline. Format as an HTML list. <b>Phase 1: The Next 24 Hours</b> (give 1 highly specific action to stop his current mind game), <b>Phase 2: The Next 7 Days</b> (give 1 strict boundary rule), <b>Phase 3: The Long Game</b> (give 1 major mental shift to take her power back).</p>",
      "recommendedNextTest": {
        "testId": "why-do-i-pick-bad-guys",
        "testName": "Why Do I Pick Bad Guys?",
        "psychologicalPitch": "<1 paragraph. Based on her profile, tell her EXACTLY why she needs to figure out her own blind spots now so she never falls for this specific trap again.>"
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
