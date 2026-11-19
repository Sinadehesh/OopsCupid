import type { Metadata } from "next";
import Link from "next/link";
import TickPicker from "@/components/tick/TickPicker";
import QuizSeoFooter from "@/components/seo/QuizSeoFooter";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { stickerStatic, display, CANDY } from "@/lib/ui/sticker";

const PAGE_URL = "https://www.oopscupid.com/red-flags-in-a-relationship";
const TITLE = "Red Flags in a Relationship: The 24-Sign Checklist";
const DESCRIPTION =
  "24 red flags in a relationship, from love bombing to checking your phone: what each one looks like in real life, which ones count on their own, and a 30-second test.";

export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  title: `${TITLE} | OopsCupid`,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: PAGE_URL, type: "article" },
};

type Flag = { title: string; body: string; link?: { href: string; label: string } };

/**
 * The checklist itself, written out so the page has something of its own
 * to say. Each flag points to the page that goes deeper on it, which also
 * gives those pages a path in from here.
 */
const GROUPS: { emoji: string; title: string; intro: string; flags: Flag[] }[] = [
  {
    emoji: "🚀",
    title: "Early on",
    intro: "The ones that feel good at first, which is why they're easy to miss.",
    flags: [
      { title: "It's very intense, very fast", body: "Soulmate talk in week two, texts all day, plans for your future before he knows your middle name. It feels amazing, and it's also exactly how love bombing starts.", link: { href: "/am-i-being-love-bombed", label: "Am I being love bombed?" } },
      { title: "Hot, then cold, then hot again", body: "Three perfect days, then silence, then he's back as if nothing happened. The unpredictability is what makes it so hard to walk away from.", link: { href: "/is-he-breadcrumbing-me", label: "Is he breadcrumbing me?" } },
      { title: "Every ex was crazy", body: "One bad breakup happens to anyone. If every single ex was the problem, it's worth wondering how he'll describe you one day." },
      { title: "He pushes small nos", body: "\"Just one more drink.\" \"Stay, it's late.\" A no that turns into a negotiation is a preview of how he'll handle the bigger ones." },
      { title: "Charming to you, rude to the waiter", body: "How someone treats people they don't need to impress is the most honest preview you'll ever get." },
      { title: "Big plans that never get a date", body: "The trip, meeting his friends, moving in \"soon\". Future-faking keeps you invested in a relationship that only exists in the future tense." },
    ],
  },
  {
    emoji: "💬",
    title: "How he talks to you",
    intro: "Rows happen in every relationship. These are about what happens to you in them.",
    flags: [
      { title: "He twists your words", body: "You say one thing and somehow end up defending something you never said.", link: { href: "/signs/he-twists-my-words", label: "When he twists your words" } },
      { title: "\"That never happened\"", body: "You remember it clearly. He says you're making it up, often enough that you've started to doubt your own memory. That's what gaslighting feels like from the inside.", link: { href: "/signs/he-says-it-never-happened", label: "When he says it never happened" } },
      { title: "\"You're too sensitive\"", body: "Your reaction becomes the problem, so the thing he did never gets talked about.", link: { href: "/signs/he-says-im-too-sensitive", label: "When he says you're too sensitive" } },
      { title: "Silence as a punishment", body: "Not needing some space after a row, but going cold for days until you apologise.", link: { href: "/signs/he-gives-me-the-silent-treatment", label: "The silent treatment" } },
      { title: "You always end up apologising", body: "You started the conversation upset with him and finished it saying sorry. Once is a misunderstanding. Every time is a pattern.", link: { href: "/signs/i-always-end-up-apologizing", label: "Why you always end up apologising" } },
      { title: "Jokes that are really digs", body: "Comments about your body, your job or your friends, and you're \"no fun\" if you mind." },
    ],
  },
  {
    emoji: "🔒",
    title: "Control",
    intro: "Often explained as caring. The test is whether you feel freer or smaller.",
    flags: [
      { title: "He checks your phone", body: "Or wants your passwords, or your location on all the time, and calls it trust.", link: { href: "/is-my-relationship-controlling", label: "Is my relationship controlling?" } },
      { title: "He decides who you see", body: "Sulking every time you see your friends works just as well as a rule. Either way, you end up seeing them less." },
      { title: "Jealousy dressed up as love", body: "\"I just care about you so much.\" Caring about you doesn't need you to account for every hour." },
      { title: "Money with strings", body: "He controls it, checks it, or brings up what he's paid for whenever you disagree." },
      { title: "You ask permission for normal things", body: "Going out, buying something, wearing something. If you've started checking with him first, something has shifted." },
      { title: "He accuses you of cheating", body: "No evidence, lots of questions, and somehow you're the one on trial.", link: { href: "/signs/he-accused-me-of-cheating", label: "When he accuses you of cheating" } },
    ],
  },
  {
    emoji: "🫠",
    title: "Trust, and how you feel",
    intro: "Sometimes the clearest sign isn't anything he does, it's what's happened to you.",
    flags: [
      { title: "His phone goes everywhere", body: "Face down on the table, into the bathroom, a new passcode. It's not proof of anything on its own, but you're allowed to notice.", link: { href: "/signs/he-takes-his-phone-everywhere", label: "When his phone goes everywhere" } },
      { title: "Working late, every night", body: "And the story is slightly different each time you ask.", link: { href: "/signs/hes-been-working-late-every-night", label: "When he's working late every night" } },
      { title: "Distant, but \"nothing's wrong\"", body: "He's pulled away, and asking about it gets you \"you're overthinking\".", link: { href: "/signs/he-feels-distant-but-says-nothing-is-wrong", label: "When he's distant but says nothing's wrong" } },
      { title: "You feel a bit crazy around him", body: "Confused after conversations, unsure what you actually saw or heard.", link: { href: "/signs/i-feel-crazy-around-him", label: "When you feel crazy around him" } },
      { title: "You walk on eggshells", body: "You rehearse how to say things so he won't kick off, and you read his mood the second he walks in." },
      { title: "You've stopped telling your friends", body: "Because you already know what they'd say." },
    ],
  },
];

const FAQ = [
  {
    q: "What are the biggest red flags in a relationship?",
    a: "Control and fear. Checking your phone, deciding who you see, threats, and anything that makes you scared of his reaction matter more than everything else on this list. Most of the others are about a pattern: being told your memory is wrong, always ending up apologising, and attention that runs hot and cold.",
  },
  {
    q: "How many red flags are too many?",
    a: "There's no magic number. One serious flag, like control or anything that frightens you, is enough on its own. For the rest, look for the same thing happening again and again, and for what happens when you bring it up.",
  },
  {
    q: "Can a red flag be fixed?",
    a: "Some habits can change when someone sees them and wants to. The best sign is that he can hear what you're saying without punishing you for saying it. If raising it always makes things worse, that tells you a lot.",
  },
  {
    q: "Is this checklist a diagnosis?",
    a: "No. It describes common warning signs. It can't tell you what's going on in your relationship, but it can help you see a pattern clearly and talk about it, with him or with someone you trust.",
  },
];

export default function RedFlagsChecklist() {
  let n = 0;
  return (
    <>
      <main className="bg-[#FFF4FA] text-[#1A1033] overflow-x-hidden">
        <div className="max-w-2xl mx-auto px-5 pt-10 pb-4">
          <p className="mb-4">
            <Link href="/relationship-red-flags" className="text-[13px] font-black underline underline-offset-2 opacity-70">
              ← All relationship red flags
            </Link>
          </p>
          <p className="text-[12px] font-black uppercase tracking-[0.18em] text-[#FF4FA3] mb-2">🚩 The checklist</p>
          <h1 className="text-[38px] md:text-5xl leading-[1.02] mb-4" style={display}>
            Red flags in a relationship: 24 signs to take seriously
          </h1>
          <p className="text-[17px] font-semibold text-[#1A1033]/75 leading-relaxed mb-5">
            A few are obvious. Most aren&apos;t, because they arrive slowly and come with an explanation. Here&apos;s what each one
            looks like in real life, then a 30-second test to count how many you&apos;re living with.
          </p>
          <a href="#test" className={`inline-flex rounded-full bg-[#FF4FA3] text-white px-5 py-2.5 text-[15px] font-black ${stickerStatic}`}>
            Skip to the 30-second test ↓
          </a>
        </div>

        <div className="max-w-2xl mx-auto px-5 py-6 space-y-6">
          {GROUPS.map((g, gi) => (
            <section key={g.title} className={`rounded-[24px] p-5 ${stickerStatic}`} style={{ backgroundColor: CANDY[gi % CANDY.length] }}>
              <h2 className="text-2xl mb-1" style={display}>
                {g.emoji} {g.title}
              </h2>
              <p className="text-[14px] font-bold opacity-70 mb-4">{g.intro}</p>
              <ol className="space-y-3">
                {g.flags.map((f) => {
                  n += 1;
                  return (
                    <li key={f.title} className="rounded-2xl bg-white p-4 border-2 border-[#1A1033]">
                      <h3 className="text-[17px] font-black leading-snug mb-1">
                        {n}. {f.title}
                      </h3>
                      <p className="text-[15px] leading-relaxed text-[#1A1033]/80">{f.body}</p>
                      {f.link && (
                        <Link href={f.link.href} className="mt-2 inline-block text-[14px] font-black underline underline-offset-2">
                          {f.link.label} →
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}

          <section className={`rounded-[24px] bg-white p-5 ${stickerStatic}`}>
            <h2 className="text-2xl mb-3" style={display}>
              💡 One bad day, or a red flag?
            </h2>
            <div className="space-y-3 text-[15px] leading-relaxed text-[#1A1033]/80">
              <p>
                <b className="text-[#1A1033]">Look for the pattern.</b> Everyone has bad days. What matters is the same thing happening again and
                again, and what happens when you say it hurt. Someone who cares can hear &quot;that hurt&quot; without turning it back on you.
              </p>
              <p>
                <b className="text-[#1A1033]">Some flags count on their own.</b> Anything that frightens you, threats, tracking where you are,
                stopping you seeing people, or any kind of violence. You don&apos;t need a score for those.
              </p>
              <p>
                <b className="text-[#1A1033]">Green flags count too.</b> He says sorry without a &quot;but&quot;, he&apos;s the same person in private as
                in public, and your friends like who you are around him.
              </p>
            </div>
          </section>

          <p className="rounded-2xl bg-white/70 p-4 text-[14px] font-semibold leading-relaxed text-[#1A1033]/80 border-2 border-[#1A1033]/20">
            If any of this feels unsafe, you don&apos;t have to handle it alone. In the UK, the National Domestic Abuse Helpline, run by Refuge,
            is free and open 24 hours on <b>0808 2000 247</b>. If you&apos;re in danger right now, call <b>999</b> (or <b>112</b> in the EU).
          </p>
        </div>

        <div id="test" className="scroll-mt-4 bg-[#FAFAF7] border-y-[2.5px] border-[#1A1033]/10">
          <div className="max-w-2xl mx-auto px-5 pt-8">
            <p className="text-[12px] font-black uppercase tracking-[0.18em] text-[#FF4FA3]">✅ Now count yours</p>
          </div>
          <TickPicker slug="is-my-boyfriend-toxic" />
        </div>

        <div className="max-w-2xl mx-auto px-5 py-12">
          <h2 className="text-2xl md:text-3xl leading-tight mb-4" style={display}>
            Questions people ask
          </h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="font-black text-[16px]">{f.q}</h3>
                <p className="text-[15px] text-[#1A1033]/75 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <FaqJsonLd items={FAQ} />
        </div>
      </main>
      <QuizSeoFooter slug="/red-flags-in-a-relationship" />
    </>
  );
}
