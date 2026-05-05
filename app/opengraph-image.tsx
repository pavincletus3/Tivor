import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Tivor — Strategic AI Systems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = readFileSync(join(process.cwd(), "public/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  const bebasFont = await fetch(
    "https://fonts.gstatic.com/s/bebasneue/v14/JTUSjIg69CK48gW7PXooxW5rygbi49c.woff2"
  ).then((r) => r.arrayBuffer());

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <img
            src={logoBase64}
            width={110}
            height={110}
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              color: "#ffffff",
              fontSize: 108,
              fontFamily: "Bebas Neue",
              letterSpacing: "2px",
              lineHeight: 1,
            }}
          >
            TIVOR
          </span>
        </div>
        <span
          style={{
            color: "#666666",
            fontSize: 26,
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          Strategic AI Systems, Not Generic Tools
        </span>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 16,
          }}
        >
          {["Manufacturing AI", "Procurement AI", "HR Tech"].map((tag) => (
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
    {
      ...size,
      fonts: [
        {
          name: "Bebas Neue",
          data: bebasFont,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
