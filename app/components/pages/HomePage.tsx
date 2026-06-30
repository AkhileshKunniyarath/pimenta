"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";
import Img from "../ui/Img";
import Container from "../ui/Container";
import Section from "../ui/Section";
import Eyebrow from "../ui/Eyebrow";
import Stars from "../ui/Stars";
import Btn from "../ui/Btn";

interface HomePageProps {
  setPage: (key: string) => void;
  onBook: () => void;
  heroLayout?: string;
  openPackage: (slug: string) => void;
}

export default function HomePage({
  setPage,
  onBook,
  heroLayout,
  openPackage,
}: HomePageProps) {
  const { content } = useSiteContent();

  return (
    <div>
      <Hero onBook={onBook} layout={heroLayout} setPage={setPage} />
      <MarqueeStrip />
      <TodayPanel />
      <IntroBlock setPage={setPage} />
      <ThreePillars />
      <ExperienceShowcase setPage={setPage} onBook={onBook} openPackage={openPackage} />
      <ReviewsSection />
      <BigBookingCTA onBook={onBook} />
    </div>
  );
}

/* --- HERO SUB-COMPONENTS --- */

interface HeroLayoutProps {
  onBook: () => void;
  setPage: (key: string) => void;
}

function Hero({ onBook, layout, setPage }: { onBook: () => void; layout?: string; setPage: (key: string) => void }) {
  if (layout === "postcard") return <HeroPostcard onBook={onBook} />;
  if (layout === "menu") return <HeroMenu onBook={onBook} />;
  if (layout === "topographic") return <HeroTopographic onBook={onBook} />;
  if (layout === "poster") return <HeroPoster onBook={onBook} />;
  if (layout === "cinematic") return <HeroCinematic onBook={onBook} />;
  if (layout === "split") return <HeroSplit onBook={onBook} setPage={setPage} />;
  return <HeroEditorial onBook={onBook} setPage={setPage} />;
}

function HeroEditorial({ onBook, setPage }: HeroLayoutProps) {
  const { content } = useSiteContent();
  const heroImg = content.IMG?.hero || "/images/hero_editorial.png";
  return (
    <Container style={{ paddingTop: 24, paddingBottom: 40 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, alignItems: "end" }}>
        <div className="sa-left" style={{ paddingBottom: 20 }}>
          <Eyebrow>Kerala midlands · Farm 1962 · Guests 1992</Eyebrow>
          <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 18, lineHeight: 1.7 }}>
            9°52′ 13″N · 76°47′ 22″E<br />
            Kadalikad, Kerala<br />
            6.5 acres, four bungalows
          </div>
        </div>
        <div className="sa-scale img-zoom">
          <Img src={heroImg} alt="The Pimenta farm" ratio="3/4" />
        </div>
        <div className="sa-right" style={{ paddingBottom: 40 }}>
          <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 10 }}>No. 01</div>
          <div className="serif" style={{ fontSize: 22, lineHeight: 1.35 }}>
            "The day starts with tea. What happens next is <em>mostly your decision</em>."
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--muted)", marginTop: 14, letterSpacing: "0.1em" }}>
            — Jacob, host
          </div>
        </div>
      </div>

      <h1
        className="serif sa-clip"
        style={{
          fontSize: "clamp(54px, 9vw, 160px)",
          lineHeight: 0.88,
          margin: "22px 0 14px",
          letterSpacing: "-0.035em",
          textAlign: "center",
        }}
      >
        Cook. <span className="italic-serif" style={{ color: "var(--accent)" }}>Stay</span>. Wander.
      </h1>

      <div className="sa-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 20, borderTop: "1px solid var(--rule)", paddingTop: 22, gap: 30, flexWrap: "wrap" }}>
        <div style={{ fontSize: 15, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.6 }}>
          A small, family-run homestay on 6.5 acres of spice gardens in Kerala&rsquo;s midlands.
          Hands-on vegetarian cooking, cultural day-trips, four private bungalows, and afternoons quiet enough to finish a novel.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Btn onClick={onBook} variant="accent">Request to book</Btn>
          <Btn onClick={() => setPage("experiences")} variant="ghost">See experiences</Btn>
        </div>
      </div>
    </Container>
  );
}

function HeroCinematic({ onBook }: { onBook: () => void }) {
  const { content } = useSiteContent();
  const heroImg = content.IMG?.hero || "/images/hero_editorial.png";
  return (
    <div style={{ position: "relative", minHeight: 520, overflow: "hidden" }}>
      <Img src={heroImg} alt="The Pimenta farm" ratio="auto" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", aspectRatio: "auto" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(31,26,21,0.2) 0%, rgba(31,26,21,0.55) 80%)" }} />
      <Container style={{ position: "relative", zIndex: 2, paddingTop: 90, paddingBottom: 48, color: "var(--paper)" }}>
        <Eyebrow color="rgba(243,237,226,0.85)">Kerala midlands · Farm 1962</Eyebrow>
        <h1 className="serif" style={{ fontSize: "clamp(46px, 6.5vw, 96px)", lineHeight: 0.95, margin: "16px 0 22px", letterSpacing: "-0.03em", maxWidth: 1000 }}>
          A spice garden,<br />
          a <span className="italic-serif">long</span> kitchen table,<br />
          a week that <span className="italic-serif">slows</span>.
        </h1>
        <button onClick={onBook} style={{ background: "var(--paper)", color: "var(--ink)", border: "none", padding: "18px 28px", borderRadius: 999, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
          Request to book →
        </button>
      </Container>
    </div>
  );
}

function HeroSplit({ onBook, setPage }: HeroLayoutProps) {
  const { content } = useSiteContent();
  const cookingImg = content.IMG?.cooking1 || "";
  return (
    <Container style={{ paddingTop: 36, paddingBottom: 48 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <Eyebrow>Kerala midlands · Farm 1962 · Guests 1992</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(40px, 4.8vw, 76px)", lineHeight: 0.98, margin: "16px 0 20px", letterSpacing: "-0.025em" }}>
            Come cook.<br />Come <span className="italic-serif">stay</span>.<br />Come back.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 480, marginBottom: 32 }}>
            Six and a half acres of pepper, coffee and cocoa in the Kerala midlands — an hour from Kochi but a
            century from anywhere. Vegetarian kitchen. Family-run since 1962.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <Btn onClick={onBook} variant="accent">Request to book</Btn>
            <Btn onClick={() => setPage("experiences")} variant="ghost">See experiences</Btn>
          </div>
        </div>
        <Img src={cookingImg} alt="hands in a spice kitchen" ratio="4/5" />
      </div>
    </Container>
  );
}

function HeroPostcard({ onBook }: { onBook: () => void }) {
  const { content } = useSiteContent();
  const cards = [
    { src: content.IMG?.cooking1, cap: "Madhu, kitchen, Tues morning", rot: -6, x: 0, y: 60, w: 280 },
    { src: content.IMG?.hero, cap: "The farm · monsoon, week 3", rot: 3, x: 220, y: 0, w: 340 },
    { src: content.IMG?.temple, cap: "Koothattukulam · arattu day", rot: -3, x: 540, y: 100, w: 260 },
    { src: content.IMG?.tour2, cap: "Munnar drive, 2pm", rot: 5, x: 760, y: 20, w: 280 },
  ];
  return (
    <Container style={{ paddingTop: 36, paddingBottom: 60, position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "1px dashed var(--accent)", color: "var(--accent)", borderRadius: 999, fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>
            ◉ Posted from Kerala
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 5.5vw, 88px)", lineHeight: 0.95, margin: "18px 0 18px", letterSpacing: "-0.03em" }}>
            Dear <span className="italic-serif">friend</span>,<br />
            come for a <span className="italic-serif">week</span>.<br />
            You&rsquo;ll write home.
          </h1>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 460, marginBottom: 28 }}>
            Postcards from the farm — what&rsquo;s growing, what we&rsquo;re cooking, where we drove yesterday.
          </p>
          <Btn onClick={onBook} variant="accent">Request to book</Btn>
        </div>
        <div style={{ position: "relative", height: 360 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ position: "absolute", top: c.y, left: c.x, width: c.w, transform: `rotate(${c.rot}deg)`, background: "var(--paper)", padding: 12, paddingBottom: 38, boxShadow: "0 16px 40px -16px rgba(0,0,0,0.25)", border: "1px solid rgba(0,0,0,0.06)" }}>
              <Img src={c.src} alt={c.cap} ratio="4/5" />
              <div className="italic-serif" style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 10, textAlign: "center" }}>{c.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

function HeroMenu({ onBook }: { onBook: () => void }) {
  const dishes = [
    { name: "Avial", note: "the seven-vegetable monsoon classic", from: "garden, this morning" },
    { name: "Erissery", note: "pumpkin & black-eyed pea, roasted coconut", from: "Madhu's amma's recipe" },
    { name: "Inji puli", note: "ginger-tamarind, sharp & sweet", from: "ginger, behind the kitchen" },
    { name: "Pal payasam", note: "rice & jaggery, long-cooked", from: "two hours on low" },
  ];
  return (
    <Container style={{ paddingTop: 36, paddingBottom: 60 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 70, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 100 }}>
          <Eyebrow>Today · Kerala midlands</Eyebrow>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 5.5vw, 90px)", lineHeight: 0.95, margin: "16px 0 22px", letterSpacing: "-0.03em" }}>
            Today&rsquo;s <span className="italic-serif">table</span>.
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: 380, marginBottom: 28 }}>
            Vegetarian, every day. The menu changes by the river, by the rain, by what looks good at the market.
          </p>
          <Btn onClick={onBook} variant="accent">Request a seat</Btn>
        </div>
        <div style={{ border: "1px solid var(--ink)", padding: "44px 50px", background: "var(--paper-2)", position: "relative" }}>
          <div style={{ position: "absolute", top: -1, left: 20, background: "var(--paper-2)", padding: "0 12px", color: "var(--accent)", fontSize: 11, letterSpacing: "0.2em", fontFamily: "'IBM Plex Mono', monospace" }}>
            ✦  THE  LONG  TABLE  ✦
          </div>
          <div style={{ display: "grid", gap: 28, marginTop: 8 }}>
            {dishes.map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr auto", gap: 18, alignItems: "baseline", borderBottom: i < dishes.length - 1 ? "1px dotted var(--rule)" : "none", paddingBottom: 22 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--accent)" }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <div className="serif" style={{ fontSize: 28, letterSpacing: "-0.01em", lineHeight: 1.1 }}>{d.name}</div>
                  <div className="italic-serif" style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 4 }}>{d.note}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: "var(--muted)", textAlign: "right", maxWidth: 140, lineHeight: 1.5 }}>{d.from}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

function HeroTopographic({ onBook }: { onBook: () => void }) {
  return (
    <Container style={{ paddingTop: 36, paddingBottom: 50 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "center" }}>
        <div>
          <div className="mono tracked" style={{ color: "var(--accent)" }}>09°52′13″N · 76°47′22″E</div>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 6vw, 100px)", lineHeight: 0.92, margin: "14px 0 20px", letterSpacing: "-0.03em" }}>
            Find us on<br />the <span className="italic-serif">map</span>.<br />Then forget it.
          </h1>
          <Btn onClick={onBook} variant="accent">Plot your visit</Btn>
        </div>
        <div style={{ position: "relative", aspectRatio: "1/1", background: "var(--paper-2)", border: "1px solid var(--rule)", overflow: "hidden" }}>
          <svg viewBox="0 0 500 500" style={{ width: "100%", height: "100%", display: "block" }}>
            {Array.from({ length: 14 }).map((_, i) => {
              const r = 60 + i * 24;
              return <circle key={i} cx="280" cy="220" r={r} fill="none" stroke="var(--rule)" strokeWidth="0.7" opacity={0.7 - i * 0.035} />;
            })}
            <path d="M 0 380 C 80 360 140 410 220 380 C 300 350 340 390 420 360 C 460 345 500 350 500 350" stroke="var(--accent-soft)" strokeWidth="2.5" fill="none" opacity="0.6" />
            <g transform="translate(280,220)">
              <circle r="32" fill="none" stroke="var(--accent)" strokeWidth="1" />
              <circle r="6" fill="var(--accent)" />
              <text x="44" y="-30" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--accent)" letterSpacing="1">THE PIMENTA</text>
            </g>
          </svg>
        </div>
      </div>
    </Container>
  );
}

function HeroPoster({ onBook }: { onBook: () => void }) {
  const { content } = useSiteContent();
  const posterImg = content.IMG?.cooking2 || "";
  return (
    <div style={{ position: "relative", padding: "48px 0 70px", overflow: "hidden" }}>
      <Container>
        <div style={{ position: "relative" }}>
          <div className="serif" style={{ fontSize: "clamp(120px, 22vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.05em", color: "var(--ink)", margin: 0 }}>SLOW</div>
          <div className="italic-serif" style={{ fontSize: "clamp(120px, 22vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.04em", color: "var(--accent)", margin: 0, marginLeft: "10%", marginTop: "-0.18em" }}>kerala</div>
          <div className="serif" style={{ fontSize: "clamp(120px, 22vw, 360px)", lineHeight: 0.78, letterSpacing: "-0.05em", color: "var(--ink)", margin: 0, marginLeft: "4%", marginTop: "-0.12em" }}>FOOD.</div>
          <div style={{ position: "absolute", top: "8%", right: "4%", width: 220, transform: "rotate(6deg)", boxShadow: "0 24px 50px -20px rgba(0,0,0,0.4)" }}>
            <Img src={posterImg} alt="cooking" ratio="3/4" />
          </div>
        </div>
        <Btn onClick={onBook} variant="accent" style={{ marginTop: 60 }}>Request to book</Btn>
      </Container>
    </div>
  );
}

/* --- OTHER HOME SECTIONS --- */

function MarqueeStrip() {
  const items = ["Vegetarian kitchen", "Spice gardens", "Backwaters", "Tea country", "Temple towns", "Bean-to-bar chocolate", "Lorry art", "Pepper & cocoa", "Family-run since 1962"];
  const loop = [...items, ...items];
  return (
    <div className="marquee-wrap" style={{ borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", padding: "20px 0", background: "var(--paper-2)" }}>
      <div className="marquee">
        {loop.map((it, i) => (
          <span key={i} className="serif" style={{ fontSize: 32, letterSpacing: "-0.01em", color: "var(--ink-2)", display: "inline-flex", alignItems: "center", gap: 48 }}>
            {it}
            <span style={{ color: "var(--accent)", fontSize: 16 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function TodayPanel() {
  const { content } = useSiteContent();
  const t = content.TODAY_PANEL;
  if (!t) return null;

  // Format dynamic dates
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <Section style={{ padding: "80px 0 40px" }}>
      <Container>
        <div style={{ border: "1px solid var(--rule)", background: "var(--paper-2)", padding: 40, display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: 50, alignItems: "start" }} className="responsive-grid-1col">
          <div>
            <div className="mono tracked" style={{ color: "var(--accent)", marginBottom: 12 }}>Today on the farm</div>
            <div className="serif" style={{ fontSize: 28, letterSpacing: "-0.01em" }}>{formattedDate}</div>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, letterSpacing: "0.08em" }}>Sunny & Calm</div>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 12 }}>In the garden</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 7, fontSize: 14, color: "var(--ink-2)" }}>
              {(t.growing || []).map((g) => <li key={g}>· {g}</li>)}
            </ul>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 12 }}>On the table</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 7, fontSize: 14, color: "var(--ink-2)" }}>
              {(t.cooking || []).map((g) => <li key={g}>· {g}</li>)}
            </ul>
          </div>
          <div>
            <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 12 }}>From the farm</div>
            <div className="serif italic-serif" style={{ fontSize: 22, color: "var(--accent)", lineHeight: 1.3 }}>{t.fromFarm || "Ripe Spices"}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, lineHeight: 1.55 }}>
              The rest from neighbours within 1km. We don&rsquo;t buy out of season.
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function IntroBlock({ setPage }: { setPage: (key: string) => void }) {
  return (
    <Section>
      <Container className="mobile-px-20">
        <div className="responsive-grid-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 100 }}>
            <Eyebrow>A note from the family</Eyebrow>
            <div className="serif sa-clip" style={{ fontSize: 48, lineHeight: 1.08, marginTop: 20, letterSpacing: "-0.02em" }}>
              We built this<br />as a <span className="italic-serif">place</span>,<br />not a product.
            </div>
          </div>
          <div className="sa-up" style={{ fontSize: 18, lineHeight: 1.75, color: "var(--ink-2)", fontFamily: "'Fraunces', serif", fontWeight: 300 }}>
            <p style={{ margin: "0 0 22px" }}>
              Our family planted the first trees on Haritha Farms in 1962. By the early 1990s we&rsquo;d torn up the rubber
              monoculture, sworn off chemicals, and replanted with pepper, coconut, cocoa, vanilla, turmeric and the
              medicinal plants that grow well in our soil. We opened the kitchen to travellers in 1992.
            </p>
            <p style={{ margin: "0 0 22px" }}>
              There are four bungalows, one long kitchen, and 6.5 acres of garden. No pool, no spa, no buffet.
              You come to cook, to walk, to eat — vegetarian, the way Kerala has always eaten — and, if we&rsquo;ve done
              our job, to leave lighter than you arrived.
            </p>
            <p style={{ margin: "0 0 32px" }}>
              If that sounds right, write to us. We answer every enquiry ourselves, usually within a day.
            </p>
            <button onClick={() => setPage("farm")} style={{ background: "transparent", border: "none", borderBottom: "1px solid var(--ink)", paddingBottom: 4, color: "var(--ink)", fontSize: 15, cursor: "pointer" }}>
              Read our story →
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ThreePillars() {
  const { content } = useSiteContent();
  const pillars = [
    { no: "01", title: "Cook", img: content.IMG?.cooking3, body: "Vegetarian, hands-on, recipe-led. Madhu handles prep so you focus on technique. Four to eight dishes a day on most programs." },
    { no: "02", title: "Stay", img: content.IMG?.tour2, body: "Four private bungalows amidst pepper and cocoa. Solar hot water, air conditioning, good-enough wifi. No pool, by design." },
    { no: "03", title: "Wander", img: content.IMG?.truck, body: "Backwaters, temple towns, lorry-art yards, tea country. A driver who knows the back roads. As much, or as little, as you like." },
  ];
  return (
    <Section>
      <Container className="mobile-px-20">
        <div className="responsive-grid-1col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {pillars.map((p, idx) => (
            <div key={p.no} className={`sa-scale stagger-${idx + 1}`}>
              <div className="img-zoom">
                <Img src={p.img} alt={p.title} ratio="4/3" />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 24 }}>
                <div className="mono" style={{ fontSize: 13, color: "var(--accent)" }}>{p.no}</div>
                <div className="serif" style={{ fontSize: 42, letterSpacing: "-0.02em" }}>{p.title}</div>
              </div>
              <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65, marginTop: 10, maxWidth: 340 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ImageCarousel({ images = [] }: { images: Array<{ src: string; alt: string; category: string; title: string }> }) {
  const [curr, setCurr] = React.useState(0);

  React.useEffect(() => {
    if (!images.length) {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurr((current) => (current === images.length - 1 ? 0 : current + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) {
    return null;
  }

  return (
    <div className="carousel-container scroll-animate" style={{ position: "relative", width: "100%", height: "340px", overflow: "hidden", borderRadius: "8px", marginTop: "14px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
      {images.map((img, idx) => (
        <div
          key={idx}
          className="carousel-slide"
          style={{
            position: "absolute",
            inset: 0,
            opacity: idx === curr ? 1 : 0,
            transform: `scale(${idx === curr ? 1.02 : 1})`,
            transitionProperty: "opacity, transform",
            transitionDuration: "1.2s",
            transitionTimingFunction: "ease-in-out",
          }}
        >
          <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "16px 20px", color: "var(--paper)" }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent-soft)", marginBottom: 4 }}>{img.category}</div>
            <div className="serif" style={{ fontSize: 18, fontWeight: 300 }}>{img.title}</div>
          </div>
        </div>
      ))}
      <button className="carousel-nav-btn" onClick={(e) => { e.stopPropagation(); setCurr((current) => (current === 0 ? images.length - 1 : current - 1)); }} style={{ left: 12, position: "absolute", top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", border: "none", background: "rgba(243,237,226,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>{"<"}</button>
      <button className="carousel-nav-btn" onClick={(e) => { e.stopPropagation(); setCurr((current) => (current === images.length - 1 ? 0 : current + 1)); }} style={{ right: 12, position: "absolute", top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", border: "none", background: "rgba(243,237,226,0.8)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold" }}>{">"}</button>
    </div>
  );
}

interface ExperienceShowcaseProps {
  setPage: (key: string) => void;
  onBook: () => void;
  openPackage: (slug: string) => void;
}

function ExperienceShowcase({ setPage, onBook, openPackage }: ExperienceShowcaseProps) {
  const { content } = useSiteContent();

  const packages = content.PACKAGES || [];
  const culinaryPkgs = packages.filter((p: any) => ["residency", "ttr", "adventure", "splendour", "workshop", "odyssey"].includes(p.id));
  const culturalPkgs = packages.filter((p: any) => ["taste", "kerala-feel", "heart", "monsoon", "honeymoon"].includes(p.id));

  const culinaryImages = [
    { src: "/images/culinary_heritage_kitchen.png", alt: "heritage homestay kitchen", category: "Heritage kitchen", title: "Cooking over rustic clay pots" },
    { src: "/images/culinary_sadya_feast.png", alt: "kerala sadya feast on banana leaf", category: "Vegetarian feast", title: "The traditional Kerala Sadya" },
    { src: "/images/culinary_fresh_spices.png", alt: "fresh spice array", category: "Spice garden", title: "Harvested organic spices" },
    { src: "/images/culinary_artisanal_chocolate.png", alt: "artisanal bean to bar chocolate", category: "Artisanal", title: "Bean-to-bar organic chocolate" },
    { src: "/images/culinary_dosa_tawa.png", alt: "crispy dosa on tawa", category: "Traditional breakfast", title: "Thin, crispy golden dosa" }
  ];

  const culturalImages = [
    { src: "/images/cultural_spice_garden.png", alt: "organic pepper garden canopy", category: "Organic Farm", title: "Walking the bio-organic spice groves" },
    { src: "/images/cultural_pineapple_market.png", alt: "vibrant pineapple market in Kerala", category: "Local landmarks", title: "The morning pineapple market auction" },
    { src: "/images/cultural_truck_art.png", alt: "artisan painting kerala truck art", category: "Traditional craft", title: "Meeting local lorry-art painters" },
    { src: "/images/cultural_tea_plantation.png", alt: "green tea plantations Munnar", category: "Day excursions", title: "Driving into the Munnar tea hills" }
  ];

  return (
    <Section id="experiences-panel" style={{ background: "var(--paper-2)", padding: "100px 0" }}>
      <Container className="mobile-px-20">
        <div className="scroll-animate" style={{ marginBottom: 60 }}>
          <Eyebrow>Experiences</Eyebrow>
          <h2 className="serif" style={{ fontSize: "clamp(44px, 6vw, 72px)", lineHeight: 1.1, margin: "20px 0 0", letterSpacing: "-0.025em" }}>
            Our Curated <span className="italic-serif">Midland</span> Experiences.
          </h2>
          <p style={{ color: "var(--ink-2)", fontSize: 16, lineHeight: 1.6, marginTop: 14, maxWidth: 680 }}>
            Check into - Our Curated Midland Experiences of Kerala. Check out some of our curated experiences on food, spice gardens, markets, art working on trucks, tea plantations, and bean-to-bar artisanal chocolate factory.
          </p>
        </div>

        {/* 1. Culinary Delights Showcase */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 60, marginBottom: 100, alignItems: "start" }} className="responsive-grid-1col">
          <div className="scroll-animate">
            <h3 className="serif" style={{ fontSize: 32, marginBottom: 12, letterSpacing: "-0.02em" }}>Curated Culinary Delights</h3>
            <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>
              Hands-on cooking residencies, day workshops, and retreats focused entirely on traditional vegetarian and vegan Kerala dishes in our heritage kitchen.
            </p>
            <ImageCarousel images={culinaryImages} />
          </div>
          <div className="scroll-animate delay-200" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="responsive-grid-1col">
              {culinaryPkgs.slice(0, 4).map((p: any) => {
                const minPrice = p.pricing.solo ?? p.pricing.perPerson;
                return (
                  <div key={p.id} style={{ background: "var(--paper)", padding: 20, borderRadius: 4, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "transform .2s" }} 
                       onClick={() => openPackage(p.slug)}
                       onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                       onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                    <div className="mono" style={{ fontSize: 10, color: "var(--accent)", marginBottom: 8 }}>
                      {p.nights === 0 ? "Day" : p.nights + "N / " + p.days + "D"}
                      {minPrice ? ` · from ₹${minPrice.toLocaleString('en-IN')}` : null}
                    </div>
                    <div className="serif" style={{ fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>{p.title}</div>
                    <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{p.blurb}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 24 }}>
              <button onClick={() => setPage("experiences")} style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "14px 28px", borderRadius: 999, fontSize: 14, cursor: "pointer" }}>
                View all culinary experiences →
              </button>
            </div>
          </div>
        </div>

        {/* 2. Cultural Encounters Showcase */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60, alignItems: "start" }} className="responsive-grid-1col">
          <div className="scroll-animate delay-200" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="responsive-grid-1col">
              {culturalPkgs.slice(0, 4).map((p: any) => {
                const minPrice = p.pricing.solo ?? p.pricing.perPerson ?? p.pricing.twinBothCook;
                return (
                  <div key={p.id} style={{ background: "var(--paper)", padding: 20, borderRadius: 4, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "transform .2s" }} 
                       onClick={() => openPackage(p.slug)}
                       onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                       onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                    <div className="mono" style={{ fontSize: 10, color: "var(--accent)", marginBottom: 8 }}>
                      {p.nights === null ? "Custom" : p.nights + "N / " + p.days + "D"}
                      {minPrice ? ` · from ₹${minPrice.toLocaleString('en-IN')}` : null}
                    </div>
                    <div className="serif" style={{ fontSize: 20, lineHeight: 1.25, marginBottom: 8 }}>{p.title}</div>
                    <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{p.blurb}</p>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 24 }}>
              <button onClick={() => setPage("experiences")} style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "14px 28px", borderRadius: 999, fontSize: 14, cursor: "pointer" }}>
                View all cultural experiences →
              </button>
            </div>
          </div>
          <div className="scroll-animate">
            <h3 className="serif" style={{ fontSize: 32, marginBottom: 12, letterSpacing: "-0.02em" }}>Immersive Cultural Encounters</h3>
            <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>
              Discover local spice groves, commuted river ferries, lorry-art painters, temple towns, and the authentic, slow-paced countryside of the Kerala midlands.
            </p>
            <ImageCarousel images={culturalImages} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ReviewsSection() {
  const { content } = useSiteContent();
  const [idx, setIdx] = React.useState(0);
  const reviews = content.REVIEWS || [];
  const r = reviews[idx];

  if (!r) return null;

  return (
    <Section style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <Container>
        <div className="scroll-animate responsive-grid-1col" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <div>
            <Eyebrow color="var(--accent-soft)">What guests say</Eyebrow>
            <div className="serif" style={{ fontSize: 60, lineHeight: 1.05, marginTop: 24, letterSpacing: "-0.025em" }}>
              Every review,<br />
              written without<br />
              being <span className="italic-serif" style={{ color: "var(--accent-soft)" }}>asked</span>.
            </div>
            <div style={{ marginTop: 40, display: "flex", gap: 30, alignItems: "center" }}>
              <div>
                <div className="serif" style={{ fontSize: 48, lineHeight: 1 }}>5.0</div>
                <Stars n={5} size={16} color="var(--accent-soft)" />
                <div className="mono" style={{ fontSize: 11, color: "rgba(243,237,226,0.6)", marginTop: 6 }}>
                  Tripadvisor · 120+ reviews
                </div>
              </div>
              <div style={{ width: 1, height: 60, background: "rgba(243,237,226,0.2)" }} />
              <div>
                <div className="serif" style={{ fontSize: 48, lineHeight: 1 }}>98%</div>
                <div className="mono" style={{ fontSize: 11, color: "rgba(243,237,226,0.6)", marginTop: 6 }}>
                  Would return
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="serif italic-serif" style={{ fontSize: 32, lineHeight: 1.4, color: "var(--paper)", minHeight: 180 }}>
              &ldquo;{r.text}&rdquo;
            </div>
            <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(243,237,226,0.15)", paddingTop: 24 }}>
              <div>
                <div style={{ fontSize: 15 }}>{r.author}</div>
                <div className="mono" style={{ fontSize: 11, color: "rgba(243,237,226,0.6)", marginTop: 4, letterSpacing: "0.1em" }}>
                  {r.location || "Guest"} · {r.stayDate}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {reviews.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      width: 32, height: 32, borderRadius: "50%",
                      border: i === idx ? "1px solid var(--accent-soft)" : "1px solid rgba(243,237,226,0.2)",
                      background: i === idx ? "var(--accent-soft)" : "transparent",
                      color: i === idx ? "var(--ink)" : "var(--paper)",
                      cursor: "pointer", fontSize: 12,
                    }}
                    className="mono"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function BigBookingCTA({ onBook }: { onBook: () => void }) {
  const { content } = useSiteContent();
  const brand = content?.BRAND || {};
  const email = brand.contact?.email || "reservations@thepimenta.com";
  const whatsapp = brand.contact?.whatsapp || "";
  const responseTime = brand.responseTime || "Usually a reply within 24 hours";

  return (
    <Section style={{
      background: "radial-gradient(circle at 50% 50%, #223725 0%, #132215 70%, #0a130b 100%)",
      color: "var(--paper)",
      padding: "120px 20px",
      position: "relative",
      overflow: "hidden"
    }}>
      <Container>
        <div style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "60px 40px",
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 32,
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          textAlign: "center"
        }}>
          <Eyebrow color="rgba(243, 237, 226, 0.6)">Direct bookings only</Eyebrow>
          
          <h2 className="serif" style={{
            fontSize: "clamp(44px, 5.5vw, 84px)",
            lineHeight: 1.1,
            margin: "24px 0 36px",
            color: "#fcfaf7",
            letterSpacing: "-0.02em"
          }}>
            Write to <span className="italic-serif" style={{ opacity: 0.95 }}>us</span>.<br />
            We&rsquo;ll write <span className="italic-serif" style={{ opacity: 0.95 }}>back</span>.
          </h2>

          <div style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 36
          }}>
            <button
              onClick={onBook}
              style={{
                background: "#fcfaf7",
                color: "#132215",
                border: "none",
                padding: "16px 32px",
                borderRadius: 99,
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "transform 0.2s ease, background 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.background = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "#fcfaf7";
              }}
            >
              Request to book →
            </button>

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#fcfaf7",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "16px 32px",
                  borderRadius: 99,
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 0.2s ease, border 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                Chat on WhatsApp
              </a>
            )}

            <a
              href={`mailto:${email}`}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fcfaf7",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "16px 32px",
                borderRadius: 99,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s ease, border 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              }}
            >
              Email host
            </a>
          </div>

          <div className="mono" style={{
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(243, 237, 226, 0.5)",
            lineHeight: 1.6
          }}>
            {responseTime} · written personally by the host
          </div>
        </div>
      </Container>
    </Section>
  );
}
