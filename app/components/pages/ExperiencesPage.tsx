"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Btn from "../ui/Btn";
import Price from "../ui/Price";

interface ExperiencesPageProps {
  onBook: () => void;
  openPackage: (slug: string) => void;
}

export default function ExperiencesPage({
  onBook,
  openPackage,
}: ExperiencesPageProps) {
  const { content, currency, setCurrency } = useSiteContent();
  const [category, setCategory] = React.useState<string>("all");
  const [duration, setDuration] = React.useState<string>("all");
  const [party, setParty] = React.useState<string>("solo"); // "solo" | "couple"
  const [showFilterPanel, setShowFilterPanel] = React.useState<boolean>(false);

  const packages = content.PACKAGES || [];
  const currencies = Object.values(content.CURRENCY || {});

  // Compute display price + sublabel based on party type.
  const priceFor = (p: any) => {
    const pr = p.pricing || {};
    if (party === "couple") {
      if (pr.twinBothCook   != null) return { inr: pr.twinBothCook as number,   label: "/ couple (both cook)" };
      if (pr.twin           != null) return { inr: pr.twin as number,           label: "/ couple" };
      if (pr.twinBothTravel != null) return { inr: pr.twinBothTravel as number, label: "/ couple" };
      if (pr.twinWithGuest  != null) return { inr: pr.twinWithGuest as number,  label: "/ couple (1 cooks)" };
      if (pr.perPerson      != null) return { inr: (pr.perPerson * 2) as number,  label: "/ couple" };
      return { inr: null, label: "On request" };
    }
    // Solo
    if (pr.solo      != null) return { inr: pr.solo as number,      label: "/ solo" };
    if (pr.perPerson != null) return { inr: pr.perPerson as number, label: "/ guest" };
    return { inr: null, label: "On request" };
  };

  const filtered = packages.filter((p: any) => {
    if (category !== "all" && p.category !== category) return false;
    if (duration === "day"    && p.nights !== 0)    return false;
    if (duration === "short"  && (p.nights === null || p.nights < 1 || p.nights > 3)) return false;
    if (duration === "mid"    && (p.nights === null || p.nights < 4 || p.nights > 6)) return false;
    if (duration === "long"   && (p.nights === null || p.nights < 7)) return false;
    if (duration === "custom" && p.nights !== null) return false;
    return true;
  });

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (duration !== "all" ? 1 : 0) +
    (party !== "solo" ? 1 : 0) +
    (currency !== "INR" ? 1 : 0);

  const pageData = content.EXPERIENCES_PAGE || {};
  const pageEyebrow = pageData.eyebrow || "Experiences · vegetarian, capped at eight";
  const pageTitle = pageData.title || "Eleven programs.\nOne filter away.";
  const pageIntro = pageData.introText || "From a four-hour cooking demonstration to an eleven-day vegetarian residency, plus a tailor-made Ayurvedic program for the monsoon months. Every program is hands-on, capped at eight guests, and tailored on arrival.";

  return (
    <div>
      <Section style={{ padding: "32px 0 20px" }}>
        <Container>
          <Eyebrow>{pageEyebrow}</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 0.92, margin: "12px 0 16px", letterSpacing: "-0.03em", whiteSpace: "pre-line" }}>
            {pageTitle}
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 680, whiteSpace: "pre-line" }}>
            {pageIntro}
          </p>
        </Container>
      </Section>

      {/* Sticky Filters Controller */}
      <Section style={{ padding: "16px 0", position: "sticky", top: 72, zIndex: 20, background: "var(--paper)", borderBottom: "1px solid var(--rule)" }}>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                style={{
                  padding: "10px 24px",
                  borderRadius: 999,
                  border: "1px solid var(--ink)",
                  background: showFilterPanel ? "var(--ink)" : "transparent",
                  color: showFilterPanel ? "var(--paper)" : "var(--ink)",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 0.15s ease",
                  fontFamily: "inherit",
                }}
              >
                <span>⚙️ Filters</span>
                {activeFiltersCount > 0 && (
                  <span style={{
                    background: showFilterPanel ? "var(--paper)" : "var(--ink)",
                    color: showFilterPanel ? "var(--ink)" : "var(--paper)",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: "bold",
                  }}>
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Active Tags */}
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {category !== "all" && (
                  <span
                    onClick={() => setCategory("all")}
                    style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "6px 12px", borderRadius: 999, background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--ink-2)", fontWeight: 500 }}
                  >
                    Category: {category === "day" ? "Day workshop" : category === "wellness" ? "Monsoon wellness" : category === "tailor" ? "Tailor-made" : category.charAt(0).toUpperCase() + category.slice(1)}
                    <span style={{ opacity: 0.6 }}>✕</span>
                  </span>
                )}
                {duration !== "all" && (
                  <span
                    onClick={() => setDuration("all")}
                    style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "6px 12px", borderRadius: 999, background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--ink-2)", fontWeight: 500 }}
                  >
                    Duration: {duration === "day" ? "A day" : duration === "short" ? "1–3 nights" : duration === "mid" ? "4–6 nights" : duration === "long" ? "7+ nights" : "Custom"}
                    <span style={{ opacity: 0.6 }}>✕</span>
                  </span>
                )}
                {party !== "solo" && (
                  <span
                    onClick={() => setParty("solo")}
                    style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "6px 12px", borderRadius: 999, background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--ink-2)", fontWeight: 500 }}
                  >
                    Prices: Couple
                    <span style={{ opacity: 0.6 }}>✕</span>
                  </span>
                )}
                {currency !== "INR" && (
                  <span
                    onClick={() => setCurrency("INR")}
                    style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, padding: "6px 12px", borderRadius: 999, background: "var(--paper-2)", border: "1px solid var(--rule)", color: "var(--ink-2)", fontWeight: 500 }}
                  >
                    Currency: {currency}
                    <span style={{ opacity: 0.6 }}>✕</span>
                  </span>
                )}
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => { setCategory("all"); setDuration("all"); setParty("solo"); setCurrency("INR"); }}
                    style={{ border: "none", background: "none", color: "var(--accent)", fontSize: 12, fontWeight: 600, cursor: "pointer", padding: "6px 10px", fontFamily: "inherit" }}
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <div style={{ fontSize: 13, color: "var(--muted)" }} className="mono">
              Showing {filtered.length} of {packages.length}
            </div>
          </div>
        </Container>
      </Section>

      {/* Collapsible Filter Panel */}
      {showFilterPanel && (
        <div style={{
          background: "var(--paper-2)",
          borderBottom: "1px solid var(--rule)",
          padding: "36px 0",
        }}>
          <Container>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
              {/* Category */}
              <div>
                <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 16, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Category</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  {[
                    ["all",      "All Categories"],
                    ["day",      "Day workshop"],
                    ["culinary", "Culinary"],
                    ["cultural", "Cultural"],
                    ["wellness", "Monsoon wellness"],
                    ["tailor",   "Tailor-made"],
                  ].map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => setCategory(k)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px 0",
                        fontSize: 14,
                        color: category === k ? "var(--accent)" : "var(--ink-2)",
                        fontWeight: category === k ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      {category === k ? "• " : ""}{l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 16, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Duration</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  {[
                    ["all",    "Any Duration"],
                    ["day",    "A day"],
                    ["short",  "1–3 nights"],
                    ["mid",    "4–6 nights"],
                    ["long",   "7+ nights"],
                    ["custom", "Custom"],
                  ].map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => setDuration(k)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px 0",
                        fontSize: 14,
                        color: duration === k ? "var(--accent)" : "var(--ink-2)",
                        fontWeight: duration === k ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      {duration === k ? "• " : ""}{l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency */}
              <div>
                <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 16, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Currency</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  {currencies.map((c: any) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px 0",
                        fontSize: 14,
                        color: currency === c.code ? "var(--accent)" : "var(--ink-2)",
                        fontWeight: currency === c.code ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      {currency === c.code ? "• " : ""}{c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </div>

              {/* Show prices for */}
              <div>
                <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 16, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>Show prices for</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  {[
                    ["solo",   "Solo traveller"],
                    ["couple", "Couple / two guests"],
                  ].map(([k, l]) => (
                    <button
                      key={k}
                      onClick={() => setParty(k)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px 0",
                        fontSize: 14,
                        color: party === k ? "var(--accent)" : "var(--ink-2)",
                        fontWeight: party === k ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      {party === k ? "• " : ""}{l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}

      <Section style={{ padding: "60px 0 120px" }}>
        <Container>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 80 }}>
              <div className="serif" style={{ fontSize: 40, marginBottom: 20 }}>Nothing fits — but we can build it.</div>
              <Btn onClick={onBook} variant="accent">Enquire for tailor-made</Btn>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="responsive-grid-1col">
              {filtered.map((p: any) => {
                const pr = priceFor(p);
                return (
                  <div key={p.id} style={{ background: "var(--paper-2)", padding: 20, borderRadius: 4, cursor: "pointer", transition: "transform .2s ease", display: "flex", flexDirection: "column" }}
                       onClick={() => openPackage(p.slug)}
                       onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                       onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                    <Img src={p.img} alt={p.title} ratio="4/5" />
                    <div style={{ padding: "22px 4px 4px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--accent)", textTransform: "uppercase" }}>
                          {p.nights === 0 ? "Day" : p.nights === null ? "Custom" : p.nights + "N / " + p.days + "D"}
                        </span>
                        <span className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                          {p.category === "wellness" ? "Monsoon" : p.category === "tailor" ? "Bespoke" : p.focus}
                        </span>
                      </div>
                      <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em", lineHeight: 1.15, marginBottom: 12, minHeight: 60 }}>
                        {p.title}
                      </div>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0, flex: 1 }}>{p.blurb}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                        <div>
                          <div className="serif" style={{ fontSize: 22, lineHeight: 1 }}>
                            {pr.inr ? <Price inr={pr.inr} /> : "On request"}
                          </div>
                          {pr.inr && (
                            <div className="mono" style={{ fontSize: 10, color: "var(--muted)", marginTop: 4, letterSpacing: "0.08em" }}>
                              {pr.label}
                            </div>
                          )}
                        </div>
                        <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.1em" }}>VIEW →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
