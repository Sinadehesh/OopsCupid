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
        url: "https://oopscupid.com/logo.png",
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
  "I realized I was dealing with a covert narcissist. The signs were all there."
];

const carouselItems = [...testimonies, ...testimonies];

export default function Home() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      

      <MainHero />

      {/* NEW SECTION 2 — THE PAIN (Running from Hell) */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-4xl">
          <h2 className="text-[36px] md:text-[46px] font-extrabold text-[#E07850] mb-8 text-center leading-tight">
            Are You Tired Of Feeling Crazy?
          </h2>
          <p className="text-[20px] md:text-[24px] font-medium text-gray-700 mb-10 text-center">
            You know something is wrong. But you keep making excuses for them.
          </p>
          
          <div className="bg-gray-50 p-8 md:p-12 rounded-3xl mb-12">
            <ul className="space-y-6 text-[18px] md:text-[22px] font-medium text-gray-800">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EC8A66]/15 text-[#E07850] font-bold">✗</span> 
                <span>He texts you all day, then goes totally cold.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EC8A66]/15 text-[#E07850] font-bold">✗</span> 
                <span>Your friends say "he is just busy," but your gut says he is lying.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EC8A66]/15 text-[#E07850] font-bold">✗</span> 
                <span>You type a text, delete it, type it again, and stress over hitting send.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#EC8A66]/15 text-[#E07850] font-bold">✗</span> 
                <span>You give and give, but get nothing back.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-2xl border-l-8 border-[#EC8A66] shadow-[0_6px_24px_rgba(58,85,108,0.08)]">
            <p className="text-[20px] md:text-[22px] font-bold text-[#3A556C] leading-relaxed">
              <span className="text-[#E07850] font-extrabold uppercase tracking-wider block mb-2">The Worst Part?</span> 
              You are wasting your best years waiting for people to treat you right. The longer you wait, the worse it hurts. You need to know the truth today.
            </p>
          </div>
        </div>
      </section>

      {/* NEW SECTION 3 — THE SOLUTION (Including Quizzes functionally) */}
      <section className="bg-[#3D5A6C] py-20 md:py-32 text-white">
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
          
          <h3 className="text-center text-2xl font-bold mb-10 text-[#F5DD90]">Start Your Free Diagnostic Audit Below:</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="quiz" title="What Is My Attachment Style? Free Test" href="/attachment-style-quiz" accentColor="bg-[#F0C808]/30" />
            <Card variant="quiz" title="Is My Friend Toxic? Free Friendship Quiz" href="/toxic-friend-test" accentColor="bg-[#06AED5]/20" />
            <Card variant="quiz" title="Why Do I Keep Attracting the Same Type?" href="/attraction-patterns" accentColor="bg-[#DD1C1A]/20" />
          </div>
          
          <div className="text-center">
            <Link href="/quizzes" className="inline-block bg-[#EC8A66] text-white rounded-full px-10 py-5 text-[20px] font-extrabold hover:bg-[#E07850] hover:shadow-[0_8px_22px_rgba(224,120,80,0.4)] hover:-translate-y-1 transition-all">
              See All Free Tests →
            </Link>
          </div>
        </div>
      </section>

      {/* NEW SECTION 4 — GRAND SLAM OFFER TEASE */}
      <section className="bg-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#3A556C] mb-6 leading-tight">
                Don't Know What To Do Next? Get The Playbook.
              </h2>
              <p className="text-[18px] md:text-[22px] font-medium text-gray-700 mb-10 leading-relaxed">
                After your free test, you can unlock our <strong className="text-[#E07850]">Ultimate Clarity Bundle</strong>. We will tell you exactly how to fix the problem without the stress. Here is what you get instantly:
              </p>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <div>
                    <strong className="text-[20px] text-[#3A556C] block mb-1">The Harsh Truth</strong>
                    <span className="text-gray-600 text-lg">We name the exact mind games they are using on you right now. No holding back.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <div>
                    <strong className="text-[20px] text-[#3A556C] block mb-1">The Step-by-Step Plan</strong>
                    <span className="text-gray-600 text-lg">A simple, easy list of what to do next. Say goodbye to guessing.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-[#06AED5]/20 text-[#06AED5] font-extrabold">✓</span>
                  <div>
                    <strong className="text-[20px] text-[#3A556C] block mb-1">Copy-Paste Texts</strong>
                    <span className="text-gray-600 text-lg">Do not know what to say? Copy our texts. They are polite, strong, and impossible to argue with.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <div className="bg-gradient-to-tr from-[#3D5A6C] to-[#5A7492] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden transform md:rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#F5DD90] text-[#5A4A1E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Premium Unlock</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">The Ultimate Clarity Bundle</h3>
                <p className="text-xl mb-8 opacity-90 font-medium">Available immediately after your free diagnostic audit.</p>
                
                <div className="space-y-4">
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 flex items-center gap-4">
                    <span className="text-2xl">📄</span> <span className="text-lg font-bold">The Harsh Truth Analysis</span>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 flex items-center gap-4">
                    <span className="text-2xl">🗺️</span> <span className="text-lg font-bold">The Tactical Playbook</span>
                  </div>
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 flex items-center gap-4">
                    <span className="text-2xl">💬</span> <span className="text-lg font-bold">2x "Lethal" Copy-Paste Scripts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COACHING — 1:1 OFFER */}
      <section className="bg-[#32485A] py-20 md:py-28 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-3/5">
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#F0C808]/20 text-[#F5DD90] font-extrabold text-xs tracking-widest uppercase mb-6">
                New: 1:1 Private Coaching
              </span>
              <h2 className="text-[32px] md:text-[42px] font-extrabold mb-6 leading-tight">
                A Quiz Tells You What&apos;s Wrong.
                <br />
                <span className="text-[#F5DD90]">A Coach Tells You What To Do Tonight.</span>
              </h2>
              <p className="text-[18px] md:text-[20px] font-medium text-white/80 leading-relaxed mb-8">
                Book a private 60-minute clarity session. We go through your results together and
                you leave with a written 14-day plan — exact scripts, boundaries, and the decision
                point ahead. Video or voice-only. Fully private.
              </p>
              <Link
                href="/coaching"
                className="inline-block bg-[#EC8A66] text-white rounded-full px-10 py-5 text-[20px] font-extrabold hover:bg-[#E07850] hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(224,120,80,0.4)] transition-all"
              >
                See Coaching Options →
              </Link>
            </div>
            <div className="lg:w-2/5 w-full">
              <div className="bg-white/5 border border-white/15 rounded-3xl p-8 backdrop-blur-sm">
                <ul className="space-y-5 text-[17px] font-medium text-white/90">
                  <li className="flex items-start gap-3"><span className="text-[#F5DD90] font-extrabold">✓</span> Your exact quiz results, decoded live</li>
                  <li className="flex items-start gap-3"><span className="text-[#F5DD90] font-extrabold">✓</span> A written 14-day action plan to keep</li>
                  <li className="flex items-start gap-3"><span className="text-[#F5DD90] font-extrabold">✓</span> Word-for-word scripts for your situation</li>
                  <li className="flex items-start gap-3"><span className="text-[#F5DD90] font-extrabold">✓</span> Not useful in 15 minutes? Full refund.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION 5 — GUARANTEE & URGENCY */}
      <section className="bg-[#EFEBE1]/80 py-24">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 max-w-4xl text-center">
          <h2 className="text-[36px] md:text-[46px] font-extrabold text-[#3A556C] mb-10">Try It With Zero Risk.</h2>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl mb-12 border-t-8 border-[#06AED5]">
             <div className="text-6xl mb-6">🛡️</div>
             <h3 className="text-2xl md:text-3xl font-extrabold text-[#3A556C] mb-4">The "Mind-Reader" Promise</h3>
             <p className="text-[18px] md:text-[20px] font-medium text-gray-700 leading-relaxed mb-8">
               If our report does not feel 100% true to your life, just email us within 7 days. We will give you all your money back. No questions asked.
             </p>
             
             <div className="bg-[#EFEBE1]/40 p-6 md:p-8 rounded-2xl border border-[#EC8A66]/50 mt-8 text-left flex flex-col sm:flex-row gap-6 items-start">
               <span className="text-4xl">🔒</span>
               <div>
                 <h4 className="font-extrabold text-[#3A556C] text-xl mb-2">Your Secrets Are Safe</h4>
                 <p className="text-gray-700 text-[16px] leading-relaxed font-medium">Because these tests are highly personal, your answers are permanently deleted from our system in 24 hours.</p>
               </div>
             </div>
          </div>

          <Link href="/quizzes" className="inline-block bg-[#EC8A66] text-white rounded-full px-12 py-5 text-[22px] font-extrabold hover:bg-[#E07850] hover:shadow-[0_10px_25px_rgba(224,120,80,0.35)] hover:-translate-y-1 transition-all">
            Start My Free 3-Minute Test →
          </Link>
        </div>
      </section>

      {/* PRESERVED SECTION — FEATURED TOOLS */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#3A556C] mb-10 text-center">
            AI Relationship Analysis Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card variant="tool" title="Chat Analyzer" description="Paste any conversation and get a psychology-backed breakdown of his texting behavior, interest level, and red flags — in plain English." href="/chat-analyzer" buttonText="Try Chat Analyzer" />
            <Card variant="tool" title="Dating Profile Analyzer" description="Share his profile and get a clear read on what his bio, word choices, and photos are really signaling before you swipe right." href="/dating-profile-analyzer" buttonText="Try Profile Analyzer" />
          </div>
        </div>
      </section>

      {/* PRESERVED SECTION — CONTINUOUS TESTIMONIALS CAROUSEL */}
      <section className="bg-[#32485A] py-24 overflow-hidden">
        <div className="container mx-auto px-6 md:px-10 lg:px-14 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-[32px] md:text-[44px] font-bold text-white mb-4">
              Join Thousands Of Women Who Got Clarity
            </h2>
          </div>
        </div>
        <div className="relative w-full">
          <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-[#32485A] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-[#32485A] to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-track gap-6 px-6">
            {carouselItems.map((testimony, index) => (
              <div key={index} className="flex-shrink-0 w-80 md:w-96 rounded-2xl p-6 glass-dark shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 text-[#F5DD90] fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>)}
                </div>
                <p className="text-white/90 font-medium text-[16px] md:text-[18px] leading-relaxed">"{testimony}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EC8A66] flex items-center justify-center text-white font-bold text-sm">{String.fromCharCode(65 + (index % 26))}</div>
                  <span className="text-white/50 font-bold text-sm">— Anonymous User</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESERVED SECTION — ARTICLES */}
      <section className="bg-[#EFEBE1]/60 py-20">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-[32px] md:text-[42px] font-extrabold text-[#3A556C] mb-6">
              Relationship Red Flags & Guides
            </h2>
            <p className="text-[18px] md:text-[22px] font-medium leading-relaxed text-[#3A556C]/80">
              Psychology-backed articles written for real, messy, confusing situations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card variant="article" tag="Red Flags" title="Is He Gaslighting Me? (Coming Soon) 9 Signs You're Not Imagining It" href="/is-he-gaslighting-me" />
            <Card variant="article" tag="Attachment Styles" title="The 4 Adult Attachment Styles Explained" href="/understanding-attachment-styles" />
            <Card variant="article" tag="Toxic Friendships" title="Signs Your Best Friend Is Secretly Jealous of You" href="/signs-of-a-toxic-friend" />
          </div>
          <div className="text-center">
            <Link href="/articles" className="text-[18px] text-[#06AED5] hover:text-[#3A556C] hover:underline underline-offset-4 font-bold transition-colors">
              Read all guides →
            </Link>
          </div>
        </div>
      </section>

      {/* PRESERVED SECTION — NEWSLETTER */}
      <section className="bg-[#3D5A6C] py-24 text-white">
        <div className="container mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-[36px] md:text-[46px] font-extrabold mb-6 leading-tight text-white">
                Get Relationship Clarity in Your Inbox
              </h2>
              <p className="text-[18px] md:text-[20px] font-medium text-[#EFEBE1] leading-relaxed max-w-xl mx-auto lg:mx-0">
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
                  className="w-full bg-white text-[#3A556C] px-6 py-4 rounded-full focus:outline-none focus:ring-4 focus:ring-[#06AED5]/50 text-[18px] font-medium placeholder:text-[#3A556C]/40"
                  required
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#EC8A66] text-white px-8 py-4 rounded-full font-extrabold text-[18px] hover:bg-[#E07850] transition-colors whitespace-nowrap shadow-lg"
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
