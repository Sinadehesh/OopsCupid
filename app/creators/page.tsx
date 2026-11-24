import type { Metadata } from "next";
import Link from "next/link";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import CreatorApply from "@/components/creators/CreatorApply";
import { stickerStatic, sticker, display } from "@/lib/ui/sticker";
import { COMMISSION, VIA_DAYS } from "@/lib/creators";

const PAGE_URL = "https://www.oopscupid.com/creators";
const PCT = `${Math.round(COMMISSION * 100)}%`;

export const metadata: Metadata = {
  alternates: { canonical: PAGE_URL },
  title: `Creators: Earn ${PCT} Sharing Relationship Quizzes | OopsCupid`,
  description: `Share OopsCupid's free relationship quizzes with your own link and earn ${PCT} of every purchase your followers make within ${VIA_DAYS} days. Paid monthly, no minimum follower count.`,
};

const euro = (cents: number) => `€${(cents / 100).toFixed(2)}`;
const PRICES: [string, number][] = [
  ["A personal quick read", 299],
  ["A guide", 199],
  ["The full report, which unlocks every guide", 999],
  ["Report and workbooks bundle", 4900],
];

const FAQ = [
  {
    q: "Do I need a lot of followers?",
    a: "No. There's no minimum. Small accounts often have the most engaged followers, and a quiz people comment their score on travels on its own.",
  },
  {
    q: "Which sales are mine?",
    a: `Any purchase made within ${VIA_DAYS} days of someone tapping your link, on the same phone or computer. If they later tap another creator's link, the later one counts.`,
  },
  {
    q: "When and how do I get paid?",
    a: "Monthly, by PayPal or bank transfer, for the month before. We wait for the 7-day refund window to pass, so a refunded sale is never paid out.",
  },
  {
    q: "Do my followers have to pay?",
    a: "No. Every quiz and every result is free. Buying a deeper read is optional, and that's what earns you commission.",
  },
  {
    q: "How do I see my sales?",
    a: "You get a private page that lists your sales and commission by month, straight from our payment provider.",
  },
];

/** The offer for creators, and the form that asks for a link. */
export default function CreatorsPage() {
  return (
    <main className="bg-[#FFF4FA] text-[#1A1033] overflow-x-hidden">
      <div className="max-w-2xl mx-auto px-5 pt-10 pb-16">
        <p className="text-[12px] font-black uppercase tracking-[0.18em] text-[#FF4FA3] mb-2">🤝 For creators</p>
        <h1 className="text-[38px] md:text-5xl leading-[1.02] mb-4" style={display}>
          Earn {PCT} when your followers buy through your OopsCupid link
        </h1>
        <p className="text-[17px] font-semibold text-[#1A1033]/75 leading-relaxed mb-6">
          OopsCupid makes free relationship quizzes people already search for: is he a pick-me boy, is my boyfriend dumb,
          what&apos;s my attachment style. Share any of them with your own link, and {PCT} of anything bought through it is yours.
        </p>
        <div className="flex flex-wrap gap-3 mb-12">
          <a href="#apply" className={`inline-flex items-center rounded-full bg-[#FF4FA3] text-white px-5 py-3 text-[16px] font-black ${sticker}`}>
            Get your link
          </a>
          <Link href="/games" className={`inline-flex items-center rounded-full bg-white px-5 py-3 text-[16px] font-black ${sticker}`}>
            See the quizzes
          </Link>
        </div>

        <section className={`rounded-[24px] bg-white p-5 mb-6 ${stickerStatic}`}>
          <h2 className="text-2xl mb-4" style={display}>How it works</h2>
          <ol className="space-y-4 text-[16px] leading-relaxed">
            <li>
              <b>1. Ask for your link below.</b> It works on any page: your name goes on the end, like{" "}
              <code className="rounded bg-[#FFF4FA] px-1.5 py-0.5 text-[14px]">oopscupid.com/?via=yourname</code>.
            </li>
            <li>
              <b>2. Post a quiz.</b> Link in bio, a Story link sticker or a pinned comment. Every result has a &quot;Post to my
              story&quot; card, so your followers pass it on too.
            </li>
            <li>
              <b>3. Get paid monthly.</b> {PCT} of every purchase made within {VIA_DAYS} days of a tap on your link, with a
              private page showing your sales.
            </li>
          </ol>
        </section>

        <section className={`rounded-[24px] bg-[#FFE68A] p-5 mb-6 ${stickerStatic}`}>
          <h2 className="text-2xl mb-4" style={display}>What you earn per sale</h2>
          <ul className="space-y-2 text-[16px] font-semibold">
            {PRICES.map(([name, cents]) => (
              <li key={name} className="flex items-baseline justify-between gap-3 border-b-2 border-[#1A1033]/10 pb-2">
                <span>
                  {name} <span className="opacity-60">({euro(cents)})</span>
                </span>
                <b className="shrink-0">you get {euro(Math.round(cents * COMMISSION))}</b>
              </li>
            ))}
          </ul>
        </section>

        <section className={`rounded-[24px] bg-white p-5 mb-10 ${stickerStatic}`}>
          <h2 className="text-2xl mb-4" style={display}>Posts that work</h2>
          <ul className="space-y-3 text-[16px] leading-relaxed">
            <li><b>Ask for the score.</b> &quot;Comment what you got&quot; turns a quiz into a comment section.</li>
            <li><b>Go first.</b> Post your own result card, then the link.</li>
            <li>
              <b>Send the friend quiz.</b> Make your own{" "}
              <Link href="/how-well-do-you-know-me" className="underline font-black">How well do you know me?</Link> and post it:
              everyone who plays can make their own.
            </li>
          </ul>
        </section>

        <section id="apply" className={`scroll-mt-24 rounded-[24px] bg-white p-5 mb-10 ${stickerStatic}`}>
          <h2 className="text-2xl mb-4" style={display}>Get your link</h2>
          <CreatorApply />
        </section>

        <h2 className="text-2xl md:text-3xl leading-tight mb-4" style={display}>Questions creators ask</h2>
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
  );
}
