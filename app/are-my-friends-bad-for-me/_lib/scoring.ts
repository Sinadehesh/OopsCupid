export function calculateFriendScore(answers: Record<number, number>) {
  let totalScore = 0;
  const subcategories: Record<string, number> = {
    "Transactional Friendship": 0, "One-Sided Effort": 0, "Emotional Drain": 0,
    "Boundary Disrespect": 0, "Jealousy and Undermining": 0, "Public vs Private Loyalty": 0,
    "Guilt and Pressure": 0, "Crisis-Only Contact": 0, "Trust and Safety": 0,
    "Group Dynamic Damage": 0
  };

  // Calculate scores
  for (const [idStr, score] of Object.entries(answers)) {
    const id = parseInt(idStr);
    totalScore += score;
    
    if (id <= 6) subcategories["Transactional Friendship"] += score;
    else if (id <= 12) subcategories["One-Sided Effort"] += score;
    else if (id <= 18) subcategories["Emotional Drain"] += score;
    else if (id <= 24) subcategories["Boundary Disrespect"] += score;
    else if (id <= 30) subcategories["Jealousy and Undermining"] += score;
    else if (id <= 35) subcategories["Public vs Private Loyalty"] += score;
    else if (id <= 40) subcategories["Guilt and Pressure"] += score;
    else if (id <= 45) subcategories["Crisis-Only Contact"] += score;
    else if (id <= 50) subcategories["Trust and Safety"] += score;
    else subcategories["Group Dynamic Damage"] += score;
  }

  // Determine overall tier
  let tier = "Mostly Safe Circle";
  if (totalScore >= 235) tier = "Fake-Friend Magnet";
  else if (totalScore >= 200) tier = "Emotionally Costly Social Life";
  else if (totalScore >= 165) tier = "Boundary-Eroding Friendships";
  else if (totalScore >= 130) tier = "Surrounded by Low-Grade Users";
  else if (totalScore >= 95) tier = "Overgiving in a Mixed Circle";

  // Normalize scores for the chart since cats 1-5 are out of 30, and cats 6-10 are out of 25.
  const normalizedCategories = Object.entries(subcategories).map(([name, score], index) => {
    const max = index < 5 ? 30 : 25;
    const percentage = Math.round((score / max) * 100);
    return { name, score, max, percentage };
  });

  // Sort by percentage to find the true top 3 highest pain points
  const sortedSubcategories = [...normalizedCategories].sort((a, b) => b.percentage - a.percentage);
  const top3 = sortedSubcategories.slice(0, 3).map(s => s.name);
  const top1 = top3[0];

  // Hormozi-style Dynamic Brutal Truth
  let customHeadline = "You are carrying people who are quietly costing you your peace.";
  const tStr = top3.join(",");
  
  if (tStr.includes("Transactional Friendship") && tStr.includes("Crisis-Only Contact") && tStr.includes("Guilt and Pressure")) {
    customHeadline = "They do not maintain friendship. They activate you when they need resources.";
  } else if (tStr.includes("One-Sided Effort") && tStr.includes("Trust and Safety") && tStr.includes("Emotional Drain")) {
    customHeadline = "You keep dead friendships alive and call the exhaustion loyalty.";
  } else if (tStr.includes("Boundary Disrespect") && tStr.includes("Guilt and Pressure") && tStr.includes("Group Dynamic Damage")) {
    customHeadline = "Your social world punishes you for having limits.";
  } else if (tStr.includes("Jealousy and Undermining") && tStr.includes("Public vs Private Loyalty") && tStr.includes("Trust and Safety")) {
    customHeadline = "They smile near you and compete behind you.";
  } else if (tStr.includes("Emotional Drain") && tStr.includes("Group Dynamic Damage") && tStr.includes("One-Sided Effort")) {
    customHeadline = "You are carrying people who are quietly costing you your peace.";
  }

  return { totalScore, tier, top1, sortedSubcategories: normalizedCategories, customHeadline };
}
