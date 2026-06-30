"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Btn from "../ui/Btn";

interface TermsPageProps {
  setPage: (key: string) => void;
  onBook: () => void;
}

export default function TermsPage({
  setPage,
  onBook,
}: TermsPageProps) {
  const { content } = useSiteContent();
  const terms = content.TERMS || {};
  const brand = content.BRAND || {};
  const contact = brand.contact || {};
  const email = contact.email || "thepimenta@gmail.com";
  const sections = terms.sections || [];

  return (
    <div>
      <Section style={{ padding: "32px 0 24px" }}>
        <Container width={980}>
          <button
            onClick={() => setPage("home")}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--muted)",
              fontSize: 13,
              cursor: "pointer",
              padding: 0,
              marginBottom: 24,
            }}
          >
            ← Back to home
          </button>
          <Eyebrow>Legal</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 4.8vw, 70px)", lineHeight: 0.94, margin: "12px 0 12px", letterSpacing: "-0.03em" }}>
            {terms.title || "Terms and Conditions"}
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div className="mono tracked" style={{ color: "var(--accent)" }}>
              {terms.lastUpdated ? `Last updated · ${terms.lastUpdated}` : "Booking conditions"}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
              {email}
            </div>
          </div>
          <p style={{ maxWidth: 860, margin: "26px 0 0", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.75 }}>
            {terms.intro}
          </p>
        </Container>
      </Section>

      <Section style={{ padding: "12px 0 72px" }}>
        <Container width={980}>
          <div style={{ display: "grid", gap: 18 }}>
            {sections.map((section: any, index: number) => (
              <div
                key={`${section.title}-${index}`}
                style={{
                  border: "1px solid var(--rule)",
                  background: index % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                  padding: "28px 30px",
                  borderRadius: 4,
                }}
              >
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>
                  Clause {String(index + 1).padStart(2, "0")}
                </div>
                <div className="serif" style={{ fontSize: 30, letterSpacing: "-0.02em", lineHeight: 1.08 }}>
                  {section.title}
                </div>
                <p style={{ margin: "14px 0 0", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8 }}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          {terms.acknowledgement ? (
            <div
              style={{
                marginTop: 24,
                border: "1px solid var(--rule)",
                background: "var(--paper-2)",
                padding: "24px 28px",
                borderRadius: 4,
              }}
            >
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>
                Acknowledgement
              </div>
              <p style={{ margin: 0, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.8 }}>
                {terms.acknowledgement}
              </p>
            </div>
          ) : null}

          <div
            style={{
              marginTop: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              borderTop: "1px solid var(--rule)",
              paddingTop: 28,
            }}
          >
            <p style={{ margin: 0, maxWidth: 540, fontSize: 15, color: "var(--ink-2)", lineHeight: 1.7 }}>
              Questions about a clause or booking condition? We are happy to clarify the terms before you confirm your stay.
            </p>
            <Btn onClick={onBook} variant="accent">
              Request to book
            </Btn>
          </div>
        </Container>
      </Section>
    </div>
  );
}
