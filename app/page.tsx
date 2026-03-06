import MainHero from "@/components/ui/MainHero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OopsCupid | Spot Red Flags & Analyze Your Dating Patterns",
  description:
    "Stop wondering why they disappeared. Spot red flags, analyze texts, identify toxic friendships, and understand your attraction patterns with OopsCupid.",
};

export default function Home() {
  return (
    <>
      <MainHero
        topSubheading="Welcome to"
        headline="OopsCupid"
        question="How can we help you understand the people, patterns, and red flags confusing you?"
        cards={[
          {
            imageSrc:
              "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
            imageAlt: "Woman reflecting on her relationship",
            title: "Me",
            description:
              "Understand your patterns, doubts, and dating blind spots",
            bgColor: "#F1A08B",
            textColor: "#111111",
            href: "/me",
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
            imageAlt: "Person checking messages on a phone",
            title: "Him",
            description:
              "Figure out mixed signals, texting behavior, and red flags",
            bgColor: "#9ED0CB",
            textColor: "#111111",
            href: "/him",
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
            imageAlt: "Group of friends together",
            title: "My Friends",
            description:
              "Spot toxic friendship patterns and emotional drama early",
            bgColor: "#EAD882",
            textColor: "#111111",
            href: "/friends",
          },
          {
            imageSrc:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
            imageAlt: "Woman speaking confidently",
            title: "Tools",
            description:
              "Use quizzes and analyzers to get clarity fast",
            bgColor: "#425E76",
            textColor: "#FFFFFF",
            href: "/tools",
          },
        ]}
      />

      <section className="bg-[#334756] py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-3/5">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Get relationship clarity <br />
                in your inbox.
              </h2>
              <p className="text-lg text-white/85 max-w-2xl">
                Quizzes, red flags, texting psychology, attraction patterns,
                and useful breakdowns you can actually use.
              </p>
            </div>

            <div className="lg:w-2/5 w-full max-w-md">
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="bg-white text-black px-6 py-4 rounded-full focus:outline-none"
                />
                <button className="bg-[#FFB8A1] text-black px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
