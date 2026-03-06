import React from "react";

interface HeroProps {
  headline: string;
  subheadline: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function Hero({ headline, subheadline, badge, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-24 md:pt-32 md:pb-36 border-b border-border">
      <div className="container relative mx-auto px-4 text-center">
        {badge && (
          <span className="inline-flex items-center rounded-full bg-secondary-base/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-secondary-base border border-secondary-base/10 mb-8">
            {badge}
          </span>
        )}
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl font-serif italic italic leading-[1.1]">
          {headline}
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-foreground-secondary leading-relaxed md:text-xl">
          {subheadline}
        </p>
        {children && <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
