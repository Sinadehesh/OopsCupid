interface HeroProps {
  headline: string;
  subheadline: string;
}

export default function Hero({ headline, subheadline }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-background pt-32 pb-48 md:pt-40 md:pb-60">
      {/* Grainy Texture Layer */}
      <div className="absolute inset-0 bg-grainy pointer-events-none opacity-[0.03]" />
      
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="mx-auto max-w-4xl text-foreground font-medium">
          <span className="block text-4xl md:text-5xl lg:text-6xl mb-2">Welcome to</span>
          <span className="block text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#334B63]">
            OopsCupid
          </span>
        </h1>
        <p className="mx-auto mt-12 max-w-3xl text-xl text-[#5E6E79] lg:text-2xl font-medium tracking-tight">
          {subheadline}
        </p>
      </div>

      {/* Decorative Wave Transition (Inspired by Gottman) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[100px] fill-background-secondary"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.14,213.6,110.14,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
