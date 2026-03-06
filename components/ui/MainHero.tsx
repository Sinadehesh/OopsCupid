import React from "react";
import type { ReactNode } from "react";

export interface MainHeroProps {
  topSubheading?: string;
  headline: string;
  question?: string;
  subheadline?: string; // Backward compatibility
  children?: ReactNode;
}

export default function MainHero(props: MainHeroProps) {
  const { topSubheading, headline, question, subheadline, children } = props;
  
  const displayQuestion = question || subheadline;
  
  return (
    <section className="relative overflow-hidden bg-[#F8F7F3] pt-20 pb-40 md:pt-32 md:pb-64">
      <div className="container relative mx-auto px-4 text-center">
        <div className="relative z-30 flex flex-col items-center">
          {/* Element 1: Medium-sized, regular weight subheading */}
          {topSubheading && (
            <span className="text-xl md:text-2xl font-normal text-[#5E6E79] mb-6">
              {topSubheading}
            </span>
          )}

          {/* Element 2: Massive, bold primary headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#334756] mb-8 leading-[1.1]">
            {headline}
          </h1>

          {/* Element 3: Slightly larger, regular weight sub-headline asking a question */}
          {displayQuestion && (
            <p className="text-2xl md:text-3xl font-normal text-[#5E6E79] max-w-3xl leading-relaxed">
              {displayQuestion}
            </p>
          )}
        </div>

        {children && (
          <div className="relative z-40 mt-16">
            {children}
          </div>
        )}
      </div>

      {/* Decorative Organic Wave (Inspired by user request) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[100px] md:h-[180px] fill-[#F1EBE4]"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" transform="scale(1, -1) translate(0, -120)"></path>
        </svg>
      </div>
    </section>
  );
}
