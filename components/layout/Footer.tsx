import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#F3ECEB] pt-16 pb-8 md:pt-20 md:pb-12 text-[#334B63]">
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Tools</h3>
            <ul className="space-y-4">
              <li><Link href="/tools/chat-analyzer" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Chat Analyzer</Link></li>
              <li><Link href="/tools/profile-analyzer" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Dating Profile Analyzer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Quizzes</h3>
            <ul className="space-y-4">
              <li><Link href="/quizzes/is-he-a-red-flag" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Is He a Red Flag?</Link></li>
              <li><Link href="/quizzes/toxic-friend-test" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Toxic Friend Test</Link></li>
              <li><Link href="/quizzes/attraction-patterns" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Attraction Patterns Quiz</Link></li>
              <li><Link href="/quizzes/breadcrumbing" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Is He Breadcrumbing Me?</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Articles</h3>
            <ul className="space-y-4">
              <li><Link href="/relationship-red-flags" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Relationship Red Flags</Link></li>
              <li><Link href="/dating-texting-analysis" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Dating & Texting</Link></li>
              <li><Link href="/toxic-friendships" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Toxic Friendships</Link></li>
              <li><Link href="/attraction-patterns" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Attraction Patterns</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Info</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">About OopsCupid</Link></li>
              <li><Link href="/privacy" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Terms of Use</Link></li>
              <li><Link href="/contact" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[rgba(51,75,99,0.10)] flex flex-col justify-between items-center text-sm text-[#8A6D85] font-normal">
          <p>© 2026 OopsCupid — Free Relationship Quizzes & Red Flag Analysis for Women</p>
        </div>
      </div>
    </footer>
  );
}
