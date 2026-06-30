"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";

interface VolunteerPageProps {
  onBook: () => void;
}

export default function VolunteerPage({
  onBook,
}: VolunteerPageProps) {
  const { content } = useSiteContent();
  const data = content.VOLUNTEER;

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [arrivalDate, setArrivalDate] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<{ type: "success" | "error" | ""; message: string }>({ type: "", message: "" });

  if (!data) {
    return (
      <Section>
        <Container>
          <div className="serif" style={{ fontSize: 32 }}>Volunteer page data not loaded.</div>
        </Container>
      </Section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setSubmitStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    setSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: "volunteer",
          packageTitle: "Volunteer Application",
          packageSlug: "volunteer",
          name,
          email,
          phone,
          checkin: arrivalDate,
          notes: `Duration: ${duration}\n\nMotivation & Skills:\n${notes}`,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit application.");
      }

      setSubmitStatus({ type: "success", message: "Thank you! Your application has been submitted successfully." });
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setArrivalDate("");
      setDuration("");
      setNotes("");
    } catch (err: any) {
      setSubmitStatus({ type: "error", message: err.message || "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Section style={{ padding: "32px 0 24px" }}>
        <Container>
          <Eyebrow>{data.eyebrow || "Community & Exchange"}</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 0.92, margin: "12px 0 24px", letterSpacing: "-0.03em" }}>
            {data.title || "Volunteer with Us"}
          </h1>
          <div className="img-zoom sa-scale" style={{ borderRadius: 6, overflow: "hidden", marginBottom: 40 }}>
            <Img src={data.heroImg || ""} alt="Volunteer at The Pimenta" ratio="21/9" />
          </div>
          <p className="serif sa-up" style={{ fontSize: 22, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 840, fontWeight: 300 }}>
            {data.introText}
          </p>
        </Container>
      </Section>

      {/* Details Grid: Requirements & Provisions */}
      <Section style={{ padding: "40px 0 60px", background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <Container>
          <div className="responsive-grid-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            {/* Requirements */}
            <div className="sa-left">
              <h2 className="serif" style={{ fontSize: 32, marginBottom: 24, letterSpacing: "-0.01em" }}>What we expect</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {(data.requirements || []).map((req: any, idx: number) => (
                  <div key={idx} className="card-lift" style={{ background: "var(--paper)", padding: "20px 24px", borderRadius: 8, border: "1px solid var(--rule)" }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>0{idx + 1} · {req.title}</div>
                    <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5 }}>{req.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* What We Provide */}
            <div className="sa-right">
              <h2 className="serif" style={{ fontSize: 32, marginBottom: 24, letterSpacing: "-0.01em" }}>What we offer</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {(data.whatWeProvide || []).map((prov: any, idx: number) => (
                  <div key={idx} className="card-lift" style={{ background: "var(--paper)", padding: "20px 24px", borderRadius: 8, border: "1px solid var(--rule)" }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--accent-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>0{idx + 1} · {prov.title}</div>
                    <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.5 }}>{prov.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Daily Rhythm Section */}
      <Section style={{ padding: "60px 0 80px" }}>
        <Container>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <Eyebrow style={{ display: "flex", justifyContent: "center" }}>Daily rhythm</Eyebrow>
              <h2 className="serif" style={{ fontSize: 38, letterSpacing: "-0.015em", marginTop: 12, textAlign: "center" }}>A typical day on the farm</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", borderLeft: "2px solid var(--rule)", paddingLeft: 30, marginLeft: 20 }}>
              {(data.dailyRhythm || []).map((rhythm: any, idx: number) => (
                <div key={idx} className="sa-up stagger-1" style={{ position: "relative", marginBottom: 36 }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute",
                    left: -41,
                    top: 4,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "var(--paper)",
                    border: "4px solid var(--accent)",
                    zIndex: 2
                  }} />
                  <div className="mono" style={{ fontSize: 13, color: "var(--accent)", fontWeight: "bold" }}>{rhythm.time}</div>
                  <div className="serif" style={{ fontSize: 22, color: "var(--ink)", margin: "6px 0 4px" }}>{rhythm.task}</div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action & Volunteer Form */}
      <Section style={{ background: "var(--accent)", color: "var(--paper)", padding: "100px 0" }}>
        <Container>
          <div className="responsive-grid-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center" }}>
            {/* Left Col: CTA Text */}
            <div className="sa-left" style={{ textAlign: "left" }}>
              <div className="serif sa-clip" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.02em" }}>
                {data.ctaTitle || "Ready to join our family?"}
              </div>
              <p style={{ fontSize: 18, color: "var(--paper-2)", maxWidth: 540, lineHeight: 1.6, marginBottom: 0 }}>
                {data.ctaText}
              </p>
            </div>

            {/* Right Col: Form Card */}
            <div className="sa-right">
              <form onSubmit={handleSubmit} style={{ background: "var(--paper)", color: "var(--ink)", padding: "40px", borderRadius: 16, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ borderBottom: "1px solid var(--rule)", paddingBottom: 15, marginBottom: 5 }}>
                  <h3 className="serif" style={{ fontSize: 24, margin: 0 }}>Volunteer Application</h3>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "4px 0 0" }}>Fill in the details below to submit your request.</p>
                </div>

                {submitStatus.message && (
                  <div style={{
                    padding: "12px 16px",
                    borderRadius: 8,
                    fontSize: 14,
                    background: submitStatus.type === "success" ? "rgba(47, 62, 42, 0.08)" : "rgba(139, 58, 31, 0.08)",
                    color: submitStatus.type === "success" ? "var(--accent-2)" : "var(--accent)",
                    border: "1px solid " + (submitStatus.type === "success" ? "rgba(47, 62, 42, 0.14)" : "rgba(139, 58, 31, 0.18)"),
                  }}>
                    {submitStatus.message}
                  </div>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="responsive-grid-1col">
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--paper-2)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14 }}
                    />
                  </div>
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--paper-2)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14 }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="responsive-grid-1col">
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>WhatsApp / Phone</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--paper-2)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14 }}
                    />
                  </div>
                  <div>
                    <label className="mono" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Preferred Arrival Date</label>
                    <input
                      type="date"
                      value={arrivalDate}
                      onChange={(e) => setArrivalDate(e.target.value)}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--paper-2)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14 }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mono" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Duration of Stay</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 2 weeks, 1 month"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--paper-2)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14 }}
                  />
                </div>

                <div>
                  <label className="mono" style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Motivation & Skills</label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us why you would like to volunteer and any cooking, farming, or hospitality skills you have..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--paper-2)", color: "var(--ink)", fontFamily: "inherit", fontSize: 14, resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn"
                  style={{
                    background: "var(--accent)",
                    color: "var(--paper)",
                    border: "none",
                    padding: "14px 20px",
                    borderRadius: 999,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: submitting ? "not-allowed" : "pointer",
                    opacity: submitting ? 0.7 : 1,
                    textAlign: "center",
                    display: "block",
                    width: "100%",
                    marginTop: 10
                  }}
                >
                  {submitting ? "Submitting Application..." : "Submit Application →"}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
