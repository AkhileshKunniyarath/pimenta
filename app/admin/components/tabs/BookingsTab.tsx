"use client";

import * as React from "react";
import {
  ADMIN_UI,
  formatDate,
  panelStyle,
  buttonStyle,
  normalizeBookingStatus,
  BOOKING_HISTORY_PAGE_SIZE,
} from "../utils";
import { SectionHeader } from "../ui/AdminUI";

interface BookingsTabProps {
  bookings: any[];
  bookingsStorage: string;
  bookingStatusMessage: { type: string; message: string };
  updatingBookingIds: string[];
  updateBookingStatusAction: (id: string, status: "approved" | "rejected" | "pending") => void;
  bookingArchiveTab: string;
  setBookingArchiveTab: (tab: string) => void;
  bookingHistoryPages: { [key: string]: number };
  setBookingHistoryPages: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
}

export default function BookingsTab({
  bookings,
  bookingsStorage,
  bookingStatusMessage,
  updatingBookingIds,
  updateBookingStatusAction,
  bookingArchiveTab,
  setBookingArchiveTab,
  bookingHistoryPages,
  setBookingHistoryPages,
}: BookingsTabProps) {
  const pendingBookings = bookings.filter((b) => normalizeBookingStatus(b.status) === "pending");
  const approvedBookings = bookings.filter((b) => normalizeBookingStatus(b.status) === "approved");
  const rejectedBookings = bookings.filter((b) => normalizeBookingStatus(b.status) === "rejected");

  const bookingHistoryBookings = bookingArchiveTab === "approved" ? approvedBookings : rejectedBookings;

  const bookingHistoryPage = bookingHistoryPages[bookingArchiveTab] || 1;
  const bookingHistoryTotalPages = Math.ceil(bookingHistoryBookings.length / BOOKING_HISTORY_PAGE_SIZE);
  const bookingHistoryStart = (bookingHistoryPage - 1) * BOOKING_HISTORY_PAGE_SIZE;
  const paginatedBookingHistory = bookingHistoryBookings.slice(
    bookingHistoryStart,
    bookingHistoryStart + BOOKING_HISTORY_PAGE_SIZE
  );

  return (
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
          <div className="mono tracked" style={{ color: "var(--accent)" }}>
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
            color: ADMIN_UI.textMuted,
          }}
        >
          <span>📦</span>
          <span>Storage: <strong style={{ color: ADMIN_UI.textInk }}>{bookingsStorage}</strong></span>
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
                ? "var(--accent)"
                : ADMIN_UI.textInk,
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
          <div style={{ color: ADMIN_UI.textMuted, fontSize: 14, maxWidth: 340 }}>
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
                  <div className="mono tracked" style={{ color: ADMIN_UI.textMuted, fontSize: 10 }}>
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
                <div className="mono tracked" style={{ color: "var(--accent)" }}>
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
                  color: ADMIN_UI.textMuted,
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
                <div className="mono tracked" style={{ color: "var(--accent)" }}>
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
                        color: active ? "var(--paper)" : ADMIN_UI.textInk,
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
                <div style={{ color: ADMIN_UI.textMuted, fontSize: 13 }}>
                  Showing {bookingHistoryStart + 1}-
                  {Math.min(
                    bookingHistoryStart + BOOKING_HISTORY_PAGE_SIZE,
                    bookingHistoryBookings.length
                  )}{" "}
                  of {bookingHistoryBookings.length}
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
                            bookingHistoryPage + 1
                          ),
                        }))
                      }
                      disabled={bookingHistoryPage === bookingHistoryTotalPages}
                      style={buttonStyle(
                        "ghost",
                        bookingHistoryPage === bookingHistoryTotalPages
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
  );
}

function buildWhatsAppUrl(booking: any) {
  const phone = (booking.phone || "").replace(/\D/g, "");
  if (!phone) return null;

  // normalise to international — assume India (+91) if 10 digits with no country code
  const intlPhone = phone.length === 10 ? `91${phone}` : phone;

  const name = booking.name || "there";
  const pkg = booking.packageTitle || booking.packageSlug || "your chosen package";
  const checkin = booking.checkin || "your preferred date";
  const checkout = booking.checkout || "";
  const guests = booking.guests || 1;

  const dateStr = checkout ? `from ${checkin} to ${checkout}` : `on ${checkin}`;

  const message =
    `Hello ${name}! 🌿\n\n` +
    `We're delighted to confirm your booking enquiry for *${pkg}* ${dateStr} for ${guests} guest${
      guests !== 1 ? "s" : ""
    } at The Pimenta.\n\n` +
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
}: {
  bookings: any[];
  emptyTitle: string;
  emptyBody: string;
  onStatusChange: (id: string, status: "approved" | "rejected" | "pending") => void;
  updatingBookingIds: string[];
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
        <div className="serif" style={{ fontSize: 24, color: ADMIN_UI.textInk }}>
          {emptyTitle}
        </div>
        <div style={{ color: ADMIN_UI.textMuted, fontSize: 14, maxWidth: 340 }}>
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
          <div key={header} className="mono tracked" style={{ color: ADMIN_UI.textMuted, fontSize: 10 }}>
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

function BookingRow({
  booking,
  isLast,
  onStatusChange,
  isUpdating = false,
}: {
  booking: any;
  isLast: boolean;
  onStatusChange: (id: string, status: "approved" | "rejected" | "pending") => void;
  isUpdating?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const status = normalizeBookingStatus(booking.status);
  const hasExtra = booking.diet?.length || booking.notes || booking.phone;
  const dateRange =
    booking.checkin || booking.checkout ? `${booking.checkin || "—"} → ${booking.checkout || "—"}` : "Flexible";

  const whatsappUrl = buildWhatsAppUrl(booking);

  const statusConfig = {
    pending: { label: "Pending", bg: "rgba(180,130,0,0.10)", color: "#7A5800", border: "rgba(180,130,0,0.22)" },
    approved: { label: "Approved", bg: "rgba(30,100,50,0.10)", color: "#1A5E32", border: "rgba(30,100,50,0.22)" },
    rejected: { label: "Rejected", bg: "rgba(139,58,31,0.10)", color: "#8B3A1F", border: "rgba(139,58,31,0.22)" },
  };
  const sc = statusConfig[status] || statusConfig.pending;

  function handleApprove(e: React.MouseEvent) {
    e.stopPropagation();
    if (status === "approved" || isUpdating) {
      return;
    }

    if (whatsappUrl) {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    onStatusChange?.(booking._id, "approved");
  }

  function handleReject(e: React.MouseEvent) {
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
          <div style={{ fontWeight: 600, fontSize: 14, color: ADMIN_UI.textInk, lineHeight: 1.2 }}>
            {booking.name}
          </div>
          <div style={{ fontSize: 12, color: ADMIN_UI.textMuted, marginTop: 3 }}>{booking.email}</div>
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
              color: "var(--accent)",
              fontWeight: 500,
              border: "1px solid rgba(139,58,31,0.14)",
            }}
          >
            {booking.packageTitle || booking.packageSlug || booking.packageId || "—"}
          </div>
        </div>

        {/* Dates */}
        <div style={{ fontSize: 13, color: ADMIN_UI.textInk }}>{dateRange}</div>

        {/* Guests */}
        <div style={{ fontSize: 13, color: ADMIN_UI.textInk }}>
          {booking.guests || <span style={{ color: ADMIN_UI.textMuted }}>—</span>}
        </div>

        {/* Est. total */}
        <div style={{ fontSize: 13, color: ADMIN_UI.textInk }}>
          {booking.indicativeTotalInr ? (
            `₹${Number(booking.indicativeTotalInr).toLocaleString("en-IN")}`
          ) : (
            <span style={{ color: ADMIN_UI.textMuted }}>—</span>
          )}
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
              color: ADMIN_UI.textMuted,
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
                color: "var(--accent)",
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
              <span style={{ fontSize: 12, color: ADMIN_UI.textMuted }}>
                ⚠️ No phone number — WhatsApp unavailable
              </span>
            )}

            <div style={{ marginLeft: "auto", fontSize: 12, color: ADMIN_UI.textMuted }}>
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
              {booking.phone ? <DetailCell label="Phone" value={booking.phone} /> : null}
              {booking.diet?.length ? <DetailCell label="Dietary needs" value={booking.diet.join(", ")} /> : null}
              {booking.notes ? <DetailCell label="Guest notes" value={booking.notes} /> : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailCell({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="mono tracked" style={{ color: ADMIN_UI.textMuted, fontSize: 10, marginBottom: 4 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: ADMIN_UI.textInk,
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
