"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Btn from "../ui/Btn";
import Price from "../ui/Price";

interface StayPageProps {
  onBook: () => void;
  setPage: (key: string) => void;
}

export default function StayPage({
  onBook,
  setPage,
}: StayPageProps) {
  const { content } = useSiteContent();
  const [tab, setTab] = React.useState<string>("bungalows");

  const rooms = content.ROOMS || [];
  const stayModes = content.STAY_MODES || [];
  const heroImg = content.IMG?.hero || "";

  return (
    <div>
      <Section style={{ padding: "32px 0 24px" }}>
        <Container>
          <Eyebrow>Stay</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 0.92, margin: "12px 0 16px", letterSpacing: "-0.03em" }}>
            Four bungalows.<br />
            <span className="italic-serif">One</span> long table.
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6, maxWidth: 660 }}>
            Each bungalow is private, set in the spice gardens, with twin beds, an en-suite shower, solar hot water,
            air conditioning, and a veranda. There are also a few main-house rooms on the first floor for budget
            travellers and long stays.
          </p>

          <div style={{ display: "flex", gap: 6, borderBottom: "1px solid var(--rule)", marginTop: 40, flexWrap: "wrap" }}>
            {[
              ["bungalows", "Bungalows"],
              ["bnb",       "Bed & Breakfast"],
              ["fullboard", "Stay + All Meals"],
              ["whole",     "Whole Property"],
            ].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                background: "transparent",
                border: "none",
                padding: "14px 20px",
                fontSize: 14,
                color: tab === k ? "var(--ink)" : "var(--muted)",
                borderBottom: tab === k ? "2px solid var(--accent)" : "2px solid transparent",
                cursor: "pointer",
                marginBottom: -1,
                fontFamily: "inherit",
              }}>{l}</button>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ padding: "40px 0 120px" }}>
        <Container>
          {tab === "bungalows" && (
            <div style={{ display: "grid", gap: 80 }}>
              {rooms.slice(0, 4).map((room: any, i: number) => (
                <div key={room.id} style={{ display: "grid", gridTemplateColumns: i % 2 ? "1fr 1.2fr" : "1.2fr 1fr", gap: 60, alignItems: "center" }} className="responsive-grid-1col">
                  <div style={{ order: i % 2 ? 2 : 1 }}>
                    <Img src={room.img} alt={room.name} ratio="4/3" />
                  </div>
                  <div style={{ order: i % 2 ? 1 : 2 }}>
                    <div className="mono tracked" style={{ color: "var(--accent)" }}>0{i + 1} of 04 · private bungalow</div>
                    <h2 className="serif" style={{ fontSize: 52, letterSpacing: "-0.02em", margin: "14px 0 16px", lineHeight: 1 }}>{room.name}</h2>
                    <p style={{ fontSize: 18, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 22 }}>{room.blurb}</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {(room.features || []).map((f: string) => (
                        <li key={f} style={{ fontSize: 12, padding: "5px 12px", border: "1px solid var(--rule)", borderRadius: 999, color: "var(--ink-2)" }}>{f}</li>
                      ))}
                    </ul>
                    <Btn onClick={onBook} variant="accent">Request this bungalow</Btn>
                  </div>
                </div>
              ))}

              {rooms[4] && (
                <div style={{ background: "var(--paper-2)", padding: 40, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 40, alignItems: "center" }} className="responsive-grid-1col">
                  <Img src={rooms[4].img} alt="main house" ratio="4/3" />
                  <div>
                    <div className="mono tracked" style={{ color: "var(--accent)" }}>Plus · in the main house</div>
                    <h3 className="serif" style={{ fontSize: 36, letterSpacing: "-0.02em", margin: "12px 0 12px" }}>{rooms[4].name}</h3>
                    <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 16 }}>{rooms[4].blurb}</p>
                    <Btn onClick={onBook} variant="ghost">Ask about main-house rooms</Btn>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "bnb" && stayModes[0] && (
            <StayMode mode={stayModes[0]} onBook={onBook} />
          )}
          {tab === "fullboard" && stayModes[1] && (
            <StayMode mode={stayModes[1]} onBook={onBook} />
          )}
          {tab === "whole" && (
            <div>
              <Img src={heroImg} alt="whole property" ratio="21/9" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 60 }} className="responsive-grid-1col">
                <div>
                  <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", margin: 0 }}>The whole farm, just for you.</h2>
                  <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 22 }}>
                    All four bungalows, the long kitchen, our family&rsquo;s full attention, and the 6.5 acres. Popular with families,
                    writing retreats, and small celebrations. Three-night minimum.
                  </p>
                  <ul style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 2, paddingLeft: 18, marginTop: 12 }}>
                    <li>Up to 8 guests</li>
                    <li>All meals included, vegetarian</li>
                    <li>Daily housekeeping</li>
                    <li>Programs (cooking / cultural) can be added on top</li>
                  </ul>
                </div>
                <div style={{ background: "var(--paper-2)", padding: 30 }}>
                  <div className="mono tracked" style={{ color: "var(--accent)" }}>Whole property</div>
                  <div className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em", margin: "8px 0" }}>On request</div>
                  <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>Up to 8 guests · 3-night minimum · all meals included</div>
                  <Btn onClick={onBook} variant="accent" style={{ marginTop: 28, width: "100%", justifyContent: "center" }}>Request whole property</Btn>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}

function StayMode({ mode, onBook }: { mode: any; onBook: () => void }) {
  const singleFrom = typeof mode.pricing?.single === "object" ? mode.pricing.single.from : mode.pricing?.single;
  const singleTo   = typeof mode.pricing?.single === "object" ? mode.pricing.single.to : null;
  const doubleFrom = typeof mode.pricing?.double === "object" ? mode.pricing.double.from : mode.pricing?.double;
  const doubleTo   = typeof mode.pricing?.double === "object" ? mode.pricing.double.to : null;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }} className="responsive-grid-1col">
      <Img src={mode.img} alt={mode.title} ratio="4/3" />
      <div>
        <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.02em" }}>{mode.title}</h2>
        <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 20 }}>{mode.blurb}</p>
        {mode.inclusions && (
          <ul style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 2, paddingLeft: 18, marginTop: 16 }}>
            {mode.inclusions.map((f: string) => <li key={f}>{f}</li>)}
          </ul>
        )}
        <div style={{ background: "var(--paper-2)", padding: "24px 28px", marginTop: 26, display: "grid", gap: 14 }}>
          {singleFrom && (
            <PriceRow
              label="Single occupancy (double room)"
              from={singleFrom} to={singleTo} per="/ night"
            />
          )}
          {doubleFrom && (
            <PriceRow
              label="Double occupancy (twin/double)"
              from={doubleFrom} to={doubleTo} per="/ night"
            />
          )}
          {mode.notes && (
            <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 6, lineHeight: 1.55, letterSpacing: "0.06em" }}>
              {mode.notes}
            </div>
          )}
        </div>
        <Btn onClick={onBook} variant="accent" style={{ marginTop: 22 }}>
          Request {mode.title}
        </Btn>
      </div>
    </div>
  );
}

interface PriceRowProps {
  label: string;
  from: number;
  to?: number | null;
  per: string;
}

function PriceRow({ label, from, to, per }: PriceRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, borderTop: "1px dashed var(--rule)", paddingTop: 14 }}>
      <div style={{ fontSize: 14, color: "var(--ink-2)", maxWidth: 240 }}>{label}</div>
      <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.02em" }}>
        <Price inr={from} />
        {to && <> – <Price inr={to} /></>}
        <span className="mono" style={{ fontSize: 11, color: "var(--muted)", marginLeft: 6, fontFamily: "'IBM Plex Mono', monospace" }}>{per}</span>
      </div>
    </div>
  );
}
