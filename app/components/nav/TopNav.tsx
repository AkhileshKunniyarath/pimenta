"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";

interface TopNavProps {
  page: string;
  setPage: (key: string) => void;
  onBook: () => void;
}

export default function TopNav({
  page,
  setPage,
  onBook,
}: TopNavProps) {
  const { content } = useSiteContent();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function navigate(key: string) {
    setPage(key);
    setMobileMenuOpen(false);
  }

  function book() {
    setMobileMenuOpen(false);
    onBook();
  }

  const navItems = content.NAV || [];

  return (
    <header
      className="site-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "rgba(243,237,226,0.96)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--rule)",
        transition: "all .25s ease",
      }}
    >
      <div
        className="site-nav-inner"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "14px 40px",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        <div
          className="site-brand"
          onClick={() => setPage("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}
        >
          <img
            className="site-logo"
            src="/logo.png"
            alt="The Pimenta"
            width="42"
            height="42"
          />
          <div style={{ lineHeight: 1.05 }}>
            <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.01em" }}>The Pimenta</div>
            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>
              Farm 1962 · Guests 1992
            </div>
          </div>
        </div>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="site-mobile-nav"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <span className="site-menu-mark" aria-hidden="true">
            {mobileMenuOpen ? "x" : "|||"}
          </span>
          <span>{mobileMenuOpen ? "Close" : "Menu"}</span>
        </button>

        <nav
          id="site-mobile-nav"
          className={`site-nav-links${mobileMenuOpen ? " is-open" : ""}`}
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          {navItems.map((n) => (
            <button
              key={n.key}
              onClick={() => navigate(n.key)}
              style={{
                background: "transparent",
                border: "none",
                padding: "8px 14px",
                color: page === n.key ? "var(--ink)" : "var(--ink-2)",
                fontSize: 14,
                fontWeight: page === n.key ? 500 : 400,
                cursor: "pointer",
                position: "relative",
              }}
            >
              {n.label}
              {page === n.key && (
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    right: 14,
                    bottom: 2,
                    height: 1,
                    background: "var(--accent)",
                  }}
                />
              )}
            </button>
          ))}
        </nav>

        <div className={`site-nav-actions${mobileMenuOpen ? " is-open" : ""}`} style={{ display: "flex", gap: 10, justifyContent: "flex-end", alignItems: "center" }}>
          <button
            onClick={book}
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              border: "none",
              padding: "10px 18px",
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Request to book
          </button>
        </div>
      </div>
    </header>
  );
}
