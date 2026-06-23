import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ObjectId } from "mongodb";

import { getDatabase } from "./mongodb";

function getBookingsFilePath() {
  return path.join(process.cwd(), "data", "bookings.json");
}

export function canUseMongo() {
  return Boolean(process.env.MONGODB_URI);
}

function normalizeBookingStatus(status) {
  if (status === "approved" || status === "rejected") {
    return status;
  }

  return "pending";
}

function normalizeCreatedAt(value) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function serializeBooking(booking) {
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

async function readLocalBookings() {
  const filePath = getBookingsFilePath();

  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeLocalBookings(bookings) {
  const filePath = getBookingsFilePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(bookings, null, 2));
}

async function saveBookingLocally(booking) {
  const bookings = await readLocalBookings();
  const bookingId = `local-${Date.now()}`;

  bookings.push({
    ...booking,
    _id: bookingId,
  });

  await writeLocalBookings(bookings);

  return {
    bookingId,
    storedLocally: true,
  };
}

async function updateLocalBookingStatus(bookingId, status) {
  const bookings = await readLocalBookings();
  const index = bookings.findIndex((booking) => booking._id === bookingId);

  if (index === -1) {
    const error = new Error("Booking not found.");
    error.code = "BOOKING_NOT_FOUND";
    throw error;
  }

  const nextBooking = {
    ...bookings[index],
    status: normalizeBookingStatus(status),
  };

  bookings[index] = nextBooking;
  await writeLocalBookings(bookings);

  return {
    storage: "local",
    booking: serializeBooking(nextBooking),
  };
}

export async function createBooking(booking) {
  if (process.env.NODE_ENV !== "production" && !canUseMongo()) {
    return saveBookingLocally(booking);
  }

  try {
    const database = await getDatabase();
    const result = await database.collection("bookings").insertOne(booking);

    return {
      bookingId: result.insertedId.toString(),
      storedLocally: false,
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      return saveBookingLocally(booking);
    }

    throw error;
  }
}

export async function updateBookingStatus(bookingId, status) {
  const nextStatus = normalizeBookingStatus(status);

  if (process.env.NODE_ENV !== "production" && !canUseMongo()) {
    return updateLocalBookingStatus(bookingId, nextStatus);
  }

  try {
    const database = await getDatabase();
    const collection = database.collection("bookings");
    const filter = ObjectId.isValid(bookingId)
      ? { _id: new ObjectId(bookingId) }
      : { _id: bookingId };

    const result = await collection.updateOne(filter, {
      $set: { status: nextStatus },
    });

    if (result.matchedCount === 0) {
      const error = new Error("Booking not found.");
      error.code = "BOOKING_NOT_FOUND";
      throw error;
    }

    const updatedBooking = await collection.findOne(filter);

    return {
      storage: "mongo",
      booking: serializeBooking(updatedBooking),
    };
  } catch (error) {
    if (error.code === "BOOKING_NOT_FOUND") {
      throw error;
    }

    if (process.env.NODE_ENV !== "production") {
      return updateLocalBookingStatus(bookingId, nextStatus);
    }

    throw error;
  }
}

export async function listBookings() {
  if (process.env.NODE_ENV !== "production" && !canUseMongo()) {
    const bookings = await readLocalBookings();

    return {
      storage: "local",
      bookings: bookings
        .map(serializeBooking)
        .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
    };
  }

  try {
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
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      const bookings = await readLocalBookings();

      return {
        storage: "local",
        bookings: bookings
          .map(serializeBooking)
          .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || "")),
      };
    }

    throw error;
  }
}
