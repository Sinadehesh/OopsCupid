import React from "react";
import Link from "next/link";
import { ArrowLeft, HeartCrack, Flame, ShieldAlert, BookOpen, Clock, Activity, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Love Bombing vs. Genuine Affection | OopsCupid",
  description: "How to tell the difference between real love and emotional manipulation. Learn the signs of love bombing and why it feels so confusing.",
};

// Custom section component just for this article to handle the colorful themes and icons
function ArticleSection({ title, icon, theme, children }: { title: string, icon: React.ReactNode, theme: string, children: React.ReactNode }) {
  const themeStyles: Record<string, string> = {
    indigo: "bg-indigo-50 border-indigo-100",
    orange: "bg-orange-50 border-orange-100",
    pink: "bg-pink-50 border-pink-100",
    red: "bg-red-50 border-red-100",
    emerald: "bg-emerald-50 border-emerald-100",
    blue: "bg-blue-50 border-blue-100",
    amber: "bg-amber-50 border-amber-100",
  };
  const themeClass = themeStyles[theme] || "bg-slate-50 border-slate-100";

  return (
    <div className={`p-6 md:p-8 rounded-3xl border ${themeClass} mb-12`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 flex-shrink-0">
           {icon}
        </div>
        <h2 className="text-2xl font-bold text-[#334B63] m-0">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function LoveBombingArticle() {
  return (
    <main className="min-h-screen bg-[#F9F4F4] pb-24">
      {/* Hero Section */}
      <section className="bg-white border-b border-[#E2E8F0] pt-24 pb-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <Link href="/articles" className="inline-flex items-center text-sm font-bold text-[#5E6E79] hover:text-[#334B63] transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Articles
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-bold tracking-widest uppercase mb-6 border border-pink-100">
            <HeartCrack className="w-4 h-4" />
            Red Flags
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#334B63] mb-6 leading-[1.1] tracking-tight">
            Love Bombing vs. Genuine Affection
          </h1>
          
          <p className="text-xl md:text-2xl text-[#5E6E79] leading-relaxed font-medium">
            How to tell the difference between real love and emotional manipulation.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 py-12">
        <div className="max-w-[800px] mx-auto space-y-12">
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none text-[#334B63]">
            <p className="lead text-xl md:text-2xl font-medium text-[#334B63] leading-relaxed mb-8">
              Imagine meeting someone who seems almost too perfect. They text you the moment they wake up. They tell you you're the most incredible person they've ever met. They say they've never felt such a strong connection before.
            </p>
            <p>
              Within days they talk about the future — traveling together, living together, even growing old together. At first, it feels intoxicating. Like stepping into a romantic movie where everything suddenly makes sense.
            </p>
            <ul className="list-none pl-0 space-y-2 font-medium my-8">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> You feel chosen.</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> You feel special.</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span> You feel seen.</li>
            </ul>
            <p>
              But then something strange begins to happen. The attention fades. The compliments become rare. The person who once seemed obsessed with you suddenly feels distant or unpredictable.
            </p>
            <p className="font-bold text-xl mt-8 mb-4">
              You begin asking yourself a painful question: Was that love… or was it manipulation?
            </p>
            <p>
              Welcome to one of the most confusing dynamics in modern relationships — <strong>love bombing</strong>. Understanding the difference between love bombing and genuine affection is essential because the two can look almost identical in the beginning. Yet over time, they lead to completely different emotional realities.
            </p>
          </div>

          <ArticleSection 
            title="The Seduction of Intensity" 
            icon={<Activity className="w-6 h-6 text-indigo-500" />}
            theme="indigo"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>
                Human beings are wired to respond to affection. When someone showers us with attention, admiration, and emotional closeness, our brains release powerful chemicals associated with bonding and reward.
              </p>
              <ul className="space-y-2 mt-4 mb-6">
                <li><strong>Dopamine</strong> makes the interaction exciting.</li>
                <li><strong>Oxytocin</strong> deepens feelings of attachment.</li>
                <li><strong>Serotonin</strong> stabilizes emotional satisfaction.</li>
              </ul>
              <p>
                In short, affection literally <strong>rewires our brain chemistry</strong>. This is why early romance often feels magical. When affection appears genuine, it creates a sense of emotional safety and connection.
              </p>
              <p className="font-medium">
                Love bombing exploits this same biological mechanism — but with a different goal.
              </p>
            </div>
          </ArticleSection>

          <ArticleSection 
            title="What Love Bombing Really Is" 
            icon={<Flame className="w-6 h-6 text-orange-500" />}
            theme="orange"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>
                Love bombing is not simply intense affection. It is <strong>affection used as a strategy</strong>.
              </p>
              <p>
                A person engages in overwhelming displays of admiration, attention, and devotion in order to quickly gain emotional influence over another person. The goal is not intimacy. The goal is <strong>attachment — fast attachment</strong>.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-2xl my-8">
                <p className="m-0 text-orange-900 font-medium">
                  Love bombers want you emotionally invested before you have enough time to evaluate whether the relationship is healthy. They compress what normally takes months or years of emotional bonding into a matter of days or weeks.
                </p>
              </div>
              <p>
                And when that happens, the emotional experience can feel overwhelming in the best possible way. At first.
              </p>
            </div>
          </ArticleSection>

          <ArticleSection 
            title="The Early Phase: The Perfect Partner Illusion" 
            icon={<HeartCrack className="w-6 h-6 text-pink-500" />}
            theme="pink"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>During the love bombing stage, the person often appears extraordinary. They may:</p>
              <ul className="space-y-2">
                <li>Compliment you constantly</li>
                <li>Mirror your interests and values</li>
                <li>Tell you they feel a rare connection</li>
                <li>Message you continuously throughout the day</li>
                <li>Plan elaborate romantic gestures</li>
                <li>Push the relationship forward rapidly</li>
              </ul>
              <p className="mt-6">You may hear statements like:</p>
              <div className="space-y-4 my-6 pl-4 border-l-2 border-pink-200 italic text-[#5E6E79]">
                <p>"I've never met anyone like you."</p>
                <p>"You understand me better than anyone ever has."</p>
                <p>"I think you're my soulmate."</p>
              </div>
              <p>
                For someone craving emotional connection, these words can feel deeply meaningful. But there is an important psychological red flag hidden inside this behavior.
              </p>
              <p className="font-bold text-xl text-pink-600 mt-6">
                The person doesn't actually know you yet.
              </p>
              <p>
                True intimacy requires time. Real understanding develops through shared experiences and observation. When someone idealizes you immediately, they are often projecting an image rather than responding to the real person.
              </p>
            </div>
          </ArticleSection>

          <ArticleSection 
            title="The Shift That Changes Everything" 
            icon={<ShieldAlert className="w-6 h-6 text-red-500" />}
            theme="red"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>
                The most revealing aspect of love bombing is what happens <strong>after the initial phase</strong>. Because the intensity is not sustainable, the dynamic often shifts.
              </p>
              <p>The person who once seemed endlessly affectionate may suddenly become:</p>
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="bg-red-50 p-4 rounded-xl text-center font-bold text-red-700">Distant</div>
                <div className="bg-red-50 p-4 rounded-xl text-center font-bold text-red-700">Critical</div>
                <div className="bg-red-50 p-4 rounded-xl text-center font-bold text-red-700">Emotionally Unavailable</div>
                <div className="bg-red-50 p-4 rounded-xl text-center font-bold text-red-700">Inconsistent</div>
              </div>
              <p>
                This shift creates confusion. You begin wondering what went wrong. You may think: <em>"Maybe I said something wrong. Maybe they're stressed. Maybe I need to try harder."</em>
              </p>
              <p className="font-medium mt-6">
                And that is exactly where the psychological trap forms. You start chasing the affection that once felt effortless.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-4">The Cycle of Emotional Dependency</h3>
              <p>
                Love bombing often leads into a pattern known as <strong>intermittent reinforcement</strong>. This psychological phenomenon occurs when rewards are delivered unpredictably.
              </p>
              <p>
                In relationships, this means affection appears and disappears without clear reason. One day the person feels loving and attentive. The next day they seem cold or distant. This inconsistency actually strengthens emotional attachment.
              </p>
              <p>
                Why? Because the brain begins trying to <strong>recover the reward</strong>. You become more invested in regaining the emotional high you experienced during the beginning of the relationship. What once felt like love slowly becomes emotional pursuit.
              </p>
            </div>
          </ArticleSection>

          <ArticleSection 
            title="What Genuine Affection Looks Like" 
            icon={<BookOpen className="w-6 h-6 text-emerald-500" />}
            theme="emerald"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>
                Now compare this with authentic affection. Healthy love rarely begins with overwhelming intensity. Instead, it unfolds gradually.
              </p>
              <p>
                Two people meet. They enjoy each other's company. They learn about each other's personalities, boundaries, and values. Interest grows through shared experiences rather than dramatic declarations.
              </p>
              <p className="mt-6 mb-4 font-bold">Genuine affection tends to look like this:</p>
              <ul className="space-y-2">
                <li>Curiosity about who you really are</li>
                <li>Emotional consistency</li>
                <li>Respect for personal boundaries</li>
                <li>Gradual development of intimacy</li>
                <li>Mutual support and appreciation</li>
              </ul>
              <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl my-8">
                <p className="m-0 text-emerald-900 font-medium">
                  Rather than overwhelming you, healthy affection <strong>creates space</strong>. Space for both individuals to remain themselves.
                </p>
              </div>
            </div>
          </ArticleSection>

          <ArticleSection 
            title="The Key Difference: Pace" 
            icon={<Clock className="w-6 h-6 text-blue-500" />}
            theme="blue"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>
                Perhaps the simplest way to distinguish love bombing from genuine affection is by examining the pace of the relationship.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 my-8">
                <div className="flex-1 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                  <h4 className="text-red-500 font-bold mb-2">Love Bombing</h4>
                  <p className="text-sm m-0">Pushes for <strong>speed</strong>. Accelerates emotional intimacy before trust has had time to develop.</p>
                </div>
                <div className="flex-1 bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm">
                  <h4 className="text-emerald-500 font-bold mb-2">Genuine Affection</h4>
                  <p className="text-sm m-0">Allows <strong>time</strong>. Allows emotional closeness to grow naturally and sustainably.</p>
                </div>
              </div>
              <p>
                The difference may seem subtle in the moment, but over time it becomes profound.
              </p>
            </div>
          </ArticleSection>

          <ArticleSection 
            title="Warning Signs That Affection Might Be Love Bombing" 
            icon={<MessageCircle className="w-6 h-6 text-amber-500" />}
            theme="amber"
          >
            <div className="prose prose-lg max-w-none text-[#334B63]">
              <p>While every relationship is unique, several patterns often signal manipulative affection:</p>
              
              <div className="space-y-6 mt-8">
                <div>
                  <h4 className="font-bold text-lg mb-1">1. The relationship moves extremely fast</h4>
                  <p className="text-[#5E6E79] m-0">Declarations of deep love appear within days or weeks.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">2. Compliments feel exaggerated</h4>
                  <p className="text-[#5E6E79] m-0">You are described as perfect or extraordinary before the person truly knows you.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">3. They demand constant communication</h4>
                  <p className="text-[#5E6E79] m-0">You feel pressure to respond quickly or spend most of your time focused on the relationship.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">4. Boundaries are ignored</h4>
                  <p className="text-[#5E6E79] m-0">Requests for personal space are met with guilt, disappointment, or pressure.</p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">5. The affection becomes inconsistent</h4>
                  <p className="text-[#5E6E79] m-0">After the initial intensity, the person becomes emotionally unpredictable.</p>
                </div>
              </div>
              
              <p className="mt-8 italic text-[#5E6E79]">
                These signals do not automatically mean someone is manipulative. But when multiple signs appear together, it is wise to slow down and observe the dynamic more carefully.
              </p>
            </div>
          </ArticleSection>

          {/* Conclusion */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-sm text-center">
            <HeartCrack className="w-12 h-12 text-pink-500 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#334B63] mb-6">
              A Simple Question to Remember
            </h2>
            <p className="text-lg text-[#5E6E79] mb-8 max-w-2xl mx-auto">
              If you ever feel unsure whether someone's affection is genuine, ask yourself one simple question:
            </p>
            <div className="bg-[#F9F4F4] p-6 rounded-2xl mb-8">
              <p className="text-xl md:text-2xl font-bold text-[#334B63] m-0">
                "Does this relationship feel stable, or does it feel overwhelming?"
              </p>
            </div>
            <p className="text-[#5E6E79] mb-8 max-w-2xl mx-auto">
              Real love may be exciting, but it should never make you feel emotionally swept away without control. Healthy affection builds connection gradually. Love bombing creates emotional intensity that burns bright — and often burns out just as quickly.
            </p>
            
            <div className="pt-8 border-t border-[#E2E8F0]">
              <p className="font-bold text-[#334B63] mb-4">Want more clarity on relationship dynamics?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quizzes" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#334B63] text-white font-bold hover:bg-[#233547] transition-colors">
                  Take a Clinical Quiz
                </Link>
                <Link href="/articles" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-[#334B63] font-bold border border-[#E2E8F0] hover:bg-[#F3ECEB] transition-colors">
                  Read More Articles
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
