import Link from 'next/link';

const linkClass = "text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors";

export default function Footer() {
  return (
    <footer className="bg-[#F3ECEB] pt-16 pb-8 md:pt-20 md:pb-12 text-[#334B63]">
      <div className="container mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">His Behavior</h3>
            <ul className="space-y-4">
              <li><Link href="/is-he-cheating" className={linkClass}>Is He Cheating? Test</Link></li>
              <li><Link href="/is-he-manipulative" className={linkClass}>Is He Manipulative? Test</Link></li>
              <li><Link href="/is-he-gaslighting-me" className={linkClass}>Is He Gaslighting Me? Test</Link></li>
              <li><Link href="/partners-attachment-style" className={linkClass}>His Attachment Style Quiz</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Your Patterns</h3>
            <ul className="space-y-4">
              <li><Link href="/attachment-style-quiz" className={linkClass}>Attachment Style Quiz</Link></li>
              <li><Link href="/why-do-i-attract-toxic-people" className={linkClass}>Why Do I Attract Toxic People?</Link></li>
              <li><Link href="/why-do-i-sabotage-relationships" className={linkClass}>Why Do I Sabotage Relationships?</Link></li>
              <li><Link href="/toxic-friend-test" className={linkClass}>Toxic Friend Test</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Guides</h3>
            <ul className="space-y-4">
              <li><Link href="/relationship-red-flags" className={linkClass}>Relationship Red Flags</Link></li>
              <li><Link href="/gaslighting-signs" className={linkClass}>Gaslighting Signs</Link></li>
              <li><Link href="/love-bombing-signs" className={linkClass}>Love Bombing Signs</Link></li>
              <li><Link href="/trauma-bonding-signs" className={linkClass}>Trauma Bonding Signs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[15px] text-[#334B63] mb-6">Work With Us</h3>
            <ul className="space-y-4">
              <li><Link href="/coaching" className={linkClass}>1:1 Clarity Coaching</Link></li>
              <li><Link href="/quizzes" className={linkClass}>All Free Quizzes</Link></li>
              <li><Link href="/privacy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link href="/terms" className={linkClass}>Terms of Use</Link></li>
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
