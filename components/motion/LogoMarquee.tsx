"use client";

const LOGOS = [
  { name: "Manuf AI",   src: "/logos/manuf-ai.png",   w: 120, fit: "cover",   pos: "center center", bg: undefined  },
  { name: "Procure AI", src: "/logos/procure-ai.png",  w: 110, fit: "cover",   pos: "center center", bg: undefined  },
  { name: "Observex",   src: "/logos/observex.jpg",    w: 110, fit: "contain", pos: "center center", bg: undefined  },
  { name: "JobReady",   src: "/logos/jobready.png",    w: 110, fit: "contain", pos: "center center", bg: "#ffffff"  },
  { name: "Outreach",   src: "/logos/orange-o.png",    w: 52,  fit: "cover",   pos: "center center", bg: undefined  },
];

function LogoSet({ id }: { id: string }) {
  return (
    <>
      {LOGOS.flatMap((logo, i) => [
        <div
          key={`${id}-${i}`}
          style={{
            position: "relative",
            width: logo.w,
            height: 48,
            flexShrink: 0,
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            overflow: "hidden",
            backgroundColor: logo.bg ?? "transparent",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={logo.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: logo.pos,
              display: "block",
            }}
          />
        </div>,
        <span
          key={`${id}-sep-${i}`}
          style={{ flexShrink: 0, opacity: 0.25, fontSize: 10, color: "var(--muted)" }}
          aria-hidden="true"
        >
          ◆
        </span>,
      ])}
    </>
  );
}

export function LogoMarquee({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <div className="logo-track">
        <LogoSet id="a" />
        <LogoSet id="b" />
        <LogoSet id="c" />
        <LogoSet id="d" />
      </div>
    </div>
  );
}
