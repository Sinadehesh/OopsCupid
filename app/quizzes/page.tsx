import React from "react";
import Link from "next/link";
import { 
  Ghost, Flame, Search, Flag, HeartCrack, 
  HandCoins, Skull, Users, Link as LinkIcon, 
  UserCheck, Magnet, Bomb, MessageCircle, ScanFace, 
  ChevronRight 
} from "lucide-react";

const quizCategories = [
  {
    title: "Dating & Red Flags",
    description: "Identify manipulative behaviors, deception, and unhealthy dynamics in your romantic life.",
    quizzes: [
      { title: "Is He Manipulative?", path: "/is-he-manipulative", icon: Ghost, color: "bg-red-50 text-red-600", border: "border-red-100" },
      { title: "Is He Gaslighting Me?", path: "/is-he-gaslighting-me", icon: Flame, color: "bg-orange-50 text-orange-600", border: "border-orange-100" },
      { title: "Is He Cheating?", path: "/is-he-cheating", icon: Search, color: "bg-yellow-50 text-yellow-600", border: "border-yellow-100" },
      { title: "Relationship Red Flags", path: "/relationship-red-flags", icon: Flag, color: "bg-rose-50 text-rose-600", border: "border-rose-100" },
      { title: "Love Bombing Signs", path: "/love-bombing-signs", icon: HeartCrack, color: "bg-pink-50 text-pink-600", border: "border-pink-100" },
    ]
  },
  {
    title: "Friendship Dynamics",
    description: "Audit your social circle for exploitation, toxicity, and imbalanced roles.",
    quizzes: [
      { title: "Are Your Friends Using You?", path: "/are-your-friends-using-you", icon: HandCoins, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-100" },
      { title: "Toxic Friend Test", path: "/toxic-friend-test", icon: Skull, color: "bg-purple-50 text-purple-600", border: "border-purple-100" },
      { title: "Friend Group Role", path: "/friend-group-role", icon: Users, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
    ]
  },
  {
    title: "Attachment & Psychology",
    description: "Uncover your hidden behavioral patterns and subconscious attraction triggers.",
    quizzes: [
      { title: "Your Attachment Style", path: "/attachment-style-quiz", icon: LinkIcon, color: "bg-indigo-50 text-indigo-600", border: "border-indigo-100" },
      { title: "Partner's Attachment Style", path: "/partners-attachment-style", icon: UserCheck, color: "bg-cyan-50 text-cyan-600", border: "border-cyan-100" },
      { title: "Why Do I Attract Toxic People?", path: "/why-do-i-attract-toxic-people", icon: Magnet, color: "bg-violet-50 text-violet-600", border: "border-violet-100" },
      { title: "Why Do I Sabotage Relationships?", path: "/why-do-i-sabotage-relationships", icon: Bomb, color: "bg-slate-50 text-slate-600", border: "border-slate-200" },
    ]
  },
  {
    title: "AI Analysis Tools",
    description: "Let our clinical AI review your real-life data for objective, unfiltered insights.",
    quizzes: [
      { title: "Chat & Text Analyzer", path: "/chat-analyzer", icon: MessageCircle, color: "bg-teal-50 text-teal-600", border: "border-teal-100" },
      { title: "Dating Profile Analyzer", path: "/dating-profile-analyzer", icon: ScanFace, color: "bg-fuchsia-50 text-fuchsia-600", border: "border-fuchsia-100" },
    ]
  }
];

export default function AllQuizzesPage() {
  return (
    <div className="min-h-screen bg-[#F9F4F4] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#334B63] mb-6 tracking-tight">
            The Psychological Toolkit
          </h1>
          <p className="text-lg md:text-xl text-[#5E6E79] leading-relaxed">
            Stop guessing. Start measuring. Choose a clinical audit below to uncover the hidden dynamics in your relationships.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-20">
          {quizCategories.map((category, idx) => (
            <section key={idx} className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#334B63] mb-3">{category.title}</h2>
                <p className="text-[#5E6E79] text-base md:text-lg">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.quizzes.map((quiz, quizIdx) => {
                  const Icon = quiz.icon;
                  return (
                    <Link 
                      key={quizIdx} 
                      href={quiz.path}
                      className="group bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${quiz.color} ${quiz.border} border`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#F3ECEB] flex items-center justify-center text-[#5E6E79] group-hover:bg-[#FFB8A1] group-hover:text-black transition-colors duration-200">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[#334B63] group-hover:text-[#5A7492] transition-colors">
                        {quiz.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
