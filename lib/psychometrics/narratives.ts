export function generateAttachmentNarrative(
  domain: string,
  classification: string,
  isSingle: boolean,
  gender: string,
  hasChildren: boolean
): string {
  const lowerClass = classification.toLowerCase();

  if (lowerClass.includes("anxious") || lowerClass.includes("preoccupied")) {
    return `The Sharp Truth: Your scores reveal a high-alert survival strategy: you over-invest and hyper-analyze subtle shifts in your partner's mood to prevent abandonment before it even happens.

The Hidden "Why": This isn't because you are simply "needy." It is a finely tuned radar you developed when emotional consistency wasn't guaranteed. You run a subconscious program that dictates if you just love them hard enough, manage their emotions, or stay constantly available, you can control the outcome and force them to choose you.

The Information Arbitrage: Identifying this hyper-vigilance loop is the critical first step. However, your data indicates 3 specific communication blindspots that are currently repelling the secure partners you actually want. The exact step-by-step 'Pivot Blueprint' to bypass these blindspots—including the word-for-word text scripts to use when you feel triggered—is locked in your Advanced Analysis.`;
  }

  if (lowerClass.includes("avoidant") || lowerClass.includes("dismissive")) {
    return `The Sharp Truth: Your data points to a highly efficient, yet isolating survival strategy: you preemptively emotionally detach and prioritize extreme self-reliance so no one ever has the leverage to disappoint you.

The Hidden "Why": You don't actually hate intimacy; you hate the perceived loss of autonomy that usually comes with it. At some point, you learned that depending on others is unsafe or exhausting, so you built a psychological fortress. You confuse distance with safety, and the moment a partner asks for more emotional bandwidth, your system registers it as a threat to your freedom.

The Information Arbitrage: Recognizing your deactivation triggers is only 10% of the solution. Your scores show 3 critical blindspots where you are subconsciously sabotaging healthy connections right when they get good. In your Advanced Analysis, we unlock the exact text scripts and boundary-setting frameworks to maintain your independence without icing out the people you care about.`;
  }

  if (lowerClass.includes("fearful") || lowerClass.includes("disorganized")) {
    return `The Sharp Truth: Your scores indicate an exhausting psychological tug-of-war: you deeply crave profound intimacy, but the exact moment you get it, your nervous system violently rejects it as a threat.

The Hidden "Why": You are driving with one foot on the gas and one foot on the brake. Because past connections may have been a source of both comfort and pain, your brain cannot decide if a partner is a safe haven or a danger zone. You pull them in to soothe your anxiety, and then push them away to protect your autonomy.

The Information Arbitrage: You are currently caught in a chaotic 'Push-Pull' loop that guarantees relationship burnout. To break this, you must map your specific micro-triggers. The Advanced Analysis breaks down your exact 'Pivot Blueprint,' giving you the low-friction tools to regulate your nervous system and the specific scripts to communicate this to your partner without scaring them away.`;
  }

  // Secure
  return `The Sharp Truth: Your data points to a highly resilient baseline: you operate from a foundation of secure attachment, meaning you don't easily panic when partners pull away, nor do you feel suffocated by intimacy.

The Hidden "Why": Because your nervous system registers connection as safe, you naturally set boundaries without guilt and express needs without fear. However, this high empathy and stability make you a prime target. You run a subconscious program that assumes others operate with the same good intentions you do.

The Information Arbitrage: Recognizing your secure baseline is powerful, but your data indicates critical blindspots when dealing with insecure partners. You are at high risk of over-functioning for emotionally unavailable people. In your Advanced Analysis, we unlock the exact text scripts and boundary-setting frameworks to protect your peace from emotional vampires without compromising your empathy.`;
}

export function generateEmotionNarrative(level: string): string {
  return `The Cost of Dysregulation: Your Emotion Control score dictates how easily a partner's bad behavior can trigger you into an emotional spiral. The lower your control, the easier it is for toxic people to gaslight you, control your reactions, and make you believe you are the problem.`;
}

export function generateSelfEsteemNarrative(score: number): string {
  return `Your Internal Armor: Your Self-Worth Index measures the boundaries you subconsciously set. If this is low, you are likely accepting less than you deserve, making excuses for their red flags, and staying in painful situationships way too long simply because it feels familiar.`;
}
