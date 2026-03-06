import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background py-20 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-medium tracking-tight text-[#334B63] transition-colors font-serif">
                OopsCupid
              </span>
            </Link>
            <p className="text-foreground-secondary max-w-sm mb-8 leading-relaxed font-medium">
              A modern relationship clarity platform. We decode the mixed signals, text patterns, and red flags so you can navigate connections with intelligence.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">Tools</h3>
            <ul className="space-y-4">
              <li><Link href="/chat-analyzer" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Chat Analyzer</Link></li>
              <li><Link href="/dating-profile-analyzer" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Profile Analyzer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">Quizzes</h3>
            <ul className="space-y-4">
              <li><Link href="/is-he-cheating" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Is He Cheating?</Link></li>
              <li><Link href="/toxic-friend-test" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Toxic Friend Test</Link></li>
              <li><Link href="/is-he-gaslighting-me" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Gaslighting Test</Link></li>
              <li><Link href="/attraction-patterns" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Pattern Audit</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-widest text-xs text-foreground mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-sm font-semibold text-foreground-secondary hover:text-primary-base transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-foreground-muted font-medium">
          <p>&copy; {new Date().getFullYear()} OopsCupid Relationship Intelligence.</p>
          <p className="text-xs italic">For self-reflection purposes. Not a substitute for professional therapy.</p>
        </div>
      </div>
    </footer>
  );
}
