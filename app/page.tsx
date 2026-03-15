import MainHero from "@/components/ui/MainHero";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
  description: "Spot relationship red flags, decode mixed signals, analyze texts, and understand dating patterns with free quizzes and clarity tools.",
  openGraph: {
    title: "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
    description: "Spot relationship red flags, decode mixed signals, analyze texts, and understand dating patterns with free quizzes and clarity tools.",
    url: "https://oopscupid.com",
    siteName: "OopsCupid",
    images: [
      {
        url: "https://oopscupid.com/logo.png", // NOTE: Replace this with a 1200x630 social banner URL when you have one
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
    title: "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
    description: "Spot relationship red flags, decode mixed signals, analyze texts, and understand dating patterns with free quizzes and clarity tools.",
    images: ["https://oopscupid.com/logo.png"],
  },
};

const testimonies = [
  "I finally found out why my boyfriend hates me. The quiz opened my eyes to our toxic dynamic.",
  "I learned that my best friend is a narcissist thanks to this free test.",
  "The attachment style quiz explained exactly why I keep attracting emotionally unavailable men.",
  "Spotting relationship red flags is so much easier now. I avoided a toxic trap!",
  "Is he gaslighting me? This site gave me the clarity I needed to leave a manipulative relationship.",
  "I finally understand my anxious attachment style and how to heal.",
  "The toxic friend test validated everything I was feeling. It wasn't just in my head.",
  "Decoding mixed signals from guys used to drive me crazy. Now I see the truth immediately.",
  "Why do I attract toxic people? The insights here completely changed my dating patterns.",
  "I realized I was dealing with a covert narcissist. The signs were all there.",
  "This helped me figure out if my boyfriend is cheating or just pulling away.",
  "Love bombing or genuine interest? The articles here saved me from a huge mistake.",
  "Understanding trauma bonding helped me break free from an awful ex.",
  "Finally, a way to know if your friends are using you. Highly recommend!",
  "The chat analyzer accurately predicted he was breadcrumbing me.",
  "I learned how to deal with an avoidant partner without losing my mind.",
  "Are my friends bad for me? The quiz results were shockingly accurate.",
  "Recognizing manipulation tactics in relationships has never been this clear.",
  "The dating profile analyzer caught red flags I completely missed.",
  "Why do I keep dating the same type? This site finally gave me the answer.",
  "Is my friend toxic or just going through a phase? The checklist was eye-opening.",
  "I discovered the subtle signs of emotional abuse I was ignoring.",
  "I finally figured out why he pulls away when things get serious.",
  "The narcissist test for partners is a must-take if you feel crazy in your relationship.",
  "Decoding his text messages saved me weeks of overthinking.",
  "I finally stopped blaming myself for his silent treatment.",
  "The friendship red flags guide helped me cut off a toxic energy vampire.",
  "Am I the toxic one? The self-reflection quizzes are brutally honest and helpful.",
  "I learned how to set boundaries with manipulative family members and friends.",
  "Is he a narcissist or just selfish? The breakdown gave me exactly what I needed.",
  "I finally understand the fearful avoidant attachment style of my ex.",
  "The signs of gaslighting in a relationship guide literally saved my sanity.",
  "Why does he ignore my texts? The texting analysis gave me the harsh but needed truth.",
  "I found out my best friend is secretly jealous of me. Everything makes sense now.",
  "The quizzes helped me realize I was in a codependent relationship.",
  "Spotting a toxic relationship early on is my new superpower thanks to OopsCupid.",
  "I finally know how to spot a player before the first date.",
  "The insights on why men pull away are the most accurate I've ever read.",
  "Is he a sociopath or just a jerk? The red flag checklist is terrifyingly accurate.",
  "I realized my friendship was one-sided and finally walked away.",
  "Understanding my partner's attachment style saved our marriage.",
  "I learned the difference between settling and having realistic relationship expectations.",
  "The trauma bond test was a tough pill to swallow but exactly what I needed.",
  "I finally figured out why I self-sabotage healthy relationships.",
  "This site is a goldmine for understanding male psychology and texting habits.",
  "I stopped chasing emotionally unavailable men after reading the attraction patterns guide.",
  "The subtle signs of a cheating boyfriend were right in front of me.",
  "I learned how to stop being a people pleaser in my romantic relationships.",
  "Is my relationship worth saving? The clarity tools helped me decide.",
  "I finally escaped a narcissist. The validation from these quizzes gave me the strength."
];

// We double the array so the continuous scroll loops perfectly without jumping
const carouselItems = [...testimonies, ...testimonies];

export default function Home() {
  // Schema.org JSON-LD structured data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://oopscupid.com/#organization",
        "name": "OopsCupid",
        "url": "https://oopscupid.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://oopscupid.com/logo.png"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://oopscupid.com/#website",
        "url": "https://oopscupid.com/",
        "name": "OopsCupid",
        "publisher": {
          "@id": "https://oopscupid.com/#organization"
        }
      },
      {
        "@type": "CollectionPage",
        "@id": "https://oopscupid.com/#webpage",
        "url": "https://oopscupid.com/",
        "name": "OopsCupid | Relationship Red Flags, Texting Analysis & Dating Quizzes",
        "isPartOf": {
          "@id": "https://oopscupid.com/#website"
        },
        "description": "Spot relationship red flags, decode mixed signals, analyze texts, and understand dating patterns with free quizzes and clarity tools."
      }
    ]
  };

  return (
    <main>
      {/* Injecting Schema.org data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Testimonials Animation Keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          display: flex;
          width: max-content;
          animation: scroll-left 120s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}} />

      <MainHero />

      {/* SECTION 3 — WHAT IS OOPSCUPID (Cream Background) */}
      <section className="bg-[#FFF1D0] py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-12 text-center md:text-left">
            Free Relationship Clarity Tools & Quizzes
          </h2>
          <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start">
            <div className="flex-1">
              <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#086788]/80 mb-10 max-w-2xl">
                OopsCupid is a free relationship analysis platform for women 
                who want real answers — not vague advice. Use our quizzes to 
                spot relationship red flags, decode mixed signals, and understand 
                toxic patterns. No sign-up required to start.
              </p>
              <Link href="/quizzes" className="inline-block bg-[#DD1C1A] text-white rounded-full px-8 py-4 text-[18px] font-bold hover:bg-[#b81715] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                Take a Free Quiz →
              </Link>
            </div>
            <div className="flex-1 w-full">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <span className="text-[18px] font-bold text-[#086788]">Free quizzes for red flags, friendships, and dating patterns</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <span className="text-[18px] font-bold text-[#086788]">AI-powered chat and profile analyzers</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <span className="text-[18px] font-bold text-[#086788]">Psychology-backed guides written for real situations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURED TOOLS (White Background) */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-12 text-center">
            Relationship Analysis Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="tool" title="Chat Analyzer (Coming Soon) — Decode What He Actually Means" description="Paste any conversation and get a psychology-backed breakdown of his texting behavior, interest level, and red flags — in plain English." href="/tools/chat-analyzer" buttonText="Try Chat Analyzer" />
            <Card variant="tool" title="Dating Profile Analyzer (Coming Soon) — See Red Flags Before the First Date" description="Share his profile and get a clear read on what his bio, word choices, and photos are really signaling before you swipe right." href="/tools/profile-analyzer" buttonText="Try Profile Analyzer" />
          </div>
        </div>
      </section>

      {/* SECTION 5 — QUIZZES (Soft Cream Background) */}
      <section className="bg-[#FFF1D0]/60 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
              Free Relationship Quizzes
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#086788]/80">
              Answer a few questions and get a real, honest read on your situation. No sign-up. No fluff.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="quiz" title="What Is My Attachment Style? Free Test" href="/attachment-style-quiz" accentColor="bg-[#F0C808]/30" />
            <Card variant="quiz" title="Is My Friend Toxic? Free Friendship Quiz" href="/toxic-friend-test" accentColor="bg-[#06AED5]/20" />
            <Card variant="quiz" title="Why Do I Keep Attracting the Same Type?" href="/attraction-patterns" accentColor="bg-[#DD1C1A]/20" />
          </div>
          
          <div className="text-center">
            <Link href="/quizzes" className="text-[18px] text-[#06AED5] hover:text-[#086788] hover:underline underline-offset-4 font-bold transition-colors">
              See all free quizzes →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROOF (White Background) */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
              Why Women Trust OopsCupid
            </h2>
            <p className="text-[18px] md:text-[20px] font-medium leading-relaxed text-[#086788]/80">
              OopsCupid is for women who are tired of losing time to confusion. When someone is inconsistent, unclear, or emotionally difficult to read, it becomes easy to overthink, self-correct, and stay longer than you should. OopsCupid helps you step back, see the pattern with more honesty, and make decisions from clarity instead of doubt.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="proof" title="Stop Doubting Your Read" description="Sometimes you already know something feels off. You just need help trusting what you are seeing." />
            <Card variant="proof" title="See the Pattern Earlier" description="The hardest part is not always the red flag. It is how easy it is to explain it away. OopsCupid helps you notice patterns before they become attachments." />
            <Card variant="proof" title="Get Clear Without the Spiral" description="Not every situation needs more analysis. Sometimes you need a calmer, clearer view of what is right in front of you." />
          </div>
        </div>
      </section>

      {/* NEW SECTION — TESTIMONIALS (Animated Carousel) */}
      <section className="bg-[#880d1e] py-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#cbeef3] mb-4">
              Real Women, Real Clarity
            </h2>
            <p className="text-[18px] md:text-[20px] font-medium text-[#f49cbb]">
              Join thousands of women who finally found their answers.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Fading Edges for the Carousel */}
          <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-[#880d1e] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-[#880d1e] to-transparent z-10 pointer-events-none"></div>

          <div className="animate-scroll-left gap-6 px-6">
            {carouselItems.map((testimony, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 w-80 md:w-96 rounded-2xl p-6 shadow-xl border-b-4 ${
                  index % 2 === 0 
                    ? "bg-[#cbeef3] border-[#f26a8d]" 
                    : "bg-[#f49cbb] border-[#dd2d4a]"
                }`}
              >
                <div className="flex gap-1 mb-3">
                  {/* 5 Stars using the requested palette #dd2d4a */}
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#dd2d4a] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#880d1e] font-semibold text-[16px] md:text-[18px] leading-snug">
                  "{testimony}"
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f26a8d] flex items-center justify-center text-white font-bold text-sm">
                    {String.fromCharCode(65 + (index % 26))}
                  </div>
                  <span className="text-[#880d1e] font-bold text-sm opacity-80">— Anonymous User</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — ARTICLES (Soft Cream Background) */}
      <section className="bg-[#FFF1D0]/60 py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#086788] mb-6">
              Relationship Red Flags & Guides
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#086788]/80">
              Psychology-backed articles written for real, messy, confusing situations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="article" tag="Red Flags" title="Is He Gaslighting Me? (Coming Soon) 9 Signs You're Not Imagining It" href="/is-he-gaslighting-me" />
            <Card variant="article" tag="Attachment Styles" title="The 4 Adult Attachment Styles Explained" href="/understanding-attachment-styles" />
            <Card variant="article" tag="Toxic Friendships" title="Signs Your Best Friend Is Secretly Jealous of You" href="/signs-of-a-toxic-friend" />
          </div>

          <div className="text-center">
            <Link href="/articles" className="text-[18px] text-[#06AED5] hover:text-[#086788] hover:underline underline-offset-4 font-bold transition-colors">
              Read all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — NEWSLETTER (Deep Teal Background) */}
      <section className="bg-[#086788] py-24 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-[36px] md:text-[46px] font-extrabold mb-6 leading-tight text-white">
                Get Relationship Clarity in Your Inbox
              </h2>
              <p className="text-[18px] md:text-[20px] font-medium text-[#FFF1D0] leading-relaxed max-w-xl mx-auto lg:mx-0">
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
                  className="w-full bg-white text-[#086788] px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-[#06AED5]/50 text-[18px] font-medium placeholder:text-[#086788]/40"
                  required
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#F0C808] text-[#086788] px-8 py-4 rounded-full font-extrabold text-[18px] hover:bg-[#e5be00] transition-colors whitespace-nowrap shadow-lg"
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}