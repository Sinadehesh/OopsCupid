import React from "react";

interface HeroProps {
  headline: string;
  subheadline: string;
  badge?: string;
  children?: React.ReactNode;
}

export default function Hero({ headline, subheadline, badge, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-900/20 pointer-events-none" />
      <div className="container relative mx-auto px-4 text-center">
        {badge && (
          <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 mb-6">
            {badge}
          </span>
        )}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {headline}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/70 leading-relaxed md:text-xl">
          {subheadline}
        </p>
        {children && <div className="mt-10 flex justify-center gap-4">{children}</div>}
      </div>
    </section>
  );
}
