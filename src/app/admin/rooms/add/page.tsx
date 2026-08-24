import { connectMongoDB } from "@/config/db";
import PageTitle from "@/components/page-title";
import React from "react";
import RoomsForm from "../_common/rooms-form";
import HotelModel from "@/models/hotel-model";

async function AddRoomPage() {
  await connectMongoDB();
  const response = await HotelModel.find().lean();
  const hotels = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <PageTitle title="Add Room" />
      <RoomsForm hotels={hotels} />
    </div>
  );
}

export default AddRoomPage;