import { ImageResponse } from "next/og";

export const alt = "About — Tivor";
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
          About
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
          Custom AI systems for manufacturing, procurement, and HR.
        </span>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 16,
          }}
        >
          {["Strategy", "Design", "Engineering"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "#888",
                fontSize: 14,
                padding: "6px 16px",
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
