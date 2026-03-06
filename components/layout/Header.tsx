import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight text-foreground transition-colors italic font-serif">
            OopsCupid
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/relationship-red-flags" className="text-sm font-semibold text-foreground/80 hover:text-primary-base transition-colors">Red Flags</Link>
          <Link href="/dating-texting-analysis" className="text-sm font-semibold text-foreground/80 hover:text-primary-base transition-colors">Text Analysis</Link>
          <Link href="/toxic-friendships" className="text-sm font-semibold text-foreground/80 hover:text-primary-base transition-colors">Friendships</Link>
          <Link href="/attraction-patterns" className="text-sm font-semibold text-foreground/80 hover:text-primary-base transition-colors">Patterns</Link>
          <Link href="/blog" className="text-sm font-semibold text-foreground/80 hover:text-primary-base transition-colors">Blog</Link>
        </nav>
        <div className="flex items-center gap-4">
            <Link href="/chat-analyzer" className="hidden sm:inline-flex text-sm font-bold text-secondary-base hover:text-primary-base transition-colors border-b-2 border-transparent hover:border-primary-base">
                Try a Tool
            </Link>
            <div className="lg:hidden">
                <button className="p-2 text-foreground/70 hover:text-foreground transition-colors" aria-label="Menu">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </div>
      </div>
    </header>
  );
}
