"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Btn from "../ui/Btn";
import Price from "../ui/Price";

interface PackageDetailPageProps {
  slug: string;
  onBook: () => void;
  setPage: (key: string) => void;
  openPackage: (slug: string) => void;
}

export default function PackageDetailPage({
  slug,
  onBook,
  setPage,
  openPackage,
}: PackageDetailPageProps) {
  const { content } = useSiteContent();

  const packages = content.PACKAGES || [];
  const brand = content.BRAND || {};
  const contact = brand.contact || {};

  const pkg = packages.find((p: any) => p.slug === slug) || packages[0];

  if (!pkg) {
    return (
      <Section>
        <Container>
          <div className="serif" style={{ fontSize: 32 }}>Package not found.</div>
        </Container>
      </Section>
    );
  }

  // Pick related packages by category
  const related = packages.filter((p: any) => p.id !== pkg.id && p.category === pkg.category).slice(0, 3);
  const relatedCross = packages.filter((p: any) => p.id !== pkg.id && p.category !== pkg.category).slice(0, 3);
  const relatedShown = related.length >= 2 ? related : relatedCross;

  const durLabel = pkg.nights === 0 ? "Day program" : pkg.nights === null ? "Tailor-made" : `${pkg.nights} nights · ${pkg.days} days`;

  return (
    <div>
      {/* Header */}
      <Section style={{ padding: "28px 0 18px" }}>
        <Container>
          <button onClick={() => setPage("experiences")} style={{ background: "transparent", border: "none", color: "var(--muted)", fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 28 }}>
            ← All experiences
          </button>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "end" }} className="responsive-grid-1col">
            <div>
              <Eyebrow>{pkg.category === "wellness" ? "Monsoon Wellness" : pkg.category === "day" ? "Day program" : pkg.category === "tailor" ? "Tailor-made" : pkg.category === "cultural" ? "Cultural retreat" : "Culinary residency"} · {durLabel}</Eyebrow>
              <h1 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 78px)", lineHeight: 0.95, margin: "10px 0 12px", letterSpacing: "-0.03em" }}>
                {pkg.title}
              </h1>
              <p style={{ fontSize: 20, color: "var(--ink-2)", lineHeight: 1.55, maxWidth: 640, marginTop: 12, fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
                {pkg.longBlurb || pkg.blurb}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Btn onClick={onBook} variant="accent">Request this program</Btn>
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.14em", textAlign: "right" }}>
                {pkg.groupSize ? `Max ${pkg.groupSize.max} guests · ` : ""}{pkg.notes ? "All-inclusive" : ""}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hero image */}
      <Section style={{ padding: "20px 0" }}>
        <Container>
          <Img src={pkg.img} alt={pkg.title} ratio="21/9" />
        </Container>
      </Section>

      {/* Highlights + season banner */}
      <Section style={{ padding: "60px 0 40px" }}>
        <Container>
          {pkg.season && (
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--rule)", padding: "20px 28px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 30, flexWrap: "wrap" }}>
              <div>
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 4 }}>Seasonal program</div>
                <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{pkg.season}</div>
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: 460, lineHeight: 1.55 }}>
                The farm changes character with the monsoon — green, washed-clean, slow. This is when our Ayurvedic programs run.
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="responsive-grid-1col">
            <div style={{ position: "sticky", top: 100 }}>
              <Eyebrow>Highlights</Eyebrow>
              <h2 className="serif" style={{ fontSize: 38, letterSpacing: "-0.02em", margin: "16px 0 24px", lineHeight: 1.1 }}>
                What makes this one ours.
              </h2>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 16 }}>
              {(pkg.highlights || []).map((h: string, i: number) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "baseline", borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                  <div className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="serif" style={{ fontSize: 22, lineHeight: 1.35, letterSpacing: "-0.005em" }}>{h}</div>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Itinerary */}
      <Section style={{ background: "var(--paper-2)", padding: "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="responsive-grid-1col">
            <div style={{ position: "sticky", top: 100 }}>
              <Eyebrow>Itinerary</Eyebrow>
              <h2 className="serif" style={{ fontSize: 48, letterSpacing: "-0.025em", margin: "18px 0 22px", lineHeight: 1.05 }}>
                How the {pkg.nights === 0 ? "day" : pkg.nights === null ? "stay" : "week"} <span className="italic-serif">unfolds</span>.
              </h2>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: 15, maxWidth: 360 }}>
                A plan we&rsquo;ll adapt to your group on arrival. Madhu builds the kitchen days around what you tell us you love to eat.
              </p>
            </div>
            <div style={{ display: "grid", gap: 0 }}>
              {(pkg.itinerary || []).map((d: any, i: number) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 30, padding: "26px 0", borderTop: "1px solid var(--rule)", borderBottom: i === pkg.itinerary.length - 1 ? "1px solid var(--rule)" : "none" }} className="responsive-grid-1col">
                  <div className="mono tracked" style={{ color: "var(--accent)", paddingTop: 4 }}>{d.day}</div>
                  <div>
                    <div className="serif" style={{ fontSize: 24, letterSpacing: "-0.01em", marginBottom: 6 }}>{d.title}</div>
                    <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 640 }}>{d.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing */}
      <Section style={{ padding: "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="responsive-grid-1col">
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <h2 className="serif" style={{ fontSize: 48, letterSpacing: "-0.025em", margin: "18px 0 22px", lineHeight: 1.05 }}>
                {pkg.pricing?.onRequest ? <>Pricing on <span className="italic-serif">request</span>.</> : <>What it <span className="italic-serif">costs</span>.</>}
              </h2>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: 15, maxWidth: 360 }}>
                {pkg.pricing?.onRequest
                  ? "Because this program is tailored — to dates, group size, and what you'd most like to do — we quote on enquiry. Write to us, and we'll write back within a day."
                  : "All-inclusive. Bungalow, all meals, cooking sessions, all itinerary excursions, bottled water. Excludes only the taxi from the airport and tips."}
              </p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 20, fontFamily: "'IBM Plex Mono', monospace" }}>
                Valid until {brand.validUntil || "2026"}. International prices approximate.
              </p>
            </div>
            <div>
              <PricingTable pkg={pkg} />
              <button onClick={onBook} style={{ marginTop: 28, background: "var(--accent)", color: "var(--paper)", border: "none", padding: "16px 26px", borderRadius: 999, fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>
                Request to book →
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Practical info */}
      <Section style={{ background: "var(--paper-2)", padding: "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="responsive-grid-1col">
            <div>
              <Eyebrow>Practical</Eyebrow>
              <h3 className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: "16px 0 24px" }}>The fine print.</h3>
              <dl style={{ display: "grid", gap: 18, margin: 0 }}>
                {pkg.groupSize && (
                  <Detail label="Group size" value={pkg.groupSize.min ? `${pkg.groupSize.min}–${pkg.groupSize.max} guests` : `Max ${pkg.groupSize.max} guests`} />
                )}
                {pkg.flexibleStart && <Detail label="Start day" value={pkg.flexibleStart} />}
                {pkg.bestTime && <Detail label="Best time to visit" value={pkg.bestTime} />}
                {pkg.season && <Detail label="Seasonal availability" value={pkg.season} />}
                <Detail label="Cuisine" value="100% vegetarian / vegan" />
                <Detail label="Skill level" value="All levels welcome" />
              </dl>
            </div>
            <div>
              <Eyebrow>Inclusions & exclusions</Eyebrow>
              <h3 className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: "16px 0 24px" }}>What&rsquo;s in, what&rsquo;s not.</h3>
              <div className="serif italic-serif" style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 18 }}>{pkg.notes}</div>
              <div style={{ display: "grid", gap: 8, marginTop: 20 }}>
                <RowItem ok label="Bungalow (AC, en-suite, solar hot water)" />
                <RowItem ok label="All meals (vegetarian/vegan, dietary needs accommodated)" />
                <RowItem ok label="All cooking sessions and excursions in the itinerary" />
                <RowItem ok label="Bottled water throughout" />
                <RowItem label="Taxi from Kochi airport (we arrange, ~Rs 3,500)" />
                <RowItem label="Tips for the team (entirely at your discretion)" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {relatedShown.length > 0 && (
        <Section style={{ padding: "100px 0" }}>
          <Container>
            <Eyebrow>You might also like</Eyebrow>
            <h3 className="serif" style={{ fontSize: 42, letterSpacing: "-0.025em", margin: "16px 0 40px" }}>Other programs guests pair with this one.</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }} className="responsive-grid-1col">
              {relatedShown.map((r: any) => {
                const minPrice = r.pricing.solo ?? r.pricing.perPerson;
                return (
                  <div key={r.id} style={{ cursor: "pointer" }} onClick={() => openPackage(r.slug)}>
                    <Img src={r.img} alt={r.title} ratio="4/5" />
                    <div className="mono tracked" style={{ color: "var(--muted)", marginTop: 14 }}>
                      {r.nights === 0 ? "Day" : r.nights === null ? "Custom" : r.nights + "N / " + r.days + "D"}
                      {minPrice ? <> · from <Price inr={minPrice} /></> : null}
                    </div>
                    <div className="serif" style={{ fontSize: 24, lineHeight: 1.2, margin: "8px 0 6px" }}>{r.title}</div>
                    <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>{r.blurb}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}

function PricingTable({ pkg }: { pkg: any }) {
  if (pkg.pricing?.onRequest) {
    return (
      <div style={{ border: "1px solid var(--rule)", padding: 40, background: "var(--paper-2)" }}>
        <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 18 }}>Bespoke pricing</div>
        <div className="serif" style={{ fontSize: 48, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 18 }}>
          We quote on enquiry.
        </div>
        <p style={{ color: "var(--ink-2)", lineHeight: 1.65, fontSize: 15, margin: 0 }}>
          {pkg.notes}
        </p>
      </div>
    );
  }

  if (pkg.pricing?.perPerson) {
    return (
      <div style={{ border: "1px solid var(--rule)", padding: 40, background: "var(--paper-2)" }}>
        <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>Per guest</div>
        <div className="serif" style={{ fontSize: 64, letterSpacing: "-0.02em", lineHeight: 1 }}>
          <Price inr={pkg.pricing.perPerson} />
        </div>
        <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
          Includes meals and bottled water.
        </div>
      </div>
    );
  }

  // Multi-tier (residency)
  const rows = [
    pkg.pricing.solo != null ? { label: "Solo (private double room)", price: pkg.pricing.solo } : null,
    pkg.pricing.twin != null ? { label: "Two travellers (twin/double room)", price: pkg.pricing.twin } : null,
    pkg.pricing.twinWithGuest != null ? { label: "One cook + one guest (sharing)", price: pkg.pricing.twinWithGuest } : null,
    pkg.pricing.twinBothCook != null ? { label: "Two cooks (sharing)", price: pkg.pricing.twinBothCook } : null,
    pkg.pricing.twinBothTravel != null ? { label: "Two travellers (sharing)", price: pkg.pricing.twinBothTravel } : null,
  ].filter((r): r is { label: string; price: number } => r !== null);

  return (
    <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)" }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 30, padding: "26px 30px", borderTop: i > 0 ? "1px solid var(--rule)" : "none", alignItems: "center" }}>
          <div>
            <div className="serif" style={{ fontSize: 20, letterSpacing: "-0.005em", lineHeight: 1.2 }}>{r.label}</div>
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, letterSpacing: "0.08em" }}>
              All-inclusive · for the {pkg.nights} nights
            </div>
          </div>
          <div className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", color: "var(--accent)" }}>
            <Price inr={r.price} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function RowItem({ ok, label }: { ok?: boolean; label: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--ink-2)" }}>
      <span style={{ color: ok ? "var(--accent-2)" : "var(--muted)", fontSize: 14, marginTop: 1 }}>{ok ? "✓" : "—"}</span>
      <span>{label}</span>
    </div>
  );
}
