/**
 * 🔒 SECURE VAULT: INFIDELITY DETECTOR (100 ITEMS)
 * * WARNING: DO NOT MODIFY THIS FILE.
 * * Measures 5 domains: Digital, Schedule, Intimacy, Defensiveness, Physical.
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
const agree5 = ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"];
const change4 = ["0 - No Change", "1 - Slight Change", "2 - Moderate Change", "3 - Drastic Change"];

export const infidelityQuestions: Question[] = [
  // MODULE A: DIGITAL SECURITY & PHONE HABITS (20 items)
  { id: "I_Dig_1", moduleKey: "A", subscaleKey: "Digital", text: "He takes his phone with him everywhere, even just to the bathroom or another room.", options: freq5 },
  { id: "I_Dig_2", moduleKey: "A", subscaleKey: "Digital", text: "He has recently changed his phone passcode without a clear reason.", options: agree5 },
  { id: "I_Dig_3", moduleKey: "A", subscaleKey: "Digital", text: "He places his phone face down when he sets it on a table.", options: freq5 },
  { id: "I_Dig_4", moduleKey: "A", subscaleKey: "Digital", text: "His phone is constantly on 'Do Not Disturb' or 'Airplane Mode' when he is around you.", options: freq5 },
  { id: "I_Dig_5", moduleKey: "A", subscaleKey: "Digital", text: "He gets visibly jumpy or anxious if you touch or pick up his phone.", options: freq5 },
  { id: "I_Dig_6", moduleKey: "A", subscaleKey: "Digital", text: "You have noticed him hastily closing apps or swiping away from screens when you enter the room.", options: freq5 },
  { id: "I_Dig_7", moduleKey: "A", subscaleKey: "Digital", text: "His notification previews are hidden (messages just say 'Notification' instead of showing the text).", options: agree5 },
  { id: "I_Dig_8", moduleKey: "A", subscaleKey: "Digital", text: "He clears his browser history or text message threads regularly.", options: agree5 },
  { id: "I_Dig_9", moduleKey: "A", subscaleKey: "Digital", text: "He uses disappearing message apps (like Snapchat, Signal, Telegram) more than he used to.", options: agree5 },
  { id: "I_Dig_10", moduleKey: "A", subscaleKey: "Digital", text: "He turns his screen away from you or angles his body so you cannot see who he is texting.", options: freq5 },
  { id: "I_Dig_11", moduleKey: "A", subscaleKey: "Digital", text: "He is frequently online (WhatsApp, Instagram) late at night when you are asleep.", options: freq5 },
  { id: "I_Dig_12", moduleKey: "A", subscaleKey: "Digital", text: "He receives texts at odd hours and claims it's 'just work' or 'spam'.", options: freq5 },
  { id: "I_Dig_13", moduleKey: "A", subscaleKey: "Digital", text: "He has a secondary phone or email account that he keeps quiet about.", options: agree5 },
  { id: "I_Dig_14", moduleKey: "A", subscaleKey: "Digital", text: "He has become highly defensive if you playfully ask who he is texting.", options: freq5 },
  { id: "I_Dig_15", moduleKey: "A", subscaleKey: "Digital", text: "He leaves his phone openly unlocked around you.", options: freq5, reverseScore: true },
  { id: "I_Dig_16", moduleKey: "A", subscaleKey: "Digital", text: "He has un-tagged himself from photos of you two together.", options: agree5 },
  { id: "I_Dig_17", moduleKey: "A", subscaleKey: "Digital", text: "He has suddenly changed his social media profile pictures to look single/more attractive.", options: agree5 },
  { id: "I_Dig_18", moduleKey: "A", subscaleKey: "Digital", text: "He suddenly cares a lot more about his followers or engagement on social media.", options: agree5 },
  { id: "I_Dig_19", moduleKey: "A", subscaleKey: "Digital", text: "He has started muting specific female friends/colleagues' stories so they don't pop up.", options: freq5 },
  { id: "I_Dig_20", moduleKey: "A", subscaleKey: "Digital", text: "He refuses to let you connect your phone to his car's Bluetooth for music.", options: freq5 },

  // MODULE B: SCHEDULE, ROUTINE & LOGISTICS (20 items)
  { id: "I_Sch_1", moduleKey: "B", subscaleKey: "Schedule", text: "Rate the change: He is suddenly 'working late' far more frequently.", options: change4 },
  { id: "I_Sch_2", moduleKey: "B", subscaleKey: "Schedule", text: "Rate the change: He has unaccounted chunks of time where he is unreachable.", options: change4 },
  { id: "I_Sch_3", moduleKey: "B", subscaleKey: "Schedule", text: "He picks fights right before weekends or holidays, giving him an excuse to storm out.", options: freq5 },
  { id: "I_Sch_4", moduleKey: "B", subscaleKey: "Schedule", text: "His explanations for where he was are overly detailed, as if rehearsed.", options: freq5 },
  { id: "I_Sch_5", moduleKey: "B", subscaleKey: "Schedule", text: "Conversely, his explanations are impossibly vague ('just out', 'hanging out').", options: freq5 },
  { id: "I_Sch_6", moduleKey: "B", subscaleKey: "Schedule", text: "He runs 'quick errands' (going to the store/gym) that inexplicably take hours.", options: freq5 },
  { id: "I_Sch_7", moduleKey: "B", subscaleKey: "Schedule", text: "He has started going to the gym at odd or inconsistent hours.", options: agree5 },
  { id: "I_Sch_8", moduleKey: "B", subscaleKey: "Schedule", text: "He has suddenly developed a new hobby that completely excludes you.", options: agree5 },
  { id: "I_Sch_9", moduleKey: "B", subscaleKey: "Schedule", text: "He is unexpectedly taking more business trips or overnight travels.", options: agree5 },
  { id: "I_Sch_10", moduleKey: "B", subscaleKey: "Schedule", text: "He becomes furious if you show up unannounced to his work or a hangout.", options: freq5 },
  { id: "I_Sch_11", moduleKey: "B", subscaleKey: "Schedule", text: "Rate the change: He cancels dates or plans with you at the last minute.", options: change4 },
  { id: "I_Sch_12", moduleKey: "B", subscaleKey: "Schedule", text: "His daily commute time seems to vary wildly without a traffic explanation.", options: agree5 },
  { id: "I_Sch_13", moduleKey: "B", subscaleKey: "Schedule", text: "He discourages you from calling him during specific times of the day.", options: freq5 },
  { id: "I_Sch_14", moduleKey: "B", subscaleKey: "Schedule", text: "When you try to plan future vacations or events, he is suddenly non-committal.", options: freq5 },
  { id: "I_Sch_15", moduleKey: "B", subscaleKey: "Schedule", text: "He seamlessly shares his location with you on his phone.", options: freq5, reverseScore: true },
  { id: "I_Sch_16", moduleKey: "B", subscaleKey: "Schedule", text: "He has started going out with 'friends' you have never met or barely know.", options: agree5 },
  { id: "I_Sch_17", moduleKey: "B", subscaleKey: "Schedule", text: "He uses a specific friend as an alibi constantly, but that friend acts weird around you.", options: freq5 },
  { id: "I_Sch_18", moduleKey: "B", subscaleKey: "Schedule", text: "He gets defensive if you ask simple logistical questions like 'What time will you be home?'", options: freq5 },
  { id: "I_Sch_19", moduleKey: "B", subscaleKey: "Schedule", text: "He is consistently late returning home, but never apologetic about it.", options: freq5 },
  { id: "I_Sch_20", moduleKey: "B", subscaleKey: "Schedule", text: "His mileage on his car doesn't match the places he claims to be going.", options: agree5 },

  // MODULE C: EMOTIONAL DISTANCE & INTIMACY SHIFTS (20 items)
  { id: "I_Emo_1", moduleKey: "C", subscaleKey: "Emotion", text: "Rate the change: Your sex life has sharply decreased or stopped entirely.", options: change4 },
  { id: "I_Emo_2", moduleKey: "C", subscaleKey: "Emotion", text: "Rate the change: He is suddenly demanding new, specific sexual acts he never cared about before.", options: change4 },
  { id: "I_Emo_3", moduleKey: "C", subscaleKey: "Emotion", text: "He seems emotionally checked out, constantly staring into space when you are together.", options: freq5 },
  { id: "I_Emo_4", moduleKey: "C", subscaleKey: "Emotion", text: "He no longer asks about your day, your feelings, or your life.", options: agree5 },
  { id: "I_Emo_5", moduleKey: "C", subscaleKey: "Emotion", text: "When you say 'I love you,' he responds with silence or a non-committal 'me too'.", options: freq5 },
  { id: "I_Emo_6", moduleKey: "C", subscaleKey: "Emotion", text: "He avoids eye contact during intimate moments or deep conversations.", options: freq5 },
  { id: "I_Emo_7", moduleKey: "C", subscaleKey: "Emotion", text: "He randomly showers you with expensive gifts out of guilt (love bombing to compensate).", options: freq5 },
  { id: "I_Emo_8", moduleKey: "C", subscaleKey: "Emotion", text: "He is incredibly easily annoyed by quirks of yours he used to find endearing.", options: freq5 },
  { id: "I_Emo_9", moduleKey: "C", subscaleKey: "Emotion", text: "He seems to be comparing you to someone else silently.", options: agree5 },
  { id: "I_Emo_10", moduleKey: "C", subscaleKey: "Emotion", text: "He stops saying 'we' when talking about the future, switching to 'I'.", options: freq5 },
  { id: "I_Emo_11", moduleKey: "C", subscaleKey: "Emotion", text: "He picks fights over completely irrelevant things to avoid physical intimacy.", options: freq5 },
  { id: "I_Emo_12", moduleKey: "C", subscaleKey: "Emotion", text: "He treats you more like a roommate or an assistant than a romantic partner.", options: agree5 },
  { id: "I_Emo_13", moduleKey: "C", subscaleKey: "Emotion", text: "He makes you feel like your need for emotional connection is an unreasonable burden.", options: freq5 },
  { id: "I_Emo_14", moduleKey: "C", subscaleKey: "Emotion", text: "He frequently remarks that you 'deserve better' or 'he's not good enough for you'.", options: freq5 },
  { id: "I_Emo_15", moduleKey: "C", subscaleKey: "Emotion", text: "He is highly engaged and present when you go on dates.", options: freq5, reverseScore: true },
  { id: "I_Emo_16", moduleKey: "C", subscaleKey: "Emotion", text: "He no longer compliments your appearance.", options: agree5 },
  { id: "I_Emo_17", moduleKey: "C", subscaleKey: "Emotion", text: "He acts entirely indifferent if you mention another man or try to make him jealous.", options: freq5 },
  { id: "I_Emo_18", moduleKey: "C", subscaleKey: "Emotion", text: "His mood instantly drops when he walks through the front door.", options: freq5 },
  { id: "I_Emo_19", moduleKey: "C", subscaleKey: "Emotion", text: "He has stopped complaining about things in the relationship (as if he has given up).", options: agree5 },
  { id: "I_Emo_20", moduleKey: "C", subscaleKey: "Emotion", text: "He is highly secretive about his finances suddenly.", options: agree5 },

  // MODULE D: DEFENSIVENESS, GASLIGHTING & CONFLICT (20 items)
  { id: "I_Def_1", moduleKey: "D", subscaleKey: "Defensive", text: "If you ask him a simple question, he answers with 'Why are you interrogating me?'", options: freq5 },
  { id: "I_Def_2", moduleKey: "D", subscaleKey: "Defensive", text: "He accuses YOU of being unfaithful or untrustworthy out of nowhere.", options: freq5 },
  { id: "I_Def_3", moduleKey: "D", subscaleKey: "Defensive", text: "When you express a suspicion, he calls you 'crazy', 'insecure', or 'paranoid'.", options: freq5 },
  { id: "I_Def_4", moduleKey: "D", subscaleKey: "Defensive", text: "He turns the conversation around to blame you for his bad behavior.", options: freq5 },
  { id: "I_Def_5", moduleKey: "D", subscaleKey: "Defensive", text: "He tells you that your memory of an event is entirely wrong (Gaslighting).", options: freq5 },
  { id: "I_Def_6", moduleKey: "D", subscaleKey: "Defensive", text: "He frequently uses the phrase 'You always ruin everything' when you ask for reassurance.", options: freq5 },
  { id: "I_Def_7", moduleKey: "D", subscaleKey: "Defensive", text: "He acts like a victim, claiming you are suffocating him when you ask for basic respect.", options: freq5 },
  { id: "I_Def_8", moduleKey: "D", subscaleKey: "Defensive", text: "He threatens to break up or leave every time you try to have a serious conversation.", options: freq5 },
  { id: "I_Def_9", moduleKey: "D", subscaleKey: "Defensive", text: "He brings up a female colleague/friend often, but gets furious if you ask about her.", options: freq5 },
  { id: "I_Def_10", moduleKey: "D", subscaleKey: "Defensive", text: "If caught in a small lie, his reaction is explosive rage rather than an apology.", options: freq5 },
  { id: "I_Def_11", moduleKey: "D", subscaleKey: "Defensive", text: "He tells you that you are violating his privacy just by standing near his phone.", options: freq5 },
  { id: "I_Def_12", moduleKey: "D", subscaleKey: "Defensive", text: "He says 'I can't deal with this right now' and leaves the house during arguments.", options: freq5 },
  { id: "I_Def_13", moduleKey: "D", subscaleKey: "Defensive", text: "He demands absolute trust without doing anything to earn it.", options: agree5 },
  { id: "I_Def_14", moduleKey: "D", subscaleKey: "Defensive", text: "He makes you feel guilty for simply asking for his time.", options: freq5 },
  { id: "I_Def_15", moduleKey: "D", subscaleKey: "Defensive", text: "He listens calmly and reassures you when you express an insecurity.", options: freq5, reverseScore: true },
  { id: "I_Def_16", moduleKey: "D", subscaleKey: "Defensive", text: "He claims you are trying to 'control' him when you ask about his weekend plans.", options: freq5 },
  { id: "I_Def_17", moduleKey: "D", subscaleKey: "Defensive", text: "He tries to convince your mutual friends that you are losing your mind.", options: agree5 },
  { id: "I_Def_18", moduleKey: "D", subscaleKey: "Defensive", text: "He frequently 'forgets' details of his own alibis.", options: freq5 },
  { id: "I_Def_19", moduleKey: "D", subscaleKey: "Defensive", text: "He is hypersensitive to the word 'cheating' and avoids topics about it on TV/movies.", options: agree5 },
  { id: "I_Def_20", moduleKey: "D", subscaleKey: "Defensive", text: "He rewrites the history of your relationship, claiming he was 'never truly happy'.", options: freq5 },

  // MODULE E: PHYSICAL EVIDENCE & CHANGES (20 items)
  { id: "I_Phy_1", moduleKey: "E", subscaleKey: "Physical", text: "Rate the change: He is suddenly obsessing over his physical appearance.", options: change4 },
  { id: "I_Phy_2", moduleKey: "E", subscaleKey: "Physical", text: "He has bought new, stylish clothes or underwear that you didn't help pick out.", options: agree5 },
  { id: "I_Phy_3", moduleKey: "E", subscaleKey: "Physical", text: "He wears cologne or grooms himself specifically before 'going to the gym' or 'running errands'.", options: freq5 },
  { id: "I_Phy_4", moduleKey: "E", subscaleKey: "Physical", text: "He immediately showers the second he gets home, before even greeting you.", options: freq5 },
  { id: "I_Phy_5", moduleKey: "E", subscaleKey: "Physical", text: "You have found receipts, tickets, or restaurant bills for places you didn't go together.", options: agree5 },
  { id: "I_Phy_6", moduleKey: "E", subscaleKey: "Physical", text: "He has unexplained ATM cash withdrawals (to avoid leaving a digital paper trail).", options: agree5 },
  { id: "I_Phy_7", moduleKey: "E", subscaleKey: "Physical", text: "He has a new scent on him (perfume, different soap, alcohol) when he comes home.", options: freq5 },
  { id: "I_Phy_8", moduleKey: "E", subscaleKey: "Physical", text: "You have noticed unexplained hairs or makeup stains in his car or on his clothes.", options: agree5 },
  { id: "I_Phy_9", moduleKey: "E", subscaleKey: "Physical", text: "His car interior is suddenly meticulously clean, especially the passenger side.", options: agree5 },
  { id: "I_Phy_10", moduleKey: "E", subscaleKey: "Physical", text: "He is overly protective of his laundry, insisting on doing it himself suddenly.", options: agree5 },
  { id: "I_Phy_11", moduleKey: "E", subscaleKey: "Physical", text: "He leaves the room to take phone calls, speaking in a hushed, quiet tone.", options: freq5 },
  { id: "I_Phy_12", moduleKey: "E", subscaleKey: "Physical", text: "You have noticed a second phone charger in his car or bag.", options: agree5 },
  { id: "I_Phy_13", moduleKey: "E", subscaleKey: "Physical", text: "He has started manscaping or shaving areas he never used to care about.", options: agree5 },
  { id: "I_Phy_14", moduleKey: "E", subscaleKey: "Physical", text: "He guards his wallet or work bag fiercely.", options: freq5 },
  { id: "I_Phy_15", moduleKey: "E", subscaleKey: "Physical", text: "You have full, unquestioned access to his physical spaces (car, bags, home).", options: agree5, reverseScore: true },
  { id: "I_Phy_16", moduleKey: "E", subscaleKey: "Physical", text: "He has 'lost' his wedding ring or stops wearing it entirely.", options: agree5 },
  { id: "I_Phy_17", moduleKey: "E", subscaleKey: "Physical", text: "He receives gifts or items he claims he 'bought for himself' but seem out of character.", options: agree5 },
  { id: "I_Phy_18", moduleKey: "E", subscaleKey: "Physical", text: "He has unexplained scratch marks or physical changes.", options: agree5 },
  { id: "I_Phy_19", moduleKey: "E", subscaleKey: "Physical", text: "Your deep, intuitive 'gut feeling' is screaming at you that something is wrong.", options: agree5 },
  { id: "I_Phy_20", moduleKey: "E", subscaleKey: "Physical", text: "He refuses to look you directly in the eyes when you ask where he was.", options: freq5 }
];
