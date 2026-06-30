"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Btn from "../ui/Btn";

interface PlanPageProps {
  onBook: () => void;
}

export default function PlanPage({
  onBook,
}: PlanPageProps) {
  const { content } = useSiteContent();
  const [openFaq, setOpenFaq] = React.useState<number>(0);

  const faqs = content.FAQS || [];
  const imgP = content.IMG || {};
  const brand = content.BRAND || {};
  const contact = brand.contact || {};
  const phone = contact.phone || "+91 94473 02347";
  const email = contact.email || "thepimenta@gmail.com";

  return (
    <div>
      <Section style={{ padding: "32px 0 24px" }}>
        <Container>
          <Eyebrow>Plan your visit</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 5.2vw, 76px)", lineHeight: 0.92, margin: "12px 0 16px", letterSpacing: "-0.03em" }}>
            Everything you<br />
            might <span className="italic-serif">want</span> to ask.
          </h1>
        </Container>
      </Section>

      <Section style={{ padding: "20px 0 80px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="responsive-grid-1col">
            {[
              { t: "Getting here", b: "About 90 min from Kochi International Airport. We'll arrange a driver (≈Rs 3,500). Trains to Aluva, Ernakulam, or Kottayam also work — we pick you up.", img: imgP.tour3 },
              { t: "What to bring", b: "Light cotton, modest temple-friendly options for visits, a hat, insect repellent, sun protection, a camera. Leave the dressy shoes; you'll live in sandals.", img: imgP.tour2 },
              { t: "When to come", b: "Oct–Mar for dry and pleasant. Jun–Oct for the monsoon — green, dramatic, and the right time for our Ayurvedic Wellness program.", img: imgP.hero },
            ].map((c, i) => (
              <div key={i} style={{ border: "1px solid var(--rule)", padding: 24 }}>
                <Img src={c.img || ""} alt={c.t} ratio="4/3" />
                <div className="serif" style={{ fontSize: 28, marginTop: 20, letterSpacing: "-0.01em" }}>{c.t}</div>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 10 }}>{c.b}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section style={{ background: "var(--paper-2)", padding: "100px 0" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }} className="responsive-grid-1col">
            <div style={{ position: "sticky", top: 100 }}>
              <Eyebrow>Frequently asked</Eyebrow>
              <div className="serif" style={{ fontSize: 54, lineHeight: 1.05, letterSpacing: "-0.025em", marginTop: 20 }}>
                The questions<br /><span className="italic-serif">everyone</span> asks.
              </div>
              <p style={{ color: "var(--ink-2)", marginTop: 24, lineHeight: 1.6, fontSize: 15 }}>
                Can&rsquo;t find your answer? We reply to every enquiry personally, usually within a day.
              </p>
              <Btn onClick={onBook} variant="accent" style={{ marginTop: 20 }}>Ask us directly</Btn>
            </div>
            <div>
              {faqs.map((f: any, i: number) => (
                <div key={i} style={{ borderTop: "1px solid var(--rule)", padding: "22px 0", cursor: "pointer" }} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.01em" }}>{f.q}</div>
                    <div style={{ color: "var(--accent)", fontSize: 20 }}>{openFaq === i ? "−" : "+"}</div>
                  </div>
                  {openFaq === i && (
                    <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, marginTop: 14, maxWidth: 640 }}>{f.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "center" }} className="responsive-grid-1col">
            <div>
              <Eyebrow>For Non-Resident Indians</Eyebrow>
              <h2 className="serif" style={{ fontSize: 54, letterSpacing: "-0.025em", lineHeight: 1.05, margin: "18px 0 20px" }}>Coming home, briefly.</h2>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65 }}>
                Many of our guests are NRIs bringing children or grandchildren to Kerala for the first time. We keep one
                bungalow aside for multi-generational stays, cook amma&rsquo;s dishes (or thatha&rsquo;s — tell us which), and
                arrange family-friendly day trips. Ask for our NRI program when you enquire.
              </p>
              <Btn onClick={onBook} variant="ghost" style={{ marginTop: 26 }}>Ask about NRI stays</Btn>
            </div>
            <Img src={imgP.temple || ""} alt="temple" ratio="1/1" />
          </div>
        </Container>
      </Section>

      <Section style={{ padding: "80px 0 60px" }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="responsive-grid-1col">
            <div>
              <Eyebrow>Direct contact</Eyebrow>
              <h2 className="serif" style={{ fontSize: 44, letterSpacing: "-0.025em", margin: "18px 0 24px", lineHeight: 1.05 }}>
                We answer<br />every enquiry <span className="italic-serif">ourselves</span>.
              </h2>
              <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
                <ContactRow label="Email" value={email} />
                <ContactRow label="Phone / WhatsApp" value={phone} />
                <ContactRow label="Booking hours" value="Mon–Sat 9am–6pm IST · Sun 10am–4pm IST" />
                <ContactRow label="Response time" value="Usually within 24 hours" />
                <ContactRow label="Address" value="Kadalikad, Kerala (full address on confirmation)" />
              </div>
            </div>
            <div style={{ background: "var(--paper-2)", padding: 40 }}>
              <Eyebrow>Booking process</Eyebrow>
              <ol style={{ paddingLeft: 0, listStyle: "none", margin: "20px 0 0", display: "grid", gap: 18 }}>
                {[
                  ["Enquiry", "Write with dates, group, dietary needs, and what you&rsquo;d like the trip to feel like."],
                  ["Reply", "Within a day, a proposed program and a price (or availability for a fixed one)."],
                  ["Deposit", "25–30% non-refundable to confirm. Bank transfer in INR, international wire, or card."],
                  ["Confirmation", "An info pack — directions, what to expect, what to pack."],
                  ["Balance on arrival", "By transfer or card. We&rsquo;ll have the kettle on."],
                ].map(([t, b], i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr", gap: 16 }}>
                    <div className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
                    <div>
                      <div className="serif" style={{ fontSize: 18, letterSpacing: "-0.005em" }}>{t}</div>
                      <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "4px 0 0" }} dangerouslySetInnerHTML={{ __html: b }} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section style={{ padding: "60px 0 120px" }}>
        <Container width={900}>
          <Eyebrow>Terms & Conditions</Eyebrow>
          <h3 className="serif" style={{ fontSize: 32, margin: "16px 0 24px", letterSpacing: "-0.02em" }}>The short version.</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7 }} className="responsive-grid-1col">
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Cancellation</div>
              Free cancellation up to 14 days before arrival. After that, 50% refund up to 7 days; no refund within 7 days.
              We know travel plans change — we&rsquo;ll always try to rebook you.
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Payment</div>
              25–30% deposit on confirmation; balance on arrival. Bank transfer (INR or international), card on arrival,
              or UPI for Indian guests.
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Children</div>
              All ages welcome on Tailor-Made and Whole Property programs. Cooking residencies are best for ages 14+.
            </div>
            <div>
              <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>Dietary</div>
              Our entire kitchen is already vegetarian. Vegan, gluten-free, no-nut, Jain — all fine. Just tell us when
              you enquire.
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 16, alignItems: "baseline", borderTop: "1px solid var(--rule)", paddingTop: 14 }}>
      <div className="mono tracked" style={{ color: "var(--muted)" }}>{label}</div>
      <div style={{ fontSize: 16, color: "var(--ink)" }}>{value}</div>
    </div>
  );
}
