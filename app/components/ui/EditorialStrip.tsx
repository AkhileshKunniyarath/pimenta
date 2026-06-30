"use client";

import * as React from "react";
import Img from "./Img";

interface EditorialStripItem {
  img: string;
  alt?: string;
  caption?: string;
}

interface EditorialStripProps {
  items: EditorialStripItem[];
}

export default function EditorialStrip({
  items,
}: EditorialStripProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 0.9fr", gap: 20 }}>
      {items.slice(0, 3).map((it, i) => (
        <div key={i} style={{ paddingTop: i === 1 ? 0 : i === 0 ? 40 : 80 }}>
          <Img src={it.img} alt={it.alt} ratio={i === 1 ? "4/5" : "3/4"} />
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10, letterSpacing: "0.08em" }}>
            {String(i + 1).padStart(2, "0")} — {it.caption || ""}
          </div>
        </div>
      ))}
    </div>
  );
}
