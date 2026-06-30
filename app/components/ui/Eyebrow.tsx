"use client";

import * as React from "react";

interface EyebrowProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}

export default function Eyebrow({
  children,
  color,
  style,
}: EyebrowProps) {
  return (
    <div
      className="tracked"
      style={{
        color: color || "var(--muted)",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        ...style,
      }}
    >
      <span style={{ width: 18, height: 1, background: "currentColor", display: "inline-block" }} />
      {children}
    </div>
  );
}
