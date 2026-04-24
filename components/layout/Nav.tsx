"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-5"
        style={{ backdropFilter: "blur(12px)", background: "var(--nav-bg)" }}
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[var(--border)] bg-[var(--elev)] font-semibold text-[13px] tracking-wide text-[var(--fg)] select-none"
          aria-label="Tivor home"
        >
          <span className="flex items-center gap-[2px]">
            TVR
            <span className="flex gap-[3px] ml-[3px] items-center" aria-hidden>
              <span className="w-[3px] h-[3px] rounded-full bg-[var(--fg)]" />
              <span className="w-[3px] h-[3px] rounded-full bg-[var(--fg)]" />
            </span>
          </span>
        </Link>

        {/* Center nav (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-button relative flex items-center rounded-full font-medium text-[15px] text-[var(--fg)]"
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector(".nav-button-dot") as HTMLElement | null)?.classList.add("is-hover")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector(".nav-button-dot") as HTMLElement | null)?.classList.remove("is-hover")
              }
            >
              <span className="nav-button-dot" />
              <span>{label}</span>
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex md:hidden items-center justify-center w-[52px] h-[52px] rounded-full bg-[var(--fg)] text-[var(--bg)] border-none cursor-pointer transition-transform hover:scale-95"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="flex flex-col gap-[4px]" aria-hidden>
              <span className="block w-[18px] h-[1.5px] bg-current" />
              <span className="block w-[18px] h-[1.5px] bg-current" />
              <span className="block w-[18px] h-[1.5px] bg-current" />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[var(--border)] bg-[var(--elev)] font-semibold text-[13px] text-[var(--fg)]"
            onClick={() => setMenuOpen(false)}
          >
            TVR
          </Link>
          <button
            className="flex items-center justify-center w-[52px] h-[52px] rounded-full border border-[var(--border)] text-[var(--fg)] cursor-pointer"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[clamp(2rem,8vw,3.5rem)] font-medium tracking-tight text-[var(--fg)] py-2 border-b border-[var(--border)]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
