export function calculateBadGuysScore(answers: Record<number, number>) {
  let totalScore = 0;
  const subcategories: Record<string, number> = {
    "Intensity Bias": 0, "Potential Projection": 0, "Red-Flag Minimizing": 0,
    "Rescuer Drive": 0, "Boundary Slippage": 0, "Validation Hunger": 0,
    "Chaos Familiarity": 0, "Breadcrumb Addiction": 0, "Self-Trust Erosion": 0,
    "Scarcity Mindset": 0
  };

  // Calculate scores
  for (const [idStr, score] of Object.entries(answers)) {
    const id = parseInt(idStr);
    totalScore += score;
    
    // Map ID to subcategory manually (every 5 questions = 1 category)
    if (id <= 5) subcategories["Intensity Bias"] += score;
    else if (id <= 10) subcategories["Potential Projection"] += score;
    else if (id <= 15) subcategories["Red-Flag Minimizing"] += score;
    else if (id <= 20) subcategories["Rescuer Drive"] += score;
    else if (id <= 25) subcategories["Boundary Slippage"] += score;
    else if (id <= 30) subcategories["Validation Hunger"] += score;
    else if (id <= 35) subcategories["Chaos Familiarity"] += score;
    else if (id <= 40) subcategories["Breadcrumb Addiction"] += score;
    else if (id <= 45) subcategories["Self-Trust Erosion"] += score;
    else subcategories["Scarcity Mindset"] += score;
  }

  // Determine overall tier
  let tier = "Clear Radar";
  if (totalScore >= 225) tier = "Toxic Pattern Magnet";
  else if (totalScore >= 200) tier = "Chaos-Chemistry Loop";
  else if (totalScore >= 170) tier = "Red-Flag Negotiator";
  else if (totalScore >= 130) tier = "Potential Chaser";
  else if (totalScore >= 90) tier = "Soft Spot";

  // Sort subcategories to find top 3
  const sortedSubcategories = Object.entries(subcategories)
    .sort((a, b) => b[1] - a[1])
    .map(([name, score]) => ({ name, score }));

  const top3 = sortedSubcategories.slice(0, 3).map(s => s.name);
  const top1 = top3[0];

  // Dynamic Custom Headline Generation
  let customHeadline = "You are ignoring the red flags to keep the connection.";
  const top3Str = top3.join(",");
  
  if (top3Str.includes("Intensity Bias") && top3Str.includes("Breadcrumb Addiction") && top3Str.includes("Validation Hunger")) {
    customHeadline = "You don't chase men. You chase the high of being chosen by a man who withholds.";
  } else if (top3Str.includes("Potential Projection") && top3Str.includes("Rescuer Drive") && top3Str.includes("Chaos Familiarity")) {
    customHeadline = "You fall in love with the version of him that only exists in your imagination.";
  } else if (top3Str.includes("Boundary Slippage") && top3Str.includes("Self-Trust Erosion") && top3Str.includes("Scarcity Mindset")) {
    customHeadline = "You see the problem, but talk yourself out of leaving.";
  } else if (top3Str.includes("Red-Flag Minimizing") && top3Str.includes("Breadcrumb Addiction") && top3Str.includes("Self-Trust Erosion")) {
    customHeadline = "You keep mistaking confusion for a complicated love story.";
  } else if (top3Str.includes("Validation Hunger") && top3Str.includes("Scarcity Mindset") && top3Str.includes("Intensity Bias")) {
    customHeadline = "You confuse rarity with value and adrenaline with destiny.";
  }

  return { totalScore, tier, top1, sortedSubcategories, customHeadline };
}
