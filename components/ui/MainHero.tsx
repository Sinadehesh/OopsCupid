import React from "react";
import type { ReactNode } from "react";
import Link from "next/link";

export interface MainHeroCard {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  bgColor: string;
  textColor?: string;
  href?: string;
}

export interface MainHeroProps {
  topSubheading?: string;
  headline?: string;
  question?: string;
  subheadline?: string;
  children?: ReactNode;
  cards?: MainHeroCard[];
}

const defaultCards: MainHeroCard[] = [
  {
    imageSrc: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "woman reflecting on her relationship patterns",
    title: "Me",
    description: "Understand your dating patterns and blind spots",
    bgColor: "#00A6ED", // New Blue
    textColor: "#FFFFFF",
    href: "/me",
  },
  {
    imageSrc: "https://images.pexels.com/photos/20183378/pexels-photo-20183378.jpeg?auto=compress&cs=tinysrgb&w=600",
    imageAlt: "handsome young man in a thoughtful pose",
    title: "Him",
    description: "Decode mixed signals, texts, and red flag behavior",
    bgColor: "#DD1C1A", // Red moved from 'Me'
    textColor: "#FFFFFF",
    href: "/him",
  },
  {
    imageSrc: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
    imageAlt: "friends together but one looks uncomfortable",
    title: "My Friends",
    description: "Identify toxic friendships and one-sided connections",
    bgColor: "#7FB800", // New Green
    textColor: "#FFFFFF", // Changed from Teal to White
    href: "/friends",
  },
  {
    imageSrc: "https://img.freepik.com/free-photo/two-people-love-walking-beach-generated-by-ai_188544-18425.jpg?semt=ais_rp_50_assets&w=600&q=75",
    imageAlt: "two people walking on a beach representing relationship tools",
    title: "Free Tools",
    description: "Chat analyzer, quizzes, and profile readers",
    bgColor: "#086788", // Kept same
    textColor: "#FFFFFF",
    href: "/tools",
  },
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-2 inline-block h-5 w-5 align-[-3px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h13" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function HeroCard({ card }: { card: MainHeroCard }) {
  const textColor = card.textColor ?? "#111111";

  const CardContent = (
    <div className="h-full w-full flex flex-col">
      <div className="h-[180px] md:h-[200px] w-full overflow-hidden shrink-0">
        <img src={card.imageSrc} alt={card.imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-6 md:py-8 text-center">
        <h3 className="text-[28px] md:text-[32px] font-extrabold leading-[1.1] tracking-tight">{card.title}</h3>
        <p className="mx-auto mt-4 max-w-[240px] text-[16px] md:text-[18px] font-medium leading-[1.4] opacity-90">
          {card.description}
          <ArrowIcon />
        </p>
      </div>
    </div>
  );

  const wrapperClass = "group flex flex-col h-full overflow-hidden rounded-[24px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5";
  
  if (card.href) {
    return <Link href={card.href} className={wrapperClass} style={{ backgroundColor: card.bgColor, color: textColor }}>{CardContent}</Link>;
  }
  return <a href="#" className={wrapperClass} style={{ backgroundColor: card.bgColor, color: textColor }}>{CardContent}</a>;
}

export default function MainHero(props: MainHeroProps) {
  const {
    topSubheading = "WELCOME TO OOPSCUPID",
    headline = "Relationship Red Flags, Mixed Signals & Dating Pattern Quizzes",
    question, subheadline, children, cards = defaultCards,
  } = props;

  const displayQuestion = question || subheadline || "Not sure if he likes you or just likes the attention? Spot red flags, decode texts, and understand why you keep ending up in the same situations.";

  return (
    <section className="relative overflow-hidden bg-white pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20">
      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 lg:px-14">
        
        {/* SHORTER, PUNCHIER HERO TEXT TO KEEP CARDS ABOVE THE FOLD */}
        <div className="mx-auto max-w-4xl text-center mb-10 md:mb-14">
          {topSubheading && (
            <p className="mb-4 text-sm md:text-base font-extrabold tracking-[0.2em] text-[#DD1C1A]">
              {topSubheading}
            </p>
          )}
          <h1 className="text-[38px] leading-[1.1] tracking-tight font-extrabold text-[#086788] sm:text-[46px] md:text-[56px] lg:text-[64px]">
            {headline}
          </h1>
          {displayQuestion && (
            <p className="mx-auto mt-6 max-w-[700px] text-[18px] md:text-[20px] font-medium leading-[1.6] text-[#086788]/70">
              {displayQuestion}
            </p>
          )}
        </div>

        {children ? (
          <div className="relative z-20">{children}</div>
        ) : (
          <div className="relative z-20">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <HeroCard key={`${card.title}-${card.description}`} card={card} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WAVE DIVIDER CONNECTING TO THE CREAM BACKGROUND BELOW */}
      <div className="absolute bottom-0 left-0 w-full z-0 h-[40px] md:h-[80px]">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="block h-full w-full" aria-hidden="true">
          <path fill="#FFF1D0" d="M0,100 L1440,100 L1440,80 C1160,20 920,0 720,40 C520,80 280,20 0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
