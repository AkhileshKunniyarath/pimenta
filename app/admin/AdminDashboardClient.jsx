"use client";

import * as React from "react";

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function formatDate(value) {
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

function countOf(value) {
  return Array.isArray(value) ? value.length : 0;
}

function normalizeBookingStatus(value) {
  if (value === "approved" || value === "rejected") {
    return value;
  }

  return "pending";
}

const BOOKING_HISTORY_PAGE_SIZE = 15;

function clampIndex(index, length) {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

function parseLines(value) {
  return `${value || ""}`
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatLines(value) {
  return Array.isArray(value) ? value.join("\n") : "";
}

function slugify(value, fallback = "item") {
  const result = `${value || ""}`
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return result || fallback;
}

function parseNumber(value) {
  if (`${value ?? ""}`.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function createEmptyPackage() {
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
    highlights: [],
    itinerary: [],
    pricing: {
      perPerson: 0,
    },
    notes: "",
    groupSize: {
      min: 1,
      max: 8,
    },
    bookingHours: "",
  };
}

function createEmptyRoom() {
  return {
    id: `room-${Date.now()}`,
    name: "New room",
    blurb: "",
    sqft: 0,
    guests: 2,
    img: "",
    features: [],
  };
}

function createEmptyStayMode() {
  return {
    id: `stay-${Date.now()}`,
    title: "New stay mode",
    blurb: "",
    img: "",
    pricing: {
      single: 0,
      double: 0,
    },
    perNight: true,
    inclusions: [],
    notes: "",
  };
}

function createEmptyActivityGroup() {
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

function createEmptyFaq() {
  return {
    q: "New question",
    a: "",
  };
}

function createEmptyTermsSection() {
  return {
    title: "New clause",
    body: "",
  };
}

function createEmptyReview() {
  return {
    name: "Guest name",
    where: "Google",
    date: "",
    stars: 5,
    short: "",
    long: "",
  };
}

function createEmptyJournalPost() {
  return {
    id: `journal-${Date.now()}`,
    kind: "story",
    title: "New journal post",
    date: "",
    img: "",
    excerpt: "",
  };
}

function createEmptyNavItem() {
  return {
    key: `page-${Date.now()}`,
    label: "New page",
  };
}

function createEmptyCurrency() {
  return {
    symbol: "",
    rate: 1,
    digits: 0,
    code: "NEW",
    label: "New currency",
  };
}

function createEmptyImagePath() {
  return "/prototype-assets/";
}

const ADMIN_UI = {
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
  text: "var(--ink)",
  muted: "var(--muted)",
  accent: "var(--accent)",
  accentSoft: "var(--accent-soft)",
};

function panelStyle() {
  return {
    border: `1px solid ${ADMIN_UI.cardBorder}`,
    borderRadius: 20,
    background: ADMIN_UI.cardBg,
    boxShadow: "0 2px 12px -6px rgba(31, 26, 21, 0.10)",
  };
}

function buttonStyle(variant = "primary", disabled = false) {
  const map = {
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
      color: ADMIN_UI.text,
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
  };
}

export default function AdminDashboardClient({
  initialBookings,
  bookingsStorage,
  initialContent,
  contentStorage,
  initialUpdatedAt,
}) {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [contentTab, setContentTab] = React.useState("today");
  const [stayTab, setStayTab] = React.useState("rooms");
  const [draftContent, setDraftContent] = React.useState(() => cloneJson(initialContent));
  const [savedContent, setSavedContent] = React.useState(() => cloneJson(initialContent));
  const [savedStorage, setSavedStorage] = React.useState(contentStorage);
  const [savedUpdatedAt, setSavedUpdatedAt] = React.useState(initialUpdatedAt);
  const [jsonText, setJsonText] = React.useState(
    JSON.stringify(initialContent, null, 2),
  );
  const [jsonDirty, setJsonDirty] = React.useState(false);
  const [saveState, setSaveState] = React.useState({
    type: "",
    message: "",
  });
  const [saving, setSaving] = React.useState(false);
  const [selectedNav, setSelectedNav] = React.useState(0);
  const [selectedPackage, setSelectedPackage] = React.useState(0);
  const [selectedRoom, setSelectedRoom] = React.useState(0);
  const [selectedStayMode, setSelectedStayMode] = React.useState(0);
  const [selectedActivity, setSelectedActivity] = React.useState(0);
  const [selectedFaq, setSelectedFaq] = React.useState(0);
  const [selectedTermsSection, setSelectedTermsSection] = React.useState(0);
  const [selectedReview, setSelectedReview] = React.useState(0);
  const [selectedJournal, setSelectedJournal] = React.useState(0);
  const [selectedCurrency, setSelectedCurrency] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [bookings, setBookings] = React.useState(() =>
    initialBookings.map((booking) => ({
      ...booking,
      status: normalizeBookingStatus(booking.status),
    })),
  );
  const [bookingArchiveTab, setBookingArchiveTab] = React.useState("approved");
  const [bookingHistoryPages, setBookingHistoryPages] = React.useState({
    approved: 1,
    rejected: 1,
  });
  const [bookingStatusMessage, setBookingStatusMessage] = React.useState({
    type: "",
    message: "",
  });
  const [updatingBookingIds, setUpdatingBookingIds] = React.useState([]);

  const dirty =
    JSON.stringify(draftContent) !== JSON.stringify(savedContent);

  React.useEffect(() => {
    if (!jsonDirty) {
      setJsonText(JSON.stringify(draftContent, null, 2));
    }
  }, [draftContent, jsonDirty]);

  const navItems = draftContent.NAV || [];
  const packages = draftContent.PACKAGES || [];
  const rooms = draftContent.ROOMS || [];
  const stayModes = draftContent.STAY_MODES || [];
  const activities = draftContent.ACTIVITIES || [];
  const faqs = draftContent.FAQS || [];
  const termsContent = draftContent.TERMS || {};
  const termSections = termsContent.sections || [];
  const reviews = draftContent.REVIEWS || [];
  const journalPosts = draftContent.JOURNAL_POSTS || [];
  const currencyEntries = Object.entries(draftContent.CURRENCY || {});
  const imageEntries = Object.entries(draftContent.IMG || {});
  const pendingBookings = bookings.filter(
    (booking) => normalizeBookingStatus(booking.status) === "pending",
  );
  const approvedBookings = bookings.filter(
    (booking) => normalizeBookingStatus(booking.status) === "approved",
  );
  const rejectedBookings = bookings.filter(
    (booking) => normalizeBookingStatus(booking.status) === "rejected",
  );
  const bookingHistoryBookings =
    bookingArchiveTab === "approved" ? approvedBookings : rejectedBookings;
  const bookingHistoryTotalPages = Math.max(
    1,
    Math.ceil(bookingHistoryBookings.length / BOOKING_HISTORY_PAGE_SIZE),
  );
  const bookingHistoryPage = Math.min(
    bookingHistoryPages[bookingArchiveTab] || 1,
    bookingHistoryTotalPages,
  );
  const bookingHistoryStart = (bookingHistoryPage - 1) * BOOKING_HISTORY_PAGE_SIZE;
  const paginatedBookingHistory = bookingHistoryBookings.slice(
    bookingHistoryStart,
    bookingHistoryStart + BOOKING_HISTORY_PAGE_SIZE,
  );

  React.useEffect(() => {
    setSelectedNav((current) => clampIndex(current, navItems.length));
  }, [navItems.length]);

  React.useEffect(() => {
    setSelectedPackage((current) => clampIndex(current, packages.length));
  }, [packages.length]);

  React.useEffect(() => {
    setSelectedRoom((current) => clampIndex(current, rooms.length));
  }, [rooms.length]);

  React.useEffect(() => {
    setSelectedStayMode((current) => clampIndex(current, stayModes.length));
  }, [stayModes.length]);

  React.useEffect(() => {
    setSelectedActivity((current) => clampIndex(current, activities.length));
  }, [activities.length]);

  React.useEffect(() => {
    setSelectedFaq((current) => clampIndex(current, faqs.length));
  }, [faqs.length]);

  React.useEffect(() => {
    setSelectedTermsSection((current) =>
      clampIndex(current, termSections.length),
    );
  }, [termSections.length]);

  React.useEffect(() => {
    setSelectedReview((current) => clampIndex(current, reviews.length));
  }, [reviews.length]);

  React.useEffect(() => {
    setSelectedJournal((current) => clampIndex(current, journalPosts.length));
  }, [journalPosts.length]);

  React.useEffect(() => {
    setSelectedCurrency((current) => clampIndex(current, currencyEntries.length));
  }, [currencyEntries.length]);

  React.useEffect(() => {
    setSelectedImage((current) => clampIndex(current, imageEntries.length));
  }, [imageEntries.length]);

  React.useEffect(() => {
    setBookingHistoryPages((current) => ({
      approved: Math.min(
        current.approved,
        Math.max(1, Math.ceil(approvedBookings.length / BOOKING_HISTORY_PAGE_SIZE)),
      ),
      rejected: Math.min(
        current.rejected,
        Math.max(1, Math.ceil(rejectedBookings.length / BOOKING_HISTORY_PAGE_SIZE)),
      ),
    }));
  }, [approvedBookings.length, rejectedBookings.length]);

  const stats = [
    { label: "Programs", value: countOf(packages), icon: "🎒" },
    { label: "Rooms", value: countOf(rooms), icon: "🛏️" },
    { label: "Stay modes", value: countOf(stayModes), icon: "🏡" },
    { label: "FAQs", value: countOf(faqs), icon: "❓" },
    { label: "Bookings", value: countOf(bookings), icon: "📅" },
    { label: "Stories", value: countOf(journalPosts), icon: "📖" },
  ];

  function updateDraft(updater) {
    setDraftContent((current) => {
      const nextBase = cloneJson(current);
      const next =
        typeof updater === "function" ? updater(nextBase) || nextBase : updater;
      return next;
    });
  }

  async function persistContent(nextContent, successMessage) {
    setSaving(true);
    setSaveState({ type: "", message: "" });

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: nextContent }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to save content.");
      }

      setSavedContent(cloneJson(result.content));
      setDraftContent(cloneJson(result.content));
      setSavedStorage(result.storage);
      setSavedUpdatedAt(result.updatedAt);
      setJsonText(JSON.stringify(result.content, null, 2));
      setJsonDirty(false);
      setSaveState({
        type: "success",
        message: successMessage,
      });
    } catch (error) {
      setSaveState({
        type: "error",
        message: error.message || "Unable to save content.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function saveDraftContent() {
    await persistContent(
      draftContent,
      "Admin changes saved successfully.",
    );
  }

  function resetDraftContent() {
    setDraftContent(cloneJson(savedContent));
    setJsonText(JSON.stringify(savedContent, null, 2));
    setJsonDirty(false);
    setSaveState({ type: "", message: "" });
  }

  async function saveJsonContent() {
    try {
      const parsed = JSON.parse(jsonText);
      await persistContent(
        parsed,
        "Advanced JSON changes saved successfully.",
      );
    } catch (error) {
      setSaveState({
        type: "error",
        message: error.message || "Invalid JSON content.",
      });
    }
  }

  async function updateBookingStatusAction(bookingId, nextStatus) {
    const currentBooking = bookings.find((booking) => booking._id === bookingId);
    const previousStatus = normalizeBookingStatus(currentBooking?.status);

    if (!bookingId || !currentBooking || previousStatus === nextStatus) {
      return;
    }

    setBookingStatusMessage({ type: "", message: "" });
    setUpdatingBookingIds((current) =>
      current.includes(bookingId) ? current : [...current, bookingId],
    );
    setBookings((current) =>
      current.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: nextStatus }
          : booking,
      ),
    );

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          status: nextStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update booking status.");
      }

      if (result.booking) {
        setBookings((current) =>
          current.map((booking) =>
            booking._id === bookingId
              ? {
                  ...booking,
                  ...result.booking,
                  status: normalizeBookingStatus(result.booking.status),
                }
              : booking,
          ),
        );
      }
    } catch (error) {
      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: previousStatus }
            : booking,
        ),
      );
      setBookingStatusMessage({
        type: "error",
        message: error.message || "Unable to update booking status.",
      });
    } finally {
      setUpdatingBookingIds((current) =>
        current.filter((id) => id !== bookingId),
      );
    }
  }

  function updateBrand(path, value) {
    updateDraft((next) => {
      next.BRAND = next.BRAND || {};

      if (path.startsWith("location.")) {
        next.BRAND.location = next.BRAND.location || {};
        next.BRAND.location[path.replace("location.", "")] = value;
      } else if (path.startsWith("contact.")) {
        next.BRAND.contact = next.BRAND.contact || {};
        next.BRAND.contact[path.replace("contact.", "")] = value;
      } else {
        next.BRAND[path] = value;
      }

      return next;
    });
  }

  function updateArraySection(section, nextArray) {
    updateDraft((next) => {
      next[section] = nextArray;
      return next;
    });
  }

  function updateArrayItem(section, index, updater) {
    updateDraft((next) => {
      const list = Array.isArray(next[section]) ? [...next[section]] : [];
      const currentItem = cloneJson(list[index] || {});
      list[index] =
        typeof updater === "function" ? updater(currentItem) || currentItem : updater;
      next[section] = list;
      return next;
    });
  }

  function addArrayItem(section, item) {
    updateDraft((next) => {
      const list = Array.isArray(next[section]) ? [...next[section]] : [];
      list.push(item);
      next[section] = list;
      return next;
    });
  }

  function removeArrayItem(section, index) {
    updateDraft((next) => {
      const list = Array.isArray(next[section]) ? [...next[section]] : [];
      list.splice(index, 1);
      next[section] = list;
      return next;
    });
  }

  function addCurrencyEntry() {
    updateDraft((next) => {
      next.CURRENCY = next.CURRENCY || {};
      let counter = Object.keys(next.CURRENCY).length + 1;
      let key = `NEW_${counter}`;

      while (next.CURRENCY[key]) {
        counter += 1;
        key = `NEW_${counter}`;
      }

      next.CURRENCY[key] = createEmptyCurrency();
      return next;
    });

    setSelectedCurrency(currencyEntries.length);
  }

  function updateCurrencyEntry(key, field, value) {
    updateDraft((next) => {
      next.CURRENCY = next.CURRENCY || {};
      next.CURRENCY[key] = next.CURRENCY[key] || createEmptyCurrency();
      next.CURRENCY[key][field] = value;
      return next;
    });
  }

  function removeCurrencyEntry(key) {
    updateDraft((next) => {
      const currency = { ...(next.CURRENCY || {}) };
      delete currency[key];
      next.CURRENCY = currency;
      return next;
    });
  }

  function addImageEntry() {
    updateDraft((next) => {
      next.IMG = next.IMG || {};
      let counter = Object.keys(next.IMG).length + 1;
      let key = `image${counter}`;

      while (next.IMG[key]) {
        counter += 1;
        key = `image${counter}`;
      }

      next.IMG[key] = createEmptyImagePath();
      return next;
    });

    setSelectedImage(imageEntries.length);
  }

  function updateImageEntry(key, value) {
    updateDraft((next) => {
      next.IMG = next.IMG || {};
      next.IMG[key] = value;
      return next;
    });
  }

  function removeImageEntry(key) {
    updateDraft((next) => {
      const images = { ...(next.IMG || {}) };
      delete images[key];
      next.IMG = images;
      return next;
    });
  }

  function updateTermsSection(index, updater) {
    updateDraft((next) => {
      const terms = { ...(next.TERMS || {}) };
      const sections = Array.isArray(terms.sections) ? [...terms.sections] : [];
      const currentItem = cloneJson(sections[index] || createEmptyTermsSection());
      sections[index] =
        typeof updater === "function" ? updater(currentItem) || currentItem : updater;
      terms.sections = sections;
      next.TERMS = terms;
      return next;
    });
  }

  function addTermsSection() {
    updateDraft((next) => {
      const terms = { ...(next.TERMS || {}) };
      const sections = Array.isArray(terms.sections) ? [...terms.sections] : [];
      sections.push(createEmptyTermsSection());
      terms.sections = sections;
      next.TERMS = terms;
      return next;
    });

    setSelectedTermsSection(termSections.length);
  }

  function removeTermsSection(index) {
    updateDraft((next) => {
      const terms = { ...(next.TERMS || {}) };
      const sections = Array.isArray(terms.sections) ? [...terms.sections] : [];
      sections.splice(index, 1);
      terms.sections = sections;
      next.TERMS = terms;
      return next;
    });
  }

  const currentPackage = packages[selectedPackage];
  const currentRoom = rooms[selectedRoom];
  const currentStayMode = stayModes[selectedStayMode];
  const currentActivity = activities[selectedActivity];
  const currentFaq = faqs[selectedFaq];
  const currentTermsSection = termSections[selectedTermsSection];
  const currentReview = reviews[selectedReview];
  const currentJournal = journalPosts[selectedJournal];
  const currentCurrencyEntry = currencyEntries[selectedCurrency];
  const currentImageEntry = imageEntries[selectedImage];

  const tabs = [
    {
      id: "overview",
      label: "Dashboard",
      note: "Quick summary and status",
      badge: "01",
      icon: "📊",
    },
    {
      id: "business",
      label: "Business",
      note: "Shop, contact, and location",
      badge: "02",
      icon: "🏡",
    },
    {
      id: "navigation",
      label: "Navigation",
      note: `${navItems.length} menu items`,
      badge: "03",
      icon: "🔗",
    },
    {
      id: "packages",
      label: "Packages",
      note: `${packages.length} experience offers`,
      badge: "04",
      icon: "🎒",
    },
    {
      id: "stay",
      label: "Stay",
      note: `${rooms.length} rooms · ${stayModes.length} stay modes`,
      badge: "05",
      icon: "🛏️",
    },
    {
      id: "content",
      label: "Content",
      note: "FAQs, reviews, media, stories",
      badge: "06",
      icon: "📝",
    },
    {
      id: "bookings",
      label: "Bookings",
      note: `${bookings.length} enquiries`,
      badge: "07",
      icon: "📅",
    },
    {
      id: "advanced",
      label: "Advanced",
      note: "Raw JSON editor",
      badge: "08",
      icon: "⚙️",
    },
  ];

  const activeTabMeta = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const recentBookings = bookings.slice(0, 5);
  const brandLocation = draftContent.BRAND?.location?.region
    ? `${draftContent.BRAND?.location?.village || "Location"} · ${
        draftContent.BRAND.location.region
      }`
    : draftContent.BRAND?.location?.village || "Location not set";
  const businessChecklist = [
    {
      label: "Business profile",
      done: Boolean(draftContent.BRAND?.name && draftContent.BRAND?.host),
    },
    {
      label: "Contact details",
      done: Boolean(
        draftContent.BRAND?.contact?.email && draftContent.BRAND?.contact?.phone,
      ),
    },
    {
      label: "Stay catalog",
      done: rooms.length > 0 && stayModes.length > 0,
    },
    {
      label: "Experience packages",
      done: packages.length > 0,
    },
    {
      label: "Stories and reviews",
      done: journalPosts.length > 0 && reviews.length > 0,
    },
  ];
  const completedBusinessChecks = businessChecklist.filter((item) => item.done).length;
  const completionPercent = Math.round(
    (completedBusinessChecks / businessChecklist.length) * 100,
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: ADMIN_UI.pageBg,
        color: ADMIN_UI.text,
      }}
    >
      {/* ── Fixed left sidebar ── */}
      <aside
        style={{
          width: 260,
          flexShrink: 0,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          overflowY: "auto",
          background: ADMIN_UI.sidebarBg,
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
        }}
      >
        {/* Logo block */}
        <div
          style={{
            padding: "28px 24px 22px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="mono tracked"
            style={{ color: ADMIN_UI.sidebarMuted, fontSize: 10 }}
          >
            Admin portal
          </div>
          <div
            className="serif"
            style={{ fontSize: 28, marginTop: 8, color: ADMIN_UI.sidebarText, lineHeight: 1.1 }}
          >
            The Pimenta
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "16px 14px" }}>
          <div style={{ display: "grid", gap: 4 }}>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: 12,
                    border: "1px solid " + (isActive ? ADMIN_UI.sidebarActiveBorder : "transparent"),
                    background: isActive ? ADMIN_UI.sidebarActiveBg : "transparent",
                    color: isActive ? "var(--paper)" : ADMIN_UI.sidebarMuted,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      display: "grid",
                      placeItems: "center",
                      background: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {tab.icon}
                  </span>
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 400,
                        lineHeight: 1.2,
                        color: isActive ? "var(--paper)" : ADMIN_UI.sidebarMuted,
                      }}
                    >
                      {tab.label}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 11,
                        marginTop: 2,
                        color: isActive ? "rgba(234,230,220,0.65)" : ADMIN_UI.sidebarMuted,
                        lineHeight: 1.3,
                      }}
                    >
                      {tab.note}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div
          style={{
            padding: "16px 14px 24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              textDecoration: "none",
              padding: "10px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.07)",
              color: ADMIN_UI.sidebarText,
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            🌐 View website
          </a>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div
        style={{
          marginLeft: 260,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Top header bar */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            background: ADMIN_UI.shellBg,
            borderBottom: `1px solid ${ADMIN_UI.shellBorder}`,
            padding: "0 28px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <span className="serif" style={{ fontSize: 22, lineHeight: 1 }}>
              {activeTabMeta.label}
            </span>
            <span
              style={{
                marginLeft: 12,
                fontSize: 13,
                color: ADMIN_UI.muted,
              }}
            >
              {activeTabMeta.note}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {dirty && (
              <span
                style={{
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 999,
                  background: "rgba(139,58,31,0.1)",
                  color: ADMIN_UI.accent,
                  fontWeight: 600,
                  border: "1px solid rgba(139,58,31,0.18)",
                }}
              >
                Unsaved
              </span>
            )}
            <button
              onClick={saveDraftContent}
              disabled={!dirty || saving}
              style={{
                ...buttonStyle("accent", !dirty || saving),
                padding: "9px 18px",
                fontSize: 13,
              }}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            {dirty && (
              <button
                onClick={resetDraftContent}
                disabled={saving}
                style={{
                  ...buttonStyle("ghost", saving),
                  padding: "9px 18px",
                  fontSize: 13,
                }}
              >
                Cancel
              </button>
            )}
            {/* Notification bell */}
            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              aria-label="Open bookings"
              title="Open bookings"
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                border: `1px solid ${ADMIN_UI.cardBorder}`,
                background: ADMIN_UI.cardBg,
                display: "grid",
                placeItems: "center",
                fontSize: 16,
                cursor: "pointer",
                position: "relative",
                fontFamily: "inherit",
              }}
            >
              🔔
              {pendingBookings.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
              )}
            </button>
            {/* User avatar */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "var(--ink)",
                color: "var(--paper)",
                display: "grid",
                placeItems: "center",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "28px 28px 48px", display: "grid", gap: 20, alignContent: "start" }}>

            {saveState.message ? (
              <div
                style={{
                  ...panelStyle(),
                  padding: "14px 18px",
                  border:
                    "1px solid " +
                    (saveState.type === "error"
                      ? "rgba(139, 58, 31, 0.22)"
                      : "rgba(47, 62, 42, 0.14)"),
                  background:
                    saveState.type === "error"
                      ? "rgba(139, 58, 31, 0.08)"
                      : "rgba(47, 62, 42, 0.08)",
                  color:
                    saveState.type === "error"
                      ? "var(--accent)"
                      : "var(--accent-2)",
                }}
              >
                {saveState.message}
              </div>
            ) : null}

            {activeTab === "overview" && (
              <div style={{ display: "grid", gap: 18 }}>

                {/* Hero stat strip */}
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <section
                    style={{
                      ...panelStyle(),
                      flex: "0 1 320px",
                      padding: 22,
                      background: "var(--ink)",
                      color: "var(--paper)",
                      display: "grid",
                      gap: 14,
                    }}
                  >
                    <div className="mono tracked" style={{ color: "var(--accent-soft)" }}>
                      Content storage
                    </div>
                    <div className="serif" style={{ fontSize: 32, marginTop: 4 }}>
                      {savedStorage}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(243,237,226,0.75)", lineHeight: 1.6 }}>
                      Last updated: {formatDate(savedUpdatedAt)}
                    </div>
                    <MiniStatDark label="Draft status" value={dirty ? "Unsaved changes pending" : "Up to date"} />
                  </section>

                  <section
                    style={{
                      ...panelStyle(),
                      flex: "1 1 480px",
                      padding: 28,
                      background: "linear-gradient(135deg, var(--paper) 0%, var(--paper-2) 100%)",
                    }}
                  >
                    <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
                      Pimenta Admin Panel
                    </div>
                    <h1
                      className="serif"
                      style={{
                        fontSize: "clamp(32px, 4vw, 52px)",
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        margin: "10px 0 8px",
                      }}
                    >
                      Dashboard
                    </h1>
                    <p style={{ margin: 0, fontSize: 14, color: ADMIN_UI.muted, lineHeight: 1.7 }}>
                      Update business details, packages, stays, stories, and bookings from one place.
                    </p>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
                      <button
                        onClick={saveDraftContent}
                        disabled={!dirty || saving}
                        style={buttonStyle("accent", !dirty || saving)}
                      >
                        {saving ? "Saving..." : "Save all changes"}
                      </button>
                      <button
                        onClick={resetDraftContent}
                        disabled={!dirty || saving}
                        style={buttonStyle("ghost", !dirty || saving)}
                      >
                        Reset changes
                      </button>
                    </div>
                  </section>
                </div>

                {/* Stat cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 14,
                  }}
                >
                  {stats.map((stat) => (
                    <DashboardStatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
                  ))}
                </div>

                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <section
                    style={{
                      ...panelStyle(),
                      flex: "1 1 560px",
                      padding: 24,
                    }}
                  >
                    <SectionHeader
                      eyebrow="Business snapshot"
                      title={draftContent.BRAND?.name || "Business details"}
                      body="The key shop information that powers the public website."
                    />
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: 14,
                      }}
                    >
                      <MiniStat label="Location" value={brandLocation} />
                      <MiniStat
                        label="Contact"
                        value={draftContent.BRAND?.contact?.phone || "Not added"}
                      />
                      <MiniStat
                        label="Email"
                        value={draftContent.BRAND?.contact?.email || "Not added"}
                      />
                      <MiniStat
                        label="Host"
                        value={draftContent.BRAND?.host || "Not added"}
                      />
                    </div>
                  </section>

                  <section
                    style={{
                      ...panelStyle(),
                      flex: "1 1 340px",
                      padding: 24,
                    }}
                  >
                    <SectionHeader
                      eyebrow="Content status"
                      title={`${completionPercent}% ready`}
                      body="A quick view of the main website sections that already have data."
                    />
                    <div
                      style={{
                        height: 10,
                        borderRadius: 999,
                        background: "var(--paper-2)",
                        overflow: "hidden",
                        marginBottom: 18,
                      }}
                    >
                      <div
                        style={{
                          width: `${completionPercent}%`,
                          height: "100%",
                          background: "var(--accent)",
                        }}
                      />
                    </div>
                    <div style={{ display: "grid", gap: 10 }}>
                      {businessChecklist.map((item) => (
                        <StatusListItem
                          key={item.label}
                          label={item.label}
                          done={item.done}
                        />
                      ))}
                    </div>
                  </section>
                </div>

                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <section
                    style={{
                      ...panelStyle(),
                      flex: "1 1 620px",
                      padding: 24,
                    }}
                  >
                    <SectionHeader
                      eyebrow="Navigation map"
                      title="Main admin sections"
                      body="Jump into the area you want to update next."
                    />
                    <div style={{ display: "grid", gap: 12 }}>
                      {tabs
                        .filter((tab) => tab.id !== "overview")
                        .map((tab) => (
                          <NavShortcutRow
                            key={tab.id}
                            badge={tab.badge}
                            label={tab.label}
                            note={tab.note}
                            active={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                          />
                        ))}
                    </div>
                  </section>

                  <div style={{ flex: "1 1 340px", display: "grid", gap: 18 }}>
                    <section
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: 14,
                      }}
                    >
                      <DashboardStatCard label="Programs" value={packages.length} compact icon="🎒" />
                      <DashboardStatCard label="Rooms" value={rooms.length} compact icon="🛏️" />
                      <DashboardStatCard label="Reviews" value={reviews.length} compact icon="⭐" />
                      <DashboardStatCard
                        label="Enquiries"
                        value={bookings.length}
                        compact
                        icon="📅"
                      />
                    </section>

                    <section
                      style={{
                        ...panelStyle(),
                        padding: 24,
                        background: "var(--ink)",
                        color: "var(--paper)",
                      }}
                    >
                      <div className="mono tracked" style={{ color: "var(--accent-soft)" }}>
                        Editor reminder
                      </div>
                      <div
                        className="serif"
                        style={{ fontSize: 34, lineHeight: 1.02, marginTop: 12 }}
                      >
                        Update place, contact, or offers in one flow.
                      </div>
                      <p
                        style={{
                          margin: "14px 0 0",
                          color: "rgba(243, 237, 226, 0.78)",
                          lineHeight: 1.7,
                          fontSize: 14,
                        }}
                      >
                        Use Business for address and phone, Packages for
                        experiences, Stay for rooms, and Content for stories,
                        reviews, currencies, and images.
                      </p>
                    </section>

                    <section style={{ ...panelStyle(), padding: 24 }}>
                      <SectionHeader
                        eyebrow="Recent enquiries"
                        title={
                          recentBookings[0]
                            ? recentBookings[0].name
                            : "No enquiries yet"
                        }
                        body={
                          recentBookings[0]
                            ? recentBookings[0].email
                            : "New website enquiries will appear here."
                        }
                      />
                      {recentBookings.length ? (
                        <div style={{ display: "grid", gap: 10 }}>
                          {recentBookings.map((booking) => (
                            <MiniStat
                              key={booking._id || `${booking.email}-${booking.createdAt}`}
                              label={booking.packageTitle || "Enquiry"}
                              value={`${booking.name} · ${formatDate(booking.createdAt)}`}
                            />
                          ))}
                        </div>
                      ) : null}
                    </section>
                  </div>
                </div>
              </div>
            )}

        {activeTab === "business" && (
          <section style={{ ...panelStyle(), padding: 24 }}>
            <SectionHeader
              eyebrow="Business details"
              title="Shop profile, contact, and location"
              body="This is the core information for your property, brand, and direct contact details."
            />

            <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
              <Field
                label="Business name"
                value={draftContent.BRAND?.name || ""}
                onChange={(value) => updateBrand("name", value)}
              />
              <Field
                label="Parent brand"
                value={draftContent.BRAND?.parent || ""}
                onChange={(value) => updateBrand("parent", value)}
              />
              <Field
                label="Family / owner line"
                value={draftContent.BRAND?.family || ""}
                onChange={(value) => updateBrand("family", value)}
              />
              <Field
                label="Host name"
                value={draftContent.BRAND?.host || ""}
                onChange={(value) => updateBrand("host", value)}
              />
              <Field
                label="Farm established"
                value={draftContent.BRAND?.farmEst ?? ""}
                onChange={(value) => updateBrand("farmEst", parseNumber(value))}
                inputMode="numeric"
              />
              <Field
                label="Guests since"
                value={draftContent.BRAND?.guestsEst ?? ""}
                onChange={(value) => updateBrand("guestsEst", parseNumber(value))}
                inputMode="numeric"
              />
              <Field
                label="Acres"
                value={draftContent.BRAND?.acres ?? ""}
                onChange={(value) => updateBrand("acres", parseNumber(value))}
                inputMode="decimal"
              />
              <Field
                label="Bungalows"
                value={draftContent.BRAND?.bungalows ?? ""}
                onChange={(value) => updateBrand("bungalows", parseNumber(value))}
                inputMode="numeric"
              />
            </Grid>

            <SubsectionTitle title="Location" />
            <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
              <Field
                label="Village / area"
                value={draftContent.BRAND?.location?.village || ""}
                onChange={(value) => updateBrand("location.village", value)}
              />
              <Field
                label="Region / city"
                value={draftContent.BRAND?.location?.region || ""}
                onChange={(value) => updateBrand("location.region", value)}
              />
              <Field
                label="Coordinates"
                value={draftContent.BRAND?.location?.coords || ""}
                onChange={(value) => updateBrand("location.coords", value)}
              />
              <Field
                label="Nearest airport"
                value={draftContent.BRAND?.location?.nearestAirport || ""}
                onChange={(value) => updateBrand("location.nearestAirport", value)}
              />
              <Field
                label="Nearest station"
                value={draftContent.BRAND?.location?.nearestStation || ""}
                onChange={(value) => updateBrand("location.nearestStation", value)}
              />
            </Grid>
            <Field
              label="Address"
              value={draftContent.BRAND?.location?.address || ""}
              onChange={(value) => updateBrand("location.address", value)}
              multiline
            />

            <SubsectionTitle title="Contact" />
            <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
              <Field
                label="Email"
                value={draftContent.BRAND?.contact?.email || ""}
                onChange={(value) => updateBrand("contact.email", value)}
                type="email"
              />
              <Field
                label="Phone"
                value={draftContent.BRAND?.contact?.phone || ""}
                onChange={(value) => updateBrand("contact.phone", value)}
              />
              <Field
                label="WhatsApp"
                value={draftContent.BRAND?.contact?.whatsapp || ""}
                onChange={(value) => updateBrand("contact.whatsapp", value)}
              />
              <Field
                label="Website"
                value={draftContent.BRAND?.contact?.web || ""}
                onChange={(value) => updateBrand("contact.web", value)}
              />
              <Field
                label="Business hours"
                value={draftContent.BRAND?.hours || ""}
                onChange={(value) => updateBrand("hours", value)}
              />
              <Field
                label="Response time"
                value={draftContent.BRAND?.responseTime || ""}
                onChange={(value) => updateBrand("responseTime", value)}
              />
              <Field
                label="Valid until"
                value={draftContent.BRAND?.validUntil || ""}
                onChange={(value) => updateBrand("validUntil", value)}
              />
            </Grid>
          </section>
        )}

        {activeTab === "navigation" && (
          <SplitEditor
            listTitle="Navigation items"
            listItems={navItems}
            selectedIndex={selectedNav}
            onSelect={setSelectedNav}
            onAdd={() => {
              addArrayItem("NAV", createEmptyNavItem());
              setSelectedNav(navItems.length);
            }}
            onRemove={() => removeArrayItem("NAV", selectedNav)}
            renderLabel={(item) => item.label || item.key || "Untitled page"}
            emptyMessage="No navigation items yet."
          >
            {currentItemExists(currentNavItem(navItems, selectedNav)) ? (
              <div style={{ display: "grid", gap: 16 }}>
                <SectionHeader
                  eyebrow="Navigation editor"
                  title="Menu item"
                  body="Edit the menu label and route key used on the site."
                />
                <Field
                  label="Label"
                  value={navItems[selectedNav]?.label || ""}
                  onChange={(value) =>
                    updateArrayItem("NAV", selectedNav, (item) => ({
                      ...item,
                      label: value,
                    }))
                  }
                />
                <Field
                  label="Key / route"
                  value={navItems[selectedNav]?.key || ""}
                  onChange={(value) =>
                    updateArrayItem("NAV", selectedNav, (item) => ({
                      ...item,
                      key: slugify(value, "page"),
                    }))
                  }
                />
              </div>
            ) : (
              <EmptyEditor message="Select or add a navigation item to edit it." />
            )}
          </SplitEditor>
        )}

        {activeTab === "packages" && (
          <SplitEditor
            listTitle="Packages"
            listItems={packages}
            selectedIndex={selectedPackage}
            onSelect={setSelectedPackage}
            onAdd={() => {
              addArrayItem("PACKAGES", createEmptyPackage());
              setSelectedPackage(packages.length);
            }}
            onRemove={() => removeArrayItem("PACKAGES", selectedPackage)}
            renderLabel={(item) => item.title || "Untitled package"}
            renderMeta={(item) => item.slug || item.category || ""}
            emptyMessage="No packages added yet."
          >
            {currentPackage ? (
              <div style={{ display: "grid", gap: 18 }}>
                <SectionHeader
                  eyebrow="Package editor"
                  title={currentPackage.title || "Package details"}
                  body="Edit experience details, pricing, highlights, and itinerary in one place."
                />

                <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                  <Field
                    label="Title"
                    value={currentPackage.title || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        title: value,
                        id: item.id || slugify(value, "package"),
                        slug: item.slug || slugify(value, "package"),
                      }))
                    }
                  />
                  <Field
                    label="Slug"
                    value={currentPackage.slug || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        slug: slugify(value, "package"),
                      }))
                    }
                  />
                  <Field
                    label="ID"
                    value={currentPackage.id || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        id: slugify(value, "package"),
                      }))
                    }
                  />
                  <Field
                    label="Subtitle"
                    value={currentPackage.subtitle || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        subtitle: value,
                      }))
                    }
                  />
                  <Field
                    label="Category"
                    value={currentPackage.category || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        category: value,
                      }))
                    }
                  />
                  <Field
                    label="Focus"
                    value={currentPackage.focus || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        focus: value,
                      }))
                    }
                  />
                  <Field
                    label="Nights"
                    value={currentPackage.nights ?? ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        nights: parseNumber(value),
                      }))
                    }
                    inputMode="numeric"
                  />
                  <Field
                    label="Days"
                    value={currentPackage.days ?? ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        days: parseNumber(value),
                      }))
                    }
                    inputMode="numeric"
                  />
                  <Field
                    label="Intensity"
                    value={currentPackage.intensity || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        intensity: value,
                      }))
                    }
                  />
                  <Field
                    label="Image path"
                    value={currentPackage.img || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        img: value,
                      }))
                    }
                  />
                  <Field
                    label="Per person price"
                    value={currentPackage.pricing?.perPerson ?? ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        pricing: {
                          ...(item.pricing || {}),
                          perPerson: parseNumber(value),
                        },
                      }))
                    }
                    inputMode="numeric"
                  />
                  <Field
                    label="Booking hours"
                    value={currentPackage.bookingHours || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        bookingHours: value,
                      }))
                    }
                  />
                  <Field
                    label="Min group"
                    value={currentPackage.groupSize?.min ?? ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        groupSize: {
                          ...(item.groupSize || {}),
                          min: parseNumber(value),
                        },
                      }))
                    }
                    inputMode="numeric"
                  />
                  <Field
                    label="Max group"
                    value={currentPackage.groupSize?.max ?? ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        groupSize: {
                          ...(item.groupSize || {}),
                          max: parseNumber(value),
                        },
                      }))
                    }
                    inputMode="numeric"
                  />
                </Grid>

                <Field
                  label="Short blurb"
                  value={currentPackage.blurb || ""}
                  onChange={(value) =>
                    updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                      ...item,
                      blurb: value,
                    }))
                  }
                  multiline
                />
                <Field
                  label="Long description"
                  value={currentPackage.longBlurb || ""}
                  onChange={(value) =>
                    updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                      ...item,
                      longBlurb: value,
                    }))
                  }
                  multiline
                  rows={5}
                />
                <Field
                  label="Notes"
                  value={currentPackage.notes || ""}
                  onChange={(value) =>
                    updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                      ...item,
                      notes: value,
                    }))
                  }
                  multiline
                />
                <Field
                  label="Highlights"
                  hint="One highlight per line"
                  value={formatLines(currentPackage.highlights)}
                  onChange={(value) =>
                    updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                      ...item,
                      highlights: parseLines(value),
                    }))
                  }
                  multiline
                  rows={6}
                />

                <SubsectionTitle title="Itinerary" />
                <div style={{ display: "grid", gap: 12 }}>
                  {(currentPackage.itinerary || []).map((step, index) => (
                    <div
                      key={`${step.day}-${index}`}
                      style={{
                        ...panelStyle(),
                        padding: 16,
                        background: "var(--paper)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div className="mono tracked" style={{ color: "var(--muted)" }}>
                          Step {index + 1}
                        </div>
                        <button
                          onClick={() =>
                            updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                              ...item,
                              itinerary: (item.itinerary || []).filter(
                                (_, stepIndex) => stepIndex !== index,
                              ),
                            }))
                          }
                          style={buttonStyle("danger")}
                        >
                          Remove step
                        </button>
                      </div>
                      <Grid columns="repeat(auto-fit, minmax(180px, 1fr))">
                        <Field
                          label="Day / time"
                          value={step.day || ""}
                          onChange={(value) =>
                            updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                              ...item,
                              itinerary: (item.itinerary || []).map((entry, entryIndex) =>
                                entryIndex === index
                                  ? { ...entry, day: value }
                                  : entry,
                              ),
                            }))
                          }
                        />
                        <Field
                          label="Title"
                          value={step.title || ""}
                          onChange={(value) =>
                            updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                              ...item,
                              itinerary: (item.itinerary || []).map((entry, entryIndex) =>
                                entryIndex === index
                                  ? { ...entry, title: value }
                                  : entry,
                              ),
                            }))
                          }
                        />
                      </Grid>
                      <Field
                        label="Description"
                        value={step.body || ""}
                        onChange={(value) =>
                          updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                            ...item,
                            itinerary: (item.itinerary || []).map((entry, entryIndex) =>
                              entryIndex === index
                                ? { ...entry, body: value }
                                : entry,
                            ),
                          }))
                        }
                        multiline
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                      ...item,
                      itinerary: [
                        ...(item.itinerary || []),
                        {
                          day: "",
                          title: "",
                          body: "",
                        },
                      ],
                    }))
                  }
                  style={buttonStyle("ghost")}
                >
                  Add itinerary step
                </button>
              </div>
            ) : (
              <EmptyEditor message="Select or add a package to edit it." />
            )}
          </SplitEditor>
        )}

        {activeTab === "stay" && (
          <section style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { id: "rooms", label: "Rooms" },
                { id: "modes", label: "Stay modes" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setStayTab(item.id)}
                  style={{
                    borderRadius: 999,
                    padding: "10px 16px",
                    border:
                      "1px solid " +
                      (stayTab === item.id
                        ? "var(--ink)"
                        : "var(--rule)"),
                    background:
                      stayTab === item.id
                        ? "var(--ink)"
                        : "transparent",
                    color: stayTab === item.id ? "var(--paper)" : "var(--ink-2)",
                    cursor: "pointer",
                    fontSize: 14,
                    fontFamily: "inherit",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {stayTab === "rooms" ? (
              <SplitEditor
                listTitle="Rooms"
                listItems={rooms}
                selectedIndex={selectedRoom}
                onSelect={setSelectedRoom}
                onAdd={() => {
                  addArrayItem("ROOMS", createEmptyRoom());
                  setSelectedRoom(rooms.length);
                }}
                onRemove={() => removeArrayItem("ROOMS", selectedRoom)}
                renderLabel={(item) => item.name || "Untitled room"}
                renderMeta={(item) => `${item.guests || 0} guests`}
                emptyMessage="No rooms added yet."
              >
                {currentRoom ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Room editor"
                      title={currentRoom.name || "Room details"}
                      body="Manage room name, short copy, occupancy, features, and image."
                    />
                    <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                      <Field
                        label="Room name"
                        value={currentRoom.name || ""}
                        onChange={(value) =>
                          updateArrayItem("ROOMS", selectedRoom, (item) => ({
                            ...item,
                            name: value,
                          }))
                        }
                      />
                      <Field
                        label="Room ID"
                        value={currentRoom.id || ""}
                        onChange={(value) =>
                          updateArrayItem("ROOMS", selectedRoom, (item) => ({
                            ...item,
                            id: slugify(value, "room"),
                          }))
                        }
                      />
                      <Field
                        label="Square feet"
                        value={currentRoom.sqft ?? ""}
                        onChange={(value) =>
                          updateArrayItem("ROOMS", selectedRoom, (item) => ({
                            ...item,
                            sqft: parseNumber(value),
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Guests"
                        value={currentRoom.guests ?? ""}
                        onChange={(value) =>
                          updateArrayItem("ROOMS", selectedRoom, (item) => ({
                            ...item,
                            guests: parseNumber(value),
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Image path"
                        value={currentRoom.img || ""}
                        onChange={(value) =>
                          updateArrayItem("ROOMS", selectedRoom, (item) => ({
                            ...item,
                            img: value,
                          }))
                        }
                      />
                    </Grid>
                    <Field
                      label="Short description"
                      value={currentRoom.blurb || ""}
                      onChange={(value) =>
                        updateArrayItem("ROOMS", selectedRoom, (item) => ({
                          ...item,
                          blurb: value,
                        }))
                      }
                      multiline
                    />
                    <Field
                      label="Features"
                      hint="One feature per line"
                      value={formatLines(currentRoom.features)}
                      onChange={(value) =>
                        updateArrayItem("ROOMS", selectedRoom, (item) => ({
                          ...item,
                          features: parseLines(value),
                        }))
                      }
                      multiline
                      rows={6}
                    />
                  </div>
                ) : (
                  <EmptyEditor message="Select or add a room to edit it." />
                )}
              </SplitEditor>
            ) : (
              <SplitEditor
                listTitle="Stay modes"
                listItems={stayModes}
                selectedIndex={selectedStayMode}
                onSelect={setSelectedStayMode}
                onAdd={() => {
                  addArrayItem("STAY_MODES", createEmptyStayMode());
                  setSelectedStayMode(stayModes.length);
                }}
                onRemove={() => removeArrayItem("STAY_MODES", selectedStayMode)}
                renderLabel={(item) => item.title || "Untitled stay mode"}
                renderMeta={(item) => (item.perNight ? "Per night" : "Fixed price")}
                emptyMessage="No stay modes added yet."
              >
                {currentStayMode ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Stay mode editor"
                      title={currentStayMode.title || "Stay mode details"}
                      body="Edit stay products like B&B, full board, or whole property."
                    />
                    <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                      <Field
                        label="Title"
                        value={currentStayMode.title || ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            title: value,
                          }))
                        }
                      />
                      <Field
                        label="ID"
                        value={currentStayMode.id || ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            id: slugify(value, "stay"),
                          }))
                        }
                      />
                      <Field
                        label="Image path"
                        value={currentStayMode.img || ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            img: value,
                          }))
                        }
                      />
                    </Grid>
                    <Field
                      label="Blurb"
                      value={currentStayMode.blurb || ""}
                      onChange={(value) =>
                        updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                          ...item,
                          blurb: value,
                        }))
                      }
                      multiline
                    />
                    <Grid columns="repeat(auto-fit, minmax(180px, 1fr))">
                      <Field
                        label="Single price"
                        value={extractStayModePrice(currentStayMode, "single") ?? ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: {
                              ...(item.pricing || {}),
                              single: parseNumber(value),
                            },
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Double price"
                        value={extractStayModePrice(currentStayMode, "double") ?? ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: {
                              ...(item.pricing || {}),
                              double: parseNumber(value),
                            },
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Single from"
                        value={extractStayModeRange(currentStayMode, "single", "from") ?? ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: {
                              ...(item.pricing || {}),
                              single: {
                                ...(typeof item.pricing?.single === "object"
                                  ? item.pricing.single
                                  : {}),
                                from: parseNumber(value),
                                to: extractStayModeRange(item, "single", "to"),
                              },
                            },
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Single to"
                        value={extractStayModeRange(currentStayMode, "single", "to") ?? ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: {
                              ...(item.pricing || {}),
                              single: {
                                ...(typeof item.pricing?.single === "object"
                                  ? item.pricing.single
                                  : {}),
                                from: extractStayModeRange(item, "single", "from"),
                                to: parseNumber(value),
                              },
                            },
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Double from"
                        value={extractStayModeRange(currentStayMode, "double", "from") ?? ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: {
                              ...(item.pricing || {}),
                              double: {
                                ...(typeof item.pricing?.double === "object"
                                  ? item.pricing.double
                                  : {}),
                                from: parseNumber(value),
                                to: extractStayModeRange(item, "double", "to"),
                              },
                            },
                          }))
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Double to"
                        value={extractStayModeRange(currentStayMode, "double", "to") ?? ""}
                        onChange={(value) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: {
                              ...(item.pricing || {}),
                              double: {
                                ...(typeof item.pricing?.double === "object"
                                  ? item.pricing.double
                                  : {}),
                                from: extractStayModeRange(item, "double", "from"),
                                to: parseNumber(value),
                              },
                            },
                          }))
                        }
                        inputMode="numeric"
                      />
                    </Grid>
                    <InlineChecks>
                      <CheckField
                        label="Per night pricing"
                        checked={Boolean(currentStayMode.perNight)}
                        onChange={(checked) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            perNight: checked,
                          }))
                        }
                      />
                      <CheckField
                        label="Bespoke pricing"
                        checked={Boolean(currentStayMode.bespoke)}
                        onChange={(checked) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            bespoke: checked,
                          }))
                        }
                      />
                      <CheckField
                        label="On request only"
                        checked={Boolean(currentStayMode.pricing?.onRequest)}
                        onChange={(checked) =>
                          updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                            ...item,
                            pricing: checked
                              ? { onRequest: true }
                              : {
                                  ...(item.pricing || {}),
                                  onRequest: false,
                                },
                          }))
                        }
                      />
                    </InlineChecks>
                    <Field
                      label="Inclusions"
                      hint="One inclusion per line"
                      value={formatLines(currentStayMode.inclusions)}
                      onChange={(value) =>
                        updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                          ...item,
                          inclusions: parseLines(value),
                        }))
                      }
                      multiline
                      rows={6}
                    />
                    <Field
                      label="Notes"
                      value={currentStayMode.notes || ""}
                      onChange={(value) =>
                        updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                          ...item,
                          notes: value,
                        }))
                      }
                      multiline
                    />
                  </div>
                ) : (
                  <EmptyEditor message="Select or add a stay mode to edit it." />
                )}
              </SplitEditor>
            )}
          </section>
        )}

        {activeTab === "content" && (
          <section style={{ display: "grid", gap: 18 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { id: "today", label: "Today panel" },
                { id: "activities", label: "Activities" },
                { id: "faq", label: "FAQs" },
                { id: "terms", label: "Terms" },
                { id: "journal", label: "Journal" },
                { id: "reviews", label: "Reviews" },
                { id: "pricing", label: "Currencies" },
                { id: "media", label: "Images" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setContentTab(item.id)}
                  style={{
                    borderRadius: 999,
                    padding: "10px 16px",
                    border:
                      "1px solid " +
                      (contentTab === item.id
                        ? "var(--ink)"
                        : "var(--rule)"),
                    background:
                      contentTab === item.id
                        ? "var(--ink)"
                        : "transparent",
                    color:
                      contentTab === item.id ? "var(--paper)" : "var(--ink-2)",
                    cursor: "pointer",
                    fontSize: 14,
                    fontFamily: "inherit",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {contentTab === "today" && (
              <section style={{ ...panelStyle(), padding: 24 }}>
                <SectionHeader
                  eyebrow="Today panel"
                  title="Homepage daily snapshot"
                  body="Edit the small farm update section: date, weather, growing list, cooking list, and from-farm note."
                />
                <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                  <Field
                    label="Date label"
                    value={draftContent.TODAY_PANEL?.date || ""}
                    onChange={(value) =>
                      updateDraft((next) => {
                        next.TODAY_PANEL = {
                          ...(next.TODAY_PANEL || {}),
                          date: value,
                        };
                        return next;
                      })
                    }
                  />
                  <Field
                    label="Weather"
                    value={draftContent.TODAY_PANEL?.weather || ""}
                    onChange={(value) =>
                      updateDraft((next) => {
                        next.TODAY_PANEL = {
                          ...(next.TODAY_PANEL || {}),
                          weather: value,
                        };
                        return next;
                      })
                    }
                  />
                  <Field
                    label="From farm note"
                    value={draftContent.TODAY_PANEL?.fromFarm || ""}
                    onChange={(value) =>
                      updateDraft((next) => {
                        next.TODAY_PANEL = {
                          ...(next.TODAY_PANEL || {}),
                          fromFarm: value,
                        };
                        return next;
                      })
                    }
                  />
                </Grid>
                <Field
                  label="Growing now"
                  hint="One item per line"
                  value={formatLines(draftContent.TODAY_PANEL?.growing)}
                  onChange={(value) =>
                    updateDraft((next) => {
                      next.TODAY_PANEL = {
                        ...(next.TODAY_PANEL || {}),
                        growing: parseLines(value),
                      };
                      return next;
                    })
                  }
                  multiline
                  rows={5}
                />
                <Field
                  label="Cooking now"
                  hint="One item per line"
                  value={formatLines(draftContent.TODAY_PANEL?.cooking)}
                  onChange={(value) =>
                    updateDraft((next) => {
                      next.TODAY_PANEL = {
                        ...(next.TODAY_PANEL || {}),
                        cooking: parseLines(value),
                      };
                      return next;
                    })
                  }
                  multiline
                  rows={5}
                />
              </section>
            )}

            {contentTab === "activities" && (
              <SplitEditor
                listTitle="Activity groups"
                listItems={activities}
                selectedIndex={selectedActivity}
                onSelect={setSelectedActivity}
                onAdd={() => {
                  addArrayItem("ACTIVITIES", createEmptyActivityGroup());
                  setSelectedActivity(activities.length);
                }}
                onRemove={() => removeArrayItem("ACTIVITIES", selectedActivity)}
                renderLabel={(item) => item.group || "Untitled group"}
                renderMeta={(item) => `${countOf(item.items)} items`}
                emptyMessage="No activity groups yet."
              >
                {currentActivity ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Activity group"
                      title={currentActivity.group || "Group details"}
                      body="Group related farm or local experiences together and edit each item inside the group."
                    />
                    <Field
                      label="Group title"
                      value={currentActivity.group || ""}
                      onChange={(value) =>
                        updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                          ...item,
                          group: value,
                        }))
                      }
                    />
                    <div style={{ display: "grid", gap: 12 }}>
                      {(currentActivity.items || []).map((activityItem, index) => (
                        <div
                          key={`${activityItem.title}-${index}`}
                          style={{
                            ...panelStyle(),
                            padding: 16,
                            background: "var(--paper)",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: 12,
                            }}
                          >
                            <div className="mono tracked" style={{ color: "var(--muted)" }}>
                              Activity {index + 1}
                            </div>
                            <button
                              onClick={() =>
                                updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                                  ...item,
                                  items: (item.items || []).filter(
                                    (_, itemIndex) => itemIndex !== index,
                                  ),
                                }))
                              }
                              style={buttonStyle("danger")}
                            >
                              Remove
                            </button>
                          </div>
                          <Field
                            label="Title"
                            value={activityItem.title || ""}
                            onChange={(value) =>
                              updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                                ...item,
                                items: (item.items || []).map((entry, itemIndex) =>
                                  itemIndex === index
                                    ? { ...entry, title: value }
                                    : entry,
                                ),
                              }))
                            }
                          />
                          <Field
                            label="Description"
                            value={activityItem.body || ""}
                            onChange={(value) =>
                              updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                                ...item,
                                items: (item.items || []).map((entry, itemIndex) =>
                                  itemIndex === index
                                    ? { ...entry, body: value }
                                    : entry,
                                ),
                              }))
                            }
                            multiline
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() =>
                        updateArrayItem("ACTIVITIES", selectedActivity, (item) => ({
                          ...item,
                          items: [
                            ...(item.items || []),
                            { title: "", body: "" },
                          ],
                        }))
                      }
                      style={buttonStyle("ghost")}
                    >
                      Add activity item
                    </button>
                  </div>
                ) : (
                  <EmptyEditor message="Select or add an activity group to edit it." />
                )}
              </SplitEditor>
            )}

            {contentTab === "faq" && (
              <SplitEditor
                listTitle="FAQs"
                listItems={faqs}
                selectedIndex={selectedFaq}
                onSelect={setSelectedFaq}
                onAdd={() => {
                  addArrayItem("FAQS", createEmptyFaq());
                  setSelectedFaq(faqs.length);
                }}
                onRemove={() => removeArrayItem("FAQS", selectedFaq)}
                renderLabel={(item) => item.q || "Untitled question"}
                emptyMessage="No FAQs yet."
              >
                {currentFaq ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="FAQ editor"
                      title="Question and answer"
                      body="Keep common visitor questions up to date here."
                    />
                    <Field
                      label="Question"
                      value={currentFaq.q || ""}
                      onChange={(value) =>
                        updateArrayItem("FAQS", selectedFaq, (item) => ({
                          ...item,
                          q: value,
                        }))
                      }
                    />
                    <Field
                      label="Answer"
                      value={currentFaq.a || ""}
                      onChange={(value) =>
                        updateArrayItem("FAQS", selectedFaq, (item) => ({
                          ...item,
                          a: value,
                        }))
                      }
                      multiline
                      rows={6}
                    />
                  </div>
                ) : (
                  <EmptyEditor message="Select or add an FAQ to edit it." />
                )}
              </SplitEditor>
            )}

            {contentTab === "terms" && (
              <div style={{ display: "grid", gap: 18 }}>
                <section style={{ ...panelStyle(), padding: 24 }}>
                  <SectionHeader
                    eyebrow="Terms editor"
                    title="Terms and conditions page"
                    body="Manage the legal page title, intro copy, date label, and closing acknowledgement."
                  />
                  <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                    <Field
                      label="Page title"
                      value={termsContent.title || ""}
                      onChange={(value) =>
                        updateDraft((next) => {
                          next.TERMS = {
                            ...(next.TERMS || {}),
                            title: value,
                          };
                          return next;
                        })
                      }
                    />
                    <Field
                      label="Last updated"
                      value={termsContent.lastUpdated || ""}
                      onChange={(value) =>
                        updateDraft((next) => {
                          next.TERMS = {
                            ...(next.TERMS || {}),
                            lastUpdated: value,
                          };
                          return next;
                        })
                      }
                    />
                  </Grid>
                  <Field
                    label="Intro"
                    value={termsContent.intro || ""}
                    onChange={(value) =>
                      updateDraft((next) => {
                        next.TERMS = {
                          ...(next.TERMS || {}),
                          intro: value,
                        };
                        return next;
                      })
                    }
                    multiline
                    rows={6}
                  />
                  <Field
                    label="Acknowledgement"
                    value={termsContent.acknowledgement || ""}
                    onChange={(value) =>
                      updateDraft((next) => {
                        next.TERMS = {
                          ...(next.TERMS || {}),
                          acknowledgement: value,
                        };
                        return next;
                      })
                    }
                    multiline
                    rows={5}
                  />
                </section>

                <SplitEditor
                  listTitle="Terms clauses"
                  listItems={termSections}
                  selectedIndex={selectedTermsSection}
                  onSelect={setSelectedTermsSection}
                  onAdd={addTermsSection}
                  onRemove={() => removeTermsSection(selectedTermsSection)}
                  renderLabel={(item) => item.title || "Untitled clause"}
                  emptyMessage="No terms clauses yet."
                >
                  {currentTermsSection ? (
                    <div style={{ display: "grid", gap: 16 }}>
                      <SectionHeader
                        eyebrow="Clause editor"
                        title={currentTermsSection.title || "Clause details"}
                        body="Edit each terms section individually so the public page stays readable."
                      />
                      <Field
                        label="Clause title"
                        value={currentTermsSection.title || ""}
                        onChange={(value) =>
                          updateTermsSection(selectedTermsSection, (item) => ({
                            ...item,
                            title: value,
                          }))
                        }
                      />
                      <Field
                        label="Clause body"
                        value={currentTermsSection.body || ""}
                        onChange={(value) =>
                          updateTermsSection(selectedTermsSection, (item) => ({
                            ...item,
                            body: value,
                          }))
                        }
                        multiline
                        rows={8}
                      />
                    </div>
                  ) : (
                    <EmptyEditor message="Select or add a terms clause to edit it." />
                  )}
                </SplitEditor>
              </div>
            )}

            {contentTab === "journal" && (
              <SplitEditor
                listTitle="Journal posts"
                listItems={journalPosts}
                selectedIndex={selectedJournal}
                onSelect={setSelectedJournal}
                onAdd={() => {
                  addArrayItem("JOURNAL_POSTS", createEmptyJournalPost());
                  setSelectedJournal(journalPosts.length);
                }}
                onRemove={() => removeArrayItem("JOURNAL_POSTS", selectedJournal)}
                renderLabel={(item) => item.title || "Untitled post"}
                renderMeta={(item) => item.kind || ""}
                emptyMessage="No journal posts yet."
              >
                {currentJournal ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Journal editor"
                      title={currentJournal.title || "Story details"}
                      body="Edit story title, type, date, image, and short excerpt."
                    />
                    <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                      <Field
                        label="Title"
                        value={currentJournal.title || ""}
                        onChange={(value) =>
                          updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                            ...item,
                            title: value,
                          }))
                        }
                      />
                      <Field
                        label="ID"
                        value={currentJournal.id || ""}
                        onChange={(value) =>
                          updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                            ...item,
                            id: slugify(value, "journal"),
                          }))
                        }
                      />
                      <Field
                        label="Kind"
                        value={currentJournal.kind || ""}
                        onChange={(value) =>
                          updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                            ...item,
                            kind: value,
                          }))
                        }
                      />
                      <Field
                        label="Date"
                        value={currentJournal.date || ""}
                        onChange={(value) =>
                          updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                            ...item,
                            date: value,
                          }))
                        }
                      />
                      <Field
                        label="Image path"
                        value={currentJournal.img || ""}
                        onChange={(value) =>
                          updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                            ...item,
                            img: value,
                          }))
                        }
                      />
                    </Grid>
                    <Field
                      label="Excerpt"
                      value={currentJournal.excerpt || ""}
                      onChange={(value) =>
                        updateArrayItem("JOURNAL_POSTS", selectedJournal, (item) => ({
                          ...item,
                          excerpt: value,
                        }))
                      }
                      multiline
                    />
                  </div>
                ) : (
                  <EmptyEditor message="Select or add a journal post to edit it." />
                )}
              </SplitEditor>
            )}

            {contentTab === "reviews" && (
              <SplitEditor
                listTitle="Reviews"
                listItems={reviews}
                selectedIndex={selectedReview}
                onSelect={setSelectedReview}
                onAdd={() => {
                  addArrayItem("REVIEWS", createEmptyReview());
                  setSelectedReview(reviews.length);
                }}
                onRemove={() => removeArrayItem("REVIEWS", selectedReview)}
                renderLabel={(item) => item.name || "Untitled review"}
                renderMeta={(item) => `${item.stars || 0} stars`}
                emptyMessage="No reviews yet."
              >
                {currentReview ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Review editor"
                      title={currentReview.name || "Guest review"}
                      body="Manage review source, star rating, short teaser, and full review text."
                    />
                    <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                      <Field
                        label="Guest name"
                        value={currentReview.name || ""}
                        onChange={(value) =>
                          updateArrayItem("REVIEWS", selectedReview, (item) => ({
                            ...item,
                            name: value,
                          }))
                        }
                      />
                      <Field
                        label="Source"
                        value={currentReview.where || ""}
                        onChange={(value) =>
                          updateArrayItem("REVIEWS", selectedReview, (item) => ({
                            ...item,
                            where: value,
                          }))
                        }
                      />
                      <Field
                        label="Date"
                        value={currentReview.date || ""}
                        onChange={(value) =>
                          updateArrayItem("REVIEWS", selectedReview, (item) => ({
                            ...item,
                            date: value,
                          }))
                        }
                      />
                      <Field
                        label="Stars"
                        value={currentReview.stars ?? ""}
                        onChange={(value) =>
                          updateArrayItem("REVIEWS", selectedReview, (item) => ({
                            ...item,
                            stars: parseNumber(value),
                          }))
                        }
                        inputMode="numeric"
                      />
                    </Grid>
                    <Field
                      label="Short quote"
                      value={currentReview.short || ""}
                      onChange={(value) =>
                        updateArrayItem("REVIEWS", selectedReview, (item) => ({
                          ...item,
                          short: value,
                        }))
                      }
                      multiline
                    />
                    <Field
                      label="Full review"
                      value={currentReview.long || ""}
                      onChange={(value) =>
                        updateArrayItem("REVIEWS", selectedReview, (item) => ({
                          ...item,
                          long: value,
                        }))
                      }
                      multiline
                      rows={6}
                    />
                  </div>
                ) : (
                  <EmptyEditor message="Select or add a review to edit it." />
                )}
              </SplitEditor>
            )}

            {contentTab === "pricing" && (
              <SplitEditor
                listTitle="Currencies"
                listItems={currencyEntries}
                selectedIndex={selectedCurrency}
                onSelect={setSelectedCurrency}
                onAdd={addCurrencyEntry}
                onRemove={() =>
                  currentCurrencyEntry
                    ? removeCurrencyEntry(currentCurrencyEntry[0])
                    : null
                }
                renderLabel={(item) => item[0]}
                renderMeta={(item) => item[1]?.label || ""}
                emptyMessage="No currencies yet."
              >
                {currentCurrencyEntry ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Currency editor"
                      title={currentCurrencyEntry[0]}
                      body="Edit the currency symbol, conversion rate, digits, display code, and label."
                    />
                    <Grid columns="repeat(auto-fit, minmax(220px, 1fr))">
                      <Field
                        label="Symbol"
                        value={currentCurrencyEntry[1]?.symbol || ""}
                        onChange={(value) =>
                          updateCurrencyEntry(currentCurrencyEntry[0], "symbol", value)
                        }
                      />
                      <Field
                        label="Rate"
                        value={currentCurrencyEntry[1]?.rate ?? ""}
                        onChange={(value) =>
                          updateCurrencyEntry(
                            currentCurrencyEntry[0],
                            "rate",
                            parseNumber(value),
                          )
                        }
                        inputMode="decimal"
                      />
                      <Field
                        label="Digits"
                        value={currentCurrencyEntry[1]?.digits ?? ""}
                        onChange={(value) =>
                          updateCurrencyEntry(
                            currentCurrencyEntry[0],
                            "digits",
                            parseNumber(value),
                          )
                        }
                        inputMode="numeric"
                      />
                      <Field
                        label="Code"
                        value={currentCurrencyEntry[1]?.code || ""}
                        onChange={(value) =>
                          updateCurrencyEntry(currentCurrencyEntry[0], "code", value)
                        }
                      />
                      <Field
                        label="Label"
                        value={currentCurrencyEntry[1]?.label || ""}
                        onChange={(value) =>
                          updateCurrencyEntry(currentCurrencyEntry[0], "label", value)
                        }
                      />
                    </Grid>
                  </div>
                ) : (
                  <EmptyEditor message="Select or add a currency to edit it." />
                )}
              </SplitEditor>
            )}

            {contentTab === "media" && (
              <SplitEditor
                listTitle="Image paths"
                listItems={imageEntries}
                selectedIndex={selectedImage}
                onSelect={setSelectedImage}
                onAdd={addImageEntry}
                onRemove={() =>
                  currentImageEntry ? removeImageEntry(currentImageEntry[0]) : null
                }
                renderLabel={(item) => item[0]}
                renderMeta={(item) => item[1]}
                emptyMessage="No image paths yet."
              >
                {currentImageEntry ? (
                  <div style={{ display: "grid", gap: 16 }}>
                    <SectionHeader
                      eyebrow="Image editor"
                      title={currentImageEntry[0]}
                      body="Update the image path used by this section on the site."
                    />
                    <Field
                      label="Asset path"
                      value={currentImageEntry[1] || ""}
                      onChange={(value) => updateImageEntry(currentImageEntry[0], value)}
                    />
                  </div>
                ) : (
                  <EmptyEditor message="Select or add an image key to edit it." />
                )}
              </SplitEditor>
            )}
          </section>
        )}

        {activeTab === "bookings" && (
          <section style={{ display: "grid", gap: 20 }}>
            {/* Header row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
                  Enquiries
                </div>
                <div className="serif" style={{ fontSize: 30, marginTop: 6, lineHeight: 1 }}>
                  {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: "var(--paper)",
                  border: "1px solid var(--rule)",
                  fontSize: 13,
                  color: ADMIN_UI.muted,
                }}
              >
                <span>📦</span>
                <span>Storage: <strong style={{ color: ADMIN_UI.text }}>{bookingsStorage}</strong></span>
              </div>
            </div>

            {bookingStatusMessage.message ? (
              <div
                style={{
                  ...panelStyle(),
                  padding: "14px 18px",
                  borderColor:
                    bookingStatusMessage.type === "error"
                      ? "rgba(139, 58, 31, 0.18)"
                      : ADMIN_UI.cardBorder,
                  color:
                    bookingStatusMessage.type === "error"
                      ? ADMIN_UI.accent
                      : ADMIN_UI.text,
                }}
              >
                {bookingStatusMessage.message}
              </div>
            ) : null}

            {bookings.length === 0 ? (
              <div
                style={{
                  ...panelStyle(),
                  padding: "64px 32px",
                  textAlign: "center",
                  display: "grid",
                  placeItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ fontSize: 48 }}>📭</div>
                <div className="serif" style={{ fontSize: 26 }}>No enquiries yet</div>
                <div style={{ color: ADMIN_UI.muted, fontSize: 14, maxWidth: 340 }}>
                  Website bookings and enquiries will appear here once guests submit a request.
                </div>
              </div>
            ) : (
              <>
                {/* Summary stat strip */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                    gap: 12,
                  }}
                >
                  {[
                    { icon: "📅", label: "Total enquiries", value: bookings.length },
                    { icon: "🆕", label: "New enquiries", value: pendingBookings.length },
                    { icon: "✅", label: "Approved", value: approvedBookings.length },
                    { icon: "❌", label: "Rejected", value: rejectedBookings.length },
                    {
                      icon: "👥",
                      label: "Total guests",
                      value: bookings.reduce((s, b) => s + (Number(b.guests) || 0), 0),
                    },
                    {
                      icon: "💰",
                      label: "Est. value (INR)",
                      value: bookings
                        .reduce((s, b) => s + (b.indicativeTotalInr || 0), 0)
                        .toLocaleString("en-IN") || "—",
                    },
                    {
                      icon: "🏷️",
                      label: "Packages",
                      value: [...new Set(bookings.map((b) => b.packageTitle || b.packageSlug).filter(Boolean))].length,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        ...panelStyle(),
                        padding: "16px 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <span
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: "var(--paper-2)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        {s.icon}
                      </span>
                      <div>
                        <div className="mono tracked" style={{ color: ADMIN_UI.muted, fontSize: 10 }}>
                          {s.label}
                        </div>
                        <div className="serif" style={{ fontSize: 24, lineHeight: 1.1, marginTop: 3 }}>
                          {s.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 10,
                    }}
                  >
                    <div>
                      <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
                        New bookings
                      </div>
                      <div className="serif" style={{ fontSize: 28, lineHeight: 1.05, marginTop: 6 }}>
                        Current enquiries
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "8px 12px",
                        borderRadius: 999,
                        background: "var(--paper)",
                        border: "1px solid var(--rule)",
                        color: ADMIN_UI.muted,
                        fontSize: 12,
                      }}
                    >
                      {pendingBookings.length} pending
                    </div>
                  </div>

                  <BookingTable
                    bookings={pendingBookings}
                    emptyTitle="No new bookings right now"
                    emptyBody="Approved and rejected enquiries are listed below."
                    onStatusChange={updateBookingStatusAction}
                    updatingBookingIds={updatingBookingIds}
                  />
                </div>

                <div style={{ ...panelStyle(), padding: 18, display: "grid", gap: 16 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
                        Booking history
                      </div>
                      <div className="serif" style={{ fontSize: 26, lineHeight: 1.05, marginTop: 6 }}>
                        Approved and rejected
                      </div>
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        gap: 6,
                        padding: 4,
                        borderRadius: 999,
                        background: "var(--paper-2)",
                        border: "1px solid var(--rule)",
                        flexWrap: "wrap",
                      }}
                    >
                      {[
                        {
                          id: "approved",
                          label: "Approved",
                          count: approvedBookings.length,
                        },
                        {
                          id: "rejected",
                          label: "Rejected",
                          count: rejectedBookings.length,
                        },
                      ].map((tab) => {
                        const active = bookingArchiveTab === tab.id;

                        return (
                          <button
                            key={tab.id}
                            onClick={() => setBookingArchiveTab(tab.id)}
                            style={{
                              border: "none",
                              borderRadius: 999,
                              padding: "9px 14px",
                              background: active ? "var(--ink)" : "transparent",
                              color: active ? "var(--paper)" : ADMIN_UI.text,
                              cursor: "pointer",
                              fontSize: 13,
                              fontWeight: 600,
                              fontFamily: "inherit",
                            }}
                          >
                            {tab.label} ({tab.count})
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <BookingTable
                    bookings={paginatedBookingHistory}
                    emptyTitle={`No ${bookingArchiveTab} bookings yet`}
                    emptyBody={`Bookings marked ${bookingArchiveTab} will appear here.`}
                    onStatusChange={updateBookingStatusAction}
                    updatingBookingIds={updatingBookingIds}
                  />

                  {bookingHistoryBookings.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 12,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ color: ADMIN_UI.muted, fontSize: 13 }}>
                        Showing {bookingHistoryStart + 1}-
                        {Math.min(
                          bookingHistoryStart + BOOKING_HISTORY_PAGE_SIZE,
                          bookingHistoryBookings.length,
                        )} of {bookingHistoryBookings.length}
                      </div>

                      {bookingHistoryTotalPages > 1 ? (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            flexWrap: "wrap",
                          }}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setBookingHistoryPages((current) => ({
                                ...current,
                                [bookingArchiveTab]: Math.max(1, bookingHistoryPage - 1),
                              }))
                            }
                            disabled={bookingHistoryPage === 1}
                            style={buttonStyle("ghost", bookingHistoryPage === 1)}
                          >
                            Previous
                          </button>

                          {Array.from({ length: bookingHistoryTotalPages }, (_, index) => {
                            const page = index + 1;
                            const active = bookingHistoryPage === page;

                            return (
                              <button
                                key={page}
                                type="button"
                                onClick={() =>
                                  setBookingHistoryPages((current) => ({
                                    ...current,
                                    [bookingArchiveTab]: page,
                                  }))
                                }
                                style={{
                                  ...buttonStyle(active ? "primary" : "ghost"),
                                  minWidth: 42,
                                  padding: "11px 12px",
                                }}
                              >
                                {page}
                              </button>
                            );
                          })}

                          <button
                            type="button"
                            onClick={() =>
                              setBookingHistoryPages((current) => ({
                                ...current,
                                [bookingArchiveTab]: Math.min(
                                  bookingHistoryTotalPages,
                                  bookingHistoryPage + 1,
                                ),
                              }))
                            }
                            disabled={bookingHistoryPage === bookingHistoryTotalPages}
                            style={buttonStyle(
                              "ghost",
                              bookingHistoryPage === bookingHistoryTotalPages,
                            )}
                          >
                            Next
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </section>
        )}

        {activeTab === "advanced" && (
          <section style={{ ...panelStyle(), padding: 24 }}>
            <SectionHeader
              eyebrow="Advanced JSON"
              title="Full data editor"
              body="Use this only when you need direct structured control over the full content object."
            />
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
              <button
                onClick={() => {
                  setJsonText(JSON.stringify(savedContent, null, 2));
                  setJsonDirty(false);
                }}
                style={buttonStyle("ghost")}
              >
                Reset JSON
              </button>
              <button
                onClick={saveJsonContent}
                disabled={saving}
                style={buttonStyle("accent", saving)}
              >
                {saving ? "Saving..." : "Save JSON"}
              </button>
            </div>
            <textarea
              value={jsonText}
              onChange={(event) => {
                setJsonText(event.target.value);
                setJsonDirty(true);
              }}
              spellCheck={false}
              style={{
                width: "100%",
                minHeight: 760,
                resize: "vertical",
                borderRadius: 18,
                border: "1px solid var(--rule)",
                padding: 18,
                fontSize: 13,
                lineHeight: 1.65,
                fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
                background: "var(--paper)",
                color: "var(--ink)",
              }}
            />
          </section>
        )}
        </main>
      </div>
    </div>
  );
}

function currentNavItem(items, index) {
  return items[index];
}

function currentItemExists(value) {
  return Boolean(value);
}

function extractStayModePrice(mode, key) {
  const value = mode?.pricing?.[key];
  return typeof value === "number" ? value : "";
}

function extractStayModeRange(mode, key, rangeKey) {
  const value = mode?.pricing?.[key];
  return value && typeof value === "object" ? value[rangeKey] ?? "" : "";
}

function UtilityPill({ label, strong = false }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: strong ? 104 : 86,
        padding: "12px 16px",
        borderRadius: 999,
        border: "1px solid var(--rule)",
        background: strong ? "var(--paper-2)" : "var(--paper)",
        color: "var(--ink)",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
  );
}

function DashboardStatCard({ label, value, compact = false, icon }) {
  return (
    <div
      style={{
        ...panelStyle(),
        padding: compact ? "16px 18px 18px" : "20px 20px 22px",
        minHeight: compact ? 110 : 130,
        display: "grid",
        alignContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div className="mono tracked" style={{ color: ADMIN_UI.muted }}>
          {label}
        </div>
        {icon && (
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "var(--paper-2)",
              display: "grid",
              placeItems: "center",
              fontSize: 16,
            }}
          >
            {icon}
          </span>
        )}
      </div>
      <div
        className="serif"
        style={{ fontSize: compact ? 28 : 34, lineHeight: 1, marginTop: 10 }}
      >
        {value}
      </div>
    </div>
  );
}

function StatusListItem({ label, done }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 16,
        background: "var(--paper)",
        border: "1px solid var(--rule)",
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 999,
          display: "grid",
          placeItems: "center",
          background: done ? "var(--accent)" : "var(--paper-2)",
          color: done ? "var(--paper)" : "var(--muted)",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {done ? "OK" : "--"}
      </div>
      <div style={{ fontSize: 14, color: ADMIN_UI.text }}>{label}</div>
    </div>
  );
}

function NavShortcutRow({ badge, label, note, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "grid",
        gridTemplateColumns: "48px minmax(0, 1fr) auto",
        alignItems: "center",
        gap: 14,
        width: "100%",
        padding: "14px 16px",
        borderRadius: 18,
        border: "1px solid " + (active ? "var(--ink)" : "var(--rule)"),
        background: active ? "var(--paper)" : "transparent",
        textAlign: "left",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          display: "grid",
          placeItems: "center",
          background: active ? "var(--ink)" : "var(--paper)",
          color: active ? "var(--paper)" : "var(--accent)",
          border: "1px solid " + (active ? "var(--ink)" : "var(--rule)"),
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        {badge}
      </div>
      <div>
        <div className="serif" style={{ fontSize: 21, lineHeight: 1.05 }}>
          {label}
        </div>
        <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.5, color: ADMIN_UI.muted }}>
          {note}
        </div>
      </div>
      <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
        Open
      </div>
    </button>
  );
}

function SectionHeader({ eyebrow, title, body }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
        {eyebrow}
      </div>
      <div
        className="serif"
        style={{ fontSize: 30, lineHeight: 1.02, marginTop: 8, color: ADMIN_UI.text }}
      >
        {title}
      </div>
      {body ? (
        <p
          style={{
            margin: "10px 0 0",
            color: ADMIN_UI.muted,
            lineHeight: 1.65,
            fontSize: 14,
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

function SubsectionTitle({ title }) {
  return (
    <div
      className="mono tracked"
      style={{ color: ADMIN_UI.muted, marginTop: 14, marginBottom: 14 }}
    >
      {title}
    </div>
  );
}

function Grid({ columns, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap: 16,
      }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  type = "text",
  inputMode,
  hint,
}) {
  const sharedStyle = {
    width: "100%",
    borderRadius: 18,
    border: `1px solid ${ADMIN_UI.cardBorder}`,
    background: "var(--paper)",
    padding: "14px 16px",
    fontFamily: "inherit",
    fontSize: 14,
    color: ADMIN_UI.text,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
  };

  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: ADMIN_UI.text }}>
        {label}
      </span>
      {hint ? (
        <span style={{ fontSize: 12, color: ADMIN_UI.muted, marginTop: -4 }}>
          {hint}
        </span>
      ) : null}
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={{
            ...sharedStyle,
            resize: "vertical",
            minHeight: rows * 28,
            lineHeight: 1.6,
          }}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}

function CheckField({ label, checked, onChange }) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: 16,
        border: `1px solid ${ADMIN_UI.cardBorder}`,
        background: "var(--paper)",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        style={{ accentColor: ADMIN_UI.accent }}
      />
      <span style={{ fontSize: 14, color: ADMIN_UI.text }}>{label}</span>
    </label>
  );
}

function InlineChecks({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{children}</div>
  );
}

function SplitEditor({
  listTitle,
  listItems,
  selectedIndex,
  onSelect,
  onAdd,
  onRemove,
  renderLabel,
  renderMeta,
  children,
  emptyMessage,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "320px minmax(0, 1fr)",
        gap: 18,
      }}
    >
      <aside
        style={{
          ...panelStyle(),
          padding: 18,
          alignSelf: "start",
          background: "var(--paper-2)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <div>
            <div className="mono tracked" style={{ color: ADMIN_UI.muted }}>
              Collection
            </div>
            <div className="serif" style={{ fontSize: 24, marginTop: 8, color: ADMIN_UI.text }}>
              {listTitle}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button onClick={onAdd} style={buttonStyle("ghost")}>
            Add new
          </button>
          <button
            onClick={onRemove}
            disabled={!listItems.length}
            style={buttonStyle("danger", !listItems.length)}
          >
            Remove
          </button>
        </div>

        {listItems.length === 0 ? (
          <div style={{ color: ADMIN_UI.muted, fontSize: 14 }}>{emptyMessage}</div>
        ) : (
          <div style={{ display: "grid", gap: 10, maxHeight: 720, overflow: "auto" }}>
            {listItems.map((item, index) => (
              <button
                key={item.id || item.key || item.title || item.group || index}
                onClick={() => onSelect(index)}
                style={{
                  textAlign: "left",
                  borderRadius: 18,
                  border:
                    "1px solid " +
                    (selectedIndex === index
                      ? "var(--ink)"
                      : "var(--rule)"),
                  background:
                    selectedIndex === index
                      ? "var(--paper)"
                      : "rgba(255, 255, 255, 0.2)",
                  padding: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <div className="serif" style={{ fontSize: 19, lineHeight: 1.15, color: ADMIN_UI.text }}>
                  {renderLabel(item)}
                </div>
                {renderMeta ? (
                  <div
                    style={{
                      marginTop: 6,
                      color: ADMIN_UI.muted,
                      fontSize: 12,
                      lineHeight: 1.4,
                    }}
                  >
                    {renderMeta(item)}
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        )}
      </aside>

      <section style={{ ...panelStyle(), padding: 24 }}>{children}</section>
    </div>
  );
}

function InfoPanel({ label, title, body }) {
  return (
    <div style={{ ...panelStyle(), padding: 24 }}>
      <div className="mono tracked" style={{ color: ADMIN_UI.accent }}>
        {label}
      </div>
      <div className="serif" style={{ fontSize: 26, marginTop: 10, lineHeight: 1.08, color: ADMIN_UI.text }}>
        {title}
      </div>
      <p
        style={{
          margin: "12px 0 0",
          color: ADMIN_UI.muted,
          fontSize: 14,
          lineHeight: 1.68,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function EmptyEditor({ message }) {
  return (
    <div
      style={{
        minHeight: 240,
        display: "grid",
        placeItems: "center",
        color: ADMIN_UI.muted,
        fontSize: 15,
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div
      style={{
        borderRadius: 14,
        padding: 14,
        background: "var(--paper)",
        border: `1px solid ${ADMIN_UI.cardBorder}`,
      }}
    >
      <div className="mono tracked" style={{ color: ADMIN_UI.muted, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ color: ADMIN_UI.text, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function MiniStatDark({ label, value }) {
  return (
    <div
      style={{
        borderRadius: 14,
        padding: 14,
        background: "rgba(243,237,226,0.08)",
        border: "1px solid rgba(243,237,226,0.12)",
      }}
    >
      <div className="mono tracked" style={{ color: "rgba(243,237,226,0.45)", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ color: "rgba(243,237,226,0.85)", lineHeight: 1.5, fontSize: 14 }}>{value}</div>
    </div>
  );
}

function buildWhatsAppUrl(booking) {
  const phone = (booking.phone || "").replace(/\D/g, "");
  if (!phone) return null;

  // normalise to international — assume India (+91) if 10 digits with no country code
  const intlPhone = phone.length === 10 ? `91${phone}` : phone;

  const name = booking.name || "there";
  const pkg = booking.packageTitle || booking.packageSlug || "your chosen package";
  const checkin = booking.checkin || "your preferred date";
  const checkout = booking.checkout || "";
  const guests = booking.guests || 1;

  const dateStr = checkout
    ? `from ${checkin} to ${checkout}`
    : `on ${checkin}`;

  const message =
    `Hello ${name}! 🌿\n\n` +
    `We're delighted to confirm your booking enquiry for *${pkg}* ${dateStr} for ${guests} guest${guests !== 1 ? "s" : ""} at The Pimenta.\n\n` +
    `Our team will reach out shortly with full details and next steps. We look forward to welcoming you!\n\n` +
    `– The Pimenta Team`;

  return `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`;
}

function BookingTable({
  bookings,
  emptyTitle,
  emptyBody,
  onStatusChange,
  updatingBookingIds,
}) {
  if (!bookings.length) {
    return (
      <div
        style={{
          ...panelStyle(),
          padding: "42px 28px",
          textAlign: "center",
          display: "grid",
          placeItems: "center",
          gap: 10,
        }}
      >
        <div className="serif" style={{ fontSize: 24, color: ADMIN_UI.text }}>
          {emptyTitle}
        </div>
        <div style={{ color: ADMIN_UI.muted, fontSize: 14, maxWidth: 340 }}>
          {emptyBody}
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...panelStyle(), overflow: "hidden" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 1fr 0.8fr 0.8fr 1fr",
          gap: 12,
          padding: "12px 20px",
          background: "var(--paper-2)",
          borderBottom: "1px solid var(--rule)",
        }}
      >
        {["Guest", "Package", "Dates", "Guests", "Est. Total", "Received"].map((header) => (
          <div
            key={header}
            className="mono tracked"
            style={{ color: ADMIN_UI.muted, fontSize: 10 }}
          >
            {header}
          </div>
        ))}
      </div>

      {bookings.map((booking, index) => (
        <BookingRow
          key={booking._id || `${booking.email}-${booking.createdAt}`}
          booking={booking}
          isLast={index === bookings.length - 1}
          onStatusChange={onStatusChange}
          isUpdating={updatingBookingIds.includes(booking._id)}
        />
      ))}
    </div>
  );
}

function BookingRow({ booking, isLast, onStatusChange, isUpdating = false }) {
  const [expanded, setExpanded] = React.useState(false);
  const status = normalizeBookingStatus(booking.status);
  const hasExtra = booking.diet?.length || booking.notes || booking.phone;
  const dateRange =
    booking.checkin || booking.checkout
      ? `${booking.checkin || "—"} → ${booking.checkout || "—"}`
      : "Flexible";

  const whatsappUrl = buildWhatsAppUrl(booking);

  const statusConfig = {
    pending:  { label: "Pending",  bg: "rgba(180,130,0,0.10)",   color: "#7A5800",  border: "rgba(180,130,0,0.22)"   },
    approved: { label: "Approved", bg: "rgba(30,100,50,0.10)",   color: "#1A5E32",  border: "rgba(30,100,50,0.22)"   },
    rejected: { label: "Rejected", bg: "rgba(139,58,31,0.10)",   color: "#8B3A1F",  border: "rgba(139,58,31,0.22)"   },
  };
  const sc = statusConfig[status] || statusConfig.pending;

  function handleApprove(e) {
    e.stopPropagation();
    if (status === "approved" || isUpdating) {
      return;
    }

    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    onStatusChange?.(booking._id, "approved");
  }

  function handleReject(e) {
    e.stopPropagation();
    if (status === "rejected" || isUpdating) {
      return;
    }

    onStatusChange?.(booking._id, "rejected");
  }

  return (
    <div>
      {/* Main row */}
      <div
        onClick={() => setExpanded((v) => !v)}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr 1fr 0.8fr 0.8fr 1fr",
          gap: 12,
          padding: "16px 20px",
          borderBottom: isLast && !expanded ? "none" : "1px solid var(--rule)",
          cursor: "pointer",
          transition: "background 0.12s",
          background: expanded ? "var(--paper-2)" : "transparent",
          alignItems: "center",
        }}
        onMouseEnter={(e) => {
          if (!expanded) e.currentTarget.style.background = "rgba(0,0,0,0.02)";
        }}
        onMouseLeave={(e) => {
          if (!expanded) e.currentTarget.style.background = expanded ? "var(--paper-2)" : "transparent";
        }}
      >
        {/* Guest */}
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: ADMIN_UI.text, lineHeight: 1.2 }}>
            {booking.name}
          </div>
          <div style={{ fontSize: 12, color: ADMIN_UI.muted, marginTop: 3 }}>
            {booking.email}
          </div>
        </div>

        {/* Package */}
        <div>
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              padding: "3px 10px",
              borderRadius: 999,
              background: "rgba(139,58,31,0.08)",
              color: ADMIN_UI.accent,
              fontWeight: 500,
              border: "1px solid rgba(139,58,31,0.14)",
            }}
          >
            {booking.packageTitle || booking.packageSlug || booking.packageId || "—"}
          </div>
        </div>

        {/* Dates */}
        <div style={{ fontSize: 13, color: ADMIN_UI.text }}>{dateRange}</div>

        {/* Guests */}
        <div style={{ fontSize: 13, color: ADMIN_UI.text }}>
          {booking.guests || <span style={{ color: ADMIN_UI.muted }}>—</span>}
        </div>

        {/* Est. total */}
        <div style={{ fontSize: 13, color: ADMIN_UI.text }}>
          {booking.indicativeTotalInr
            ? `₹${Number(booking.indicativeTotalInr).toLocaleString("en-IN")}`
            : <span style={{ color: ADMIN_UI.muted }}>—</span>}
        </div>

        {/* Status + expand */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: 999,
              background: sc.bg,
              color: sc.color,
              border: `1px solid ${sc.border}`,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {sc.label}
          </span>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              border: "1px solid var(--rule)",
              background: "var(--paper)",
              display: "grid",
              placeItems: "center",
              fontSize: 11,
              color: ADMIN_UI.muted,
              flexShrink: 0,
              transition: "transform 0.15s",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▾
          </div>
        </div>
      </div>

      {/* Expanded detail panel */}
      {expanded && (
        <div
          style={{
            padding: "20px 24px 24px",
            background: "var(--paper-2)",
            borderBottom: isLast ? "none" : "1px solid var(--rule)",
          }}
        >
          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleApprove}
              disabled={status === "approved" || isUpdating}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid rgba(30,100,50,0.30)",
                background: status === "approved" ? "rgba(30,100,50,0.12)" : "rgba(30,100,50,0.08)",
                color: "#1A5E32",
                fontSize: 13,
                fontWeight: 600,
                cursor: status === "approved" || isUpdating ? "default" : "pointer",
                opacity: status === "rejected" || isUpdating ? 0.45 : 1,
                fontFamily: "inherit",
                transition: "background 0.12s",
              }}
            >
              <span>✅</span>
              {status === "approved" ? "Approved" : isUpdating ? "Saving..." : "Approve"}
              {status !== "approved" && whatsappUrl && (
                <span
                  style={{
                    fontSize: 11,
                    opacity: 0.7,
                    fontWeight: 400,
                  }}
                >
                  · opens WhatsApp
                </span>
              )}
            </button>

            <button
              onClick={handleReject}
              disabled={status === "rejected" || isUpdating}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: 10,
                border: "1px solid rgba(139,58,31,0.25)",
                background: status === "rejected" ? "rgba(139,58,31,0.10)" : "rgba(139,58,31,0.06)",
                color: ADMIN_UI.accent,
                fontSize: 13,
                fontWeight: 600,
                cursor: status === "rejected" || isUpdating ? "default" : "pointer",
                opacity: status === "approved" || isUpdating ? 0.45 : 1,
                fontFamily: "inherit",
                transition: "background 0.12s",
              }}
            >
              <span>❌</span>
              {status === "rejected" ? "Rejected" : isUpdating ? "Saving..." : "Reject"}
            </button>

            {status === "approved" && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  borderRadius: 10,
                  border: "1px solid rgba(37,211,102,0.35)",
                  background: "rgba(37,211,102,0.08)",
                  color: "#1a7a40",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  fontFamily: "inherit",
                }}
              >
                <span>💬</span> Resend WhatsApp
              </a>
            )}

            {!whatsappUrl && (
              <span style={{ fontSize: 12, color: ADMIN_UI.muted }}>
                ⚠️ No phone number — WhatsApp unavailable
              </span>
            )}

            <div style={{ marginLeft: "auto", fontSize: 12, color: ADMIN_UI.muted }}>
              Received: {formatDate(booking.createdAt)}
            </div>
          </div>

          {/* Detail grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 12,
              marginBottom: hasExtra ? 16 : 0,
            }}
          >
            <DetailCell label="Email" value={booking.email} />
            {booking.phone && <DetailCell label="Phone" value={booking.phone} />}
            <DetailCell label="Source" value={booking.source || "website"} />
            <DetailCell label="Booking ID" value={booking._id} mono />
            {booking.checkin && <DetailCell label="Check-in" value={booking.checkin} />}
            {booking.checkout && <DetailCell label="Check-out" value={booking.checkout} />}
          </div>

          {hasExtra && (
            <div
              style={{
                display: "grid",
                gap: 10,
                padding: "16px 18px",
                borderRadius: 12,
                background: "var(--paper)",
                border: "1px solid var(--rule)",
              }}
            >
              {booking.phone ? (
                <DetailCell label="Phone" value={booking.phone} />
              ) : null}
              {booking.diet?.length ? (
                <DetailCell label="Dietary needs" value={booking.diet.join(", ")} />
              ) : null}
              {booking.notes ? (
                <DetailCell label="Guest notes" value={booking.notes} />
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function DetailCell({ label, value, mono = false }) {
  return (
    <div>
      <div className="mono tracked" style={{ color: ADMIN_UI.muted, fontSize: 10, marginBottom: 4 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: ADMIN_UI.text,
          lineHeight: 1.5,
          fontFamily: mono ? "'IBM Plex Mono', monospace" : "inherit",
          wordBreak: "break-all",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

function BookingText({ label, value }) {
  return (
    <div>
      <div className="mono tracked" style={{ color: ADMIN_UI.muted, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ color: ADMIN_UI.text, lineHeight: 1.65 }}>{value}</div>
    </div>
  );
}
