import { connectMongoDB } from "@/config/db";
import PageTitle from "@/components/page-title";
import React from "react";
import AdminBookingsTable from "../_common/admin-bookings-table";
import BookingModel from "@/models/booking-model";

async function AdminBookingsPage() {
  await connectMongoDB();
  const bookingsResponse = await BookingModel.find({})
    .populate("hotel")
    .populate("room")
    .populate("user")
    .sort({ createdAt: -1 })
    .lean();
  const bookings = JSON.parse(JSON.stringify(bookingsResponse));

  return (
    <div>
      <PageTitle title="Bookings" />
      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}

export default AdminBookingsPage;
