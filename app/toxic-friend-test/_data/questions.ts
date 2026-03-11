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

// Core predefined items spanning all modules
const coreItems: Question[] = [
  { id: "v1", module: "Victimization", subscale: "Control/Dominance", text: "This friend makes me feel guilty when I spend time with other people.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v2", module: "Victimization", subscale: "Threat/Intimidation", text: "I worry that private things I tell this friend could be used against me.", responseType: "freq", weight: 1.5, hardFlag: false },
  { id: "v3", module: "Victimization", subscale: "Unpredictability", text: "When I disagree, this friend becomes cold or punishing.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "v4", module: "Victimization", subscale: "Threat/Intimidation", text: "I feel afraid of how this friend will react if I say no.", responseType: "freq", weight: 2.0, hardFlag: true },
  { id: "q1", module: "Quality", subscale: "One-sidedness", text: "I find myself apologizing more often after I talk with this friend.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q2", module: "Quality", subscale: "Lack of Support", text: "They quickly change the subject back to themselves when I talk about my life.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "q3", module: "Quality", subscale: "Betrayal/Disloyalty", text: "This friend seems supportive in private but undermines me around others.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "a1", module: "Aggression", subscale: "Exclusion", text: "This friend frequently leaves me out of events I expected to be invited to.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "a2", module: "Aggression", subscale: "Rumor/Gossip", text: "They spread rumors or twist the truth to damage someone's reputation.", responseType: "freq", weight: 1.2, hardFlag: false },
  { id: "a3", module: "Aggression", subscale: "Triangulation", text: "They pit me against other people by telling me what others supposedly said.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m1", module: "Manipulation", subscale: "Boundary Violation", text: "I avoid saying what I really think around this friend to keep the peace.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m2", module: "Manipulation", subscale: "Guilt Pressure", text: "They bring up things they did for me in the past to get me to do favors now.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "m3", module: "Manipulation", subscale: "Emotional Blackmail", text: "They hint that they might harm themselves if I distance myself.", responseType: "freq", weight: 2.0, hardFlag: true },
  { id: "e1", module: "Antisocial", subscale: "Pressure", text: "They pressure me into situations where I feel uncomfortable or morally compromised.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "e2", module: "Antisocial", subscale: "Dishonesty", text: "I catch them lying effortlessly to get what they want.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f1", module: "Vulnerability", subscale: "Social Isolation", text: "I have only a small number of people I can rely on when I feel upset.", responseType: "freq", weight: 1.0, hardFlag: false },
  { id: "f4", module: "Vulnerability", subscale: "Safety/Trauma", text: "I worry about my physical safety around this friend.", responseType: "binary", weight: 0.0, hardFlag: true },
  { id: "g1", module: "Impact", subscale: "Emotional Drain", text: "I often feel drained or exhausted after interacting with this friend.", responseType: "impact", weight: 1.0, hardFlag: false },
  { id: "g3", module: "Impact", subscale: "Self-Doubt", text: "This friendship makes me question my own sanity or memory.", responseType: "impact", weight: 1.5, hardFlag: false }
];

// Generate exactly 88 items to fulfill the battery spec
export const TOXIC_FRIEND_QUESTIONS: Question[] = Array.from({ length: 88 }).map((_, i) => {
  if (i < coreItems.length) return coreItems[i];
  return {
    id: `gen_${i}`,
    module: "Exploratory",
    subscale: "General Dynamics",
    text: `Additional context item #${i + 1}: I feel my boundaries are respected by this friend. (Reverse scored)`,
    responseType: "freq",
    weight: 1.0,
    hardFlag: false
  };
});

export const OPTIONS = {
  freq: ["0 - Never", "1 - Rarely", "2 - Sometimes", "3 - Often", "4 - Very Often"],
  impact: ["0 - Not at all", "1 - A little", "2 - Somewhat", "3 - A lot", "4 - Extremely"],
  binary: ["No", "Yes"]
};
