"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";

interface JournalPageProps {
  setPage: (key: string) => void;
}

export default function JournalPage({
  setPage,
}: JournalPageProps) {
  const { content } = useSiteContent();
  const [filter, setFilter] = React.useState<string>("all");
  const [selectedPost, setSelectedPost] = React.useState<any | null>(null);

  const posts = content.JOURNAL_POSTS || [];
  const imgJ = content.IMG || {};

  const filtered = filter === "all" ? posts : posts.filter((p: any) => p.kind === filter);
  const featured = filtered[0];

  // Helper to parse and format article body dynamically from DB text fields
  const renderArticleBody = (bodyText: string | undefined, excerpt: string) => {
    if (!bodyText) {
      return (
        <div className="sa-up text-flow">
          <p className="serif-body drop-cap" style={{ fontSize: 18, lineHeight: 1.8, color: "var(--ink-2)", marginBottom: 24 }}>
            {excerpt || "This story is currently being written by our family on the farm. Check back soon for the full journal entry."}
          </p>
        </div>
      );
    }

    // Split body by empty lines
    const paragraphs = bodyText.split(/\r?\n\r?\n/).map(p => p.trim()).filter(Boolean);

    return (
      <div className="sa-up text-flow">
        {paragraphs.map((p, i) => {
          if (p.startsWith(">")) {
            const cleanQuote = p.slice(1).trim();
            return (
              <blockquote key={i} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 24, margin: "32px 0", fontStyle: "italic" }}>
                <p className="serif" style={{ fontSize: 24, lineHeight: 1.4, color: "var(--accent)" }}>
                  &ldquo;{cleanQuote}&rdquo;
                </p>
              </blockquote>
            );
          }
          if (p.startsWith("###")) {
            const cleanHeading = p.slice(3).trim();
            return (
              <h3 key={i} className="serif" style={{ fontSize: 28, marginTop: 36, marginBottom: 16, letterSpacing: "-0.015em", color: "var(--ink)" }}>
                {cleanHeading}
              </h3>
            );
          }
          // Standard Paragraph (First one gets a drop cap)
          return (
            <p key={i} className={i === 0 ? "drop-cap" : ""} style={{
              fontSize: 17.5,
              lineHeight: 1.85,
              color: "var(--ink-2)",
              marginBottom: 24,
              fontFamily: "'IBM Plex Sans', sans-serif"
            }}>
              {i === 0 && (
                <span className="serif italic-serif" style={{
                  float: "left",
                  fontSize: 72,
                  lineHeight: 0.8,
                  marginTop: 6,
                  marginRight: 12,
                  color: "var(--accent)",
                  fontStyle: "italic",
                  fontWeight: 400
                }}>
                  {p.charAt(0)}
                </span>
              )}
              {i === 0 ? p.slice(1) : p}
            </p>
          );
        })}
      </div>
    );
  };

  // 1. Article Reader View
  if (selectedPost) {
    return (
      <div className="sa-up">
        {/* Navigation / Header */}
        <Section style={{ padding: "32px 0 16px", borderBottom: "1px solid var(--rule)" }}>
          <Container width={800}>
            <button
              onClick={() => setSelectedPost(null)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--muted)",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--mono)"
              }}
            >
              ← Back to Journal
            </button>
          </Container>
        </Section>

        {/* Article Body */}
        <Section style={{ padding: "48px 0 100px" }}>
          <Container width={800}>
            <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>
              {selectedPost.kind} · {selectedPost.date} · 4 min read
            </div>
            <h1 className="serif" style={{ fontSize: "clamp(34px, 5.5vw, 62px)", lineHeight: 1.05, margin: "0 0 32px", letterSpacing: "-0.035em", color: "var(--ink)" }}>
              {selectedPost.title}
            </h1>
            <div style={{ marginBottom: 40 }} className="img-zoom">
              <Img src={selectedPost.img} alt={selectedPost.title} ratio="16/9" style={{ borderRadius: 4 }} />
            </div>
            
            {renderArticleBody(selectedPost.body, selectedPost.excerpt)}

            {/* Separator / Call to Action */}
            <div style={{ borderTop: "1px solid var(--rule)", marginTop: 60, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
              <div>
                <div className="serif" style={{ fontSize: 20, color: "var(--ink)" }}>Would you like to visit us?</div>
                <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>We host hands-on cooking programs and stays throughout the year.</div>
              </div>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  setPage("book");
                }}
                className="btn btn-accent"
              >
                Plan a visit
              </button>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // Gallery images list helper
  const galleryImages = [
    imgJ.cooking1, imgJ.hero, imgJ.temple, imgJ.tour2, 
    imgJ.truck, imgJ.church, imgJ.cooking3, imgJ.tour4, 
    imgJ.cooking5, imgJ.tour1, imgJ.temple2, imgJ.church2
  ].filter(Boolean);

  // 2. Main List View
  return (
    <div>
      {/* Editorial Header */}
      <Section style={{ padding: "32px 0 24px" }}>
        <Container>
          <Eyebrow>Journal · stories · press · photos</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 0.92, margin: "12px 0 16px", letterSpacing: "-0.03em" }}>
            What we've been<br />
            <span className="italic-serif">writing</span> down.
          </h1>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
            {[["all", "All"], ["story", "Stories"], ["press", "Press"], ["photos", "Photos"]].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                style={{
                  background: filter === k ? "var(--ink)" : "transparent",
                  color: filter === k ? "var(--paper)" : "var(--ink-2)",
                  border: "1px solid " + (filter === k ? "var(--ink)" : "var(--rule)"),
                  padding: "8px 18px",
                  borderRadius: 999,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.22s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Posts Section */}
      <Section style={{ padding: "20px 0 80px" }}>
        <Container>
          {/* Featured Post (Wide Split Layout) */}
          {featured && (
            <div
              className="sa-scale card-lift responsive-grid-1col"
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: 50,
                marginBottom: 60,
                alignItems: "center",
                background: "var(--paper-2)",
                padding: "24px",
                borderRadius: "8px",
                cursor: "pointer",
                border: "1px solid var(--rule)"
              }}
              onClick={() => setSelectedPost(featured)}
            >
              <div className="img-zoom" style={{ borderRadius: 4, overflow: "hidden" }}>
                <Img src={featured.img} alt={featured.title} ratio="4/3" />
              </div>
              <div style={{ paddingRight: 10 }}>
                <div className="mono tracked" style={{ color: "var(--accent)" }}>
                  Featured · {featured.kind} · {featured.date}
                </div>
                <h2 className="serif" style={{ fontSize: 38, lineHeight: 1.1, letterSpacing: "-0.025em", margin: "16px 0 16px", color: "var(--ink)" }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6, margin: "0 0 24px" }}>
                  {featured.excerpt}
                </p>
                <span className="serif" style={{ fontSize: 16, color: "var(--accent)", borderBottom: "1px solid var(--accent)", paddingBottom: 2, display: "inline-flex", alignItems: "center", gap: 6 }}>
                  Read story <span style={{ fontFamily: "sans-serif" }}>→</span>
                </span>
              </div>
            </div>
          )}

          {/* Grid Layout of Other Articles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="responsive-grid-1col">
            {filtered.slice(1).map((p: any) => (
              <div
                key={p.id}
                className="sa-up card-lift"
                style={{
                  background: "var(--paper-2)",
                  padding: "18px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid var(--rule)"
                }}
                onClick={() => setSelectedPost(p)}
              >
                <div className="img-zoom" style={{ borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
                  <Img src={p.img} alt={p.title} ratio="4/3" />
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {p.kind} · {p.date}
                </div>
                <div className="serif" style={{ fontSize: 21, lineHeight: 1.2, margin: "8px 0 12px", color: "var(--ink)", flexGrow: 1 }}>
                  {p.title}
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 18px" }}>
                  {p.excerpt}
                </p>
                <span className="mono" style={{ fontSize: 12, color: "var(--accent)", fontWeight: "bold", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  READ →
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery Section */}
      <Section style={{ padding: "40px 0 100px", borderTop: "1px solid var(--rule)" }}>
        <Container>
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", margin: "14px 0 32px" }}>
            Photographs from the farm.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }} className="responsive-grid-1col">
            {galleryImages.map((src, i) => (
              <div key={i} className="img-zoom" style={{ borderRadius: 4, overflow: "hidden" }}>
                <Img src={src} alt={"photo " + (i + 1)} ratio="auto" />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
