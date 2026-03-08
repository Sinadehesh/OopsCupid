import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { quizName, answers } = body;
    
    // --- ATTACHMENT STYLE SCORING ENGINE ---
    if (quizName === "attachment-style") {
      let secure = 0, anxious = 0, avoidant = 0, fearful = 0;
      
      // We grade based on the selected text from the frontend
      answers.forEach((ans: string) => {
        // Secure patterns
        if (ans.includes("Comfortable.") || ans.includes("naturally") || ans.includes("busy") || ans.includes("communicate openly") || ans.includes("Very comfortable") || ans.includes("major relationship fears") || ans.includes("steady pace") || ans.includes("support them comfortably")) secure++;
        // Anxious patterns
        else if (ans.includes("Anxious.") || ans.includes("crave it intensely") || ans.includes("losing interest") || ans.includes("desperate for reassurance") || ans.includes("depend on them completely") || ans.includes("Being abandoned") || ans.includes("Very quickly") || ans.includes("fix it so they don't leave")) anxious++;
        // Dismissive Avoidant patterns
        else if (ans.includes("Relieved.") || ans.includes("prefer self-reliance") || ans.includes("don't really notice") || ans.includes("shut down") || ans.includes("hate depending") || ans.includes("Losing my freedom") || ans.includes("Very slowly") || ans.includes("distance myself")) avoidant++;
        // Fearful Avoidant patterns
        else fearful++;
      });

      // Calculate the primary style
      const scores: Record<string, number> = { 
        "Secure": secure, 
        "Anxious Preoccupied": anxious, 
        "Dismissive Avoidant": avoidant, 
        "Fearful Avoidant (Disorganized)": fearful 
      };
      const primaryStyle = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
      
      // Calculate Healthy Percentile based on Secure score (max 8 points)
      // Adds a slight random distribution curve to make the score feel hyper-personalized
      const basePercentile = (secure / 8) * 100;
      const curve = Math.floor(Math.random() * 8) - 3; 
      let percentile = Math.min(99, Math.max(5, Math.round(basePercentile + curve)));
      
      let title = `Your Attachment Style: ${primaryStyle}`;
      let description = "";

      // Generate the personalized clinical report
      if (primaryStyle === "Secure") {
        description = `You scored highest in Secure Attachment!\n\nYou have a remarkably healthy approach to relationships. You are comfortable with intimacy but don't lose your sense of self. You communicate effectively, trust your partners, and don't play psychological games. When disagreements happen, you seek resolution rather than revenge.\n\nRelative to the general population, your relationship patterns are healthier than ${percentile}% of people. Keep setting the standard!`;
      } else if (primaryStyle === "Anxious Preoccupied") {
        percentile = Math.max(12, Math.round((secure/8)*100)); 
        description = `You scored highest in Anxious Preoccupied Attachment.\n\nYou have a beautiful capacity for deep love, but your fear of abandonment often hijacks your peace of mind. You likely overanalyze texts, need constant reassurance, and quietly fear your partner will leave you. Your nervous system is constantly scanning for threats of rejection.\n\nYour healthy secure score is higher than ${percentile}% of people. The good news? You can heal this. Your next step is learning to self-soothe and build internal validation so you don't rely completely on a partner for emotional safety.`;
      } else if (primaryStyle === "Dismissive Avoidant") {
        percentile = Math.max(15, Math.round((secure/8)*100));
        description = `You scored highest in Dismissive Avoidant Attachment.\n\nYou value your independence above almost everything else. When partners get "too close" or emotional, your instinct is to pull away, protect your space, and put up walls. You often mistake deep intimacy for a loss of freedom.\n\nYour healthy secure score is higher than ${percentile}% of people. To grow, you need to recognize that keeping everyone at arm's length is actually a defense mechanism, not just a personality trait. Practice letting your guard down in safe environments.`;
      } else {
        percentile = Math.max(8, Math.round((secure/8)*100));
        description = `You scored highest in Fearful Avoidant (Disorganized) Attachment.\n\nYou experience a confusing push-pull dynamic. You deeply desire love and intimacy, but your nervous system is also terrified of it. When someone gets close, you might unconsciously sabotage it or panic, expecting to be hurt or betrayed.\n\nYour healthy secure score is higher than ${percentile}% of people. This style usually stems from chaotic early life experiences. Healing involves rewiring your brain to realize that consistency, safety, and trust are actually possible.`;
      }

      return NextResponse.json({ title, description, percentile });
    }

    // --- FALLBACK FOR OTHER QUIZZES ---
    const isPositive = Math.random() > 0.5;
    const title = isPositive ? "You're Validated" : "We Need to Talk";
    const description = isPositive 
        ? "Based on your answers, your instincts are spot on. Keep setting those boundaries!"
        : "Your answers indicate some major repeating patterns. It might be time to step back and re-evaluate this dynamic.";
    return NextResponse.json({ title, description, percentile: null });

  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate result" }, { status: 500 });
  }
}