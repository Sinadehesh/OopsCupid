import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary-600 transition-colors">
            Oops<span className="text-accent-500 group-hover:text-accent-600 transition-colors">Cupid</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/relationship-red-flags" className="text-sm font-medium text-foreground/80 hover:text-primary-600 transition-colors">Red Flags</Link>
          <Link href="/dating-texting-analysis" className="text-sm font-medium text-foreground/80 hover:text-primary-600 transition-colors">Text Analysis</Link>
          <Link href="/toxic-friendships" className="text-sm font-medium text-foreground/80 hover:text-primary-600 transition-colors">Friendships</Link>
          <Link href="/attraction-patterns" className="text-sm font-medium text-foreground/80 hover:text-primary-600 transition-colors">Patterns</Link>
        </nav>
        <div className="flex md:hidden">
            {/* Mobile menu placeholder */}
            <button className="p-2 text-foreground" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </div>
      </div>
    </header>
  );
}
