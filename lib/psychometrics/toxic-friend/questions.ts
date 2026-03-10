export type ToxicFriendQuestion = {
  id: string;
  module: "victimization" | "quality" | "aggression" | "antisocial" | "impact";
  subscale: string;
  text: string;
  options: string[];
  safetyFlag?: boolean;
};

const FREQ = ["0 - Never", "1 - Rarely", "2 - Sometimes", "3 - Often", "4 - Very Often"];
const IMPACT = ["0 - Not at all", "1 - A little", "2 - Somewhat", "3 - A lot", "4 - Extremely"];

// ALL 46 questions are presented in the free flow to maximize investment.
export const TOXIC_FRIEND_QUESTIONS: ToxicFriendQuestion[] = [
  // MODULE 1: FRIENDSHIP VICTIMIZATION (12 items)
  { id: "tf_v1", module: "victimization", subscale: "Control", text: "This friend makes me feel guilty when I spend time with other people.", options: FREQ },
  { id: "tf_v2", module: "victimization", subscale: "Control", text: "They subtly demand to know my whereabouts or who else I am texting.", options: FREQ },
  { id: "tf_v3", module: "victimization", subscale: "Hostility", text: "This friend becomes cold, distant, or punishing when I do something they do not like.", options: FREQ },
  { id: "tf_v4", module: "victimization", subscale: "Hostility", text: "I feel like I have to walk on eggshells to avoid upsetting them.", options: FREQ },
  { id: "tf_v5", module: "victimization", subscale: "Hostility", text: "They unexpectedly lash out or snap at me over small things.", options: FREQ },
  { id: "tf_v6", module: "victimization", subscale: "Fear", text: "I feel smaller, cautious, or emotionally unsafe around this friend.", options: FREQ },
  { id: "tf_v7", module: "victimization", subscale: "Fear", text: "I am genuinely afraid of how they will react if I say 'no' to them.", options: FREQ, safetyFlag: true },
  { id: "tf_v8", module: "victimization", subscale: "Fear", text: "They threaten to end the friendship when they don't get their way.", options: FREQ },
  { id: "tf_v9", module: "victimization", subscale: "Emotional Harm", text: "They use my insecurities or secrets against me during disagreements.", options: FREQ },
  { id: "tf_v10", module: "victimization", subscale: "Emotional Harm", text: "I worry that private things I share could be used against me later.", options: FREQ },
  { id: "tf_v11", module: "victimization", subscale: "Emotional Harm", text: "They make me feel like I am always the one in the wrong.", options: FREQ },
  { id: "tf_v12", module: "victimization", subscale: "Control", text: "They try to control how I dress, who I date, or what I do.", options: FREQ },

  // MODULE 2: NEGATIVE FRIENDSHIP QUALITY (10 items)
  { id: "tf_q1", module: "quality", subscale: "One-Sidedness", text: "I find myself giving much more effort to this friendship than I receive.", options: FREQ },
  { id: "tf_q2", module: "quality", subscale: "One-Sidedness", text: "They only seem to reach out when they need something from me.", options: FREQ },
  { id: "tf_q3", module: "quality", subscale: "Betrayal", text: "This friend seems supportive in private but undermines me around others.", options: FREQ },
  { id: "tf_q4", module: "quality", subscale: "Betrayal", text: "They share my private information or gossip about me behind my back.", options: FREQ },
  { id: "tf_q5", module: "quality", subscale: "Conflict", text: "Our friendship feels like an emotional rollercoaster with frequent drama.", options: FREQ },
  { id: "tf_q6", module: "quality", subscale: "Conflict", text: "We have intense arguments that never seem to get truly resolved.", options: FREQ },
  { id: "tf_q7", module: "quality", subscale: "Lack of Support", text: "When I am going through a hard time, they are dismissive or unavailable.", options: FREQ },
  { id: "tf_q8", module: "quality", subscale: "Lack of Support", text: "They quickly change the subject back to themselves when I talk about my life.", options: FREQ },
  { id: "tf_q9", module: "quality", subscale: "Inconsistency", text: "Their mood dictates how our entire interaction goes.", options: FREQ },
  { id: "tf_q10", module: "quality", subscale: "Inconsistency", text: "I never know which version of them I am going to get.", options: FREQ },

  // MODULE 3: RELATIONAL AGGRESSION (8 items)
  { id: "tf_a1", module: "aggression", subscale: "Exclusion", text: "They intentionally leave me out of plans to make a point or punish me.", options: FREQ },
  { id: "tf_a2", module: "aggression", subscale: "Exclusion", text: "They give me the silent treatment when they are annoyed.", options: FREQ },
  { id: "tf_a3", module: "aggression", subscale: "Status Games", text: "They make subtle digs or insulting remarks disguised as jokes.", options: FREQ },
  { id: "tf_a4", module: "aggression", subscale: "Status Games", text: "They try to embarrass me or make me look foolish in front of others.", options: FREQ },
  { id: "tf_a5", module: "aggression", subscale: "Jealous Control", text: "They act jealous or possessive when I succeed or make new friends.", options: FREQ },
  { id: "tf_a6", module: "aggression", subscale: "Jealous Control", text: "They try to isolate me from my other friends or romantic partner.", options: FREQ },
  { id: "tf_a7", module: "aggression", subscale: "Reputation Damage", text: "They spread rumors or twist the truth to damage my reputation.", options: FREQ },
  { id: "tf_a8", module: "aggression", subscale: "Reputation Damage", text: "They pit me against other people by telling me what others supposedly said.", options: FREQ },

  // MODULE 4: ANTISOCIAL / UNSAFE PATTERN (8 items)
  { id: "tf_an1", module: "antisocial", subscale: "Pressure", text: "They pressure me into situations where I feel uncomfortable or morally compromised.", options: FREQ },
  { id: "tf_an2", module: "antisocial", subscale: "Pressure", text: "They encourage me to engage in reckless or risky behavior.", options: FREQ },
  { id: "tf_an3", module: "antisocial", subscale: "Dishonesty", text: "I catch them lying or twisting the truth to get their way.", options: FREQ },
  { id: "tf_an4", module: "antisocial", subscale: "Dishonesty", text: "They make me feel like I need to lie to cover up their actions.", options: FREQ },
  { id: "tf_an5", module: "antisocial", subscale: "Fear/Discomfort", text: "I have felt physically or emotionally threatened by their behavior.", options: FREQ, safetyFlag: true },
  { id: "tf_an6", module: "antisocial", subscale: "Fear/Discomfort", text: "They manipulate other people without showing any guilt.", options: FREQ },
  { id: "tf_an7", module: "antisocial", subscale: "Chaos/Risk", text: "They act aggressively toward strangers or people in service jobs.", options: FREQ },
  { id: "tf_an8", module: "antisocial", subscale: "Chaos/Risk", text: "Their life is a constant series of crises that pull me down with them.", options: FREQ },

  // MODULE 5: HARM IMPACT (8 items)
  { id: "tf_i1", module: "impact", subscale: "Emotional Drain", text: "I often feel drained, tense, or on edge after spending time with this friend.", options: IMPACT },
  { id: "tf_i2", module: "impact", subscale: "Emotional Drain", text: "I need a long time to recover my emotional energy after we hang out.", options: IMPACT },
  { id: "tf_i3", module: "impact", subscale: "Stress", text: "I lose sleep or obsessively overthink my interactions with them.", options: IMPACT },
  { id: "tf_i4", module: "impact", subscale: "Stress", text: "I constantly replay our conversations trying to figure out what I did wrong.", options: IMPACT },
  { id: "tf_i5", module: "impact", subscale: "Self-Doubt", text: "This friendship makes me question my own worth or sanity.", options: IMPACT },
  { id: "tf_i6", module: "impact", subscale: "Self-Doubt", text: "I feel like I am losing my sense of identity or confidence because of them.", options: IMPACT },
  { id: "tf_i7", module: "impact", subscale: "Mood Impact", text: "My overall mood noticeably drops when I know I have to see them.", options: IMPACT },
  { id: "tf_i8", module: "impact", subscale: "Mood Impact", text: "I feel more depressed or anxious generally since becoming close with them.", options: IMPACT }
];
