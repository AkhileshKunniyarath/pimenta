"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Btn from "../ui/Btn";

interface FarmPageProps {
  onBook: () => void;
}

export default function FarmPage({
  onBook,
}: FarmPageProps) {
  const { content } = useSiteContent();

  const activities = content.ACTIVITIES || [];
  const imgData = content.IMG || {};

  return (
    <div>
      <Section style={{ padding: "32px 0 24px" }}>
        <Container>
          <Eyebrow>The Farm · Haritha Farms est. 1962 · The Pimenta since 1992</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 0.92, margin: "12px 0 16px", letterSpacing: "-0.03em" }}>
            Six and a half<br />
            acres, three<br />
            generations <span className="italic-serif">deep</span>.
          </h1>
        </Container>
      </Section>

      <Section style={{ padding: "20px 0 100px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 0.8fr", gap: 28, alignItems: "start" }} className="responsive-grid-1col">
            <div style={{ paddingTop: 30 }}>
              <Img src={imgData.cooking4 || ""} alt="the kitchen" ratio="3/4" />
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>01 — the kitchen</div>
            </div>
            <Img src={imgData.hero || ""} alt="the farm" ratio="4/5" />
            <div style={{ paddingTop: 90 }}>
              <Img src={imgData.tour2 || ""} alt="tea country" ratio="3/4" />
              <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 10 }}>02 — tea country, 90 min away</div>
            </div>
          </div>
        </Container>
      </Section>

      <Section style={{ padding: "40px 0 120px" }}>
        <Container width={900}>
          <Eyebrow>Our story</Eyebrow>
          <div className="serif" style={{ fontSize: 24, lineHeight: 1.55, color: "var(--ink-2)", marginTop: 30, fontWeight: 300 }}>
            <p style={{ margin: "0 0 22px" }}>
              Our family planted the first trees on Haritha Farms in 1962. For thirty years it was a rubber plantation, like
              most of the midlands. In the early 1990s we tore up the monoculture, sworn off chemicals, and replanted
              with pepper, coconut, cocoa, vanilla, turmeric and the medicinal plants that grow well here.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              We opened the kitchen to travellers in 1992. Since then we&rsquo;ve hosted day visitors, residencies, NRI
              families coming home, and a long quiet line of solo guests writing books on the veranda. We are still
              one small family, one long table, and four bungalows. We&rsquo;ve been intentional about not growing.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              The food has always been vegetarian — it&rsquo;s how Kerala has cooked for centuries, and it&rsquo;s what we know
              how to teach properly. Madhu has run the kitchen for twenty-one years. Jacob runs the rest. Our family
              still does the gardening.
            </p>
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 14 }}>
            <Btn onClick={onBook} variant="accent">Come see for yourself</Btn>
          </div>
        </Container>
      </Section>

      <Section style={{ background: "var(--paper-2)", padding: "120px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }} className="responsive-grid-1col">
            {[
              ["1962", "Family plants Haritha Farms"],
              ["1992", "Kitchen opens to travellers"],
              ["Early 1990s", "Chemical-free, replanted forest garden"],
              ["2026", "You arrive"],
            ].map(([y, t]) => (
              <div key={y} style={{ background: "var(--paper-2)", padding: "50px 30px" }}>
                <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{y}</div>
                <div style={{ color: "var(--ink-2)", fontSize: 15, marginTop: 12, lineHeight: 1.55 }}>{t}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Eyebrow>What grows here</Eyebrow>
          <h2 className="serif" style={{ fontSize: 56, lineHeight: 1, letterSpacing: "-0.025em", margin: "18px 0 30px" }}>
            Pepper. <span className="italic-serif">Cocoa</span>. Cardamom. <span className="italic-serif">Vanilla</span>. Turmeric.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 30 }} className="responsive-grid-1col">
            {[
              ["Pepper", "Tellicherry, climbing borrowed trees."],
              ["Coconut", "More than 50 trees, three varieties."],
              ["Cocoa", "Beans for our bean-to-bar program."],
              ["Bananas", "Twelve varieties; not all sweet."],
              ["Cardamom", "Small green pods, perfumed."],
              ["Nutmeg & mace", "Same fruit, two spices."],
              ["Cinnamon", "Bark, the real one."],
              ["Vanilla", "Hand-pollinated, slow-cured."],
              ["Turmeric", "Bright orange, freshly dug."],
              ["Pineapple", "From neighbours, mostly."],
              ["Ginger", "Right behind the kitchen."],
              ["Medicinal herbs", "More than 40, for Ayurvedic cooking."],
            ].map(([name, note]) => (
              <div key={name} style={{ borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
                <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{name}</div>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: "6px 0 0", lineHeight: 1.55 }}>{note}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ padding: "100px 0" }}>
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 50, flexWrap: "wrap", gap: 30 }}>
            <div>
              <Eyebrow>Activities & day-trips</Eyebrow>
              <h2 className="serif" style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.025em", margin: "18px 0 0" }}>
                What you can do<br /> <span className="italic-serif">between</span> meals.
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 380 }}>
              Many of these are included in our packages. Mix and match for a tailor-made stay, or just pick a couple
              and spend the rest on the veranda.
            </p>
          </div>

          <div style={{ display: "grid", gap: 50 }}>
            {activities.map((group: any) => (
              <div key={group.group}>
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 18 }}>— {group.group}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 30 }} className="responsive-grid-1col">
                  {group.items.map((a: any) => (
                    <div key={a.title} style={{ borderTop: "1px solid var(--rule)", paddingTop: 16 }}>
                      <div className="serif" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>{a.title}</div>
                      <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, margin: "8px 0 0" }}>{a.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
