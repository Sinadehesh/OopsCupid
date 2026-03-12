/**
 * 🔒 SECURE VAULT: ATTACHMENT STYLE BATTERY (92 ITEMS)
 * * WARNING: DO NOT MODIFY THIS FILE OR REMOVE ITEMS.
 * This is the strict clinical battery consisting of:
 * - Demographics (3)
 * - ECR-RS (45)
 * - Rosenberg (10)
 * - DERS-16 (16)
 * - Love Styles (18)
 * TOTAL: 92 Questions
 */

export type Question = {
  id: string; 
  section?: string; 
  subscale?: string; 
  text: string; 
  options: string[]; 
  reverseScore?: boolean;
};

// 1. DEMOGRAPHICS (3 items)
const demoQ: Question[] = [
  { id: "demo_1", section: "demographics", text: "What is your current relationship status?", options: ["Single", "In a relationship", "It's complicated"] },
  { id: "demo_2", section: "demographics", text: "Do you have children?", options: ["Yes", "No"] },
  { id: "demo_3", section: "demographics", text: "What is your gender?", options: ["Woman", "Man", "Non-binary / Prefer not to say"] },
];

// 2. ECR-RS (45 items across 5 domains)
const ecrBasePlural = [
  "It helps to turn to [TARGET] in times of need.",
  "I usually discuss my problems and concerns with [TARGET].",
  "I talk things over with [TARGET].",
  "I find it easy to depend on [TARGET].",
  "I don't feel comfortable opening up to [TARGET].",
  "I prefer not to show [TARGET] how I feel deep down.",
  "I often worry that [TARGET] don't really care for me.",
  "I'm afraid that [TARGET] may abandon me.",
  "I worry that [TARGET] won't care about me as much as I care about them."
];

const ecrBaseSingular = [
  "It helps to turn to [TARGET] in times of need.",
  "I usually discuss my problems and concerns with [TARGET].",
  "I talk things over with [TARGET].",
  "I find it easy to depend on [TARGET].",
  "I don't feel comfortable opening up to [TARGET].",
  "I prefer not to show [TARGET] how I feel deep down.",
  "I often worry that [TARGET] doesn't really care for me.",
  "I'm afraid that [TARGET] may abandon me.",
  "I worry that [TARGET] won't care about me as much as I care about them."
];

const ecrDomainsConfig = [
  { key: "general", text: "people I am close to", textFirst: "people I am close to", plural: true },
  { key: "romantic", text: "my romantic partner", textFirst: "my romantic partner", plural: false },
  { key: "mother", text: "my mother", textFirst: "my mother (or mother-like figure)", plural: false },
  { key: "father", text: "my father", textFirst: "my father (or father-like figure)", plural: false },
  { key: "work", text: "my coworkers", textFirst: "my coworkers", plural: true }
];

const ecrQ: Question[] = [];
ecrDomainsConfig.forEach(({ key, text, textFirst, plural }) => {
  const base = plural ? ecrBasePlural : ecrBaseSingular;
  base.forEach((qText, i) => {
    const targetText = i === 0 ? textFirst : text;
    ecrQ.push({
      id: `ecr_${key}_${i + 1}`,
      section: "ecr",
      subscale: key.charAt(0).toUpperCase() + key.slice(1),
      text: qText.replace(/\[TARGET\]/g, targetText),
      options: ["1 - Strongly Disagree", "2", "3", "4", "5", "6", "7 - Strongly Agree"]
    });
  });
});

// 3. ROSENBERG SELF-ESTEEM (10 items)
const rsQ: Question[] = [
  "On the whole, I am satisfied with myself.",
  "At times I think I am no good at all.",
  "I feel that I have a number of good qualities.",
  "I am able to do things as well as most other people.",
  "I feel I do not have much to be proud of.",
  "I certainly feel useless at times.",
  "I feel that I'm a person of worth, at least on an equal plane with others.",
  "I wish I could have more respect for myself.",
  "All in all, I am inclined to feel that I am a failure.",
  "I take a positive attitude toward myself."
].map((text, i) => ({
  id: `rs_${i + 1}`,
  section: "rosenberg",
  text,
  options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Agree", "4 - Strongly Agree"]
}));

// 4. DERS-16 EMOTION REGULATION (16 items)
const dersQ: Question[] = [
  "I have difficulty making sense out of my feelings.",
  "I am confused about how I feel.",
  "When I'm upset, I have difficulty getting work done.",
  "When I'm upset, I become out of control.",
  "When I'm upset, I believe that I will remain that way for a long time.",
  "When I'm upset, I believe that I'll end up feeling very depressed.",
  "When I'm upset, I have difficulty focusing on other things.",
  "When I'm upset, I feel out of control.",
  "When I'm upset, I feel ashamed with myself for feeling that way.",
  "When I'm upset, I feel like I am weak.",
  "When I'm upset, I feel angry with myself for feeling that way.",
  "When I'm upset, I believe that there is nothing I can do to make myself feel better.",
  "When I'm upset, I become angry with myself for feeling that way.",
  "When I'm upset, I start to feel very bad about myself.",
  "When I'm upset, I have difficulty thinking about anything else.",
  "When I'm upset, my emotions feel overwhelming."
].map((text, i) => ({
  id: `ders_${i + 1}`,
  section: "ders",
  text,
  options: ["1 - Almost never", "2 - Sometimes", "3 - About half the time", "4 - Most of the time", "5 - Almost always"]
}));

// 5. LOVE STYLES (18 items)
const loveStyles = [
  { id: "ls_eros_1", text: "My partner and I have the right physical 'chemistry' between us." },
  { id: "ls_eros_2", text: "I feel that my partner and I were meant for each other." },
  { id: "ls_eros_3", text: "My partner and I really understand each other." },
  { id: "ls_ludus_1", text: "I believe that what my partner doesn't know about me won't hurt them." },
  { id: "ls_ludus_2", text: "I have sometimes had to keep my partner from finding out about other people." },
  { id: "ls_ludus_3", text: "I enjoy playing the 'game of love' with a number of different partners." },
  { id: "ls_storge_1", text: "Our love is the best kind because it grew out of a long friendship." },
  { id: "ls_storge_2", text: "Our friendship merged gradually into love over time." },
  { id: "ls_storge_3", text: "Our love relationship is the most satisfying because it developed from a good friendship." },
  { id: "ls_pragma_1", text: "A main consideration in choosing my partner was how they would reflect on my family." },
  { id: "ls_pragma_2", text: "An important factor in choosing my partner was whether or not they would be a good parent." },
  { id: "ls_pragma_3", text: "One consideration in choosing my partner was how they would reflect on my career." },
  { id: "ls_mania_1", text: "When things aren't right with my partner and me, my stomach gets upset." },
  { id: "ls_mania_2", text: "If my partner ignores me for a while, I sometimes do stupid things to try to get their attention back." },
  { id: "ls_mania_3", text: "When my partner doesn't pay attention to me, I feel sick all over." },
  { id: "ls_agape_1", text: "I cannot be happy unless I place my partner's happiness before my own." },
  { id: "ls_agape_2", text: "I am usually willing to sacrifice my own wishes to let my partner achieve theirs." },
  { id: "ls_agape_3", text: "I would endure all things for the sake of my partner." }
];
const loveQ: Question[] = loveStyles.map(q => ({
  ...q,
  section: "lovestyle",
  options: ["1 - Strongly Disagree", "2 - Disagree", "3 - Neutral", "4 - Agree", "5 - Strongly Agree"]
}));

// COMPILE THE FINAL 92-QUESTION BATTERY
export const attachmentQuestions: Question[] = [...demoQ, ...ecrQ, ...rsQ, ...dersQ, ...loveQ];

// SAFETY CHECK
if (attachmentQuestions.length !== 92) {
  console.error(`CRITICAL ERROR: Attachment battery has ${attachmentQuestions.length} questions, expected 92.`);
}
