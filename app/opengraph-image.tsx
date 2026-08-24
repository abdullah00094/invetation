import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.meta.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const palette = {
  cream: "#f6eee8",
  paper: "#fffaf5",
  blush: "#c18b80",
  brown: "#825546",
  deep: "#aa6041",
  border: "#d4a693",
};

function BotanicalCorner({ side }: { side: "left" | "right" }) {
  const isRight = side === "right";

  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: 250,
        height: 250,
        ...(isRight
          ? { right: 42, bottom: 38, transform: "rotate(180deg)" }
          : { left: 42, top: 40 }),
        opacity: 0.72,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 210,
          height: 2,
          left: 5,
          top: 128,
          background: palette.border,
          transform: "rotate(-42deg)",
          transformOrigin: "left center",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 116,
          height: 2,
          left: 72,
          top: 83,
          background: palette.blush,
          transform: "rotate(-72deg)",
          transformOrigin: "left center",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 88,
          height: 2,
          left: 118,
          top: 66,
          background: palette.border,
          transform: "rotate(-13deg)",
          transformOrigin: "left center",
        }}
      />
      {[
        { left: 49, top: 97, rotate: -18 },
        { left: 78, top: 74, rotate: 50 },
        { left: 103, top: 51, rotate: -15 },
        { left: 128, top: 77, rotate: 58 },
        { left: 158, top: 50, rotate: -22 },
        { left: 181, top: 39, rotate: 42 },
      ].map((leaf, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: 34,
            height: 15,
            left: leaf.left,
            top: leaf.top,
            border: `2px solid ${index % 2 ? palette.blush : palette.border}`,
            borderRadius: "100% 0 100% 0",
            transform: `rotate(${leaf.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: palette.cream,
          color: palette.brown,
          fontFamily: "Georgia, Times New Roman, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: `2px solid ${palette.border}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 34,
            border: `1px solid ${palette.blush}`,
            opacity: 0.55,
          }}
        />

        <BotanicalCorner side="left" />
        <BotanicalCorner side="right" />

        <div
          style={{
            display: "flex",
            width: 940,
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              color: palette.deep,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 7,
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 105, height: 1, background: palette.border }} />
            You are invited
            <span style={{ width: 105, height: 1, background: palette.border }} />
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: palette.blush,
              fontSize: 86,
              fontStyle: "italic",
              lineHeight: 1,
            }}
          >
            {site.meta.socialTitle}
          </div>

          <div
            style={{
              display: "flex",
              width: 90,
              height: 90,
              marginTop: 28,
              alignItems: "center",
              justifyContent: "center",
              border: `4px solid ${palette.paper}`,
              borderRadius: "50%",
              background: palette.blush,
              color: palette.paper,
              fontSize: 43,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            YA
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 27,
              color: palette.deep,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            {site.meta.occasion}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 17,
              fontSize: 23,
              letterSpacing: 3,
            }}
          >
            {site.meta.socialDate}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
