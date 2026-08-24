import { connectMongoDB } from "@/config/db";
import PageTitle from "@/components/page-title";
import HotelModel from "@/models/hotel-model";
import RoomModel from "@/models/room-model";
import React from "react";
import RoomsForm from "../../_common/rooms-form";

async function EditRoomPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  await connectMongoDB();
  const [response, hotelsResponse] = await Promise.all([
    RoomModel.findById(params.id).lean(),
    HotelModel.find().lean(),
  ]);

  const room = JSON.parse(JSON.stringify(response));
  const hotels = JSON.parse(JSON.stringify(hotelsResponse));

  return (
    <div>
      <PageTitle title="Edit Rooms" />
      <RoomsForm initialData={room} type="edit" hotels={hotels} />
    </div>
  );
}

export default EditRoomPage;

