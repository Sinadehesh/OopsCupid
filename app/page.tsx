import HomeHero, { StickyTestBar } from "@/components/home/HomeHero";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allQuizzes } from "@/lib/quizzes/registry";
import { LIVE_PROGRAMS } from "@/lib/programs/registry";
import MerchCard from "@/components/shop/MerchCard";

export const metadata: Metadata = {
  title: "Free Attachment Style Test & Relationship Quizzes: No Email",
  description: "Find your attachment style, who you attract, and whether his behaviour is a red flag. 15 free research-informed tests, no sign-up, no email, results on screen.",
  openGraph: {
    title: "Free Attachment Style Test & Relationship Quizzes: No Email",
    description: "Find your attachment style, who you attract, and whether his behaviour is a red flag. 15 free research-informed tests, no sign-up, no email, results on screen.",
    url: "https://www.oopscupid.com",
    siteName: "OopsCupid",
    images: [
      {
        url: "https://www.oopscupid.com/logo.png",
        width: 1200,
        height: 630,
        alt: "OopsCupid - Relationship Clarity Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Attachment Style Test & Relationship Quizzes: No Email",
    description: "Find your attachment style, who you attract, and whether his behaviour is a red flag. 15 free research-informed tests, no sign-up, no email, results on screen.",
    images: ["https://www.oopscupid.com/logo.png"],
  },
};

/**
 * This carousel used to hold ten invented testimonials, shown with
 * five-star ratings and attributed to "Anonymous User". The site has
 * never had a customer, so none of them could be real, and fabricated
 * reviews are illegal under the EU Unfair Commercial Practices Directive
 * and the FTC's 2024 Fake Reviews Rule, quite apart from what they do to
 * trust when someone notices.
 *
 * Replaced with statements about the instruments that are checkable
 * against the code. Put real quotes here only with permission, and only
 * once they exist.
 */
const proofPoints: { stat: string; label: string; detail: string }[] = [
  {
    stat: "92",
    label: "questions in the attachment test",
    detail: "Built on the ECR-RS, DERS-16 and Rosenberg scales rather than invented for a quiz.",
  },
  {
    stat: "5",
    label: "domains scored separately",
    detail: "General, romantic, work and both parental axes, because attachment rarely behaves the same everywhere.",
  },
  {
    stat: "0",
    label: "emails required",
    detail: "Every result appears on screen. Give an address only if you want a copy sent to you.",
  },
  {
    stat: "15",
    label: "assessments, all free to take",
    detail: "Scoring, bands and the free report cost nothing. Only the full written analysis is paid.",
  },
  {
    stat: "48h",
    label: "until your answers are deleted",
    detail: "An automated job clears the answers you gave from our servers. We keep no record of them.",
  },
  {
    stat: "7-day",
    label: "refund, no questions asked",
    detail: "If a paid report doesn't describe your situation, email us within a week.",
  },
];

const carouselItems = [...proofPoints, ...proofPoints];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.oopscupid.com/#organization",
        "name": "OopsCupid",
        "url": "https://www.oopscupid.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.oopscupid.com/logo.png"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.oopscupid.com/#website",
        "url": "https://www.oopscupid.com/",
        "name": "OopsCupid",
        "publisher": {
          "@id": "https://www.oopscupid.com/#organization"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://www.oopscupid.com/#quizlist",
        "name": "Free Relationship Quizzes & Tests",
        "itemListElement": allQuizzes.map((q, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": q.seoTitle,
          "url": `https://www.oopscupid.com${q.slug}`,
        })),
      },
      {
        "@type": "CollectionPage",
        "@id": "https://www.oopscupid.com/#webpage",
        "url": "https://www.oopscupid.com/",
        "name": "Free Attachment Style Test & Relationship Quizzes: No Email",
        "isPartOf": {
          "@id": "https://www.oopscupid.com/#website"
        },
        "description": "Find your attachment style, who you attract, and whether his behaviour is a red flag. 15 free research-informed tests, no sign-up, no email, results on screen."
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      

      <HomeHero />
      <div className="bg-[#FFF4FA] px-4 pb-8">
        <div className="max-w-3xl mx-auto">
          <MerchCard from="home" className="!mb-0" title="The OopsCupid shop is open." line="Our cupid, on tees and hoodies. Printed and posted for you." />
        </div>
      </div>

      {/* NEW SECTION 2: THE PAIN (Running from Hell) */}
      <section className="bg-white py-12 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-4xl">
          <h2 className="text-[36px] md:text-[46px] font-extrabold text-[#FF4FA3] mb-8 text-center leading-tight">
            Are You Tired Of Feeling Crazy?
          </h2>
          <p className="text-[20px] md:text-[24px] font-medium text-gray-700 mb-10 text-center">
            You know something is wrong. But you keep making excuses for them.
          </p>
          
          <div className="bg-gray-50 p-8 md:p-12 rounded-3xl mb-12">
            <ul className="space-y-6 text-[18px] md:text-[22px] font-medium text-gray-800">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] font-bold">✗</span> 
                <span>He texts you all day, then goes totally cold.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] font-bold">✗</span> 
                <span>Your friends say "he is just busy," but your gut says he is lying.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] font-bold">✗</span> 
                <span>You type a text, delete it, type it again, and stress over hitting send.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#FF4FA3]/15 text-[#FF4FA3] font-bold">✗</span> 
                <span>You give and give, but get nothing back.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border-l-8 border-[#FF4FA3] shadow-[0_6px_24px_rgba(58,85,108,0.08)]">
            <p className="text-[20px] md:text-[22px] font-bold text-[#1A1033] leading-relaxed">
              <span className="text-[#FF4FA3] font-extrabold uppercase tracking-wider block mb-2">The Worst Part?</span> 
              You are wasting your best years waiting for people to treat you right. The longer you wait, the worse it hurts. You need to know the truth today.
            </p>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3: THE SOLUTION (Including Quizzes functionally) */}
      <section className="bg-[#1A1033] py-12 md:py-32 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-[36px] md:text-[46px] font-extrabold mb-6 leading-tight">
              Stop Overthinking. Let Us Do The Work.
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-white/75">
              You do not need to read a long book. You do not need to spend months guessing. We do the hard work for you. Get instant clarity in 3 simple steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto text-center border-b border-white/10 pb-16">
            <div>
              <div className="text-5xl mb-4">1️⃣</div>
              <h3 className="text-2xl font-bold mb-2">Answer Questions</h3>
              <p className="text-white/75 text-lg">It takes just 3 minutes.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">2️⃣</div>
              <h3 className="text-2xl font-bold mb-2">We Scan The Data</h3>
              <p className="text-white/75 text-lg">Our smart tool finds the hidden mind games.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">3️⃣</div>
              <h3 className="text-2xl font-bold mb-2">Get Instant Answers</h3>
              <p className="text-white/75 text-lg">Cold, hard facts and exactly what to do next.</p>
            </div>
          </div>
          
          <h3 className="text-center text-2xl font-bold mb-10 text-[#FFE68A]">Start Your Free Diagnostic Audit Below:</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="quiz" title="What Is My Attachment Style? Free Test" href="/attachment-style-quiz" accentColor="bg-[#FFE68A]/30" />
            <Card variant="quiz" title="Is My Friend Toxic? Free Friendship Quiz" href="/toxic-friend-test" accentColor="bg-[#9B7BFF]/20" />
            <Card variant="quiz" title="Why Do I Keep Attracting the Same Type?" href="/attraction-patterns" accentColor="bg-[#DD1C1A]/20" />
          </div>
          
          <div className="text-center">
            <Link href="/quizzes" className="inline-block bg-[#FF4FA3] text-white rounded-full px-10 py-5 text-[20px] font-extrabold hover:bg-[#FF4FA3] hover:shadow-[0_8px_22px_rgba(224,120,80,0.4)] hover:-translate-y-1 transition-all">
              See All Free Tests →
            </Link>
          </div>
        </div>
      </section>

      {/* GUIDED PROGRAMMES. This used to tease an "Ultimate Clarity
          Bundle" that was really the premium report under another name.
          The programmes are the thing that changes the pattern, and week 1
          of each is free, so the homepage sends people straight into one. */}
      <section className="bg-white py-12 md:py-28">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-6xl">
          <div className="max-w-3xl mb-12">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#1A1033] mb-5 leading-tight">
              Knowing your pattern is step one. Changing it takes practice.
            </h2>
            <p className="text-[18px] md:text-[20px] font-medium text-gray-700 leading-relaxed">
              Four-week guided programmes drawing on CBT, schema therapy and attachment research. Ten to fifteen minutes a day.
              Everything you write is saved, and at the end of each week you get a written review of what you actually wrote.
              <strong className="text-[#FF4FA3]"> Week 1 of every programme is free.</strong>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {LIVE_PROGRAMS.map((p) => (
              <Link
                key={p.slug}
                href={`/workbook/${p.slug}/week-1/day-1`}
                className="group flex flex-col rounded-3xl border-2 bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: p.accent }}
              >
                <h3 className="text-2xl font-extrabold text-[#1A1033] mb-2 leading-snug">{p.title}</h3>
                <p className="text-base font-bold mb-4" style={{ color: p.accent }}>{p.subtitle}</p>
                <p className="text-gray-600 font-medium leading-relaxed mb-6 flex-1">{p.whoFor}</p>
                <span className="inline-flex items-center gap-2 font-extrabold" style={{ color: p.accent }}>
                  Start week 1, free <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-gray-600 font-medium">
            Want all four weeks? €49 opens every programme, once.{" "}
            <Link href="/workbook" className="font-extrabold text-[#FF4FA3] hover:underline">See all programmes</Link>
          </p>
        </div>
      </section>

      {/* COACHING, 1:1 OFFER */}
      <section className="bg-[#1A1033] py-12 md:py-28 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-3/5">
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#FFE68A]/20 text-[#FFE68A] font-extrabold text-xs tracking-widest uppercase mb-6">
                New: 1:1 Private Coaching
              </span>
              <h2 className="text-[32px] md:text-[42px] font-extrabold mb-6 leading-tight">
                A Quiz Tells You What&apos;s Wrong.
                <br />
                <span className="text-[#FFE68A]">A Coach Tells You What To Do Tonight.</span>
              </h2>
              <p className="text-[18px] md:text-[20px] font-medium text-white/80 leading-relaxed mb-8">
                Book a private 60-minute clarity session. We go through your results together and
                you leave with a written 14-day plan, exact scripts, boundaries, and the decision
                point ahead. Video or voice-only. Fully private.
              </p>
              <Link
                href="/coaching"
                className="inline-block bg-[#FF4FA3] text-white rounded-full px-10 py-5 text-[20px] font-extrabold hover:bg-[#FF4FA3] hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(224,120,80,0.4)] transition-all"
              >
                See Coaching Options →
              </Link>
            </div>
            <div className="lg:w-2/5 w-full">
              <div className="bg-white/5 border border-white/15 rounded-3xl p-8 backdrop-blur-sm">
                <ul className="space-y-5 text-[17px] font-medium text-white/90">
                  <li className="flex items-start gap-3"><span className="text-[#FFE68A] font-extrabold">✓</span> Your exact quiz results, decoded live</li>
                  <li className="flex items-start gap-3"><span className="text-[#FFE68A] font-extrabold">✓</span> A written 14-day action plan to keep</li>
                  <li className="flex items-start gap-3"><span className="text-[#FFE68A] font-extrabold">✓</span> Word-for-word scripts for your situation</li>
                  <li className="flex items-start gap-3"><span className="text-[#FFE68A] font-extrabold">✓</span> Not useful in 15 minutes? Full refund.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 5: GUARANTEE & URGENCY */}
      <section className="bg-[#FFF4FA]/80 py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-4xl text-center">
          <h2 className="text-[36px] md:text-[46px] font-extrabold text-[#1A1033] mb-10">Try It With Zero Risk.</h2>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl mb-12 border-t-8 border-[#9B7BFF]">
             <div className="text-6xl mb-6">🛡️</div>
             <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1033] mb-4">The "Mind-Reader" Promise</h3>
             <p className="text-[18px] md:text-[20px] font-medium text-gray-700 leading-relaxed mb-8">
               If our report does not feel 100% true to your life, just email us within 7 days. We will give you all your money back. No questions asked.
             </p>
             
             <div className="bg-[#FFF4FA]/40 p-6 md:p-8 rounded-2xl border border-[#FF4FA3]/50 mt-8 text-left flex flex-col sm:flex-row gap-6 items-start">
               <span className="text-4xl">🔒</span>
               <div>
                 <h4 className="font-extrabold text-[#1A1033] text-xl mb-2">Your Secrets Are Safe</h4>
                 <p className="text-gray-700 text-[16px] leading-relaxed font-medium">Because these tests are highly personal, the answers you give are erased from our servers within 48 hours; we keep only your email address and which quiz you took. Your results stay in your own browser so you can reopen them.</p>
               </div>
             </div>
          </div>

          <Link href="/quizzes" className="inline-block bg-[#FF4FA3] text-white rounded-full px-12 py-5 text-[22px] font-extrabold hover:bg-[#FF4FA3] hover:shadow-[0_10px_25px_rgba(224,120,80,0.35)] hover:-translate-y-1 transition-all">
            Start My Free 3-Minute Test →
          </Link>
        </div>
      </section>

      {/* QUIZ DIRECTORY, every funnel, crawlable from the homepage */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-[32px] md:text-[42px] font-bold text-[#1A1033] mb-5">
              Every Free Relationship Test We Offer
            </h2>
            <p className="text-[18px] md:text-[20px] font-medium leading-relaxed text-[#5E7183]">
              Research-informed quizzes with instant scored results. Pick the question keeping you up at night.
            </p>
          </div>
          {/* The short one goes first and across the full width. Every other
              card here asks for eight minutes or more, and somebody who is
              not sure they want to know anything yet will bounce off all of
              them. This is the one that costs her nothing to start. */}
          <Link
            href="/things-he-says"
            className="group flex flex-col sm:flex-row sm:items-center gap-5 bg-[#0E1621] text-white rounded-2xl p-7 md:p-8 mb-4 transition-transform hover:-translate-y-0.5"
          >
            <div className="flex-1">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FF4FA3] mb-2 block">
                Start here · 40 seconds
              </span>
              <h3 className="text-[22px] md:text-[26px] font-extrabold leading-snug mb-2">
                Which of these has he said to you?
              </h3>
              <p className="text-[15px] text-white/60 font-medium leading-relaxed">
                Sixteen ordinary sentences. Tap the ones you recognise, and find
                out what each one is doing in the conversation. Nothing to fill in.
              </p>
            </div>
            <span className="shrink-0 inline-flex items-center gap-2 bg-white text-slate-900 font-extrabold px-6 py-3.5 rounded-xl">
              Open <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allQuizzes.map((q) => (
              <Link
                key={q.slug}
                href={q.slug}
                className="group flex flex-col bg-[#FDFBF7] hover:bg-white ring-1 ring-black/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(58,85,108,0.10)]"
              >
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#FF4FA3] mb-2">
                  {q.hub === "him" ? "His Behavior" : q.hub === "me" ? "Your Patterns" : "Friendships"}
                  {q.minutes ? ` · ${q.minutes} min` : ""}
                </span>
                <h3 className="text-[19px] font-extrabold text-[#1A1033] leading-snug mb-2 group-hover:text-[#FF4FA3] transition-colors">
                  {q.title}
                </h3>
                <p className="text-[15px] text-[#5E7183] font-medium leading-relaxed line-clamp-2">{q.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PRESERVED SECTION: CONTINUOUS TESTIMONIALS CAROUSEL */}
      <section className="bg-[#1A1033] py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[44px] font-bold text-white mb-4">
              What Makes These Different
            </h2>
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-[#1A1033] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-[#1A1033] to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-track gap-6 px-6">
            {carouselItems.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-80 md:w-96 rounded-2xl p-6 glass-dark shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                <p className="text-[#FFE68A] font-black text-4xl leading-none mb-2">{item.stat}</p>
                <p className="text-white font-bold text-[17px] leading-snug mb-3">{item.label}</p>
                <p className="text-white/60 font-medium text-[15px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESERVED SECTION: ARTICLES */}
      <section className="bg-[#FFF4FA]/60 py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#1A1033] mb-6">
              Relationship Red Flags & Guides
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#1A1033]/80">
              Psychology-backed articles written for real, messy, confusing situations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="article" tag="Red Flags" title="Is He Gaslighting Me? (Coming Soon) 9 Signs You're Not Imagining It" href="/is-he-gaslighting-me" />
            <Card variant="article" tag="Attachment Styles" title="The 4 Adult Attachment Styles Explained" href="/understanding-attachment-styles" />
            <Card variant="article" tag="Toxic Friendships" title="Signs Your Best Friend Is Secretly Jealous of You" href="/signs-of-a-toxic-friend" />
          </div>
          <div className="text-center">
            <Link href="/articles" className="text-[18px] text-[#9B7BFF] hover:text-[#1A1033] hover:underline underline-offset-4 font-bold transition-colors">
              Read all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* PRESERVED SECTION: NEWSLETTER */}
      <section className="bg-[#1A1033] py-24 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-[36px] md:text-[46px] font-extrabold mb-6 leading-tight text-white">
                Get Relationship Clarity in Your Inbox
              </h2>
              <p className="text-[18px] md:text-[20px] font-medium text-[#FFF4FA] leading-relaxed max-w-xl mx-auto lg:mx-0">
                Free quizzes, red flag breakdowns, texting psychology, 
                and pattern analysis delivered weekly. No spam. Unsubscribe any time.
              </p>
            </div>
            <div className="lg:w-1/2 w-full max-w-lg mx-auto lg:max-w-none lg:mx-0">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="w-full bg-white text-[#1A1033] px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-[#9B7BFF]/50 text-[18px] font-medium placeholder:text-[#1A1033]/40"
                  required
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#FF4FA3] text-white px-8 py-4 rounded-full font-extrabold text-[18px] hover:bg-[#FF4FA3] transition-colors whitespace-nowrap shadow-lg"
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <StickyTestBar />
    </main>
  );
}
