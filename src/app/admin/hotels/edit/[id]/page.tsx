import { connectMongoDB } from "@/config/db";
import PageTitle from "@/components/page-title";
import React from "react";
import HotelForm from "../../_common/hotel-form";
import HotelModel from "@/models/hotel-model";

async function EditHotelPage({ params }: { params: { id: string } }) {
  await connectMongoDB();
  const hotelId = params.id;
  const response = await HotelModel.findById(hotelId).lean();
  const hotel = JSON.parse(JSON.stringify(response));
  return (
    <div>
      <PageTitle title="Edit Hotel" />
      <HotelForm type="edit" initialData={hotel} />
    </div>
  );
}

export default EditHotelPage;

