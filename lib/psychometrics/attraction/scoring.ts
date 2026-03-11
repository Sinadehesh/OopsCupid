import { AttractionProfile, AttractionArchetype, ModuleScores } from "./types";
import { attractionQuestions } from "./questions";

// --- Helper Functions ---
function normalize(raw: number, min: number, max: number): number {
  return Math.max(0, Math.min(100, Math.round(((raw - min) / (max - min)) * 100)));
}

function getLevel(score: number): "Low" | "Moderate" | "High" | "Very High" {
  if (score < 34) return "Low";
  if (score < 67) return "Moderate";
  if (score < 85) return "High";
  return "Very High";
}

function scoreSubscale(answers: Record<string, string>, subscaleKey: string, minLimit: number, maxLimit: number): ModuleScores {
  const items = attractionQuestions.filter(q => q.subscaleKey === subscaleKey);
  let raw = 0;
  
  items.forEach(q => {
    const ansRaw = parseInt(answers[q.id]?.split("-")[0]?.trim() || "3", 10);
    raw += q.reverseScore ? (6 - ansRaw) : ansRaw; // Assuming 1-5 scale default logic
  });

  const normalized = normalize(raw, minLimit * items.length, maxLimit * items.length);
  return { raw, normalized, level: getLevel(normalized) };
}

// --- Main Engine ---
export function generateAttractionProfile(answers: Record<string, string>): AttractionProfile {
  // 1. Score User Traits
  const bigFive = {
    extraversion: scoreSubscale(answers, "extraversion", 1, 5),
    agreeableness: scoreSubscale(answers, "agreeableness", 1, 5),
    conscientiousness: scoreSubscale(answers, "conscientiousness", 1, 5),
    neuroticism: scoreSubscale(answers, "neuroticism", 1, 5),
    openness: scoreSubscale(answers, "openness", 1, 5),
  };

  const attachmentRaw = {
    anxiety: scoreSubscale(answers, "anxiety", 1, 5),
    avoidance: scoreSubscale(answers, "avoidance", 1, 5),
  };
  
  let styleLabel = "Secure";
  if (attachmentRaw.anxiety.normalized > 50 && attachmentRaw.avoidance.normalized > 50) styleLabel = "Fearful-Avoidant";
  else if (attachmentRaw.anxiety.normalized > 50) styleLabel = "Anxious-Preoccupied";
  else if (attachmentRaw.avoidance.normalized > 50) styleLabel = "Dismissive-Avoidant";

  const attachment = { ...attachmentRaw, styleLabel };

  const maladaptive = {
    negativeAffect: scoreSubscale(answers, "negativeAffect", 1, 5),
    detachment: scoreSubscale(answers, "detachment", 1, 5),
    antagonism: scoreSubscale(answers, "antagonism", 1, 5),
    disinhibition: scoreSubscale(answers, "disinhibition", 1, 5),
    psychoticism: scoreSubscale(answers, "psychoticism", 1, 5),
  };

  const darkTriad = {
    machiavellianism: scoreSubscale(answers, "machiavellianism", 1, 5),
    narcissism: scoreSubscale(answers, "narcissism", 1, 5),
    psychopathy: scoreSubscale(answers, "psychopathy", 1, 5),
  };

  const symptoms = {
    depression: scoreSubscale(answers, "depression", 1, 5),
    anxiety: scoreSubscale(answers, "anxiety", 1, 5),
    adhd: scoreSubscale(answers, "adhd", 1, 5),
    substance: scoreSubscale(answers, "substance", 1, 5),
  };

  const preferences = {
    loveStatus: scoreSubscale(answers, "loveStatus", 0, 3),
    stabilityLooks: scoreSubscale(answers, "stabilityLooks", 0, 3),
    intellectHome: scoreSubscale(answers, "intellectHome", 0, 3),
    socialValues: scoreSubscale(answers, "socialValues", 0, 3),
  };

  // 2. Predict Partner Profile (Assortative Mating Logic)
  // Scientific coefficients: Big Five (s≈0.2), Attachment (s≈0.4 w/ secure bias), DT (s≈0.5)
  const predictedPartner = {
    bigFive: {
      extraversion: Math.round(bigFive.extraversion.normalized * 0.2 + 50 * 0.8),
      agreeableness: Math.round(bigFive.agreeableness.normalized * 0.2 + 50 * 0.8),
      conscientiousness: Math.round(bigFive.conscientiousness.normalized * 0.2 + 50 * 0.8),
      neuroticism: Math.round(bigFive.neuroticism.normalized * 0.2 + 50 * 0.8),
      openness: Math.round(bigFive.openness.normalized * 0.2 + 50 * 0.8),
    },
    attachment: {
      anxiety: Math.round(attachment.anxiety.normalized * 0.7), // Secure bias
      avoidance: Math.round(attachment.avoidance.normalized * 0.7), // Secure bias
    },
    darkTriad: Math.round(
      (darkTriad.machiavellianism.normalized + darkTriad.narcissism.normalized + darkTriad.psychopathy.normalized) / 3 * 0.5 + 20 * 0.5
    ),
    symptomRisk: Math.round(
      (symptoms.depression.normalized + symptoms.adhd.normalized + symptoms.substance.normalized) / 3 * 0.4 + 20 * 0.6
    ),
    description: "Based on assortative mating algorithms, your predicted partner profile reveals...",
  };

  // 3. Attraction Risk Index Calculation
  const riskScore = Math.round(
    ((maladaptive.negativeAffect.normalized + maladaptive.antagonism.normalized + maladaptive.disinhibition.normalized) / 3) * 0.25 +
    ((darkTriad.machiavellianism.normalized + darkTriad.narcissism.normalized + darkTriad.psychopathy.normalized) / 3) * 0.20 +
    ((attachment.anxiety.normalized + attachment.avoidance.normalized) / 2) * 0.20 +
    ((symptoms.depression.normalized + symptoms.adhd.normalized + symptoms.substance.normalized) / 3) * 0.15 +
    (bigFive.neuroticism.normalized) * 0.10 +
    (preferences.socialValues.normalized) * 0.10 // High thrill-seeking
  );

  const riskIndex = {
    score: riskScore,
    band: riskScore < 25 ? "Low Risk" : riskScore < 50 ? "Moderate Risk" : riskScore < 75 ? "High Risk" : "Very High Risk" as any
  };

  // 4. Archetype Engine
  const availableArchetypes = [
    {
      id: "intensity_chaser",
      label: "The Intensity Chaser",
      description: "You mistake anxiety and chaos for passion, often drawn to unpredictable partners.",
      shadowPattern: "Attracting emotionally unavailable or volatile partners to recreate a familiar adrenaline loop.",
      score: attachment.anxiety.normalized + maladaptive.negativeAffect.normalized + preferences.socialValues.normalized
    },
    {
      id: "dark_magnet",
      label: "The Dark Magnet",
      description: "You are drawn to dominant, charismatic, and sometimes ruthless individuals.",
      shadowPattern: "Ignoring red flags of narcissism or low empathy because you value status or excitement.",
      score: darkTriad.narcissism.normalized + maladaptive.antagonism.normalized + preferences.loveStatus.normalized
    },
    {
      id: "fixer",
      label: "The Fixer",
      description: "You seek out partners with deep wounds, hoping your love can heal them.",
      shadowPattern: "Becoming a caretaker and sacrificing your own needs, leading to eventual burnout and resentment.",
      score: bigFive.agreeableness.normalized + symptoms.depression.normalized + (100 - attachment.avoidance.normalized)
    },
    {
      id: "safe_seeker",
      label: "The Safe-But-Bored Seeker",
      description: "You heavily prioritize stability, but sometimes sabotage it to find excitement.",
      shadowPattern: "Finding secure love 'boring' and unconsciously picking fights to generate a spark.",
      score: preferences.stabilityLooks.normalized + attachment.avoidance.normalized + bigFive.conscientiousness.normalized
    }
  ];

  // Sort and pick top 2
  availableArchetypes.sort((a, b) => b.score - a.score);

  return {
    userTraits: { bigFive, attachment, maladaptive, darkTriad, symptoms, preferences },
    predictedPartner,
    archetypes: {
      primary: availableArchetypes[0],
      secondary: availableArchetypes[1],
    },
    riskIndex
  };
}
