import { ImageResponse } from "next/og";

export const alt = "Contact — Tivor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 28,
          padding: "80px",
        }}
      >
        <span
          style={{
            color: "#444444",
            fontSize: 16,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Get in touch
        </span>
        <span
          style={{
            color: "#ffffff",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          TIVOR
        </span>
        <span
          style={{
            color: "#666666",
            fontSize: 26,
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Got a project, a problem, or a half-baked idea? Let&apos;s talk.
        </span>
        <span
          style={{
            color: "#555555",
            fontSize: 18,
            marginTop: 8,
          }}
        >
          info@tivor.us
        </span>
      </div>
    ),
    { ...size }
  );
}
