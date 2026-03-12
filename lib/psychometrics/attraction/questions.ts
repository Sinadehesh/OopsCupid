/**
 * 🔒 SECURE VAULT: ATTRACTION PATTERNS BATTERY (78 ITEMS)
 * * WARNING: DO NOT MODIFY THIS FILE OR REMOVE ITEMS.
 * * This is the strict clinical battery consisting of:
 * - Module A: Big Five (15 items)
 * - Module B: Attachment (12 items)
 * - Module C: PID-5 Maladaptive Traits (15 items)
 * - Module D: Dark Triad (9 items)
 * - Module E: Symptom Screens (12 items)
 * - Module F: Explicit Preferences (15 items)
 * TOTAL: 78 Questions
 */

export type Question = {
  id: string;
  moduleKey: string;
  subscaleKey: string;
  text: string;
  options: string[];
  reverseScore?: boolean;
};

const likert5 = ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"];
const freq5 = ["1 - Never", "2 - Rarely", "3 - Sometimes", "4 - Often", "5 - Very Often"];
const pref4 = ["0 - Unimportant", "1 - Desirable", "2 - Important", "3 - Indispensable"];

export const attractionQuestions: Question[] = [
  // MODULE A: BIG FIVE (15 items)
  { id: "A_O_1", moduleKey: "A", subscaleKey: "Openness", text: "I enjoy trying completely new and unpredictable things.", options: likert5 },
  { id: "A_O_2", moduleKey: "A", subscaleKey: "Openness", text: "I am drawn to unconventional ideas and lifestyles.", options: likert5 },
  { id: "A_O_3", moduleKey: "A", subscaleKey: "Openness", text: "I prefer routine and familiarity over spontaneous adventures.", options: likert5, reverseScore: true },
  { id: "A_C_1", moduleKey: "A", subscaleKey: "Conscientiousness", text: "I am highly organized and detail-oriented in my daily life.", options: likert5 },
  { id: "A_C_2", moduleKey: "A", subscaleKey: "Conscientiousness", text: "I almost always stick to my plans and complete tasks on time.", options: likert5 },
  { id: "A_C_3", moduleKey: "A", subscaleKey: "Conscientiousness", text: "I tend to act impulsively rather than planning ahead.", options: likert5, reverseScore: true },
  { id: "A_E_1", moduleKey: "A", subscaleKey: "Extraversion", text: "I feel energized when I am surrounded by large groups of people.", options: likert5 },
  { id: "A_E_2", moduleKey: "A", subscaleKey: "Extraversion", text: "I am usually the one to start conversations with strangers.", options: likert5 },
  { id: "A_E_3", moduleKey: "A", subscaleKey: "Extraversion", text: "I prefer quiet evenings alone or with one close friend.", options: likert5, reverseScore: true },
  { id: "A_A_1", moduleKey: "A", subscaleKey: "Agreeableness", text: "I naturally prioritize other people's needs above my own.", options: likert5 },
  { id: "A_A_2", moduleKey: "A", subscaleKey: "Agreeableness", text: "I am highly empathetic and easily sense what others are feeling.", options: likert5 },
  { id: "A_A_3", moduleKey: "A", subscaleKey: "Agreeableness", text: "I am comfortable initiating conflict to get what I want.", options: likert5, reverseScore: true },
  { id: "A_N_1", moduleKey: "A", subscaleKey: "Neuroticism", text: "My mood fluctuates rapidly and deeply.", options: likert5 },
  { id: "A_N_2", moduleKey: "A", subscaleKey: "Neuroticism", text: "I frequently worry about things going wrong.", options: likert5 },
  { id: "A_N_3", moduleKey: "A", subscaleKey: "Neuroticism", text: "I remain calm and emotionally stable even under intense pressure.", options: likert5, reverseScore: true },

  // MODULE B: ATTACHMENT (12 items)
  { id: "B_Anx_1", moduleKey: "B", subscaleKey: "Anxiety", text: "I often worry that my partner will lose interest in me.", options: likert5 },
  { id: "B_Anx_2", moduleKey: "B", subscaleKey: "Anxiety", text: "I need constant reassurance that I am loved.", options: likert5 },
  { id: "B_Anx_3", moduleKey: "B", subscaleKey: "Anxiety", text: "If a partner is distant, I immediately fear I've done something wrong.", options: likert5 },
  { id: "B_Anx_4", moduleKey: "B", subscaleKey: "Anxiety", text: "I find myself overanalyzing text messages and tone of voice.", options: likert5 },
  { id: "B_Anx_5", moduleKey: "B", subscaleKey: "Anxiety", text: "I fear being abandoned more than almost anything else.", options: likert5 },
  { id: "B_Anx_6", moduleKey: "B", subscaleKey: "Anxiety", text: "I am confident that my partner truly loves me.", options: likert5, reverseScore: true },
  { id: "B_Avo_1", moduleKey: "B", subscaleKey: "Avoidance", text: "I get uncomfortable when a partner tries to get too close emotionally.", options: likert5 },
  { id: "B_Avo_2", moduleKey: "B", subscaleKey: "Avoidance", text: "I prefer to keep my deepest feelings and problems to myself.", options: likert5 },
  { id: "B_Avo_3", moduleKey: "B", subscaleKey: "Avoidance", text: "When a relationship gets serious, I often feel the urge to pull away.", options: likert5 },
  { id: "B_Avo_4", moduleKey: "B", subscaleKey: "Avoidance", text: "I value my independence far more than intimacy.", options: likert5 },
  { id: "B_Avo_5", moduleKey: "B", subscaleKey: "Avoidance", text: "I find it difficult to fully trust and depend on romantic partners.", options: likert5 },
  { id: "B_Avo_6", moduleKey: "B", subscaleKey: "Avoidance", text: "I easily let my guard down with people I date.", options: likert5, reverseScore: true },

  // MODULE C: MALADAPTIVE TRAITS PID-5 (15 items)
  { id: "C_NA_1", moduleKey: "C", subscaleKey: "NegativeAffect", text: "I often feel overwhelmed by negative emotions like anger or shame.", options: freq5 },
  { id: "C_NA_2", moduleKey: "C", subscaleKey: "NegativeAffect", text: "Minor setbacks feel catastrophic to me.", options: freq5 },
  { id: "C_NA_3", moduleKey: "C", subscaleKey: "NegativeAffect", text: "I hold grudges for a long time.", options: freq5 },
  { id: "C_Det_1", moduleKey: "C", subscaleKey: "Detachment", text: "I feel emotionally numb or empty inside.", options: freq5 },
  { id: "C_Det_2", moduleKey: "C", subscaleKey: "Detachment", text: "I avoid social interactions whenever possible.", options: freq5 },
  { id: "C_Det_3", moduleKey: "C", subscaleKey: "Detachment", text: "I struggle to experience genuine pleasure or joy.", options: freq5 },
  { id: "C_Ant_1", moduleKey: "C", subscaleKey: "Antagonism", text: "I believe that in life, you have to be ruthless to get ahead.", options: likert5 },
  { id: "C_Ant_2", moduleKey: "C", subscaleKey: "Antagonism", text: "I sometimes enjoy seeing others fail.", options: likert5 },
  { id: "C_Ant_3", moduleKey: "C", subscaleKey: "Antagonism", text: "If someone crosses me, I will ensure they regret it.", options: likert5 },
  { id: "C_Dis_1", moduleKey: "C", subscaleKey: "Disinhibition", text: "I frequently act on impulse without considering the consequences.", options: freq5 },
  { id: "C_Dis_2", moduleKey: "C", subscaleKey: "Disinhibition", text: "I find myself engaging in reckless behaviors for the thrill.", options: freq5 },
  { id: "C_Dis_3", moduleKey: "C", subscaleKey: "Disinhibition", text: "I have a hard time stopping myself once I start something enjoyable.", options: freq5 },
  { id: "C_Psy_1", moduleKey: "C", subscaleKey: "Psychoticism", text: "I often experience the world differently than everyone around me.", options: freq5 },
  { id: "C_Psy_2", moduleKey: "C", subscaleKey: "Psychoticism", text: "I sometimes have unusual beliefs that others find strange.", options: freq5 },
  { id: "C_Psy_3", moduleKey: "C", subscaleKey: "Psychoticism", text: "My thoughts sometimes feel disconnected or highly unusual.", options: freq5 },

  // MODULE D: DARK TRIAD (9 items)
  { id: "D_Mac_1", moduleKey: "D", subscaleKey: "Machiavellianism", text: "I believe it is wise to keep secrets that could be used against you.", options: likert5 },
  { id: "D_Mac_2", moduleKey: "D", subscaleKey: "Machiavellianism", text: "I have used flattery or deceit to get someone to do what I want.", options: freq5 },
  { id: "D_Mac_3", moduleKey: "D", subscaleKey: "Machiavellianism", text: "Most people are naive and easily manipulated.", options: likert5 },
  { id: "D_Nar_1", moduleKey: "D", subscaleKey: "Narcissism", text: "I strongly believe I am destined for greatness.", options: likert5 },
  { id: "D_Nar_2", moduleKey: "D", subscaleKey: "Narcissism", text: "I expect to receive special treatment or privileges.", options: likert5 },
  { id: "D_Nar_3", moduleKey: "D", subscaleKey: "Narcissism", text: "I enjoy being the absolute center of attention.", options: likert5 },
  { id: "D_Psy_1", moduleKey: "D", subscaleKey: "Psychopathy", text: "I rarely feel remorse or guilt if I hurt someone's feelings.", options: likert5 },
  { id: "D_Psy_2", moduleKey: "D", subscaleKey: "Psychopathy", text: "I find it easy to emotionally disconnect from other people's pain.", options: likert5 },
  { id: "D_Psy_3", moduleKey: "D", subscaleKey: "Psychopathy", text: "I would rather be feared than loved.", options: likert5 },

  // MODULE E: SYMPTOM SCREENS (12 items)
  { id: "E_Dep_1", moduleKey: "E", subscaleKey: "Depression", text: "I frequently feel hopeless or deeply down.", options: freq5 },
  { id: "E_Dep_2", moduleKey: "E", subscaleKey: "Depression", text: "I have lost interest in activities I used to enjoy.", options: freq5 },
  { id: "E_Dep_3", moduleKey: "E", subscaleKey: "Depression", text: "I struggle with feeling excessively tired or having no energy.", options: freq5 },
  { id: "E_Anx_1", moduleKey: "E", subscaleKey: "Anxiety", text: "I experience physical symptoms of anxiety (racing heart, tight chest).", options: freq5 },
  { id: "E_Anx_2", moduleKey: "E", subscaleKey: "Anxiety", text: "I constantly feel on edge or keyed up.", options: freq5 },
  { id: "E_Anx_3", moduleKey: "E", subscaleKey: "Anxiety", text: "I frequently imagine the worst-case scenario in situations.", options: freq5 },
  { id: "E_Adh_1", moduleKey: "E", subscaleKey: "ADHD", text: "I have significant trouble focusing on tedious tasks.", options: freq5 },
  { id: "E_Adh_2", moduleKey: "E", subscaleKey: "ADHD", text: "I am constantly misplacing items or forgetting obligations.", options: freq5 },
  { id: "E_Adh_3", moduleKey: "E", subscaleKey: "ADHD", text: "I feel an internal restlessness, like I always need to be moving.", options: freq5 },
  { id: "E_Sub_1", moduleKey: "E", subscaleKey: "Substance", text: "I use alcohol or substances to cope with stress.", options: freq5 },
  { id: "E_Sub_2", moduleKey: "E", subscaleKey: "Substance", text: "My substance use has occasionally impacted my relationships.", options: likert5 },
  { id: "E_Sub_3", moduleKey: "E", subscaleKey: "Substance", text: "I find it hard to stop once I start drinking or using.", options: freq5 },

  // MODULE F: EXPLICIT PREFERENCES (15 items)
  { id: "F_Prf_1", moduleKey: "F", subscaleKey: "Stability", text: "A partner who is emotionally stable and dependable.", options: pref4 },
  { id: "F_Prf_2", moduleKey: "F", subscaleKey: "Kindness", text: "A partner who is deeply kind and understanding.", options: pref4 },
  { id: "F_Prf_3", moduleKey: "F", subscaleKey: "Looks", text: "A partner who is highly physically attractive.", options: pref4 },
  { id: "F_Prf_4", moduleKey: "F", subscaleKey: "Status", text: "A partner who has high social status or prestige.", options: pref4 },
  { id: "F_Prf_5", moduleKey: "F", subscaleKey: "Resources", text: "A partner who is financially successful and driven.", options: pref4 },
  { id: "F_Prf_6", moduleKey: "F", subscaleKey: "Intelligence", text: "A partner who is highly educated and intellectually stimulating.", options: pref4 },
  { id: "F_Prf_7", moduleKey: "F", subscaleKey: "Family", text: "A partner who deeply wants to build a family and home.", options: pref4 },
  { id: "F_Prf_8", moduleKey: "F", subscaleKey: "Excitement", text: "A partner who is thrilling, spontaneous, and dangerous.", options: pref4 },
  { id: "F_Prf_9", moduleKey: "F", subscaleKey: "Dominance", text: "A partner who takes charge and exerts dominance.", options: pref4 },
  { id: "F_Prf_10", moduleKey: "F", subscaleKey: "Social", text: "A partner who is highly sociable and the life of the party.", options: pref4 },
  { id: "F_Prf_11", moduleKey: "F", subscaleKey: "Values", text: "A partner who shares my exact religious or moral values.", options: pref4 },
  { id: "F_Prf_12", moduleKey: "F", subscaleKey: "Chemistry", text: "A partner with whom I have immediate, explosive physical chemistry.", options: pref4 },
  { id: "F_Prf_13", moduleKey: "F", subscaleKey: "Protection", text: "A partner who makes me feel deeply protected and safe.", options: pref4 },
  { id: "F_Prf_14", moduleKey: "F", subscaleKey: "Vulnerability", text: "A partner who needs me to fix or heal them.", options: pref4 },
  { id: "F_Prf_15", moduleKey: "F", subscaleKey: "Independence", text: "A partner who gives me absolute freedom and space.", options: pref4 }
];
