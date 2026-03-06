import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Oops<span className="text-[var(--primary-base)]">Cupid</span>
              </span>
            </Link>
            <p className="text-foreground-secondary max-w-sm mb-6 leading-relaxed">
              Relationship, dating, and friendship analysis with a slightly cheeky but emotionally intelligent approach. Find the patterns, spot the red flags, and navigate connections better.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Topics</h3>
            <ul className="space-y-3">
              <li><Link href="/relationship-red-flags" className="text-sm text-foreground-secondary hover:text-[var(--primary-hover)] transition-colors">Relationship Red Flags</Link></li>
              <li><Link href="/dating-texting-analysis" className="text-sm text-foreground-secondary hover:text-[var(--primary-hover)] transition-colors">Dating & Texting</Link></li>
              <li><Link href="/toxic-friendships" className="text-sm text-foreground-secondary hover:text-[var(--primary-hover)] transition-colors">Toxic Friendships</Link></li>
              <li><Link href="/attraction-patterns" className="text-sm text-foreground-secondary hover:text-[var(--primary-hover)] transition-colors">Attraction Patterns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-foreground-secondary hover:text-[var(--primary-hover)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-foreground-secondary hover:text-[var(--primary-hover)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} OopsCupid. All rights reserved.</p>
          <p className="mt-2 text-xs">For entertainment and self-reflection purposes. Not a substitute for professional therapy.</p>
        </div>
      </div>
    </footer>
  );
}
