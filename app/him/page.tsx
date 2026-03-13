import MainHero from "@/components/ui/MainHero";
import QuizWidget from "@/components/features/QuizWidget";
import CTA from "@/components/ui/CTA";
import { Ghost, Flame, Search, UserCheck, MessageCircle } from "lucide-react";

export default function HimHubPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F9F4F4]">
      <MainHero
        title="The Him Hub"
        description="Decode his behavior. Analyze text messages, spot clinical red flags, and determine if he is manipulative or genuine."
        badge="BEHAVIORAL ANALYSIS"
        imagePath="/images/hubs/red-flags.png"
        theme="blue"
      />

      <section className="w-full max-w-[1200px] px-6 py-16 md:px-10 lg:px-14 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          <QuizWidget
            title="Is He Manipulative?"
            description="Spot the hidden signs of coercive control and emotional manipulation."
            href="/is-he-manipulative"
            timeToComplete="5 min"
            questionCount={15}
            icon={Ghost}
            theme="blue"
            badge="Red Flag Audit"
          />
          <QuizWidget
            title="Is He Gaslighting Me?"
            description="Determine mathematically if he is systematically altering your reality."
            href="/is-he-gaslighting-me"
            timeToComplete="4 min"
            questionCount={12}
            icon={Flame}
            theme="blue"
          />
          <QuizWidget
            title="Is He Cheating?"
            description="Audit the behavioral shifts and micro-expressions indicating infidelity."
            href="/is-he-cheating"
            timeToComplete="5 min"
            questionCount={14}
            icon={Search}
            theme="blue"
          />
          <QuizWidget
            title="His Attachment Style"
            description="Decode exactly why he pulls away or gets overwhelmingly clingy."
            href="/partners-attachment-style"
            timeToComplete="4 min"
            questionCount={12}
            icon={UserCheck}
            theme="blue"
          />
          <QuizWidget
            title="Texting Analyzer AI"
            description="Let our clinical AI analyze his actual text messages for hidden meaning."
            href="/dating-texting-analysis"
            timeToComplete="Instant"
            icon={MessageCircle}
            theme="blue"
            badge="AI Tool"
          />
        </div>
      </section>

      <CTA />
    </main>
  );
}
