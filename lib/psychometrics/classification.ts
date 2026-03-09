import { scoreScale } from "./scoring";
import { normalise } from "./normalization";
import { ecrScales, rosenbergScale, dersScale, loveStyleScale, crqScale, ysqScale, mdsScale, parentingScale, attractionScale, EcrDomain } from "./attachment";

export type AttachmentClassification = "Secure" | "Anxious-Preoccupied" | "Avoidant-Dismissive" | "Fearful-Avoidant";

export type AttachmentDomainProfile = {
  avoidanceMean: number;
  anxietyMean: number;
  avoidanceScore: number;
  anxietyScore: number;
  classification: AttachmentClassification;
};

export type PsychologicalProfile = {
  attachment: Record<EcrDomain, AttachmentDomainProfile>;
  selfEsteem: { total: number; score: number; level: string; selfLiking: number; selfCompetence: number; };
  emotionRegulation: { total: number; score: number; level: string; subscales: Record<string, number>; };
  schemas: { name: string; score: number }[];
  loveStyle: string;
  relationshipPatterns: Record<string, number>;
  fantasyScore: number;
  fantasyLevel: string;
  parentingStyle?: string;
};

function classifyAttachment(anxiety: number, avoidance: number): AttachmentClassification {
  const anxHigh = anxiety > 4.5;
  const avoHigh = avoidance > 4.5;
  if (!anxHigh && !avoHigh) return "Secure";
  if (anxHigh && !avoHigh) return "Anxious-Preoccupied";
  if (!anxHigh && avoHigh) return "Avoidant-Dismissive";
  return "Fearful-Avoidant";
}

export function generatePsychologicalProfile(answers: Record<string, string>, hasChildren: boolean): PsychologicalProfile {
  const attachment = {} as Record<EcrDomain, AttachmentDomainProfile>;
  for (const [domain, def] of Object.entries(ecrScales)) {
    const res = scoreScale(def, answers);
    const avoidanceMean = res.subscaleMeans["avoidance"] || 1;
    const anxietyMean = res.subscaleMeans["anxiety"] || 1;
    attachment[domain as EcrDomain] = {
      avoidanceMean, anxietyMean,
      avoidanceScore: normalise(avoidanceMean, 1, 7),
      anxietyScore: normalise(anxietyMean, 1, 7),
      classification: classifyAttachment(anxietyMean, avoidanceMean)
    };
  }

  const rsRes = scoreScale(rosenbergScale, answers);
  const seScore = normalise(rsRes.total, 10, 40);
  const seLevel = rsRes.total >= 30 ? "High" : rsRes.total >= 20 ? "Normal" : "Low";

  const dersRes = scoreScale(dersScale, answers);
  const dersScore = normalise(dersRes.total, 16, 80);
  const dersLevel = dersRes.total > 53 ? "High Difficulties" : dersRes.total > 32 ? "Moderate" : "Healthy / Regulated";

  const ysqRes = scoreScale(ysqScale, answers);
  const schemas = Object.entries(ysqRes.subscaleMeans)
    .map(([name, score]) => {
      const labels: Record<string, string> = { abandonment: "Fear of Abandonment", mistrust: "Mistrust & Abuse", emotional_deprivation: "Emotional Deprivation", defectiveness: "Defectiveness & Shame", failure: "Failure", subjugation: "Subjugation & Self-Sacrifice" };
      return { name: labels[name] || name, score };
    }).filter(s => s.score >= 3).sort((a, b) => b.score - a.score).slice(0, 3);

  const lsRes = scoreScale(loveStyleScale, answers);
  let loveStyle = "Eros (Passionate)";
  let maxLs = -1;
  const lsLabels: Record<string, string> = { eros:"Eros (Passionate)", ludus:"Ludus (Game-Playing)", storge:"Storge (Friendship-Based)", pragma:"Pragma (Practical)", mania:"Mania (Obsessive)", agape:"Agape (Selfless)" };
  for (const [key, score] of Object.entries(lsRes.subscaleMeans)) {
    if (score > maxLs) { maxLs = score; loveStyle = lsLabels[key]; }
  }

  const crqRes = scoreScale(crqScale, answers);
  const mdsRes = scoreScale(mdsScale, answers);
  const fantasyLevel = mdsRes.total > 20 ? "High" : mdsRes.total > 12 ? "Moderate" : "Low";

  let parentingStyle: string | undefined = undefined;
  if (hasChildren) {
    const parRes = scoreScale(parentingScale, answers);
    let maxPar = -1;
    const parLabels: Record<string, string> = { authoritative:"Authoritative", authoritarian:"Authoritarian", permissive:"Permissive" };
    for (const [key, score] of Object.entries(parRes.subscaleMeans)) {
      if (score > maxPar) { maxPar = score; parentingStyle = parLabels[key]; }
    }
  }

  return {
    attachment,
    selfEsteem: { total: rsRes.total, score: seScore, level: seLevel, selfLiking: rsRes.subscaleTotals["selfLiking"] || 0, selfCompetence: rsRes.subscaleTotals["selfCompetence"] || 0 },
    emotionRegulation: { total: dersRes.total, score: dersScore, level: dersLevel, subscales: dersRes.subscaleMeans },
    schemas, loveStyle, relationshipPatterns: crqRes.subscaleMeans, fantasyScore: mdsRes.total, fantasyLevel, parentingStyle
  };
}

export function computeAttractionProfile(answers: Record<string, string>, quizName: string) {
  const attRes = scoreScale(attractionScale, answers);
  const percentagesData: Record<string, number> = {};
  const dialData: Record<string, number> = {};

  Object.keys(attractionScale.subscales || {}).forEach(key => {
    percentagesData[key] = Math.round((attRes.subscaleTotals[key] / attRes.total) * 100) || 0;
    dialData[key] = normalise(attRes.subscaleTotals[key], 4, 20); 
  });

  const primaryStyle = Object.keys(attRes.subscaleTotals).reduce((a, b) => attRes.subscaleTotals[a] > attRes.subscaleTotals[b] ? a : b);
  
  let title = "", description = "", behaviors = "";
  
  if (quizName === "who-finds-me-attractive") {
    title = `You are a ${primaryStyle} Magnet`;
    description = `You project energy that deeply appeals to specific psychological needs.\n\nWHO GETS OBSESSED WITH YOU:\nPeople who subconsciously recognize your energy as the 'missing piece' to their own attachment wounds.`;
    behaviors = `THE CHARM & BENEFIT THEY GET FROM YOU:\nYour specific behavioral patterns give them a dopamine hit that temporarily soothes their insecurities.`;
  } else {
    title = `Your Magnetic Pull: The ${primaryStyle} Target`;
    description = `You are drawn to this personality type based on your own childhood wiring and emotional needs.\n\nWHY YOU GET ATTACHED:\nYour brain craves the specific validation and chemistry this type provides.`;
    behaviors = `THE CHARM & HIDDEN BENEFIT:\nThe temporary high this person provides masks the long-term relational cost. Identifying this is the first step to breaking the cycle.`;
  }

  return { title, description, behaviors, primaryStyle, gaugeScore: 50, gaugeLabel: "PULL", percentagesData, dialData, isSingle: true, healthScore: 50 };
}

export function computeLegacyResult(answers: Record<string, string>, quizName: string) {
  if (quizName === "who-finds-me-attractive" || quizName === "attraction-patterns") {
    return computeAttractionProfile(answers, quizName);
  }

  if (quizName === "is-he-manipulative") {
    let toxicity = 0;
    Object.values(answers).forEach(ans => {
      if (["Denies it ever happened", "Complains about them constantly", "He pouts and makes me feel guilty", "Rarely, he usually makes excuses", "He gives unsolicited, critical advice"].includes(ans)) toxicity += 1;
      else if (["Blames you for making him act that way", "Changes the subject entirely", "He starts a massive fight right before I leave", "Never. It is always my fault"].includes(ans)) toxicity += 2;
    });
    const healthScore = Math.max(5, 99 - (toxicity * 6));
    const gaugeScore = normalise(toxicity, 0, 16);
    const primaryStyle = toxicity >= 9 ? "Highly Manipulative" : toxicity >= 4 ? "Toxic Patterns" : "Healthy";
    const description = primaryStyle === "Highly Manipulative" ? "Signs of severe manipulation and gaslighting detected." : "Behavior falls within normal limits.";
    return { title: `Assessment: ${primaryStyle}`, primaryStyle, gaugeScore, gaugeLabel: "THREAT LEVEL", healthScore, description, behaviors: "Monitor how he handles boundaries.", isSingle: true, dialData: {} };
  }
  
  return { title: "Analyzed Pattern", primaryStyle: "Secure", description: "Based on your answers, this is the dominant pattern.", gaugeScore: 50, gaugeLabel: "SCORE", healthScore: 50, isSingle: true, dialData: {} };
}
