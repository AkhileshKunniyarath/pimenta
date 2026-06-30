"use client";

import * as React from "react";
import {
  cloneJson,
  normalizeBookingStatus,
  clampIndex,
  countOf,
  ADMIN_UI,
  panelStyle,
  buttonStyle,
} from "./components/utils";

import OverviewTab from "./components/tabs/OverviewTab";
import BusinessTab from "./components/tabs/BusinessTab";
import PackagesTab from "./components/tabs/PackagesTab";
import StayTab from "./components/tabs/StayTab";
import ContentTab from "./components/tabs/ContentTab";
import BookingsTab from "./components/tabs/BookingsTab";

interface AdminDashboardClientProps {
  initialBookings: any[];
  bookingsStorage: string;
  initialContent: any;
  contentStorage: string;
  initialUpdatedAt: string;
}

export default function AdminDashboardClient({
  initialBookings,
  bookingsStorage,
  initialContent,
  contentStorage,
  initialUpdatedAt,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [contentTab, setContentTab] = React.useState("today");
  const [stayTab, setStayTab] = React.useState("rooms");
  const [draftContent, setDraftContent] = React.useState(() => cloneJson(initialContent));
  const [savedContent, setSavedContent] = React.useState(() => cloneJson(initialContent));
  const [savedStorage, setSavedStorage] = React.useState(contentStorage);
  const [savedUpdatedAt, setSavedUpdatedAt] = React.useState(initialUpdatedAt);
  const [saveState, setSaveState] = React.useState({ type: "", message: "" });
  const [saving, setSaving] = React.useState(false);

  const [selectedPackage, setSelectedPackage] = React.useState(0);
  const [selectedRoom, setSelectedRoom] = React.useState(0);
  const [selectedStayMode, setSelectedStayMode] = React.useState(0);
  const [selectedActivity, setSelectedActivity] = React.useState(0);
  const [selectedFaq, setSelectedFaq] = React.useState(0);
  const [selectedTermsSection, setSelectedTermsSection] = React.useState(0);
  const [selectedReview, setSelectedReview] = React.useState(0);
  const [selectedJournal, setSelectedJournal] = React.useState(0);
  const [selectedCurrency, setSelectedCurrency] = React.useState(0);

  const [bookings, setBookings] = React.useState<any[]>(() =>
    initialBookings.map((booking) => ({
      ...booking,
      status: normalizeBookingStatus(booking.status),
    }))
  );
  const [bookingArchiveTab, setBookingArchiveTab] = React.useState("approved");
  const [bookingHistoryPages, setBookingHistoryPages] = React.useState<{ [key: string]: number }>({
    approved: 1,
    rejected: 1,
  });
  const [bookingStatusMessage, setBookingStatusMessage] = React.useState({ type: "", message: "" });
  const [updatingBookingIds, setUpdatingBookingIds] = React.useState<string[]>([]);

  const dirty = JSON.stringify(draftContent) !== JSON.stringify(savedContent);



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
  const pendingBookings = bookings.filter((b) => normalizeBookingStatus(b.status) === "pending");
  const approvedBookings = bookings.filter((b) => normalizeBookingStatus(b.status) === "approved");
  const rejectedBookings = bookings.filter((b) => normalizeBookingStatus(b.status) === "rejected");



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
    setSelectedTermsSection((current) => clampIndex(current, termSections.length));
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
    setBookingHistoryPages((current) => ({
      approved: Math.min(
        current.approved,
        Math.max(1, Math.ceil(approvedBookings.length / BOOKING_HISTORY_PAGE_SIZE))
      ),
      rejected: Math.min(
        current.rejected,
        Math.max(1, Math.ceil(rejectedBookings.length / BOOKING_HISTORY_PAGE_SIZE))
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

  const BOOKING_HISTORY_PAGE_SIZE = 15;

  function updateDraft(updater: any) {
    setDraftContent((current: any) => {
      const nextBase = cloneJson(current);
      const next = typeof updater === "function" ? updater(nextBase) || nextBase : updater;
      return next;
    });
  }

  async function persistContent(nextContent: any, successMessage: string) {
    setSaving(true);
    setSaveState({ type: "", message: "" });

    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      setSaveState({ type: "success", message: successMessage });
    } catch (error: any) {
      setSaveState({ type: "error", message: error.message || "Unable to save content." });
    } finally {
      setSaving(false);
    }
  }

  async function saveDraftContent() {
    await persistContent(draftContent, "Admin changes saved successfully.");
  }

  function resetDraftContent() {
    setDraftContent(cloneJson(savedContent));
    setSaveState({ type: "", message: "" });
  }

  async function updateBookingStatusAction(bookingId: string, nextStatus: "approved" | "rejected" | "pending") {
    const currentBooking = bookings.find((booking) => booking._id === bookingId);
    const previousStatus = normalizeBookingStatus(currentBooking?.status);

    if (!bookingId || !currentBooking || previousStatus === nextStatus) {
      return;
    }

    setBookingStatusMessage({ type: "", message: "" });
    setUpdatingBookingIds((current) => (current.includes(bookingId) ? current : [...current, bookingId]));
    setBookings((current) =>
      current.map((booking) => (booking._id === bookingId ? { ...booking, status: nextStatus } : booking))
    );

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, status: nextStatus }),
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
              : booking
          )
        );
      }
    } catch (error: any) {
      setBookings((current) =>
        current.map((booking) => (booking._id === bookingId ? { ...booking, status: previousStatus } : booking))
      );
      setBookingStatusMessage({
        type: "error",
        message: error.message || "Unable to update booking status.",
      });
    } finally {
      setUpdatingBookingIds((current) => current.filter((id) => id !== bookingId));
    }
  }

  function updateBrand(path: string, value: any) {
    updateDraft((next: any) => {
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

  function updateArrayItem(section: string, index: number, updater: (item: any) => any) {
    updateDraft((next: any) => {
      const list = Array.isArray(next[section]) ? [...next[section]] : [];
      const currentItem = cloneJson(list[index] || {});
      list[index] = typeof updater === "function" ? updater(currentItem) || currentItem : updater;
      next[section] = list;
      return next;
    });
  }

  function addArrayItem(section: string, item: any) {
    updateDraft((next: any) => {
      const list = Array.isArray(next[section]) ? [...next[section]] : [];
      list.push(item);
      next[section] = list;
      return next;
    });
  }

  function removeArrayItem(section: string, index: number) {
    updateDraft((next: any) => {
      const list = Array.isArray(next[section]) ? [...next[section]] : [];
      list.splice(index, 1);
      next[section] = list;
      return next;
    });
  }

  function addCurrencyEntry() {
    updateDraft((next: any) => {
      next.CURRENCY = next.CURRENCY || {};
      let counter = Object.keys(next.CURRENCY).length + 1;
      let key = `NEW_${counter}`;

      while (next.CURRENCY[key]) {
        counter += 1;
        key = `NEW_${counter}`;
      }

      next.CURRENCY[key] = {
        symbol: "",
        rate: 1,
        digits: 0,
        code: key,
        label: "New currency",
      };
      return next;
    });

    setSelectedCurrency(currencyEntries.length);
  }

  function updateCurrencyEntry(key: string, field: string, value: any) {
    updateDraft((next: any) => {
      next.CURRENCY = next.CURRENCY || {};
      next.CURRENCY[key] = next.CURRENCY[key] || {};
      next.CURRENCY[key][field] = value;
      return next;
    });
  }

  function removeCurrencyEntry(key: string) {
    updateDraft((next: any) => {
      const currency = { ...(next.CURRENCY || {}) };
      delete currency[key];
      next.CURRENCY = currency;
      return next;
    });
  }

  async function logoutAdmin() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  function updateTermsSection(index: number, updater: (item: any) => any) {
    updateDraft((next: any) => {
      const terms = { ...(next.TERMS || {}) };
      const sections = Array.isArray(terms.sections) ? [...terms.sections] : [];
      const currentItem = cloneJson(sections[index] || { title: "", body: "" });
      sections[index] = typeof updater === "function" ? updater(currentItem) || currentItem : updater;
      terms.sections = sections;
      next.TERMS = terms;
      return next;
    });
  }

  function addTermsSection() {
    updateDraft((next: any) => {
      const terms = { ...(next.TERMS || {}) };
      const sections = Array.isArray(terms.sections) ? [...terms.sections] : [];
      sections.push({ title: "New clause", body: "" });
      terms.sections = sections;
      next.TERMS = terms;
      return next;
    });

    setSelectedTermsSection(termSections.length);
  }

  function removeTermsSection(index: number) {
    updateDraft((next: any) => {
      const terms = { ...(next.TERMS || {}) };
      const sections = Array.isArray(terms.sections) ? [...terms.sections] : [];
      sections.splice(index, 1);
      terms.sections = sections;
      next.TERMS = terms;
      return next;
    });
  }

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
      id: "packages",
      label: "Experiences",
      note: `${packages.length} experience offers`,
      badge: "03",
      icon: "🎒",
    },
    {
      id: "stay",
      label: "Stay",
      note: `${rooms.length} rooms · ${stayModes.length} stay modes`,
      badge: "04",
      icon: "🛏️",
    },
    {
      id: "content",
      label: "Content",
      note: "FAQs, reviews, media, stories",
      badge: "05",
      icon: "📝",
    },
    {
      id: "bookings",
      label: "Bookings & Enquiries",
      note: `${bookings.length} enquiries`,
      badge: "06",
      icon: "📅",
    },
  ];

  const activeTabMeta = tabs.find((tab) => tab.id === activeTab) || tabs[0];
  const recentBookings = bookings.slice(0, 5);
  const brandLocation = draftContent.BRAND?.location?.region
    ? `${draftContent.BRAND?.location?.village || "Location"} · ${draftContent.BRAND.location.region}`
    : draftContent.BRAND?.location?.village || "Location not set";

  const businessChecklist = [
    {
      label: "Business profile",
      done: Boolean(draftContent.BRAND?.name && draftContent.BRAND?.host),
    },
    {
      label: "Contact details",
      done: Boolean(draftContent.BRAND?.contact?.email && draftContent.BRAND?.contact?.phone),
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
  const completionPercent = Math.round((completedBusinessChecks / businessChecklist.length) * 100);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            savedStorage={savedStorage}
            savedUpdatedAt={savedUpdatedAt}
            dirty={dirty}
            saving={saving}
            stats={stats}
            draftContent={draftContent}
            brandLocation={brandLocation}
            completionPercent={completionPercent}
            businessChecklist={businessChecklist}
            recentBookings={recentBookings}
            packages={packages}
            rooms={rooms}
            reviews={reviews}
            bookings={bookings}
            tabs={tabs}
            setActiveTab={setActiveTab}
            saveDraftContent={saveDraftContent}
            resetDraftContent={resetDraftContent}
          />
        );
      case "business":
        return <BusinessTab draftContent={draftContent} updateBrand={updateBrand} updateDraft={updateDraft} />;
      case "packages":
        return (
          <PackagesTab
            packages={packages}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            updateArrayItem={updateArrayItem}
            draftContent={draftContent}
            updateDraft={updateDraft}
          />
        );
      case "stay":
        return (
          <StayTab
            rooms={rooms}
            stayModes={stayModes}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            selectedStayMode={selectedStayMode}
            setSelectedStayMode={setSelectedStayMode}
            stayTab={stayTab}
            setStayTab={setStayTab}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            updateArrayItem={updateArrayItem}
          />
        );
      case "content":
        return (
          <ContentTab
            draftContent={draftContent}
            contentTab={contentTab}
            setContentTab={setContentTab}
            updateDraft={updateDraft}
            updateArrayItem={updateArrayItem}
            addArrayItem={addArrayItem}
            removeArrayItem={removeArrayItem}
            activities={activities}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
            faqs={faqs}
            selectedFaq={selectedFaq}
            setSelectedFaq={setSelectedFaq}
            termsContent={termsContent}
            termSections={termSections}
            selectedTermsSection={selectedTermsSection}
            setSelectedTermsSection={setSelectedTermsSection}
            addTermsSection={addTermsSection}
            removeTermsSection={removeTermsSection}
            updateTermsSection={updateTermsSection}
            journalPosts={journalPosts}
            selectedJournal={selectedJournal}
            setSelectedJournal={setSelectedJournal}
            reviews={reviews}
            selectedReview={selectedReview}
            setSelectedReview={setSelectedReview}
            currencyEntries={currencyEntries}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            addCurrencyEntry={addCurrencyEntry}
            removeCurrencyEntry={removeCurrencyEntry}
            updateCurrencyEntry={updateCurrencyEntry}
          />
        );
      case "bookings":
        return (
          <BookingsTab
            bookings={bookings}
            bookingsStorage={bookingsStorage}
            bookingStatusMessage={bookingStatusMessage}
            updatingBookingIds={updatingBookingIds}
            updateBookingStatusAction={updateBookingStatusAction}
            bookingArchiveTab={bookingArchiveTab}
            setBookingArchiveTab={setBookingArchiveTab}
            bookingHistoryPages={bookingHistoryPages}
            setBookingHistoryPages={setBookingHistoryPages}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="admin-shell"
      style={{
        display: "flex",
        minHeight: "100vh",
        background: ADMIN_UI.pageBg,
        color: ADMIN_UI.textInk,
      }}
    >
      {/* Fixed left sidebar */}
      <aside
        className="admin-sidebar"
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
          <div className="mono tracked" style={{ color: ADMIN_UI.sidebarMuted, fontSize: 10 }}>
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

      {/* Main content area */}
      <div
        className="admin-main"
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
          className="admin-topbar"
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
            <span style={{ marginLeft: 12, fontSize: 13, color: ADMIN_UI.textMuted }}>
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
                  color: "var(--accent)",
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
            <button
              type="button"
              onClick={logoutAdmin}
              title="Sign out"
              style={{
                ...buttonStyle("ghost"),
                padding: "9px 12px",
                fontSize: 12,
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main
          className="admin-content"
          style={{ flex: 1, padding: "28px 28px 48px", display: "grid", gap: 20, alignContent: "start" }}
        >
          {saveState.message ? (
            <div
              style={{
                ...panelStyle(),
                padding: "14px 18px",
                border:
                  "1px solid " +
                  (saveState.type === "error" ? "rgba(139, 58, 31, 0.22)" : "rgba(47, 62, 42, 0.14)"),
                background:
                  saveState.type === "error" ? "rgba(139, 58, 31, 0.08)" : "rgba(47, 62, 42, 0.08)",
                color: saveState.type === "error" ? "var(--accent)" : "var(--accent-2)",
              }}
            >
              {saveState.message}
            </div>
          ) : null}

          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
}
