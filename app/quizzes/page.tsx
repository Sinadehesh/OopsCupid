import Link from "next/link";
import { 
  Ghost, Flame, Search, Flag, HeartCrack, 
  HandCoins, Skull, Users, Heart, 
  UserCheck, Magnet, Bomb, MessageCircle, ScanFace, 
  ArrowRight, Layers 
} from "lucide-react";

export const metadata = { title: "All Quizzes & Tools | OopsCupid" };

const quizCategories = [
  {
    title: "Dating & Red Flags",
    description: "Identify manipulative behaviors, deception, and unhealthy dynamics in your romantic life.",
    quizzes: [
      { title: "Is He Manipulative?", path: "/is-he-manipulative", desc: "Spot the hidden signs of coercive control.", icon: Ghost, bgClass: "bg-[#EF4444]", bgLightClass: "bg-[#EF4444]/10", textClass: "text-[#EF4444]" },
      { title: "Is He Gaslighting Me?", path: "/is-he-gaslighting-me", desc: "Determine if he is altering your reality.", icon: Flame, bgClass: "bg-[#6366F1]", bgLightClass: "bg-[#6366F1]/10", textClass: "text-[#6366F1]" },
      { title: "Is He Cheating?", path: "/is-he-cheating", desc: "Audit the behavioral shifts indicating infidelity.", icon: Search, bgClass: "bg-[#0EA5E9]", bgLightClass: "bg-[#0EA5E9]/10", textClass: "text-[#0EA5E9]" },
      { title: "Relationship Red Flags", path: "/relationship-red-flags", desc: "Scan your relationship for early warning signs.", icon: Flag, bgClass: "bg-[#F43F5E]", bgLightClass: "bg-[#F43F5E]/10", textClass: "text-[#F43F5E]" },
      { title: "Love Bombing Signs", path: "/love-bombing-signs", desc: "How to tell if they are moving too fast to trap you.", icon: HeartCrack, bgClass: "bg-[#EC4899]", bgLightClass: "bg-[#EC4899]/10", textClass: "text-[#EC4899]" }
    ]
  },
  {
    title: "Friendship Dynamics",
    description: "Audit your social circle for exploitation, toxicity, and imbalanced roles.",
    quizzes: [
      { title: "Are Your Friends Using You?", path: "/are-your-friends-using-you", desc: "Discover if your friendships are purely transactional.", icon: HandCoins, bgClass: "bg-[#10B981]", bgLightClass: "bg-[#10B981]/10", textClass: "text-[#10B981]" },
      { title: "Toxic Friend Test", path: "/toxic-friend-test", desc: "Learn the clinical signs of a draining friendship.", icon: Skull, bgClass: "bg-[#A855F7]", bgLightClass: "bg-[#A855F7]/10", textClass: "text-[#A855F7]" },
      { title: "Friend Group Role", path: "/friend-group-role", desc: "Find out what role you play in your social circle.", icon: Users, bgClass: "bg-[#3B82F6]", bgLightClass: "bg-[#3B82F6]/10", textClass: "text-[#3B82F6]" }
    ]
  },
  {
    title: "Attachment & Psychology",
    description: "Uncover your hidden behavioral patterns and subconscious attraction triggers.",
    quizzes: [
      { title: "Your Attachment Style", path: "/attachment-style-quiz", desc: "Discover how you securely or anxiously connect.", icon: Heart, bgClass: "bg-[#EC4899]", bgLightClass: "bg-[#EC4899]/10", textClass: "text-[#EC4899]" },
      { title: "Partner's Attachment Style", path: "/partners-attachment-style", desc: "Decode why he pulls away or gets clingy.", icon: UserCheck, bgClass: "bg-[#0EA5E9]", bgLightClass: "bg-[#0EA5E9]/10", textClass: "text-[#0EA5E9]" },
      { title: "Why Do I Attract Toxic People?", path: "/why-do-i-attract-toxic-people", desc: "Audit the subconscious signals you are putting out.", icon: Magnet, bgClass: "bg-[#8B5CF6]", bgLightClass: "bg-[#8B5CF6]/10", textClass: "text-[#8B5CF6]" },
      { title: "Why Do I Sabotage?", path: "/why-do-i-sabotage-relationships", desc: "Understand the hidden fears making you push people away.", icon: Bomb, bgClass: "bg-[#E11D48]", bgLightClass: "bg-[#E11D48]/10", textClass: "text-[#E11D48]" }
    ]
  },
  {
    title: "AI Analysis Tools",
    description: "Let our clinical AI review your real-life data for objective, unfiltered insights.",
    quizzes: [
      { title: "Chat & Text Analyzer", path: "/chat-analyzer", desc: "Let our AI analyze his actual text messages.", icon: MessageCircle, bgClass: "bg-[#14B8A6]", bgLightClass: "bg-[#14B8A6]/10", textClass: "text-[#14B8A6]" },
      { title: "Dating Profile Analyzer", path: "/dating-profile-analyzer", desc: "Optimize your dating profile with AI feedback.", icon: ScanFace, bgClass: "bg-[#D946EF]", bgLightClass: "bg-[#D946EF]/10", textClass: "text-[#D946EF]" }
    ]
  }
];

export default function AllQuizzes() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="bg-[#D946EF] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest mb-6 bg-white/20 backdrop-blur-sm border border-white/10 shadow-sm uppercase">
            <Layers className="w-4 h-4 text-white" />
            Complete Directory
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            The Psychological <span className="text-white/80 drop-shadow-sm">Toolkit.</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Stop guessing. Start measuring. Choose a clinical audit below to uncover the hidden dynamics in your relationships.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="w-full max-w-[1200px] mx-auto space-y-24">
          
          {quizCategories.map((category, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0D2C54] mb-4">{category.title}</h2>
                <p className="text-[#0D2C54]/70 text-lg md:text-xl font-medium max-w-2xl">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.quizzes.map((quiz, quizIdx) => {
                  const Icon = quiz.icon;
                  return (
                    <Link key={quizIdx} href={quiz.path} className="group block h-full">
                      <div className="bg-white rounded-[32px] p-8 md:p-10 border border-[#0D2C54]/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 ${quiz.bgLightClass} rounded-bl-full -z-0 transition-transform group-hover:scale-110`}></div>
                        <div className={`w-14 h-14 ${quiz.bgClass} rounded-2xl flex items-center justify-center mb-8 shadow-md z-10`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-[#0D2C54] mb-4 z-10">{quiz.title}</h3>
                        <p className="text-[#0D2C54]/70 mb-8 leading-relaxed font-medium z-10 flex-grow">{quiz.desc}</p>
                        <div className={`flex items-center ${quiz.textClass} font-extrabold z-10 mt-auto uppercase text-sm tracking-wide`}>
                          Start Audit <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}
