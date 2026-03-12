/**
 * 🔒 SECURE VAULT: FRIEND GROUP ROLE (120 ITEMS)
 * * Measures 10 domains to calculate 8 archetypes.
 */

export type Question = {
  id: string;
  moduleKey: string;
  subscaleKey: string;
  text: string;
  options: string[];
  reverseScore?: boolean;
};

const agree5 = ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"];

export const friendRoleQuestions: Question[] = [
  // SECTION 1 — Social Leadership (12)
  { id: "FR_L_1", moduleKey: "A", subscaleKey: "Social Leadership", text: "My friends often look to me when it's time to decide what we should do.", options: agree5 },
  { id: "FR_L_2", moduleKey: "A", subscaleKey: "Social Leadership", text: "I'm usually the one who turns 'we should hang out sometime' into an actual plan.", options: agree5 },
  { id: "FR_L_3", moduleKey: "A", subscaleKey: "Social Leadership", text: "When plans get messy, I naturally start organizing people.", options: agree5 },
  { id: "FR_L_4", moduleKey: "A", subscaleKey: "Social Leadership", text: "I don't mind being responsible for making sure everyone knows what's happening.", options: agree5 },
  { id: "FR_L_5", moduleKey: "A", subscaleKey: "Social Leadership", text: "If nobody else is making a decision, I usually step in.", options: agree5 },
  { id: "FR_L_6", moduleKey: "A", subscaleKey: "Social Leadership", text: "I'm often the first person to suggest a time, place, or plan.", options: agree5 },
  { id: "FR_L_7", moduleKey: "A", subscaleKey: "Social Leadership", text: "In chaotic group situations, I tend to become more focused and decisive.", options: agree5 },
  { id: "FR_L_8", moduleKey: "A", subscaleKey: "Social Leadership", text: "I'd rather let someone else handle the planning from start to finish.", options: agree5, reverseScore: true },
  { id: "FR_L_9", moduleKey: "A", subscaleKey: "Social Leadership", text: "When too many opinions are flying around, I usually stay quiet instead of leading.", options: agree5, reverseScore: true },
  { id: "FR_L_10", moduleKey: "A", subscaleKey: "Social Leadership", text: "I avoid taking charge, even when I know exactly what the group should do.", options: agree5, reverseScore: true },
  { id: "FR_L_11", moduleKey: "A", subscaleKey: "Social Leadership", text: "I'm comfortable guiding a group when nobody else wants the responsibility.", options: agree5 },
  { id: "FR_L_12", moduleKey: "A", subscaleKey: "Social Leadership", text: "Even when I have a strong idea, I often go along with the group instead of influencing it.", options: agree5, reverseScore: true },

  // SECTION 2 — Emotional Support (12)
  { id: "FR_ES_1", moduleKey: "B", subscaleKey: "Emotional Support", text: "Friends tend to open up to me about what's really bothering them.", options: agree5 },
  { id: "FR_ES_2", moduleKey: "B", subscaleKey: "Emotional Support", text: "I can usually tell when someone says 'I'm fine' but clearly isn't.", options: agree5 },
  { id: "FR_ES_3", moduleKey: "B", subscaleKey: "Emotional Support", text: "If one of my friends is upset, I usually check in rather than wait for them to come to me.", options: agree5 },
  { id: "FR_ES_4", moduleKey: "B", subscaleKey: "Emotional Support", text: "I'm good at listening without making the conversation about myself.", options: agree5 },
  { id: "FR_ES_5", moduleKey: "B", subscaleKey: "Emotional Support", text: "People often come to me when they need calm advice.", options: agree5 },
  { id: "FR_ES_6", moduleKey: "B", subscaleKey: "Emotional Support", text: "I try to make my friends feel understood, not judged.", options: agree5 },
  { id: "FR_ES_7", moduleKey: "B", subscaleKey: "Emotional Support", text: "I remember emotional details people tell me, even weeks later.", options: agree5 },
  { id: "FR_ES_8", moduleKey: "B", subscaleKey: "Emotional Support", text: "Serious emotional conversations make me uncomfortable, so I try to keep them short.", options: agree5, reverseScore: true },
  { id: "FR_ES_9", moduleKey: "B", subscaleKey: "Emotional Support", text: "When someone vents to me, I usually want to fix it fast instead of really listening.", options: agree5, reverseScore: true },
  { id: "FR_ES_10", moduleKey: "B", subscaleKey: "Emotional Support", text: "I know how to comfort a friend without saying too much.", options: agree5 },
  { id: "FR_ES_11", moduleKey: "B", subscaleKey: "Emotional Support", text: "I often notice when someone in the group is quietly struggling.", options: agree5 },
  { id: "FR_ES_12", moduleKey: "B", subscaleKey: "Emotional Support", text: "I usually respond to emotional situations with jokes when support would probably help more.", options: agree5, reverseScore: true },

  // SECTION 3 — Humor & Entertainment (12)
  { id: "FR_HE_1", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I'm usually one of the people making everyone laugh during a hangout.", options: agree5 },
  { id: "FR_HE_2", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "If the vibe gets awkward, I often break the tension with humor.", options: agree5 },
  { id: "FR_HE_3", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "Friends expect me to bring energy to group situations.", options: agree5 },
  { id: "FR_HE_4", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I can turn a boring moment into something fun pretty quickly.", options: agree5 },
  { id: "FR_HE_5", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I enjoy making ordinary stories sound entertaining.", options: agree5 },
  { id: "FR_HE_6", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I'm often the one who starts playful chaos in the group.", options: agree5 },
  { id: "FR_HE_7", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I have a good sense of when a joke will lift the mood.", options: agree5 },
  { id: "FR_HE_8", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "In group settings, I mostly stay quiet and let other people be the funny ones.", options: agree5, reverseScore: true },
  { id: "FR_HE_9", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I rarely joke around unless someone else starts first.", options: agree5, reverseScore: true },
  { id: "FR_HE_10", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "People in my friend group often see me as one of the more fun personalities.", options: agree5 },
  { id: "FR_HE_11", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I like being the person who makes a night feel memorable.", options: agree5 },
  { id: "FR_HE_12", moduleKey: "C", subscaleKey: "Humor & Entertainment", text: "I sometimes keep joking even when the moment clearly needs a different energy.", options: agree5, reverseScore: true },

  // SECTION 4 — Adventure & Risk (12)
  { id: "FR_AR_1", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I'm usually the first one to say, 'Let's just do it.'", options: agree5 },
  { id: "FR_AR_2", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "Last-minute plans sound exciting to me.", options: agree5 },
  { id: "FR_AR_3", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I like pushing my friends to try new places instead of repeating the same routine.", options: agree5 },
  { id: "FR_AR_4", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I don't mind a little uncertainty if the experience will be worth it.", options: agree5 },
  { id: "FR_AR_5", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "The best plans are often the ones that weren't overthought.", options: agree5 },
  { id: "FR_AR_6", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "If everyone is hesitating, I'm often the person who gives the group a push.", options: agree5 },
  { id: "FR_AR_7", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "New experiences matter to me more than perfect planning.", options: agree5 },
  { id: "FR_AR_8", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I prefer safe, familiar plans over spontaneous ones.", options: agree5, reverseScore: true },
  { id: "FR_AR_9", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I usually talk myself out of bold ideas before they happen.", options: agree5, reverseScore: true },
  { id: "FR_AR_10", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I get restless when my friend group always does the exact same thing.", options: agree5 },
  { id: "FR_AR_11", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "I'd try something slightly ridiculous if it meant making a great memory.", options: agree5 },
  { id: "FR_AR_12", moduleKey: "D", subscaleKey: "Adventure & Risk", text: "When plans start getting adventurous, I usually become the one slowing things down.", options: agree5, reverseScore: true },

  // SECTION 5 — Conflict Mediation (12)
  { id: "FR_CM_1", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "When two friends argue, I usually try to help them work it out.", options: agree5 },
  { id: "FR_CM_2", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I'm good at seeing both sides of a disagreement.", options: agree5 },
  { id: "FR_CM_3", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I notice group tension pretty quickly.", options: agree5 },
  { id: "FR_CM_4", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I often help people rephrase what they mean so things don't escalate.", options: agree5 },
  { id: "FR_CM_5", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I care more about calming the situation than proving someone wrong.", options: agree5 },
  { id: "FR_CM_6", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "Friends sometimes vent to me separately after a conflict.", options: agree5 },
  { id: "FR_CM_7", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I can stay fairly neutral when two people I care about are clashing.", options: agree5 },
  { id: "FR_CM_8", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "When conflict starts, I usually step back and leave people to deal with it on their own.", options: agree5, reverseScore: true },
  { id: "FR_CM_9", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I avoid group drama even when I know I could help.", options: agree5, reverseScore: true },
  { id: "FR_CM_10", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I try to stop small resentments before they turn into bigger issues.", options: agree5 },
  { id: "FR_CM_11", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "I'm good at lowering the emotional temperature in a room.", options: agree5 },
  { id: "FR_CM_12", moduleKey: "E", subscaleKey: "Conflict Mediation", text: "Without meaning to, I sometimes make tense situations worse by reacting too fast.", options: agree5, reverseScore: true },

  // SECTION 6 — Loyalty & Protection (12)
  { id: "FR_LP_1", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "If someone is unfairly criticizing my friend, I'm likely to step in.", options: agree5 },
  { id: "FR_LP_2", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I feel protective when one of my friends is being excluded.", options: agree5 },
  { id: "FR_LP_3", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I don't forget who shows up for me and who doesn't.", options: agree5 },
  { id: "FR_LP_4", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I pay attention to how other people are treating my friends in social situations.", options: agree5 },
  { id: "FR_LP_5", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "People close to me know I have their back.", options: agree5 },
  { id: "FR_LP_6", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I will defend a friend even when it's awkward or inconvenient.", options: agree5 },
  { id: "FR_LP_7", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "Loyalty matters a lot to me in friendship.", options: agree5 },
  { id: "FR_LP_8", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "If a social situation gets uncomfortable, I usually assume everyone should handle themselves.", options: agree5, reverseScore: true },
  { id: "FR_LP_9", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I try not to get involved when someone in my group is being targeted.", options: agree5, reverseScore: true },
  { id: "FR_LP_10", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I notice quickly when someone is disrespecting one of my friends.", options: agree5 },
  { id: "FR_LP_11", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I'm often one of the people making sure everybody gets home okay.", options: agree5 },
  { id: "FR_LP_12", moduleKey: "F", subscaleKey: "Loyalty & Protection", text: "I rarely feel responsible for looking out for my friends in public or social settings.", options: agree5, reverseScore: true },

  // SECTION 7 — Social Glue (12)
  { id: "FR_SG_1", moduleKey: "G", subscaleKey: "Social Glue", text: "I'm usually the one checking in when someone goes quiet for a while.", options: agree5 },
  { id: "FR_SG_2", moduleKey: "G", subscaleKey: "Social Glue", text: "I notice when a friend is slowly drifting away from the group.", options: agree5 },
  { id: "FR_SG_3", moduleKey: "G", subscaleKey: "Social Glue", text: "I like bringing different friends together.", options: agree5 },
  { id: "FR_SG_4", moduleKey: "G", subscaleKey: "Social Glue", text: "I often remember birthdays, reunions, or reasons to reach out.", options: agree5 },
  { id: "FR_SG_5", moduleKey: "G", subscaleKey: "Social Glue", text: "If nobody else organizes a catch-up, I probably will.", options: agree5 },
  { id: "FR_SG_6", moduleKey: "G", subscaleKey: "Social Glue", text: "I try to include people who might otherwise be forgotten.", options: agree5 },
  { id: "FR_SG_7", moduleKey: "G", subscaleKey: "Social Glue", text: "Keeping the group connected matters to me.", options: agree5 },
  { id: "FR_SG_8", moduleKey: "G", subscaleKey: "Social Glue", text: "I can go a long time without talking to friends and not think much about it.", options: agree5, reverseScore: true },
  { id: "FR_SG_9", moduleKey: "G", subscaleKey: "Social Glue", text: "I assume friendships will stay strong even if nobody puts in much effort.", options: agree5, reverseScore: true },
  { id: "FR_SG_10", moduleKey: "G", subscaleKey: "Social Glue", text: "I'm often the person reviving a dead group chat or restarting plans.", options: agree5 },
  { id: "FR_SG_11", moduleKey: "G", subscaleKey: "Social Glue", text: "Shared traditions, inside jokes, and group memories matter to me.", options: agree5 },
  { id: "FR_SG_12", moduleKey: "G", subscaleKey: "Social Glue", text: "When a friendship starts fading, I usually let it fade instead of trying to repair it.", options: agree5, reverseScore: true },

  // SECTION 8 — Independence (12)
  { id: "FR_I_1", moduleKey: "H", subscaleKey: "Independence", text: "I need a decent amount of personal space, even from people I really like.", options: agree5 },
  { id: "FR_I_2", moduleKey: "H", subscaleKey: "Independence", text: "I sometimes disappear for a while and come back like nothing happened.", options: agree5 },
  { id: "FR_I_3", moduleKey: "H", subscaleKey: "Independence", text: "I make big decisions without needing my friends' input.", options: agree5 },
  { id: "FR_I_4", moduleKey: "H", subscaleKey: "Independence", text: "I enjoy my friends, but I don't need constant contact to feel close.", options: agree5 },
  { id: "FR_I_5", moduleKey: "H", subscaleKey: "Independence", text: "I protect my alone time pretty seriously.", options: agree5 },
  { id: "FR_I_6", moduleKey: "H", subscaleKey: "Independence", text: "I usually handle my problems on my own before talking to anyone.", options: agree5 },
  { id: "FR_I_7", moduleKey: "H", subscaleKey: "Independence", text: "I like being part of a group, but only on my own terms.", options: agree5 },
  { id: "FR_I_8", moduleKey: "H", subscaleKey: "Independence", text: "I feel unsettled if I go too long without seeing or messaging my friends.", options: agree5, reverseScore: true },
  { id: "FR_I_9", moduleKey: "H", subscaleKey: "Independence", text: "I rely heavily on my friend group to stay emotionally okay.", options: agree5, reverseScore: true },
  { id: "FR_I_10", moduleKey: "H", subscaleKey: "Independence", text: "I don't mind being the person who is a little harder to reach.", options: agree5 },
  { id: "FR_I_11", moduleKey: "H", subscaleKey: "Independence", text: "Even in a close group, I keep parts of my life private.", options: agree5 },
  { id: "FR_I_12", moduleKey: "H", subscaleKey: "Independence", text: "I stay socially available even when I really want space.", options: agree5, reverseScore: true },

  // SECTION 9 — Attention & Spotlight (12)
  { id: "FR_AS_1", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I'm comfortable telling a story when everyone is listening.", options: agree5 },
  { id: "FR_AS_2", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I naturally become more expressive in group settings.", options: agree5 },
  { id: "FR_AS_3", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I enjoy moments when the room's attention shifts toward me.", options: agree5 },
  { id: "FR_AS_4", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "Friends would probably say I know how to make an entrance.", options: agree5 },
  { id: "FR_AS_5", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I don't mind being noticed.", options: agree5 },
  { id: "FR_AS_6", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I like when people remember something funny, dramatic, or bold that I said.", options: agree5 },
  { id: "FR_AS_7", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "In a new social setting, I usually find a way to stand out.", options: agree5 },
  { id: "FR_AS_8", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I'd rather blend in than be the center of attention.", options: agree5, reverseScore: true },
  { id: "FR_AS_9", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "I often hold back because I don't like everyone's eyes on me.", options: agree5, reverseScore: true },
  { id: "FR_AS_10", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "If the vibe is right, I can easily turn a small moment into a performance.", options: agree5 },
  { id: "FR_AS_11", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "Being recognized by my friends feels energizing.", options: agree5 },
  { id: "FR_AS_12", moduleKey: "I", subscaleKey: "Attention & Spotlight", text: "Even when I have a great story, I sometimes keep it to myself to avoid attention.", options: agree5, reverseScore: true },

  // SECTION 10 — Observational Insight (12)
  { id: "FR_OI_1", moduleKey: "J", subscaleKey: "Observational Insight", text: "I can usually tell when the vibe in the group shifts.", options: agree5 },
  { id: "FR_OI_2", moduleKey: "J", subscaleKey: "Observational Insight", text: "I notice who is talking more, less, or not at all.", options: agree5 },
  { id: "FR_OI_3", moduleKey: "J", subscaleKey: "Observational Insight", text: "I often pick up on tension before anyone says it out loud.", options: agree5 },
  { id: "FR_OI_4", moduleKey: "J", subscaleKey: "Observational Insight", text: "I can tell when a joke landed badly, even if people still laugh.", options: agree5 },
  { id: "FR_OI_5", moduleKey: "J", subscaleKey: "Observational Insight", text: "I'm good at sensing who actually wants to leave and who's just being polite.", options: agree5 },
  { id: "FR_OI_6", moduleKey: "J", subscaleKey: "Observational Insight", text: "I notice patterns in how different friends react to each other.", options: agree5 },
  { id: "FR_OI_7", moduleKey: "J", subscaleKey: "Observational Insight", text: "I can often predict how a group plan will play out before it happens.", options: agree5 },
  { id: "FR_OI_8", moduleKey: "J", subscaleKey: "Observational Insight", text: "I miss subtle social cues unless someone points them out to me.", options: agree5, reverseScore: true },
  { id: "FR_OI_9", moduleKey: "J", subscaleKey: "Observational Insight", text: "I'm usually too caught up in the moment to read the room well.", options: agree5, reverseScore: true },
  { id: "FR_OI_10", moduleKey: "J", subscaleKey: "Observational Insight", text: "I can tell when someone feels left out even if they act normal.", options: agree5 },
  { id: "FR_OI_11", moduleKey: "J", subscaleKey: "Observational Insight", text: "I often understand a group dynamic better after quietly watching for a bit.", options: agree5 },
  { id: "FR_OI_12", moduleKey: "J", subscaleKey: "Observational Insight", text: "Hidden tension usually catches me by surprise.", options: agree5, reverseScore: true }
];
