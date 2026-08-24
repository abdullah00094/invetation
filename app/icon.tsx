import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          border: "4px solid #fffaf5",
          borderRadius: "50%",
          background: "#c18b80",
          color: "#fffaf5",
          fontFamily: "Georgia, Times New Roman, serif",
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        YA
      </div>
    ),
    size,
  );
}
