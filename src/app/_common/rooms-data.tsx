import { RoomType } from "@/interfaces";
import RoomModel from "@/models/room-model";
import dbConnect from "@/utils/dbConnect";
import HotelModel from "@/models/hotel-model";
import Link from "next/link";
import React from "react";
import { GetAvailabeRooms } from "@/server-actions/bookings";

async function RoomsData({ searchParams }: { searchParams: any }) {
  await dbConnect();

  const hotels = await HotelModel.find();
  console.log(hotels);
  
  console.log("Search Params:", searchParams);

  const response = await GetAvailabeRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  
  const rooms: RoomType[] = response.data;
  // const response = await RoomModel.find()
  //   .populate("hotel")
  //   .sort({ createdAt: -1 });
  // const rooms = await JSON.parse(JSON.stringify(response));

  if (rooms.length === 0) {
    return <div>No rooms found</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
      {rooms.map((room: RoomType) => (
        <Link
          href={`book-room/${room._id}`}
          key={room._id}
          className="no-underline text-black">
          <div className=" flex flex-col gap-2 border border-gray-200 border-solid rounded-t-lg room-card">
            <img
              src={room.media[0]}
              className="w-full h-64 object-cover rounded-t-lg"/>
            <div className="px-3 py-2 flex flex-col text-sm  gap-2">
              <span>{room.name}</span>
              <span className="text-teal-500 text-xs">
                {room.hotel
                  ? `${room.hotel.name} - ${room.hotel.address}`
                  : "Hotel information not available"}
              </span>
              <hr className="border-gray-200 border border-solid" />
              <div className="flex justify-between ">
                <span> ₹{room.rentPerDay} /Per Day</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
export default RoomsData;