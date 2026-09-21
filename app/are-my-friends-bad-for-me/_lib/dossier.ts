import type { Dossier, Subscale, SubscaleInsight } from "@/lib/report/dossier";

/**
 * "Are my friends bad for me?" — paid report content.
 *
 * Ten dimensions of a social circle, each written separately. Friendship
 * reports need a lighter hand than the romantic ones: most people here are
 * not in danger, they are in a slow drain, and the advice has to survive
 * the fact that they will still see these people every week.
 */

const MEASURES: Record<string, { short: string; measures: string }> = {
  "Transactional Friendship": { short: "Transactional", measures: "How much contact tracks what you can currently provide." },
  "One-Sided Effort": { short: "One-sided", measures: "Who initiates, who organises, and who keeps the friendship alive." },
  "Emotional Drain": { short: "Drain", measures: "How you feel in the hour after you see them, compared with before." },
  "Boundary Disrespect": { short: "Boundaries", measures: "What happens to a limit once you have stated it plainly." },
  "Jealousy and Undermining": { short: "Undermining", measures: "How your good news is received, and what follows it." },
  "Public vs Private Loyalty": { short: "Loyalty", measures: "Whether who they are with you matches who they are about you." },
  "Guilt and Pressure": { short: "Guilt", measures: "How much of what you do for them is chosen versus extracted." },
  "Crisis-Only Contact": { short: "Crisis-only", measures: "Whether the friendship exists between emergencies." },
  "Trust and Safety": { short: "Trust", measures: "Whether what you tell them stays where you put it." },
  "Group Dynamic Damage": { short: "Group", measures: "What the wider circle costs you as a system, beyond any one person." },
};

const INSIGHTS: Record<string, SubscaleInsight> = {
  "Transactional Friendship": {
    mechanism:
      "Transactional friendships are stable as long as you are useful, which is why they can run for years without anything obviously going wrong. The test is not whether they take — everyone takes — it is whether contact survives a period when you have nothing to give.",
    high: "Your availability is the product. Look at the timing of the last five times they got in touch: the pattern almost certainly maps onto something they needed rather than anything happening in your life.",
    mid: "There is some exchange logic in these friendships but it is not the whole structure. The usual tell is that the balance is fine in good times and tips sharply when one of you is struggling.",
    low: "People come to you for your company rather than your utility. That is the thing most of the other dimensions here depend on.",
    move:
      "Go quiet for two weeks — not a statement, just no initiating. Note who reaches out with something that is not a request. That list is your actual circle, and it is usually shorter and better than the full one.",
  },
  "One-Sided Effort": {
    mechanism:
      "Effort imbalance persists because the person doing more keeps the friendship from failing, which removes the only signal that would prompt the other person to step up. You are, in effect, paying for the evidence that nothing is wrong.",
    high: "Nearly all the maintenance is yours: the messages, the plans, the remembering. If you stopped, most of these friendships would end quietly — not through a falling-out, but through simple absence.",
    mid: "You do more than your share with some people and roughly even with others. Worth sorting which is which, because the effort you spend on the first group is effort the second group does not get.",
    low: "The people around you reach for you as often as you reach for them. This is rarer than you would expect.",
    move:
      "Stop initiating with one specific person for a month. This is not a punishment and they should not be told. You are gathering information you currently do not have — and either outcome is worth knowing.",
  },
  "Emotional Drain": {
    mechanism:
      "Drain is not about how difficult someone's life is; it is about whether the exchange runs in both directions. A friend going through something terrible is not draining. A friend who processes at you, week after week, without ever asking, is — and the difference is participation, not volume.",
    high: "You leave these interactions with less than you arrived with, reliably. The clue is that you can predict it: you already know, before you go, that you will be tired afterwards, and you go anyway.",
    mid: "Some of these friendships cost more than they return, though not consistently enough to feel like a pattern. It usually concentrates in one or two people rather than the whole circle.",
    low: "Your friendships restore rather than deplete you. Protect this — it is the single best indicator in the whole assessment.",
    move:
      "Rate the next five social interactions out of 10 for how you felt an hour afterwards, and write the number down the same evening. Memory smooths this; the notes do not. Patterns show up within a fortnight.",
  },
  "Boundary Disrespect": {
    mechanism:
      "In friendships, boundaries usually fail politely rather than dramatically. Nobody argues — they just do it again, and the social cost of raising it a second time is higher than the cost of letting it go, so it never gets raised.",
    high: "Your stated limits do not survive contact. The reason is rarely malice; it is that nothing happens when they are crossed, so they read as preferences rather than rules.",
    mid: "The bigger limits hold and the small ones erode. Small erosion matters here because friendship has no formal structure — the limits are the only structure there is.",
    low: "What you say goes, and the people around you adjust without a fuss. This is what a healthy circle looks like from the inside.",
    move:
      "Pick the boundary that gets crossed most and restate it once, plainly, with no justification attached. Justifications invite negotiation. 'I don't lend money' lands; 'I can't right now because…' starts a conversation.",
  },
  "Jealousy and Undermining": {
    mechanism:
      "Undermining in friendship is usually indirect — a joke, a qualification, a subject change — because direct competition would breach the friendship's terms. This makes it hard to name, which is precisely why it works, and why you end up doubting your read rather than theirs.",
    high: "Your good news does not land well here. You may already be pre-editing what you share, which is the clearest sign of all: you have adapted to the response rather than addressing it.",
    mid: "There is some competitive undertow, usually from one person or in one specific domain — work, or looks, or relationships — rather than across the board.",
    low: "Your wins are treated as good news. That sounds like a low bar; a large minority of people do not have it.",
    move:
      "Tell one genuinely good piece of news, unhedged and without pre-apologising for it, and watch the first three seconds of the response. The first reaction is the honest one; everything after it is management.",
  },
  "Public vs Private Loyalty": {
    mechanism:
      "A friend who is warm privately and different publicly is not being fake — they are managing a status cost. The version you get alone is real; it is just not the version that survives an audience, and audiences are where most of the consequences happen.",
    high: "There is a significant gap between who they are with you and who they are about you. You have likely had it confirmed at least once and explained it away, because the private version is genuinely good.",
    mid: "Mostly consistent, with an occasional gap under social pressure. Worth watching rather than acting on.",
    low: "They are the same person in the room and out of it. This is the quality that actually determines whether a friendship holds up when something goes wrong.",
    move:
      "Notice who defends you in your absence. You will hear about it indirectly — you always do — and that indirect evidence is far more reliable than anything said to your face.",
  },
  "Guilt and Pressure": {
    mechanism:
      "Guilt is how obligation gets enforced when there is no authority to enforce it. It works by making the cost of saying no emotional rather than practical, so the decision stops being about whether you want to and starts being about whether you can bear to refuse.",
    high: "A substantial part of what you do socially is extracted rather than chosen. The tell is the feeling immediately after you agree: relief that the conversation is over, rather than anything resembling wanting to go.",
    mid: "You get leaned on occasionally and usually hold. The risk is that guilt compounds — each yes makes the next no more expensive.",
    low: "Your yes means yes. This makes you unusually good company, because people can trust that you actually want to be there.",
    move:
      "Say no to one low-stakes request this week, with no reason given — 'I can't make that one' and nothing else. The discomfort lasts about a day. What you learn is whether the friendship required the yes.",
  },
  "Crisis-Only Contact": {
    mechanism:
      "Crisis-only friendships feel intense, which is easy to mistake for close. Intensity and closeness look identical in the moment and diverge entirely over time: closeness includes the ordinary weeks, and crisis-only contact skips straight from one emergency to the next.",
    high: "These friendships exist only in emergencies. Between them there is nothing, and when you have had a hard week yourself you probably did not think of calling them — which tells you what kind of arrangement it is.",
    mid: "Contact is uneven and tilts toward the dramatic, but there is ordinary life in there too.",
    low: "You see these people when nothing is happening. That is the whole definition of a friendship rather than a support service.",
    move:
      "Next time they surface in a crisis, help — and then, a fortnight later when it has passed, suggest something ordinary. Whether that invitation gets taken up answers the question completely.",
  },
  "Trust and Safety": {
    mechanism:
      "Information you share is social currency to someone else. Most leaks are not betrayals; they are small trades — your news for a moment of someone's attention — which is why the person who does it is often genuinely fond of you.",
    high: "Things you said in confidence have travelled. You are probably already filtering, which solves the leak and costs you the friendship's actual function at the same time.",
    mid: "Broadly safe, with one or two people you have learned to be careful around. That learned carefulness is data worth acting on.",
    low: "What you say stays where you put it. Everything else in a friendship is downstream of this.",
    move:
      "Tell one person one small, true, unimportant thing that nobody else knows. If it comes back to you, you have your answer at almost no cost — which is exactly why the test uses something unimportant.",
  },
  "Group Dynamic Damage": {
    mechanism:
      "Groups have properties no individual member has. A circle can make you smaller than any one person in it would, because the norms — what gets mocked, what gets admired, what is allowed to be taken seriously — are set collectively and enforced by everyone at once.",
    high: "The group itself is the problem, not any single member. You would likely defend every person in it individually, and still be worse off in the room than out of it.",
    mid: "The group has a few norms that do not serve you — a running joke at your expense, a subject you have learned not to raise — without being damaging overall.",
    low: "The circle as a whole is good for you. Individual friction is normal and is not what this measures.",
    move:
      "Spend one month prioritising one-to-one contact over group settings with the same people. Most people find the individual relationships are considerably better than the group version — which tells you what to change, and it is not the friendships.",
  },
};

interface FriendResult {
  totalScore: number;
  tier: string;
  top1: string;
  sortedSubcategories: { name: string; score: number; max: number; percentage: number }[];
  customHeadline: string;
}

const BANDS = [
  {
    tier: "Fake-Friend Magnet",
    id: "magnet",
    label: "Fake-Friend Magnet",
    accent: "#f43f5e",
    verdict:
      "Almost every dimension of your social life scored high. That is not a statement about your judgement — it is a statement about a set of relationships that have all drifted the same way, usually because the same tolerance made all of them possible. The pattern is in what you accept, and that is the part you control.",
    urgency:
      "Do not stage exits from several friendships at once. Pick the single relationship costing you the most, change one thing about how you operate in it, and watch what happens for a month.",
    perspective:
      "Being the person others lean on is not a flaw, and you should not come away from this deciding to trust less. The change needed is about cost, not about warmth.",
  },
  {
    tier: "Emotionally Costly Social Life",
    id: "costly",
    label: "Emotionally Costly Social Life",
    accent: "#fb7185",
    verdict:
      "Your friendships are not hostile, they are expensive. You are the reliable one in most of them, and reliability is rewarded with more of the same — more requests, more emotional labour, more maintenance, and no mechanism that ever hands any of it back.",
    urgency:
      "The cost here compounds quietly rather than spiking, so there is no obvious moment to act. That is the argument for choosing one now rather than waiting for a reason.",
    perspective:
      "Nobody in this picture is necessarily behaving badly. Expensive and malicious are different diagnoses and they need different responses.",
  },
  {
    tier: "Boundary-Eroding Friendships",
    id: "eroding",
    label: "Boundary-Eroding Friendships",
    accent: "#f97316",
    verdict:
      "The specific failure in your circle is limits. You set them and they do not hold — not because anyone fights you on it, but because nothing follows when they are crossed, so they never become real to anyone including you.",
    urgency:
      "This is the most fixable profile in the assessment, and it responds to one enforced boundary faster than to any amount of conversation.",
    perspective:
      "Erosion is gradual and reversible. You are not dealing with people who want to take advantage; you are dealing with a system that has no friction in it.",
  },
  {
    tier: "Surrounded by Low-Grade Users",
    id: "lowgrade",
    label: "Surrounded by Low-Grade Users",
    accent: "#f59e0b",
    verdict:
      "Most of your friendships are fine. A few are extractive in a low-level, unremarkable way — the kind that never justifies a confrontation and quietly takes a share of your week anyway. Your chart shows which dimensions they are operating on.",
    urgency:
      "No urgency, but note that low-grade extraction is the type most likely to still be running in five years, precisely because it never gets bad enough to address.",
    perspective:
      "This is the most common result. The ordinary friction of adult friendship accounts for part of it; the top two bars account for the rest.",
  },
  {
    tier: "Overgiving in a Mixed Circle",
    id: "overgiving",
    label: "Overgiving in a Mixed Circle",
    accent: "#eab308",
    verdict:
      "Your circle is mixed and broadly healthy. What shows up in your answers is on your side of the ledger: you give more than you ask for, and you ask for very little. That works until a week when you need something, and then the asymmetry becomes visible all at once.",
    urgency:
      "Nothing to act on quickly. The useful experiment is asking for something small before you need it, rather than waiting for a week when you do.",
    perspective:
      "Overgiving is a good problem to have compared with everything else this assessment measures.",
  },
  {
    tier: "Mostly Safe Circle",
    id: "safe",
    label: "Mostly Safe Circle",
    accent: "#10b981",
    verdict:
      "Your friendships are, by these measures, healthy. Effort is roughly reciprocal, your limits are respected, and what you say stays where you put it. If something still feels off, the chart below will show which single dimension is out of line with the rest.",
    urgency:
      "Nothing needs attention. Treat the chart as a baseline and note any dimension that moves over the next year.",
    perspective:
      "A good circle is partly luck and substantially maintenance. Whatever you are doing has been working.",
  },
];

export function buildFriendsBadDossier(data: FriendResult): Dossier {
  const band = BANDS.find((b) => b.tier === data.tier) ?? BANDS[BANDS.length - 1];
  const score = Math.round(((data.totalScore - 55) / 220) * 100);

  const subscales: Subscale[] = data.sortedSubcategories.map((s) => ({
    key: s.name,
    label: s.name,
    short: MEASURES[s.name]?.short ?? s.name,
    value: Math.max(0, Math.min(100, s.percentage)),
    measures: MEASURES[s.name]?.measures ?? "",
  }));

  const ranked = [...subscales].sort((a, b) => b.value - a.value);
  const top = ranked[0];
  const second = ranked[1];

  return {
    quiz: "Are My Friends Bad For Me?",
    title: "Your Social Circle Audit",
    scoreLabel: "Circle Cost Index",
    score: Math.max(0, Math.min(100, score)),
    band,
    archetype: data.customHeadline,
    archetypeLabel: "The pattern in one sentence",
    topicLabel: `${top.label.toLowerCase()} in your circle`,
    subscales,
    insights: INSIGHTS,
    deepDive: [
      {
        heading: "Where the cost is actually concentrated",
        body:
          `${top.label} (${top.value}) and ${second.label} (${second.value}) are the two dimensions carrying your result. That concentration matters more than the headline number, because a friendship problem is almost never evenly distributed — it runs on one or two specific mechanics, and the rest of the chart is downstream. ` +
          `Working on the top two is not a shortcut; it is the only approach that reliably moves anything, because the lower dimensions largely exist as consequences of the higher ones.`,
      },
      {
        heading: "Why friendship problems stay unaddressed for years",
        body:
          "Romantic relationships have built-in review points — moving in, anniversaries, arguments that force a conversation. Friendships have none. There is no moment where anyone asks how it is going, no structure that requires either person to notice, and no acceptable script for raising a grievance without appearing to make a scene over something small. So the cost accumulates in a category with no audit function, and people routinely discover a friendship stopped working four years after it did.",
      },
      {
        heading: "The difference between a bad friend and a bad fit",
        body:
          "This distinction determines what you should do, and the report cannot make it for you. A bad friend behaves differently with you than with others: you get the version that takes. A bad fit behaves identically with everyone and simply needs something you do not have — more intensity, more availability, more crisis. The first is a character issue and does not improve with conversation. The second improves enormously with a change of format: less frequency, more structure, different setting. Before you act on any dimension above, work out which one you are looking at, because the same behaviour calls for opposite responses.",
      },
      {
        heading: "What actually changes a friendship",
        body:
          "Not a conversation about the friendship. Those almost always fail, because the behaviour is rarely deliberate and the person hears an accusation rather than a request. What works is changing your own inputs and letting the system re-equilibrate: stop initiating and see who initiates; say no once and see what happens; state a limit without a justification attached and see whether it holds. Each is a small experiment that returns real information about a relationship you currently have only an impression of. The friendships worth keeping survive all three without anyone needing to discuss them.",
      },
    ],
    scripts: [
      {
        situation: "Declining without giving a reason",
        say: "I can't make that one — have a good time.",
        why:
          "No reason means nothing to solve. Reasons invite problem-solving ('come after?'), and problem-solving is how a no becomes a negotiation. Warm tone, closed door.",
      },
      {
        situation: "A friend who only surfaces in a crisis",
        say: "I'm glad you called. I've got about half an hour tonight — and I'd like to see you when things are calmer too.",
        why:
          "It helps and names the pattern in the same breath, without accusation. The second half is the part that matters: it is an invitation, and whether it gets taken up is your answer.",
      },
      {
        situation: "Someone crosses a limit you have already stated",
        say: "I meant it the first time. I'm not doing this one.",
        why:
          "Short, no new argument, no re-explaining. Re-explaining reopens a decision you have already made and signals that the limit is still up for discussion.",
      },
      {
        situation: "Your good news gets deflated",
        say: "I'm actually really pleased about it.",
        why:
          "This does not accuse them of anything, so there is nothing to defend against — and it declines the invitation to join in minimising your own news, which is the move that usually follows.",
      },
    ],
    plan: [
      {
        window: "Days 1–3",
        title: "Measure the drain instead of remembering it",
        detail:
          "After every social interaction this week, write one number out of 10 for how you felt an hour later, and one word for why. Memory averages these out and averages in everyone's favour. Three days of notes will show you something you have been carrying an impression of for years.",
      },
      {
        window: "Days 4–7",
        title: "Run the initiation test",
        detail:
          "Stop initiating with everyone. Say nothing about it. Note who gets in touch, and whether what they open with is a request or a question about you. This is the single most informative week in the plan, and the result is usually a mix of one pleasant surprise and one confirmation.",
      },
      {
        window: "Days 8–11",
        title: `Address ${top.label}`,
        detail:
          `Your highest dimension at ${top.value}/100. Do exactly the counter-move from its card above, once, with one person. Not a conversation about the friendship — a change in what you do. Then leave it alone and watch.`,
      },
      {
        window: "Days 12–14",
        title: "Sort the list and decide what each one is",
        detail:
          "Write your circle out and put each name in one of three columns: keep as is, keep at a different format (less often, different setting, clearer limits), or let fade. Most names go in column two. The exercise is useful precisely because it forces you to stop treating a dozen different relationships as one undifferentiated 'social life'.",
      },
    ],
    faq: [
      {
        q: "Do I have to end these friendships?",
        a: "Almost never. Most results here are fixed by changing the format — seeing someone less often, in a different setting, or with a limit that actually holds. Ending a friendship is the right answer for a small minority of cases, usually ones involving the Trust and Safety dimension.",
      },
      {
        q: "Should I tell them I took this quiz?",
        a: "No. Conversations that open with a diagnosis put the other person on the defensive and rarely change behaviour. The plan above is built entirely from changes to your own side, for exactly this reason.",
      },
      {
        q: "What if I'm the bad friend?",
        a: "Worth taking seriously, and the top two dimensions of your own chart are a reasonable place to check. Anyone who genuinely is would most likely not be asking — but if a specific relationship keeps coming to mind while you read this, the honest move is to ask that person directly.",
      },
    ],
  };
}
