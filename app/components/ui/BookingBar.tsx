"use client";

import * as React from "react";

interface BookingBarProps {
  onBook: () => void;
  hidden?: boolean;
}

export default function BookingBar({
  onBook,
  hidden,
}: BookingBarProps) {
  if (hidden) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 22,
        zIndex: 40,
        background: "var(--ink)",
        color: "var(--paper)",
        borderRadius: 999,
        padding: "10px 10px 10px 22px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        boxShadow: "0 20px 40px -20px rgba(0,0,0,.35)",
        fontSize: 14,
      }}
    >
      <span className="mono" style={{ opacity: 0.7, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}>
        Kerala · midlands
      </span>
      <span style={{ opacity: 0.3 }}>|</span>
      <span>From ₹7,400 / night · direct only</span>
      <button
        onClick={onBook}
        style={{
          background: "var(--paper)",
          color: "var(--ink)",
          border: "none",
          padding: "10px 18px",
          borderRadius: 999,
          fontWeight: 500,
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        Request to book →
      </button>
    </div>
  );
}
