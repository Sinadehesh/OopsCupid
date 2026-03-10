export function generateToxicFriendNarrative(tier: number, modules: any, highestSubscales: string[]) {
  // 1. Dominant Dynamic
  let dynamic = "";
  if (tier === 5) {
    dynamic = "This friendship is operating at a high level of toxicity. The data indicates a severe pattern that likely involves active emotional destabilization, relational aggression, or unpredictable hostility. This is not just a 'bad phase'; it is a structurally harmful dynamic.";
  } else if (tier === 4) {
    dynamic = "Your results point to a strongly controlling or manipulative dynamic. This friend likely uses subtle leverage—like guilt, silent treatments, or reputation games—to keep you compliant and shape your behavior.";
  } else if (tier === 3) {
    dynamic = "This is a profoundly one-sided and draining relationship. While it may not be explicitly dangerous, the reciprocity is fundamentally broken. You are acting as emotional life-support for someone who does not return the effort.";
  } else {
    dynamic = "This friendship is strained, but the core issues appear to be mismatch, miscommunication, or normal conflict rather than intentional psychological harm.";
  }

  // 2. The Distortion Check ("Am I overreacting?")
  let distortionCheck = "";
  if (tier >= 4 || modules.victimization >= 60) {
    distortionCheck = "You are not overreacting. Because this friend may occasionally act warm or normal, it is easy to doubt yourself. However, your responses indicate a consistent pattern of control, unpredictability, or punishment. Healthy friendships do not require you to constantly monitor your behavior to avoid triggering the other person.";
  } else if (modules.aggression >= 50) {
    distortionCheck = "You are not imagining things. Relational aggression—like subtle exclusion, backhanded compliments, or triangulation—is specifically designed to be deniable. If you confront them, they will likely say it was 'just a joke' or that you are 'too sensitive.' Trust your instinct: the social punishment is real.";
  } else {
    distortionCheck = "While you are feeling genuine frustration, the data suggests this might be an issue of poor boundaries rather than calculated toxicity. It is valid to feel drained, but this dynamic might improve if you stop over-functioning and let them take some responsibility.";
  }

  // 3. Boundary Guidance
  let guidance = [];
  if (modules.victimization > 50) {
    guidance.push("Stop Over-Explaining: When you set a boundary, give a one-sentence answer. Do not give them a long explanation that they can argue with or twist.");
  }
  if (modules.aggression > 50) {
    guidance.push("Information Diet: Immediately stop sharing sensitive personal information, secrets, or insecurities with this person. They are likely using intimacy as leverage.");
  }
  if (modules.quality > 60 && tier < 4) {
    guidance.push("The Drop-the-Rope Test: Stop reaching out, making plans, or fixing their crises for one month. See if the friendship survives when you stop carrying the entire weight of it.");
  }
  if (tier >= 4) {
    guidance.push("De-escalate, Don't Confront: Highly toxic or unsafe friends often escalate when directly confronted. Instead of a dramatic breakup, slowly become 'boring' and busy, gradually reducing contact.");
  }

  return { dynamic, distortionCheck, guidance };
}
