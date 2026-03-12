/**
 * 🔒 SECURE VAULT: "WHO FINDS ME ATTRACTIVE" BATTERY (78 ITEMS)
 * * WARNING: DO NOT MODIFY THIS FILE OR REMOVE ITEMS.
 * * This battery measures the user's "Signal Profile" across 6 domains.
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
const signal4 = ["0 - Not at all", "1 - Slightly", "2 - Moderately", "3 - Extremely"];

export const attractorQuestions: Question[] = [
  // MODULE A: SIGNAL PERSONALITY (Big Five observed behaviors) - 15 items
  { id: "S_A_O_1", moduleKey: "A", subscaleKey: "Openness", text: "People often describe me as highly creative or unconventional.", options: likert5 },
  { id: "S_A_O_2", moduleKey: "A", subscaleKey: "Openness", text: "My lifestyle looks very different from the 'standard' path.", options: likert5 },
  { id: "S_A_O_3", moduleKey: "A", subscaleKey: "Openness", text: "I present myself as a very traditional, routine-oriented person.", options: likert5, reverseScore: true },
  { id: "S_A_C_1", moduleKey: "A", subscaleKey: "Conscientiousness", text: "Others rely on me because I am incredibly organized and dependable.", options: likert5 },
  { id: "S_A_C_2", moduleKey: "A", subscaleKey: "Conscientiousness", text: "I project an image of high ambition and discipline.", options: likert5 },
  { id: "S_A_C_3", moduleKey: "A", subscaleKey: "Conscientiousness", text: "People see me as messy, scattered, or spontaneous.", options: likert5, reverseScore: true },
  { id: "S_A_E_1", moduleKey: "A", subscaleKey: "Extraversion", text: "I am usually the loudest, most energetic person in the room.", options: likert5 },
  { id: "S_A_E_2", moduleKey: "A", subscaleKey: "Extraversion", text: "I draw a lot of social attention wherever I go.", options: likert5 },
  { id: "S_A_E_3", moduleKey: "A", subscaleKey: "Extraversion", text: "I give off a quiet, reserved, or mysterious vibe.", options: likert5, reverseScore: true },
  { id: "S_A_A_1", moduleKey: "A", subscaleKey: "Agreeableness", text: "People immediately sense that I am deeply warm and nurturing.", options: likert5 },
  { id: "S_A_A_2", moduleKey: "A", subscaleKey: "Agreeableness", text: "Others frequently come to me with their problems because I seem 'safe'.", options: likert5 },
  { id: "S_A_A_3", moduleKey: "A", subscaleKey: "Agreeableness", text: "I project an intimidating, tough, or 'do not cross me' energy.", options: likert5, reverseScore: true },
  { id: "S_A_N_1", moduleKey: "A", subscaleKey: "Neuroticism", text: "My emotional highs and lows are very visible to people dating me.", options: likert5 },
  { id: "S_A_N_2", moduleKey: "A", subscaleKey: "Neuroticism", text: "I frequently seek visible reassurance from my partners.", options: likert5 },
  { id: "S_A_N_3", moduleKey: "A", subscaleKey: "Neuroticism", text: "I am perceived as a rock—completely unshakable and calm.", options: likert5, reverseScore: true },

  // MODULE B: SIGNAL ATTACHMENT (12 items)
  { id: "S_B_Anx_1", moduleKey: "B", subscaleKey: "Anxiety", text: "I visibly panic or double-text when a partner pulls away.", options: freq5 },
  { id: "S_B_Anx_2", moduleKey: "B", subscaleKey: "Anxiety", text: "I am quick to show jealousy or fear of abandonment.", options: freq5 },
  { id: "S_B_Anx_3", moduleKey: "B", subscaleKey: "Anxiety", text: "I frequently ask my partner 'Are we okay?' or 'Are you mad at me?'", options: freq5 },
  { id: "S_B_Anx_4", moduleKey: "B", subscaleKey: "Anxiety", text: "I tend to over-accommodate my partners to keep them happy.", options: freq5 },
  { id: "S_B_Anx_5", moduleKey: "B", subscaleKey: "Anxiety", text: "I quickly adapt my schedule or personality to match whoever I'm dating.", options: freq5 },
  { id: "S_B_Anx_6", moduleKey: "B", subscaleKey: "Anxiety", text: "I easily set firm boundaries even if it upsets my partner.", options: freq5, reverseScore: true },
  { id: "S_B_Avo_1", moduleKey: "B", subscaleKey: "Avoidance", text: "I am known for being emotionally walled off or hard to read.", options: likert5 },
  { id: "S_B_Avo_2", moduleKey: "B", subscaleKey: "Avoidance", text: "I visibly pull away or ask for space when things get too serious.", options: freq5 },
  { id: "S_B_Avo_3", moduleKey: "B", subscaleKey: "Avoidance", text: "I project fierce independence—like I don't need anyone.", options: likert5 },
  { id: "S_B_Avo_4", moduleKey: "B", subscaleKey: "Avoidance", text: "Partners often complain that I am cold or distant.", options: freq5 },
  { id: "S_B_Avo_5", moduleKey: "B", subscaleKey: "Avoidance", text: "I keep romantic partners separate from the rest of my life.", options: freq5 },
  { id: "S_B_Avo_6", moduleKey: "B", subscaleKey: "Avoidance", text: "I openly share my deepest vulnerabilities with people I date.", options: freq5, reverseScore: true },

  // MODULE C: SIGNAL MALADAPTIVE (PID-5) - 15 items
  { id: "S_C_NA_1", moduleKey: "C", subscaleKey: "NegativeAffect", text: "I am prone to visible outbursts of anger or intense crying.", options: freq5 },
  { id: "S_C_NA_2", moduleKey: "C", subscaleKey: "NegativeAffect", text: "I let partners know immediately when I feel slighted or offended.", options: freq5 },
  { id: "S_C_NA_3", moduleKey: "C", subscaleKey: "NegativeAffect", text: "My romantic relationships are often characterized by explosive drama.", options: freq5 },
  { id: "S_C_Det_1", moduleKey: "C", subscaleKey: "Detachment", text: "I am perceived as a 'loner' or highly introverted.", options: likert5 },
  { id: "S_C_Det_2", moduleKey: "C", subscaleKey: "Detachment", text: "People tell me I seem detached from reality or apathetic.", options: freq5 },
  { id: "S_C_Det_3", moduleKey: "C", subscaleKey: "Detachment", text: "I rarely initiate physical affection or deep conversation.", options: freq5 },
  { id: "S_C_Ant_1", moduleKey: "C", subscaleKey: "Antagonism", text: "I openly act superior, boastful, or arrogant around dates.", options: freq5 },
  { id: "S_C_Ant_2", moduleKey: "C", subscaleKey: "Antagonism", text: "I enjoy teasing, belittling, or picking fights with my partners.", options: freq5 },
  { id: "S_C_Ant_3", moduleKey: "C", subscaleKey: "Antagonism", text: "I make it clear that I expect to be treated like royalty.", options: likert5 },
  { id: "S_C_Dis_1", moduleKey: "C", subscaleKey: "Disinhibition", text: "I am known as the wild, chaotic, or highly impulsive one.", options: likert5 },
  { id: "S_C_Dis_2", moduleKey: "C", subscaleKey: "Disinhibition", text: "I openly engage in reckless behavior (spending, speeding, partying).", options: freq5 },
  { id: "S_C_Dis_3", moduleKey: "C", subscaleKey: "Disinhibition", text: "Partners know that a night out with me could end up anywhere.", options: likert5 },
  { id: "S_C_Psy_1", moduleKey: "C", subscaleKey: "Psychoticism", text: "I lean into an eccentric, highly unusual, or 'bizarre' aesthetic.", options: likert5 },
  { id: "S_C_Psy_2", moduleKey: "C", subscaleKey: "Psychoticism", text: "I frequently talk about supernatural, odd, or fringe beliefs.", options: freq5 },
  { id: "S_C_Psy_3", moduleKey: "C", subscaleKey: "Psychoticism", text: "People are drawn to me because I seem completely out of this world.", options: likert5 },

  // MODULE D: SIGNAL DARK TRIAD (9 items)
  { id: "S_D_Mac_1", moduleKey: "D", subscaleKey: "Machiavellianism", text: "I actively play 'hard to get' or use strategic games to hook partners.", options: freq5 },
  { id: "S_D_Mac_2", moduleKey: "D", subscaleKey: "Machiavellianism", text: "I make sure my partners know I have other options.", options: freq5 },
  { id: "S_D_Mac_3", moduleKey: "D", subscaleKey: "Machiavellianism", text: "I test my partners to see how much I can get away with.", options: freq5 },
  { id: "S_D_Nar_1", moduleKey: "D", subscaleKey: "Narcissism", text: "I put immense effort into my physical appearance and grooming.", options: likert5 },
  { id: "S_D_Nar_2", moduleKey: "D", subscaleKey: "Narcissism", text: "My social media is heavily curated to make my life look incredible.", options: likert5 },
  { id: "S_D_Nar_3", moduleKey: "D", subscaleKey: "Narcissism", text: "I talk about my achievements and successes frequently on dates.", options: freq5 },
  { id: "S_D_Psy_1", moduleKey: "D", subscaleKey: "Psychopathy", text: "I project an image of being dangerous, edgy, or a 'bad boy/girl'.", options: likert5 },
  { id: "S_D_Psy_2", moduleKey: "D", subscaleKey: "Psychopathy", text: "I am openly dismissive of societal rules or authorities.", options: likert5 },
  { id: "S_D_Psy_3", moduleKey: "D", subscaleKey: "Psychopathy", text: "I show very little remorse when I hurt someone's feelings.", options: freq5 },

  // MODULE E: SIGNAL VULNERABILITY & SYMPTOMS (12 items)
  { id: "S_E_Dep_1", moduleKey: "E", subscaleKey: "Depression", text: "I openly project a sad, melancholic, or 'tortured soul' persona.", options: likert5 },
  { id: "S_E_Dep_2", moduleKey: "E", subscaleKey: "Depression", text: "I frequently tell dates about my past traumas early on.", options: freq5 },
  { id: "S_E_Dep_3", moduleKey: "E", subscaleKey: "Depression", text: "Partners often feel like they need to cheer me up.", options: freq5 },
  { id: "S_E_Anx_1", moduleKey: "E", subscaleKey: "Anxiety", text: "I am visibly anxious, high-strung, or easily stressed out.", options: likert5 },
  { id: "E_E_Anx_2", moduleKey: "E", subscaleKey: "Anxiety", text: "I frequently ask my partner to help me manage my daily worries.", options: freq5 },
  { id: "S_E_Anx_3", moduleKey: "E", subscaleKey: "Anxiety", text: "I project a highly dependent energy, needing someone to take charge.", options: likert5 },
  { id: "S_E_Adh_1", moduleKey: "E", subscaleKey: "ADHD", text: "I come across as incredibly high-energy but highly disorganized.", options: likert5 },
  { id: "S_E_Adh_2", moduleKey: "E", subscaleKey: "ADHD", text: "My lifestyle is chaotic and requires a partner to help manage it.", options: likert5 },
  { id: "S_E_Adh_3", moduleKey: "E", subscaleKey: "ADHD", text: "I am incredibly fun initially but struggle to maintain focus over time.", options: likert5 },
  { id: "S_E_Sub_1", moduleKey: "E", subscaleKey: "Substance", text: "Most of my dates involve heavy drinking or substance use.", options: freq5 },
  { id: "S_E_Sub_2", moduleKey: "E", subscaleKey: "Substance", text: "I am known in my social circles as the 'party animal'.", options: likert5 },
  { id: "S_E_Sub_3", moduleKey: "E", subscaleKey: "Substance", text: "Partners often try to 'sober me up' or 'tame' my habits.", options: freq5 },

  // MODULE F: EXPLICIT SOCIAL/STATUS SIGNALS (15 items)
  { id: "S_F_Sig_1", moduleKey: "F", subscaleKey: "Wealth", text: "I conspicuously display signs of wealth (designer clothes, expensive cars).", options: signal4 },
  { id: "S_F_Sig_2", moduleKey: "F", subscaleKey: "Aesthetics", text: "My primary selling point on dating apps is my high physical attractiveness.", options: signal4 },
  { id: "S_F_Sig_3", moduleKey: "F", subscaleKey: "Intellect", text: "I aggressively signal my intelligence, education, or elitism.", options: signal4 },
  { id: "S_F_Sig_4", moduleKey: "F", subscaleKey: "Innocence", text: "I project innocence, purity, or extreme youthfulness.", options: signal4 },
  { id: "S_F_Sig_5", moduleKey: "F", subscaleKey: "Dominance", text: "I signal that I am the boss, the provider, or the dominant figure.", options: signal4 },
  { id: "S_F_Sig_6", moduleKey: "F", subscaleKey: "Submissiveness", text: "I signal that I am submissive, agreeable, and willing to follow.", options: signal4 },
  { id: "S_F_Sig_7", moduleKey: "F", subscaleKey: "Sexuality", text: "I project overt, highly charged sexual energy right away.", options: signal4 },
  { id: "S_F_Sig_8", moduleKey: "F", subscaleKey: "Maternal", text: "I give off strong 'wife/husband material' or maternal/paternal vibes.", options: signal4 },
  { id: "S_F_Sig_9", moduleKey: "F", subscaleKey: "Alternative", text: "I heavily signal my alignment with a specific subculture (goth, raver, artist).", options: signal4 },
  { id: "S_F_Sig_10", moduleKey: "F", subscaleKey: "Victimhood", text: "I signal that I have been deeply wronged by my exes and need saving.", options: signal4 },
  { id: "S_F_Sig_11", moduleKey: "F", subscaleKey: "HardToGet", text: "I intentionally signal that I am 'out of your league' or hard to win.", options: signal4 },
  { id: "S_F_Sig_12", moduleKey: "F", subscaleKey: "Tradition", text: "I explicitly signal conservative, highly traditional values.", options: signal4 },
  { id: "S_F_Sig_13", moduleKey: "F", subscaleKey: "Mystery", text: "I cultivate an aura of extreme mystery and silence.", options: signal4 },
  { id: "S_F_Sig_14", moduleKey: "F", subscaleKey: "Chaos", text: "I openly signal that I am 'crazy' or 'a lot to handle'.", options: signal4 },
  { id: "S_F_Sig_15", moduleKey: "F", subscaleKey: "Chill", text: "I aggressively project a 'laid back, no drama, easy going' persona.", options: signal4 }
];
