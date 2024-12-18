import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import BookingModel from "@/models/booking-model";
import React from "react";
import PageTitle from "@/components/page-title";
import UserBookingsTable from "./_common/user-bookings-table";

async function BookingsPage() {
  try{
  const userResponse = await GetCurrentUserFromMongoDB();
  if (!userResponse?.data?._id) {
    throw new Error("User ID not found");
  }
  const userBookingsResponse = await BookingModel.find({
    user: userResponse.data._id,
  })
    .populate("room")
    .populate("hotel")
    .sort({ createdAt: -1 });
  const userBookings = JSON.parse(JSON.stringify(userBookingsResponse));
  return (
    <div>
      <PageTitle title="My Bookings" />
      <UserBookingsTable bookings={userBookings} />
      {/* {userBookings.length > 0 ? (
          <UserBookingsTable bookings={userBookings} />
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500">No bookings found.</p>
          </div>
        )} */}
    </div>
  );
  }catch (error) {
    console.error("Error fetching bookings:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Unable to fetch bookings. Please try again later.</p>
      </div>
    );
  }
}

export default BookingsPage;
