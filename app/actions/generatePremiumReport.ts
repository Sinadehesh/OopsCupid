"use server";

import OpenAI from "openai";

export async function generatePremiumReport(profile: any, demographics: any, rawAnswers: any = {}) {
  try {
    const openai = new OpenAI();
    
    const isSingle = demographics?.isSingle || false;
    const status = isSingle ? "Single" : "In a relationship / Married";
    const kids = demographics?.hasChildren ? "Has children" : "No children";
    const gender = demographics?.gender || "Unknown";

    const systemPrompt = `You are a world-class behavioral profiler and relational coach. You use "hot reading" techniques—you look at their raw quiz answers and tell them exactly how they feel, what they fear, and how they act, making them feel completely exposed but deeply understood.

STRICT WRITING RULES:
1. Write at a 3rd-grade reading level. Extremely simple, punchy, direct sentences.
2. NEVER use AI jargon ("delve", "tapestry", "navigate", "foster").
3. NO GENERIC ADVICE. Never tell them to "meditate", "journal", or "go to therapy". Give them hardcore psychological behavioral shifts (e.g., distinguishing a thought from a physical nervous system response, taking a 90-second physical space break, setting a 1-sentence boundary).
4. Output strictly as JSON. Use basic HTML tags (<p>, <b>) for text formatting. Do NOT use markdown.`;
    
    const userPrompt = `USER DEMOGRAPHICS:
    Status: ${status}
    Parental Status: ${kids}
    Gender: ${gender}
    
    USER ATTACHMENT SCORES:
    Mother: Anx ${profile?.mother?.anxietyScore}, Avo ${profile?.mother?.avoidanceScore}
    Father: Anx ${profile?.father?.anxietyScore}, Avo ${profile?.father?.avoidanceScore}
    Romantic: Anx ${profile?.romantic?.anxietyScore}, Avo ${profile?.romantic?.avoidanceScore}
    Work: Anx ${profile?.work?.anxietyScore}, Avo ${profile?.work?.avoidanceScore}
    
    USER'S RAW QUIZ ANSWERS:
    ${JSON.stringify(rawAnswers, null, 2)}

    MISSION:
    Create a deeply personal profile and a tailored playbook for each area of their life based on their exact answers.

    JSON SCHEMA TO RETURN:
    {
      "populationPercentile": <Integer 10-50. Place them realistically in the insecure majority based on their scores. Do not exceed 50 unless they are highly secure.>,
      "unifiedProfile": "<p>3 paragraphs. The 'Hot Read'. Synthesize their demographics and raw answers. Tell them exactly what their core fear is, how it makes them behave, and the exhaustion it causes. Make it insanely accurate.</p>",
      "subcategories": {
        "mother": {
          "threat": "<p>1-2 paragraphs on how their mother dynamic is secretly causing a specific threat in their life right now.</p>",
          "playbook": {
            "immediate": "One specific behavioral action to take right now for an emotional win.",
            "oneWeek": "One specific boundary to set or pattern to interrupt this week.",
            "oneMonth": "One major psychological shift to complete over the next 30 days."
          }
        },
        "father": {
          "threat": "<p>1-2 paragraphs on the specific threat their father dynamic causes.</p>",
          "playbook": { "immediate": "...", "oneWeek": "...", "oneMonth": "..." }
        },
        "romantic": {
          "threat": "<p>1-2 paragraphs on the lethal threat to their romantic life (tailored to if they are single or taken).</p>",
          "playbook": { "immediate": "...", "oneWeek": "...", "oneMonth": "..." }
        },
        "work": {
          "threat": "<p>1-2 paragraphs on how this causes burnout, people-pleasing, or isolation at work.</p>",
          "playbook": { "immediate": "...", "oneWeek": "...", "oneMonth": "..." }
        }
      }
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      response_format: { type: "json_object" },
      temperature: 0.7, 
    });

    const aiContent = response.choices[0].message.content;
    return { success: true, report: JSON.parse(aiContent || "{}") };
  } catch (error: any) {
    console.error("AI Action Error:", error);
    return { success: false, error: error.message };
  }
}
