import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function ClarityHub() {
  return (
    <main className="min-h-screen bg-[#f2f5fa]">
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#2a2522] mb-8 tracking-tighter">
            Relationship Clarity Hub
          </h1>
          <p className="text-xl md:text-2xl text-[#2a2522]/70 max-w-3xl mx-auto mb-20 leading-relaxed">
            Psychology-backed guides designed to help you decode patterns, spot red flags, and understand the science of your heart.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
            {/* FRIENDSHIP ESSAY */}
            <div className="group bg-white rounded-[40px] overflow-hidden shadow-xl transition-all hover:-translate-y-3 flex flex-col border border-[#ced2dc]">
              <div className="h-56 bg-[#ffbc42] flex items-center justify-center p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <h3 className="text-3xl font-extrabold text-[#006ba6] relative z-10">Is My Friend Toxic?</h3>
              </div>
              <div className="p-10 text-left flex-grow flex flex-col">
                <p className="text-[#2a2522]/80 text-lg mb-8 flex-grow">The real reason some friendships drain you—and how to spot the signs before it's too late.</p>
                <Link href="/articles/is-my-friend-toxic" className="inline-block bg-[#006ba6] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#005a8c] transition-colors shadow-md">
                  Read Full Essay →
                </Link>
              </div>
            </div>

            {/* ATTACHMENT ESSAY */}
            <div className="group bg-white rounded-[40px] overflow-hidden shadow-xl transition-all hover:-translate-y-3 flex flex-col border border-[#ced2dc]">
              <div className="h-56 bg-[#0D2C54] flex items-center justify-center p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <h3 className="text-3xl font-extrabold text-white relative z-10">Attachment Styles, Explained</h3>
              </div>
              <div className="p-10 text-left flex-grow flex flex-col">
                <p className="text-[#2a2522]/80 text-lg mb-8 flex-grow">The real reason you keep repeating the same relationship patterns—and how to finally break the cycle.</p>
                <Link href="/understanding-attachment-styles" className="inline-block bg-[#00A6ED] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#00A6ED]/90 transition-colors shadow-md">
                  Read Full Essay →
                </Link>
              </div>
            </div>

            {/* MANIPULATION ESSAY */}
            <div className="group bg-white rounded-[40px] overflow-hidden shadow-xl transition-all hover:-translate-y-3 flex flex-col border border-[#ced2dc]">
              <div className="h-56 bg-[#2a2522] flex items-center justify-center p-10 text-center relative overflow-hidden border-b-4 border-[#650000]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <h3 className="text-3xl font-extrabold text-white relative z-10">The Science of Manipulation</h3>
              </div>
              <div className="p-10 text-left flex-grow flex flex-col">
                <p className="text-[#2a2522]/80 text-lg mb-8 flex-grow">Gaslighting, coercive control, and the hidden patterns designed to make you stop trusting yourself.</p>
                <Link href="/articles/manipulation-science" className="inline-block bg-[#650000] text-white px-8 py-4 rounded-full font-bold text-center hover:bg-[#490000] transition-colors shadow-md">
                  Read Full Essay →
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* TOOLS REDIRECT CARDS */}
            <Card 
              variant="tool" 
              title="Chat Analyzer" 
              description="Decode mixed signals and texting behavior with AI-driven psychology." 
              href="/chat-analyzer" 
              buttonText="Open Tool" 
            />
            <Card 
              variant="tool" 
              title="Profile Analyzer" 
              description="Spot red flags in dating bios before you swipe right." 
              href="/dating-profile-analyzer" 
              buttonText="Open Tool" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}
