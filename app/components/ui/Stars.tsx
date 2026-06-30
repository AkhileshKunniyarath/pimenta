"use client";

import * as React from "react";

interface StarsProps {
  n?: number;
  size?: number;
  color?: string;
}

export default function Stars({
  n = 5,
  size = 14,
  color,
}: StarsProps) {
  return (
    <span style={{ color: color || "var(--accent)", letterSpacing: 2, fontSize: size }}>
      {"★".repeat(n)}
      <span style={{ color: "var(--rule)" }}>{"★".repeat(5 - n)}</span>
    </span>
  );
}
