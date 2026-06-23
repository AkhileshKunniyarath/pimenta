import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const rootDir = process.cwd();
const sourceFile = path.join(rootDir, "The Pimenta Redesign (2).html");

if (!fs.existsSync(sourceFile)) {
  throw new Error(`Prototype source not found: ${sourceFile}`);
}

const html = fs.readFileSync(sourceFile, "utf8");

function getEmbeddedJson(type) {
  const match = html.match(
    new RegExp(`<script type="${type}">\\n([\\s\\S]*?)<\\/script>`),
  );

  if (!match) {
    throw new Error(`Missing embedded block: ${type}`);
  }

  return JSON.parse(match[1]);
}

function decodeEntry(entry) {
  let buffer = Buffer.from(entry.data, "base64");

  if (entry.compressed) {
    buffer = zlib.gunzipSync(buffer);
  }

  return buffer;
}

function extensionForMimeType(mimeType) {
  if (mimeType === "image/svg+xml") {
    return ".svg";
  }

  if (mimeType === "font/woff2") {
    return ".woff2";
  }

  if (mimeType === "text/javascript" || mimeType === "application/javascript") {
    return ".js";
  }

  return "";
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const manifest = getEmbeddedJson("__bundler/manifest");
const template = getEmbeddedJson("__bundler/template");
const extResources = getEmbeddedJson("__bundler/ext_resources");

const appDir = path.join(rootDir, "app");
const componentsDir = path.join(appDir, "components");
const publicAssetsDir = path.join(rootDir, "public", "prototype-assets");
const dataDir = path.join(rootDir, "data");
const siteContentPath = path.join(dataDir, "site-content.json");
const siteContentSeedPath = path.join(dataDir, "site-content.seed.json");

ensureDir(appDir);
ensureDir(componentsDir);
ensureDir(publicAssetsDir);
ensureDir(dataDir);

const assetPublicPaths = {};

for (const [id, entry] of Object.entries(manifest)) {
  if (
    entry.mime !== "image/svg+xml" &&
    entry.mime !== "font/woff2"
  ) {
    continue;
  }

  const ext = extensionForMimeType(entry.mime);
  const fileName = `${id}${ext}`;
  const outPath = path.join(publicAssetsDir, fileName);

  fs.writeFileSync(outPath, decodeEntry(entry));
  assetPublicPaths[id] = `/prototype-assets/${fileName}`;
}

const resourceMap = Object.fromEntries(
  extResources.map((entry) => [entry.id, assetPublicPaths[entry.uuid] || ""]),
);

const tweaksMatch = template.match(
  /window\.__TWEAKS__ = \/\*EDITMODE-BEGIN\*\/([\s\S]*?)\/\*EDITMODE-END\*\//,
);

if (!tweaksMatch) {
  throw new Error("Unable to locate tweak defaults.");
}

const defaultTweaks = JSON.parse(tweaksMatch[1]);

const styleMatches = [...template.matchAll(/<style>([\s\S]*?)<\/style>/g)];

if (styleMatches.length === 0) {
  throw new Error("No embedded styles found in prototype template.");
}

let css = styleMatches.map((match) => match[1].trim()).join("\n\n");

for (const [assetId, assetUrl] of Object.entries(assetPublicPaths)) {
  css = css.replaceAll(`"${assetId}"`, `"${assetUrl}"`);
  css = css.replaceAll(`'${assetId}'`, `'${assetUrl}'`);
}

css = [
  "/* Generated from The Pimenta Redesign (2).html */",
  css,
  "",
  "html, body {",
  "  max-width: 100%;",
  "  overflow-x: hidden;",
  "}",
  "",
].join("\n");

fs.writeFileSync(path.join(appDir, "globals.css"), css);

const allScriptIds = [
  ...template.matchAll(/<script[^>]+src="([^"]+)"[^>]*><\/script>/g),
].map((match) => match[1]);

const prototypeScriptIds = allScriptIds.slice(3);
const prototypeSources = prototypeScriptIds.map((id) =>
  decodeEntry(manifest[id]).toString("utf8"),
);

function extractDefaultSiteContent(source) {
  const window = {
    __resources: resourceMap,
  };

  const fn = new Function(
    "window",
    `${source}\nreturn window.DATA;`,
  );

  const data = fn(window);
  const { formatPrice: _ignored, ...content } = data;

  return content;
}

const defaultSiteContent = extractDefaultSiteContent(prototypeSources[0]);

defaultSiteContent.TERMS = defaultSiteContent.TERMS || {
  title: "Terms and Conditions",
  lastUpdated: "June 23, 2026",
  intro:
    "The following terms and conditions apply to all bookings made with The Pimenta Homestay and form the contract between the host and the guest. By making a booking, you confirm that you have read the website and the details of the program you are booking, understand the risks associated with it, and have the authority to accept these conditions on behalf of yourself and your party. The contract is established once we accept any payment towards the booking or issue our confirmation or invoice, whichever happens first.",
  acknowledgement:
    "It is assumed that you have read the terms and conditions and the details of each program before booking. By completing a booking, you confirm that you understand and accept everything stated here. If you have any questions or concerns, please contact us before confirming your booking.",
  sections: [
    {
      title: "General booking terms",
      body: "All bookings are subject to these terms and conditions. By booking with The Pimenta Homestay, you agree to the terms outlined here.",
    },
    {
      title: "Experience packages and culinary retreats",
      body: "When booking our experience packages or culinary retreats, a non-refundable deposit of 30% of the total booking value is required at the time of booking. This deposit will only be refunded if the booking is not accepted by us for any reason or if, due to unforeseen circumstances, we are unable to provide the course you booked. Once availability is confirmed, payment details will be shared and immediate payment is required. A proper receipt will be issued after payment is received. The remaining balance is payable upon arrival.",
    },
    {
      title: "Stay bookings",
      body: "For bookings involving a stay or a stay with food, a deposit equal to one night's accommodation must be paid in advance. If you fail to arrive on the booked day, the deposit will be forfeited. If, for any reason, we are unable to provide accommodation on the booked day, the booking amount will be refunded. For multi-day stays, you must confirm on arrival and make payment for the remaining days to secure the rest of the booking.",
    },
    {
      title: "International guest requirements",
      body: "Foreign travellers must provide a copy of the front page of their passport, along with a contact phone number, mailing address, and emergency contact details. You are responsible for holding a valid visa on arrival and for the full duration of your stay. If you do not hold a valid visa, accommodation will be denied.",
    },
    {
      title: "Indian guest requirements",
      body: "Indian guests must provide a valid photo identification card for all occupants on arrival, along with a valid address and contact phone number. A working contact number and emergency contact person are required.",
    },
    {
      title: "Travel insurance",
      body: "It is a condition of booking that you arrange adequate holiday insurance covering medical expenses, personal baggage, personal accidents, loss or damage to property, cancellation or curtailment, personal liability, legal expenses, and emergencies.",
    },
    {
      title: "Governing law",
      body: "The contract, including these terms and conditions, is governed by the laws of India.",
    },
  ],
};

fs.writeFileSync(
  siteContentSeedPath,
  `${JSON.stringify(defaultSiteContent, null, 2)}\n`,
);

if (!fs.existsSync(siteContentPath)) {
  fs.writeFileSync(
    siteContentPath,
    `${JSON.stringify(defaultSiteContent, null, 2)}\n`,
  );
}

prototypeSources[prototypeSources.length - 1] = prototypeSources[
  prototypeSources.length - 1
].replace(
  'ReactDOM.createRoot(document.getElementById("root")).render(<App />);',
  "prototypeAppCache = App;\n\nreturn App;",
);

const scopedPrototypeSources = prototypeSources.slice(1).map(
  (source) => `{\n${source}\n}`,
);

const contentBootstrapSource = `{
const SITE_CONTENT = content || DEFAULT_SITE_CONTENT;
const CURRENCY = SITE_CONTENT.CURRENCY || {};

function formatPrice(inr, currency) {
  if (inr == null) return null;
  const c = CURRENCY[currency] || CURRENCY.INR;
  if (!c) return null;
  const v = inr * c.rate;
  let r;
  if (c.code === "INR") r = Math.round(v / 100) * 100;
  else r = Math.round(v / 5) * 5;
  return c.symbol + r.toLocaleString(c.code === "INR" ? "en-IN" : "en-US");
}

window.DATA = {
  ...SITE_CONTENT,
  CURRENCY,
  formatPrice,
};
}`;

const componentParts = [
  '"use client";\n',
  'import * as React from "react";\n\n',
  "let prototypeAppCache = null;\n\n",
  "const DEFAULT_TWEAKS = ",
  JSON.stringify(defaultTweaks, null, 2),
  ";\n\n",
  "const DEFAULT_SITE_CONTENT = ",
  JSON.stringify(defaultSiteContent, null, 2),
  ";\n\n",
  "const RESOURCE_MAP = ",
  JSON.stringify(resourceMap, null, 2),
  ";\n\n",
  "function createPrototypeApp(content) {\n",
  "  if (prototypeAppCache) {\n",
  "    return prototypeAppCache;\n",
  "  }\n\n",
  "  window.__resources = {\n",
  "    ...(window.__resources || {}),\n",
  "    ...RESOURCE_MAP,\n",
  "  };\n",
  "  window.__TWEAKS__ = window.__TWEAKS__ || DEFAULT_TWEAKS;\n\n",
  "  const { useState, useEffect, useRef, useMemo } = React;\n\n",
  `${contentBootstrapSource}\n\n`,
  scopedPrototypeSources.join("\n\n"),
  "\n}\n\n",
  "export default function PimentaPrototype() {\n",
  "  const [App, setApp] = React.useState(null);\n\n",
  '  const [loadError, setLoadError] = React.useState("");\n\n',
  "  React.useEffect(() => {\n",
  "    let active = true;\n\n",
  "    async function bootstrap() {\n",
  "      let content = DEFAULT_SITE_CONTENT;\n\n",
  "      try {\n",
  '        const response = await fetch("/api/content", { cache: "no-store" });\n',
  "        if (response.ok) {\n",
  "          const result = await response.json();\n",
  "          if (result?.content) {\n",
  "            content = result.content;\n",
  "          }\n",
  "        }\n",
  "      } catch {\n",
  "        // Fall back to the bundled default content.\n",
  "      }\n\n",
  "      if (!active) {\n",
  "        return;\n",
  "      }\n\n",
  "      try {\n",
  "        setApp(() => createPrototypeApp(content));\n",
  "      } catch (error) {\n",
  '        setLoadError(error?.message || "Unable to load the site.");\n',
  "      }\n",
  "    }\n\n",
  "    bootstrap();\n\n",
  "    return () => {\n",
  "      active = false;\n",
  "    };\n",
  "  }, []);\n\n",
  "  if (loadError) {\n",
  "    return (\n",
  "      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--paper)', color: 'var(--ink)', padding: 24 }}>\n",
  "        <div style={{ maxWidth: 560, textAlign: 'center' }}>\n",
  "          <div className=\"serif\" style={{ fontSize: 42, lineHeight: 1, marginBottom: 16 }}>We hit a loading problem.</div>\n",
  "          <div style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>{loadError}</div>\n",
  "        </div>\n",
  "      </div>\n",
  "    );\n",
  "  }\n\n",
  "  if (!App) {\n",
  "    return <div style={{ minHeight: '100vh', background: 'var(--paper)' }} />;\n",
  "  }\n\n",
  "  return App ? <App /> : null;\n",
  "}\n",
];

let componentSource = componentParts.join("");

componentSource = componentSource.replace(
  `  const [form, setForm] = React.useState({
    pkg: initial.id,
    checkin: "",
    checkout: "",
    guests: 2,
    name: "",
    email: "",
    phone: "",
    notes: "",
    diet: [],
  });`,
  `  const [form, setForm] = React.useState({
    pkg: initial.id,
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
  const [todayIso] = React.useState(() => {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    return today.toISOString().slice(0, 10);
  });`,
);

componentSource = componentSource.replace(
  `  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));`,
  `  const update = (k, v) => setForm(f => {
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
  });`,
);

componentSource = componentSource.replace(
  `  const Label = ({ children }) => <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 8 }}>{children}</div>;
  const inputStyle = { width: "100%", border: "none", borderBottom: "1px solid var(--rule)", padding: "10px 0", fontSize: 16, background: "transparent", fontFamily: "inherit", color: "var(--ink)", outline: "none" };

  return (`,
  `  const Label = ({ children }) => <div className="mono tracked" style={{ color: "var(--muted)", marginBottom: 8 }}>{children}</div>;
  const inputStyle = { width: "100%", border: "none", borderBottom: "1px solid var(--rule)", padding: "10px 0", fontSize: 16, background: "transparent", fontFamily: "inherit", color: "var(--ink)", outline: "none" };

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
    } catch (error) {
      setSubmitState({
        type: "error",
        message: error.message || "We couldn't send your enquiry right now.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (`,
);

const legacyBookingActionsPattern =
  /              <div style=\{\{ marginTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" \}\}>[\s\S]*?              <\/div>/;

componentSource = componentSource.replace(
  legacyBookingActionsPattern,
  `              {submitState.message && (
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
              </div>`,
);

componentSource = componentSource.replace(
  `<input type="date" value={form.checkin} onChange={e => update("checkin", e.target.value)} style={inputStyle} />`,
  `<input type="date" min={todayIso} value={form.checkin} onChange={e => update("checkin", e.target.value)} style={inputStyle} />`,
);

componentSource = componentSource.replace(
  `<input type="date" value={form.checkout} onChange={e => update("checkout", e.target.value)} style={inputStyle} />`,
  `<input type="date" min={form.checkin || todayIso} value={form.checkout} onChange={e => update("checkout", e.target.value)} style={inputStyle} />`,
);

componentSource = componentSource.replace(
  `<div style={{ borderTop: "1px solid rgba(243,237,226,0.15)", paddingTop: 30, display: "flex", justifyContent: "space-between", color: "rgba(243,237,226,0.5)", fontSize: 12 }} className="mono">
          <span>© 2026 The Pimenta · Haritha Farms · Kadalikad, Kerala · thepimenta@gmail.com</span>
          <span>+91 94473 02347 · Mon–Sat 9am–6pm IST</span>
        </div>`,
  `<div style={{ borderTop: "1px solid rgba(243,237,226,0.15)", paddingTop: 30, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", color: "rgba(243,237,226,0.5)", fontSize: 12 }} className="mono">
          <span>© 2026 The Pimenta · Haritha Farms · Kadalikad, Kerala · thepimenta@gmail.com</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <span>+91 94473 02347 · Mon–Sat 9am–6pm IST</span>
            <button
              onClick={() => setPage("terms")}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--paper)",
                cursor: "pointer",
                padding: 0,
                fontSize: 12,
                textDecoration: "underline",
                textUnderlineOffset: 4,
                fontFamily: "inherit",
              }}
            >
              Terms & Conditions
            </button>
          </div>
        </div>`,
);

componentSource = componentSource.replace(
  `window.Pages = window.Pages || {};
window.Pages.PlanPage = PlanPage;

}

{
// Request-to-Book flow — replaces the enquiry-only model`,
  `window.Pages = window.Pages || {};
window.Pages.PlanPage = PlanPage;

}

{
// Dedicated terms page sourced from editable site content

const { Section: SectionT, Container: ContT, Eyebrow: EyebrowT, Btn: BtnT } = window.UI;
const { TERMS: TERMST, BRAND: BRANDT } = window.DATA;

function TermsPage({ setPage, onBook }) {
  const terms = TERMST || {};
  const sections = terms.sections || [];

  return (
    <div>
      <SectionT style={{ padding: "60px 0 36px" }}>
        <ContT width={980}>
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
          <EyebrowT>Legal</EyebrowT>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 8vw, 110px)", lineHeight: 0.94, margin: "18px 0 18px", letterSpacing: "-0.03em" }}>
            {terms.title || "Terms and Conditions"}
          </h1>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <div className="mono tracked" style={{ color: "var(--accent)" }}>
              {terms.lastUpdated ? \`Last updated · \${terms.lastUpdated}\` : "Booking conditions"}
            </div>
            <div className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>
              {BRANDT?.contact?.email || "thepimenta@gmail.com"}
            </div>
          </div>
          <p style={{ maxWidth: 860, margin: "26px 0 0", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.75 }}>
            {terms.intro}
          </p>
        </ContT>
      </SectionT>

      <SectionT style={{ padding: "12px 0 72px" }}>
        <ContT width={980}>
          <div style={{ display: "grid", gap: 18 }}>
            {sections.map((section, index) => (
              <div
                key={\`\${section.title}-\${index}\`}
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
            <BtnT onClick={onBook} variant="accent">
              Request to book
            </BtnT>
          </div>
        </ContT>
      </SectionT>
    </div>
  );
}

window.Pages = window.Pages || {};
window.Pages.TermsPage = TermsPage;

}

{
// Request-to-Book flow — replaces the enquiry-only model`,
);

componentSource = componentSource.replace(
  `  const { TopNav, Footer, SitemapOverlay } = window.Nav;
  const { HomePage, StayPage, ExperiencesPage, FarmPage, JournalPage, PlanPage, BookPage, PackageDetailPage } = window.Pages;`,
  `  const { TopNav, Footer, SitemapOverlay } = window.Nav;
  const { HomePage, StayPage, ExperiencesPage, FarmPage, JournalPage, PlanPage, TermsPage, BookPage, PackageDetailPage } = window.Pages;`,
);

componentSource = componentSource.replace(
  `      case "journal":        return <JournalPage />;
      case "plan":           return <PlanPage onBook={onBook} />;
      case "book":           return <BookPage setPage={navigateTo} initialPkg={pkgSlug} currency={currency} />;`,
  `      case "journal":        return <JournalPage />;
      case "plan":           return <PlanPage onBook={onBook} />;
      case "terms":          return <TermsPage setPage={navigateTo} onBook={onBook} />;
      case "book":           return <BookPage setPage={navigateTo} initialPkg={pkgSlug} currency={currency} />;`,
);

fs.writeFileSync(
  path.join(componentsDir, "PimentaPrototype.jsx"),
  componentSource,
);
