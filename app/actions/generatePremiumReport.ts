"use server";

import OpenAI from "openai";

export async function generatePremiumReport(profile: any, relationshipStatus: string) {
  try {
    const openai = new OpenAI();
    
    const systemPrompt = `You are an elite clinical psychologist and behavioral strategist. Your tone is deeply empathetic, instantly validating, yet authoritative and clinical. You look at a user's multi-domain attachment scores and connect the dots between their childhood (Mother/Father) and their adult life (Romantic/Work). 

STRICT WRITING RULES:
1. NO EMDASHES. Use commas or periods.
2. Format using HTML tags (<p>, <b>, <ul>, <li>) for high readability. Do not use markdown inside the HTML.
3. Output strictly as JSON.`;
    
    const userPrompt = `USER ATTACHMENT DATA: 
    General: ${profile.general?.classification} (Anx: ${profile.general?.anxietyScore}, Avo: ${profile.general?.avoidanceScore})
    Romantic: ${profile.romantic?.classification} (Anx: ${profile.romantic?.anxietyScore}, Avo: ${profile.romantic?.avoidanceScore})
    Mother: ${profile.mother?.classification} (Anx: ${profile.mother?.anxietyScore}, Avo: ${profile.mother?.avoidanceScore})
    Father: ${profile.father?.classification} (Anx: ${profile.father?.anxietyScore}, Avo: ${profile.father?.avoidanceScore})
    Work: ${profile.work?.classification} (Anx: ${profile.work?.anxietyScore}, Avo: ${profile.work?.avoidanceScore})
    Relationship Status: ${relationshipStatus || 'Unknown'}

    Analyze this specific profile and RETURN STRICTLY AS JSON matching this schema:
    {
      "emotionalWin": "<p>1 paragraph. An immediate, deeply validating 'I see you' statement. Make them feel profound relief that their specific mix of triggers is understood and solvable.</p>",
      "motherAnalysis": "<p>1 paragraph analyzing how their score with their maternal figure specifically shaped their nervous system's baseline.</p>",
      "fatherAnalysis": "<p>1 paragraph analyzing how their score with their paternal figure specifically shaped their boundaries and expectations of protection/provision.</p>",
      "romanticAnalysis": "<p>1 paragraph synthesizing the Mother/Father data to explain EXACTLY why their Romantic score is what it is. Name the exact subconscious loop.</p>",
      "workAnalysis": "<p>1 paragraph explaining how these exact same triggers are secretly bleeding into their professional life and causing burnout or friction.</p>",
      "actionablePlan": "<p>If the user is Single: Explain exactly what kind of toxic profile they naturally attract, why past relationships failed, and a 3-step immediate plan to break the cycle. If the user is In a Relationship/Married: Explain the exact hidden threats endangering their relationship right now based on their mental status, and a 3-step immediate plan to stabilize it.</p>"
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      response_format: { type: "json_object" },
      temperature: 0.85, 
    });

    const aiContent = response.choices[0].message.content;
    return { success: true, report: JSON.parse(aiContent || "{}") };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, error: error.message };
  }
}
