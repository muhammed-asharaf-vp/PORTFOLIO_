import { ImageResponse } from "next/og";

export const alt = "Mohamed Asharaf VP Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#050505",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#ccff00",
          }}
        >
          Front End Developer
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 140,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: -6,
            textTransform: "uppercase",
          }}
        >
          Mohamed
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: -6,
            textTransform: "uppercase",
          }}
        >
          Asharaf<span style={{ color: "#ccff00" }}>.</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 30, opacity: 0.6 }}>
          React · Next.js · GSAP · Three.js · TypeScript
        </div>
      </div>
    ),
    size,
  );
}
