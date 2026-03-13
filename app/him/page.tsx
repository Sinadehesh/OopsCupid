import React from "react";
import Link from "next/link";
import { Ghost, Flame, Search, UserCheck, MessageCircle, ChevronRight } from "lucide-react";

const himHubLinks = [
  { title: "Is He Manipulative?", description: "Spot the hidden signs of coercive control.", path: "/is-he-manipulative", icon: Ghost, color: "bg-blue-50 text-blue-600", border: "border-blue-200" },
  { title: "Is He Gaslighting Me?", description: "Determine if he is altering your reality.", path: "/is-he-gaslighting-me", icon: Flame, color: "bg-indigo-50 text-indigo-600", border: "border-indigo-200" },
  { title: "Is He Cheating?", description: "Audit the behavioral shifts indicating infidelity.", path: "/is-he-cheating", icon: Search, color: "bg-cyan-50 text-cyan-600", border: "border-cyan-200" },
  { title: "His Attachment Style", description: "Decode why he pulls away or gets clingy.", path: "/partners-attachment-style", icon: UserCheck, color: "bg-sky-50 text-sky-600", border: "border-sky-200" },
  { title: "Texting Analyzer AI", description: "Let our AI analyze his actual text messages.", path: "/dating-texting-analysis", icon: MessageCircle, color: "bg-teal-50 text-teal-600", border: "border-teal-200" }
];

export default function HimHubPage() {
  return (
    <div className="min-h-screen bg-[#F9F4F4] py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="mb-16 text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#334B63] mb-6">The Him Hub</h1>
          <p className="text-lg md:text-xl text-[#5E6E79] leading-relaxed">
            Decode his behavior. Analyze text messages, spot clinical red flags, and determine if he is manipulative or genuine.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {himHubLinks.map((link, idx) => {
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
                  <h3 className="text-xl font-bold text-[#334B63] mb-2 group-hover:text-[#5A7492] transition-colors">{link.title}</h3>
                  <p className="text-[#5E6E79] text-sm">{link.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
