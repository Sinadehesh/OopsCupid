import React from "react";
import Link from "next/link";
import { BookOpen, ShieldAlert, BrainCircuit, HeartCrack, ChevronRight } from "lucide-react";

const clarityHubLinks = [
  { title: "The Science of Manipulation", description: "Deep dive into the dark psychology of coercive control.", path: "/articles/manipulation-science", icon: BrainCircuit, color: "bg-amber-50 text-amber-600", border: "border-amber-200" },
  { title: "Is My Friend Toxic?", description: "Learn the clinical signs of a one-sided, draining friendship.", path: "/articles/is-my-friend-toxic", icon: ShieldAlert, color: "bg-orange-50 text-orange-600", border: "border-orange-200" },
  { title: "Love Bombing vs. Affection", description: "How to tell if they are moving too fast to trap you.", path: "/love-bombing-signs", icon: HeartCrack, color: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" },
  { title: "Trauma Bonding Signs", description: "Understand the biological addiction to a toxic partner.", path: "/trauma-bonding-signs", icon: BookOpen, color: "bg-yellow-50 text-yellow-600", border: "border-yellow-200" }
];

export default function ClarityHubPage() {
  return (
    <div className="min-h-screen bg-[#F9F4F4] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#334B63] mb-6">The Clarity Hub</h1>
          <p className="text-lg md:text-xl text-[#5E6E79] leading-relaxed">
            Stop guessing. Educate yourself. Read our clinical deep-dives into the science of human behavior, manipulation, and attachment.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {clarityHubLinks.map((link, idx) => {
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
