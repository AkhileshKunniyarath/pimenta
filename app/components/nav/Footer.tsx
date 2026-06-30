"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";

interface FooterProps {
  setPage: (key: string) => void;
  onBook: () => void;
}

export default function Footer({
  setPage,
  onBook,
}: FooterProps) {
  const { content } = useSiteContent();

  const brand = content.BRAND || {};
  const contact = brand.contact || {};
  const phone = contact.phone || "+91 94473 02347";
  const email = contact.email || "thepimenta@gmail.com";
  const name = brand.name || "The Pimenta";

  return (
    <footer style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 0 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "100px 40px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 60, marginBottom: 80 }}>
          <div>
            <div className="serif" style={{ fontSize: 40, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Come stay a <span className="italic-serif">while</span>.
            </div>
            <p style={{ color: "rgba(243,237,226,0.6)", fontSize: 14, lineHeight: 1.7, marginTop: 20, maxWidth: 340 }}>
              Six and a half acres of spice gardens in the midlands of Kerala. Jacob, Madhu,
              a long dining table, and whatever's ripe this week.
            </p>
            <button
              onClick={onBook}
              style={{
                marginTop: 30,
                background: "var(--accent-soft)",
                color: "var(--ink)",
                border: "none",
                padding: "14px 22px",
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Plan your visit →
            </button>
          </div>

          {[
            {
              title: "Visit",
              items: [
                ["Stay", "stay"],
                ["Experiences", "experiences"],
                ["The Farm", "farm"],
                ["Plan Your Visit", "plan"],
                ["Volunteer with us", "volunteer"],
              ] as Array<[string, string | null]>,
            },
            {
              title: "Read",
              items: [
                ["Journal", "journal"],
                ["Press", "journal"],
                ["Photos", "journal"],
                ["Recipes", "journal"],
              ] as Array<[string, string | null]>,
            },
            {
              title: "Connect",
              items: [
                ["Request to book", null],
                [phone, null],
                [email, null],
                ["Tripadvisor", null],
              ] as Array<[string, string | null]>,
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(243,237,226,0.5)",
                  marginBottom: 20,
                }}
              >
                {col.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                {col.items.map(([label, key]) => (
                  <li key={label}>
                    <button
                      onClick={() => (key ? setPage(key) : onBook())}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--paper)",
                        cursor: "pointer",
                        padding: 0,
                        fontSize: 15,
                        textAlign: "left",
                      }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(243,237,226,0.15)",
            paddingTop: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            color: "rgba(243,237,226,0.5)",
            fontSize: 12,
          }}
          className="mono"
        >
          <span>
            © 2026 {name} · Haritha Farms · Kadalikad, Kerala · {email}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span>
              {phone} · Mon–Sat 9am–6pm IST
            </span>
            <button
              onClick={() => setPage("terms")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--paper)",
                cursor: "pointer",
                padding: 0,
                fontSize: 12,
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontFamily: "inherit",
              }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
