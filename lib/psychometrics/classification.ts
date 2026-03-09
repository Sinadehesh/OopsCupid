import { scoreScale } from "./scoring";
import { normalise } from "./normalization";
import { 
  ecrScale, rosenbergScale, dersScale, loveStyleScale, ysqScale, 
  crqScale, mdsScale, parentingScale, attractionScale 
} from "./attachment";

// ─── MASTER BATTERY CLASSIFICATION ───
export function computeMasterProfile(answers: Record<string, string>, quizName: string) {
  if (quizName === "who-finds-me-attractive" || quizName === "attraction-patterns") {
    return computeAttractionProfile(answers, quizName);
  }

  // Demographics
  const isSingle = answers["demo_1"] === "Single" || answers["demo_1"] === "It's complicated";
  const hasChildren = answers["demo_2"] === "Yes";
  const genderRaw = answers["demo_3"] ?? "Non-binary";
  const isFemale = genderRaw === "Woman";
  const isMale = genderRaw === "Man";

  // ECR-RS
  const ecrRes = scoreScale(ecrScale, answers);
  const avoidanceMean = ecrRes.subscaleMeans["avoidance"] || 0;
  const anxietyMean = ecrRes.subscaleMeans["anxiety"] || 0;
  const anxHigh = anxietyMean > 4.5;
  const avoHigh = avoidanceMean > 4.5;
  const primaryStyle = !anxHigh && !avoHigh ? "Secure" : anxHigh && !avoHigh ? "Anxious (Preoccupied)" : !anxHigh && avoHigh ? "Avoidant (Dismissive)" : "Fearful-Avoidant (Disorganized)";
  
  const dialData = {
    Anxiety: normalise(anxietyMean, 1, 7),
    Avoidance: normalise(avoidanceMean, 1, 7)
  };

  // Rosenberg
  const rsRes = scoreScale(rosenbergScale, answers);
  const seScore = normalise(rsRes.total, 10, 40);
  const seLevel = rsRes.total >= 30 ? "High" : rsRes.total >= 20 ? "Normal" : "Low";

  // DERS-16
  const dersRes = scoreScale(dersScale, answers);
  const dersScore = normalise(dersRes.total, 16, 80);
  const dersLevel = dersRes.total > 53 ? "High Difficulties" : dersRes.total > 32 ? "Moderate" : "Healthy / Regulated";

  // Love Styles
  const lsRes = scoreScale(loveStyleScale, answers);
  const lsLabels: Record<string, string> = { eros:"Eros (Passionate)", ludus:"Ludus (Game-Playing)", storge:"Storge (Friendship)", pragma:"Pragma (Practical)", mania:"Mania (Obsessive)", agape:"Agape (Selfless)" };
  const lsMeans = Object.keys(lsLabels).map(k => ({ key: k, mean: lsRes.subscaleMeans[k] })).sort((a, b) => b.mean - a.mean);
  const loveStyle = lsLabels[lsMeans[0].key];

  // YSQ-L3 (Schemas)
  const yqsRes = scoreScale(ysqScale, answers);
  const schemaLabels: Record<string, string> = { abandonment: "Fear of Abandonment", mistrust: "Mistrust & Abuse", emotional_deprivation: "Emotional Deprivation", defectiveness: "Defectiveness & Shame", failure: "Failure", subjugation: "Subjugation & Self-Sacrifice" };
  const dominantSchemas = Object.keys(schemaLabels)
    .map(s => ({ name: schemaLabels[s], mean: yqsRes.subscaleMeans[s] }))
    .filter(s => s.mean >= 3).sort((a, b) => b.mean - a.mean).slice(0, 2).map(s => s.name);

  // CRQ & MDS
  const crqRes = scoreScale(crqScale, answers);
  const rejectionExpectation = crqRes.subscaleMeans["rejection_expectation"] || 0;
  const withdrawalMean = crqRes.subscaleMeans["withdrawal"] || 0;

  const mdsRes = scoreScale(mdsScale, answers);
  const mdsLevel = mdsRes.total > 20 ? "High" : mdsRes.total > 12 ? "Moderate" : "Low";

  // Parenting
  let parentingStyle = "";
  if (hasChildren) {
    const parRes = scoreScale(parentingScale, answers);
    const parLabels: Record<string, string> = { authoritative:"Authoritative", authoritarian:"Authoritarian", permissive:"Permissive" };
    const parMeans = Object.keys(parLabels).map(k => ({ key: k, mean: parRes.subscaleMeans[k] })).sort((a, b) => b.mean - a.mean);
    parentingStyle = parLabels[parMeans[0].key];
  }

  // Narrative Assembly
  const sn = {
    "Secure": {
      base: `Your attachment system operates from a place of emotional safety. You believe you are worthy of love and that others are generally trustworthy.`,
      single: `In dating, you communicate your needs clearly and walk away from toxic situations without excessive guilt.`,
      relationship: `In your current relationship, you are the stabilizing force. You handle conflict without escalation.`,
      male: `As a man with a secure style, partners initially find your emotional availability refreshing, but some (who are used to chaos) may mistake your calm for lack of passion.`,
      female: `As a woman with a secure style, your independence attracts partners — but watch for the pattern of subconsciously caretaking anxious partners at your own expense.`,
    },
    "Anxious (Preoccupied)": {
      base: `You deeply desire closeness but chronically fear it will be taken away. Your nervous system is hypervigilant to signs of rejection.`,
      single: `In dating, this shows up as over-analyzing messages and confusing anxiety with chemistry.`,
      relationship: `In your relationship, you likely monitor your partner's mood as if your safety depends on it. Conflict triggers protest behaviors like excessive texting.`,
      male: `As a man, social pressure to suppress vulnerability may cause this anxiety to leak out as jealousy, sarcasm, or sudden anger rather than expressed emotional need.`,
      female: `As a woman, you may have normalized excessive self-sacrifice, believing that if you just love hard enough, they will finally feel safe enough to stay.`,
    },
    "Avoidant (Dismissive)": {
      base: `You hold a deeply rooted belief that emotional dependence is dangerous. Your independence is a survival strategy.`,
      single: `In dating, you may lose interest as soon as a partner wants more intimacy. This is your attachment system down-regulating in response to closeness.`,
      relationship: `In your relationship, emotional withdrawal and needing alone time to "recharge" are dominant patterns. Your partner likely experiences this as rejection.`,
      male: `As a man, this pattern is culturally reinforced. The self-reliance you've built may be masking a longing for connection that feels too risky to acknowledge.`,
      female: `As a woman, you may be unfairly labeled "cold". What others miss is that your emotional walls were constructed for a reason, and deserve to be dismantled safely.`,
    },
    "Fearful-Avoidant (Disorganized)": {
      base: `You simultaneously crave deep intimacy and are terrified of it, creating chaotic push-pull relationship patterns.`,
      single: `In dating, this manifests as intense, fast-burning connections followed by sudden panic and retreat.`,
      relationship: `In relationships, minor disagreements can activate a full trauma response, leading to cycles of intense clinging followed by complete stonewalling.`,
      male: `As a man, the internal conflict between wanting connection and fearing it is often externalized as control or sudden withdrawal.`,
      female: `As a woman, you may have learned to interpret relational chaos as signs of passion, making it difficult to recognize safe, regulated love.`,
    }
  }[primaryStyle] || { base: "", single: "", relationship: "", male: "", female: "" };

  const fullDescription = [
    sn.base,
    `HOW THIS SHOWS UP FOR YOU:\n${isSingle ? sn.single : sn.relationship} ${isFemale ? sn.female : isMale ? sn.male : ""}`,
    dominantSchemas.length > 0 ? `DEEP PATTERN ANALYSIS (YSQ-L3):\nYour most active early schemas are: ${dominantSchemas.join(" and ")}. These childhood beliefs operate underneath your attachment style like an invisible operating system.` : `DEEP PATTERN ANALYSIS (YSQ-L3):\nNo single early schema is dramatically elevated. Your challenges are likely driven by situational triggers rather than childhood wounds.`,
    rejectionExpectation > 3.5 ? `RELATIONSHIP PATTERN (CRQ):\nYou enter close relationships bracing for rejection. When you share something personal, you expect criticism rather than care.` : withdrawalMean > 3.5 ? `RELATIONSHIP PATTERN (CRQ):\nYour dominant protective pattern is withdrawal. Before someone can get close enough to hurt you, you emotionally exit.` : `RELATIONSHIP PATTERN (CRQ):\nYour relationship expectations are relatively balanced. You approach closeness with openness.`,
    mdsLevel === "High" ? `INNER WORLD (MDS):\nYou score high on maladaptive daydreaming. Your inner fantasy world may be providing emotional comfort that your real-world relationships are not.` : "",
    hasChildren && parentingStyle ? `PARENTING STYLE (Robinson et al.):\nYour dominant parenting style is ${parentingStyle}. This style is actively shaping your children's developing attachment system.` : "",
    `EMOTIONAL PROFILE SNAPSHOT:\nYour DERS-16 indicates '${dersLevel}' in emotion regulation. Your Rosenberg self-esteem is '${seLevel}'. Your dominant romantic love style is '${loveStyle}', shaping exactly what you seek in a partner.`
  ].filter(Boolean).join("\n\n");

  return { title: "Your Master Psychological Profile", description: fullDescription, primaryStyle, dialData, seScore, seLevel, dersScore, dersLevel, loveStyle, mdsLevel, dominantSchemas, parentingStyle, isSingle };
}

function computeAttractionProfile(answers: Record<string, string>, quizName: string) {
  const attRes = scoreScale(attractionScale, answers);
  
  const percentagesData: Record<string, number> = {};
  const dialData: Record<string, number> = {};

  Object.keys(attractionScale.subscales!).forEach(key => {
    percentagesData[key] = Math.round((attRes.subscaleTotals[key] / attRes.total) * 100) || 0;
    dialData[key] = normalise(attRes.subscaleTotals[key], 4, 20); // 4 items, min 4, max 20
  });

  const primaryStyle = Object.keys(attRes.subscaleTotals).reduce((a, b) => attRes.subscaleTotals[a] > attRes.subscaleTotals[b] ? a : b);
  
  let title = "", description = "", behaviors = "";
  
  if (quizName === "who-finds-me-attractive") {
    title = `You are a ${primaryStyle} Magnet`;
    // Add logic matching previously defined magnet text...
    description = `You project energy that deeply appeals to specific psychological needs.\n\nWHO GETS OBSESSED WITH YOU:\nPeople who subconsciously recognize your energy as the 'missing piece' to their own attachment wounds.`;
    behaviors = `THE CHARM & BENEFIT THEY GET FROM YOU:\nYour specific behavioral patterns give them a dopamine hit that temporarily soothes their insecurities.`;
  } else {
    title = `Your Magnetic Pull: The ${primaryStyle} Target`;
    // Add logic matching previously defined target text...
    description = `You are drawn to this personality type based on your own childhood wiring and emotional needs.\n\nWHY YOU GET ATTACHED:\nYour brain craves the specific validation and chemistry this type provides.`;
    behaviors = `THE CHARM & HIDDEN BENEFIT:\nThe temporary high this person provides masks the long-term relational cost. Identifying this is the first step to breaking the cycle.`;
  }

  return { title, description, behaviors, primaryStyle, gaugeScore: 50, gaugeLabel: "PULL", percentagesData, dialData, isSingle: true, healthScore: 50 };
}

// ─── LEGACY SCORING ───
export function computeLegacyResult(answers: Record<string, string>, quizName: string) {
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
  return { title: "Analyzed Pattern", primaryStyle: "Secure", description: "Based on your answers, this is the dominant pattern." };
}
