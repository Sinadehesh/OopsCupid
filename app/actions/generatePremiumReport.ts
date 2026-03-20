"use server";

import OpenAI from "openai";

export async function generatePremiumReport(profile: any, demographics: any, rawAnswers: any = {}) {
  try {
    const openai = new OpenAI();
    
    const status = demographics?.isSingle ? "Single" : "In a relationship / Married";
    const kids = demographics?.hasChildren ? "Has children" : "No children";
    const gender = demographics?.gender || "Unknown";

    const systemPrompt = `You are a world-class relational psychologist and behavioral threat analyst. You do not just give attachment theory—you expose the toxic behaviors, manipulation, and red flags of the partners this user dates.

STRICT WRITING RULES:
1. Write strictly at a 3rd-grade reading level. Use short, punchy sentences. Use simple words.
2. NEVER use em dashes. Use periods or commas.
3. BE BRUTALLY HONEST. If their answers indicate a highly anxious/avoidant state, tell them exactly how manipulative and dangerous their partners are.
4. Format using HTML tags (<p>, <b>, <ul>, <li>). Do NOT use markdown.
5. Output strictly as JSON.`;
    
    const userPrompt = `USER DEMOGRAPHICS:
    Status: ${status}
    Parental Status: ${kids}
    Gender: ${gender}
    
    USER ATTACHMENT SCORES:
    General: ${profile?.general?.classification}
    Romantic: ${profile?.romantic?.classification}
    
    USER'S RAW QUIZ ANSWERS (Direct quotes from their test):
    ${JSON.stringify(rawAnswers, null, 2)}

    YOUR MISSION:
    Read ALL of the user's specific answers above. Build a comprehensive profile of the kind of guy they attract (or are currently dating). Provide his playbook and the threats he poses.

    RETURN STRICTLY AS JSON matching this schema:
    {
      "partnerDangerScore": <Integer 0-100. 100 means highly dangerous/toxic to stay with. Score this based on how bad her attachment anxiety/avoidance answers are.>,
      "manipulationPercentile": <Integer 1-99. How manipulative is her typical partner compared to average guys? If she is insecure, this should be high (75-95).>,
      "deepValidation": "<p>3 paragraphs. Connect her specific quiz answers to her reality. Tell her why she feels crazy in love.</p>",
      "boyfriendProfile": "<p>2 paragraphs. Based on her raw answers, describe the exact profile of her boyfriend or the men she naturally attracts. What do they act like?</p>",
      "hisPlaybook": "<p>3 paragraphs. What is his playbook? What manipulative tactics does he use against her specific attachment triggers?</p>",
      "relationshipThreats": "<p>2 paragraphs. How dangerous is it to stay in this dynamic? What are the specific emotional or psychological threats he can cause to her life?</p>",
      "masterActionPlan": "<p>A massive, step-by-step timeline. Format as an HTML list. Tell her exactly what she needs to be careful about today, tomorrow, and this week.</p>",
      "recommendedNextTest": {
        "testId": "is-he-manipulative",
        "testName": "Is He Manipulative?",
        "psychologicalPitch": "<1 paragraph. Tell her why she needs to take this specific test next based on her partner's profile.>"
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
