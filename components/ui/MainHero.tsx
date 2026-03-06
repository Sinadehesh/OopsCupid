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
    imageAlt: "Couple sitting together",
    title: "Couples",
    description: "Build a foundation for a lifetime of love",
    bgColor: "#F1A08B",
    textColor: "#111111",
    href: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Parents hugging children",
    title: "Parents",
    description: "Raise emotionally intelligent children",
    bgColor: "#9ED0CB",
    textColor: "#111111",
    href: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Single woman smiling at phone",
    title: "Singles",
    description: "Build lasting and stable relationships",
    bgColor: "#EAD882",
    textColor: "#111111",
    href: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Professional speaking",
    title: "Professionals",
    description: "Become a Gottman Method expert",
    bgColor: "#425E76",
    textColor: "#FFFFFF",
    href: "#",
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
    topSubheading,
    headline,
    question,
    subheadline,
    children,
    cards = defaultCards,
  } = props;

  const displayQuestion = question || subheadline;

  return (
    <section className="relative overflow-hidden bg-[#F9F4F4] pt-8 md:pt-10 lg:pt-12 pb-20 md:pb-24 lg:pb-28">
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
          background:
            `
            radial-gradient(circle at 18% 14%, rgba(255, 182, 213, 0.18), transparent 26%),
            radial-gradient(circle at 82% 12%, rgba(255, 210, 225, 0.16), transparent 24%),
            linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 100%)
            `,
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-6 md:px-10 lg:px-14">
        <div className="mx-auto max-w-[980px] text-center">
          {topSubheading && (
            <p className="mb-2 text-[28px] font-normal leading-[1.08] tracking-[-0.03em] text-[#8A6D85] md:text-[42px] lg:text-[52px]">
              {topSubheading}
            </p>
          )}

          <h1 className="text-[64px] font-semibold leading-[0.94] tracking-[-0.055em] text-[#5A7492] md:text-[100px] lg:text-[124px]">
            {headline}
          </h1>

          {displayQuestion && (
            <p className="mx-auto mt-6 max-w-[980px] text-[18px] font-normal leading-[1.35] tracking-[-0.02em] text-[#667E99] md:mt-8 md:text-[30px] lg:text-[38px]">
              {displayQuestion}
            </p>
          )}
        </div>

        {children ? (
          <div className="relative z-20 mt-10 md:mt-12 lg:mt-14">{children}</div>
        ) : (
          <div className="relative z-20 mt-10 md:mt-12 lg:mt-14">
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

      <div className="relative z-0 -mt-8 h-[110px] md:h-[135px] lg:h-[165px]">
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="block h-full w-full"
          aria-hidden="true"
        >
          <path
            fill="#F3ECEB"
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
