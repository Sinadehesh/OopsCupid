"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PsychologicalProfile } from "@/lib/psychometrics/classification";
import AttachmentQuadrant, { DomainPoint } from "./AttachmentQuadrant";
import { ScoreBar } from "./ScoreBars";
import { ShieldCheck, Activity, Lock } from "lucide-react";
import PremiumCheckout from "./PremiumCheckout";

interface AttachmentReportProps {
  profile: PsychologicalProfile;
  demographics: any;
  rawAnswers?: any; // We receive this from the QuizWidget now!
}

export default function AttachmentReport({ profile, demographics, rawAnswers }: AttachmentReportProps) {
  const router = useRouter();
  const [isRouting, setIsRouting] = useState(false);

  const relationshipStatus = demographics?.isSingle ? "Single" : "In a relationship";
  const generalProfile = profile?.attachment?.general || { classification: "Unknown", anxietyScore: 0, avoidanceScore: 0 };
  const quadrantDomains: DomainPoint[] = Object.entries(profile?.attachment || {}).map(([key, data]: [string, any]) => {
    const nameMap: Record<string, string> = { general: "General", romantic: "Romantic", mother: "Mother", father: "Father", work: "Work" };
    return { name: nameMap[key] || "Other", anxiety: data?.anxietyScore || 0, avoidance: data?.avoidanceScore || 0 };
  });

  // THE MAGIC ROUTER: Save their raw data so the Premium Page can read it, then send them there!
  const handleRouteToPremium = () => {
    setIsRouting(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('oc_saved_profile', JSON.stringify({ profile, demographics, rawAnswers }));
    }
    router.push(`/attachment-style-quiz/premium?style=${encodeURIComponent(generalProfile.classification)}`);
  };

  const renderDomainScores = (title: string, data: any, colorCode: string) => (
    <div className={`p-6 rounded-xl bg-white border border-[#d6d2d2] shadow-sm`}>
      <h4 className={`text-sm font-black uppercase tracking-wider mb-5 text-[#086788]`}>{title}</h4>
      <div className="space-y-5">
        <ScoreBar label="Anxiety" value={data?.anxietyScore || 0} color={`bg-[${colorCode}]`} />
        <ScoreBar label="Avoidance" value={data?.avoidanceScore || 0} color={`bg-[#086788]`} />
      </div>
    </div>
  );

  return (
    <div className={`w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-[#fff1d0] py-12 md:py-20 border-t border-[#d6d2d2]`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-12">
          <div className={`rounded-2xl p-8 md:p-12 flex flex-col justify-center bg-white border border-[#d6d2d2] shadow-sm`}>
            <h4 className="text-sm font-black uppercase tracking-widest text-[#086788]/50 mb-3">Your Free Result</h4>
            <h2 className={`text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight text-[#086788]`}>{generalProfile.classification}</h2>
            <p className={`text-xl font-medium leading-relaxed text-[#086788]/80`}>Based on your answers, this is your primary attachment style. This is the label for how you naturally respond to closeness, stress, and connection.</p>
          </div>
          <div className="flex flex-col w-full h-full justify-center min-h-[400px] bg-white rounded-2xl border border-[#d6d2d2] p-4 md:p-8 shadow-sm">
            <AttachmentQuadrant domains={quadrantDomains} />
          </div>
        </div>

        <div className={`rounded-2xl p-8 md:p-12 mb-12 bg-white border border-[#d6d2d2] shadow-sm max-w-4xl mx-auto text-center`}>
           <h3 className={`text-3xl md:text-4xl font-black mb-6 text-[#086788]`}>This is only the surface.</h3>
           <p className={`text-lg md:text-xl mb-8 font-medium text-[#086788]/80 leading-relaxed`}>
             A label alone will not tell you why love feels hard, why you pull away, why you chase, or why you keep repeating the same painful cycle.<br/><br/>
             Your full result shows the deeper story behind your pattern — <b>how manipulative the guys you attract actually are compared to average men</b>, the exact playbook your partner uses against you, and what you need to do next.
           </p>
           
           <div className="bg-[#fff1d0]/50 border border-[#d6d2d2] rounded-xl p-6 md:p-8 text-left max-w-2xl mx-auto relative overflow-hidden">
             <div className="absolute top-0 right-0 bg-[#d6d2d2]/50 text-[#086788] text-xs font-black px-3 py-1 uppercase tracking-widest rounded-bl-lg flex items-center gap-1"><Lock className="w-3 h-3" /> Locked</div>
             <h4 className="text-xl font-black text-[#086788] mb-4">Inside the full breakdown:</h4>
             <ul className="space-y-3 font-medium text-[#086788]/90 text-lg">
               <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> Profile of your boyfriend / typical partner.</li>
               <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> How dangerous it is to stay in the relationship.</li>
               <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> The possible threats he can cause.</li>
               <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> His specific playbook & what to be careful about.</li>
               <li className="flex items-center gap-3"><span className="text-[#d6d2d2]">🔒</span> A personalized master action plan based on your answers.</li>
             </ul>
           </div>
           
           <p className={`text-lg mt-8 font-bold text-[#086788]`}>If you want real clarity, not just a label, unlock your full Love Pattern Breakdown below.</p>
        </div>

        <PremiumCheckout 
          onUnlock={handleRouteToPremium} 
          isGenerating={isRouting} 
          archetype={generalProfile.classification}
          relationshipStatus={relationshipStatus}
        />
      </div>
    </div>
  );
}
