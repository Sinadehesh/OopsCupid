export type ResponseType = "freq" | "impact" | "binary";

export interface Question {
  id: string;
  module: string;
  subscale: string;
  text: string;
  responseType: ResponseType;
  reverseCoded: boolean;
  weight: number;
  hardFlag: boolean;
  notes?: string;
}

export const TOXIC_FRIEND_QUESTIONS: Question[] = [
  // --- MODULE A: Friendship Victimization (18 items) ---
  { id: "A001", module: "victimization", subscale: "control_dominance", text: "This friend often tells me what I should do or who I should spend time with.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A002", module: "victimization", subscale: "control_dominance", text: "I feel pressured to change my plans because of this friend’s reaction.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A003", module: "victimization", subscale: "emotional_harm", text: "This friend makes comments that leave me feeling belittled or ashamed.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A004", module: "victimization", subscale: "emotional_harm", text: "The friend uses sarcasm or jokes to put me down in ways that actually hurt.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A005", module: "victimization", subscale: "threat_intimidation", text: "I worry about how this friend will react if I disagree with them.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A006", module: "victimization", subscale: "threat_intimidation", text: "This friend has threatened to cut me out of their life during arguments.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: true },
  { id: "A007", module: "victimization", subscale: "unpredictability", text: "Their mood can shift quickly from warm to cold without explanation.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A008", module: "victimization", subscale: "unpredictability", text: "I often leave interactions with this friend feeling confused or upset.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A009", module: "victimization", subscale: "fear_tension", text: "I sometimes avoid bringing up important things because I’m afraid of this friend’s reaction.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A010", module: "victimization", subscale: "boundary_violation", text: "This friend ignores boundaries I have set (e.g., showing up uninvited or prying into things I said were private).", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A011", module: "victimization", subscale: "stability", text: "This friend’s behavior toward me feels controlling rather than cooperative.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A012", module: "victimization", subscale: "humiliation", text: "This friend humiliates me, jokes about me, or makes me the target of teasing in a way that feels mean.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A013", module: "victimization", subscale: "private_threats", text: "I worry that private things I tell this friend could be used against me later.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A014", module: "victimization", subscale: "emotional_shock", text: "I have felt emotionally shaken after interactions with this friend.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A015", module: "victimization", subscale: "physical_safety", text: "I have felt physically threatened by this friend.", responseType: "binary", reverseCoded: false, weight: 2, hardFlag: true },
  { id: "A016", module: "victimization", subscale: "coercive_withdrawal", text: "When I do something they don’t like, this friend becomes cold and punishing.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A017", module: "victimization", subscale: "gaslighting_sign", text: "This friend denies or minimizes events that I clearly remember happening between us.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "A018", module: "victimization", subscale: "escalation_patterns", text: "Minor disagreements with this friend quickly escalate into major punishments or threats.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },

  // --- MODULE B: Negative Friendship Quality (14 items based on prompt list) ---
  { id: "B001", module: "neg_quality", subscale: "one_sidedness", text: "I do more emotional labor in this friendship than my friend does.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B002", module: "neg_quality", subscale: "one_sidedness", text: "I am usually the one who checks in or organizes plans with this friend.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B003", module: "neg_quality", subscale: "support", text: "When I am upset, this friend often minimizes my feelings or changes the subject.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B004", module: "neg_quality", subscale: "support", text: "I usually feel supported emotionally after talking with this friend.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "B005", module: "neg_quality", subscale: "betrayal", text: "This friend has shared something I told them in confidence without my permission.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B006", module: "neg_quality", subscale: "betrayal", text: "I sometimes feel betrayed by things my friend says or does to others.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B007", module: "neg_quality", subscale: "trust", text: "I trust this friend to keep my personal information private.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "B008", module: "neg_quality", subscale: "reliability", text: "This friend cancels plans at the last minute often.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B009", module: "neg_quality", subscale: "reciprocity", text: "When I need help, this friend is as available as I am for them.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "B010", module: "neg_quality", subscale: "conflict_management", text: "When we argue, the problem is usually resolved, and we move on.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "B011", module: "neg_quality", subscale: "emotional_consistency", text: "This friend’s responses to my feelings are unpredictable.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B012", module: "neg_quality", subscale: "loyalty", text: "I feel confident this friend would stand up for me in front of others.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "B013", module: "neg_quality", subscale: "abandonment", text: "This friend has left me alone in situations where I needed them.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "B014", module: "neg_quality", subscale: "emotional_availability", text: "This friend is emotionally available when I reach out.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },

  // --- MODULE C: Relational Aggression (14 items) ---
  { id: "C001", module: "relational_aggression", subscale: "exclusion", text: "This friend excludes me from social plans I expected to be included in.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C002", module: "relational_aggression", subscale: "exclusion", text: "I notice this friend organizes group activities without telling me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C003", module: "relational_aggression", subscale: "rumor_gossip", text: "I suspect this friend repeats or distorts things I say.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C004", module: "relational_aggression", subscale: "rumor_gossip", text: "I have heard that this friend has said negative things about me to others.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C005", module: "relational_aggression", subscale: "triangulation", text: "This friend involves third parties to pressure or shame me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C006", module: "relational_aggression", subscale: "triangulation", text: "They often compare me unfavorably to others in our circle.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C007", module: "relational_aggression", subscale: "public_private_inconsistency", text: "This friend is warm in private but critical or joking at my expense in public.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C008", module: "relational_aggression", subscale: "reputation_damage", text: "I worry that this friend damages my reputation among mutual friends.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C009", module: "relational_aggression", subscale: "social_pressure", text: "This friend pressures others to side with them during disagreements.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C010", module: "relational_aggression", subscale: "silent_treatment", text: "This friend gives me the silent treatment as a way to punish me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C011", module: "relational_aggression", subscale: "status_games", text: "This friend uses status or influence to make me feel smaller.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C012", module: "relational_aggression", subscale: "exclusion_signals", text: "I notice subtle signals (eye-rolling, ignoring) from this friend when I join group conversations.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C013", module: "relational_aggression", subscale: "rumor_confirm", text: "People have asked me about things they've heard about me that originated with this friend.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "C014", module: "relational_aggression", subscale: "social_sabotage", text: "I have been intentionally left out of plans that I would have expected to be invited to.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },

  // --- MODULE D: Manipulation & Control (18 items) ---
  { id: "D001", module: "manipulation", subscale: "guilt_pressure", text: "This friend reminds me of things they've done for me when they want me to comply.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D002", module: "manipulation", subscale: "guilt_pressure", text: "I feel guilty when I say 'no' to this friend.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D003", module: "manipulation", subscale: "emotional_blackmail", text: "This friend hints they will be very hurt if I do not do what they ask.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D004", module: "manipulation", subscale: "emotional_blackmail", text: "This friend implies they might harm themselves if I leave or upset them.", responseType: "binary", reverseCoded: false, weight: 1, hardFlag: true },
  { id: "D005", module: "manipulation", subscale: "boundary_violation", text: "This friend shows up uninvited or goes through my things without permission.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D006", module: "manipulation", subscale: "dependency_induction", text: "This friend frequently asks me for financial or practical favors that feel excessive.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D007", module: "manipulation", subscale: "dependency_induction", text: "I sometimes feel manipulated because they emphasize how much they need me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D008", module: "manipulation", subscale: "guilt_pressure_public", text: "This friend expresses disappointment publicly to pressure me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D009", module: "manipulation", subscale: "selective_vulnerability", text: "The friend shares deeply personal things to make me feel responsible for them.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D010", module: "manipulation", subscale: "favors_exchange", text: "When I refuse a request, this friend reminds me of favors they've done as leverage.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D011", module: "manipulation", subscale: "controlling_conversation", text: "This friend regularly interrupts or redirects conversations to center their own needs.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D012", module: "manipulation", subscale: "gaslight_tone", text: "This friend frequently suggests I misremember events to make me doubt myself.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D013", module: "manipulation", subscale: "obligation_reminder", text: "The friend reminds me of past sacrifices I've made for them when I set boundaries.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D014", module: "manipulation", subscale: "entitlement", text: "This friend acts entitled to my time or resources without considering my needs.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D015", module: "manipulation", subscale: "coercive_sweetness", text: "This friend alternates between kindness and pressure to get what they want.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D016", module: "manipulation", subscale: "withdraw_as_punishment", text: "This friend withdraws affection as punishment when I don’t comply.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D017", module: "manipulation", subscale: "privacy_pressure", text: "This friend tries to convince me to keep secrets that make me uncomfortable.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "D018", module: "manipulation", subscale: "boundary_test", text: "This friend repeatedly tests my boundaries after I set them.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },

  // --- MODULE E: Antisocial / Unsafe Influence (14 items) ---
  { id: "E001", module: "antisocial", subscale: "pressure_to_risk", text: "This friend encourages me to do things I know are risky or illegal.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E002", module: "antisocial", subscale: "pressure_to_risk", text: "This friend has asked me to lie for them or cover up something.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E003", module: "antisocial", subscale: "dishonesty", text: "This friend lies easily about important things.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E004", module: "antisocial", subscale: "chaos", text: "This friend’s life seems to be in constant crisis and it drags me in.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E005", module: "antisocial", subscale: "aggression_outside", text: "This friend acts aggressively or disrespectfully toward strangers or service workers.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E006", module: "antisocial", subscale: "impulsivity", text: "This friend makes impulsive choices that have caused problems for me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E007", module: "antisocial", subscale: "legal_risk", text: "This friend has involved me in situations with legal or financial risk.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E008", module: "antisocial", subscale: "violent_acts", text: "This friend has a history of physical fights or aggressive behavior.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: true },
  { id: "E009", module: "antisocial", subscale: "substance_pressure", text: "This friend pressures me to use substances when I don't want to.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E010", module: "antisocial", subscale: "reckless_financial", text: "This friend asks me to contribute money or cover expenses they then mismanage.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E011", module: "antisocial", subscale: "boundary_violence", text: "This friend has forced or coerced me into situations I wasn't comfortable with.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: true },
  { id: "E012", module: "antisocial", subscale: "lying_pressure", text: "This friend expects me to lie on their behalf to other people.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "E013", module: "antisocial", subscale: "stalking_behaviors", text: "This friend monitors my whereabouts or pressures me to report location.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: true },
  { id: "E014", module: "antisocial", subscale: "risky_association", text: "Being around this friend often leads to drama or trouble with others.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },

  // --- MODULE F: Vulnerability & Resilience Inventory (20 items) ---
  { id: "F001", module: "vulnerability", subscale: "social_isolation", text: "I have only a small number of people I can rely on when I’m upset.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F002", module: "vulnerability", subscale: "attachment_anxiety", text: "I worry a lot about being abandoned by people close to me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F003", module: "vulnerability", subscale: "low_self_worth", text: "I often feel unworthy of close friendships.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F004", module: "vulnerability", subscale: "conflict_avoidance", text: "I avoid confrontation even when something bothers me.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F005", module: "vulnerability", subscale: "coping_skills_positive", text: "I have effective strategies to calm myself when I feel stressed.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F006", module: "vulnerability", subscale: "access_support", text: "I have a trusted person I could stay with in an emergency.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F007", module: "vulnerability", subscale: "financial_dependency", text: "I sometimes depend on this friend for financial or housing support.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F008", module: "vulnerability", subscale: "minority_stress", text: "I have experienced discrimination or minority stress in my life.", responseType: "binary", reverseCoded: false, weight: 1, hardFlag: false, notes: "opt-in" },
  { id: "F009", module: "vulnerability", subscale: "trauma_history", text: "I have a history of past trauma that still affects me.", responseType: "binary", reverseCoded: false, weight: 1, hardFlag: false, notes: "opt-in" },
  { id: "F010", module: "vulnerability", subscale: "resilience_network", text: "I have multiple people outside this friend I can call for emotional support.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F011", module: "vulnerability", subscale: "self_efficacy", text: "I feel confident making decisions that protect my wellbeing.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F012", module: "vulnerability", subscale: "help_seeking", text: "I feel comfortable asking for help when I need it.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F013", module: "vulnerability", subscale: "housing_stability", text: "I would be able to leave quickly if I needed a different place to stay.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F014", module: "vulnerability", subscale: "cultural_stress", text: "Being in a different cultural or language environment makes it harder to get help.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F015", module: "vulnerability", subscale: "burnout", text: "I often feel mentally or emotionally exhausted from daily life stress.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F016", module: "vulnerability", subscale: "self_care_capacity", text: "I prioritize my own needs even when others ask a lot of me.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F017", module: "vulnerability", subscale: "boundary_confidence", text: "I am good at telling people when they cross my boundaries.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F018", module: "vulnerability", subscale: "legal_support", text: "I know who to contact for legal help if I needed it.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },
  { id: "F019", module: "vulnerability", subscale: "language_barrier", text: "Language or immigration status limits my options for support.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "F020", module: "vulnerability", subscale: "recovery_speed", text: "I bounce back quickly after difficult interactions.", responseType: "freq", reverseCoded: true, weight: 1, hardFlag: false },

  // --- MODULE G: Emotional Harm Impact (16 items) ---
  { id: "G001", module: "impact", subscale: "drain", text: "I need a long time to recover after spending time with this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G002", module: "impact", subscale: "rumination", text: "I replay conversations with this friend in my head for hours or days.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G003", module: "impact", subscale: "anxiety_sleep", text: "Worry about interactions with this friend interferes with my sleep.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G004", module: "impact", subscale: "concentration", text: "This friendship distracts me at work or school.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G005", module: "impact", subscale: "mood", text: "I feel low or hopeless because of this friendship.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G006", module: "impact", subscale: "avoidance", text: "I cancel plans with other people because of stress about this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G007", module: "impact", subscale: "self_esteem", text: "My confidence has declined because of interactions with this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G008", module: "impact", subscale: "social_withdrawal", text: "I avoid social situations to avoid interacting with this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G009", module: "impact", subscale: "physical_symptoms", text: "I experience physical symptoms (e.g., stomachache, headache) after difficult interactions with this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G010", module: "impact", subscale: "dependence_effect", text: "My life choices have been affected because I depend on this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G011", module: "impact", subscale: "professional_effect", text: "My work/studies performance has suffered because of this friendship.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G012", module: "impact", subscale: "safety_worry", text: "I worry about my personal safety after conflicts with this friend.", responseType: "impact", reverseCoded: false, weight: 2, hardFlag: true },
  { id: "G013", module: "impact", subscale: "emotional_numbness", text: "I feel emotionally numb or shut down around this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G014", module: "impact", subscale: "self_blame", text: "I find myself blaming myself frequently after interactions with this friend.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "G015", module: "impact", subscale: "alcohol_drug_use", text: "I use alcohol or substances more because of stress from this friendship.", responseType: "impact", reverseCoded: false, weight: 1, hardFlag: true },
  { id: "G016", module: "impact", subscale: "suicidal_thoughts", text: "Thoughts of harming myself have increased because of this friendship.", responseType: "binary", reverseCoded: false, weight: 1, hardFlag: true },

  // --- MODULE H: Validity / Attention Checks (6 items) ---
  { id: "V001", module: "validity", subscale: "attention_check", text: "Please select 'Sometimes' for this question.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "V002", module: "validity", subscale: "inconsistent_check", text: "I always choose the same response for every question.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "V003", module: "validity", subscale: "bogus_item", text: "I own a pet dragon.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "V004", module: "validity", subscale: "speed_check", text: "I have read every question carefully.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "V005", module: "validity", subscale: "honesty_check", text: "I have answered these items honestly to the best of my ability.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false },
  { id: "V006", module: "validity", subscale: "final_attention", text: "Select 'Rarely' for this item.", responseType: "freq", reverseCoded: false, weight: 1, hardFlag: false }
];

export const OPTIONS = {
  freq: ["0 - Never", "1 - Rarely", "2 - Sometimes", "3 - Often", "4 - Very Often"],
  impact: ["0 - Not at all", "1 - A little", "2 - Somewhat", "3 - A lot", "4 - Extremely"],
  binary: ["No", "Yes"]
};
