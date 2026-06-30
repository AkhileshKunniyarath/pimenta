"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Price from "../ui/Price";

interface BookPageProps {
  initialPkg?: string | null;
  setPage: (key: string) => void;
}

interface FormState {
  pkg: string;
  checkin: string;
  checkout: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  notes: string;
  diet: string[];
}

export default function BookPage({
  initialPkg,
  setPage,
}: BookPageProps) {
  const { content } = useSiteContent();
  const packages = content.PACKAGES || [];

  const findPkg = (key?: string | null) => {
    return (
      packages.find((p: any) => p.slug === key || p.id === key) ||
      packages.find((p: any) => p.id === "residency") ||
      packages[0]
    );
  };

  const initial = findPkg(initialPkg);

  const [step, setStep] = React.useState<number>(1);
  const [form, setForm] = React.useState<FormState>({
    pkg: initial ? initial.id : "",
    checkin: "",
    checkout: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
    diet: [],
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [submitState, setSubmitState] = React.useState({ type: "", message: "" });
  const [searchQuery, setSearchQuery] = React.useState("");
  const [todayIso] = React.useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().slice(0, 10);
  });

  const pkg = packages.find((p: any) => p.id === form.pkg) || initial;
  const nights = pkg ? (pkg.nights || 0) : 0;
  const perPerson = pkg?.pricing?.perPerson;
  const soloPrice = pkg?.pricing?.solo;
  const indicativeInr = pkg ? (
    perPerson ? perPerson * form.guests : (soloPrice && form.guests === 1 ? soloPrice : (pkg.pricing?.twinBothCook ?? pkg.pricing?.twin ?? null))
  ) : null;

  const update = (k: keyof FormState, v: any) => {
    setForm(f => {
      if (k === "checkin") {
        return {
          ...f,
          checkin: v,
          checkout: f.checkout && v && f.checkout < v ? v : f.checkout,
        };
      }

      if (k === "checkout") {
        const minimumCheckout = f.checkin || todayIso;
        return {
          ...f,
          checkout: v && v < minimumCheckout ? minimumCheckout : v,
        };
      }

      return { ...f, [k]: v };
    });
  };

  const Label = ({ children }: { children: React.ReactNode }) => (
    <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 8 }}>{children}</div>
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "none",
    borderBottom: "1px solid var(--rule)",
    padding: "10px 0",
    fontSize: 16,
    background: "transparent",
    fontFamily: "inherit",
    color: "var(--ink)",
    outline: "none"
  };

  const submitEnquiry = async () => {
    if (!form.name.trim()) {
      setSubmitState({ type: "error", message: "Please add your name before sending." });
      return;
    }

    if (!form.email.trim()) {
      setSubmitState({ type: "error", message: "Please add your email before sending." });
      return;
    }

    setSubmitting(true);
    setSubmitState({ type: "", message: "" });

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: pkg.id,
          packageSlug: pkg.slug,
          packageTitle: pkg.title,
          checkin: form.checkin,
          checkout: form.checkout,
          guests: form.guests,
          name: form.name,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          diet: form.diet,
          indicativeTotalInr: indicativeInr,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "We couldn't send your enquiry right now.");
      }

      setSubmitState({
        type: "success",
        message: "Enquiry sent. We'll reply personally within 24 hours.",
      });
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error: any) {
      setSubmitState({
        type: "error",
        message: error.message || "We couldn't send your enquiry right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!pkg) {
    return (
      <Section>
        <Container>
          <div className="serif" style={{ fontSize: 32 }}>No packages available to book.</div>
        </Container>
      </Section>
    );
  }

  return (
    <div>
      <Section style={{ padding: "32px 0 24px" }}>
        <Container>
          <Eyebrow>Request to book</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(36px, 4.5vw, 68px)", lineHeight: 0.95, margin: "12px 0 14px", letterSpacing: "-0.03em" }}>
            Four steps.<br />We reply <span className="italic-serif">personally</span>.
          </h1>
          <div style={{ display: "flex", gap: 6, marginTop: 30 }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ flex: 1, height: 3, background: step >= n ? "var(--accent)" : "var(--rule)", borderRadius: 2 }} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginTop: 12 }} className="mono tracked">
            <span>01 — Package</span>
            <span>02 — Dates & guests</span>
            <span>03 — You</span>
            <span>04 — Confirm</span>
          </div>
        </Container>
      </Section>

      <Section style={{ padding: "30px 0 120px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 60 }} className="responsive-grid-1col">
            <div style={{ minHeight: 500 }}>
              {step === 1 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Pick a program.</h2>
                  
                  {/* Elegant Search Input */}
                  <div style={{ position: "relative", marginBottom: "16px" }}>
                    <span style={{
                      position: "absolute",
                      left: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "15px",
                      opacity: 0.5,
                      pointerEvents: "none"
                    }}>
                      🔍
                    </span>
                    <input
                      type="text"
                      placeholder="Search experiences..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "12px 16px 12px 42px",
                        borderRadius: "8px",
                        border: "1px solid var(--rule)",
                        background: "var(--paper)",
                        color: "var(--ink)",
                        fontSize: "15px",
                        outline: "none",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                        transition: "border-color 0.2s"
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--ink)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--rule)")}
                    />
                  </div>

                  {/* Scrollable Container */}
                  <div style={{
                    maxHeight: "380px",
                    overflowY: "auto",
                    paddingRight: "6px",
                    display: "grid",
                    gap: "10px"
                  }}>
                    {(() => {
                      const filteredPackages = packages.filter((p: any) =>
                        (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (p.blurb || "").toLowerCase().includes(searchQuery.toLowerCase())
                      );

                      if (filteredPackages.length === 0) {
                        return (
                          <div style={{
                            padding: "40px 20px",
                            textAlign: "center",
                            color: "var(--muted)",
                            border: "1px dashed var(--rule)",
                            borderRadius: "8px",
                            fontSize: "14px"
                          }}>
                            No experiences found matching "{searchQuery}"
                          </div>
                        );
                      }

                      return filteredPackages.map((p: any) => {
                        const showPrice = p.pricing?.solo ?? p.pricing?.perPerson;
                        const isSelected = form.pkg === p.id;
                        return (
                          <label
                            key={p.id}
                            style={{
                              display: "grid",
                              gridTemplateColumns: "auto 1fr auto",
                              gap: 16,
                              alignItems: "center",
                              padding: "14px 18px",
                              border: "1px solid " + (isSelected ? "var(--ink)" : "var(--rule)"),
                              background: isSelected ? "var(--paper-2)" : "transparent",
                              borderRadius: 8,
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                              boxShadow: isSelected ? "0 4px 12px rgba(0,0,0,0.03)" : "none"
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = "rgba(0,0,0,0.3)";
                                e.currentTarget.style.background = "rgba(0,0,0,0.01)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.borderColor = "var(--rule)";
                                e.currentTarget.style.background = "transparent";
                              }
                            }}
                          >
                            <input
                              type="radio"
                              name="pkg"
                              checked={isSelected}
                              onChange={() => update("pkg", p.id)}
                              style={{ width: 16, height: 16, accentColor: "var(--ink)", cursor: "pointer" }}
                            />
                            <div>
                              <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.01em", color: "var(--ink)" }}>{p.title}</div>
                              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>{p.blurb}</div>
                            </div>
                            <div className="mono" style={{ fontSize: 12, color: "var(--accent)", textAlign: "right", whiteSpace: "nowrap" }}>
                              {p.nights === 0 ? "Day" : p.nights === null ? "Custom" : p.nights + "N"}
                              <div style={{ color: "var(--ink)", marginTop: 2, fontWeight: 500 }}>
                                {showPrice ? <Price inr={showPrice} /> : "On request"}
                              </div>
                            </div>
                          </label>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
              {step === 2 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>When and with whom?</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, marginBottom: 30 }}>
                    <div>
                      <Label>Check in</Label>
                      <input type="date" min={todayIso} value={form.checkin} onChange={e => update("checkin", e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <Label>Check out</Label>
                      <input type="date" min={form.checkin || todayIso} value={form.checkout} onChange={e => update("checkout", e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                  <Label>Number of guests</Label>
                  <div style={{ display: "flex", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <button key={n} onClick={() => update("guests", n)} style={{
                        width: 48, height: 48, borderRadius: "50%",
                        border: "1px solid " + (form.guests === n ? "var(--ink)" : "var(--rule)"),
                        background: form.guests === n ? "var(--ink)" : "transparent",
                        color: form.guests === n ? "var(--paper)" : "var(--ink)",
                        cursor: "pointer", fontSize: 15, fontFamily: "inherit",
                      }}>{n}</button>
                    ))}
                  </div>
                  <div style={{ marginTop: 40 }}>
                    <Label>Any dietary needs?</Label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {["Vegan", "Gluten-free", "Nut-free", "Jain", "None"].map(d => {
                        const on = form.diet.includes(d);
                        return (
                          <button key={d} onClick={() => update("diet", on ? form.diet.filter(x => x !== d) : [...form.diet, d])} style={{
                            padding: "8px 14px", borderRadius: 999,
                            border: "1px solid " + (on ? "var(--accent)" : "var(--rule)"),
                            background: on ? "var(--accent)" : "transparent",
                            color: on ? "var(--paper)" : "var(--ink-2)",
                            fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                          }}>{d}</button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              {step === 3 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Tell us about you.</h2>
                  <div style={{ display: "grid", gap: 30 }}>
                    <div><Label>Your name</Label><input style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Jane Doe" /></div>
                    <div><Label>Email</Label><input style={inputStyle} type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="jane@example.com" /></div>
                    <div><Label>Phone (optional)</Label><input style={inputStyle} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 555 123 4567" /></div>
                    <div><Label>Anything else we should know?</Label>
                      <textarea value={form.notes} onChange={e => update("notes", e.target.value)} rows={4} style={{ ...inputStyle, borderBottom: "1px solid var(--rule)", resize: "vertical" }} placeholder="First trip to India, travelling with my mother, love cardamom..." />
                    </div>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <h2 className="serif" style={{ fontSize: 40, letterSpacing: "-0.02em", margin: "0 0 24px" }}>Ready to send.</h2>
                  <p style={{ color: "var(--ink-2)", lineHeight: 1.7, fontSize: 16, marginBottom: 30 }}>
                    Here&rsquo;s what we&rsquo;ll receive. We&rsquo;ll write back personally — usually within a day, always in our own words.
                  </p>
                  <div style={{ border: "1px solid var(--rule)", padding: 30, borderRadius: 4, display: "grid", gap: 16, fontSize: 15 }}>
                    <Row l="Program" r={pkg.title} />
                    <Row l="Dates" r={form.checkin && form.checkout ? form.checkin + " → " + form.checkout : "Flexible"} />
                    <Row l="Guests" r={form.guests + (form.guests === 1 ? " person" : " people")} />
                    <Row l="Dietary" r={form.diet.length ? form.diet.join(", ") : "No restrictions"} />
                    <Row l="Name" r={form.name || "—"} />
                    <Row l="Email" r={form.email || "—"} />
                    {form.notes && <Row l="Notes" r={form.notes} />}
                  </div>
                </div>
              )}

              {submitState.message && (
                <div
                  style={{
                    marginTop: 28,
                    padding: "16px 18px",
                    borderRadius: 4,
                    border: "1px solid " + (submitState.type === "error" ? "rgba(139,58,31,0.35)" : "rgba(78,102,55,0.35)"),
                    background: submitState.type === "error" ? "rgba(139,58,31,0.08)" : "rgba(78,102,55,0.08)",
                    color: submitState.type === "error" ? "var(--accent)" : "var(--accent-2)",
                    fontSize: 14,
                    lineHeight: 1.6,
                  }}
                >
                  {submitState.message}
                </div>
              )}

              <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => step > 1 ? setStep(step - 1) : setPage("home")} disabled={submitting} style={{ background: "transparent", border: "none", color: "var(--muted)", cursor: submitting ? "not-allowed" : "pointer", fontSize: 14, opacity: submitting ? 0.5 : 1 }}>
                  ← {step > 1 ? "Back" : "Cancel"}
                </button>
                {step < 4 ? (
                  <button onClick={() => setStep(step + 1)} style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "14px 26px", borderRadius: 999, fontSize: 14, cursor: "pointer" }}>
                    Continue →
                  </button>
                ) : (
                  <button onClick={submitEnquiry} disabled={submitting} style={{ background: "var(--accent)", color: "var(--paper)", border: "none", padding: "14px 26px", borderRadius: 999, fontSize: 14, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.75 : 1 }}>
                    {submitting ? "Sending..." : "Send enquiry →"}
                  </button>
                )}
              </div>
            </div>

            {/* Summary sidebar */}
            <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)", padding: 26, borderRadius: 4 }}>
                <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 14 }}>Your enquiry</div>
                <div className="serif" style={{ fontSize: 26, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{pkg.title}</div>
                <div style={{ marginTop: 20, fontSize: 14, color: "var(--ink-2)", display: "grid", gap: 8 }}>
                  <Row compact l={pkg.nights === 0 ? "Format" : "Nights"} r={pkg.nights === 0 ? "Day" : pkg.nights === null ? "Custom" : String(nights)} />
                  <Row compact l="Guests" r={String(form.guests)} />
                  <Row compact l="Pricing" r={perPerson ? <>per guest</> : (soloPrice ? <>tiered</> : <>on request</>)} />
                </div>
                {indicativeInr ? (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
                    <div className="mono tracked" style={{ color: "var(--muted)" }}>Indicative total</div>
                    <div className="serif" style={{ fontSize: 44, letterSpacing: "-0.02em", marginTop: 6, lineHeight: 1.05 }}>
                      <Price inr={indicativeInr} />
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>Confirmed after we reply</div>
                  </div>
                ) : (
                  <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
                    <div className="mono tracked" style={{ color: "var(--muted)" }}>Pricing</div>
                    <div className="serif" style={{ fontSize: 30, letterSpacing: "-0.02em", marginTop: 6, lineHeight: 1.1 }}>On request</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>We&rsquo;ll quote within a day</div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 20, fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }} className="mono">
                This is an enquiry — no payment taken. A 25–30% deposit secures the booking once we confirm availability.
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function Row({ l, r, compact }: { l: string; r: React.ReactNode; compact?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 20, fontSize: compact ? 13 : 15 }}>
      <span style={{ color: "var(--muted)" }}>{l}</span>
      <span style={{ color: "var(--ink)", textAlign: "right", maxWidth: "60%" }}>{r}</span>
    </div>
  );
}
