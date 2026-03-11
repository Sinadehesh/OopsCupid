export type ResponseType = "freq" | "impact" | "binary";

export interface Question {
  id: string;
  module: string;
  subscale: string;
  text: string;
  responseType: ResponseType;
  weight: number;
  hardFlag: boolean;
}

export const TOXIC_FRIEND_QUESTIONS: Question[] = [
  // MODULE A: VICTIMIZATION (16 items)
  { id: "v1", module: "Victimization", subscale: "Control/Dominance", text: "This friend makes me feel guilty when I spend time with other people.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v2", module: "Victimization", subscale: "Control/Dominance", text: "They dictate what we do, where we go, or who else is allowed to come along.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v3", module: "Victimization", subscale: "Control/Dominance", text: "They constantly check up on me or demand to know where I am.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v4", module: "Victimization", subscale: "Control/Dominance", text: "I feel like I have to ask their permission before making my own social plans.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v5", module: "Victimization", subscale: "Emotional Harm", text: "They use my insecurities or secrets against me during disagreements.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "v6", module: "Victimization", subscale: "Emotional Harm", text: "They make me feel like I am fundamentally flawed or 'crazy'.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "v7", module: "Victimization", subscale: "Emotional Harm", text: "I feel smaller, less confident, or 'less than' after we hang out.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v8", module: "Victimization", subscale: "Emotional Harm", text: "They mock my achievements or brush off my successes.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v9", module: "Victimization", subscale: "Threat/Intimidation", text: "I worry that private things I tell this friend could be used against me.", responseType: "freq", weight: 1.5, hardFlag: false },
  { id: "v10", module: "Victimization", subscale: "Threat/Intimidation", text: "They threaten to end our friendship when they do not get their way.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "v11", module: "Victimization", subscale: "Threat/Intimidation", text: "I am genuinely afraid of how they will react if I say no to them.", responseType: "freq", weight: 2.0, hardFlag: true },
  { id: "v12", module: "Victimization", subscale: "Threat/Intimidation", text: "They have broken my belongings or acted physically aggressive when angry.", responseType: "freq", weight: 2.0, hardFlag: true },
  { id: "v13", module: "Victimization", subscale: "Unpredictability", text: "When I disagree, this friend becomes cold or punishing.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v14", module: "Victimization", subscale: "Unpredictability", text: "I feel like I am 'walking on eggshells' around them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v15", module: "Victimization", subscale: "Unpredictability", text: "Their mood changes so rapidly that I never know what to expect.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v16", module: "Victimization", subscale: "Unpredictability", text: "They snap at me over tiny things out of nowhere.", responseType: "freq", weight: 1.0, hardFlag: false },

  // MODULE B: NEGATIVE QUALITY (14 items)
  { id: "q1", module: "Quality", subscale: "One-sidedness", text: "I am almost always the one who initiates plans or reaches out first.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q2", module: "Quality", subscale: "One-sidedness", text: "I listen to their problems for hours, but they only give me five minutes.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q3", module: "Quality", subscale: "One-sidedness", text: "I find myself apologizing more often after I talk with this friend.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q4", module: "Quality", subscale: "One-sidedness", text: "They expect me to drop everything for them, but won't do the same for me.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q5", module: "Quality", subscale: "Lack of Support", text: "They quickly change the subject back to themselves when I talk about my life.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q6", module: "Quality", subscale: "Lack of Support", text: "They are unavailable or 'too busy' when I actually need their help.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q7", module: "Quality", subscale: "Lack of Support", text: "I feel entirely alone even when I am in the same room as them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q8", module: "Quality", subscale: "Lack of Support", text: "They rarely ask me genuine questions about my feelings.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q9", module: "Quality", subscale: "Betrayal/Disloyalty", text: "This friend seems supportive in private but undermines me around others.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "q10", module: "Quality", subscale: "Betrayal/Disloyalty", text: "They share things I told them in confidence with other people.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q11", module: "Quality", subscale: "Betrayal/Disloyalty", text: "They abandon me in social situations to hang out with 'cooler' people.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q12", module: "Quality", subscale: "Conflict", text: "We have explosive arguments over minor misunderstandings.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q13", module: "Quality", subscale: "Conflict", text: "It takes days or weeks to recover from fights with them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q14", module: "Quality", subscale: "Conflict", text: "Every conversation feels like a debate or a competition.", responseType: "freq", weight: 1.0, hardFlag: false },

  // MODULE C: AGGRESSION (12 items)
  { id: "a1", module: "Aggression", subscale: "Exclusion", text: "This friend frequently leaves me out of events I expected to be invited to.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a2", module: "Aggression", subscale: "Exclusion", text: "They deliberately make inside jokes in front of me that I do not understand.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a3", module: "Aggression", subscale: "Exclusion", text: "They give me the silent treatment when I do not comply with their wishes.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a4", module: "Aggression", subscale: "Rumor/Gossip", text: "They spread rumors or twist the truth to damage someone's reputation.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "a5", module: "Aggression", subscale: "Rumor/Gossip", text: "They talk badly about our mutual friends behind their backs.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a6", module: "Aggression", subscale: "Rumor/Gossip", text: "I have caught them twisting my words to make me look bad to others.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "a7", module: "Aggression", subscale: "Triangulation", text: "They pit me against other people by telling me what others supposedly said.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a8", module: "Aggression", subscale: "Triangulation", text: "They use third parties to send me messages instead of talking directly to me.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a9", module: "Aggression", subscale: "Triangulation", text: "They compete with me for the attention of other friends or romantic interests.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a10", module: "Aggression", subscale: "Public/Private", text: "They are sweet to me in private but make me the punchline in public.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a11", module: "Aggression", subscale: "Public/Private", text: "They play the victim to others while being the aggressor toward me.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "a12", module: "Aggression", subscale: "Public/Private", text: "Their behavior completely shifts depending on who else is in the room.", responseType: "freq", weight: 1.0, hardFlag: false },

  // MODULE D: MANIPULATION (12 items)
  { id: "m1", module: "Manipulation", subscale: "Boundary Violation", text: "I avoid saying what I really think around this friend to keep the peace.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m2", module: "Manipulation", subscale: "Boundary Violation", text: "They push me to talk about topics I have explicitly said I am not comfortable with.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m3", module: "Manipulation", subscale: "Boundary Violation", text: "They show up uninvited and expect me to drop everything.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m4", module: "Manipulation", subscale: "Guilt Pressure", text: "They bring up things they did for me in the past to get me to do favors now.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m5", module: "Manipulation", subscale: "Guilt Pressure", text: "They act deeply hurt or wounded if I set a normal boundary.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m6", module: "Manipulation", subscale: "Guilt Pressure", text: "They suggest that I am a 'bad friend' if I do not prioritize them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m7", module: "Manipulation", subscale: "Emotional Blackmail", text: "They hint that they might harm themselves if I distance myself.", responseType: "freq", weight: 2.0, hardFlag: true },
  { id: "m8", module: "Manipulation", subscale: "Emotional Blackmail", text: "They imply my life will fall apart without their guidance or help.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m9", module: "Manipulation", subscale: "Emotional Blackmail", text: "They hold resources (money, access, rides) over my head to keep me compliant.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m10", module: "Manipulation", subscale: "Dependency", text: "They try to convince me that they are the only one who truly understands me.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m11", module: "Manipulation", subscale: "Dependency", text: "They subtly criticize my other relationships to keep me isolated with them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m12", module: "Manipulation", subscale: "Dependency", text: "They act extremely helpless so that I am forced to step in and rescue them.", responseType: "freq", weight: 1.0, hardFlag: false },

  // MODULE E: ANTISOCIAL (10 items)
  { id: "e1", module: "Antisocial", subscale: "Pressure", text: "They pressure me into situations where I feel uncomfortable or morally compromised.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e2", module: "Antisocial", subscale: "Pressure", text: "They pressure me into using substances, spending money I do not have, or taking risks.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e3", module: "Antisocial", subscale: "Pressure", text: "They mock me for being 'boring' or 'safe' if I decline to do something risky.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e4", module: "Antisocial", subscale: "Dishonesty", text: "I catch them lying effortlessly to get what they want.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e5", module: "Antisocial", subscale: "Dishonesty", text: "They steal, cheat, or manipulate strangers without showing remorse.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e6", module: "Antisocial", subscale: "Dishonesty", text: "They ask me to lie for them to cover up their bad behavior.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e7", module: "Antisocial", subscale: "Chaos", text: "They act aggressively or disrespectfully toward people in service jobs.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e8", module: "Antisocial", subscale: "Chaos", text: "Their life is a constant series of crises that pull me down with them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e9", module: "Antisocial", subscale: "Chaos", text: "They engage in reckless driving or other physical risks when I am with them.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e10", module: "Antisocial", subscale: "Chaos", text: "They encourage me to break rules or ignore laws for fun.", responseType: "freq", weight: 1.0, hardFlag: false },

  // MODULE F: VULNERABILITY & RESILIENCE (14 items)
  { id: "f1", module: "Vulnerability", subscale: "Social Isolation", text: "I have only a small number of people I can rely on when I feel upset.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f2", module: "Vulnerability", subscale: "Social Isolation", text: "I often feel completely socially isolated.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f3", module: "Vulnerability", subscale: "Attachment Anxiety", text: "I worry heavily about being abandoned by the people I care about.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f4", module: "Vulnerability", subscale: "Attachment Anxiety", text: "I feel responsible for managing other people's emotions.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f5", module: "Vulnerability", subscale: "Low Self-Worth", text: "I often feel like I do not deserve to be treated well.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f6", module: "Vulnerability", subscale: "Low Self-Worth", text: "I tend to chronically over-apologize, even when I did nothing wrong.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f7", module: "Vulnerability", subscale: "Low Self-Worth", text: "I feel like I am fundamentally hard to love or befriend.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f8", module: "Vulnerability", subscale: "Conflict Avoidance", text: "I struggle heavily to stand up for myself in general.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f9", module: "Vulnerability", subscale: "Conflict Avoidance", text: "I hide my true feelings to avoid any kind of conflict.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f10", module: "Vulnerability", subscale: "Access/Support", text: "I rely on this friend for essential things like housing, money, or transportation.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f11", module: "Vulnerability", subscale: "Access/Support", text: "I lack a strong emotional support network outside of this person.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f12", module: "Vulnerability", subscale: "Stress", text: "I frequently experience minority stress, discrimination, or systemic barriers.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f13", module: "Vulnerability", subscale: "Trauma History", text: "I have a history of difficult, abusive, or highly toxic relationships.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f14", module: "Vulnerability", subscale: "Safety", text: "I worry about my physical safety around this friend.", responseType: "binary", weight: 0.0, hardFlag: true },

  // MODULE G: EMOTIONAL IMPACT (10 items)
  { id: "g1", module: "Impact", subscale: "Drain", text: "I often feel drained or exhausted after interacting with this friend.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g2", module: "Impact", subscale: "Drain", text: "It takes me days to recover my emotional energy after we hang out.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g3", module: "Impact", subscale: "Rumination", text: "I constantly replay our conversations trying to figure out what I did wrong.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g4", module: "Impact", subscale: "Self-Doubt", text: "This friendship makes me question my own sanity or memory.", responseType: "impact", weight: 1.5, hardFlag: false },
  { id: "g5", module: "Impact", subscale: "Stress/Anxiety", text: "I lose sleep or have trouble resting because of this friendship.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g6", module: "Impact", subscale: "Stress/Anxiety", text: "My overall anxiety noticeably increases right before I have to see them.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g7", module: "Impact", subscale: "Stress/Anxiety", text: "I feel a pit in my stomach when I see their name pop up on my phone.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g8", module: "Impact", subscale: "Depressive Symptoms", text: "I feel more depressed or low when I think about our relationship.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g9", module: "Impact", subscale: "Functional Impact", text: "The stress of this friendship interferes with my work, studies, or daily life.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g10", module: "Impact", subscale: "Functional Impact", text: "I have canceled plans with healthy people just to manage this friend's crises.", responseType: "impact", weight: 1.0, hardFlag: false }
];

export const OPTIONS = {
  freq: ["0 - Never", "1 - Rarely", "2 - Sometimes", "3 - Often", "4 - Very Often"],
  impact: ["0 - Not at all", "1 - A little", "2 - Somewhat", "3 - A lot", "4 - Extremely"],
  binary: ["No", "Yes"]
};
