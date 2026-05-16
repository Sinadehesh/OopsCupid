"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogIn, LogOut, BookOpen } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session, status } = useSession();

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
        <div className="hidden md:flex items-center gap-1">
          <nav aria-label="Main navigation" className="flex items-center gap-1">
            {navLinks.map((link) => {
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

          {/* Auth — Desktop */}
          <div className="ml-3 pl-3 border-l border-[rgba(51,75,99,0.12)] flex items-center">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-[#F3ECEB] animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full pl-1 pr-3 py-1 hover:bg-[#F3ECEB] transition-all duration-200"
                  aria-label="Account menu"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "User"}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#FFB8A1] flex items-center justify-center text-white text-xs font-bold">
                      {session.user?.name?.[0] ?? "?"}
                    </div>
                  )}
                  <span className="text-[14px] font-medium text-[#334B63] max-w-[100px] truncate">
                    {session.user?.name?.split(" ")[0]}
                  </span>
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 z-20 w-52 rounded-2xl bg-white shadow-xl border border-[rgba(51,75,99,0.1)] py-2 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[rgba(51,75,99,0.08)]">
                        <p className="text-[13px] font-semibold text-[#334B63] truncate">{session.user?.name}</p>
                        <p className="text-[12px] text-[#8A9BA8] truncate">{session.user?.email}</p>
                      </div>
                      <Link
                        href="/workbook/anxious-attachment"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#5E6E79] hover:bg-[#F9F4F4] hover:text-[#334B63] transition-colors"
                      >
                        <BookOpen className="w-4 h-4" />
                        My Workbook
                      </Link>
                      <button
                        onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/" }); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#C0756A] hover:bg-[#FFF4F2] transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full px-4 py-1.5 bg-[#334B63] text-white text-[14px] font-semibold hover:bg-[#2A3D52] transition-all duration-200 shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Sign in
              </Link>
            )}
          </div>
        </div>

        {/* Mobile — right side: auth + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          {status !== "loading" && (
            session ? (
              <Link href="/workbook/anxious-attachment" className="flex items-center">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#FFB8A1] flex items-center justify-center text-white text-xs font-bold">
                    {session.user?.name?.[0] ?? "?"}
                  </div>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-[#334B63] text-white text-[13px] font-semibold hover:bg-[#2A3D52] transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                Sign in
              </Link>
            )
          )}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex rounded-full p-2 text-[#5E6E79] hover:bg-[#F3ECEB]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
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
          {session ? (
            <button
              onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
              className="mt-3 flex items-center gap-2 text-[15px] font-medium text-[#C0756A] hover:text-[#A0554A] transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex items-center gap-2 text-[15px] font-semibold text-[#334B63] hover:text-[#5A7492] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
