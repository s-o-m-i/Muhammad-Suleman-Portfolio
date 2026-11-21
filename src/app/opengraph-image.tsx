import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F5F0E8",
          color: "#242424",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#C18B55", letterSpacing: 4 }}>
          <span>MS</span>
          <span>PAKISTAN</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1 }}>{site.name}</div>
          <div style={{ marginTop: 18, fontSize: 28, color: "#183D32" }}>{site.title}</div>
          <div style={{ marginTop: 28, fontSize: 24, color: "#77736C", maxWidth: 820 }}>
            {site.brand.message}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
