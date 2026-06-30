"use client";

import * as React from "react";
import {
  ADMIN_UI,
  formatDate,
  panelStyle,
  buttonStyle,
} from "../utils";
import {
  DashboardStatCard,
  StatusListItem,
  NavShortcutRow,
  SectionHeader,
  MiniStat,
  MiniStatDark,
} from "../ui/AdminUI";

interface OverviewTabProps {
  savedStorage: string;
  savedUpdatedAt: string;
  dirty: boolean;
  saving: boolean;
  stats: Array<{ label: string; value: number; icon: string }>;
  draftContent: any;
  brandLocation: string;
  completionPercent: number;
  businessChecklist: Array<{ label: string; done: boolean }>;
  recentBookings: any[];
  packages: any[];
  rooms: any[];
  reviews: any[];
  bookings: any[];
  tabs: Array<{ id: string; badge: string; label: string; note: string }>;
  setActiveTab: (tabId: string) => void;
  saveDraftContent: () => void;
  resetDraftContent: () => void;
}

export default function OverviewTab({
  savedStorage,
  savedUpdatedAt,
  dirty,
  saving,
  stats,
  draftContent,
  brandLocation,
  completionPercent,
  businessChecklist,
  recentBookings,
  packages,
  rooms,
  reviews,
  bookings,
  tabs,
  setActiveTab,
  saveDraftContent,
  resetDraftContent,
}: OverviewTabProps) {
  return (
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
          <div className="mono tracked" style={{ color: "var(--accent)" }}>
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
          <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.7 }}>
            Update business details, packages, stays, stories, and bookings from one place.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
            <button
              onClick={saveDraftContent}
              disabled={!dirty || saving}
              style={buttonStyle("primary", !dirty || saving)}
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
                  active={false}
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
  );
}
