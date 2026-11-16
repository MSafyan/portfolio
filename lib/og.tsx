import { ImageResponse } from "next/og";
import { SITE } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

// One share-card design for every page: eyebrow, headline, name.
export function ogImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#fbfaf7",
          color: "#17171b",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#b23c0d" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 60 : 72, lineHeight: 1.08, letterSpacing: -1.5 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#55555f" }}>
          <span>{SITE.name}</span>
          <span>{SITE.jobTitle}</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
