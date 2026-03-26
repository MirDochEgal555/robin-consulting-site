import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.3), transparent 30%), linear-gradient(180deg, #07111f 0%, #0b1729 55%, #07111f 100%)",
          color: "#eff6ff",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            borderRadius: "36px",
            padding: "48px",
            background: "rgba(8, 18, 32, 0.72)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "22px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#7dd3fc",
              }}
            >
              {siteConfig.siteName}
            </div>
            <div
              style={{
                fontSize: "64px",
                lineHeight: 1.08,
                fontWeight: 700,
                maxWidth: "860px",
              }}
            >
              {siteConfig.title}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "32px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                lineHeight: 1.4,
                color: "#cbd5e1",
                maxWidth: "760px",
              }}
            >
              {siteConfig.ogDescription}
            </div>
            <div
              style={{
                fontSize: "20px",
                color: "#7dd3fc",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              Architecture | Scope | Delivery
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
