import Link from "next/link";
import { Container } from "./Container";
import { SITE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-12 mt-auto">
      <Container className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-[13px] tracking-wide text-[var(--fg)]">
            TIVOR
          </p>
          <p className="text-[13px] text-[var(--muted)] mt-1">
            Strategic AI Systems
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-[13px] text-[var(--muted)]">
          <Link href="/work" className="hover:text-[var(--fg)] transition-colors">
            Work
          </Link>
          <Link href="/about" className="hover:text-[var(--fg)] transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-[var(--fg)] transition-colors">
            Contact
          </Link>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)] transition-colors"
          >
            Instagram
          </a>
          <a
            href={SITE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--fg)] transition-colors"
          >
            X
          </a>
        </div>

        <p className="text-[12px] text-[var(--muted)]">
          © {new Date().getFullYear()} Tivor
        </p>
      </Container>
    </footer>
  );
}
