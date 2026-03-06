import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  description?: string;
  href: string;
  category?: string;
}

export default function Card({ title, description, href, category }: CardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg bg-surface border border-border p-8 shadow-sm hover:shadow-md transition-smooth hover:border-primary-base/30"
    >
      {category && (
        <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-secondary-base/60">
          {category}
        </span>
      )}
      <h3 className="mb-3 text-2xl font-bold text-foreground font-serif group-hover:text-primary-base transition-colors leading-tight">
        {title}
      </h3>
      {description && (
        <p className="text-base text-foreground-secondary leading-relaxed mb-6">
          {description}
        </p>
      )}
      <div className="flex items-center text-sm font-bold text-primary-base uppercase tracking-wider">
        Read more
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
        >
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </Link>
  );
}
