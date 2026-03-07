import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F9F4F4] py-3 md:py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left: Brand logo area */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-semibold tracking-tight text-[#334B63]">
            OopsCupid
          </span>
        </Link>

        {/* Center: 4 inline navigation links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link href="/relationship-red-flags" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Red Flags</Link>
          <Link href="/dating-texting-analysis" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Texting</Link>
          <Link href="/toxic-friendships" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Friendships</Link>
          <Link href="/attraction-patterns" className="text-[15px] font-normal text-[#5E6E79] hover:text-[#334B63] transition-colors">Patterns</Link>
        </div>

        {/* Right: My Account, Search, Cart */}
        <div className="flex items-center gap-4 md:gap-6">
            <Link 
              href="/account" 
              className="hidden sm:inline-block px-6 py-2 border border-[#5A7492] rounded-full text-[15px] font-semibold text-[#5A7492] hover:bg-[#5A7492] hover:text-white transition-all duration-200"
            >
                My Account
            </Link>
            <button aria-label="Search" className="text-[#334B63] hover:text-[#5A7492] transition-colors">
                <Search className="h-5 w-5 md:h-[22px] md:w-[22px]" />
            </button>
            <button aria-label="Cart" className="relative text-[#334B63] hover:text-[#5A7492] transition-colors">
                <ShoppingCart className="h-5 w-5 md:h-[22px] md:w-[22px]" />
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFB8A1] text-[10px] font-bold text-[#111111]">
                  3
                </span>
            </button>
        </div>
      </div>
    </nav>
  );
}
