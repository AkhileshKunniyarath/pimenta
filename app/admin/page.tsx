import * as React from "react";
import AdminLoginClient from "./AdminLoginClient";
import AdminDashboardClient from "./AdminDashboardClient";
import { listBookings } from "../../lib/bookings";
import { getSiteContent } from "../../lib/content";
import { isAdminAuthenticated } from "../../lib/adminAuth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuthed = await isAdminAuthenticated();

  if (!isAuthed) {
    return <AdminLoginClient />;
  }

  const bookingsResult = await listBookings();
  const contentResult = await getSiteContent();

  return (
    <AdminDashboardClient
      initialBookings={bookingsResult.bookings}
      bookingsStorage={bookingsResult.storage}
      initialContent={contentResult.content}
      contentStorage={contentResult.storage}
      initialUpdatedAt={contentResult.updatedAt}
    />
  );
}
