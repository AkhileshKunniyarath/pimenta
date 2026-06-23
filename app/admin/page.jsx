import AdminDashboardClient from "./AdminDashboardClient";
import { listBookings } from "../../lib/bookings";
import { getSiteContent } from "../../lib/content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
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
