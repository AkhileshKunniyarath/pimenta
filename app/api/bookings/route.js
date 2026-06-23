import { NextResponse } from "next/server";

import {
  createBooking,
  listBookings,
  updateBookingStatus,
} from "../../../lib/bookings";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeText(value, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function normalizeArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => normalizeText(item, 100))
    .filter(Boolean)
    .slice(0, 20);
}

function normalizeStatus(value) {
  return value === "approved" || value === "rejected" || value === "pending"
    ? value
    : "";
}

export async function GET() {
  try {
    const result = await listBookings();

    return NextResponse.json(
      {
        storage: result.storage,
        bookings: result.bookings,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to list bookings", error);

    return NextResponse.json(
      { error: "We couldn't load bookings right now." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const booking = {
    packageId: normalizeText(payload?.packageId, 120),
    packageSlug: normalizeText(payload?.packageSlug, 160),
    packageTitle: normalizeText(payload?.packageTitle, 200),
    checkin: normalizeText(payload?.checkin, 32),
    checkout: normalizeText(payload?.checkout, 32),
    guests:
      typeof payload?.guests === "number" && Number.isFinite(payload.guests)
        ? Math.max(1, Math.min(20, Math.round(payload.guests)))
        : 1,
    name: normalizeText(payload?.name, 160),
    email: normalizeText(payload?.email, 160).toLowerCase(),
    phone: normalizeText(payload?.phone, 80),
    notes: normalizeText(payload?.notes, 5000),
    diet: normalizeArray(payload?.diet),
    indicativeTotalInr:
      typeof payload?.indicativeTotalInr === "number" &&
      Number.isFinite(payload.indicativeTotalInr)
        ? Math.max(0, Math.round(payload.indicativeTotalInr))
        : null,
    status: "pending",
    source: "website",
    createdAt: new Date(),
  };

  if (!booking.packageId || !booking.packageTitle) {
    return NextResponse.json(
      { error: "Please choose a package before sending your enquiry." },
      { status: 400 },
    );
  }

  if (!booking.name) {
    return NextResponse.json(
      { error: "Please enter your name." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(booking.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    const result = await createBooking(booking);

    return NextResponse.json(
      {
        ok: true,
        bookingId: result.bookingId,
        storedLocally: result.storedLocally,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create booking", error);

    return NextResponse.json(
      { error: "We couldn't save your enquiry right now. Please try again." },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const bookingId = normalizeText(payload?.bookingId, 160);
  const status = normalizeStatus(payload?.status);

  if (!bookingId) {
    return NextResponse.json(
      { error: "Booking ID is required." },
      { status: 400 },
    );
  }

  if (!status) {
    return NextResponse.json(
      { error: "Please choose a valid booking status." },
      { status: 400 },
    );
  }

  try {
    const result = await updateBookingStatus(bookingId, status);

    return NextResponse.json(
      {
        ok: true,
        storage: result.storage,
        booking: result.booking,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error.code === "BOOKING_NOT_FOUND") {
      return NextResponse.json(
        { error: "We couldn't find that booking." },
        { status: 404 },
      );
    }

    console.error("Failed to update booking status", error);

    return NextResponse.json(
      { error: "We couldn't update that booking right now." },
      { status: 500 },
    );
  }
}
