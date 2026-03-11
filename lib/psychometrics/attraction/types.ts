export type ModuleScores = {
  raw: number;
  normalized: number; // 0-100
  level: "Low" | "Moderate" | "High" | "Very High";
};

export type AttractionArchetype = {
  id: string;
  label: string;
  description: string;
  shadowPattern: string; // The toxic side of the pattern
};

export interface AttractionProfile {
  userTraits: {
    bigFive: Record<"openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism", ModuleScores>;
    attachment: Record<"anxiety" | "avoidance", ModuleScores> & { styleLabel: string };
    maladaptive: Record<"negativeAffect" | "detachment" | "antagonism" | "disinhibition" | "psychoticism", ModuleScores>;
    darkTriad: Record<"machiavellianism" | "narcissism" | "psychopathy", ModuleScores>;
    symptoms: Record<"depression" | "anxiety" | "adhd" | "substance", ModuleScores>;
    preferences: Record<"loveStatus" | "stabilityLooks" | "intellectHome" | "socialValues", ModuleScores>;
  };
  
  predictedPartner: {
    bigFive: Record<"openness" | "conscientiousness" | "extraversion" | "agreeableness" | "neuroticism", number>;
    attachment: Record<"anxiety" | "avoidance", number>;
    darkTriad: number; // Aggregate DT risk
    symptomRisk: number; // Aggregate externalizing/internalizing risk
    description: string;
  };

  archetypes: {
    primary: AttractionArchetype;
    secondary: AttractionArchetype;
  };

  riskIndex: {
    score: number; // 0-100
    band: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk";
  };
}
