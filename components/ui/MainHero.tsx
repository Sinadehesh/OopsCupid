import React from "react";
import type { ReactNode } from "react";

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
  headline: string;
  question?: string;
  subheadline?: string;
  children?: ReactNode;
  cards?: MainHeroCard[];
}

const defaultCards: MainHeroCard[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Woman reflecting on her relationship",
    title: "Me",
    description: "Understand your patterns, doubts, and dating blind spots",
    bgColor: "#F1A08B",
    textColor: "#111111",
    href: "/me",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Person checking messages on a phone",
    title: "Him",
    description: "Figure out mixed signals, texting behavior, and red flags",
    bgColor: "#9ED0CB",
    textColor: "#111111",
    href: "/him",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Group of friends together",
    title: "My Friends",
    description: "Spot toxic friendship patterns and emotional drama early",
    bgColor: "#EAD882",
    textColor: "#111111",
    href: "/friends",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Woman speaking confidently",
    title: "Tools",
    description: "Use quizzes and analyzers to get clarity fast",
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
      className="ml-2 inline-block h-6 w-6 align-[-3px]"
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

  return (
    <a
      href={card.href ?? "#"}
      className="group block overflow-hidden rounded-[18px] shadow-none transition-transform duration-200 hover:-translate-y-1"
      style={{ backgroundColor: card.bgColor, color: textColor }}
    >
      <div className="h-[225px] w-full overflow-hidden">
        <img
          src={card.imageSrc}
          alt={card.imageAlt}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-h-[275px] flex-col px-8 pt-8 pb-10 text-center">
        <h3 className="text-[42px] font-semibold leading-[1.02] tracking-[-0.03em]">
          {card.title}
        </h3>

        <p className="mx-auto mt-8 max-w-[280px] text-[22px] leading-[1.55] tracking-[-0.01em]">
          {card.description}
          <ArrowIcon />
        </p>
      </div>
    </a>
  );
}

export default function MainHero(props: MainHeroProps) {
  const {
    topSubheading = "Welcome to",
    headline = "OopsCupid",
    question,
    subheadline,
    children,
    cards = defaultCards,
  } = props;

  const displayQuestion =
    question ||
    subheadline ||
    "How can we help you understand the people, patterns, and red flags confusing you?";

  return (
    <section className="relative overflow-hidden bg-[#F6F3EE] pt-10 md:pt-12 lg:pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(81, 92, 102, 0.16) 0.7px, transparent 0.7px)",
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 9px 9px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1100px] text-center">
          {topSubheading && (
            <p className="mb-2 text-[42px] font-normal leading-[1.08] tracking-[-0.035em] text-[#48627A] md:text-[58px] lg:text-[68px]">
              {topSubheading}
            </p>
          )}

          <h1 className="text-[88px] font-semibold leading-[0.9] tracking-[-0.06em] text-[#48627A] md:text-[138px] lg:text-[166px]">
            {headline}
          </h1>

          {displayQuestion && (
            <p className="mx-auto mt-8 max-w-[1260px] text-[24px] font-normal leading-[1.32] tracking-[-0.028em] text-[#48627A] md:mt-10 md:text-[40px] lg:text-[54px]">
              {displayQuestion}
            </p>
          )}
        </div>

        {children ? (
          <div className="relative z-20 mt-12 md:mt-14 lg:mt-16">{children}</div>
        ) : (
          <div className="relative z-20 mt-12 md:mt-14 lg:mt-16">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="relative z-0 -mt-10 h-[120px] md:h-[150px] lg:h-[190px]">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="block h-full w-full"
          aria-hidden="true"
        >
          <path
            fill="#EFEAE2"
            d="M0,42
               C75,24 150,16 240,26
               C360,39 460,78 585,86
               C705,95 810,63 920,45
               C1035,26 1140,23 1245,36
               C1325,46 1385,59 1440,48
               L1440,220
               L0,220
               Z"
          />
        </svg>
      </div>
    </section>
  );
}
