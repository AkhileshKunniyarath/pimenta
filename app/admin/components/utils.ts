export function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function formatDate(value: string | number | Date | null | undefined): string {
  if (!value) {
    return "Not saved yet";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not saved yet";
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function countOf(value: any): number {
  return Array.isArray(value) ? value.length : 0;
}

export function normalizeBookingStatus(value: string | null | undefined): "approved" | "rejected" | "pending" {
  if (value === "approved" || value === "rejected") {
    return value;
  }

  return "pending";
}

export const BOOKING_HISTORY_PAGE_SIZE = 15;

export function clampIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

export function parseLines(value: string | null | undefined): string[] {
  return `${value || ""}`
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function formatLines(value: string[] | null | undefined): string {
  return Array.isArray(value) ? value.join("\n") : "";
}

export function slugify(value: string | null | undefined, fallback = "item"): string {
  const result = `${value || ""}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return result || fallback;
}

export function parseNumber(value: any): number | null {
  if (value == null || `${value}`.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function createEmptyPackage() {
  return {
    id: `package-${Date.now()}`,
    slug: `new-package-${Date.now()}`,
    title: "New package",
    subtitle: "",
    category: "culinary",
    focus: "culinary",
    nights: 0,
    days: 1,
    intensity: "relaxed",
    img: "",
    blurb: "",
    longBlurb: "",
    highlights: [] as string[],
    itinerary: [] as Array<{ day: string; title: string; body: string }>,
    pricing: {
      perPerson: 0,
    } as any,
    notes: "",
    groupSize: {
      min: 1,
      max: 8,
    },
    bookingHours: "",
  };
}

export function createEmptyRoom() {
  return {
    id: `room-${Date.now()}`,
    name: "New room",
    blurb: "",
    sqft: 0,
    guests: 2,
    img: "",
    features: [] as string[],
  };
}

export function createEmptyStayMode() {
  return {
    id: `stay-${Date.now()}`,
    title: "New stay mode",
    blurb: "",
    img: "",
    pricing: {
      single: 0,
      double: 0,
    } as any,
    perNight: true,
    inclusions: [] as string[],
    notes: "",
  };
}

export function createEmptyActivityGroup() {
  return {
    group: "New group",
    items: [
      {
        title: "",
        body: "",
      },
    ],
  };
}

export function createEmptyFaq() {
  return {
    q: "New question",
    a: "",
  };
}

export function createEmptyTermsSection() {
  return {
    title: "New clause",
    body: "",
  };
}

export function createEmptyReview() {
  return {
    author: "Guest name",
    rating: 5,
    stayDate: "",
    text: "",
    location: "Google",
  };
}

export function createEmptyJournalPost() {
  return {
    id: `journal-${Date.now()}`,
    slug: `new-post-${Date.now()}`,
    kind: "story",
    title: "New journal post",
    date: "",
    img: "",
    excerpt: "",
    body: "",
  };
}

export function createEmptyNavItem() {
  return {
    key: `page-${Date.now()}`,
    label: "New page",
  };
}

export function createEmptyCurrency() {
  return {
    symbol: "",
    rate: 1,
    digits: 0,
    code: "NEW",
    label: "New currency",
  };
}

export function createEmptyImagePath() {
  return "/prototype-assets/";
}

export const ADMIN_UI = {
  pageBg: "var(--paper-2)",
  shellBg: "var(--paper)",
  shellBorder: "var(--rule)",
  sidebarBg: "#1C2B1F",
  sidebarText: "#EAE6DC",
  sidebarMuted: "#9DB89F",
  sidebarActiveBg: "rgba(255,255,255,0.10)",
  sidebarActiveBorder: "rgba(255,255,255,0.18)",
  cardBg: "var(--paper)",
  cardBorder: "var(--rule)",
  activeBg: "var(--ink)",
  activeText: "var(--paper)",
  focusBorder: "var(--accent)",
  textInk: "var(--ink)",
  textMuted: "var(--muted)",
  dangerText: "#8B3A1F",
  dangerBg: "rgba(139,58,31,0.08)",
  successText: "#4E6637",
  successBg: "rgba(78,102,55,0.08)",
  warningText: "#856404",
  warningBg: "#fff3cd",
  radius: 4,
};

export function panelStyle(): React.CSSProperties {
  return {
    background: ADMIN_UI.cardBg,
    border: `1px solid ${ADMIN_UI.shellBorder}`,
    borderRadius: ADMIN_UI.radius,
    padding: "24px 30px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };
}

export function buttonStyle(variant: "primary" | "accent" | "danger" | "ghost" = "primary", disabled = false): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    primary: {
      background: ADMIN_UI.activeBg,
      color: ADMIN_UI.activeText,
      border: "1px solid var(--ink)",
    },
    accent: {
      background: "var(--accent)",
      color: "var(--paper)",
      border: "1px solid var(--accent)",
    },
    ghost: {
      background: "transparent",
      color: ADMIN_UI.textInk,
      border: `1px solid ${ADMIN_UI.cardBorder}`,
    },
    danger: {
      background: "rgba(139, 58, 31, 0.08)",
      color: "var(--accent)",
      border: "1px solid rgba(139, 58, 31, 0.18)",
    },
  };

  return {
    ...map[variant],
    borderRadius: 16,
    padding: "11px 16px",
    fontSize: 14,
    fontFamily: "inherit",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.15s ease",
  };
}

