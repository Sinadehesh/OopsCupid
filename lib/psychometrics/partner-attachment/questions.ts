/**
 * 🔒 SECURE VAULT: "PARTNER'S ATTACHMENT STYLE" BATTERY (60 ITEMS)
 * * WARNING: DO NOT MODIFY THIS FILE OR REMOVE ITEMS.
 * * This battery measures a partner's observed behaviors across 5 clinical domains.
 */

export type Question = {
  id: string;
  moduleKey: string;
  subscaleKey: string;
  text: string;
  options: string[];
  reverseScore?: boolean;
};

const freq5 = ["1 - Never", "2 - Rarely", "3 - Sometimes", "4 - Often", "5 - Very Often"];
const likert5 = ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"];
const conflict4 = ["0 - Not at all like him", "1 - Slightly like him", "2 - Moderately like him", "3 - Exactly like him"];

export const partnerAttachmentQuestions: Question[] = [
  // MODULE A: INTIMACY & PROXIMITY (12 Items) - Measures baseline comfort with closeness
  { id: "PA_Int_1", moduleKey: "A", subscaleKey: "Avoidance", text: "When we get very close emotionally, he suddenly finds a reason to create distance (e.g., picking a fight, getting 'too busy').", options: freq5 },
  { id: "PA_Int_2", moduleKey: "A", subscaleKey: "Avoidance", text: "He seems uncomfortable when I express deep, vulnerable emotions.", options: freq5 },
  { id: "PA_Int_3", moduleKey: "A", subscaleKey: "Avoidance", text: "He fiercely guards his independence, sometimes making me feel like an intrusion.", options: likert5 },
  { id: "PA_Int_4", moduleKey: "A", subscaleKey: "Avoidance", text: "He rarely initiates physical affection outside of a sexual context.", options: freq5 },
  { id: "PA_Int_5", moduleKey: "A", subscaleKey: "Anxiety", text: "He needs constant verbal or physical reassurance that I love him.", options: freq5 },
  { id: "PA_Int_6", moduleKey: "A", subscaleKey: "Anxiety", text: "He becomes visibly distressed or moody if I need time alone.", options: freq5 },
  { id: "PA_Int_7", moduleKey: "A", subscaleKey: "Anxiety", text: "He seems to rush relationship milestones (e.g., saying 'I love you' very early).", options: likert5 },
  { id: "PA_Int_8", moduleKey: "A", subscaleKey: "Anxiety", text: "He often questions whether my feelings for him have changed.", options: freq5 },
  { id: "PA_Int_9", moduleKey: "A", subscaleKey: "Secure", text: "He is consistently warm and responsive when I reach out to him.", options: likert5, reverseScore: true }, // High score reduces risk
  { id: "PA_Int_10", moduleKey: "A", subscaleKey: "Secure", text: "He is comfortable sharing his own fears and insecurities with me.", options: likert5, reverseScore: true },
  { id: "PA_Int_11", moduleKey: "A", subscaleKey: "Fearful", text: "He complains that I am too distant, but when I get close, he pushes me away.", options: freq5 },
  { id: "PA_Int_12", moduleKey: "A", subscaleKey: "Fearful", text: "His desire for intimacy seems to fluctuate wildly from day to day.", options: likert5 },

  // MODULE B: CONFLICT RESOLUTION (12 Items) - Measures nervous system regulation during stress
  { id: "PA_Con_1", moduleKey: "B", subscaleKey: "Avoidance", text: "During an argument, he completely shuts down or walks away ('stonewalling').", options: conflict4 },
  { id: "PA_Con_2", moduleKey: "B", subscaleKey: "Avoidance", text: "He minimizes problems and tells me I am overreacting when I bring up an issue.", options: conflict4 },
  { id: "PA_Con_3", moduleKey: "B", subscaleKey: "Avoidance", text: "He acts like an argument never happened the next day, avoiding any 'processing'.", options: conflict4 },
  { id: "PA_Con_4", moduleKey: "B", subscaleKey: "Anxiety", text: "During an argument, he cannot let it go and insists we resolve it immediately, even if I need space.", options: conflict4 },
  { id: "PA_Con_5", moduleKey: "B", subscaleKey: "Anxiety", text: "He brings up past grievances to prove that I don't care about him.", options: conflict4 },
  { id: "PA_Con_6", moduleKey: "B", subscaleKey: "Anxiety", text: "He quickly spirals into 'You just want to break up with me' during minor disagreements.", options: conflict4 },
  { id: "PA_Con_7", moduleKey: "B", subscaleKey: "Fearful", text: "His reactions during conflicts are explosive and disproportionate to the issue.", options: conflict4 },
  { id: "PA_Con_8", moduleKey: "B", subscaleKey: "Fearful", text: "He will fiercely attack me verbally, and then shortly after, desperately beg for forgiveness.", options: conflict4 },
  { id: "PA_Con_9", moduleKey: "B", subscaleKey: "Secure", text: "He actively listens to my perspective during a disagreement, even if he is upset.", options: conflict4, reverseScore: true },
  { id: "PA_Con_10", moduleKey: "B", subscaleKey: "Secure", text: "He can take a 'time out' during a fight and actually return to discuss it calmly.", options: conflict4, reverseScore: true },
  { id: "PA_Con_11", moduleKey: "B", subscaleKey: "Avoidance", text: "He uses logic and hyper-rationality to dismiss my emotional reactions.", options: conflict4 },
  { id: "PA_Con_12", moduleKey: "B", subscaleKey: "Anxiety", text: "He cries or becomes highly emotional to the point where I have to comfort him instead of resolving the issue.", options: conflict4 },

  // MODULE C: COMMUNICATION & AVAILABILITY (12 Items) - Texting and responsiveness
  { id: "PA_Com_1", moduleKey: "C", subscaleKey: "Avoidance", text: "He frequently leaves me on 'read' or takes hours/days to respond to emotional texts.", options: freq5 },
  { id: "PA_Com_2", moduleKey: "C", subscaleKey: "Avoidance", text: "His communication is highly practical (logistics) but rarely emotional.", options: likert5 },
  { id: "PA_Com_3", moduleKey: "C", subscaleKey: "Avoidance", text: "If I send a long, thoughtful message, he responds with a single word or emoji.", options: freq5 },
  { id: "PA_Com_4", moduleKey: "C", subscaleKey: "Anxiety", text: "He double-texts or calls repeatedly if I don't answer quickly.", options: freq5 },
  { id: "PA_Com_5", moduleKey: "C", subscaleKey: "Anxiety", text: "He obsessively monitors my social media or online status.", options: likert5 },
  { id: "PA_Com_6", moduleKey: "C", subscaleKey: "Anxiety", text: "He interprets a slight change in my texting tone as a sign I am mad at him.", options: freq5 },
  { id: "PA_Com_7", moduleKey: "C", subscaleKey: "Fearful", text: "He will text me paragraphs of affection, and then abruptly go silent for days.", options: freq5 },
  { id: "PA_Com_8", moduleKey: "C", subscaleKey: "Fearful", text: "His communication style feels like navigating a minefield—I never know which version of him will reply.", options: likert5 },
  { id: "PA_Com_9", moduleKey: "C", subscaleKey: "Secure", text: "His communication is consistent and predictable.", options: likert5, reverseScore: true },
  { id: "PA_Com_10", moduleKey: "C", subscaleKey: "Secure", text: "He clearly communicates his plans so I don't have to guess where he is.", options: likert5, reverseScore: true },
  { id: "PA_Com_11", moduleKey: "C", subscaleKey: "Avoidance", text: "He actively avoids defining the relationship or giving me a clear label.", options: likert5 },
  { id: "PA_Com_12", moduleKey: "C", subscaleKey: "Anxiety", text: "He uses communication to 'check up' on me rather than to genuinely connect.", options: freq5 },

  // MODULE D: BEHAVIORAL MICRO-SIGNALS (12 Items) - Subtle nervous system cues
  { id: "PA_Mic_1", moduleKey: "D", subscaleKey: "Avoidance", text: "He physically turns his body away or breaks eye contact when conversations get 'heavy'.", options: freq5 },
  { id: "PA_Mic_2", moduleKey: "D", subscaleKey: "Avoidance", text: "He tends to look for the 'exit' (looking at his phone, the door) when we are being intimate.", options: freq5 },
  { id: "PA_Mic_3", moduleKey: "D", subscaleKey: "Avoidance", text: "He uses sarcasm or dark humor specifically to deflect genuine emotional moments.", options: freq5 },
  { id: "PA_Mic_4", moduleKey: "D", subscaleKey: "Anxiety", text: "He physically clings to me in social situations, acting highly territorial.", options: freq5 },
  { id: "PA_Mic_5", moduleKey: "D", subscaleKey: "Anxiety", text: "His mood is entirely dependent on whether I am paying attention to him in the moment.", options: likert5 },
  { id: "PA_Mic_6", moduleKey: "D", subscaleKey: "Anxiety", text: "He engages in 'protest behaviors' (pouting, sighing loudly) hoping I will notice and ask what's wrong.", options: freq5 },
  { id: "PA_Mic_7", moduleKey: "D", subscaleKey: "Fearful", text: "He seems to harbor a deep, unspoken belief that he is fundamentally unlovable or 'bad'.", options: likert5 },
  { id: "PA_Mic_8", moduleKey: "D", subscaleKey: "Fearful", text: "He is hyper-vigilant to my facial expressions, constantly assuming I am judging him.", options: freq5 },
  { id: "PA_Mic_9", moduleKey: "D", subscaleKey: "Secure", text: "His body language around me is relaxed, open, and unhurried.", options: likert5, reverseScore: true },
  { id: "PA_Mic_10", moduleKey: "D", subscaleKey: "Secure", text: "He is comfortable with comfortable silence—we don't always have to be talking.", options: likert5, reverseScore: true },
  { id: "PA_Mic_11", moduleKey: "D", subscaleKey: "Avoidance", text: "He keeps his schedule completely rigid and resents if I ask him to compromise it for me.", options: likert5 },
  { id: "PA_Mic_12", moduleKey: "D", subscaleKey: "Anxiety", text: "He frequently tests my loyalty by creating artificial crises to see if I will 'show up' for him.", options: freq5 },

  // MODULE E: RELATIONSHIP HISTORY & VIEWS (12 Items) - What he says about the past
  { id: "PA_His_1", moduleKey: "E", subscaleKey: "Avoidance", text: "He claims all his exes were 'crazy,' 'needy,' or 'too much'.", options: likert5 },
  { id: "PA_His_2", moduleKey: "E", subscaleKey: "Avoidance", text: "He speaks highly of the concept of 'the one', using an impossible fantasy to avoid committing to real people.", options: likert5 },
  { id: "PA_His_3", moduleKey: "E", subscaleKey: "Avoidance", text: "He has a history of ending relationships suddenly when the 'spark' fades.", options: likert5 },
  { id: "PA_His_4", moduleKey: "E", subscaleKey: "Anxiety", text: "He is still highly emotionally entangled with an ex (either extreme hatred or lingering obsession).", options: likert5 },
  { id: "PA_His_5", moduleKey: "E", subscaleKey: "Anxiety", text: "He views love as something you have to fight for and suffer for to prove it's real.", options: likert5 },
  { id: "PA_His_6", moduleKey: "E", subscaleKey: "Anxiety", text: "He has rarely been single; he tends to jump immediately from one relationship to the next.", options: likert5 },
  { id: "PA_His_7", moduleKey: "E", subscaleKey: "Fearful", text: "He has a history of intensely volatile, dramatic, or toxic relationships.", options: likert5 },
  { id: "PA_His_8", moduleKey: "E", subscaleKey: "Fearful", text: "He talks about love as if it is something inherently dangerous that will inevitably hurt him.", options: likert5 },
  { id: "PA_His_9", moduleKey: "E", subscaleKey: "Secure", text: "He can talk about his past relationships objectively, recognizing both his and his ex's faults.", options: likert5, reverseScore: true },
  { id: "PA_His_10", moduleKey: "E", subscaleKey: "Secure", text: "He views relationships as a partnership of equals, not a power struggle.", options: likert5, reverseScore: true },
  { id: "PA_His_11", moduleKey: "E", subscaleKey: "Avoidance", text: "He views compromise in a relationship as a 'loss of freedom'.", options: likert5 },
  { id: "PA_His_12", moduleKey: "E", subscaleKey: "Anxiety", text: "He believes that if you really love someone, you should share absolutely everything and have no boundaries.", options: likert5 }
];
