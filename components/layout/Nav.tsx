"use client";

import Link from "next/link";
import Image from "next/image";
import tivorLogo from "@/app/Logo.png";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { SITE } from "@/lib/content";

const LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
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
        <Link href="/" aria-label="Tivor home">
          <Image
            src={tivorLogo}
            alt="Tivor logo"
            width={52}
            height={52}
            className="rounded-full logo-theme tivor-logo"
            priority
          />
        </Link>

        {/* Center nav (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-button relative flex items-center rounded-full font-medium text-[15px] text-[var(--fg)]"
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
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src={tivorLogo}
              alt="Tivor logo"
              width={52}
              height={52}
              className="rounded-full logo-theme tivor-logo"
            />
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

        {/* Footer — socials + copyright */}
        <div className="mt-auto pt-10 flex items-end justify-between">
          <p
            className="text-[11px] text-[var(--muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              Instagram ↗
            </a>
            <a
              href={SITE.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              X ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
