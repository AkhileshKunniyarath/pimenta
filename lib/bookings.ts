import { ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";

export function canUseMongo(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

function requireMongoUri() {
  if (!canUseMongo()) {
    throw new Error("MONGODB_URI is required. Add it to .env.local to store bookings.");
  }
}

function normalizeBookingStatus(status: any): "approved" | "rejected" | "pending" {
  if (status === "approved" || status === "rejected") {
    return status;
  }

  return "pending";
}

function normalizeCreatedAt(value: any): string | null {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function serializeBooking(booking: any) {
  if (!booking) return null;
  return {
    ...booking,
    _id:
      typeof booking._id === "string"
        ? booking._id
        : booking._id?.toString?.() || null,
    status: normalizeBookingStatus(booking.status),
    createdAt: normalizeCreatedAt(booking.createdAt),
  };
}

function bookingFilter(bookingId: string) {
  return ObjectId.isValid(bookingId)
    ? { _id: new ObjectId(bookingId) }
    : { _id: bookingId as any };
}

export async function createBooking(booking: any) {
  requireMongoUri();

  const database = await getDatabase();
  const result = await database.collection("bookings").insertOne({
    ...booking,
    status: normalizeBookingStatus(booking.status),
    createdAt: booking.createdAt ? new Date(booking.createdAt) : new Date(),
  });

  return {
    bookingId: result.insertedId.toString(),
    storedLocally: false,
  };
}

export async function updateBookingStatus(bookingId: string, status: string) {
  requireMongoUri();

  const nextStatus = normalizeBookingStatus(status);
  const database = await getDatabase();
  const collection = database.collection("bookings");
  const filter = bookingFilter(bookingId);

  const result = await collection.updateOne(filter, {
    $set: { status: nextStatus },
  });

  if (result.matchedCount === 0) {
    const error = new Error("Booking not found.") as any;
    error.code = "BOOKING_NOT_FOUND";
    throw error;
  }

  const updatedBooking = await collection.findOne(filter);

  return {
    storage: "mongo",
    booking: serializeBooking(updatedBooking),
  };
}

export async function listBookings() {
  requireMongoUri();

  const database = await getDatabase();
  const bookings = await database
    .collection("bookings")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return {
    storage: "mongo",
    bookings: bookings.map(serializeBooking),
  };
}
