import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full bg-transparent">
      <div className="container mx-auto px-4 py-8 flex items-center justify-between">
        {/* Left: Brand logo area */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-tight text-[#334756]">
            OopsCupid
          </span>
        </Link>

        {/* Center: 4 inline navigation links */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/relationship-red-flags" className="text-sm font-medium text-[#5E6E79] hover:text-[#334756] transition-colors">Red Flags</Link>
          <Link href="/dating-texting-analysis" className="text-sm font-medium text-[#5E6E79] hover:text-[#334756] transition-colors">Texting</Link>
          <Link href="/toxic-friendships" className="text-sm font-medium text-[#5E6E79] hover:text-[#334756] transition-colors">Friendships</Link>
          <Link href="/attraction-patterns" className="text-sm font-medium text-[#5E6E79] hover:text-[#334756] transition-colors">Patterns</Link>
        </nav>

        {/* Right: My Account, Search, Cart */}
        <div className="flex items-center gap-6">
            <Link 
              href="/account" 
              className="px-6 py-2 border border-[#334756] rounded-full text-sm font-medium text-[#334756] hover:bg-[#334756] hover:text-white transition-all"
            >
                My Account
            </Link>
            <button className="text-[#334756] hover:opacity-70 transition-opacity">
                <Search size={22} />
            </button>
            <button className="relative text-[#334756] hover:opacity-70 transition-opacity">
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  3
                </span>
            </button>
        </div>
      </div>
    </header>
  );
}
