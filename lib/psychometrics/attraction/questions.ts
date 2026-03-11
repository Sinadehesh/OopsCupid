export type AttractionQuestion = {
  id: string;
  moduleKey: "A" | "B" | "C" | "D" | "E" | "F";
  subscaleKey: string;
  text: string;
  options: string[];
  reverseScore?: boolean;
};

const standardLikert = [
  "1 - Strongly Disagree",
  "2 - Disagree",
  "3 - Neutral",
  "4 - Agree",
  "5 - Strongly Agree"
];

const preferenceLikert = [
  "0 - Not important at all",
  "1 - Somewhat desirable",
  "2 - Very important",
  "3 - Absolutely indispensable"
];

export const attractionQuestions: AttractionQuestion[] = [
  // --- MODULE A: BIG FIVE (Normative) ---
  { id: "A_E1", moduleKey: "A", subscaleKey: "extraversion", text: "I naturally take charge in social situations.", options: standardLikert },
  { id: "A_A1", moduleKey: "A", subscaleKey: "agreeableness", text: "I tend to assume the best about people, even when they make mistakes.", options: standardLikert },
  { id: "A_C1", moduleKey: "A", subscaleKey: "conscientiousness", text: "I am highly disciplined and stick to my long-term goals.", options: standardLikert },
  { id: "A_N1", moduleKey: "A", subscaleKey: "neuroticism", text: "My mood can shift dramatically based on small interactions.", options: standardLikert },
  { id: "A_O1", moduleKey: "A", subscaleKey: "openness", text: "I am drawn to unconventional ideas and alternative lifestyles.", options: standardLikert },

  // --- MODULE B: ATTACHMENT ---
  { id: "B_ANX1", moduleKey: "B", subscaleKey: "anxiety", text: "I frequently worry that my partner will lose interest in me.", options: standardLikert },
  { id: "B_ANX2", moduleKey: "B", subscaleKey: "anxiety", text: "I need a lot of reassurance to feel secure in a relationship.", options: standardLikert },
  { id: "B_AVO1", moduleKey: "B", subscaleKey: "avoidance", text: "I feel suffocated when a partner wants too much emotional closeness.", options: standardLikert },
  { id: "B_AVO2", moduleKey: "B", subscaleKey: "avoidance", text: "When things get difficult, my instinct is to handle it entirely on my own.", options: standardLikert },

  // --- MODULE C: MALADAPTIVE TRAITS (PID-5 Inspired) ---
  { id: "C_NA1", moduleKey: "C", subscaleKey: "negativeAffect", text: "I often feel overwhelmed by emotions that I can't control.", options: standardLikert },
  { id: "C_DET1", moduleKey: "C", subscaleKey: "detachment", text: "I rarely feel genuine warmth or deep emotional connection to others.", options: standardLikert },
  { id: "C_ANT1", moduleKey: "C", subscaleKey: "antagonism", text: "I am completely comfortable being ruthless if it protects my interests.", options: standardLikert },
  { id: "C_DIS1", moduleKey: "C", subscaleKey: "disinhibition", text: "I frequently act on impulse without considering the future consequences.", options: standardLikert },
  { id: "C_PSY1", moduleKey: "C", subscaleKey: "psychoticism", text: "I often experience the world in ways that other people find strange or eccentric.", options: standardLikert },

  // --- MODULE D: DARK TRIAD ---
  { id: "D_MAC1", moduleKey: "D", subscaleKey: "machiavellianism", text: "It is wise to flatter people in order to get what you want.", options: standardLikert },
  { id: "D_NAR1", moduleKey: "D", subscaleKey: "narcissism", text: "I naturally expect to be treated as someone special and superior.", options: standardLikert },
  { id: "D_PSY1", moduleKey: "D", subscaleKey: "psychopathy", text: "I don't feel much guilt or remorse if I happen to hurt someone's feelings.", options: standardLikert },

  // --- MODULE E: SYMPTOMS & CLINICAL VULNERABILITIES ---
  { id: "E_DEP1", moduleKey: "E", subscaleKey: "depression", text: "Lately, I often feel a lingering sense of emptiness or hopelessness.", options: standardLikert },
  { id: "E_ANX1", moduleKey: "E", subscaleKey: "anxiety", text: "I constantly feel restless, on edge, or braced for something bad to happen.", options: standardLikert },
  { id: "E_ADH1", moduleKey: "E", subscaleKey: "adhd", text: "I constantly crave high-stimulation environments or intense drama to avoid feeling bored.", options: standardLikert },
  { id: "E_SUB1", moduleKey: "E", subscaleKey: "substance", text: "I rely on substances (alcohol, etc.) to numb out relationship stress.", options: standardLikert },

  // --- MODULE F: MATE PREFERENCES (Buss-Style) ---
  { id: "F_PREF1", moduleKey: "F", subscaleKey: "loveStatus", text: "How important is: High social status, ambition, and earning potential.", options: preferenceLikert },
  { id: "F_PREF2", moduleKey: "F", subscaleKey: "stabilityLooks", text: "How important is: Absolute dependability, loyalty, and emotional calmness.", options: preferenceLikert },
  { id: "F_PREF3", moduleKey: "F", subscaleKey: "stabilityLooks", text: "How important is: Exceptional physical attractiveness and sex appeal.", options: preferenceLikert },
  { id: "F_PREF4", moduleKey: "F", subscaleKey: "socialValues", text: "How important is: High thrill-seeking, spontaneity, and an exciting lifestyle.", options: preferenceLikert },
];
