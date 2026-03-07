"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Red Flags", href: "/relationship-red-flags", title: "Relationship Red Flags" },
  { label: "Texting", href: "/dating-texting-analysis", title: "Dating Texting Analysis" },
  { label: "Friendships", href: "/toxic-friendships", title: "Toxic Friendship Signs" },
  { label: "Patterns", href: "/dating-patterns", title: "Dating Pattern Quiz" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(51,75,99,0.08)] bg-[#F9F4F4]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3 md:px-10 md:py-4 lg:px-14">

        {/* Left — Wordmark */}
        <Link
          href="/"
          aria-label="OopsCupid — Free Relationship Quizzes and Red Flag Analysis"
          className="flex items-baseline gap-[3px] group"
        >
          <span
            className="text-[22px] font-semibold tracking-[-0.04em] text-[#334B63] transition-colors duration-200 group-hover:text-[#5A7492]"
            style={{ fontFamily: "var(--font-nunito), system-ui, sans-serif" }}
          >
            Oops
          </span>
          <span
            className="text-[22px] tracking-[-0.02em] text-[#FFB8A1] transition-colors duration-200 group-hover:text-[#F0A090]"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            Cupid
          </span>
        </Link>

        {/* Center — Desktop Nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.title}
                className={`rounded-full px-4 py-1.5 text-[15px] font-medium tracking-[-0.01em] transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#F3ECEB] text-[#334B63]"
                      : "text-[#5E6E79] hover:bg-[#F3ECEB] hover:text-[#334B63]"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right — Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            aria-label="Search OopsCupid"
            className="rounded-full p-2 text-[#5E6E79] transition-colors duration-200 hover:bg-[#F3ECEB] hover:text-[#334B63]"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <button
            aria-label="Shopping cart"
            className="relative rounded-full p-2 text-[#5E6E79] transition-colors duration-200 hover:bg-[#F3ECEB] hover:text-[#334B63]"
          >
            <ShoppingCart className="h-[18px] w-[18px]" />
            <span
              aria-label="3 items in cart"
              className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FFB8A1] text-[10px] font-semibold text-black"
            >
              3
            </span>
          </button>

          <Link
            href="/account"
            className="rounded-full border border-[#5A7492] px-5 py-1.5 text-[14px] font-semibold text-[#5A7492] transition-all duration-200 hover:bg-[#5A7492] hover:text-white"
          >
            My Account
          </Link>
        </div>

        {/* Mobile — Hamburger */}
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex md:hidden rounded-full p-2 text-[#5E6E79] hover:bg-[#F3ECEB]"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col border-t border-[rgba(51,75,99,0.08)] bg-[#F9F4F4] px-6 pb-6 pt-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              title={link.title}
              onClick={() => setMobileOpen(false)}
              className="py-3 text-[16px] font-medium text-[#5E6E79] border-b border-[rgba(51,75,99,0.06)] last:border-0 hover:text-[#334B63] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/account"
            className="mt-5 rounded-full border border-[#5A7492] px-5 py-2.5 text-center text-[15px] font-semibold text-[#5A7492]"
          >
            My Account
          </Link>
        </nav>
      )}
    </header>
  );
}
