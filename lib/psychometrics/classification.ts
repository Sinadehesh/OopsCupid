import { scoreScale } from "./scoring";
import { normalise } from "./normalization";
import { ecrScales, rosenbergScale, dersScale, loveStyleScale, crqScale, ysqScale, mdsScale, parentingScale, EcrDomain } from "./attachment";

export type AttachmentClassification = "Secure" | "Anxious-Preoccupied" | "Avoidant-Dismissive" | "Fearful-Avoidant";

export type AttachmentDomainProfile = {
  avoidanceMean: number;
  anxietyMean: number;
  avoidanceScore: number; // 0-100
  anxietyScore: number;   // 0-100
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
  // 1. ECR-RS Domains
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

  // 2. Rosenberg
  const rsRes = scoreScale(rosenbergScale, answers);
  const seScore = normalise(rsRes.total, 10, 40);
  const seLevel = rsRes.total >= 30 ? "High" : rsRes.total >= 20 ? "Normal" : "Low";

  // 3. DERS-16
  const dersRes = scoreScale(dersScale, answers);
  const dersScore = normalise(dersRes.total, 16, 80);
  const dersLevel = dersRes.total > 53 ? "High Difficulties" : dersRes.total > 32 ? "Moderate" : "Healthy / Regulated";

  // 4. Schemas
  const ysqRes = scoreScale(ysqScale, answers);
  const schemas = Object.entries(ysqRes.subscaleMeans)
    .map(([name, score]) => {
      const labels: Record<string, string> = { abandonment: "Fear of Abandonment", mistrust: "Mistrust & Abuse", emotional_deprivation: "Emotional Deprivation", defectiveness: "Defectiveness & Shame", failure: "Failure", subjugation: "Subjugation & Self-Sacrifice" };
      return { name: labels[name] || name, score };
    }).filter(s => s.score >= 3).sort((a, b) => b.score - a.score).slice(0, 3);

  // 5. Love Styles
  const lsRes = scoreScale(loveStyleScale, answers);
  let loveStyle = "Eros (Passionate)";
  let maxLs = -1;
  const lsLabels: Record<string, string> = { eros:"Eros (Passionate)", ludus:"Ludus (Game-Playing)", storge:"Storge (Friendship-Based)", pragma:"Pragma (Practical)", mania:"Mania (Obsessive)", agape:"Agape (Selfless)" };
  for (const [key, score] of Object.entries(lsRes.subscaleMeans)) {
    if (score > maxLs) { maxLs = score; loveStyle = lsLabels[key]; }
  }

  // 6. CRQ & MDS
  const crqRes = scoreScale(crqScale, answers);
  const mdsRes = scoreScale(mdsScale, answers);
  const fantasyLevel = mdsRes.total > 20 ? "High" : mdsRes.total > 12 ? "Moderate" : "Low";

  // 7. Parenting
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
