"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Lock, Shield, ArrowRight, CheckCircle2 } from "lucide-react";

export default function PremiumAttachmentReport() {
  const searchParams = useSearchParams();
  const primaryArchetype = searchParams.get("style") || "Anxious Preoccupied";
  
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    // Phase 3 will connect this to the Stripe/API logic
    setIsLoading(true);
    setTimeout(() => {
      alert("Phase 3: Stripe Checkout & AI Generation will go here!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-zinc-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-zinc-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-500 rounded-full blur-3xl opacity-30"></div>
          <Lock className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">The Ultimate Clarity Bundle</h1>
          <p className="text-zinc-400 text-lg">
            Unlock your custom extraction plan for <span className="text-white font-semibold">{primaryArchetype}</span> patterns.
          </p>
        </div>
        
        {/* Features & Checkout Section */}
        <div className="p-8">
          <ul className="space-y-4 mb-8">
            {[
              "Exactly how your brain self-sabotages (and how to stop it).",
              "The specific toxic profiles you naturally attract.",
              "The childhood origin of your emotional triggers.",
              "A 3-phase behavioral plan to rewire your attraction today.",
              "Copy-paste text scripts to set lethal, polite boundaries."
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <span className="text-zinc-700 font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-zinc-100 pt-6 mb-8 text-center">
            <div className="text-5xl font-extrabold text-zinc-900 mb-1">$19.99</div>
            <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">One-time payment. Lifetime access.</p>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={isLoading}
            className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? "Redirecting securely..." : "Unlock My Playbook"} 
            {!isLoading && <ArrowRight size={20} />}
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-6 text-zinc-400 text-sm">
            <Shield size={16} />
            <span>Secure 256-bit encryption</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
