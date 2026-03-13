"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "All Quizzes", href: "/quizzes", title: "All Quizzes" },
  { label: "All Resources", href: "/articles", title: "All Resources & Essays" },
  { label: "Me", href: "/me", title: "Me Hub" },
  { label: "Him", href: "/him", title: "Him Hub" },
  { label: "Friends", href: "/friends", title: "Friends Hub" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(51,75,99,0.08)] bg-[#F9F4F4]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-3 md:px-10 md:py-4 lg:px-14">

        {/* Left — Logo & Wordmark */}
        <Link
          href="/"
          aria-label="OopsCupid — Free Relationship Quizzes and Red Flag Analysis"
          className="flex items-center gap-[4px] group"
        >
          <Image 
            src="/logo.png" 
            alt="OopsCupid Logo" 
            width={32} 
            height={32} 
            className="mr-1 rounded-sm object-contain transition-transform duration-200 group-hover:scale-105"
          />
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

        {/* Center/Right — Desktop Nav */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link) => {
            // Highlight link if the path matches exactly or starts with the link's href + a slash
            const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
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
        </nav>
      )}
    </header>
  );
}
