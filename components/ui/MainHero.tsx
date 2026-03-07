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
    imageSrc:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "woman reflecting on her relationship patterns",
    title: "Me",
    description: "Understand your dating patterns and blind spots",
    bgColor: "#F1A08B",
    textColor: "#111111",
    href: "/me",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "woman reading confusing text messages on her phone",
    title: "Him",
    description: "Decode mixed signals, texts, and red flag behavior",
    bgColor: "#9ED0CB",
    textColor: "#111111",
    href: "/him",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
    imageAlt: "friends together but one looks uncomfortable",
    title: "My Friends",
    description: "Identify toxic friendships and one-sided connections",
    bgColor: "#EAD882",
    textColor: "#111111",
    href: "/friends",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "woman confidently using relationship clarity tool",
    title: "Free Tools",
    description: "Chat analyzer, quizzes, and profile readers",
    bgColor: "#425E76",
    textColor: "#FFFFFF",
    href: "/tools",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="ml-2 inline-block h-5 w-5 align-[-3px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function HeroCard({ card }: { card: MainHeroCard }) {
  const textColor = card.textColor ?? "#111111";

  // Use Link if href exists
  const CardContent = (
    <div className="h-full w-full">
      <div className="h-[225px] w-full overflow-hidden">
        <img
          src={card.imageSrc}
          alt={card.imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex min-h-[250px] flex-col justify-center px-8 pt-6 pb-10 text-center md:px-6 md:min-h-[280px] lg:px-8">
        <h3 className="text-[32px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.02em]">
          {card.title}
        </h3>

        <p className="mx-auto mt-6 max-w-[280px] text-[18px] md:text-[20px] font-normal leading-[1.5] tracking-tight">
          {card.description}
          <ArrowIcon />
        </p>
      </div>
    </div>
  );

  const wrapperClass = "group block h-full overflow-hidden rounded-[18px] shadow-sm transition-transform duration-200 hover:-translate-y-1";
  
  if (card.href) {
    return (
      <Link href={card.href} className={wrapperClass} style={{ backgroundColor: card.bgColor, color: textColor }}>
        {CardContent}
      </Link>
    );
  }

  return (
    <a href="#" className={wrapperClass} style={{ backgroundColor: card.bgColor, color: textColor }}>
      {CardContent}
    </a>
  );
}

export default function MainHero(props: MainHeroProps) {
  const {
    topSubheading = "Welcome to OopsCupid",
    headline = "Relationship Red Flags, Mixed Signals & Dating Pattern Quizzes for Women",
    question,
    subheadline,
    children,
    cards = defaultCards,
  } = props;

  const displayQuestion =
    question || subheadline || 
    "Not sure if he likes you or just likes the attention? OopsCupid helps you spot red flags, decode his texts, and understand why you keep ending up in the same situation.";

  return (
    <section className="relative overflow-hidden bg-[#F9F4F4] pt-3 md:pt-4 lg:pt-5 pb-14 md:pb-18 lg:pb-22">
      {/* subtle texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(108, 96, 116, 0.18) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 9px 9px",
        }}
      />

      {/* light feminine gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 18% 14%, rgba(255, 182, 213, 0.18), transparent 26%),
            radial-gradient(circle at 82% 12%, rgba(255, 210, 225, 0.16), transparent 24%),
            linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1000px] text-center">
          {topSubheading && (
            <p className="mb-2 text-[20px] md:text-[22px] font-normal leading-[1.2] text-[#8A6D85]">
              {topSubheading}
            </p>
          )}

          <h1 className="text-[40px] leading-[1.05] tracking-tight font-semibold text-[#334B63] sm:text-[46px] md:text-[60px] lg:text-[76px]">
            {headline}
          </h1>

          {displayQuestion && (
            <p className="mx-auto mt-6 max-w-[880px] text-[18px] md:text-[22px] lg:text-[24px] font-normal leading-[1.5] text-[#5E6E79]">
              {displayQuestion}
            </p>
          )}
        </div>

        {children ? (
          <div className="relative z-20 mt-10 md:mt-12 lg:mt-14">{children}</div>
        ) : (
          <div className="relative z-20 mt-10 md:mt-14 lg:mt-16">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <HeroCard
                  key={`${card.title}-${card.description}`}
                  card={card}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-0 -mt-8 h-[70px] sm:h-[110px] md:h-[135px] lg:h-[165px]">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="block h-full w-full"
          aria-hidden="true"
        >
          <path
            fill="#FFFDFC"
            d="M0,48
               C95,26 185,18 280,28
               C405,42 515,79 650,86
               C800,94 920,58 1045,40
               C1160,24 1280,24 1440,48
               L1440,220
               L0,220
               Z"
          />
        </svg>
      </div>
    </section>
  );
}
