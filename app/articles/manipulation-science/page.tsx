import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Science of Manipulation & Coercive Control | OopsCupid",
  description: "Learn the science behind coercive control, gaslighting, and the hidden patterns of manipulation in relationships.",
};

export default function ManipulationEssay() {
  return (
    <article className="min-h-screen bg-[#f2f5fa] font-sans text-[#2a2522]">
      {/* Hero Header */}
      <header className="bg-[#2a2522] text-white py-32 px-6 text-center relative overflow-hidden border-b-[6px] border-[#650000]">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#650000 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#ced2dc] font-black tracking-[0.3em] mb-6 uppercase text-sm md:text-base">Scientific Deep Dive</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Is My Boyfriend Manipulating Me? The Science Behind the Patterns You Can't Quite Name
          </h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-20 text-lg md:text-xl leading-[1.8] text-[#2a2522]/90">
        <p className="mb-8 font-extrabold text-2xl text-[#650000]">You are not crazy.</p>
        
        <p className="mb-8">That is the first thing to say. Because if you are reading this, there is a good chance that someone in your life has already made you feel like you might be.</p>

        <p className="mb-8">Maybe you leave arguments feeling like somehow, despite everything, it was your fault. Maybe you catch yourself editing what you say before you say it, second-guessing how he will react, rehearsing sentences in your head so nothing escalates. Maybe you used to feel more confident. More like yourself. And now you are not sure when that changed, or why, or if you are even remembering it correctly.</p>

        <p className="mb-8 italic border-l-4 border-[#650000] pl-6 py-2 bg-[#650000]/5 text-[#2a2522]">This is not a personality flaw. It is not you being "too sensitive" or "too emotional." In many cases, it is the predictable psychological result of living inside a system of manipulation — one that is specifically designed to be invisible.</p>

        {/* MID-TEXT CTA */}
        <div className="my-16 p-10 bg-white rounded-[32px] border-2 border-dashed border-[#ced2dc] text-center shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#2a2522]">Don't try to think harder about it. Measure it.</h3>
          <Link href="/is-he-manipulative" className="inline-block bg-[#650000] text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 hover:shadow-xl transition-all hover:bg-[#490000]">
            Take the Free Clinical Screening →
          </Link>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-16 mb-8 text-[#2a2522] tracking-tight border-b border-[#ced2dc] pb-2">Why Manipulation Is Hard to Name</h2>
        <p className="mb-8">The word "manipulation" carries weight. It implies that someone is consciously, deliberately engineering your reality. And that feels extreme. It feels like the kind of thing that happens to other people.</p>
        <p className="mb-8">But psychological research on intimate partner abuse does not require intent to prove harm. What the evidence consistently shows is that certain behavioral patterns — regardless of whether they feel deliberate or not — produce measurable psychological damage: eroded self-worth, chronic fear responses, impaired emotion regulation, and a progressively narrowing sense of what is normal.</p>
        <p className="mb-8">The research framework that captures this most precisely is the science of <strong>coercive control</strong>: the systematic use of demands, threats, and surveillance to gain and maintain power over a partner. Coercive control is not about one blowup or one bad fight. It is a pattern. It operates across time. It is built through repetition, not peaks.</p>
        <p className="mb-8">And it operates alongside other specific mechanisms: psychological abuse, reality distortion, financial and social restriction, and the particular cruelty of gaslighting — the practice of making someone doubt their own memory, perception, and judgment until they depend on the abuser to tell them what is real.</p>
        <p className="mb-8">These are not dramatic movie scenarios. They are quiet, cumulative, and deeply effective.</p>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-16 mb-8 text-[#2a2522] tracking-tight border-b border-[#ced2dc] pb-2">The Pattern Behind the Pattern</h2>
        <p className="mb-8">To understand why manipulation works so well, it helps to understand what it targets.</p>
        <p className="mb-8">Every person carries a baseline level of self-worth — a felt sense of whether they are fundamentally acceptable, lovable, and trustworthy to themselves. When that baseline is stable, you can absorb criticism, conflict, and rejection without collapsing. You can hold your own perception even when someone challenges it.</p>
        <p className="mb-8">When self-worth is unstable — or when someone systematically destabilizes it — you become psychologically dependent on the relationship to regulate your sense of reality. That dependency is not weakness. It is the precise mechanism that emotional coercion exploits.</p>
        <p className="mb-8">Healthy relationships involve repair. Difficult ones involve pressure: pressure to comply, pressure to shrink, pressure to stop trusting your own read of events.</p>
        <p className="mb-8">Research identifies several distinct patterns that often co-occur in manipulative relationships, and they do not always look the same.</p>
        <p className="mb-8">Some are loud: explosive anger, outbursts, intimidation, threats. Those are easier to name. Easier to leave.</p>
        <p className="mb-8">Others are quieter. A partner who repeatedly reframes every conflict so that you are always the one who misunderstood, overreacted, or provoked it. A partner who monitors your phone while framing it as love. A partner who slowly introduces reasons why your friends are problems, your family is toxic, your outside life is a threat to your connection. A partner whose disappointment feels like a sentence. A partner who uses money, access, housing, or affection as leverage.</p>
        <p className="mb-8">These patterns do not announce themselves as abuse. They announce themselves as "this is just how we communicate" and "I'm like this because I love you" and "you always do this."</p>
        <p className="mb-8">Until you are not sure what you actually remember anymore.</p>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-16 mb-8 text-[#2a2522] tracking-tight border-b border-[#ced2dc] pb-2">The Four Dimensions Hiding in Plain Sight</h2>
        <p className="mb-8">Psychological research identifies four primary dimensions of psychological intimate partner abuse, and they rarely appear in isolation.</p>
        <ul className="mb-8 space-y-4">
          <li><strong className="text-[#650000]">Severe psychological abuse</strong> includes the most overtly threatening behaviors: threats involving safety, children, or pets; using fear as a primary control mechanism; behaviors designed to punish noncompliance.</li>
          <li><strong className="text-[#650000]">Coercive emotional abuse</strong> is often more subtle: humiliation, degradation, jealousy, or emotional volatility used strategically to undermine your confidence and keep you unstable.</li>
          <li><strong className="text-[#650000]">Restrictive and isolating abuse</strong> works by quietly narrowing your world: limiting access to people, places, information, or support until the relationship becomes the center of everything, and leaving it feels impossible or catastrophic.</li>
          <li><strong className="text-[#650000]">Financial abuse</strong> includes controlling income, access to money, housing, transport, or essentials as instruments of power. It rarely gets discussed. It is often the least visible dimension. And it is one of the most effective mechanisms of entrapment.</li>
        </ul>
        <p className="mb-8">What makes these four dimensions so insidious together is how naturally they can masquerade as personality, love, or just "how he is." Jealousy reads as passion. Control reads as protection. Isolation reads as wanting closeness. Financial control reads as being practical.</p>
        <p className="mb-8">The pattern only becomes visible when you step back and look at all four dimensions simultaneously, across time.</p>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-16 mb-8 text-[#2a2522] tracking-tight border-b border-[#ced2dc] pb-2">Gaslighting: When You Stop Trusting Yourself</h2>
        <p className="mb-8">Among all manipulation mechanisms, gaslighting deserves its own category because of what it targets: not your behavior, but your perception.</p>
        <p className="mb-8">Research on romantic gaslighting identifies it as a distinct mechanism organized around three core operations: <strong>reality distortion</strong> (denying what happened, contradicting clear memories, rewriting the sequence of events); <strong>self-doubt induction</strong> (making you question your judgment, emotional reactions, or mental stability); and <strong>confusion-dependency</strong> (creating ongoing disorientation so that you rely on the abuser to define what is real).</p>
        <p className="mb-8">What makes gaslighting particularly damaging is that it compounds over time. The first time someone denies something you know happened, you feel confused. By the tenth time, you start genuinely wondering if you have a memory problem. By the hundredth time, you ask him before you trust your own reactions.</p>
        <p className="mb-8">This is not dramatic. This is not rare. Research shows it is strongly correlated with psychological abuse more broadly, while remaining a functionally distinct mechanism — which is why it deserves to be screened separately, not folded into a generic stress or conflict measure.</p>
        <p className="mb-8 font-semibold text-[#650000]">If you find yourself prefacing sentences with "I might be wrong, but..." or "maybe I'm remembering it wrong, but..." more than you used to — that is worth paying attention to.</p>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-16 mb-8 text-[#2a2522] tracking-tight border-b border-[#ced2dc] pb-2">Why You Can't Think Your Way Out</h2>
        <p className="mb-8">Here is what makes all of this so difficult to recognize from the inside.</p>
        <p className="mb-8">Manipulation works by shaping the lens you use to evaluate the relationship. When the instrument of measurement is itself compromised — when your self-worth is eroded, your perception has been destabilized, and your social support has narrowed — you cannot accurately assess your own situation using only your own internal reading of it.</p>
        <p className="mb-8">This is not a character flaw. It is not a failure of intelligence or strength. It is the documented psychological mechanism by which coercive control maintains itself over time.</p>
        <p className="mb-8">Which is why the most useful thing you can do is not try to think harder about it. It is to get an external, structured, data-driven read of the actual patterns — separate from the story you have been living inside.</p>
        <p className="mb-8">That is exactly what the OopsCupid Manipulation Battery was built for.</p>

        {/* CTA */}
        <div className="my-12 p-8 bg-[#650000]/10 rounded-3xl border border-[#650000]/20 text-center">
          <Link href="/is-he-manipulative" className="inline-block bg-[#650000] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform hover:bg-[#490000]">
            Unlock Your Psychological Blueprint — Take the Free Screening Now.
          </Link>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-16 mb-8 text-[#2a2522] tracking-tight border-b border-[#ced2dc] pb-2">The Free Test Is the First Layer. The Report Is the Map.</h2>
        <p className="mb-8">The free screening gives you a baseline read across the four dimensions of psychological abuse that research has identified as most predictive of harm: severe abuse, coercive emotional patterns, isolation and restriction, and financial control.</p>
        <p className="mb-8">If that result shows elevated risk, the picture you are seeing is real. It deserves a closer look.</p>
        <p className="mb-8 font-bold">The Premium Manipulation Report goes four layers deeper. It does not just tell you whether the relationship is concerning. It shows you the exact anatomy of what is happening:</p>
        
        <ul className="mb-12 space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-[#650000] font-bold mt-1">✓</span>
            <span><strong>Your Coercive Control Profile.</strong> How demands, threats, and surveillance operate in your relationship — and how much of your daily behavior is already shaped around managing his reactions. The research behind this layer found that coercion victimization is directly associated with PTSD and depression symptomatology, which means this is not just a relationship problem. It is a psychological health issue.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#650000] font-bold mt-1">✓</span>
            <span><strong>Your Power Tactics Map.</strong> A structured breakdown of the specific control tactics present: intimidation, blame-shifting, minimization, isolation mechanics, and economic leverage — visualized as a pattern profile rather than a generic label.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#650000] font-bold mt-1">✓</span>
            <span><strong>Your Gaslighting Score.</strong> A dedicated screen measuring reality distortion, self-doubt induction, and confusion-dependency — so you can finally see whether the reason you are doubting yourself is internal or being systematically created.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#650000] font-bold mt-1">✓</span>
            <span><strong>Your Response Pattern.</strong> One of the most revealing findings in coercion research is not what he is doing — it is how much you have already changed yourself to manage it. This module measures the behavioral adaptations you may not have noticed you have made.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#650000] font-bold mt-1">✓</span>
            <span><strong>Your Dominant Manipulation Pattern and Escalation Flags.</strong> The premium report identifies which of the five key patterns best describes your relationship dynamic, whether the severity tier is Emerging, Elevated, High, or Critical, and whether any safety-critical flags are present that deserve immediate attention.</span>
          </li>
        </ul>

        <p className="mb-8">This is not a quiz that tells you to leave or to stay. That is your decision, and only yours.</p>
        <p className="mb-8">What it does is give you back something that manipulation is specifically designed to take away: clarity. An accurate, external, evidence-based map of what is actually in your relationship — independent of what you have been told to believe about it.</p>
        <p className="mb-8">You deserve to make decisions about your relationship with full information. Not filtered through his version of events.</p>

        {/* FINAL CONVERSION BANNER */}
        <div className="mt-20 p-12 bg-[#2a2522] text-white rounded-[40px] text-center shadow-2xl border-4 border-[#650000]">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Ready to see the real pattern?</h2>
          <p className="text-[#ced2dc] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Get the full Premium Manipulation Report and find out exactly what your answers reveal about the dynamic you are living inside.
          </p>
          <Link href="/is-he-manipulative" className="inline-block bg-[#650000] text-white px-10 py-6 rounded-full text-xl font-bold hover:bg-[#490000] transition-all hover:scale-105 shadow-xl w-full sm:w-auto">
            Unlock Your Psychological Blueprint
          </Link>
        </div>
      </div>
    </article>
  );
}
