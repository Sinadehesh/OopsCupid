import React from "react";
import Link from "next/link";
import { Link as LinkIcon, Magnet, Bomb, Sparkles, ChevronRight, Heart } from "lucide-react";

const meHubLinks = [
  { title: "Your Attachment Style", description: "Discover how you securely or anxiously connect with others.", path: "/attachment-style-quiz", icon: Heart, color: "bg-pink-50 text-pink-600", border: "border-pink-200" },
  { title: "Why Do I Attract Toxic People?", description: "Audit the subconscious signals you are putting out.", path: "/why-do-i-attract-toxic-people", icon: Magnet, color: "bg-purple-50 text-purple-600", border: "border-purple-200" },
  { title: "Attraction Patterns", description: "Map out your exact dating history and find the common denominator.", path: "/attraction-patterns", icon: Sparkles, color: "bg-violet-50 text-violet-600", border: "border-violet-200" },
  { title: "Why Do I Sabotage?", description: "Understand the hidden fears making you push good people away.", path: "/why-do-i-sabotage-relationships", icon: Bomb, color: "bg-rose-50 text-rose-600", border: "border-rose-200" }
];

export default function MeHubPage() {
  return (
    <div className="min-h-screen bg-[#F9F4F4] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#334B63] mb-6">The Me Hub</h1>
          <p className="text-lg md:text-xl text-[#5E6E79] leading-relaxed">
            Focus inward. Understand your attachment style, attraction patterns, and emotional triggers to build healthier relationships.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {meHubLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link key={idx} href={link.path} className="group bg-white rounded-3xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${link.color} ${link.border} border-2`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#F3ECEB] flex items-center justify-center text-[#5E6E79] group-hover:bg-[#FFB8A1] group-hover:text-black transition-colors duration-200">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#334B63] mb-2 group-hover:text-[#5A7492] transition-colors">{link.title}</h3>
                  <p className="text-[#5E6E79]">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
