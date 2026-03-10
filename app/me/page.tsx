import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Psychological Profile | OopsCupid",
  description: "Understand your attachment style, relationship patterns, and dating blind spots.",
};

export default function MeHub() {
  return (
    <main className="min-h-screen bg-[#FDF6EE] pb-24">
      {/* Hero Section */}
      <section className="bg-[#3B1F2B] py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#A23B72 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[#F18F01] font-black tracking-[0.2em] mb-4 uppercase text-sm">Self-Discovery Hub</p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Understand Your Blueprint
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover the subconscious patterns driving your relationship choices, your attachment style, and your hidden blind spots.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            
            {/* FEATURED IMAGE CARD: ATTACHMENT STYLE */}
            <div className="group bg-white rounded-[40px] overflow-hidden shadow-2xl transition-all hover:-translate-y-2 flex flex-col border border-gray-100">
              <div 
                className="h-72 flex items-end p-8 relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full_caption/public/field_blog_entry_images/2019-01/how_to_improve_your_romantic_relationship_dr._konstantin_lukin.jpg?itok=G9wg0ST1')` }}
              >
                {/* Dark gradient for text readability over the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0606] via-[#0f0606]/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 w-full">
                  <span className="bg-[#F18F01] text-[#3B1F2B] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block shadow-lg">
                    Flagship Assessment
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Attachment Style Quiz</h3>
                </div>
              </div>
              
              <div className="p-10 flex-grow flex flex-col">
                <p className="text-gray-600 text-lg mb-8 flex-grow leading-relaxed">
                  The foundational psychological blueprint. Find out if your nervous system is wired for Secure, Anxious, Avoidant, or Fearful attachment.
                </p>
                <Link href="/attachment-style-quiz" className="inline-block bg-[#2E86AB] text-white px-8 py-5 rounded-full font-bold text-center hover:bg-[#1f6685] transition-colors text-lg shadow-md">
                  Take the Free Quiz →
                </Link>
              </div>
            </div>

            {/* TOXIC ATTRACTION CARD */}
            <div className="group bg-[#3B1F2B] rounded-[40px] overflow-hidden shadow-2xl transition-all hover:-translate-y-2 flex flex-col border border-[#A23B72]/30">
              <div className="h-72 bg-[#A23B72] flex items-end p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F2B] to-transparent opacity-80"></div>
                <div className="relative z-10">
                  <span className="bg-white/20 text-white backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block border border-white/30">
                    Deep Dive
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">Why Do I Attract Toxic People?</h3>
                </div>
              </div>
              <div className="p-10 flex-grow flex flex-col text-white">
                <p className="text-white/80 text-lg mb-8 flex-grow leading-relaxed">
                  Break the cycle of emotionally unavailable, inconsistent, or chaotic partners by mapping your shadow triggers.
                </p>
                <Link href="/why-do-i-attract-toxic-people" className="inline-block bg-[#C73E1D] text-white px-8 py-5 rounded-full font-bold text-center hover:bg-[#A83519] transition-colors text-lg shadow-md">
                  Analyze Your Pattern →
                </Link>
              </div>
            </div>

          </div>

          {/* ADDITIONAL SELF DISCOVERY MODULES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card 
              variant="tool" 
              title="Sabotage Patterns" 
              description="Discover why you pull away or create conflict right when things start getting good." 
              href="/why-do-i-sabotage-relationships" 
              buttonText="Read Pattern" 
            />
            <Card 
              variant="tool" 
              title="Attraction Profile" 
              description="A clinical look at the exact kind of personality you subconsciously attract." 
              href="/what-kind-of-person-do-i-attract" 
              buttonText="Read Profile" 
            />
            <Card 
              variant="tool" 
              title="Dating the Same Type" 
              description="Learn why your exes all share the same underlying traits." 
              href="/why-do-i-keep-dating-the-same-type" 
              buttonText="Read More" 
            />
          </div>
        </div>
      </section>
    </main>
  );
}
