import MainHero from "@/components/ui/MainHero";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Is My Friend Toxic? The Real Reason Some Friendships Leave You Feeling Worse Than Alone | OopsCupid",
  description: "Not all toxic friendships look like dramatic betrayals. Learn the four hidden patterns of toxic friendships and why they are so hard to leave.",
};

export default function IsMyFriendToxicArticle() {
  return (
    <main className="bg-slate-50 min-h-screen pb-24">
      <MainHero
        headline="Is My Friend Toxic?"
        subheadline="The Real Reason Some Friendships Leave You Feeling Worse Than Alone"
      />

      <article className="max-w-3xl mx-auto px-6 py-12 text-slate-800 text-lg leading-relaxed space-y-6">
        <Link href="/articles" className="text-[#00A6ED] font-bold text-sm uppercase tracking-widest hover:underline mb-8 inline-block">
          &larr; Back to Articles
        </Link>

        <p>You leave the conversation and something feels off.</p>

        <p>You cannot always name it. There was no screaming, no obvious betrayal, nothing you could point at and say <em>that</em> — right there, that was wrong. But you feel a familiar weight settling in. A low-grade exhaustion. A quiet sense that something was taken from you and you are not entirely sure what.</p>

        <p>You start replaying the conversation. Wondering if you said something wrong. Wondering if you are being too sensitive. Wondering why, after spending time with someone who is supposed to be your friend, you feel more drained than before you picked up the phone.</p>

        <p>Here is what that feeling might be telling you: not all toxic friendships look like dramatic betrayals. Most of them do not. Most of them look like just enough warmth to keep you close, and just enough harm to keep you small.</p>

        <p>And the hardest part is that you have probably already talked yourself out of taking it seriously at least ten times.</p>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mt-12 mb-4">Why Toxic Friendships Are So Hard to See</h2>

        <p>Romantic relationships get all the red-flag content. There are thousands of articles about narcissistic partners, attachment styles, emotional abuse, and manipulation tactics in dating. But friendships? We are told to be loyal. We are told that real friends go through hard phases. We are told that pulling away makes us bad people.</p>

        <p>That cultural script is exactly what toxic friendships rely on.</p>

        <p>Because the truth is that friendships can carry the same patterns of control, jealousy, emotional inconsistency, relational aggression, and social harm as any romantic relationship — and they are far less likely to be examined with the same rigor.</p>

        <p>A toxic friend does not have to threaten you or betray a confidence in one dramatic moment. The more common version is slower. It works through repeated patterns: the subtle put-down in front of others, the cold withdrawal when you do not behave as expected, the way they share just enough of your vulnerabilities back at you to remind you who holds the information. The way you feel like the problem in every conflict. The way you feel like you owe them something you cannot quite account for.</p>

        <p>Research on friendship quality confirms that friendships are multidimensional — they carry real dimensions of trust, security, reciprocity, conflict, and betrayal that operate independently from each other. A friendship can score high on warmth in some moments and high on psychological harm in others. That complexity is exactly what makes toxic friendships so disorienting to evaluate from the inside.</p>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mt-12 mb-4">The Four Patterns Hiding Inside "I Think My Friend Is Toxic"</h2>

        <p>"My friend is toxic" is not one thing. It is at least four different things, and naming the right one matters enormously for what you do next.</p>

        <p><strong>The Controlling Friend</strong> uses emotional leverage. Guilt, sulking, emotional withdrawal, or escalating tension when you exercise independence. This friendship has unwritten rules and you are always on edge about violating them. You self-censor. You choose what to share, where to go, who else you spend time with — all calibrated around managing their reaction. Research on friendship victimization was built specifically to capture this kind of controlling harm inside friendships rather than just general conflict.</p>

        <p><strong>The Relationally Aggressive Friend</strong> does not attack you directly. They work through the social fabric. Exclusion. Triangulation. The comment they make about you when you are not in the room. The way they are warm in private and subtly undermining in public. Research on relational aggression in friendships shows that this pattern uniquely combines intimacy with aggression — making it extraordinarily difficult to name, because the closeness feels real and the harm is always deniable.</p>

        <p><strong>The One-Sided Friend</strong> is not obviously cruel. They are just consistently not there — not for the things that cost them something. You show up. You invest. You apologize. You carry the emotional labor of maintaining the friendship and somehow also the emotional labor of managing their reactions when it is not enough. The friendship quality research calls this the trust, help, and companionship deficit: a relationship that looks like a friendship on the surface but runs on depletion rather than reciprocity.</p>

        <p><strong>The Unsafe Friend</strong> is the one that leaves you feeling morally destabilized, pressured into bad decisions, afraid of their unpredictability, or exhausted by low-level dishonesty and chaos. Not a villain in a movie. Just someone whose presence consistently makes your life less stable, less honest, or less safe — and yet somehow you feel responsible for making it work.</p>

        <p>Most toxic friendships are not one clean type. They are combinations. And the combinations are what make them so hard to leave.</p>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mt-12 mb-4">Why You Are Still There</h2>

        <p>Let's be precise about this, because it matters.</p>

        <p>You are not still in this friendship because you are weak. You are not there because you lack self-respect or cannot see what is happening. You are there because human attachment systems are not designed to cut off warmth quickly, even when that warmth is inconsistent. You are there because the moments of connection feel real. Because leaving feels like failure. Because you have already invested enormous emotional resources and the sunk-cost calculus of friendship is brutal.</p>

        <p>You are also there because, at some level, you are not sure whether the problem is the friendship or you.</p>

        <p>That uncertainty is not a character flaw. It is the predictable result of a pattern that works specifically by making you doubt your own read of events. Research links friendship victimization directly to greater depressive symptoms — which means the more the friendship harms you, the less clear your perception of it becomes, and the harder leaving gets.</p>

        <p>This is circular by design.</p>

        <p>The only way to interrupt it is to get an external, structured, honest read of what the actual patterns look like — separate from the story you have been living inside.</p>

        <p>That is exactly what the OopsCupid Toxic Friendship Assessment was built to give you.</p>

        <div className="my-10 p-8 bg-white border-2 border-[#00A6ED]/20 rounded-2xl text-center shadow-lg">
          <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4">Stop second-guessing yourself.</h3>
          <p className="text-slate-600 mb-6">Take the Free Friendship Screening Now.</p>
          <Link href="/toxic-friend-test" className="inline-block bg-[#00A6ED] hover:bg-[#008fcc] text-white font-extrabold text-lg py-4 px-10 rounded-xl transition-all transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,166,237,0.3)]">
            Start Free Assessment
          </Link>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0D2C54] mt-12 mb-4">The Free Test Shows You the Pattern. The Report Tells You What to Do With It.</h2>

        <p>The free screening gives you a structured read across the most predictive dimension of friendship harm: whether this friendship shows signs of victimization, control, or repeated emotional destabilization.</p>

        <p>If your result comes back elevated — that read is real. It deserves more than a label.</p>

        <p>The Premium Friendship Pattern Report goes four layers deeper. It does not just tell you whether the friendship is "toxic." It shows you the precise architecture of what is happening, why it is hard to leave, and what you can do about it without losing yourself in the process.</p>

        <p>Here is what the premium report unlocks:</p>

        <ul className="space-y-4 list-none pl-0">
          <li className="bg-slate-100 p-5 rounded-xl border border-slate-200">
            <strong className="text-[#0D2C54]">Your Friendship Risk Score.</strong> An overall normalized score across all four harm dimensions — victimization, negative friendship quality, relational aggression, and unsafe influence — visualized as a full-dimensional profile rather than a single vague rating.
          </li>
          <li className="bg-slate-100 p-5 rounded-xl border border-slate-200">
            <strong className="text-[#0D2C54]">Your Dominant Toxic Pattern.</strong> One of five precisely described friendship patterns — Healthy but Strained, One-Sided / Draining, Relational Aggressor, Controlling / Manipulative, or High-Risk Toxic — with a narrative that tells you what that pattern actually feels like from the inside.
          </li>
          <li className="bg-slate-100 p-5 rounded-xl border border-slate-200">
            <strong className="text-[#0D2C54]">Your Top Red Flags.</strong> The three strongest behavioral patterns your specific answers revealed. Not generic "signs of toxic friendship" content. The specific behaviors your responses pointed to, described in plain language.
          </li>
          <li className="bg-slate-100 p-5 rounded-xl border border-slate-200">
            <strong className="text-[#0D2C54]">The "Am I Overreacting?" Section.</strong> One of the most valuable parts of the report. A clear, honest answer to the question you have already asked yourself a hundred times: Is this normal conflict, or is this genuinely a pattern of harm? What makes this more than ordinary friendship friction? This section exists because one of the most powerful tools a toxic friendship has is your own tendency to minimize.
          </li>
          <li className="bg-slate-100 p-5 rounded-xl border border-slate-200">
            <strong className="text-[#0D2C54]">Boundary Guidance.</strong> Not "just leave." Real, specific, psychologically grounded suggestions for what you can actually do — reduce disclosure, test reciprocity, stop carrying the repair alone, set one behavioral limit and observe the response — depending on your specific pattern and severity.
          </li>
          <li className="bg-slate-100 p-5 rounded-xl border border-slate-200">
            <strong className="text-[#0D2C54]">The Friendship Harm Score.</strong> A separate emotional-cost assessment showing how much this specific friendship is affecting your mood, stress levels, self-worth, and mental energy. Because the cost is real, it is measurable, and you deserve to see it clearly.
          </li>
        </ul>

        <p className="mt-8">The premium report is not a verdict on your friend. It is a map of the dynamic — objective, precise, and based on your actual answers rather than on what you think you should feel.</p>

        <p>Some people read it and decide to leave. Some read it and find specific tools to shift the friendship. Some read it and finally feel permission to stop blaming themselves for what has never been their fault.</p>

        <p>All of those outcomes start with the same thing: an accurate read of what is actually there.</p>

        <div className="my-16 p-10 bg-[#0f172a] rounded-[24px] text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d81159]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A6ED]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 relative z-10 leading-snug">
            You deserve to stop wondering if you are the problem.
          </h3>
          <p className="text-slate-300 text-lg mb-10 relative z-10">
            Some friendships are forever. Some friendships are a chapter. Some are a lesson written across years of exhaustion and self-doubt that finally starts to make sense when you can see the pattern clearly.
          </p>
          <Link href="/toxic-friend-test" className="relative z-10 w-full md:w-auto inline-block bg-[#00A6ED] hover:bg-[#008fcc] text-white font-extrabold text-lg py-4 px-10 rounded-[14px] transition-all transform hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,166,237,0.3)]">
            Discover Your Pattern Now
          </Link>
        </div>

      </article>
    </main>
  );
}
