import PageTitle from "@/components/page-title";
import UserProfileCard from "@/components/user-profile-card";
import BookingModel from "@/models/booking-model";
import { GetCurrentUserFromMongoDB } from "@/server-actions/users";
import { connectMongoDB } from "@/config/db";
import React from "react";

async function ProfilePage() {
  await connectMongoDB();
  const response = await GetCurrentUserFromMongoDB();
  if (!response.success || !response.data) {
    return (
      <div>
        <PageTitle title="Profile" />
        <p className="mt-4 text-red-500">{response.message || "Failed to load user profile."}</p>
      </div>
    );
  }
  const user = response.data;
  const bookingsCount = await BookingModel.countDocuments({ user: user._id });

  return (
    <div>
      <PageTitle title="My Account Profile" />
      <UserProfileCard user={user} bookingsCount={bookingsCount} />
    </div>
  );
}

export default ProfilePage;



