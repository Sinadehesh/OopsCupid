import type { Metadata } from "next";
import Link from "next/link";
import {
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ClipboardList,
  MessageCircle,
  Map,
} from "lucide-react";
import { CLARITY_CALL, RESET_PROGRAM } from "@/lib/offers/catalog";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import QuizFaq from "@/components/seo/QuizFaq";
import RelatedQuizzes from "@/components/seo/RelatedQuizzes";

export const metadata: Metadata = {
  title: "Relationship Clarity Coaching | 1:1 Sessions | OopsCupid",
  description:
    "Private 1:1 coaching sessions that turn your quiz results into a concrete plan. Decode his behavior, set boundaries, and decide your next move — with someone in your corner.",
  alternates: { canonical: "https://oopscupid.com/coaching" },
  openGraph: {
    title: "Relationship Clarity Coaching | OopsCupid",
    description:
      "Your quiz told you what's happening. A clarity session tells you what to do about it — tonight.",
    url: "https://oopscupid.com/coaching",
    type: "website",
  },
};

const COACHING_FAQ = [
  {
    q: "Is this therapy?",
    a: "No. Coaching is practical and forward-looking: we work on scripts, boundaries, decisions, and plans for your specific situation. If what comes up needs clinical support, we'll say so honestly and point you toward licensed help.",
  },
  {
    q: "What happens in a clarity session?",
    a: "You share your quiz results (or just your situation), we go through it together for 60 minutes, and you leave with a written 14-day action plan: what to say, what to watch for, and what decision points are coming.",
  },
  {
    q: "Do I have to be on camera?",
    a: "No. Video or voice-only, whichever feels safer. Everything discussed stays private.",
  },
  {
    q: "What if it's not useful?",
    a: "Say so within the first 15 minutes of the session and you get a full refund. We only want to be paid for sessions that actually helped.",
  },
  {
    q: "How fast can I book?",
    a: "Checkout takes a minute through Gumroad, and you'll receive the scheduling link immediately — most sessions happen within 48 hours.",
  },
];

export default function CoachingPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", slug: "/" },
          { name: "Coaching", slug: "/coaching" },
        ]}
      />

      {/* HERO */}
      <section className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-8 py-20 md:py-28 max-w-4xl text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-rose-500/20 text-rose-300 font-black text-xs tracking-widest uppercase mb-8">
            1:1 Private Coaching
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Your Test Told You What&apos;s Happening.
            <br />
            <span className="text-rose-400">Now Get The Plan.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
            A report can name the pattern. It can&apos;t answer your follow-up questions, hear the
            details that don&apos;t fit a quiz, or tell you what to say tonight. That&apos;s what a
            clarity session is for.
          </p>
          <a
            href={CLARITY_CALL.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-rose-500 hover:bg-rose-400 text-white font-black text-xl px-10 py-5 rounded-2xl transition-all shadow-xl hover:-translate-y-0.5"
          >
            {CLARITY_CALL.cta} — {CLARITY_CALL.price} <ArrowRight className="w-6 h-6" />
          </a>
          <p className="text-slate-400 text-sm font-bold mt-4">
            Secure checkout via Gumroad · Scheduling link delivered instantly
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 md:px-8 py-20 max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-14">
          How A Session Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: ClipboardList,
              title: "1. Bring your results",
              body: "Take any of our tests first (or don't — your story is enough). Your scores give us a head start on the pattern.",
            },
            {
              icon: MessageCircle,
              title: "2. Talk it through",
              body: "60 private minutes on your situation: the behaviors, the doubts, the thing you haven't told anyone. Ask everything.",
            },
            {
              icon: Map,
              title: "3. Leave with a plan",
              body: "A written 14-day action plan: exact scripts, boundaries to set, signals to watch, and the decision point ahead.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-5">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERS */}
      <section className="bg-white border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-8 py-20 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight text-center mb-4">
            Two Ways To Work Together
          </h2>
          <p className="text-slate-500 font-medium text-lg text-center max-w-2xl mx-auto mb-14">
            One-time payments, no subscriptions. Both include the written plan.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {[CLARITY_CALL, RESET_PROGRAM].map((offer, i) => (
              <div
                key={offer.id}
                className={`relative flex flex-col rounded-3xl border-2 p-10 ${
                  i === 1 ? "border-rose-500 shadow-2xl" : "border-slate-200 shadow-sm"
                }`}
              >
                {i === 1 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Best for repeat patterns
                  </div>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {i === 0 ? "Single Session" : "4-Week Program"}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{offer.name}</h3>
                <p className="text-slate-500 font-medium mb-7">{offer.tagline}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {offer.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-600">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mb-6">
                  <span className="text-5xl font-black text-slate-900">{offer.price}</span>
                  {offer.anchorPrice && (
                    <span className="block text-sm font-bold text-slate-400 mt-1">
                      {offer.anchorPrice}
                    </span>
                  )}
                </div>
                <a
                  href={offer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center gap-2 w-full py-5 rounded-2xl font-black text-lg transition-all ${
                    i === 1
                      ? "bg-rose-500 hover:bg-rose-400 text-white shadow-lg"
                      : "bg-slate-900 hover:bg-slate-700 text-white"
                  }`}
                >
                  {offer.cta} <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 mt-10">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <p className="font-bold text-slate-500">
              First-15-minutes guarantee: not useful? Full refund, no questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* NOT SURE YET → quiz funnel back-link */}
      <section className="container mx-auto px-4 md:px-8 py-16 max-w-3xl text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Not sure a session is for you?</h2>
        <p className="text-slate-500 font-medium text-lg mb-8">
          Start with a free test — it takes 3 minutes and your results make the session twice as
          productive.
        </p>
        <Link
          href="/quizzes"
          className="inline-flex items-center gap-2 font-black text-rose-600 hover:text-rose-500 text-lg"
        >
          Browse all free tests <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <QuizFaq items={COACHING_FAQ} heading="Coaching FAQ" />
      <RelatedQuizzes currentSlug="/coaching" heading="Start With A Free Test" />
    </main>
  );
}
